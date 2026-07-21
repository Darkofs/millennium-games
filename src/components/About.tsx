"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Passion for Gaming",
    description: "We're gamers first. Every decision we make is driven by our love for the gaming community.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Security First",
    description: "Your data and payments are always protected with enterprise-grade encryption.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Customer First",
    description: "Every feature and policy is designed with our customers in mind. Your satisfaction drives us.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Lightning Fast",
    description: "Instant key delivery means you'll be playing your new game within seconds of purchase.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] top-1/4 -right-48" />
      <div className="starburst starburst-lg -bottom-20 -left-16" style={{ animation: "rotateStar 50s linear infinite" }} />
      <div className="starburst starburst-sm top-[15%] right-[10%]" style={{ animation: "rotateStar 35s linear infinite reverse" }} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="section-heading" style={{ fontFamily: "var(--font-outfit)" }}>
              Gaming Without{" "}
              <span className="gradient-text">Limits.</span>
            </h2>
            <div className="space-y-4 text-white/75 leading-relaxed">
              <p>
                Millennium Games was created to make premium gaming more accessible. We focus on
                delivering authentic digital products quickly, securely, and at competitive prices.
              </p>
              <p>
                Our mission is to help gamers discover incredible experiences while providing
                outstanding customer service and a seamless shopping experience. Every game key
                is verified, every transaction is secure, and every customer matters.
              </p>
              <p>
                Founded by gamers, for gamers — we understand what you need because we need it too.
                From the latest AAA titles to hidden indie gems, we&apos;re here to fuel your next adventure.
              </p>
            </div>
            <div className="pt-4">
              <Magnetic>
                <Link href="/#catalog" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
                  Start Shopping
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right: Values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-5 group"
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#0f172a] mb-3 group-hover:scale-105 transition-transform backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75)' }}>
                  {val.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#0f172a] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
