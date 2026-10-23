"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    label: "Trailer 2 (Gameplay)",
  },
  {
    id: "t1",
    title: "Phantom Blade Zero - Official Cinematic Reveal",
    videoSrc: "/Game Videos/Phantom Blade Zero.mp4",
    label: "Trailer 1 (Cinematic)",
  },
];

function BigScreenCountdown({ targetDate }: { targetDate: string }) {
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
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="relative px-2 py-2 sm:px-3 sm:py-2.5 rounded-xl sm:rounded-2xl border border-white/20 bg-slate-950/70 backdrop-blur-xl shadow-lg text-center overflow-hidden group"
          style={{
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
          <div
            className="text-lg sm:text-2xl md:text-3xl font-black text-white font-mono tracking-tight"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            {String(u.value).padStart(2, "0")}
          </div>
          <div
            className="text-[9px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-widest mt-0.5"
            style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}
          >
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PhantomBladeShowcase() {
  const router = useRouter();
  const { addToCart } = useApp();
  const [mounted, setMounted] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState<TrailerOption | null>(null);
  const [currentTrailer, setCurrentTrailer] = useState<TrailerOption>(trailersList[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const phantomGame = {
    id: 34,
    title: "Phantom Blade Zero",
    price: 349,
    originalPrice: 499,
    discount: 30,
    releaseDate: "2026-10-29",
    genre: "Action RPG • Dark Wuxia Kungfupunk",
    platform: "Steam Official Account",
    image: "/images/Game Images/phantom blade.png",
    description:
      "Soul, an elite assassin wounded and granted 66 days to live, must master lightning-fast martial arts combos and mystical blade strikes to uncover a deadly conspiracy in this adrenaline-fueled dark wuxia Kungfupunk masterclass.",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSwitchTrailer = (trailer: TrailerOption) => {
    setCurrentTrailer(trailer);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
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

  const handleOpenModal = (trailer: TrailerOption) => {
    setSelectedTrailer(trailer);
  };

  const handleCloseModal = () => {
    setSelectedTrailer(null);
  };

  return (
    <section id="phantom-blade-spotlight" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] -top-32 -right-32 opacity-25" />
      <div className="abstract-shape abstract-shape-mint w-[500px] h-[500px] -bottom-24 -left-24 opacity-20" />
      <div
        className="starburst starburst-lg -top-12 -left-10"
        style={{ animation: "rotateStar 55s linear infinite" }}
      />
      <div
        className="starburst starburst-sm bottom-12 right-12"
        style={{ animation: "rotateStar 35s linear infinite reverse" }}
      />

      <div className="container-custom relative z-10">
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-800 text-xs sm:text-sm font-bold mb-3 backdrop-blur-md bg-white/70 border border-white/80 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-900 font-extrabold tracking-wide uppercase">
              🔥 World Premiere • Official Big Screen Showcase
            </span>
          </div>
          <h2 className="section-heading mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
            Phantom Blade Zero — <span className="gradient-text">Official Launch</span>
          </h2>
          <p className="section-subheading mx-auto text-sm sm:text-base">
            Witness the raw martial arts combat on the big screen. Pre-order your verified Steam account today.
          </p>
        </motion.div>

        {/* Big Screen Theater Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden glass-card border border-white/30 shadow-2xl bg-slate-950/95 backdrop-blur-2xl"
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* BIG SCREEN Video Player / Visual Container */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-black group cursor-pointer"
            onClick={() => handleOpenModal(currentTrailer)}
          >
            {/* Poster Wallpaper & Video */}
            <video
              ref={videoRef}
              key={currentTrailer.videoSrc}
              src={currentTrailer.videoSrc}
              poster={phantomGame.image}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              webkit-playsinline="true"
              preload="auto"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none hidden md:block" />

            {/* Top Badges & Theater Controls */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 sm:gap-3 z-20">
              <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black bg-white/95 backdrop-blur-md border border-white/80 shadow-md">
                ⭐ BIG SCREEN 4K HDR
              </span>
              <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white bg-red-600/90 backdrop-blur-md border border-white/40 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>LIVE PREVIEW</span>
              </span>
            </div>

            {/* Top Right Sound & Cinema Expand Controls */}
            <div
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90"
                title={isPlaying ? "Pause Video" : "Play Video"}
                aria-label="Toggle Play"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={toggleMute}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
                aria-label="Toggle Mute"
              >
                {isMuted ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(currentTrailer);
                }}
                className="px-3 py-2 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-1.5"
                title="Fullscreen Big Screen Cinema"
              >
                <span>⛶ Fullscreen</span>
              </button>
            </div>

            {/* Center Play Trailer Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Magnetic>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full btn-glossy-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 pointer-events-auto">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current text-black" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </Magnetic>
            </div>

            {/* Bottom Floating Info Overlay inside Big Screen */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
              <div className="max-w-xl">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                  {phantomGame.genre} • {phantomGame.platform}
                </span>
                <h3
                  className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-lg"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {phantomGame.title}
                </h3>
              </div>

              {/* Multi-Trailer Switcher Pills on the Big Screen */}
              <div
                className="flex items-center gap-2 flex-wrap pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {trailersList.map((t) => {
                  const isActive = currentTrailer.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSwitchTrailer(t)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95 ${
                        isActive
                          ? "btn-glossy-white text-black font-extrabold border-2 border-white"
                          : "bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md"
                      }`}
                    >
                      {isActive && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Showcase Panel: Live Launch Countdown + Pricing & Actions */}
          <div className="p-5 sm:p-7 md:p-8 border-t border-white/15 bg-slate-950/90">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Countdown & Launch Info */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span
                      className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200"
                      style={{ color: "#e2e8f0", WebkitTextFillColor: "#e2e8f0" }}
                    >
                      Official World Launch Countdown
                    </span>
                  </div>
                  <span
                    className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full"
                    style={{ color: "#34d399", WebkitTextFillColor: "#34d399" }}
                  >
                    October 29, 2026
                  </span>
                </div>

                {/* Big Screen Countdown */}
                <BigScreenCountdown targetDate={phantomGame.releaseDate} />

                <p
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1"
                  style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}
                >
                  {phantomGame.description}
                </p>
              </div>

              {/* Right Column: Pre-order Price & Quick Checkout */}
              <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span
                      className="text-xs font-semibold text-slate-400 block uppercase tracking-wider"
                      style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}
                    >
                      Pre-order Special Price
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span
                        className="text-3xl sm:text-4xl font-black text-white"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: "#ffffff",
                          WebkitTextFillColor: "#ffffff",
                        }}
                      >
                        ₹{phantomGame.price}
                      </span>
                      <span
                        className="text-sm sm:text-base text-slate-400 line-through"
                        style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}
                      >
                        ₹{phantomGame.originalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-900/60 border border-emerald-500/40 shadow-sm inline-block">
                      Save ₹{phantomGame.originalPrice - phantomGame.price} ({phantomGame.discount}% OFF)
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Includes 2FA Steam Guard & Lifetime Setup
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                    style={{ color: "#ffffff" }}
                  >
                    <span>🛒 Add to Cart</span>
                  </button>
                  <Magnetic>
                    <button
                      onClick={handlePreorder}
                      className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold btn-primary transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <span>⚡ Pre-order Now ₹{phantomGame.price}</span>
                    </button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Video Modal for Cinematic Big Screen playback */}
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
                        Phantom Blade Zero • 4K Big Screen Cinema
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

                  {/* Multi-Trailer Switcher inside Modal */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-white/10 overflow-x-auto no-scrollbar flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Switch Trailer:
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
                        Phantom Blade Zero (Steam Official)
                      </h4>
                      <p
                        className="text-[10px] sm:text-xs text-slate-300 truncate mt-0.5"
                        style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1", filter: "none", textShadow: "none" }}
                      >
                        World Launch: October 29, 2026 • Verified Pre-order
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
