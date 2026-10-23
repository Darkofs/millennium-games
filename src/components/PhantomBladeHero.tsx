"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";
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

function HeroCountdown({ targetDate }: { targetDate: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTime = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    let diff = target - now;
    if (diff <= 0) {
      diff = (54 * 24 * 60 * 60 + 18 * 60 * 60 + 32 * 60 + 45) * 1000;
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

  const units = [
    { label: "Days", value: mounted ? timeLeft.days : 54 },
    { label: "Hours", value: mounted ? timeLeft.hours : 18 },
    { label: "Minutes", value: mounted ? timeLeft.mins : 32 },
    { label: "Seconds", value: mounted ? timeLeft.secs : 45 },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl">
      {units.map((u) => (
        <div
          key={u.label}
          className="relative px-2 py-3 sm:px-4 sm:py-4 rounded-2xl border border-white/25 bg-slate-950/75 backdrop-blur-xl shadow-2xl text-center overflow-hidden group"
          style={{
            boxShadow:
              "0 20px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          <div
            className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-mono tracking-tight drop-shadow-md"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            {String(u.value).padStart(2, "0")}
          </div>
          <div
            className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest mt-1"
            style={{ color: "#34d399", WebkitTextFillColor: "#34d399" }}
          >
            {u.label}
          </div>
        </div>
      ))}
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
    releaseDate: "2026-10-29",
    genre: "Dark Wuxia Kungfupunk Action RPG",
    platform: "Steam Official Account",
    image: "/images/Game Images/phantom blade.png",
    description:
      "Soul, an elite assassin wounded and granted 66 days to live, must master lightning-fast martial arts combos and mystical blade strikes to uncover a deadly conspiracy in this adrenaline-fueled dark wuxia Kungfupunk masterclass.",
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
    router.push("/cart");
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* FULL WINDOW BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/images/Game Images/phantom blade.png"
          alt="Phantom Blade Zero Official Wallpaper"
          className="w-full h-full object-cover object-center scale-105 transform origin-center transition-transform duration-1000"
          loading="eager"
        />
        {/* Cinematic gradient vignette overlays for perfect typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950/80" />
      </div>

      {/* Atmospheric Starbursts & Glows */}
      <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] -top-24 -left-24 opacity-30" />
      <div className="abstract-shape abstract-shape-mint w-[450px] h-[450px] bottom-10 right-10 opacity-20" />

      {/* Main Hero Content Container */}
      <div className="container-custom relative z-10 my-auto py-6 sm:py-10">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Top Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md bg-white/90 text-black border border-white/80 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>MILLENNIUM GAMES EXCLUSIVE PREMIERE</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md border border-white/25 shadow-sm">
              🎮 STEAM OFFICIAL ACCOUNT
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <span
              className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400 block"
              style={{ color: "#34d399", WebkitTextFillColor: "#34d399" }}
            >
              {phantomGame.genre}
            </span>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none drop-shadow-2xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Phantom Blade <span className="gradient-text">Zero</span>
            </h1>
          </motion.div>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl drop-shadow"
            style={{ color: "#e2e8f0", WebkitTextFillColor: "#e2e8f0" }}
          >
            {phantomGame.description}
          </motion.p>

          {/* THE COUNTDOWN SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3 pt-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200"
                style={{ color: "#e2e8f0", WebkitTextFillColor: "#e2e8f0" }}
              >
                Official Launch Countdown • October 29, 2026
              </span>
            </div>
            <HeroCountdown targetDate={phantomGame.releaseDate} />
          </motion.div>

          {/* Pricing & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-3 space-y-4"
          >
            {/* Price Badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl sm:text-5xl font-black text-white"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "#ffffff",
                    WebkitTextFillColor: "#ffffff",
                  }}
                >
                  ₹{phantomGame.price}
                </span>
                <span
                  className="text-base sm:text-lg text-slate-400 line-through"
                  style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}
                >
                  ₹{phantomGame.originalPrice}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 shadow-sm">
                Save ₹{phantomGame.originalPrice - phantomGame.price} ({phantomGame.discount}% OFF)
              </span>
              <span className="text-xs text-slate-300">
                • 2FA Steam Guard & Lifetime Setup Included
              </span>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <Magnetic>
                <button
                  onClick={handlePreorder}
                  className="px-7 py-3.5 sm:px-9 sm:py-4 rounded-full text-sm sm:text-base font-extrabold btn-primary cursor-pointer shadow-2xl transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>⚡ Pre-order Now ₹{phantomGame.price}</span>
                </button>
              </Magnetic>

              <button
                onClick={() => setSelectedTrailer(trailersList[0])}
                className="px-5 py-3.5 rounded-full text-sm font-bold bg-white/15 hover:bg-white text-white hover:text-black border border-white/30 backdrop-blur-md shadow-lg transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                style={{ color: "#ffffff" }}
              >
                <span>▶ Watch 4K Trailer</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="px-5 py-3.5 rounded-full text-sm font-bold bg-slate-900/80 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md shadow-md transition-all cursor-pointer active:scale-95"
                style={{ color: "#ffffff" }}
              >
                <span>🛒 Add to Cart</span>
              </button>

              <Link
                href="/#catalog"
                className="px-5 py-3.5 rounded-full text-sm font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Explore Full Store</span>
                <span>↓</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Trust & Feature Bar */}
      <div className="container-custom relative z-10 border-t border-white/15 pt-5 mt-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">⚡</span> Instant Account Access
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">🔒</span> 2FA Steam Guard Support
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Verified Personal Account
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">💬</span> 24/7 WhatsApp Support
            </span>
          </div>

          <Link
            href="/#catalog"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <span>Browse 30+ Steam & Epic AAA Games</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Video Trailer Modal */}
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
                        className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider block"
                        style={{ color: "#34d399", WebkitTextFillColor: "#34d399", filter: "none" }}
                      >
                        Phantom Blade Zero • 4K HDR Official Trailer
                      </span>
                      <h3
                        className="text-xs sm:text-base font-bold text-white truncate max-w-lg"
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
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-white/10 overflow-x-auto no-scrollbar flex-shrink-0">
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
                                ? "bg-emerald-500 text-black shadow-md font-extrabold"
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
                        className="text-xs sm:text-sm font-bold text-white truncate"
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
                      className="btn-primary text-xs px-4 py-2 sm:px-6 sm:py-2.5 cursor-pointer shadow-lg active:scale-95 flex-shrink-0"
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
