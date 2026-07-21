"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { upcomingGames } from "@/data/gameData";
import Magnetic from "./Magnetic";
import { useApp } from "@/context/AppContext";

function Countdown({ targetDate }: { targetDate: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTime = useCallback(() => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
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
    const interval = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  const displayTime = mounted ? timeLeft : { days: 0, hours: 0, mins: 0, secs: 0 };

  const units = [
    { label: "Days", value: displayTime.days },
    { label: "Hours", value: displayTime.hours },
    { label: "Mins", value: displayTime.mins },
    { label: "Secs", value: displayTime.secs },
  ];

  return (
    <div className="flex gap-2">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-[#0f172a] backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75), 0 4px 12px rgba(90,110,125,0.08)', fontFamily: 'var(--font-outfit)' }}>
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider">{u.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function UpcomingReleases() {
  const { addToCart } = useApp();
  return (
    <section id="upcoming" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] bottom-0 right-0" />
      <div className="starburst starburst-md top-[5%] -left-10" style={{ animation: "rotateStar 45s linear infinite" }} />
      <div className="starburst starburst-sm bottom-[10%] right-[8%]" style={{ animation: "rotateStar 30s linear infinite reverse" }} />
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
          <h2 className="section-heading mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Upcoming <span className="gradient-text">Releases</span>
          </h2>
          <p className="section-subheading mx-auto">
            Get ready for the most anticipated titles. Pre-order now and be the first to play.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <Link href={`/games/${game.id}`} className="block">
                <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                  <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-graphite/80 hidden sm:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 to-transparent sm:hidden" />

                  {/* Play trailer button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Magnetic>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        role="button"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                        aria-label="Play trailer"
                      >
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </Magnetic>
                  </div>

                  {/* Genre badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-white text-xs font-bold backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.06))', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)' }}>
                      {game.genre}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#0f172a] mb-1 group-hover:text-mint transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>
                        {game.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {game.platform === "steam" ? "Steam" : game.platform === "epic" ? "Epic Games" : "Multi-Platform"}
                      </p>
                    </div>
                    {/* Wishlist button */}
                    <Magnetic>
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        role="button"
                        className="p-2 rounded-xl hover:bg-slate-200/50 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                        aria-label="Add to wishlist"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </motion.div>
                    </Magnetic>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{game.description}</p>

                  {/* Countdown */}
                  <Countdown targetDate={game.releaseDate} />

                  {/* Bottom row */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-slate-500">
                      Release: <span className="text-slate-700">{new Date(game.releaseDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    {game.preorderPrice && (
                      <Magnetic>
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(game.id);
                          }}
                          role="button"
                          className="btn-primary text-xs px-4 py-2 cursor-pointer"
                        >
                          Pre-order ₹{game.preorderPrice}
                        </div>
                      </Magnetic>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
