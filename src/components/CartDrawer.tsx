"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useApp, findGameById, PurchaseRecord } from "@/context/AppContext";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import InvoiceModal, { InvoiceData, downloadInvoice } from "./InvoiceModal";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    checkout,
    user,
  } = useApp();

  const router = useRouter();

  const [cartStep, setCartStep] = useState<"cart" | "upi_payment">("cart");
  const cartStepRef = useRef<"cart" | "upi_payment">("cart");
  cartStepRef.current = cartStep;

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

  const cartDetails = cart
    .map((item) => {
      const details = findGameById(item.gameId);
      if (!details) return null;
      const isOnlineOnly = Boolean(
        (details as any)?.isOnlineOnly ||
        item.gameId === 8 ||
        item.gameId === 9 ||
        item.gameId === 1 ||
        item.gameId === 5 ||
        item.gameId === 17 ||
        item.gameId === 31 ||
        item.gameId === 32 ||
        details.title.toLowerCase().includes("call of duty") ||
        details.title.toLowerCase().includes("battlefield") ||
        details.title.toLowerCase().includes("arc raider") ||
        details.title.toLowerCase().includes("fc 26") ||
        details.title.toLowerCase().includes("modern warfare")
      );
      const effectiveMode: "offline" | "online" = isOnlineOnly ? "online" : item.playMode;
      const finalPrice = isOnlineOnly
        ? 499
        : effectiveMode === "online"
        ? Math.round(details.price * 2.5)
        : details.price;
      return {
        ...item,
        ...details,
        price: finalPrice,
        playMode: effectiveMode,
      };
    })
    .filter(Boolean) as Array<{
    gameId: number;
    quantity: number;
    playMode: "offline" | "online";
    title: string;
    price: number;
    image: string;
    platform: string;
  }>;

  const subtotal = cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Buy 2 Get 1 Free Promo for ₹199 offline games:
  const offline199Count = cartDetails
    .filter((item) => item.playMode === "offline" && item.price === 199)
    .reduce((sum, item) => sum + item.quantity, 0);

  // If purchasing above 2 games (3 or more), always apply 1 free game discount (-₹199)
  const freeGamesCount = offline199Count >= 3 ? 1 : 0;
  const promoDiscount = freeGamesCount * 199;

  const total = Math.max(0, subtotal - promoDiscount);

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
      setCartOpen(false);
      router.push("/auth");
      return;
    }
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "cart", step: "upi_payment" }, "");
    }
    setCartStep("upi_payment");
  };

  // Back to cart step
  const handleBackToCart = () => {
    if (
      typeof window !== "undefined" &&
      window.history.state?.step === "upi_payment"
    ) {
      window.history.back();
    } else {
      setCartStep("cart");
    }
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
      // 1. Perform checkout in AppContext with proof and optional UTR
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
            month: "long",
            year: "numeric",
          }),
          dueDate: "Paid on Receipt",
          customerName: user?.name || "Valued Customer",
          customerEmail: "millenniumpcgames@gmail.com",
          items: checkoutResult.keys.map((k) => ({
            id: k.id,
            gameTitle: k.gameTitle,
            platform: k.platform,
            playMode: k.playMode,
            quantity: 1,
            price: k.price,
          })),
          totalAmount: total,
          transactionId:
            utrNumber.trim() || `UPI-TXN-${Date.now().toString().slice(-8)}`,
          paymentMethod: "UPI Transfer (bllalwhdn@ptaxis)",
        };
        setCurrentInvoice(invData);

        // 2. Automatically download Tax Invoice
        try {
          downloadInvoice(invData);
        } catch (dlErr) {
          console.error("Auto download invoice error:", dlErr);
        }

        // 3. Format WhatsApp message with details and redirect
        const gameTitles = checkoutResult.keys.map((k) => k.gameTitle).join(", ");
        const waMsg = encodeURIComponent(
          `🎮 *Millennium Games - Payment Proof Submitted*\n` +
            `----------------------------------\n` +
            `📋 *Invoice / Order ID:* ${invoiceNumber}\n` +
            `👤 *Customer Name:* ${user?.name} (${user?.email})\n` +
            `💰 *Amount Paid:* ₹${total}\n` +
            `💳 *Paid To UPI ID:* bllalwhdn@ptaxis\n` +
            `🔢 *UTR / Ref No.:* ${
              utrNumber.trim() || "Uploaded in Website Proof"
            }\n` +
            `🎮 *Games Ordered:* ${gameTitles}\n` +
            `----------------------------------\n` +
            `I have completed the UPI payment and uploaded the screenshot on the website. Kindly verify my payment proof and approve my game account credentials / 2FA!`
        );

        setTimeout(() => {
          window.open(`https://wa.me/918089406346?text=${waMsg}`, "_blank");
        }, 800);
      } else {
        setErrorMsg(
          checkoutResult.error ||
            "Payment proof could not be verified. Please try again."
        );
      }
    } catch (err: any) {
      setErrorMsg(
        err.message || "An error occurred during order confirmation."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle mobile hardware/browser back button to close drawer instead of closing the tab
  useEffect(() => {
    if (!cartOpen) return;

    // Push state so back button pops this instead of closing the tab
    window.history.pushState({ modal: "cart", step: "cart" }, "");

    const handlePopState = () => {
      // If currently on upi_payment step, go back to cart items first
      if (cartStepRef.current === "upi_payment") {
        setCartStep("cart");
      } else {
        setCartOpen(false);
        setTimeout(() => {
          setCartStep("cart");
          setCheckoutSuccess(false);
          setPurchasedKeys([]);
          setPaymentProofImg(null);
          setPaymentProofFileName("");
          setUtrNumber("");
          setErrorMsg("");
        }, 300);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [cartOpen, setCartOpen]);

  const handleClose = () => {
    setCartOpen(false);
    if (typeof window !== "undefined" && window.history.state?.modal === "cart") {
      window.history.back();
    }
    setTimeout(() => {
      setCartStep("cart");
      setCheckoutSuccess(false);
      setPurchasedKeys([]);
      setPaymentProofImg(null);
      setPaymentProofFileName("");
      setUtrNumber("");
      setErrorMsg("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-sm z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] z-50 flex flex-col shadow-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(32px) saturate(150%)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.8)",
            }}
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-300/40 flex items-center justify-between bg-white/40">
              {checkoutSuccess ? (
                <h2
                  className="text-lg font-bold text-[#0f172a] flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Order Confirmed
                </h2>
              ) : cartStep === "upi_payment" ? (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleBackToCart}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-all text-xs font-bold shadow-sm cursor-pointer active:scale-95"
                    aria-label="Back to cart"
                  >
                    ←
                  </button>
                  <div>
                    <h2
                      className="text-base font-bold text-[#0f172a] leading-tight"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      UPI Payment
                    </h2>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Scan QR Code to Pay
                    </span>
                  </div>
                </div>
              ) : (
                <h2
                  className="text-lg font-bold text-[#0f172a] flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  🛒 Your Shopping Cart
                </h2>
              )}
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-all cursor-pointer"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {checkoutSuccess ? (
                /* Success State Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-2"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500 text-3xl animate-bounce">
                    ✓
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-[#0f172a]"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Payment Proof Submitted!
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Your game accounts have been generated and permanently saved
                      to your library.
                    </p>
                  </div>

                  {/* Generated Accounts */}
                  <div className="space-y-3 pt-2 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Game Accounts Sourced
                    </span>
                    {purchasedKeys.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200/70 space-y-2.5 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.gameImage}
                            alt={item.gameTitle}
                            className="w-12 h-15 object-cover rounded-lg shadow-sm flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-[#0f172a] leading-tight line-clamp-2">
                              {item.gameTitle}
                            </h4>
                            <div className="flex gap-1.5 mt-1 flex-wrap">
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200">
                                {item.platform.toUpperCase()}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-mint bg-mint/10 border border-mint/20">
                                {item.playMode === "online"
                                  ? "Online Play"
                                  : "Offline Play"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5 bg-slate-900/5 p-3 rounded-xl border border-slate-900/10">
                          <div className="text-[10.5px] text-slate-700">
                            <span className="font-bold text-slate-800">
                              Username:
                            </span>{" "}
                            <code className="bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[10.5px]">
                              {item.accountUser}
                            </code>
                          </div>
                          <div className="text-[10.5px] text-slate-700">
                            <span className="font-bold text-slate-800">
                              Password:
                            </span>{" "}
                            <code className="bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[10.5px]">
                              {item.accountPass}
                            </code>
                          </div>
                        </div>
                        <span className="text-[8.5px] text-slate-400 text-center block">
                          Access Steam Guard or 2FA login codes in your Library.
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-800 text-center font-medium">
                      ✓ Tax Invoice downloaded. Opening WhatsApp in a new tab...
                    </div>

                    {/* Download & View Tax Invoice Buttons */}
                    {currentInvoice && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => downloadInvoice(currentInvoice)}
                          className="py-2.5 px-3 rounded-full font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer text-[11px] uppercase tracking-wider"
                        >
                          <span>⬇️</span>
                          <span>Re-Download</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setInvoiceOpen(true)}
                          className="py-2.5 px-3 rounded-full font-bold text-slate-900 bg-slate-200 hover:bg-slate-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer text-[11px] uppercase tracking-wider"
                        >
                          <span>🧾</span>
                          <span>View / Print</span>
                        </button>
                      </div>
                    )}

                    <a
                      href={`https://wa.me/918089406346?text=${encodeURIComponent(
                        `🎮 *Millennium Games - Order Confirmed*\nI have completed the payment of ₹${total} to bllalwhdn@ptaxis and uploaded the payment screenshot. Please verify!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-full font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-xs uppercase tracking-wider"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Open WhatsApp Chat</span>
                    </a>

                    <Magnetic>
                      <Link
                        href="/library"
                        onClick={handleClose}
                        className="w-full btn-primary text-center py-2.5 font-bold uppercase tracking-wider block text-xs"
                      >
                        Go to My Library
                      </Link>
                    </Magnetic>
                    <button
                      onClick={handleClose}
                      className="w-full text-slate-500 hover:text-slate-800 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Continue Browsing Store
                    </button>
                  </div>
                </motion.div>
              ) : cartStep === "upi_payment" ? (
                /* ========================================================================= */
                /* UPI PAYMENT VIEW: QR Code, UPI Intent Deep Link & Screenshot Upload Area */
                /* ========================================================================= */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {/* Amount Payable Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#1e293b] text-white shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                        Amount Payable
                      </span>
                      <span
                        className="text-2xl font-black text-white"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        ₹{total}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold">
                        Official Merchant
                      </span>
                      <span className="text-xs font-bold text-emerald-300">
                        Millennium Games
                      </span>
                    </div>
                  </div>

                  {/* QR Code Container */}
                  <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-md text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Scan to Pay with Any UPI App
                    </div>

                    <div className="relative mx-auto w-60 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center overflow-hidden">
                      <img
                        src="/images/sidharth_shibu_qr.jpg"
                        alt="Paytm UPI QR Code - Sidharth Shibu"
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium">
                      Open Google Pay, PhonePe, Paytm, or BHIM &amp; scan this QR code to pay
                    </p>
                  </div>

                  {/* Copy UPI Details Section */}
                  <div className="space-y-2.5">
                    {/* UPI ID */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="min-w-0 pr-2">
                        <span className="text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider">
                          Official UPI ID
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-900 select-all truncate block">
                          bllalwhdn@ptaxis
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("bllalwhdn@ptaxis", "upi")}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
                      >
                        {copiedField === "upi" ? "✓ Copied!" : "Copy ID"}
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Payment Proof Screenshot Upload Area */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>📸 Upload Payment Screenshot</span>
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Required Proof
                      </span>
                    </div>

                    {!paymentProofImg ? (
                      /* Drag & Drop Upload Zone */
                      <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-emerald-500/50 hover:border-emerald-600 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-2xl cursor-pointer transition-all group text-center">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-600 text-xl group-hover:scale-110 transition-transform mb-2">
                          📤
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          Tap to select or take screenshot
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5">
                          Supports PNG, JPG, JPEG, WebP from your device
                        </span>
                      </label>
                    ) : (
                      /* Screenshot Preview */
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
                            className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-0.5 rounded hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            ✕ Remove
                          </button>
                        </div>
                        <div className="relative max-h-40 overflow-hidden rounded-xl bg-slate-900/5 flex items-center justify-center border border-slate-200">
                          <img
                            src={paymentProofImg}
                            alt="Payment Proof Screenshot"
                            className="max-h-40 w-auto object-contain rounded-lg"
                          />
                        </div>
                        <div className="text-[11px] text-slate-500 truncate font-mono">
                          📁 {paymentProofFileName}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional UTR / Reference Number Field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      12-Digit UTR / Transaction Ref No.{" "}
                      <span className="text-slate-400 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="e.g. 4238XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300/80 bg-white text-slate-900 text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>

                  {/* Error Message */}
                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <span>⚠️</span>
                      <span className="flex-1">{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Payment Proof Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleConfirmPayment}
                      disabled={loading || !paymentProofImg}
                      className={`w-full py-3.5 px-4 rounded-full font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                        paymentProofImg
                          ? "btn-primary cursor-pointer active:scale-[0.98]"
                          : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-75"
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-[#0f172a]"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Confirming Order...</span>
                        </>
                      ) : !paymentProofImg ? (
                        "📸 Please Upload Screenshot Above"
                      ) : (
                        `✓ Confirm Payment & Get Games (₹${total})`
                      )}
                    </button>
                    <span className="text-[10px] text-slate-500 text-center block">
                      Tax invoice will be downloaded automatically and credentials
                      saved to your library.
                    </span>
                  </div>
                </motion.div>
              ) : cartDetails.length === 0 ? (
                /* Empty Cart State */
                <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200/50 flex items-center justify-center text-3xl">
                    🛍️
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f172a]">
                      Your Cart is Empty
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[240px] mx-auto">
                      Scout the catalog and grab steam or epic game activation keys
                      instantly.
                    </p>
                  </div>
                  <Magnetic>
                    <button
                      onClick={handleClose}
                      className="btn-primary text-xs py-2 px-6 cursor-pointer"
                    >
                      Browse Catalog
                    </button>
                  </Magnetic>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-3.5">
                  {/* Buy 2 Get 1 Free Promo Notification */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 shadow-xs flex items-center gap-2.5">
                    <span className="text-lg flex-shrink-0">🎁</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-black text-emerald-950">
                          {freeGamesCount > 0
                            ? `🎉 Buy 2 Get 1 Free Applied!`
                            : "Buy 2 Get 1 Free"}
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full text-[8px] font-black uppercase bg-emerald-600 text-white">
                          {freeGamesCount > 0 ? `${freeGamesCount} FREE GAME` : "OFFER"}
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-800 leading-tight mt-0.5">
                        {freeGamesCount > 0
                          ? `₹${promoDiscount} auto-discount applied! 1 game is 100% free.`
                          : offline199Count === 2
                          ? "Add 1 more ₹199 game to get it 100% FREE!"
                          : offline199Count === 1
                          ? "Add 2 more ₹199 games to get 3rd game FREE!"
                          : "Buy 2 offline games at ₹199, get 3rd game FREE!"}
                      </p>
                    </div>
                  </div>

                  {cartDetails.map((item) => (
                    <div
                      key={`${item.gameId}-${item.playMode}`}
                      className="bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/70 flex gap-3.5 shadow-sm items-center hover:shadow-md transition-shadow duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-15 h-18 object-cover rounded-xl shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <h3 className="text-sm font-bold text-[#0f172a] line-clamp-1 leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200">
                            🎮 {item.platform.toUpperCase()}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-mint bg-mint/10 border border-mint/20">
                            {item.playMode === "online"
                              ? "Online Play"
                              : "Offline Play"}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-mint">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Quantity Controls & Delete */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <button
                          onClick={() =>
                            removeFromCart(item.gameId, item.playMode)
                          }
                          className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <svg
                            className="w-4.5 h-4.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                        <div className="flex items-center rounded-lg border border-slate-300/60 bg-white shadow-inner p-0.5">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.gameId,
                                item.quantity - 1,
                                item.playMode
                              )
                            }
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-800 font-bold hover:bg-slate-100 rounded cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#0f172a]">
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
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-800 font-bold hover:bg-slate-100 rounded cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Summary (when on "cart" step and items exist) */}
            {!checkoutSuccess &&
              cartStep === "cart" &&
              cartDetails.length > 0 && (
                <div className="p-5 border-t border-slate-300/40 bg-white/40 space-y-3.5">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-bold text-slate-900">₹{subtotal}</span>
                    </div>

                    {promoDiscount > 0 && (
                      <div className="flex items-center justify-between text-emerald-700 font-bold bg-emerald-500/15 p-1.5 rounded-lg border border-emerald-500/30">
                        <span className="flex items-center gap-1">
                          <span>🎁</span>
                          <span>Buy 2 Get 1 Free ({freeGamesCount} Free):</span>
                        </span>
                        <span>- ₹{promoDiscount}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-base font-bold text-[#0f172a] pt-1 border-t border-slate-200">
                      <span>Total Payable:</span>
                      <span
                        className="text-lg text-emerald-600"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        ₹{total}
                      </span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <span>⚠️</span>
                      <span className="flex-1">{errorMsg}</span>
                      {!user && (
                        <Link
                          href="/auth"
                          onClick={handleClose}
                          className="underline font-bold text-slate-800 hover:text-black ml-2"
                        >
                          Sign In
                        </Link>
                      )}
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <Magnetic>
                      <button
                        onClick={handleProceedToPayment}
                        className="w-full btn-primary text-center py-3.5 font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 text-xs"
                      >
                        {!user
                          ? "Sign In to Proceed to Payment"
                          : `Proceed to UPI Payment (₹${total})`}
                      </button>
                    </Magnetic>
                    <span className="text-[10px] text-slate-500 text-center block leading-relaxed">
                      Instant verification via QR code and UPI Apps (Google Pay,
                      PhonePe, Paytm).
                    </span>
                  </div>
                </div>
              )}
          </motion.div>
        </>
      )}

      {/* Invoice Modal for View / Print */}
      {currentInvoice && (
        <InvoiceModal
          isOpen={invoiceOpen}
          onClose={() => setInvoiceOpen(false)}
          data={currentInvoice}
        />
      )}
    </AnimatePresence>
  );
}
