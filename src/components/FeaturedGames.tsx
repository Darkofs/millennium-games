"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { featuredGames } from "@/data/gameData";
import GameCard from "./GameCard";
import Magnetic from "./Magnetic";

const filters = [
  "All",
  "Steam",
  "Epic Games",
  "Action",
  "RPG",
  "Indie",
  "Multiplayer",
  "Best Sellers",
];

export default function FeaturedGames() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredGames = featuredGames.filter((game) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Steam") return game.platform === "steam";
    if (activeFilter === "Epic Games") return game.platform === "epic";
    if (activeFilter === "Best Sellers") return game.rating >= 4.7;
    return game.genre.includes(activeFilter);
  });

  return (
    <section id="catalog" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] -top-64 -left-64" />
      <div className="starburst starburst-lg -bottom-16 -right-12" style={{ animation: "rotateStar 50s linear infinite" }} />
      <div className="starburst starburst-sm top-[8%] right-[15%]" style={{ animation: "rotateStar 35s linear infinite reverse" }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Featured <span className="gradient-text">Games</span>
          </h2>
          <p className="section-subheading mx-auto">
            Discover the latest and greatest titles available on our platform.
            Every account login is verified and delivered instantly.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((filter) => (
            <Magnetic key={filter}>
              <button
                id={`filter-${filter.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                  activeFilter === filter
                    ? "text-[#0f172a] shadow-lg font-bold"
                    : "text-slate-600 hover:text-[#0f172a]"
                }`}
                style={activeFilter === filter ? {
                  background: "linear-gradient(135deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.2))",
                  border: "1px solid rgba(0, 0, 0, 0.55)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 8px rgba(0,0,0,0.04)",
                } : {
                  background: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2))",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 4px 12px rgba(90,110,125,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
                }}
              >
                {filter}
              </button>
            </Magnetic>
          ))}
        </motion.div>

        {/* Game Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Magnetic>
            <button className="btn-outline px-8 py-3" id="view-all-games">
              View All Games →
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
