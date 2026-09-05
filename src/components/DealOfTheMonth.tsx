"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { useApp } from "@/context/AppContext";

export default function DealOfTheMonth() {
  const router = useRouter();
  const { addToCart } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bundleDeal = {
    id: 123,
    title: "Epic Bundle With 123 Games AAA",
    headline: "Epic Bundle With 123 Games AAA",
    price: 1200,
    originalPrice: 49999,
    discount: 97,
    videoSrc: "/Game Videos/Main Best Account.mp4",
    totalGames: 123,
    platform: "Epic Games & Steam Master",
  };

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = "hidden";
      window.history.pushState({ modal: "deal_video" }, "");
      const handlePopState = () => {
        setIsVideoModalOpen(false);
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("popstate", handlePopState);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isVideoModalOpen]);

  const handleCloseModal = () => {
    if (typeof window !== "undefined" && window.history.state?.modal === "deal_video") {
      window.history.back();
    } else {
      setIsVideoModalOpen(false);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(bundleDeal.id, "offline");
    router.push("/cart");
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(bundleDeal.id, "offline");
    router.push("/cart?step=upi_payment");
  };

  return (
    <section id="deal-of-the-month" className="relative py-16 sm:py-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="abstract-shape abstract-shape-emerald w-[550px] h-[550px] top-1/4 -left-24 opacity-25" />
      <div className="abstract-shape abstract-shape-mint w-[500px] h-[500px] bottom-10 -right-20 opacity-20" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3 backdrop-blur-md bg-white/70 border border-white/80 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-slate-900 font-extrabold tracking-wide uppercase">🔥 Deal of the Month</span>
          </div>
          <h2 className="section-heading mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
            Epic Bundle With <span className="gradient-text">123 Games AAA</span>
          </h2>
          <p className="section-subheading mx-auto text-sm sm:text-base">
            The ultimate master gaming vault. Unlock 123 verified, high-demand AAA blockbusters in one single verified account.
          </p>
        </motion.div>

        {/* Master Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-[32px] overflow-hidden border border-white/30 shadow-2xl bg-slate-950/90 backdrop-blur-xl group"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left/Top: High-Bitrate Video Player Showcase */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] lg:min-h-[500px] bg-black overflow-hidden flex items-center justify-center">
              <video
                src={bundleDeal.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-950/90 pointer-events-none" />

              {/* Floating Badges on Video */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-amber-400 backdrop-blur-md shadow-lg">
                  ⭐ 123 AAA Titles
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600/90 backdrop-blur-md shadow">
                  🔥 97% OFF
                </span>
              </div>

              {/* Center Interactive Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Magnetic>
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full btn-glossy-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 cursor-pointer"
                    aria-label="Play bundle video"
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current text-black" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </Magnetic>
              </div>

              {/* Bottom Video Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 lg:hidden">
                <span className="text-xs font-bold text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                  ▶ Tap to Watch Showcase
                </span>
              </div>
            </div>

            {/* Right/Bottom: Bundle Details & Instant Checkout Panel */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 video-card-overlay">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    Verified Master Account
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">
                    Instant Key Allocation
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight"
                  style={{ fontFamily: "var(--font-outfit)", color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                >
                  Epic Bundle With 123 Games AAA
                </h3>

                <p
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                  style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}
                >
                  Massive digital account loaded with 123 top-tier blockbuster games including Black Myth: Wukong, Cyberpunk 2077, Red Dead Redemption 2, GTA V, Alan Wake 2, and 118 more AAA titles.
                </p>

                {/* Key Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>123 Full AAA Blockbusters</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Lifetime Access & Warranty</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Offline & Story Modes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Steam / Epic Guard 2FA Codes</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Call to Actions */}
              <div className="pt-4 border-t border-white/15 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block" style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}>
                      Deal of the Month Price
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
                        style={{ fontFamily: "var(--font-outfit)", color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                      >
                        ₹{bundleDeal.price}
                      </span>
                      <span className="text-sm sm:text-base text-slate-400 line-through" style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}>
                        ₹{bundleDeal.originalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40">
                      Save ₹{bundleDeal.originalPrice - bundleDeal.price}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/15 hover:bg-white text-white hover:text-black border border-white/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                    style={{ color: "#ffffff" }}
                  >
                    <span>🛒 Add to Cart</span>
                  </button>

                  <Magnetic>
                    <button
                      onClick={handleBuyNow}
                      className="w-full btn-primary text-center py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>⚡ Buy Bundle Now</span>
                    </button>
                  </Magnetic>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span>🛡️ 100% Verified Delivery</span>
                  <span>•</span>
                  <span>🔒 Instant Invoice & Credentials</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Video Modal Showcase (Portaled to document.body to prevent mobile scrolling displacement) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-lenis-prevent
              className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden"
              style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 15 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
                data-lenis-prevent
                className="video-modal-dark video-modal-content relative w-full max-w-[95vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/30 shadow-2xl flex flex-col my-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/15 bg-slate-950/95 flex-shrink-0">
                  <div className="min-w-0 pr-3">
                    <span
                      className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block"
                      style={{ color: "#fbbf24", WebkitTextFillColor: "#fbbf24", filter: "none" }}
                    >
                      Deal of the Month Video Showcase
                    </span>
                    <h3
                      className="text-xs sm:text-base font-bold text-white truncate max-w-lg"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none", textShadow: "none" }}
                    >
                      Epic Bundle With 123 Games AAA - Official Showcase
                    </h3>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center text-sm sm:text-base font-bold cursor-pointer transition-all flex-shrink-0 active:scale-90"
                    style={{ color: "#ffffff", filter: "none" }}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Video Player */}
                <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center flex-shrink-0">
                  <video
                    src={bundleDeal.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support high-definition video playback.
                  </video>
                </div>

                {/* Modal Footer with Checkout */}
                <div className="p-3 sm:p-5 bg-slate-950 border-t border-white/15 flex items-center justify-between gap-3 flex-shrink-0">
                  <div className="min-w-0 flex-1">
                    <h4
                      className="text-xs sm:text-sm font-bold text-white truncate"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none", textShadow: "none" }}
                    >
                      Epic Bundle (123 AAA Games)
                    </h4>
                    <p
                      className="text-[10px] sm:text-xs text-slate-300 truncate mt-0.5"
                      style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1", filter: "none", textShadow: "none" }}
                    >
                      Deal of the Month: ₹1200 (Instant Full Library Unlock)
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      handleBuyNow(e);
                      handleCloseModal();
                    }}
                    className="btn-primary text-xs px-4 py-2 sm:px-6 sm:py-2.5 cursor-pointer shadow-lg active:scale-95 flex-shrink-0"
                  >
                    ⚡ Buy Now ₹1200
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
