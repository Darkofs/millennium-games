"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user has already dismissed the popup in the current session
    const hasSeenPromo = sessionStorage.getItem("millennium_b2g1_seen");
    
    // Auto-open after a smooth 1.2s delay if not seen in session
    const timer = setTimeout(() => {
      if (!hasSeenPromo) {
        setIsOpen(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("millennium_b2g1_seen", "true");
    setIsOpen(false);
  };

  const handleClaim = () => {
    sessionStorage.setItem("millennium_b2g1_seen", "true");
    setIsOpen(false);
    // Smooth scroll to featured games section
    const featuredElem = document.getElementById("featured");
    if (featuredElem) {
      featuredElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Reopen Button if closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-5 left-5 z-40 hidden sm:block"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 text-white border border-emerald-500/40 shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group"
              style={{
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300 transition-colors">
                🎁 Buy 2 Get 1 Free
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Promo Modal */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-lenis-prevent
                className="fixed inset-0 z-[999999] flex items-center justify-center p-3.5 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
                onClick={handleClose}
              >
                <motion.div
                  initial={{ scale: 0.88, opacity: 0, y: 25 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.88, opacity: 0, y: 25 }}
                  transition={{ type: "spring", damping: 26, stiffness: 300 }}
                  data-lenis-prevent
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-lg rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-950 border border-emerald-500/40 shadow-2xl p-5 sm:p-8 text-center my-auto"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                    background: "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.18), transparent 70%), #020617",
                  }}
                >
                  {/* Decorative Glow Elements */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-all active:scale-90 border border-white/10"
                    aria-label="Close promotion modal"
                  >
                    ✕
                  </button>

                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-950 bg-emerald-400 shadow-md mb-4 animate-bounce">
                    <span>⚡ SPECIAL LAUNCH OFFER</span>
                  </div>

                  {/* Big Headline */}
                  <h2
                    className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2 tracking-tight"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    BUY <span className="text-emerald-400">2 GAMES</span>, <br className="hidden sm:inline" />
                    GET <span className="text-yellow-400 underline decoration-emerald-400 decoration-wavy decoration-2">1 FREE!</span> 🎁
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6 font-medium">
                    Purchase any <span className="text-white font-bold">2 games</span> at our special price (starting at ₹299) and get your <span className="text-emerald-400 font-bold">3rd game completely FREE</span>!
                  </p>

                  {/* 3 Step Process Box */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 text-left">
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                      <div className="text-lg sm:text-xl mb-1">🎮</div>
                      <div className="text-[10px] sm:text-xs font-bold text-white leading-snug">Pick 2 Games</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">From ₹299 each</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                      <div className="text-lg sm:text-xl mb-1">➕</div>
                      <div className="text-[10px] sm:text-xs font-bold text-white leading-snug">Add 3rd Game</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">Any game choice</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm text-center">
                      <div className="text-lg sm:text-xl mb-1">🎁</div>
                      <div className="text-[10px] sm:text-xs font-bold text-emerald-400 leading-snug">100% FREE</div>
                      <div className="text-[9px] sm:text-[10px] text-emerald-300 mt-0.5">Free allocation</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5">
                    <Magnetic>
                      <button
                        onClick={handleClaim}
                        className="w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/25 transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span>🔥 CLAIM OFFER & BROWSE GAMES</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </Magnetic>

                    <button
                      onClick={handleClose}
                      className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer pt-1"
                    >
                      No thanks, I&apos;ll browse standard catalogue
                    </button>
                  </div>

                  {/* Trust Footer inside popup */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-[10px] sm:text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="text-emerald-400">✓</span> Instant Delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-emerald-400">✓</span> Lifetime Support
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-emerald-400">✓</span> 100% Guaranteed
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
