"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useApp, findGameById, PurchaseRecord } from "@/context/AppContext";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useState } from "react";

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

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [purchasedKeys, setPurchasedKeys] = useState<PurchaseRecord[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const cartDetails = cart
    .map((item) => {
      const details = findGameById(item.gameId);
      if (!details) return null;
      const finalPrice = item.playMode === "online" ? Math.round(details.price * 2.5) : details.price;
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

  const handleCheckout = () => {
    setErrorMsg("");
    if (!user) {
      setErrorMsg("Please Sign In to complete your purchase.");
      return;
    }
    const res = checkout();
    if (res.success && res.keys) {
      setPurchasedKeys(res.keys);
      setCheckoutSuccess(true);
    } else {
      setErrorMsg(res.error || "An error occurred during checkout.");
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

                  <div className="pt-4 space-y-3">
                    <Magnetic>
                      <Link
                        href="/library"
                        onClick={handleClose}
                        className="w-full btn-primary text-center py-3.5 font-bold uppercase tracking-wider block"
                      >
                        Go to My Library
                      </Link>
                    </Magnetic>
                    <button onClick={handleClose} className="w-full text-slate-500 hover:text-slate-800 text-sm font-semibold transition-all">
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
                      className="w-full btn-primary text-center py-3.5 font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Complete Purchase (Pay ₹{total})
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
    </AnimatePresence>
  );
}
