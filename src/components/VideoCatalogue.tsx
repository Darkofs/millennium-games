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
    <section id="video-catalogue" className="relative py-24 overflow-hidden bg-slate-950/40 backdrop-blur-xl border-y border-white/10">
      {/* Ambient background glows */}
      <div className="abstract-shape w-[600px] h-[600px] -top-32 right-0 opacity-30" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.25), transparent 70%)" }} />
      <div className="abstract-shape w-[500px] h-[500px] -bottom-32 left-0 opacity-30" style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)" }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-blue-500 text-sm font-bold mb-4 backdrop-blur-md bg-blue-500/10 border border-blue-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
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
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-16 rounded-3xl overflow-hidden glass-card border border-white/20 shadow-2xl group cursor-pointer"
          onClick={() => setSelectedVideo(featuredSpotlight)}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img
              src={featuredSpotlight.thumbnail}
              alt={featuredSpotlight.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/40 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                <svg className="w-10 h-10 md:w-12 md:h-12 ml-1 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-blue-600/80 backdrop-blur-md border border-blue-400/40">
                ⭐ Featured Spotlight
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-900 bg-white/90 backdrop-blur-md">
                {featuredSpotlight.quality}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1 block">
                  {featuredSpotlight.game} • {featuredSpotlight.category}
                </span>
                <h3 className="text-xl md:text-3xl font-extrabold text-white leading-tight mb-2 drop-shadow-md">
                  {featuredSpotlight.title}
                </h3>
                <p className="text-sm text-slate-300 line-clamp-2 hidden md:block">
                  {featuredSpotlight.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
                  ⏱️ {featuredSpotlight.duration}
                </span>
                <span className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
                  👁️ {featuredSpotlight.views}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2.5 mb-12"
        >
          {categories.map((cat) => (
            <Magnetic key={cat}>
              <button
                id={`cat-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-md ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/50"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
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
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-blue-500/50 transition-all duration-500 flex flex-col"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Duration & Quality Badges */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white bg-black/70 backdrop-blur-md border border-white/20">
                    {video.quality}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold text-white bg-black/80 backdrop-blur-md border border-white/20">
                    {video.duration}
                  </span>
                </div>

                {/* Center Play Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg backdrop-blur-md border border-white/30">
                    <svg className="w-6 h-6 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Meta Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                    {video.game}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {video.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {video.category}
                  </span>
                  <span>{video.views}</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
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
              <div className="p-6 bg-slate-950/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                  <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    Quality: {selectedVideo.quality}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
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
