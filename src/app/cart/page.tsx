"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import InvoiceModal, { InvoiceData, downloadInvoice } from "@/components/InvoiceModal";
import { useApp, findGameById, PurchaseRecord } from "@/context/AppContext";

function CartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = (searchParams.get("step") as "cart" | "upi_payment") || "cart";

  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    checkout,
    user,
    clearCart,
  } = useApp();

  const [cartStep, setCartStep] = useState<"cart" | "upi_payment">(initialStep);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [purchasedKeys, setPurchasedKeys] = useState<PurchaseRecord[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<InvoiceData | null>(null);

  // UPI payment & proof upload state
  const [paymentProofImg, setPaymentProofImg] = useState<string | null>(null);
  const [paymentProofFileName, setPaymentProofFileName] = useState<string>("");
  const [utrNumber, setUtrNumber] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Keep query params in sync if step changes
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam === "upi_payment" && cart.length > 0 && !checkoutSuccess) {
      setCartStep("upi_payment");
    }
  }, [searchParams, cart.length, checkoutSuccess]);

  const cartDetails = cart
    .map((item) => {
      const details = findGameById(item.gameId);
      if (!details) return null;
      const isCod = Boolean(
        (details as any)?.isOnlineOnly ||
        item.gameId === 8 ||
        item.gameId === 9 ||
        details.title.toLowerCase().includes("call of duty") ||
        details.title.toLowerCase().includes("modern warfare")
      );
      const effectiveMode: "offline" | "online" = isCod ? "online" : item.playMode;
      const finalPrice = isCod
        ? 499
        : effectiveMode === "online"
        ? Math.round(details.price * 2.5)
        : details.price;
      const rawOriginalPrice = "originalPrice" in details ? (details.originalPrice as number | undefined) : undefined;
      const originalFinalPrice = rawOriginalPrice
        ? isCod
          ? Math.round(rawOriginalPrice * 1.5)
          : effectiveMode === "online"
          ? Math.round(rawOriginalPrice * 2.5)
          : rawOriginalPrice
        : undefined;

      return {
        ...item,
        ...details,
        price: finalPrice,
        originalPrice: originalFinalPrice,
        playMode: effectiveMode,
      };
    })
    .filter(Boolean) as Array<{
    gameId: number;
    quantity: number;
    playMode: "offline" | "online";
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    platform: string;
  }>;

  const total = cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalOriginal = cartDetails.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );

  const totalSavings = Math.max(0, totalOriginal - total);

  // Copy helper with feedback
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Screenshot upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image (PNG, JPG, JPEG, WebP).");
      return;
    }
    setErrorMsg("");
    setPaymentProofFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setPaymentProofImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Navigate to UPI payment step
  const handleProceedToPayment = () => {
    setErrorMsg("");
    if (!user) {
      router.push("/auth?redirect=/cart?step=upi_payment");
      return;
    }
    if (cart.length === 0) {
      setErrorMsg("Your cart is empty. Add games to continue.");
      return;
    }
    setCartStep("upi_payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back to cart step
  const handleBackToCart = () => {
    setCartStep("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit payment proof and complete purchase
  const handleConfirmPayment = async () => {
    setErrorMsg("");
    if (!paymentProofImg) {
      setErrorMsg("Please upload your payment screenshot as payment proof.");
      return;
    }

    setLoading(true);

    try {
      const checkoutResult = checkout({
        paymentProof: paymentProofImg,
        utrNumber: utrNumber.trim() || undefined,
      });

      if (checkoutResult.success && checkoutResult.keys) {
        setPurchasedKeys(checkoutResult.keys);
        setCheckoutSuccess(true);

        const invoiceNumber = `MG-${new Date().getFullYear()}-${Math.floor(
          1000 + Math.random() * 9000
        )}`;
        const invData: InvoiceData = {
          invoiceNumber,
          invoiceDate: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          dueDate: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          customerName: user?.name || "Valued Customer",
          customerEmail: user?.email || "customer@example.com",
          items: cartDetails.map((item) => ({
            id: item.gameId,
            gameTitle: item.title,
            platform: item.platform,
            playMode: item.playMode,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: total,
          paymentMethod: "UPI Transfer",
          transactionId: utrNumber.trim() || `UPI-TXN-${Date.now().toString().slice(-6)}`,
        };

        setCurrentInvoice(invData);

        // Auto download invoice
        setTimeout(() => {
          try {
            downloadInvoice(invData);
          } catch (err) {
            console.error("Auto invoice download error:", err);
          }
        }, 1200);

        // Auto open WhatsApp verification
        setTimeout(() => {
          const waMsg = `🎮 *Millennium Games - Order Confirmed*\n\nHello Support! I have paid ₹${total} via UPI for Order *${invoiceNumber}*.\nName: ${user?.name || "Customer"}\n${utrNumber ? `UTR: ${utrNumber}\n` : ""}I have attached my screenshot in the store portal. Please verify my accounts!`;
          const waUrl = `https://wa.me/918089406346?text=${encodeURIComponent(waMsg)}`;
          window.open(waUrl, "_blank", "noopener,noreferrer");
        }, 2200);
      } else {
        setErrorMsg(
          checkoutResult.error || "Payment verification failed. Please try again."
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred during order processing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#cbdce3]/50 text-slate-800 flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ambient background styling matching store aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#cbdce3]/80" />
        <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] -top-32 left-[5%] opacity-20" />
        <div className="abstract-shape abstract-shape-mint w-[450px] h-[450px] top-[35%] right-[5%] opacity-15" />
      </div>

      <div className="flex-1 container-custom relative z-10 pt-28 pb-20">
        {/* Breadcrumb & Top Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800 font-semibold text-xs border border-white/80 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              ← Back to Store
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">
              {checkoutSuccess
                ? "Order Confirmed"
                : cartStep === "upi_payment"
                ? "Payment"
                : "Shopping Cart"}
            </span>
          </div>

          {!checkoutSuccess && cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Step Indicator Header */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-300 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-slate-900 -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: checkoutSuccess
                  ? "100%"
                  : cartStep === "upi_payment"
                  ? "50%"
                  : "0%",
              }}
            />

            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10 text-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  cartStep === "cart" && !checkoutSuccess
                    ? "bg-slate-900 text-white ring-4 ring-slate-900/20 shadow-md"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {cartStep === "upi_payment" || checkoutSuccess ? "✓" : "1"}
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 mt-1.5 sm:mt-2 text-center">
                1. Review Cart
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10 text-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  cartStep === "upi_payment" && !checkoutSuccess
                    ? "bg-slate-900 text-white ring-4 ring-slate-900/20 shadow-md"
                    : checkoutSuccess
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-500 border border-slate-300"
                }`}
              >
                {checkoutSuccess ? "✓" : "2"}
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 mt-1.5 sm:mt-2 text-center">
                2. UPI Payment
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10 text-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  checkoutSuccess
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-600/20 shadow-md"
                    : "bg-white text-slate-500 border border-slate-300"
                }`}
              >
                3
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 mt-1.5 sm:mt-2 text-center">
                3. Order Complete
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {checkoutSuccess ? (
            /* ========================================================= */
            /* STEP 3: ORDER SUCCESS / KEYS & INVOICE SCREEN             */
            /* ========================================================= */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <div className="glass-card p-8 sm:p-10 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600 text-4xl shadow-inner">
                  ✓
                </div>

                <div>
                  <h1
                    className="text-2xl sm:text-3xl font-black text-[#0f172a] glass-text"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Payment Received &amp; Order Verified!
                  </h1>
                  <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto leading-relaxed">
                    Your official game accounts have been allocated and permanently saved to your library. You can start downloading and playing right away.
                  </p>
                </div>

                {/* Sourced Game Accounts List */}
                <div className="space-y-4 pt-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                      Delivered Game Accounts ({purchasedKeys.length})
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Ready to Play
                    </span>
                  </div>

                  <div className="grid gap-4">
                    {purchasedKeys.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/90 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.gameImage}
                            alt={item.gameTitle}
                            className="w-14 h-18 object-cover rounded-xl shadow-sm flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base font-bold text-[#0f172a] leading-snug">
                              {item.gameTitle}
                            </h3>
                            <div className="flex gap-2 mt-1.5 flex-wrap">
                              <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200">
                                {item.platform.toUpperCase()}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200">
                                {item.playMode === "online" ? "Online Play" : "Offline Play"}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[9px] font-bold text-slate-500 bg-slate-50">
                                ₹{item.price}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Credentials Card */}
                        <div className="space-y-2 bg-slate-900/5 p-3.5 rounded-xl border border-slate-900/10">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-700">Account Username:</span>
                            <div className="flex items-center gap-2">
                              <code className="bg-slate-200/80 px-2 py-0.5 rounded text-slate-900 font-mono font-bold text-xs">
                                {item.accountUser}
                              </code>
                              <button
                                onClick={() => handleCopy(item.accountUser, `user-${item.id}`)}
                                className="px-2 py-0.5 text-[10px] font-bold text-slate-700 hover:text-black bg-white rounded border border-slate-200 shadow-2xs cursor-pointer"
                              >
                                {copiedField === `user-${item.id}` ? "✓ Copied" : "Copy"}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-700">Password:</span>
                            <div className="flex items-center gap-2">
                              <code className="bg-slate-200/80 px-2 py-0.5 rounded text-slate-900 font-mono font-bold text-xs">
                                {item.accountPass}
                              </code>
                              <button
                                onClick={() => handleCopy(item.accountPass, `pass-${item.id}`)}
                                className="px-2 py-0.5 text-[10px] font-bold text-slate-700 hover:text-black bg-white rounded border border-slate-200 shadow-2xs cursor-pointer"
                              >
                                {copiedField === `pass-${item.id}` ? "✓ Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-[10.5px] text-slate-500 text-center">
                          💡 You can generate Steam Guard verification codes and view login guides anytime in your Library.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 space-y-3">
                  {currentInvoice && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => downloadInvoice(currentInvoice)}
                        className="py-3 px-4 rounded-xl font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer text-xs uppercase tracking-wider"
                      >
                        <span>⬇️</span>
                        <span>Download Tax Invoice (PDF)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInvoiceOpen(true)}
                        className="py-3 px-4 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer text-xs uppercase tracking-wider"
                      >
                        <span>🧾</span>
                        <span>View / Print Invoice</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={`https://wa.me/918089406346?text=${encodeURIComponent(
                        `🎮 *Millennium Games - Order Confirmed*\nI have completed the payment of ₹${total} and uploaded the payment screenshot. Please verify!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-wider"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Direct WhatsApp Support</span>
                    </a>

                    <Link
                      href="/library"
                      className="btn-primary text-center py-3 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                    >
                      <span>🎮</span>
                      <span>Go to My Game Library</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : cartStep === "upi_payment" ? (
            /* ========================================================= */
            /* STEP 2: UPI PAYMENT & SCREENSHOT PROOF UPLOAD             */
            /* ========================================================= */
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left Col: QR Code & Payment Info */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Amount Payable Banner */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl flex items-center justify-between border border-slate-700 gap-3">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase font-bold text-emerald-400 tracking-wider block">
                        Total Amount Payable
                      </span>
                      <span
                        className="text-2xl sm:text-4xl font-black text-white mt-0.5 sm:mt-1 block"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        ₹{total}
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1 block">
                        {cartDetails.length} {cartDetails.length === 1 ? "game" : "games"} in order
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Verified Merchant
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-300">
                        Millennium Games
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 block mt-0.5 sm:mt-1">
                        Instant Delivery Enabled
                      </span>
                    </div>
                  </div>

                  {/* QR Code Container */}
                  <div className="glass-card p-4 sm:p-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] sm:text-xs font-bold max-w-full text-center">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                      <span>Scan with GPay, PhonePe, Paytm or BHIM</span>
                    </div>

                    <div className="relative mx-auto w-56 sm:w-64 p-2 rounded-2xl bg-white border-2 border-slate-200 shadow-md flex items-center justify-center overflow-hidden">
                      <img
                        src="/images/sidharth_shibu_qr.jpg"
                        alt="Paytm UPI QR Code - Millennium Games"
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    </div>

                    <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                      Scan this QR code using any UPI payment app on your phone and complete the payment of <strong>₹{total}</strong>.
                    </p>

                    {/* Copy UPI Details Section */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-sm max-w-md mx-auto">
                        <div className="min-w-0 pr-2 text-left">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                            Official UPI ID
                          </span>
                          <span className="text-sm font-mono font-bold text-slate-900 select-all truncate block">
                            bllalwhdn@ptaxis
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("bllalwhdn@ptaxis", "upi")}
                          className="px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                        >
                          {copiedField === "upi" ? "✓ Copied!" : "Copy UPI ID"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Col: Screenshot Proof Upload & Confirm */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="glass-card p-6 space-y-5">
                    <div>
                      <h2
                        className="text-lg font-bold text-[#0f172a]"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        Payment Proof &amp; Verification
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Attach your transaction screenshot to instantly unlock and receive your game login credentials.
                      </p>
                    </div>

                    {/* Screenshot Upload Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <span>📸 Payment Screenshot</span>
                          <span className="text-red-500 font-bold">*</span>
                        </label>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Required
                        </span>
                      </div>

                      {!paymentProofImg ? (
                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-emerald-500/60 hover:border-emerald-600 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-2xl cursor-pointer transition-all group text-center">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-600 text-2xl group-hover:scale-110 transition-transform mb-2">
                            📤
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Upload Payment Screenshot
                          </span>
                          <span className="text-[10.5px] text-slate-500 mt-1">
                            PNG, JPG, JPEG or WebP from your device
                          </span>
                        </label>
                      ) : (
                        <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 bg-white p-3 shadow-md space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-xs font-bold text-emerald-700">
                                Screenshot Attached
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setPaymentProofImg(null);
                                setPaymentProofFileName("");
                              }}
                              className="text-[11px] font-bold text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              Remove &times;
                            </button>
                          </div>
                          <img
                            src={paymentProofImg}
                            alt="Payment Proof Preview"
                            className="w-full max-h-48 object-contain rounded-xl bg-slate-50 border border-slate-200"
                          />
                          <p className="text-[10px] text-slate-500 truncate font-mono">
                            {paymentProofFileName}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* UTR Input (Optional) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                        <span>UTR / UPI Reference No.</span>
                        <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                      </label>
                      <input
                        type="text"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="e.g. 423984719234"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all"
                      />
                      <span className="text-[10px] text-slate-400 block">
                        Found in your UPI payment app receipt (12 digits).
                      </span>
                    </div>

                    {/* Error Message */}
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                        ⚠️ {errorMsg}
                      </div>
                    )}

                    {/* Confirm Button */}
                    <div className="space-y-3 pt-2">
                      <button
                        type="button"
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        className={`w-full py-4 px-6 rounded-2xl font-bold uppercase tracking-wider text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                          loading
                            ? "bg-slate-400 text-white cursor-not-allowed"
                            : "btn-primary hover:shadow-xl active:scale-98"
                        }`}
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Verifying &amp; Allocating Accounts...</span>
                          </>
                        ) : (
                          <>
                            <span>✓</span>
                            <span>Submit Proof &amp; Get Game Accounts</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleBackToCart}
                        disabled={loading}
                        className="w-full py-2.5 text-slate-600 hover:text-slate-900 text-xs font-bold transition-all cursor-pointer text-center"
                      >
                        ← Back to Cart Items
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp Help Card */}
                  <div className="p-4 rounded-2xl bg-white/70 border border-slate-200 shadow-sm text-center space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Need help completing your payment?
                    </span>
                    <a
                      href={`https://wa.me/918089406346?text=${encodeURIComponent(
                        `Hi Millennium Games, I need assistance with paying ₹${total} via UPI.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline"
                    >
                      <span>💬 Chat with us on WhatsApp (+91 80894 06346)</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================================= */
            /* STEP 1: SHOPPING CART REVIEW & PLAY MODE SELECTION        */
            /* ========================================================= */
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-6xl mx-auto"
            >
              {cartDetails.length === 0 ? (
                /* Empty Cart State */
                <div className="glass-card p-12 text-center max-w-md mx-auto space-y-6">
                  <div className="w-20 h-20 rounded-full bg-slate-200/60 border border-slate-300 flex items-center justify-center mx-auto text-3xl">
                    🛒
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold text-[#0f172a]"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Your Shopping Cart is Empty
                    </h2>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      You haven't added any games to your cart yet. Discover trending titles, exclusive bundles, and flash deals.
                    </p>
                  </div>
                  <Magnetic>
                    <Link
                      href="/"
                      className="btn-primary inline-block w-full text-center py-3 font-bold uppercase tracking-wider text-xs"
                    >
                      Explore Game Store
                    </Link>
                  </Magnetic>
                </div>
              ) : (
                /* Cart Items Grid */
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Col: Cart Items List */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-300/60">
                      <h1
                        className="text-xl font-bold text-[#0f172a] flex items-center gap-2"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        <span>🛒 Your Games</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                          {cartDetails.length} {cartDetails.length === 1 ? "Item" : "Items"}
                        </span>
                      </h1>
                      <span className="text-xs text-slate-500 font-medium">
                        Instant Account Delivery
                      </span>
                    </div>

                    {/* Buy 2 Get 1 Free Promo Banner */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 shadow-sm flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-xl sm:text-2xl flex-shrink-0">🎁</span>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-black text-emerald-950">
                              Buy 2 Get 1 Free Promo Active!
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-600 text-white shadow-xs">
                              OFFER
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-emerald-800/90 mt-0.5">
                            {cartDetails.length >= 2
                              ? "You are eligible for a FREE 3rd game! Add any 3rd game to claim."
                              : "Add 1 more game to your cart to claim your 3rd game 100% FREE!"}
                          </p>
                        </div>
                      </div>
                      {cartDetails.length < 2 && (
                        <Link
                          href="/#featured"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex-shrink-0 hidden sm:inline-block"
                        >
                          + Add Game
                        </Link>
                      )}
                    </div>

                    <div className="space-y-4">
                      {cartDetails.map((item) => (
                        <div
                          key={`${item.gameId}-${item.playMode}`}
                          className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:border-slate-400"
                        >
                          {/* Game Thumbnail & Info */}
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <Link href={`/games/${item.gameId}`} className="flex-shrink-0 group">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform"
                              />
                            </Link>

                            <div className="min-w-0 flex-1 space-y-1.5">
                              <Link
                                href={`/games/${item.gameId}`}
                                className="text-sm sm:text-base font-bold text-[#0f172a] hover:text-emerald-700 transition-colors line-clamp-1 block"
                              >
                                {item.title}
                              </Link>

                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-slate-600 bg-white/80 border border-slate-200">
                                  {item.platform.toUpperCase()}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                    item.playMode === "online"
                                      ? "text-emerald-700 bg-emerald-100/80 border border-emerald-200"
                                      : "text-slate-700 bg-slate-100 border border-slate-200"
                                  }`}
                                >
                                  {item.playMode === "online"
                                    ? "Online Multiplayer"
                                    : "Offline Campaign"}
                                </span>
                              </div>

                              {/* Price display */}
                              <div className="flex items-baseline gap-2 pt-0.5">
                                <span className="text-base font-black text-slate-900">
                                  ₹{item.price}
                                </span>
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <span className="text-xs text-slate-400 line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Controls: Quantity & Remove */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-slate-300 rounded-xl bg-white/80 overflow-hidden shadow-2xs">
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.gameId,
                                    item.quantity - 1,
                                    item.playMode
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition-colors font-bold text-xs cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.gameId,
                                    item.quantity + 1,
                                    item.playMode
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition-colors font-bold text-xs cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item.gameId, item.playMode)}
                              className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span>🗑️</span>
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                      <div className="p-3.5 rounded-2xl bg-white/60 border border-slate-200/80 text-center space-y-1">
                        <span className="text-base block">⚡</span>
                        <span className="text-xs font-bold text-slate-800 block">
                          Instant Key Delivery
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Receive credentials right after proof verification.
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/60 border border-slate-200/80 text-center space-y-1">
                        <span className="text-base block">🛡️</span>
                        <span className="text-xs font-bold text-slate-800 block">
                          100% Genuine Accounts
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Full warranty and lifetime replacement support.
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/60 border border-slate-200/80 text-center space-y-1">
                        <span className="text-base block">💬</span>
                        <span className="text-xs font-bold text-slate-800 block">
                          24/7 WhatsApp Help
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Instant support for setup and Steam Guard codes.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Col: Order Summary */}
                  <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
                    <div className="glass-card p-6 space-y-5">
                      <h2
                        className="text-lg font-bold text-[#0f172a] pb-3 border-b border-slate-200/80"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        Order Summary
                      </h2>

                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Items Subtotal ({cartDetails.reduce((acc, i) => acc + i.quantity, 0)})</span>
                          <span className="font-bold text-slate-900">₹{totalOriginal || total}</span>
                        </div>

                        {totalSavings > 0 && (
                          <div className="flex justify-between text-emerald-700 font-semibold">
                            <span>Discount / Bundle Savings</span>
                            <span>- ₹{totalSavings}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-slate-600">
                          <span>Account Allocation Fee</span>
                          <span className="text-emerald-600 font-bold">FREE</span>
                        </div>

                        <div className="flex justify-between text-slate-600">
                          <span>Delivery Speed</span>
                          <span className="text-emerald-600 font-bold">Instant (0-5 mins)</span>
                        </div>

                        <div className="pt-3 border-t border-slate-200/80 flex items-baseline justify-between">
                          <span className="text-sm font-black text-[#0f172a]">
                            Total Amount
                          </span>
                          <span
                            className="text-2xl font-black text-slate-900"
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            ₹{total}
                          </span>
                        </div>
                      </div>

                      {errorMsg && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                          ⚠️ {errorMsg}
                        </div>
                      )}

                      <Magnetic>
                        <button
                          type="button"
                          onClick={handleProceedToPayment}
                          className="w-full btn-primary text-center py-4 font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Proceed to Payment</span>
                          <span>➔</span>
                        </button>
                      </Magnetic>

                      <p className="text-[10px] text-slate-400 text-center">
                        🔒 Safe &amp; Direct UPI Transactions. No hidden gateway surcharge.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Invoice Modal for View / Print */}
      {currentInvoice && (
        <InvoiceModal
          isOpen={invoiceOpen}
          onClose={() => setInvoiceOpen(false)}
          data={currentInvoice}
        />
      )}

      <Footer />
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#cbdce3]">
          <div className="w-10 h-10 border-4 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}
