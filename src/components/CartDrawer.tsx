"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useApp, findGameById, PurchaseRecord } from "@/context/AppContext";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useState, useEffect } from "react";
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

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [purchasedKeys, setPurchasedKeys] = useState<PurchaseRecord[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<InvoiceData | null>(null);

  // Helper to load Razorpay SDK dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const cartDetails = cart
    .map((item) => {
      const details = findGameById(item.gameId);
      if (!details) return null;
      const finalPrice = details.price === 1 ? 1 : (item.playMode === "online" ? Math.round(details.price * 2.5) : details.price);
      return {
        ...item,
        ...details,
        price: finalPrice,
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

  const total = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setErrorMsg("");
    if (!user) {
      setCartOpen(false);
      router.push("/auth");
      return;
    }

    setLoading(true);

    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay payment SDK.");
      }

      // 2. Create Razorpay order on our server
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create order on server.");
      }

      const order = await res.json();

      // 3. Configure and open Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TG4A7LJ6rJhWjU",
        amount: order.amount,
        currency: order.currency,
        name: "Millennium Games",
        description: "Payment for Digital Games",
        order_id: order.id,
        handler: function (response: any) {
          // Payment is successful! complete local key generation
          const checkoutResult = checkout();
          if (checkoutResult.success && checkoutResult.keys) {
            setPurchasedKeys(checkoutResult.keys);
            setCheckoutSuccess(true);

            // Construct invoice data matching user's template
            const invData: InvoiceData = {
              invoiceNumber: `MG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
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
              transactionId: response.razorpay_payment_id || `RZP-PAY-${Date.now()}`,
              paymentMethod: "Razorpay Secure (UPI / Cards / NetBanking)",
            };
            setCurrentInvoice(invData);

            // 1. Automatically download invoice immediately after payment
            try {
              downloadInvoice(invData);
            } catch (dlErr) {
              console.error("Auto download invoice error:", dlErr);
            }

            // 2. Automatically redirect to WhatsApp in a new tab
            setTimeout(() => {
              window.open("https://wa.me/message/WXU5NCOSMGVRE1", "_blank");
            }, 600);
          } else {
            setErrorMsg(checkoutResult.error || "Payment succeeded, but key generation failed. Please contact support.");
          }
          setLoading(false);
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0f172a",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.error("Razorpay payment failed:", response.error);
        setErrorMsg(
          response.error?.description ||
          "Payment could not be completed. Please ensure your website domain is whitelisted in Razorpay."
        );
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during payment setup.");
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCartOpen(false);
    // Delay resetting success state so transition looks smooth
    setTimeout(() => {
      setCheckoutSuccess(false);
      setPurchasedKeys([]);
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
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] z-50 flex flex-col shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.55) 100%)",
              backdropFilter: "blur(32px) saturate(150%)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-300/40 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0f172a] flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
                🛒 {checkoutSuccess ? "Purchase Complete" : "Your Shopping Cart"}
              </h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-all"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {checkoutSuccess ? (
                /* Success State Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500 text-3xl animate-bounce">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                      Thank you for your order!
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Your game accounts have been generated and permanently saved to your library.
                    </p>
                  </div>

                  {/* Generated Accounts */}
                  <div className="space-y-3 pt-2 text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Game Accounts Sourced
                    </span>
                    {purchasedKeys.map((item) => (
                      <div key={item.id} className="bg-white/45 backdrop-blur-sm p-4 rounded-2xl border border-white/60 space-y-2.5 shadow-sm">
                        <div className="flex items-center gap-3">
                          <img src={item.gameImage} alt={item.gameTitle} className="w-12 h-15 object-cover rounded-lg shadow-sm flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-[#0f172a] leading-tight line-clamp-2">{item.gameTitle}</h4>
                            <div className="flex gap-1.5 mt-1 flex-wrap">
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-slate-600 bg-slate-200/50 border border-slate-300/40">
                                {item.platform.toUpperCase()}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-mint bg-mint/10 border border-mint/20">
                                {item.playMode === "online" ? "Online Play" : "Offline Play"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5 bg-slate-900/5 p-3 rounded-xl border border-slate-900/10">
                          <div className="text-[10.5px] text-slate-700">
                            <span className="font-bold text-slate-800">Username:</span> <code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[10.5px]">{item.accountUser}</code>
                          </div>
                          <div className="text-[10.5px] text-slate-700">
                            <span className="font-bold text-slate-800">Password:</span> <code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[10.5px]">{item.accountPass}</code>
                          </div>
                        </div>
                        <span className="text-[8.5px] text-slate-400 text-center block">
                          Access Steam Guard or 2FA login codes in your Library.
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 space-y-2.5">
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
                          className="py-2.5 px-3 rounded-full font-bold text-slate-900 bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer text-[11px] uppercase tracking-wider"
                        >
                          <span>🧾</span>
                          <span>View / Print</span>
                        </button>
                      </div>
                    )}

                    <a
                      href="https://wa.me/message/WXU5NCOSMGVRE1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-full font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-xs uppercase tracking-wider"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
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
                    <button onClick={handleClose} className="w-full text-slate-500 hover:text-slate-800 text-xs font-semibold transition-all">
                      Continue Browsing Store
                    </button>
                  </div>
                </motion.div>
              ) : cartDetails.length === 0 ? (
                /* Empty Cart State */
                <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200/50 flex items-center justify-center text-3xl">
                    🛍️
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f172a]">Your Cart is Empty</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[240px] mx-auto">
                      Scout the catalog and grab steam or epic game activation keys instantly.
                    </p>
                  </div>
                  <Magnetic>
                    <button
                      onClick={handleClose}
                      className="btn-primary text-xs py-2 px-6"
                    >
                      Browse Catalog
                    </button>
                  </Magnetic>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-4">
                  {cartDetails.map((item) => (
                    <div
                      key={`${item.gameId}-${item.playMode}`}
                      className="bg-white/45 backdrop-blur-sm p-3.5 rounded-2xl border border-white/60 flex gap-4 shadow-sm items-center hover:shadow-md transition-shadow duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded-xl shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <h3 className="text-sm font-bold text-[#0f172a] line-clamp-1 leading-tight">{item.title}</h3>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-slate-600 bg-slate-200/50 border border-slate-300/40">
                            🎮 {item.platform.toUpperCase()}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-mint bg-mint/10 border border-mint/20">
                            {item.playMode === "online" ? "Online Play" : "Offline Play"}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-mint">
                          ₹{item.price}
                        </div>
                      </div>
                      
                      {/* Quantity Controls & Delete */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <button
                          onClick={() => removeFromCart(item.gameId, item.playMode)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <div className="flex items-center rounded-lg border border-slate-300/40 bg-white/50 backdrop-blur-sm shadow-inner p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.gameId, item.quantity - 1, item.playMode)}
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-800 font-bold hover:bg-slate-200/50 rounded"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#0f172a]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.gameId, item.quantity + 1, item.playMode)}
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-800 font-bold hover:bg-slate-200/50 rounded"
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

            {/* Footer Summary (only shown if not success and items exist) */}
            {!checkoutSuccess && cartDetails.length > 0 && (
              <div className="p-6 border-t border-slate-300/40 bg-white/20 space-y-4">
                <div className="flex items-center justify-between text-base font-bold text-[#0f172a]">
                  <span>Total Amount:</span>
                  <span className="text-lg text-mint" style={{ fontFamily: "var(--font-outfit)" }}>
                    ₹{total}
                  </span>
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

                <div className="space-y-3">
                  <Magnetic>
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full btn-primary text-center py-3.5 font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-[#0f172a]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : !user ? (
                        "Sign In to Purchase"
                      ) : (
                        `Complete Purchase (Pay ₹${total})`
                      )}
                    </button>
                  </Magnetic>
                  <span className="text-[10px] text-slate-500 text-center block leading-relaxed">
                    By completing purchase, game accounts are instantly generated and added to your profile library. Sourced from official authorized sellers.
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
