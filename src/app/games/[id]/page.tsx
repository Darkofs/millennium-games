"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { featuredGames, accountsInventory } from "@/data/gameData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import { useApp } from "@/context/AppContext";

export default function GameDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const game = featuredGames.find((g) => g.id === id);
  const invAccounts = game ? accountsInventory.filter((acc) => acc.games.includes(game.id)) : [];

  const handleSafeBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1 && document.referrer.includes(window.location.host)) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const [reqTab, setReqTab] = useState<"minimum" | "recommended">("minimum");
  const isOnlineOnlyGame = Boolean(
    game?.isOnlineOnly ||
    game?.id === 8 ||
    game?.id === 9 ||
    game?.id === 1 ||
    game?.id === 5 ||
    game?.id === 17 ||
    game?.id === 31 ||
    game?.id === 32 ||
    game?.title.toLowerCase().includes("call of duty") ||
    game?.title.toLowerCase().includes("battlefield") ||
    game?.title.toLowerCase().includes("arc raider") ||
    game?.title.toLowerCase().includes("fc 26") ||
    game?.title.toLowerCase().includes("modern warfare")
  );
  const [playMode, setPlayMode] = useState<"offline" | "online">(isOnlineOnlyGame ? "online" : "offline");
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, setCartOpen } = useApp();

  if (!game) {
    return (
      <main className="min-h-screen bg-transparent flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center container-custom py-32 text-center">
          <div className="glass-card p-12 max-w-md space-y-6">
            <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto text-danger text-2xl">
              ⚠️
            </div>
            <h1 className="text-2xl font-bold text-[#0f172a] glass-text" style={{ fontFamily: "var(--font-outfit)" }}>
              Game Not Found
            </h1>
            <p className="text-slate-500">
              The game you are looking for does not exist in our catalog or has been moved.
            </p>
            <Magnetic>
              <Link href="/" className="btn-primary inline-block w-full text-center">
                Back to Store
              </Link>
            </Magnetic>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Handle adding to cart with page navigation
  const effectivePlayMode = isOnlineOnlyGame ? "online" : playMode;

  const handleAddToCart = () => {
    addToCart(game.id, effectivePlayMode);
    router.push("/cart");
  };

  const handleBuyNow = () => {
    addToCart(game.id, effectivePlayMode);
    router.push("/cart?step=upi_payment");
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-800 flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ambient background gradients matching light slate cockpit */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#cbdce3]/80 z-10" />
        <img
          src={game.image}
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover blur-[80px] opacity-25"
        />
        <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] -top-32 left-[10%] opacity-20" />
        <div className="abstract-shape abstract-shape-mint w-[400px] h-[400px] top-[40%] right-[10%] opacity-15" />
      </div>

      <div className="flex-1 container-custom relative z-10 pt-20 sm:pt-28 pb-16 sm:pb-24 px-3.5 sm:px-6">
        {/* Breadcrumbs and Back button */}
        <div className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={handleSafeBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800 font-semibold text-xs border border-white/80 shadow-sm transition-all cursor-pointer active:scale-95 flex-shrink-0"
            aria-label="Back to store"
          >
            ← Back
          </button>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
            <Link href="/" className="hover:text-mint transition-colors">Store</Link>
            <span>/</span>
            <span className="capitalize">{game.genre[0] || "Games"}</span>
            <span>/</span>
            <span className="text-slate-800 font-bold max-w-[150px] sm:max-w-xs md:max-w-md truncate">{game.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Left: Poster Display & Key Specs */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-card overflow-hidden aspect-[3/4] max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:max-w-none w-full border-white/20 relative group shadow-2xl rounded-2xl sm:rounded-3xl"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {game.discount && (
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 discount-badge text-xs sm:text-base px-2.5 py-1 sm:px-3 sm:py-1 font-bold">
                  -{game.discount}%
                </div>
              )}
            </motion.div>

            {/* Specs Checklist */}
            <div className="glass-card p-4 sm:p-5 space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] uppercase tracking-wider border-b border-slate-300/40 pb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                Key Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-[10px] sm:text-xs">Developer</span>
                  <span className="font-semibold text-slate-700 truncate block">{game.developer || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] sm:text-xs">Publisher</span>
                  <span className="font-semibold text-slate-700 truncate block">{game.publisher || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] sm:text-xs">Release Date</span>
                  <span className="font-semibold text-slate-700 block">
                    {game.releaseDate ? new Date(game.releaseDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] sm:text-xs">Region</span>
                  <span className="font-semibold text-mint block">Global (Worldwide)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Game Info and Action Buy details */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5 sm:space-y-6"
            >
              {/* Badging */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold text-[#0f172a] bg-slate-200/60 border border-slate-300/40 uppercase tracking-wider backdrop-blur-md">
                  🎮 {game.platform === "steam" ? "Steam" : game.platform === "epic" ? "Epic Games" : game.platform === "ea" ? "EA Play" : game.platform === "ubisoft" ? "Ubisoft" : game.platform === "rockstar" ? "Rockstar" : "Battle.net"} Account
                </span>
                <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold text-mint bg-mint/10 border border-mint/20 uppercase tracking-wider backdrop-blur-md">
                  ✓ Instant Account Access
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight tracking-tight glass-text" style={{ fontFamily: "var(--font-outfit)" }}>
                {game.title}
              </h1>

              {/* Meta metrics */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.floor(game.rating) ? "text-[#000000]" : "text-slate-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="font-semibold ml-1 text-slate-700">{game.rating}</span>
                </div>
                <div>•</div>
                <div>
                  <span className="font-semibold text-slate-700">{game.reviews.toLocaleString()}</span> ratings
                </div>
                <div>•</div>
                <div className="flex flex-wrap gap-1.5">
                  {game.genre.map((g) => (
                    <span key={g} className="px-2 py-0.5 rounded bg-slate-200/50 text-[10px] sm:text-xs text-slate-600 font-semibold border border-slate-300/40">{g}</span>
                  ))}
                </div>
              </div>

              {/* Game Short description */}
              <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
                {game.longDescription || game.description}
              </p>

              {/* Play Mode Selection */}
              <div className="space-y-2.5 sm:space-y-3">
                <span className="text-slate-500 text-[11px] sm:text-xs block uppercase tracking-widest font-semibold">
                  {isCod ? "Play Method (Online Only)" : "Select Play Method"}
                </span>

                {isCod ? (
                  <div className="p-4 rounded-xl sm:rounded-2xl border border-emerald-500/40 bg-emerald-500/10 shadow-md ring-1 ring-emerald-500/30 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0f172a] text-sm">Online Multiplayer Only</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        Full online multiplayer, Warzone &amp; co-op enabled. Sourced from verified personal accounts.
                      </p>
                    </div>
                    <span className="text-base font-black text-slate-900 ml-4">₹499</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={() => setPlayMode("offline")}
                      className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 backdrop-blur-md flex flex-col justify-between cursor-pointer active:scale-98 ${
                        playMode === "offline"
                          ? "border-mint bg-mint/10 shadow-md ring-1 ring-mint/50"
                          : "border-slate-300/40 bg-white/40 hover:bg-white/60"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-[#0f172a] text-sm">Offline Play</span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${playMode === "offline" ? "border-mint bg-mint" : "border-slate-400"}`}>
                          {playMode === "offline" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                        Play campaign/story mode offline. Sourced from official shared accounts.
                      </p>
                      <span className="text-sm font-bold text-slate-800 mt-3">₹{game.price}</span>
                    </button>

                    <button
                      onClick={() => setPlayMode("online")}
                      className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 backdrop-blur-md flex flex-col justify-between cursor-pointer active:scale-98 ${
                        playMode === "online"
                          ? "border-mint bg-mint/10 shadow-md ring-1 ring-mint/50"
                          : "border-slate-300/40 bg-white/40 hover:bg-white/60"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-[#0f172a] text-sm">Online Play</span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${playMode === "online" ? "border-mint bg-mint" : "border-slate-400"}`}>
                          {playMode === "online" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                        Full multiplayer, online co-op enabled. Exclusive personal account access.
                      </p>
                      <span className="text-sm font-bold text-slate-800 mt-3">₹{Math.round(game.price * 2.5)}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Buy card */}
              <div className="glass-card p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center border-slate-300/40 rounded-2xl sm:rounded-3xl">
                <div>
                  <span className="text-slate-500 text-[10px] sm:text-xs block mb-1 uppercase tracking-widest font-semibold">Store Price</span>
                  <div className="flex items-baseline gap-2.5 sm:gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-mint" style={{ fontFamily: "var(--font-outfit)" }}>
                      ₹{isOnlineOnlyGame ? 499 : playMode === "online" ? Math.round(game.price * 2.5) : game.price}
                    </span>
                    {game.originalPrice && (
                      <span className="text-sm sm:text-lg text-slate-400 line-through">
                        ₹{isOnlineOnlyGame ? Math.round(game.originalPrice * 1.5) : playMode === "online" ? Math.round(game.originalPrice * 2.5) : game.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1.5 sm:mt-2">🛡️ Fully guaranteed official accounts, pre-purchased and secured.</span>
                </div>
                <div className="space-y-2.5 sm:space-y-3">
                  <Magnetic>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="w-full btn-primary text-center py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider relative overflow-hidden cursor-pointer shadow-md active:scale-95"
                    >
                      <AnimatePresence mode="wait">
                        {addedToCart ? (
                          <motion.span
                            key="added"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center justify-center gap-2 text-mint"
                          >
                            ✓ Added to Cart
                          </motion.span>
                        ) : (
                          <motion.span
                            key="cart"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                          >
                            🛒 Add to Cart
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </Magnetic>
                  <Magnetic>
                    <button
                      onClick={handleBuyNow}
                      className="w-full btn-outline text-center py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-slate-200/20 cursor-pointer shadow-sm active:scale-95"
                    >
                      ⚡ Buy Now
                    </button>
                  </Magnetic>
                </div>
              </div>

              {/* Real Inventory Account Showcase */}
              {invAccounts.length > 0 && (
                <div className="glass-card p-4 sm:p-5 border-emerald-500/20 bg-emerald-500/5 space-y-3 sm:space-y-3.5 shadow-sm rounded-2xl sm:rounded-3xl">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-300/40 pb-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-1.5" style={{ fontFamily: "var(--font-outfit)" }}>
                      🟢 Official Store {invAccounts.length > 1 ? "Accounts" : "Account"} in Stock ({invAccounts.length} Available)
                    </h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Verified Working
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-2.5 sm:space-y-3">
                    <p className="leading-relaxed text-[11px] sm:text-xs">
                      This game is delivered via a pre-secured official account. The login credentials, 2FA code generator, and lifetime setup guide will be instantly unlocked in your library dashboard after a successful checkout.
                    </p>
                    <div className="space-y-2.5 sm:space-y-3">
                      {invAccounts.map((acc, index) => (
                        <div key={index} className="space-y-2 bg-slate-900/5 p-3 sm:p-3.5 rounded-xl border border-slate-900/10 font-mono text-[10px] sm:text-[11px] relative">
                          {invAccounts.length > 1 && (
                            <span className="absolute top-2 right-2 text-[9px] font-bold uppercase text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded-md">
                              Account #{index + 1}
                            </span>
                          )}
                          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-0.5 border-b border-slate-300/15 pb-1.5">
                            <span className="font-bold text-slate-700">Account Type:</span>
                            <span className="font-semibold text-slate-600 capitalize">{game.platform === "steam" ? "Steam Account" : "Epic Games Account"}</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-0.5 border-b border-slate-300/15 pb-1.5">
                            <span className="font-bold text-slate-700">Login/Mail:</span>
                            <span className="text-slate-400 select-none">•••••••••••••••• (Unlocks after payment)</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-0.5 border-b border-slate-300/15 pb-1.5">
                            <span className="font-bold text-slate-700">Password:</span>
                            <span className="text-slate-400 select-none">•••••••• (Unlocks after payment)</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-0.5">
                            <span className="font-bold text-slate-700">2FA Guard:</span>
                            <span className="font-semibold text-emerald-600">✓ Fully Supported</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* PC Requirements Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-300/40 pb-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                  PC System Requirements
                </h2>
                {/* Tab buttons */}
                <div className="flex gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setReqTab("minimum")}
                    className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all backdrop-blur-md cursor-pointer ${
                      reqTab === "minimum"
                        ? "text-[#0f172a] bg-slate-200/80 border border-slate-300/80 shadow-inner"
                        : "text-slate-500 hover:text-[#0f172a]"
                    }`}
                  >
                    Minimum
                  </button>
                  <button
                    onClick={() => setReqTab("recommended")}
                    className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all backdrop-blur-md cursor-pointer ${
                      reqTab === "recommended"
                        ? "text-[#0f172a] bg-slate-200/80 border border-slate-300/80 shadow-inner"
                        : "text-slate-500 hover:text-[#0f172a]"
                    }`}
                  >
                    Recommended
                  </button>
                </div>
              </div>

              {/* Requirement grid display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {reqTab === "minimum" && game.minimumRequirements ? (
                  <>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Operating System</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.minimumRequirements.os}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Processor (CPU)</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.minimumRequirements.processor}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Memory (RAM)</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.minimumRequirements.memory}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Graphics Card (GPU)</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.minimumRequirements.graphics}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Storage Space</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.minimumRequirements.storage}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">DirectX</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.minimumRequirements.directX || "Version 12"}</p>
                    </div>
                  </>
                ) : reqTab === "recommended" && game.recommendedRequirements ? (
                  <>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Operating System</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.recommendedRequirements.os}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Processor (CPU)</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.recommendedRequirements.processor}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Memory (RAM)</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.recommendedRequirements.memory}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Graphics Card (GPU)</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.recommendedRequirements.graphics}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Storage Space</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.recommendedRequirements.storage}</p>
                    </div>
                    <div className="glass-card p-3 sm:p-4 space-y-1 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">DirectX</span>
                      <p className="font-semibold text-[#0f172a] text-xs sm:text-sm">{game.recommendedRequirements.directX || "Version 12"}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500 text-xs sm:text-sm col-span-2 py-3">System requirements details are not currently specified for this tab.</p>
                )}
              </div>
            </motion.div>

            {/* Activation Accordion Details */}
            <div className="glass-card p-4 sm:p-6 space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                Account Setup & Delivery
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Once purchased, you will receive your official account login details (Username & Password) instantly in your library dashboard.
                Follow the platform setup guide below:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs text-slate-600">
                <div className="bg-slate-200/40 p-3.5 sm:p-4 rounded-xl border border-slate-300/40 text-slate-700 space-y-1">
                  <span className="text-[#0f172a] font-bold block mb-1">🎮 Offline Activation Setup:</span>
                  <p>1. Log in to the launcher (Steam, Epic, EA, etc.) using the provided account details.</p>
                  <p>2. Go to settings and turn off <b>Cloud Saves / Cloud Sync</b>.</p>
                  <p>3. Download and install the game.</p>
                  <p>4. Launch the game once, then switch the client to <b>Offline Mode</b> and start playing!</p>
                </div>
                <div className="bg-slate-200/40 p-3.5 sm:p-4 rounded-xl border border-slate-300/40 text-slate-700 space-y-1">
                  <span className="text-[#0f172a] font-bold block mb-1">🚀 Online Activation Setup:</span>
                  <p>1. Log in using the provided personal/exclusive account credentials.</p>
                  <p>2. Change account security details (email, password) to your own.</p>
                  <p>3. Download the game, configure your settings, and play online with multiplayer enabled!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Floating Buy Dock (Visible only on mobile screens < md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/95 backdrop-blur-xl border-t border-white/20 shadow-2xl flex items-center justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider truncate" style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}>
            {playMode === "online" ? "Online Multiplayer" : "Offline Campaign"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white" style={{ fontFamily: "var(--font-outfit)", color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
              ₹{playMode === "online" ? (game.price === 1 ? 1 : Math.round(game.price * 2.5)) : game.price}
            </span>
            {game.originalPrice && (
              <span className="text-[11px] text-slate-400 line-through" style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8" }}>
                ₹{playMode === "online" ? Math.round(game.originalPrice * 2.5) : game.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleAddToCart}
            className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/15 hover:bg-white text-white hover:text-black border border-white/25 transition-all cursor-pointer active:scale-95 flex items-center gap-1"
            style={{ color: "#ffffff" }}
          >
            <span>🛒 Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2.5 rounded-xl text-xs font-bold btn-primary transition-all cursor-pointer shadow-lg active:scale-95 flex items-center gap-1"
          >
            <span>⚡ Buy Now</span>
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
