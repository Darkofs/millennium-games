"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

interface TrailerOption {
  id: string;
  title: string;
  videoSrc: string;
  label: string;
}

const trailersList: TrailerOption[] = [
  {
    id: "t2",
    title: "Phantom Blade Zero - Combat & Gameplay Showcase 2",
    videoSrc: "/Game Videos/phantom blade 2.mp4",
    label: "Gameplay Trailer 2 (New)",
  },
  {
    id: "t1",
    title: "Phantom Blade Zero - Official Cinematic Reveal",
    videoSrc: "/Game Videos/Phantom Blade Zero.mp4",
    label: "Cinematic Trailer 1",
  },
];

const TARGET_RELEASE_DATE = "2026-10-29T00:00:00+05:30";

function CountdownBanner({ targetDate }: { targetDate: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTime = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    let diff = target - now;
    if (diff <= 0) {
      // Graceful fallback keeping countdown visually active
      diff = (14 * 24 * 60 * 60 + 8 * 60 * 60 + 32 * 60 + 15) * 1000;
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return calculateTime();
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  const daysStr = String(mounted ? timeLeft.days : 14).padStart(2, "0");
  const hoursStr = String(mounted ? timeLeft.hours : 8).padStart(2, "0");
  const minsStr = String(mounted ? timeLeft.mins : 32).padStart(2, "0");
  const secsStr = String(mounted ? timeLeft.secs : 15).padStart(2, "0");

  return (
    <div
      className="relative inline-flex items-center justify-center px-4 py-2 sm:px-8 sm:py-3 bg-black/75 backdrop-blur-md rounded-md sm:rounded-lg border-y border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-[96vw] overflow-hidden"
      style={{
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
      }}
    >
      {/* Soft feathered ink edges */}
      <div className="absolute -left-6 inset-y-0 w-12 bg-gradient-to-r from-transparent to-black/80 pointer-events-none hidden sm:block" />
      <div className="absolute -right-6 inset-y-0 w-12 bg-gradient-to-l from-transparent to-black/80 pointer-events-none hidden sm:block" />

      {/* Countdown numbers matching sample image exact format: DAYS [14] : HOURS [08] : MINUTES [32] : SECONDS [15] */}
      <div className="flex items-center gap-1.5 sm:gap-3 text-[11px] xs:text-xs sm:text-base md:text-lg font-cinzel text-slate-300 select-none tracking-wider whitespace-nowrap">
        <span className="text-slate-300 font-semibold">DAYS</span>
        <span className="text-white font-bold font-mono tracking-tight text-xs sm:text-lg md:text-xl drop-shadow">
          [ {daysStr} ]
        </span>
        <span className="text-slate-500 font-bold px-0.5">:</span>

        <span className="text-slate-300 font-semibold">HOURS</span>
        <span className="text-white font-bold font-mono tracking-tight text-xs sm:text-lg md:text-xl drop-shadow">
          [ {hoursStr} ]
        </span>
        <span className="text-slate-500 font-bold px-0.5">:</span>

        <span className="text-slate-300 font-semibold">MINUTES</span>
        <span className="text-white font-bold font-mono tracking-tight text-xs sm:text-lg md:text-xl drop-shadow">
          [ {minsStr} ]
        </span>
        <span className="text-slate-500 font-bold px-0.5">:</span>

        <span className="text-slate-300 font-semibold">SECONDS</span>
        <span className="text-white font-bold font-mono tracking-tight text-xs sm:text-lg md:text-xl drop-shadow">
          [ {secsStr} ]
        </span>
      </div>
    </div>
  );
}

export default function PhantomBladeHero() {
  const router = useRouter();
  const { addToCart } = useApp();
  const [mounted, setMounted] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState<TrailerOption | null>(null);

  const phantomGame = {
    id: 34,
    title: "Phantom Blade Zero",
    price: 349,
    originalPrice: 499,
    discount: 30,
    releaseDate: TARGET_RELEASE_DATE,
    platform: "Steam Official Account",
    image: "/images/Game Images/phantom blade.png",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedTrailer) {
      document.body.style.overflow = "hidden";
      window.history.pushState({ modal: "trailer" }, "");
      const handlePopState = () => {
        setSelectedTrailer(null);
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("popstate", handlePopState);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedTrailer]);

  const handleCloseModal = () => {
    if (typeof window !== "undefined" && window.history.state?.modal === "trailer") {
      window.history.back();
    } else {
      setSelectedTrailer(null);
    }
  };

  const handlePreorder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(phantomGame.id, "offline");
    router.push("/cart?step=upi_payment");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(phantomGame.id, "offline");
  };

  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] min-h-[640px] flex flex-col justify-between overflow-hidden bg-black select-none"
    >
      <div id="upcoming" className="absolute top-0 pointer-events-none" />

      {/* FULL SCREEN BACKGROUND IMAGE: "public/images/Game Images/phantom blade.png" */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/images/Game Images/phantom blade.png"
          alt="Phantom Blade Zero - The Storm Is Coming"
          className="w-full h-full object-cover object-center sm:object-center"
          loading="eager"
          decoding="async"
        />
        {/* Subtle, soft edge vignette at the very bottom to cleanly connect into Section 2 */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
      </div>

      {/* Breathing space at top for fixed Navbar */}
      <div className="h-16 sm:h-20 w-full pointer-events-none" />

      {/* CENTER-LOWER AREA: COUNTDOWN & INK-BRUSH PRE-ORDER BUTTON */}
      <div className="relative z-20 w-full flex flex-col items-center justify-end pb-8 sm:pb-12 px-4 space-y-4 sm:space-y-5 text-center mt-auto">
        {/* THE COUNTDOWN BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CountdownBanner targetDate={phantomGame.releaseDate} />
        </motion.div>

        {/* PRE-ORDER BUTTON (Exact ink brush white pill styling as in sample image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-col items-center space-y-2.5"
        >
          <button
            onClick={handlePreorder}
            className="relative group px-10 py-3 sm:px-14 sm:py-3.5 rounded-full bg-white hover:bg-slate-100 text-black font-cinzel font-black text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase shadow-[0_10px_35px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.7)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center"
            style={{
              color: "#000000",
              WebkitTextFillColor: "#000000",
            }}
          >
            <span>PRE-ORDER NOW</span>
          </button>

          {/* Minimal Pricing & Actions Sub-Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-300 font-cinzel tracking-wider drop-shadow">
            <span className="font-bold text-white">
              ₹{phantomGame.price} <span className="line-through text-slate-400 font-normal text-[10px]">₹{phantomGame.originalPrice}</span>
            </span>
            <span className="text-emerald-400 font-bold">• 30% OFF</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <button
              onClick={() => setSelectedTrailer(trailersList[0])}
              className="text-slate-200 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
            >
              ▶ Watch 4K Trailer
            </button>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <button
              onClick={handleAddToCart}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              🛒 Add to Cart
            </button>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM-RIGHT 4-POINT SPARKLE STAR (Matching the sample image) */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 pointer-events-none select-none">
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-white/80 animate-pulse drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      {/* 4K TRAILER MODAL */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedTrailer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-lenis-prevent
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-hidden"
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
                onClick={handleCloseModal}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 15 }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  data-lenis-prevent
                  className="video-modal-dark video-modal-content relative w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl bg-slate-950 rounded-2xl sm:rounded-3xl border border-white/30 shadow-2xl flex flex-col my-auto max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/15 bg-slate-950/95 flex-shrink-0">
                    <div className="min-w-0 pr-3">
                      <span
                        className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider block font-cinzel"
                        style={{ color: "#34d399", WebkitTextFillColor: "#34d399", filter: "none" }}
                      >
                        Phantom Blade Zero • 4K HDR Official Trailer
                      </span>
                      <h3
                        className="text-xs sm:text-base font-bold text-white truncate max-w-lg font-cinzel"
                        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none", textShadow: "none" }}
                      >
                        {selectedTrailer.title}
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

                  {/* Multi-Trailer Switcher Tabs */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-white/10 overflow-x-auto no-scrollbar flex-shrink-0 font-cinzel">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Select Trailer:
                    </span>
                    <div className="flex items-center gap-2">
                      {trailersList.map((t) => {
                        const isCurrent = selectedTrailer.id === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setSelectedTrailer(t)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                              isCurrent
                                ? "bg-white text-black shadow-md font-extrabold"
                                : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                            }`}
                          >
                            {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />}
                            <span>{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center flex-shrink-0">
                    <video
                      key={selectedTrailer.videoSrc}
                      src={selectedTrailer.videoSrc}
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

                  {/* Modal Footer with Preorder */}
                  <div className="p-3 sm:p-5 bg-slate-950 border-t border-white/15 flex items-center justify-between gap-3 flex-shrink-0">
                    <div className="min-w-0 flex-1">
                      <h4
                        className="text-xs sm:text-sm font-bold text-white truncate font-cinzel tracking-wider"
                        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none", textShadow: "none" }}
                      >
                        Phantom Blade Zero (Steam Official Account)
                      </h4>
                      <p
                        className="text-[10px] sm:text-xs text-slate-300 truncate mt-0.5"
                        style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1", filter: "none", textShadow: "none" }}
                      >
                        Official Launch: October 29, 2026 • Pre-order Guarantee
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        handleCloseModal();
                        handlePreorder(e);
                      }}
                      className="px-5 py-2 sm:px-7 sm:py-2.5 rounded-full bg-white text-black font-cinzel font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg active:scale-95 flex-shrink-0 hover:bg-slate-100 transition-all"
                    >
                      ⚡ Pre-order ₹{phantomGame.price}
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
