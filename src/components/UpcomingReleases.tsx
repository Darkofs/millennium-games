"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [prevTargetDate, setPrevTargetDate] = useState(targetDate);

  if (targetDate !== prevTargetDate) {
    setPrevTargetDate(targetDate);
    setTimeLeft(calculateTime());
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return calculateTime();
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  const displayTime = mounted ? timeLeft : { days: 54, hours: 18, mins: 32, secs: 45 };

  const units = [
    { label: "Days", value: displayTime.days },
    { label: "Hours", value: displayTime.hours },
    { label: "Mins", value: displayTime.mins },
    { label: "Secs", value: displayTime.secs },
  ];

  return (
    <div className="flex gap-2.5">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div
            className="w-13 h-13 min-w-[50px] px-2 py-1.5 rounded-2xl flex items-center justify-center text-lg font-bold text-[#0f172a] backdrop-blur-md transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.45))",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 14px rgba(90,110,125,0.12)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UpcomingReleases() {
  const { addToCart, setCartOpen } = useApp();
  const [selectedTrailer, setSelectedTrailer] = useState<UpcomingGame | null>(null);

  useEffect(() => {
    if (selectedTrailer) {
      window.history.pushState({ modal: "trailer" }, "");
      const handlePopState = () => {
        setSelectedTrailer(null);
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
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
              className="glass-card overflow-hidden group cursor-pointer border border-white/70 shadow-2xl rounded-[28px]"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 hidden sm:block pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden pointer-events-none" />

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
                            className="w-14 h-14 rounded-full bg-white/80 hover:bg-white text-black backdrop-blur-md border border-white/90 flex items-center justify-center shadow-xl opacity-90 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                            aria-label="Play trailer"
                          >
                            <svg
                              className="w-6 h-6 ml-1 fill-current"
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
                        }}
                      >
                        {game.genre}
                      </span>
                    </div>

                    {/* Live Trailer Badge */}
                    {game.videoSrc && (
                      <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-red-600/80 backdrop-blur-md shadow">
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
                          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
                            {game.platform === "steam"
                              ? "Steam Official"
                              : game.platform === "epic"
                              ? "Epic Games"
                              : "Multi-Platform"}
                          </span>
                          <h3
                            className="text-2xl md:text-3xl font-extrabold text-[#0f172a] group-hover:text-emerald-600 transition-colors"
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            {game.title}
                          </h3>
                        </div>

                        {/* Detail Link button */}
                        <Magnetic>
                          <Link
                            href={`/games/${game.id}`}
                            className="p-2.5 rounded-2xl bg-white/70 hover:bg-white text-slate-600 hover:text-emerald-600 border border-white/80 shadow-sm transition-all"
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

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {game.description}
                      </p>
                    </div>

                    {/* Countdown Box */}
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/80 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Official Launch Countdown
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
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
                        <span className="text-xs text-slate-500 block">Pre-order Price</span>
                        <span className="text-2xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                          ₹{game.preorderPrice || 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {game.videoSrc && (
                          <button
                            onClick={() => setSelectedTrailer(game)}
                            className="px-4 py-2.5 rounded-full text-xs font-bold bg-white/80 hover:bg-white text-slate-800 border border-white/90 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
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
                              setCartOpen(true);
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

      {/* Video Trailer Modal */}
      <AnimatePresence>
        {selectedTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
            onClick={handleCloseTrailer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl bg-slate-950 rounded-[28px] overflow-hidden border border-white/30 shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                    Upcoming AAA Game Trailer
                  </span>
                  <h3 className="text-lg font-bold text-white truncate max-w-xl">
                    {selectedTrailer.title} - Official Trailer
                  </h3>
                </div>
                <button
                  onClick={handleCloseTrailer}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center text-lg font-bold cursor-pointer transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center">
                {selectedTrailer.videoSrc && (
                  <video
                    key={selectedTrailer.videoSrc}
                    src={selectedTrailer.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support high-definition video playback.
                  </video>
                )}
              </div>

              {/* Modal Footer with Preorder */}
              <div className="p-6 bg-slate-950 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {selectedTrailer.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Expected Release:{" "}
                    {new Date(selectedTrailer.releaseDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedTrailer.id);
                    handleCloseTrailer();
                    setCartOpen(true);
                  }}
                  className="btn-primary text-xs px-6 py-2.5 cursor-pointer shadow-lg"
                >
                  ⚡ Pre-order ₹{selectedTrailer.preorderPrice || 1}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

