"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "transparent",
        }}
      />
      <div className="starburst starburst-md -top-10 -right-10" style={{ animation: "rotateStar 45s linear infinite" }} />
      <div className="starburst starburst-sm bottom-[10%] left-[5%]" style={{ animation: "rotateStar 30s linear infinite reverse" }} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h2 className="section-heading" style={{ fontFamily: "var(--font-outfit)" }}>
            Never Miss a <span className="gradient-text">Release.</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Get exclusive offers, game recommendations, and updates on upcoming launches
            delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-full px-5 py-3.5 text-slate-800 placeholder:text-slate-500 focus:outline-none transition-all backdrop-blur-md"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 16px rgba(90,110,125,0.06)' }}
                id="newsletter-email"
              />
            </div>
            <Magnetic>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary px-8 py-3.5 whitespace-nowrap cursor-pointer block"
                id="newsletter-submit"
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Subscribed!
                  </span>
                ) : (
                  "Subscribe"
                )}
              </motion.button>
            </Magnetic>
          </form>

          <p className="text-xs text-slate-500">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
