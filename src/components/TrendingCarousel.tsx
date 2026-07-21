"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { trendingGames } from "@/data/gameData";

export default function TrendingCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / trendingGames.length;
    scrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % trendingGames.length;
        scrollTo(next);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, scrollTo]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / trendingGames.length;
    const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setActiveIndex(newIndex);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="abstract-shape abstract-shape-mint w-[500px] h-[500px] top-0 right-0" />
      <div className="starburst starburst-md -top-10 right-[20%]" style={{ animation: "rotateStar 40s linear infinite" }} />
      <div className="starburst starburst-sm bottom-[10%] left-[5%]" style={{ animation: "rotateStar 30s linear infinite reverse" }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="section-heading mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
              Trending <span className="gradient-text">Now</span>
            </h2>
            <p className="text-silver/50 text-base">
              The hottest games everyone&apos;s playing right now.
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              className="p-3 rounded-xl glass hover:bg-slate-200/50 text-[#0f172a] hover:text-mint transition-all"
              id="trending-prev"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo(Math.min(trendingGames.length - 1, activeIndex + 1))}
              className="p-3 rounded-xl glass hover:bg-slate-200/50 text-[#0f172a] hover:text-mint transition-all"
              id="trending-next"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto no-scrollbar px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] snap-x snap-mandatory"
      >
        {trendingGames.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex-shrink-0 w-[320px] sm:w-[400px] lg:w-[480px] snap-start"
          >
            <Link href={`/games/${game.id}`} className="block">
              <div
                className={`relative rounded-2xl overflow-hidden aspect-[16/10] group cursor-pointer transition-all duration-500 ${
                  activeIndex === i ? "ring-2 ring-mint/40 shadow-xl shadow-mint/10" : ""
                }`}
              >
              {/* Background */}
              <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              {/* Floating decoration */}
              <div
                className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, rgba(34,230,168,0.5), transparent)`,
                  animation: "floatSlow 4s ease-in-out infinite",
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}>
                    🔥 Trending
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-white/80 text-xs font-medium backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))', border: '1px solid rgba(255,255,255,0.12)' }}>
                    {game.platform === "steam" ? "Steam" : game.platform === "epic" ? "Epic" : "Multi-Platform"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                  {game.title}
                </h3>
                <p className="text-sm text-silver/50 line-clamp-2">{game.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className={`w-4 h-4 ${j < Math.floor(game.rating) ? "text-[#000000]" : "text-white/10"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-silver/40 ml-1">{game.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {game.originalPrice && (
                      <span className="text-sm text-silver/30 line-through">₹{game.originalPrice}</span>
                    )}
                    <span className="text-xl font-bold text-white">₹{game.price}</span>
                  </div>
                </div>
              </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="container-custom relative z-10">
        <div className="flex items-center justify-center gap-2 mt-8">
          {trendingGames.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
              style={{ width: activeIndex === i ? 40 : 16 }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className="absolute inset-0 bg-slate-300/85 rounded-full" />
              {activeIndex === i && (
                <motion.div
                  className="absolute inset-0 bg-mint rounded-full"
                  layoutId="carouselProgress"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
