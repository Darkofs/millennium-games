"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "@/data/gameData";

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, [nextReview]);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="abstract-shape abstract-shape-mint w-[400px] h-[400px] top-0 left-0" />
      <div className="starburst starburst-md -top-10 right-[12%]" style={{ animation: "rotateStar 45s linear infinite" }} />
      <div className="starburst starburst-sm bottom-[5%] -left-6" style={{ animation: "rotateStar 30s linear infinite reverse" }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-heading mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            What Gamers <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subheading mx-auto">
            Thousands of happy customers trust us for their gaming needs.
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-8 sm:p-10"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg
                      key={j}
                      className={`w-5 h-5 ${j < reviews[activeIndex].rating ? "text-[#000000]" : "text-slate-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                  &ldquo;{reviews[activeIndex].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#0f172a] font-bold text-sm backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75)' }}>
                    {reviews[activeIndex].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f172a]">
                      {reviews[activeIndex].name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{reviews[activeIndex].date}</span>
                      {reviews[activeIndex].verified && (
                        <span className="flex items-center gap-1 text-mint font-semibold">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i ? "w-8 backdrop-blur-sm" : "hover:scale-110"
                } rounded-full`}
                style={activeIndex === i ? {
                  background: "#000000",
                  border: "1px solid rgba(0, 0, 0, 0.6)",
                  boxShadow: "0 0 12px rgba(0, 0, 0, 0.3)",
                } : {
                  background: "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { label: "Orders Delivered", value: "1,000+", icon: "📦" },
            { label: "Positive Feedback", value: "98%", icon: "⭐" },
            { label: "Customer Support", value: "24/7", icon: "🎧" },
          ].map((metric) => (
            <div key={metric.label} className="glass-card p-6 text-center">
              <div className="text-2xl mb-2">{metric.icon}</div>
              <div className="text-2xl font-bold text-[#0f172a] mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                {metric.value}
              </div>
              <div className="text-sm text-slate-500">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
