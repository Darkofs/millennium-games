"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import type { Game } from "@/data/gameData";
import Magnetic from "./Magnetic";
import gsap from "gsap";

const PlatformBadge = ({ platform }: { platform: string }) => {
  const labels: Record<string, string> = {
    steam: "Steam",
    epic: "Epic Games",
    ea: "EA Play",
    ubisoft: "Ubisoft",
    rockstar: "Rockstar",
    battlenet: "Battle.net"
  };
  return (
    <span
      className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#0f172a] backdrop-blur-md"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.75)",
      }}
    >
      {labels[platform] || "Steam"}
    </span>
  );
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-[#000000]" : "text-slate-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-xs text-silver/40 ml-1">{rating}</span>
  </div>
);

export default function GameCard({ game }: { game: Game }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addToCart } = useApp();

  // Prefetch game details page for instant transition
  useEffect(() => {
    router.prefetch(`/games/${game.id}`);
  }, [router, game.id]);

  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const rotateX = y * -12; // Slightly reduced for smoother tracking
      const rotateY = x * 12;

      gsap.to(inner, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.02,
        transformPerspective: 1000,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Update glow position custom properties
      const px = (x + 0.5) * 100;
      const py = (y + 0.5) * 100;
      inner.style.setProperty("--glow-x", `${px}%`);
      inner.style.setProperty("--glow-y", `${py}%`);
    };

    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(inner);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigating if clicking add to cart button
    if ((e.target as HTMLElement).closest('[aria-label="Add to cart"]')) {
      return;
    }
    e.preventDefault();
    router.push(`/games/${game.id}`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="card-3d group cursor-pointer"
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/games/${game.id}`}
        className="block w-full h-full"
      >
        <div
          ref={innerRef}
          className="card-3d-inner glass-card overflow-hidden w-full h-full block"
        >
          {/* Image */}
          <div className="block relative aspect-[3/4] overflow-hidden">
            <img
              src={game.image}
              alt={game.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />

            {/* Discount badge */}
            {game.discount && (
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 discount-badge !text-[9px] sm:!text-xs !px-1.5 sm:!px-3 !py-0.5 sm:!py-1">
                -{game.discount}%
              </div>
            )}

            {/* Platform badge */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
              <PlatformBadge platform={game.platform} />
            </div>

            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,255,255,0.25), transparent 60%)`,
              }}
            />
          </div>

          {/* Info */}
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="block flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-[#0f172a] leading-tight line-clamp-2 group-hover:text-mint transition-colors">
                  {game.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {game.genre.slice(0, 2).map((g) => (
                <span key={g} className="px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-slate-200/50 text-slate-600 font-semibold border border-slate-300/40">
                  {g}
                </span>
              ))}
            </div>

            <StarRating rating={game.rating} />

            <div className="flex items-center justify-between pt-1 gap-1">
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="text-sm sm:text-lg font-bold text-[#0f172a]">₹{game.price}</span>
                {game.originalPrice && (
                  <span className="text-[10px] sm:text-sm text-silver/30 line-through">
                    ₹{game.originalPrice}
                  </span>
                )}
              </div>
              <Magnetic>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(game.id);
                  }}
                  role="button"
                  className="p-2 sm:p-2.5 rounded-full text-[#0f172a] transition-all duration-300 backdrop-blur-md cursor-pointer flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.2))',
                    border: '1px solid rgba(0, 0, 0, 0.55)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 4px 12px rgba(0, 0, 0, 0.12)'
                  }}
                  aria-label="Add to cart"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </motion.div>
              </Magnetic>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
