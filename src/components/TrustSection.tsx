"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const trustCards = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "100% Secure Payments",
    description: "Your transactions are protected with industry-standard encryption. We accept all major payment methods securely.",
    color: "#000000",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Instant Digital Delivery",
    description: "Receive your game account credentials immediately after purchase. Instant access to log in and play.",
    color: "#FFA502",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Verified Products",
    description: "Every game account is pre-purchased and fully verified. We guarantee 100% working login details and lifetime support.",
    color: "#4FC3F7",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Dedicated Support",
    description: "Friendly assistance whenever you need help. Our support team is available around the clock to assist you.",
    color: "#E040FB",
  },
];

const stats = [
  { value: 1000, suffix: "+", label: "Orders Delivered", prefix: "" },
  { value: 98, suffix: "%", label: "Positive Feedback", prefix: "" },
  { value: 24, suffix: "/7", label: "Customer Support", prefix: "" },
  { value: 8000, suffix: "+", label: "Games Available", prefix: "" },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = useCallback(() => {
    const duration = 2000;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
        }
      },
      { threshold: 0.5 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [animate, hasAnimated]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export default function TrustSection() {
  return (
    <section id="trust" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="abstract-shape abstract-shape-emerald w-[700px] h-[700px] -top-64 left-1/2 -translate-x-1/2" />
      <div className="starburst starburst-lg top-[10%] -right-16" style={{ animation: "rotateStar 55s linear infinite" }} />
      <div className="starburst starburst-sm bottom-[15%] left-[8%]" style={{ animation: "rotateStar 35s linear infinite reverse" }} />

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
            Why Choose <span className="gradient-text">Millennium Games</span>?
          </h2>
          <p className="section-subheading mx-auto">
            We&apos;re committed to providing the best gaming experience with security, speed, and trust.
          </p>
        </motion.div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {trustCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 text-center group"
            >
              <div
                className="w-16 h-16 rounded-3xl mx-auto mb-5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 text-[#0f172a] backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75), 0 8px 20px rgba(90,110,125,0.08)',
                }}
              >
                {card.icon}
              </div>
              <h3 className="text-base font-semibold text-[#0f172a] mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                {card.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                <div className="text-sm text-slate-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
