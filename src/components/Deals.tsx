"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { deals } from "@/data/gameData";
import Magnetic from "./Magnetic";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

function DealCountdown({ endsAt }: { endsAt: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTime = useCallback(() => {
    const diff = new Date(endsAt).getTime() - Date.now();
    if (diff <= 0) return { hours: 0, mins: 0, secs: 0 };
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  }, [endsAt]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTime());
  const [prevEndsAt, setPrevEndsAt] = useState(endsAt);

  if (endsAt !== prevEndsAt) {
    setPrevEndsAt(endsAt);
    setTimeLeft(calculateTime());
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  const displayTime = mounted ? timeLeft : { hours: 0, mins: 0, secs: 0 };

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="text-slate-500">Ends in:</span>
      <span className="px-1.5 py-0.5 rounded-lg text-[#0f172a] font-mono font-bold text-xs backdrop-blur-sm bg-white/35 border border-white/60 shadow-inner">
        {String(displayTime.hours).padStart(2, "0")}
      </span>
      <span className="text-slate-400">:</span>
      <span className="px-1.5 py-0.5 rounded-lg text-[#0f172a] font-mono font-bold text-xs backdrop-blur-sm bg-white/35 border border-white/60 shadow-inner">
        {String(displayTime.mins).padStart(2, "0")}
      </span>
      <span className="text-slate-400">:</span>
      <span className="px-1.5 py-0.5 rounded-lg text-[#0f172a] font-mono font-bold text-xs backdrop-blur-sm bg-white/35 border border-white/60 shadow-inner">
        {String(displayTime.secs).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function Deals() {
  const [displayDeals, setDisplayDeals] = useState(() =>
    deals.map((deal) => ({ ...deal, keyId: `${deal.id}` }))
  );
  
  const isAnimating = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipState = useRef<any>(null);
  const animationDirection = useRef<"forward" | "backward" | null>(null);

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    animationDirection.current = "forward";

    // 1. Capture current layout state
    flipState.current = Flip.getState(".deal-card-wrapper");

    // 2. Update state to transition state: [A_leaving, B, C, D, A_entering]
    setDisplayDeals((prev) => {
      const first = prev[0];
      return [
        { ...first, keyId: `${first.id}-leaving` },
        ...prev.slice(1),
        { ...first, keyId: `${first.id}-entering` },
      ];
    });
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    animationDirection.current = "backward";

    // 1. Capture current layout state
    flipState.current = Flip.getState(".deal-card-wrapper");

    // 2. Update state to transition state: [D_entering, A, B, C, D_leaving]
    setDisplayDeals((prev) => {
      const last = prev[prev.length - 1];
      return [
        { ...last, keyId: `${last.id}-entering` },
        ...prev.slice(0, -1),
        { ...last, keyId: `${last.id}-leaving` },
      ];
    });
  };

  useEffect(() => {
    if (flipState.current) {
      Flip.from(flipState.current, {
        targets: ".deal-card-wrapper",
        duration: 0.6,
        ease: "power2.out",
        absolute: true, // Smooth absolute positioning during transition
        onEnter: (els) => {
          gsap.fromTo(els,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              transformOrigin: animationDirection.current === "forward" ? "bottom right" : "bottom left",
              duration: 0.45
            }
          );
        },
        onLeave: (els) => {
          gsap.to(els, {
            opacity: 0,
            scale: 0,
            transformOrigin: animationDirection.current === "forward" ? "bottom left" : "bottom right",
            duration: 0.45
          });
        },
        onComplete: () => {
          // 3. Reset to stable state (clean keyIds and filter out leaving)
          setDisplayDeals((prev) => {
            const stable = prev
              .filter((d) => !d.keyId.endsWith("-leaving"))
              .map((d) => ({
                ...d,
                keyId: `${d.id}`,
              }));
            return stable;
          });

          isAnimating.current = false;
          flipState.current = null;
          animationDirection.current = null;
        }
      });
    }
  }, [displayDeals]);

  return (
    <section id="deals" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="abstract-shape w-[500px] h-[500px] -bottom-48 left-1/3" style={{ background: "rgba(255, 71, 87, 0.05)" }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-red-500 text-sm font-bold mb-6 backdrop-blur-md bg-red-500/10 border border-red-500/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Limited Time Offers
          </div>
          <h2 className="section-heading mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Special <span className="gradient-text">Deals</span>
          </h2>
          <p className="section-subheading mx-auto">
            Don&apos;t miss these incredible offers. Grab them before they&apos;re gone!
          </p>
        </motion.div>

        {/* Deals Container with dashed border */}
        <div
          className="flex flex-col sm:flex-row gap-6 p-6 border-2 border-dashed border-slate-300/60 rounded-3xl overflow-hidden items-stretch justify-between bg-white/10 backdrop-blur-md shadow-lg"
          style={{ minHeight: "380px" }}
        >
          {displayDeals.map((deal) => {
            const isLeaving = deal.keyId.endsWith("-leaving");
            const isEntering = deal.keyId.endsWith("-entering");

            return (
              <div
                key={deal.keyId}
                data-flip-id={deal.id}
                className={`deal-card-wrapper w-full sm:w-[23%] flex-shrink-0 glass-card overflow-hidden group cursor-pointer block ${
                  isLeaving ? "opacity-0 scale-0 absolute pointer-events-none" : ""
                } ${
                  isEntering ? "opacity-0 scale-0" : ""
                }`}
              >
                <Link href={`/games/${deal.id}`} className="block">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={deal.image} alt={deal.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />

                    {/* Discount badge */}
                    <div className="absolute top-3 left-3">
                      <div className="discount-badge text-sm font-bold px-3 py-1" style={{ animation: "countdown-pulse 2s ease-in-out infinite" }}>
                        -{deal.discount}%
                      </div>
                    </div>

                    {/* Deal type */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0f172a] backdrop-blur-sm bg-white/65 border border-white/60">
                        {deal.type === "flash" ? "⚡ Flash" : deal.type === "bundle" ? "📦 Bundle" : "📅 Weekly"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-[#0f172a] leading-tight line-clamp-2 group-hover:text-mint transition-colors">
                      {deal.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-mint">₹{deal.dealPrice}</span>
                      <span className="text-sm text-slate-400 line-through">₹{deal.originalPrice}</span>
                    </div>

                    <DealCountdown endsAt={deal.endsAt} />

                    <Magnetic>
                      <div
                        role="button"
                        className="w-full btn-primary text-sm py-2.5 mt-2 text-center cursor-pointer block"
                      >
                        Grab Deal
                      </div>
                    </Magnetic>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Carousel Control Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <Magnetic>
            <button
              onClick={handlePrev}
              className="btn-outline px-6 py-2.5 font-bold uppercase tracking-wider cursor-pointer"
              id="deals-prev"
            >
              ← Previous
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={handleNext}
              className="btn-outline px-6 py-2.5 font-bold uppercase tracking-wider cursor-pointer"
              id="deals-next"
            >
              Next →
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
