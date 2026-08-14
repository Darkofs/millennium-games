"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

interface VideoItem {
  id: string;
  title: string;
  game: string;
  category: "Official Trailers" | "Gameplay 4K" | "Cinematics" | "Review Spotlights";
  thumbnail: string;
  duration: string;
  views: string;
  quality: string;
  youtubeId: string;
  description: string;
}

const videosData: VideoItem[] = [
  {
    id: "v1",
    title: "Black Myth: Wukong - Official Final Gameplay Trailer",
    game: "Black Myth: Wukong",
    category: "Official Trailers",
    thumbnail: "/images/Game Images/Black Myth Wukong.svg",
    duration: "4:12",
    views: "8.4M views",
    quality: "4K HDR",
    youtubeId: "pnS8t9A7-eQ",
    description: "Experience the mythic journey of the Destined One in stunning 4K visuals powered by Unreal Engine 5.",
  },
  {
    id: "v2",
    title: "Grand Theft Auto VI - Official Trailer 1 Showcase",
    game: "GTA 6",
    category: "Official Trailers",
    thumbnail: "/images/Game Images/GTA 5.svg",
    duration: "1:31",
    views: "190M views",
    quality: "4K 60FPS",
    youtubeId: "QdBZY2fkU-0",
    description: "Welcome to Vice City. Watch the record-breaking debut trailer of Grand Theft Auto VI.",
  },
  {
    id: "v3",
    title: "Cyberpunk 2077: Phantom Liberty - 4K Ray Tracing Overdrive Gameplay",
    game: "Cyberpunk 2077",
    category: "Gameplay 4K",
    thumbnail: "/images/Game Images/Cyberpunk 2077.svg",
    duration: "6:45",
    views: "3.2M views",
    quality: "4K RTX ON",
    youtubeId: "P99qNUfs9f0",
    description: "Explore the dangerous district of Dogtown in full Path Tracing glory on PC.",
  },
  {
    id: "v4",
    title: "Elden Ring: Shadow of the Erdtree - Gameplay Reveal Trailer",
    game: "Elden Ring",
    category: "Cinematics",
    thumbnail: "/images/Game Images/Elden Ring.svg",
    duration: "3:05",
    views: "12M views",
    quality: "4K HDR",
    youtubeId: "qLZenOn7WUo",
    description: "Return to the Lands Between and uncover dark secrets in the Land of Shadow expansion.",
  },
  {
    id: "v5",
    title: "Assassin's Creed Shadows - Official World & Gameplay Breakdown",
    game: "Assassin's Creed Shadows",
    category: "Official Trailers",
    thumbnail: "/images/Game Images/Assassin's Creed Shadow.svg",
    duration: "5:20",
    views: "4.1M views",
    quality: "4K 60FPS",
    youtubeId: "vovkzbtYBC8",
    description: "Immerse yourself in feudal Japan through the dual perspectives of Naoe and Yasuke.",
  },
  {
    id: "v6",
    title: "God of War Ragnarök - PC Ultra Graphics & Ultrawide Showcase",
    game: "God of War Ragnarök",
    category: "Gameplay 4K",
    thumbnail: "/images/Game Images/God Of War Ragnarök.svg",
    duration: "8:10",
    views: "2.7M views",
    quality: "4K 120FPS",
    youtubeId: "hfJ4Km46A-0",
    description: "Experience Kratos and Atreus' epic Norse journey unlocked for high-end PC rigs.",
  },
  {
    id: "v7",
    title: "Alan Wake 2 - Mind Place & Dark Place Gameplay Spotlight",
    game: "Alan Wake 2",
    category: "Review Spotlights",
    thumbnail: "/images/Game Images/Alan Wake 2.svg",
    duration: "7:15",
    views: "1.9M views",
    quality: "4K HDR",
    youtubeId: "dlQ3Fe-7cT0",
    description: "Deep dive into Remedy Entertainment's psychological survival horror masterpiece.",
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
    youtubeId: "ZgI5x-Wc6r8",
    description: "Master the blade of Jin Sakai with fluid stance switching and cinematic lethal strikes.",
  },
];

