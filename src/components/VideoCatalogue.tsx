"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { useApp } from "@/context/AppContext";

export interface FeaturedGameRef {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface VideoItem {
  id: string;
  title: string;
  game: string;
  category: "Official Account" | "Gameplay 4K" | "Cinematics" | "Review Spotlights";
  thumbnail: string;
  duration: string;
  views: string;
  quality: string;
  youtubeId?: string;
  videoSrc?: string;
  description: string;
  games: FeaturedGameRef[];
}

const videosData: VideoItem[] = [
  {
    id: "v1",
    title: "Black Myth: Wukong - Deluxe Edition",
    game: "Black Myth: Wukong",
    category: "Official Account",
    thumbnail: "/images/Game Images/Black Myth Wukong.svg",
    duration: "",
    views: "",
    quality: "PREMIUM",
    videoSrc: "/Game Videos/Black myth Wukong Deluxe Edition.mp4",
    youtubeId: "pnS8t9A7-eQ",
    description: "Experience the mythic journey of the Destined One in Black Myth: Wukong Deluxe Edition with pristine raw high-bitrate visuals.",
    games: [
      {
        id: 6,
        title: "Black Myth: Wukong",
        price: 199,
        originalPrice: 499,
        image: "/images/Game Images/Black Myth Wukong.svg",
      },
    ],
  },
  {
    id: "v2",
    title: "Alan Wake 2 & Bundle - Official Account",
    game: "Alan Wake 2 & Other Games",
    category: "Official Account",
    thumbnail: "/images/Game Images/Alan Wake 2.svg",
    duration: "",
    views: "",
    quality: "PREMIUM",
    videoSrc: "/Game Videos/Alan Wake 2 and Bundle.mp4",
    youtubeId: "dlQ3Fe-7cT0",
    description: "Explore Bright Falls and the Dark Place across Alan Wake 2 and Alan Wake Remastered with pristine 4K visuals.",
    games: [
      {
        id: 2,
        title: "Alan Wake 2",
        price: 199,
        originalPrice: 475,
        image: "/images/Game Images/Alan Wake 2.svg",
      },
      {
        id: 3,
        title: "Other Games",
        price: 199,
        originalPrice: 798,
        image: "/images/Game Images/Alan Wake Remastered.svg",
      },
    ],
  },
  {
    id: "v3",
    title: "Cyberpunk 2077: Phantom Liberty - With ARC Riders",
    game: "Cyberpunk 2077 & ARC Riders",
    category: "Official Account",
    thumbnail: "/images/Game Images/Cyberpunk 2077.svg",
    duration: "",
    views: "",
    quality: "PREMIUM",
    videoSrc: "/Game Videos/Bundle 1.mp4",
    youtubeId: "P99qNUfs9f0",
    description: "Explore the dangerous district of Dogtown in full Path Tracing glory on PC.",
    games: [
      {
        id: 12,
        title: "Cyberpunk 2077 With Arc Riders",
        price: 799,
        originalPrice: 2400,
        image: "/images/Game Images/Cyberpunk 2077.svg",
      },
    ],
  },
  {
    id: "v4",
    title: "RDR 2 & Wukong: Ultimate Soulslike Combat Masterclass",
    game: "RDR 2 & Wukong",
    category: "Cinematics",
    thumbnail: "images/Game Images/Read Dead Redeemption 2.svg",
    duration: "",
    views: "",
    quality: "PREMIUM",
    videoSrc: "/Game Videos/Wukong,RDR 2.mp4",
    youtubeId: "qLZenOn7WUo",
    description: "Compare boss fights, lethal weapon skills, and dark fantasy lore Black Myth: Wukong.",
    games: [
      {
        id: 14,
        title: "RDR 2",
        price: 199,
        originalPrice: 499,
        image: "images/Game Images/Read Dead Redeemption 2.svg",
      },
      {
        id: 6,
        title: "Black Myth: Wukong",
        price: 199,
        originalPrice: 499,
        image: "/images/Game Images/Black Myth Wukong.svg",
      },
    ],
  },
  {
    id: "v5",
    title: "Assassin's Creed Shadows - Official World & Gameplay Breakdown",
    game: "Assassin's Creed Shadows",
    category: "Official Account",
    thumbnail: "/images/Game Images/Assassin's Creed Shadow.svg",
    duration: "",
    views: "",
    quality: "PREMIUM",
    videoSrc: "/Game Videos/Shadow Deluxe Edition Ubisoft.mp4",
    youtubeId: "vovkzbtYBC8",
    description: "Immerse yourself in feudal Japan through the dual perspectives of Naoe and Yasuke.",
    games: [
      {
        id: 4,
        title: "Assassin's Creed Shadows",
        price: 199,
        image: "/images/Game Images/Assassin's Creed Shadow.svg",
      },
    ],
  },
  {
    id: "v6",
    title: "GTA 5 & RDR 2 - Rockstar Official Account",
    game: "GTA 5 & RDR 2",
    category: "Official Account",
    thumbnail: "/images/Game Images/GTA 5.svg",
    duration: "",
    views: "",
    quality: "PREMIUM",
    videoSrc: "/Game Videos/GTA 5 , RDR 2 Rockstar.mp4",
    youtubeId: "QkkoHAzjnUs",
    description: "Experience the ultimate Rockstar open-world masterclass with Grand Theft Auto V and Red Dead Redemption 2.",
    games: [
      {
        id: 30,
        title: "GTA 5",
        price: 199,
        originalPrice: 599,
        image: "/images/Game Images/GTA 5.svg",
      },
      {
        id: 24,
        title: "Red Dead Redemption 2",
        price: 199,
        originalPrice: 1209,
        image: "/images/Game Images/Read Dead Redeemption 2.svg",
      },
    ],
  },
  {
    id: "v7",
    title: "Crimson Desert - Deluxe Edition Official Breakdown",
    game: "Crimson Desert",
    category: "Official Account",
    thumbnail: "/images/Game Images/Crimson Desert.svg",
    duration: "",
    views: "",
    quality: "PREMIUM",
    videoSrc: "/Game Videos/Crimson Desert Deluxe Edition.mp4",
    youtubeId: "K1p9M3r9EwE",
    description: "Witness the fierce mercenaries of Pywel fighting for survival with realistic medieval fantasy and intense sword combat.",
    games: [
      {
        id: 11,
        title: "Crimson Desert",
        price: 199,
        originalPrice: 499,
        image: "/images/Game Images/Crimson Desert.svg",
      },
    ],
  },
  {
    id: "v8",
    title: "Ghost of Tsushima Director's Cut - Legends & Combat Masterclass",
    game: "Ghost of Tsushima",
    category: "Cinematics",
    thumbnail: "/images/Game Images/Ghost Of Tsushima.svg",
    duration: "4:50",
    views: "5.6M views",
    quality: "4K 60FPS",
    videoSrc: "/Game Videos/Ghost Of Tsushima Epic.mp4",
    youtubeId: "ZgI5x-Wc6r8",
    description: "Master the blade of Jin Sakai with fluid stance switching and cinematic lethal strikes.",
    games: [
      {
        id: 21,
        title: "Ghost of Tsushima: Director's Cut",
        price: 199,
        originalPrice: 596,
        image: "/images/Game Images/Ghost Of Tsushima.svg",
      },
    ],
  },
];

const categories = ["All", "Official Account", "Gameplay 4K", "Cinematics", "Review Spotlights"];

export default function VideoCatalogue() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const { addToCart } = useApp();

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuredSpotlight = videosData[0];

