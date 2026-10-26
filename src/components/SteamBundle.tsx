"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { useApp } from "@/context/AppContext";

export default function SteamBundle() {
  const router = useRouter();
  const { addToCart } = useApp();
  const [mounted, setMounted] = useState(false);
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bundleDeal = {
    id: 125,
    title: "Steam Bundle — Need for Speed Complete Collection (5 Games)",
    headline: "Steam Master Bundle — Need for Speed™ Definitive Racing Anthology",
    price: 899,
    originalPrice: 8495,
    discount: 89,
    platform: "Steam Master Account",
  };

  const nfsGames = [
    {
      id: 39,
      title: "Need for Speed: Unbound",
      year: "2022",
      price: 199,
      originalPrice: 3499,
      rating: 4.7,
      genre: "Street Racing • Action",
      image: "/images/Game Images/Need for Speed Unbound.png",
      tagline: "Custom graffiti burst effects & high-stakes Lakeshore street racing.",
      badge: "Latest Release",
    },
    {
      id: 37,
      title: "Need for Speed: Heat",
      year: "2019",
      price: 199,
      originalPrice: 2999,
      rating: 4.8,
      genre: "Open World • Police Chases",
      image: "/images/Game Images/nfs heat.png",
      tagline: "Hustle by day in Speedhunters Showdown, risk it all at night in Palm City.",
      badge: "Community Favorite",
    },
    {
      id: 36,
      title: "Need for Speed: Payback",
      year: "2017",
      price: 199,
      originalPrice: 1499,
      rating: 4.7,
      genre: "Action Driving • Heists",
      image: "/images/Game Images/Need for Speed Payback.jpg",
      tagline: "Blockbuster heist driving campaign against The House cartel in Fortune Valley.",
      badge: "Story Campaign",
    },
    {
      id: 38,
      title: "Need for Speed: Hot Pursuit Remastered",
      year: "2020",
      price: 199,
      originalPrice: 1999,
      rating: 4.8,
      genre: "High Speed Pursuit • Arcade",
      image: "/images/Game Images/Need for Speed Hot Pursuit Remastered (2020).jpg",
      tagline: "Exotic supercars, tactical cop weapons & relentless Seacrest County pursuits.",
      badge: "Definitive Remaster",
    },
    {
      id: 35,
      title: "Need for Speed: Rivals",
      year: "2013",
      price: 199,
      originalPrice: 999,
      rating: 4.6,
      genre: "All-Drive • Open World",
      image: "/images/Game Images/Need for Speed Rivals.jpg",
      tagline: "Erase the line between cop and racer in the brutal rivalry of Redview County.",
      badge: "Classic Warfare",
    },
  ];

  const currentGame = nfsGames[selectedGameIndex];

  const handleAddBundleToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(bundleDeal.id, "offline");
    router.push("/cart");
  };

  const handleBuyBundleNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(bundleDeal.id, "offline");
    router.push("/cart?step=upi_payment");
  };

  const handleAddSingleGame = (e: React.MouseEvent, gameId: number) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(gameId, "offline");
  };

  return (
    <section id="steam-bundle" className="relative py-16 sm:py-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="abstract-shape abstract-shape-blue w-[550px] h-[550px] top-1/4 -left-24 opacity-25" />
      <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] bottom-10 -right-20 opacity-20" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3 backdrop-blur-md bg-[#1b2838]/80 border border-[#66c0f4]/40 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#66c0f4] animate-ping" />
            <span className="text-[#66c0f4] font-extrabold tracking-wide uppercase">⚡ Steam Franchise Master Vault</span>
          </div>
          <h2 className="section-heading mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
            Steam Bundle — <span className="gradient-text">Need for Speed Complete Anthology</span>
          </h2>
          <p className="section-subheading mx-auto text-sm sm:text-base">
            All 5 definitive Need for Speed adrenaline-fueled street racing blockbusters in one verified Steam master account.
          </p>
        </motion.div>

        {/* Master Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-[32px] overflow-hidden border border-[#66c0f4]/30 shadow-2xl bg-slate-950/95 backdrop-blur-xl group"
          style={{
            boxShadow: "0 25px 50px -12px rgba(10, 20, 35, 0.85), inset 0 1px 0 rgba(102, 192, 244, 0.25)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left/Top: Dynamic Cover Showcase & Interactive Gallery */}
            <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[580px] bg-[#0e141b] overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8">
              {/* Dynamic Background Image with Smooth Cross-fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGame.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <img
                    src={currentGame.image}
                    alt={currentGame.title}
                    className="w-full h-full object-cover object-center filter brightness-90 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80 lg:to-slate-950 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Top Floating Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-black bg-[#66c0f4] backdrop-blur-md shadow-lg flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                    <span>Steam Official Account</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-red-600/90 backdrop-blur-md shadow">
                    🔥 89% OFF BUNDLE
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-400 bg-black/60 border border-emerald-500/40 backdrop-blur-md">
                  ✓ 5 Full Games Included
                </span>
              </div>

              {/* Bottom Showcase Overlay Info & Interactive Cover Switcher */}
              <div className="relative z-10 space-y-4 pt-16 sm:pt-24">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black">
                      {currentGame.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      Released {currentGame.year} • ★ {currentGame.rating}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white drop-shadow-md">
                    {currentGame.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl drop-shadow">
                    {currentGame.tagline}
                  </p>
                </div>

                {/* 5-Game Fast Switcher Thumbnails */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Select Game Preview ({selectedGameIndex + 1}/5):</span>
                    <span className="text-[#66c0f4]">Click to inspect</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {nfsGames.map((game, idx) => {
                      const isSelected = selectedGameIndex === idx;
                      return (
                        <button
                          key={game.id}
                          type="button"
                          onClick={() => setSelectedGameIndex(idx)}
                          className={`relative rounded-xl overflow-hidden aspect-[3/4] border transition-all cursor-pointer group/thumb ${
                            isSelected
                              ? "border-[#66c0f4] ring-2 ring-[#66c0f4]/50 scale-105 shadow-lg"
                              : "border-white/20 hover:border-white/50 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-1">
                            <span className="text-[9px] sm:text-[10px] font-black text-white truncate w-full leading-tight">
                              {game.year}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#66c0f4] animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right/Bottom: Bundle Details & Included Games */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-slate-950/90 border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#66c0f4] bg-[#66c0f4]/10 border border-[#66c0f4]/30">
                    Steam Master Account
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">
                    Instant Steam Guard 2FA
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight"
                  style={{ fontFamily: "var(--font-outfit)", color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                >
                  Need for Speed™ Complete Collection
                </h3>

                <p
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                  style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}
                >
                  Get the ultimate high-octane street racing franchise in a single verified Steam account with full lifetime access. Includes all 5 modern blockbuster titles featuring open-world driving, deep visual tuning, and explosive pursuit action.
                </p>

                {/* Included 5 Games List with Individual Price & Add Option */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <span>5 Games Included in Bundle:</span>
                    <span className="text-[#66c0f4]">Individual Price: ₹199</span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                    {nfsGames.map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group/item"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/20"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-white truncate group-hover/item:text-[#66c0f4] transition-colors">
                              {game.title}
                            </h5>
                            <span className="text-[10px] text-slate-400 block">
                              Steam Platform • Single Price ₹{game.price}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handleAddSingleGame(e, game.id)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all cursor-pointer active:scale-95"
                            title={`Add ${game.title} only for ₹199`}
                          >
                            + Single ₹{game.price}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="text-[#66c0f4] font-bold">✓</span>
                    <span>5 Full Steam Games (Worth ₹8,495)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="text-[#66c0f4] font-bold">✓</span>
                    <span>Steam Guard 2FA Security</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="text-[#66c0f4] font-bold">✓</span>
                    <span>Offline Campaign + Tuning</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="text-[#66c0f4] font-bold">✓</span>
                    <span>Lifetime Warranty Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Call to Actions */}
              <div className="pt-4 border-t border-white/15 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block" style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}>
                      Steam Bundle Special Price
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
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-[#66c0f4] bg-[#66c0f4]/20 border border-[#66c0f4]/40">
                      Save ₹{bundleDeal.originalPrice - bundleDeal.price} ({bundleDeal.discount}% OFF)
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddBundleToCart}
                    className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/15 hover:bg-white text-white hover:text-black border border-white/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                    style={{ color: "#ffffff" }}
                  >
                    <span>🛒 Add Bundle to Cart</span>
                  </button>

                  <Magnetic>
                    <button
                      onClick={handleBuyBundleNow}
                      className="w-full btn-primary text-center py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <span>⚡ Buy Steam Bundle ₹899</span>
                    </button>
                  </Magnetic>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span>🛡️ 100% Verified Steam Delivery</span>
                  <span>•</span>
                  <span>🔒 Instant Invoice & Account</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