const categories = ["All", "Official Trailers", "Gameplay 4K", "Cinematics", "Review Spotlights"];

export default function VideoCatalogue() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const featuredSpotlight = videosData[0]; // Black Myth Wukong as spotlight

  const filteredVideos = videosData.filter((video) => {
    if (activeCategory === "All") return true;
    return video.category === activeCategory;
  });

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-800 text-sm font-bold mb-4 backdrop-blur-md bg-white/40 border border-white/60 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-ping" />
            <span>4K HDR Game Trailers & Gameplay</span>
          </div>
          <h2 className="section-heading mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Video <span className="gradient-text">Catalogue</span>
          </h2>
          <p className="section-subheading mx-auto">
            Watch official cinematic game trailers, raw 4K 60FPS gameplay showcases, and deep-dive reviews.
          </p>
        </motion.div>

        {/* Featured Video Hero Spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-14 rounded-[28px] overflow-hidden glass-card group cursor-pointer"
          onClick={() => setSelectedVideo(featuredSpotlight)}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img
              src={featuredSpotlight.thumbnail}
              alt={featuredSpotlight.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Magnetic>
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/65 backdrop-blur-md border border-white/60 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-black/85 transition-all duration-300">
                  <svg className="w-10 h-10 md:w-12 md:h-12 ml-1 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </Magnetic>
            </div>

            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0f172a] bg-white/80 backdrop-blur-md border border-white/80 shadow-md">
                ⭐ Featured Spotlight
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-black/60 backdrop-blur-md border border-white/30">
                {featuredSpotlight.quality}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-1 block">
                  {featuredSpotlight.game} • {featuredSpotlight.category}
                </span>
                <h3 className="text-xl md:text-3xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg">
                  {featuredSpotlight.title}
                </h3>
                <p className="text-sm text-slate-200 line-clamp-2 hidden md:block drop-shadow">
                  {featuredSpotlight.description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-white">
                <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30">
                  ⏱️ {featuredSpotlight.duration}
                </span>
                <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30">
                  👁️ {featuredSpotlight.views}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters (Matching Website Theme) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <Magnetic key={cat}>
              <button
                id={`cat-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                  activeCategory === cat
                    ? "text-[#0f172a] shadow-lg font-bold"
                    : "text-slate-600 hover:text-[#0f172a]"
                }`}
                style={
                  activeCategory === cat
                    ? {
                        background: "linear-gradient(135deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.2))",
                        border: "1px solid rgba(0, 0, 0, 0.55)",
                        boxShadow:
                          "0 8px 24px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 8px rgba(0,0,0,0.04)",
                      }
                    : {
                        background: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2))",
                        border: "1px solid rgba(255,255,255,0.55)",
                        boxShadow: "0 4px 12px rgba(90,110,125,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
                      }
                }
              >
                {cat}
              </button>
            </Magnetic>
          ))}
        </motion.div>

        {/* Video Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredVideos.map((video) => (
            <motion.div
              layout
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-[24px] overflow-hidden group cursor-pointer flex flex-col justify-between"
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Duration & Quality Badges */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0f172a] bg-white/80 backdrop-blur-md border border-white/70 shadow-sm">
                    {video.quality}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold text-white bg-black/70 backdrop-blur-md border border-white/30">
                    {video.duration}
                  </span>
                </div>

                {/* Center Play Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-black/65 backdrop-blur-md border border-white/60 text-white flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Meta Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {video.game}
                  </span>
                  <h4 className="text-sm font-bold text-[#0f172a] leading-tight line-clamp-2 group-hover:text-black transition-colors">
                    {video.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-300/40">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium bg-white/50 border border-white/70 text-slate-700">
                    {video.category}
                  </span>
                  <span className="font-semibold text-slate-600">{video.views}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/75 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl bg-slate-900 rounded-[28px] overflow-hidden border border-white/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    {selectedVideo.game} • {selectedVideo.category}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white truncate max-w-xl">
                    {selectedVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors text-xl font-bold"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Iframe Video Container */}
              <div className="relative aspect-[16/9] w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Footer info */}
              <div className="p-6 bg-slate-950/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                    Quality: {selectedVideo.quality}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                    Views: {selectedVideo.views}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
