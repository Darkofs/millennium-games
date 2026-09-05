"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { upcomingGames, UpcomingGame } from "@/data/gameData";
import Magnetic from "./Magnetic";
import { useApp } from "@/context/AppContext";

function Countdown({ targetDate }: { targetDate: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTime = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    let diff = target - now;
    // Ensure active countdown even across timezones or clock discrepancies
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

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { label: "Days", value: 54 },
          { label: "Hours", value: 18 },
          { label: "Mins", value: 32 },
          { label: "Secs", value: 45 },
        ].map((u) => (
          <div
            key={u.label}
            className="p-2 sm:p-2.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-sm"
          >
            <div
              className="text-base sm:text-xl font-extrabold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              {String(u.value).padStart(2, "0")}
            </div>
            <div
              className="text-[10px] font-semibold text-slate-300 mt-1 uppercase tracking-wider"
              style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}
            >
              {u.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.mins },
        { label: "Secs", value: timeLeft.secs },
      ].map((u) => (
        <div
          key={u.label}
          className="p-2 sm:p-2.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-sm"
        >
          <div
            className="text-base sm:text-xl font-extrabold text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            {String(u.value).padStart(2, "0")}
          </div>
          <div
            className="text-[10px] font-semibold text-slate-300 mt-1 uppercase tracking-wider"
            style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}
          >
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UpcomingReleases() {
  const router = useRouter();
  const { addToCart } = useApp();
  const [selectedTrailer, setSelectedTrailer] = useState<UpcomingGame | null>(null);
  const [mounted, setMounted] = useState(false);

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

  const handleCloseTrailer = () => {
    if (typeof window !== "undefined" && window.history.state?.modal === "trailer") {
      window.history.back();
    } else {
      setSelectedTrailer(null);
    }
  };

  return (
    <section id="upcoming" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] bottom-0 right-0" />
      <div
        className="starburst starburst-md top-[5%] -left-10"
        style={{ animation: "rotateStar 45s linear infinite" }}
      />
      <div
        className="starburst starburst-sm bottom-[10%] right-[8%]"
        style={{ animation: "rotateStar 30s linear infinite reverse" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-800 text-sm font-bold mb-4 backdrop-blur-md bg-white/60 border border-white/80 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-800">Most Anticipated AAA Blockbuster</span>
          </div>
          <h2 className="section-heading mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Upcoming <span className="gradient-text">Releases</span>
          </h2>
          <p className="section-subheading mx-auto">
            Get ready for the most anticipated titles. Pre-order now and be the first to play on launch day.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div
          className={`grid ${
            upcomingGames.length === 1
              ? "grid-cols-1 max-w-4xl mx-auto"
              : "grid-cols-1 md:grid-cols-2"
          } gap-6`}
        >
          {upcomingGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="upcoming-card-overlay overflow-hidden group cursor-pointer border border-white/20 shadow-2xl rounded-[28px] bg-slate-950/90 backdrop-blur-xl"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <div className="block">
                <div className="flex flex-col sm:flex-row items-stretch">
                  {/* Image / Video Media Container */}
                  <div className="relative w-full sm:w-80 md:w-96 min-h-[260px] sm:min-h-[320px] flex-shrink-0 overflow-hidden bg-slate-950">
                    {game.videoSrc ? (
                      <video
                        src={game.videoSrc}
                        poster={game.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      />
                    ) : (
                      <img
                        src={game.image}
                        alt={game.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/80 hidden sm:block pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent sm:hidden pointer-events-none" />

                    {/* Play trailer button */}
                    {game.videoSrc && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Magnetic>
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedTrailer(game);
                            }}
                            role="button"
                            className="w-14 h-14 rounded-full btn-glossy-white flex items-center justify-center shadow-xl opacity-90 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                            aria-label="Play trailer"
                          >
                            <svg
                              className="w-6 h-6 ml-1 fill-current text-black"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </motion.div>
                        </Magnetic>
                      </div>
                    )}

                    {/* Genre badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span
                        className="px-3 py-1 rounded-full text-white text-xs font-bold backdrop-blur-md shadow-sm"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
                          border: "1px solid rgba(255,255,255,0.3)",
                          color: "#ffffff",
                          WebkitTextFillColor: "#ffffff",
                        }}
                      >
                        {game.genre}
                      </span>
                    </div>

                    {/* Live Trailer Badge */}
                    {game.videoSrc && (
                      <div
                        className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-red-600/90 backdrop-blur-md shadow"
                        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span>TRAILER READY</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span
                            className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1"
                            style={{ color: "#34d399", WebkitTextFillColor: "#34d399" }}
                          >
                            {game.platform === "steam"
                              ? "Steam Official"
                              : game.platform === "epic"
                              ? "Epic Games"
                              : "Multi-Platform"}
                          </span>
                          <h3
                            className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-emerald-400 transition-colors"
                            style={{
                              fontFamily: "var(--font-outfit)",
                              color: "#ffffff",
                              WebkitTextFillColor: "#ffffff",
                            }}
                          >
                            {game.title}
                          </h3>
                        </div>

                        {/* Detail Link button */}
                        <Magnetic>
                          <Link
                            href={`/games/${game.id}`}
                            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 shadow-sm transition-all"
                            aria-label="View game details"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </Link>
                        </Magnetic>
                      </div>

                      <p
                        className="text-sm text-slate-300 leading-relaxed"
                        style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}
                      >
                        {game.description}
                      </p>
                    </div>

                    {/* Countdown Box */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md shadow-inner space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5"
                          style={{ color: "#e2e8f0", WebkitTextFillColor: "#e2e8f0" }}
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          Official Launch Countdown
                        </span>
                        <span
                          className="text-xs font-semibold text-slate-400"
                          style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}
                        >
                          {new Date(game.releaseDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <Countdown targetDate={game.releaseDate} />
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div>
                        <span
                          className="text-xs text-slate-400 block"
                          style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}
                        >
                          Pre-order Price
                        </span>
                        <span
                          className="text-2xl font-black text-white"
                          style={{
                            fontFamily: "var(--font-outfit)",
                            color: "#ffffff",
                            WebkitTextFillColor: "#ffffff",
                          }}
                        >
                          ₹{game.preorderPrice || 399}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {game.videoSrc && (
                          <button
                            onClick={() => setSelectedTrailer(game)}
                            className="px-4 py-2.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                            style={{ color: "#ffffff" }}
                          >
                            <span>▶ Watch Trailer</span>
                          </button>
                        )}

                        <Magnetic>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(game.id);
                              router.push("/cart");
                            }}
                            className="btn-primary text-xs px-6 py-2.5 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                          >
                            ⚡ Pre-order Now
                          </button>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Trailer Modal (Portaled to document.body) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedTrailer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-lenis-prevent
              className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden"
              style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
              onClick={handleCloseTrailer}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 15 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
                data-lenis-prevent
                className="video-modal-dark video-modal-content relative w-full max-w-[95vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-950 rounded-2xl sm:rounded-3xl border border-white/30 shadow-2xl flex flex-col my-auto max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/15 bg-slate-950/95 flex-shrink-0">
                  <div className="min-w-0 pr-3">
                    <span
                      className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider block"
                      style={{ color: "#34d399", WebkitTextFillColor: "#34d399", filter: "none" }}
                    >
                      Upcoming AAA Game Trailer
                    </span>
                    <h3
                      className="text-xs sm:text-base font-bold text-white truncate max-w-lg"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none", textShadow: "none" }}
                    >
                      {selectedTrailer.title} - Official Trailer
                    </h3>
                  </div>
                  <button
                    onClick={handleCloseTrailer}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center text-sm sm:text-base font-bold cursor-pointer transition-all flex-shrink-0 active:scale-90"
                    style={{ color: "#ffffff", filter: "none" }}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Video Player */}
                <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center flex-shrink-0">
                  {selectedTrailer.videoSrc && (
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
                  )}
                </div>

                {/* Modal Footer with Preorder */}
                <div className="p-3 sm:p-5 bg-slate-950 border-t border-white/15 flex items-center justify-between gap-3 flex-shrink-0">
                  <div className="min-w-0 flex-1">
                    <h4
                      className="text-xs sm:text-sm font-bold text-white truncate"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none", textShadow: "none" }}
                    >
                      {selectedTrailer.title}
                    </h4>
                    <p
                      className="text-[10px] sm:text-xs text-slate-300 truncate mt-0.5"
                      style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1", filter: "none", textShadow: "none" }}
                    >
                      Expected:{" "}
                      {new Date(selectedTrailer.releaseDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedTrailer.id);
                      handleCloseTrailer();
                      router.push("/cart");
                    }}
                    className="btn-primary text-xs px-4 py-2 sm:px-6 sm:py-2.5 cursor-pointer shadow-lg active:scale-95 flex-shrink-0"
                  >
                    ⚡ Pre-order ₹{selectedTrailer.preorderPrice || 399}
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

