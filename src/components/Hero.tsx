"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

const trustItems = [
  { icon: "⚡", text: "Instant Delivery" },
  { icon: "🔒", text: "Secure Checkout" },
  { icon: "✓", text: "Verified Sellers" },
  { icon: "🎧", text: "24/7 Support" },
];

const floatingCards = [
  { id: 29, title: "Black Myth: Wukong", platform: "STEAM", color: "#fbbf24", rotation: -12, delay: 0, image: "/images/Game Images/Black Myth Wukong.svg" },
  { id: 30, title: "GTA 5", platform: "EPIC", color: "#16a34a", rotation: 8, delay: 0.2, image: "/images/Game Images/GTA 5.svg" },
  { id: 31, title: "FC 26", platform: "STEAM", color: "#2563eb", rotation: -5, delay: 0.4, image: "/images/Game Images/FC 26.svg" },
  { id: 32, title: "BATTLEFIELD 6", platform: "STEAM", color: "#0ea5e9", rotation: 15, delay: 0.6, image: "/images/Game Images/BATTLEFIELD 6.svg" },
];

// 3D Glass Gaming Objects
const GamepadObject = () => (
  <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-[0_15px_30px_rgba(90,110,125,0.25)]">
    <defs>
      <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
        <stop offset="40%" stopColor="rgba(255, 255, 255, 0.35)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
      </linearGradient>
      <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.55)" />
      </linearGradient>
      <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#000000" />
      </linearGradient>
    </defs>
    <path
      d="M30 20 H70 C85 20, 95 30, 90 55 C86 70, 75 75, 68 68 C62 62, 60 60, 50 63 C40 60, 38 62, 32 68 C25 75, 14 70, 10 55 C5 30, 15 20, 30 20 Z"
      fill="url(#glassGrad)"
      stroke="url(#strokeGrad)"
      strokeWidth="1.2"
    />
    <path d="M22 38 h6 v-6 h4 v6 h6 v4 h-6 v6 h-4 v-6 h-6 z" fill="rgba(15, 23, 42, 0.6)" />
    <circle cx="70" cy="38" r="3" fill="#000000" filter="drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))" />
    <circle cx="78" cy="44" r="3" fill="rgba(15, 23, 42, 0.6)" />
    <circle cx="62" cy="44" r="3" fill="rgba(15, 23, 42, 0.6)" />
    <circle cx="70" cy="50" r="3" fill="rgba(15, 23, 42, 0.6)" />
    <circle cx="38" cy="50" r="8" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
    <circle cx="38" cy="50" r="4" fill="rgba(15, 23, 42, 0.5)" />
    <circle cx="62" cy="50" r="8" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
    <circle cx="62" cy="50" r="4" fill="rgba(15, 23, 42, 0.5)" />
    <path
      d="M20 25 C30 23, 70 23, 80 25"
      fill="none"
      stroke="rgba(255,255,255,0.8)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const VRHeadsetObject = () => (
  <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-[0_15px_30px_rgba(90,110,125,0.25)]">
    <defs>
      <linearGradient id="glassGradVR" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
        <stop offset="40%" stopColor="rgba(255, 255, 255, 0.3)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.12)" />
      </linearGradient>
      <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(0, 0, 0, 0.8)" />
        <stop offset="100%" stopColor="rgba(0, 0, 0, 0.2)" />
      </linearGradient>
    </defs>
    <rect x="15" y="25" width="70" height="34" rx="12" fill="url(#glassGradVR)" stroke="url(#strokeGrad)" strokeWidth="1.2" />
    <rect x="20" y="29" width="60" height="20" rx="8" fill="url(#visorGrad)" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="0.8" />
    <path d="M25 39 H75" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" filter="drop-shadow(0 0 5px rgba(0, 0, 0, 0.4))" />
    <circle cx="12" cy="42" r="3" fill="rgba(15, 23, 42, 0.4)" />
    <circle cx="88" cy="42" r="3" fill="rgba(15, 23, 42, 0.4)" />
    <path d="M15 35 C5 32, 5 52, 15 49" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="4" strokeLinecap="round" />
    <path d="M85 35 C95 32, 95 52, 85 49" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="4" strokeLinecap="round" />
    <path d="M25 28 C45 26, 55 26, 75 28" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const JoystickObject = () => (
  <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-[0_15px_30px_rgba(90,110,125,0.25)]">
    <defs>
      <linearGradient id="glassGradJoy" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
        <stop offset="40%" stopColor="rgba(255, 255, 255, 0.35)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
      </linearGradient>
    </defs>
    <polygon points="20,55 80,55 85,72 15,72" fill="url(#glassGradJoy)" stroke="url(#strokeGrad)" strokeWidth="1.2" />
    <circle cx="65" cy="63" r="3" fill="rgba(15, 23, 42, 0.6)" />
    <circle cx="75" cy="63" r="3" fill="#000000" filter="drop-shadow(0 0 3px rgba(0, 0, 0, 0.35))" />
    <line x1="50" y1="55" x2="50" y2="28" stroke="rgba(255,255,255,0.7)" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="50" y1="55" x2="50" y2="28" stroke="rgba(15, 23, 42, 0.4)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="22" r="10" fill="url(#neonGrad)" stroke="rgba(255,255,255,0.75)" strokeWidth="1" filter="drop-shadow(0 0 8px rgba(0, 0, 0, 0.4))" />
    <circle cx="47" cy="18" r="3" fill="rgba(255,255,255,0.7)" />
    <ellipse cx="50" cy="55" rx="10" ry="3" fill="rgba(15, 23, 42, 0.7)" />
  </svg>
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardsRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    cardsRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Starburst decorative shapes */}
      <div className="starburst starburst-lg -top-20 -left-20" style={{ animation: "rotateStar 60s linear infinite" }} />
      <div className="starburst starburst-md top-[20%] right-[5%]" style={{ animation: "rotateStar 45s linear infinite reverse" }} />
      <div className="starburst starburst-lg -bottom-24 right-[15%]" style={{ animation: "rotateStar 50s linear infinite" }} />
      <div className="starburst starburst-sm top-[60%] left-[10%]" style={{ animation: "rotateStar 35s linear infinite reverse" }} />
      <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] -top-48 -right-48" />
      <div className="abstract-shape abstract-shape-mint w-[400px] h-[400px] bottom-0 left-1/4" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const seed = (i + 1) * 7;
        return (
          <div
            key={i}
            className="particle"
            style={{
              left: `${(seed * 13) % 100}%`,
              top: `${(seed * 17) % 100}%`,
              width: `${(seed % 4) + 2}px`,
              height: `${(seed % 4) + 2}px`,
              opacity: ((seed % 5) + 1) / 10,
              animationDuration: `${(seed % 4) + 3}s`,
              animationDelay: `${(seed % 3)}s`,
              ["--tx" as string]: `${((seed % 100) - 50)}px`,
              ["--ty" as string]: `${-(seed % 150) - 50}px`,
            }}
          />
        );
      })}

      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-24 pb-16">
        {/* Left Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-800 text-sm font-medium mb-6 backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)' }}>
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              Premium Digital Game Store
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Your Next <span className="gradient-text">Adventure</span> Starts Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg leading-relaxed text-slate-700"
          >
            Buy authentic Steam and Epic Games titles instantly. Fast delivery,
            secure payments, trusted by thousands of gamers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link href="/#catalog" className="btn-primary text-base px-8 py-3.5" id="hero-explore-btn">
                Explore Games
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/#upcoming" className="btn-outline text-base px-8 py-3.5" id="hero-upcoming-btn">
                Upcoming Releases
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-wrap gap-x-6 gap-y-3 pt-2"
          >
            {trustItems.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="trust-check"
              >
                <span className="text-mint text-base">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Floating Game Cards and Floating Gaming Objects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="hidden lg:flex items-center justify-center relative h-[500px]"
        >
          <div
            ref={cardsRef}
            className="relative w-full h-full"
            style={{ transition: "transform 0.15s ease-out" }}
          >
            {/* Central glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(15, 23, 42, 0.08) 0%, transparent 70%)",
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
            />

            {/* Floating Gamepad Object */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -90, y: -90 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [-90, -110, -90],
                rotate: [-5, 5, -5]
              }}
              transition={{
                opacity: { duration: 1, delay: 0.8 },
                scale: { duration: 1, delay: 0.8 },
                y: { repeat: Infinity, duration: 7, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 8, ease: "easeInOut" }
              }}
              className="absolute w-36 h-28 top-[5%] left-[2%] z-20 pointer-events-none"
            >
              <GamepadObject />
            </motion.div>

            {/* Floating VR Headset Object */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 230, y: 70 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [70, 50, 70],
                rotate: [8, -8, 8]
              }}
              transition={{
                opacity: { duration: 1, delay: 1 },
                scale: { duration: 1, delay: 1 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 },
                rotate: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }
              }}
              className="absolute w-32 h-28 bottom-[18%] right-[-10%] z-20 pointer-events-none"
            >
              <VRHeadsetObject />
            </motion.div>

            {/* Floating Joystick Object */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -40, y: 200 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [200, 185, 200],
                rotate: [-10, 10, -10]
              }}
              transition={{
                opacity: { duration: 1, delay: 1.2 },
                scale: { duration: 1, delay: 1.2 },
                y: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 },
                rotate: { repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }
              }}
              className="absolute w-28 h-24 bottom-[8%] left-[5%] z-20 pointer-events-none"
            >
              <JoystickObject />
            </motion.div>

            {/* Floating game cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0, rotate: card.rotation * 2 }}
                animate={{ opacity: 1, scale: 1, rotate: card.rotation }}
                transition={{ duration: 0.8, delay: 0.5 + card.delay, type: "spring", stiffness: 100 }}
                className="absolute animate-float z-30"
                style={{
                  top: `${30 + i * 12}%`,
                  left: `${15 + i * 18}%`,
                  animation: `${i % 2 === 0 ? "float" : "floatReverse"} ${5 + i}s ease-in-out infinite`,
                  animationDelay: `${card.delay}s`,
                }}
              >
                <Link
                  href={`/games/${card.id}`}
                  className="w-36 h-48 rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative group cursor-pointer block"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.15))`,
                    backdropFilter: "blur(12px)",
                    transform: `perspective(800px) rotateY(${card.rotation}deg)`,
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-15"
                    style={{ background: `linear-gradient(135deg, ${card.color}, transparent)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                    <div className="text-[10px] font-bold text-slate-300 tracking-wider mb-0.5">
                      {card.platform}
                    </div>
                    <div className="text-xs font-semibold text-white leading-tight">
                      {card.title}
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s linear infinite",
                    }}
                  />
                </Link>
              </motion.div>
            ))}

            {/* Floating platform badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute top-[15%] right-[10%] px-3 py-1.5 rounded-lg glass text-xs font-semibold text-slate-800 pointer-events-none"
              style={{ animation: "floatSlow 4s ease-in-out infinite" }}
            >
              🎮 Steam
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="absolute bottom-[20%] left-[8%] px-3 py-1.5 rounded-lg glass text-xs font-semibold text-slate-800 pointer-events-none"
              style={{ animation: "floatSlow 5s ease-in-out infinite", animationDelay: "1s" }}
            >
              🚀 Epic Games
            </motion.div>

            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade blending into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#cbdce3]/80 to-transparent pointer-events-none" />
    </section>
  );
}