  const filteredVideos = videosData.filter((video) => {
    if (activeCategory === "All") return true;
    return video.category === activeCategory;
  });

  const handleAddToCart = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation();
    addToCart(gameId, "offline");
    router.push("/cart");
  };

  const handleBuyNow = (e: React.MouseEvent, gameId: number) => {
    e.stopPropagation();
    addToCart(gameId, "offline");
    router.push("/cart?step=upi_payment");
  };

  const handleAddBundleToCart = (e: React.MouseEvent, games: FeaturedGameRef[]) => {
    e.stopPropagation();
    games.forEach((g) => addToCart(g.id, "offline"));
    router.push("/cart");
  };

  // Intercept mobile back button when video modal is open
  useEffect(() => {
    if (!selectedVideo) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    window.history.pushState({ modal: "video" }, "");

    const handlePopState = () => {
      setSelectedVideo(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedVideo]);

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    if (typeof window !== "undefined" && window.history.state?.modal === "video") {
      window.history.back();
    }
  };

  return (
    <section id="video-catalogue" className="relative py-24 overflow-hidden">
      {/* Background starbursts & abstract decorations */}
      <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] -top-32 -right-32" />
      <div className="abstract-shape abstract-shape-mint w-[400px] h-[400px] -bottom-24 -left-24" />
      <div className="starburst starburst-lg -top-16 -left-12" style={{ animation: "rotateStar 50s linear infinite" }} />
      <div className="starburst starburst-sm bottom-[10%] right-[8%]" style={{ animation: "rotateStar 35s linear infinite reverse" }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-800 text-sm font-bold mb-4 backdrop-blur-md bg-white/60 border border-white/80 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800 animate-ping" />
            <span className="text-slate-800">4K HDR Game Trailers & Gameplay</span>
          </div>
          <h2 className="section-heading mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Video <span className="gradient-text">Catalogue</span>
          </h2>
          <p className="section-subheading mx-auto">
            Watch official cinematic game trailers, raw 4K 60FPS gameplay showcases, and buy featured titles directly.
          </p>
        </motion.div>

        {/* Featured Video Hero Spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-14 rounded-[28px] overflow-hidden glass-card group cursor-pointer border border-white/60 shadow-2xl"
          onClick={() => setSelectedVideo(featuredSpotlight)}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            {featuredSpotlight.videoSrc ? (
              <video
                src={featuredSpotlight.videoSrc}
                poster={featuredSpotlight.thumbnail}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
            ) : (
              <img
                src={featuredSpotlight.thumbnail}
                alt={featuredSpotlight.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Magnetic>
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full btn-glossy-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 pointer-events-auto">
                  <svg className="w-10 h-10 md:w-12 md:h-12 ml-1 fill-current text-black" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </Magnetic>
            </div>

            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white/90 backdrop-blur-md border border-white/80 shadow-md">
                ⭐ Featured Spotlight
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-black bg-white/80 backdrop-blur-md border border-white/60">
                {featuredSpotlight.quality}
              </span>
            </div>

            {/* Bottom Content & Purchase Buttons */}
            <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4 video-card-overlay">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-white/90 mb-1 block">
                  {featuredSpotlight.game} • {featuredSpotlight.category}
                </span>
                <h3 className="text-xl md:text-3xl font-extrabold text-white leading-tight mb-2 drop-shadow-md">
                  {featuredSpotlight.title}
                </h3>
                <p className="text-sm text-white/90 line-clamp-2 hidden md:block drop-shadow">
                  {featuredSpotlight.description}
                </p>
              </div>

              {/* Purchase Quick Actions */}
              <div className="flex flex-wrap items-center gap-3" onClick={(e) => e.stopPropagation()}>
                {featuredSpotlight.games.length === 1 ? (
                  <>
                    <button
                      onClick={(e) => handleAddToCart(e, featuredSpotlight.games[0].id)}
                      className="px-4 py-2 rounded-full text-xs font-bold btn-glossy-white flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                    >
                      🛒 Add to Cart (₹{featuredSpotlight.games[0].price})
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(e, featuredSpotlight.games[0].id)}
                      className="px-5 py-2 rounded-full text-xs font-bold btn-glossy-white flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
                    >
                      ⚡ Buy Now
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => handleAddBundleToCart(e, featuredSpotlight.games)}
                    className="px-5 py-2 rounded-full text-xs font-bold btn-glossy-white flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
                  >
                    📦 Buy All {featuredSpotlight.games.length} Games
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex sm:flex-wrap justify-start sm:justify-center items-center overflow-x-auto no-scrollbar gap-2 mb-8 sm:mb-12 px-1 pb-2"
        >
          {categories.map((cat) => (
            <Magnetic key={cat}>
              <button
                id={`cat-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 backdrop-blur-md cursor-pointer flex-shrink-0 ${
                  activeCategory === cat ? "btn-glossy-white border-2 border-black/30 shadow-lg scale-105" : "btn-glossy-white opacity-80 hover:opacity-100"
                }`}
              >
                {cat}
              </button>
            </Magnetic>
          ))}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="video-grid-card rounded-[24px] overflow-hidden group cursor-pointer flex flex-col justify-between border border-white/20 shadow-xl bg-slate-950/85 backdrop-blur-xl"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                {/* Duration & Multi-Game Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black bg-white/90 backdrop-blur-md border border-white/80">
                    {video.quality}
                  </span>
                  {video.games.length > 1 && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black bg-white/90 backdrop-blur-md border border-white/80 shadow-sm">
                      🎮 {video.games.length} Games
                    </span>
                  )}
                </div>

                {video.duration ? (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold text-black bg-white/90 backdrop-blur-md border border-white/80">
                      {video.duration}
                    </span>
                  </div>
                ) : null}

                {/* Center Play Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full btn-glossy-white flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 ml-0.5 fill-current text-black" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Meta Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1"
                    style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1" }}
                  >
                    {video.game}
                  </span>
                  <h4
                    className="text-sm font-bold text-white leading-tight line-clamp-2 group-hover:text-emerald-400 transition-colors"
                    style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                  >
                    {video.title}
                  </h4>
                </div>

                {/* Action Buttons for Cart / Buy Now */}
                <div className="space-y-2 pt-2 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                  {video.games.length === 1 ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => handleAddToCart(e, video.games[0].id)}
                        className="w-full py-1.5 rounded-xl text-xs font-bold btn-glossy-white transition-all cursor-pointer"
                      >
                        🛒 Add
                      </button>
                      <button
                        onClick={(e) => handleBuyNow(e, video.games[0].id)}
                        className="w-full py-1.5 rounded-xl text-xs font-bold btn-glossy-white transition-all cursor-pointer"
                      >
                        ⚡ Buy Now
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleAddBundleToCart(e, video.games)}
                      className="w-full py-1.5 rounded-xl text-xs font-bold btn-glossy-white transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      📦 Add {video.games.length} Games (₹{video.games.reduce((acc, g) => acc + g.price, 0)})
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Player with Featured Games Purchase Panel (Portaled to document.body) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-lenis-prevent
              className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden"
              style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
              onClick={handleCloseVideo}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 15 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
                data-lenis-prevent
                className="video-modal-dark video-modal-content relative w-full max-w-[95vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-950 rounded-2xl sm:rounded-3xl border border-white/30 shadow-2xl flex flex-col max-h-[90vh] my-auto overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/15 bg-slate-950/95 flex-shrink-0">
                  <div className="min-w-0 pr-3">
                    <span
                      className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block truncate"
                      style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1", filter: "none" }}
                    >
                      {selectedVideo.game} • {selectedVideo.category}
                    </span>
                    <h3
                      className="text-xs sm:text-base font-bold text-white truncate max-w-lg"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none", textShadow: "none" }}
                    >
                      {selectedVideo.title}
                    </h3>
                  </div>
                  <button
                    onClick={handleCloseVideo}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center text-sm sm:text-base font-bold cursor-pointer transition-all flex-shrink-0 active:scale-90"
                    style={{ color: "#ffffff", filter: "none" }}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Video Container (playsInline to prevent native fullscreen displacement) */}
                <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center flex-shrink-0">
                  {selectedVideo.videoSrc ? (
                    <video
                      key={selectedVideo.videoSrc}
                      src={selectedVideo.videoSrc}
                      controls
                      autoPlay
                      playsInline
                      webkit-playsinline="true"
                      preload="auto"
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support high-definition video playback.
                    </video>
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  )}
                </div>

                {/* Featured Games in Video Purchase Section */}
                <div className="p-3 sm:p-5 bg-slate-950 border-t border-white/15 overflow-y-auto max-h-[30vh] sm:max-h-[35vh] space-y-3 no-scrollbar">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4
                      className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none" }}
                    >
                      <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>🎮 Included Game{selectedVideo.games.length > 1 ? "s" : ""}</span>
                      <span
                        className="text-[10px] sm:text-xs font-normal text-slate-300"
                        style={{ color: "#cbd5e1", WebkitTextFillColor: "#cbd5e1", filter: "none" }}
                      >
                        ({selectedVideo.games.length} available)
                      </span>
                    </h4>

                    {selectedVideo.games.length > 1 && (
                      <button
                        onClick={(e) => handleAddBundleToCart(e, selectedVideo.games)}
                        className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold btn-primary shadow-md transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        📦 Buy All ({selectedVideo.games.length}) - ₹{selectedVideo.games.reduce((a, g) => a + g.price, 0)}
                      </button>
                    )}
                  </div>

                  {/* List of Featured Games */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {selectedVideo.games.map((g) => (
                      <div
                        key={g.id}
                        className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <img
                            src={g.image}
                            alt={g.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border border-white/20 flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h5
                              className="text-xs sm:text-sm font-bold text-white truncate"
                              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", filter: "none" }}
                            >
                              {g.title}
                            </h5>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span
                                className="text-xs sm:text-sm font-bold text-emerald-400"
                                style={{ color: "#34d399", WebkitTextFillColor: "#34d399", filter: "none" }}
                              >
                                ₹{g.price}
                              </span>
                              {g.originalPrice && (
                                <span
                                  className="text-[10px] sm:text-xs text-slate-400 line-through"
                                  style={{ color: "#94a3b8", WebkitTextFillColor: "#94a3b8", filter: "none" }}
                                >
                                  ₹{g.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={(e) => handleAddToCart(e, g.id)}
                            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-white/20 hover:bg-white text-white hover:text-black transition-all cursor-pointer active:scale-95"
                            style={{ color: "#ffffff" }}
                          >
                            🛒 Cart
                          </button>
                          <button
                            onClick={(e) => handleBuyNow(e, g.id)}
                            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold btn-primary transition-all cursor-pointer active:scale-95"
                          >
                            ⚡ Buy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
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
