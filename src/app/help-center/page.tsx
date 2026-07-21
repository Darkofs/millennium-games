"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HelpCenterPage() {
  const topics = [
    {
      category: "📦 Orders & Delivery",
      description: "Find help with order status, delivery times, missing orders, and verification.",
      content: (
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-[#0f172a]">How can I check my order status?</h4>
            <p className="text-[11px] text-slate-600">
              Log in to your Millennium Games account and visit <strong className="text-[#0f172a]">My Orders</strong> to view the latest status.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-[#0f172a]">My order hasn&apos;t arrived.</h4>
            <p className="text-[11px] text-slate-600">
              Most digital products are delivered within minutes. During busy periods or payment verification, delivery may take longer. If your order has not arrived after the estimated delivery time, please contact support with your Order ID.
            </p>
          </div>
        </div>
      ),
    },
    {
      category: "💳 Payments",
      description: "Need help with failed payments, duplicate charges, or refund status?",
      content: (
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-[#0f172a]">Payment was successful but I didn&apos;t receive my game.</h4>
            <p className="text-[11px] text-slate-600">
              Please wait a few minutes while your payment is verified. If the issue persists, contact support with your payment reference and Order ID.
            </p>
          </div>
        </div>
      ),
    },
    {
      category: "🎮 Game Activation",
      description: "Get assistance activating keys on Steam, Epic, Ubisoft, EA, or Rockstar.",
      content: (
        <div className="space-y-3 pt-2">
          <p className="text-[11px] text-slate-600">Before contacting support, please verify:</p>
          <ul className="list-disc pl-5 text-[11px] text-slate-600 space-y-1">
            <li>Correct platform (Steam, Epic, EA, Ubisoft, Rockstar, etc.)</li>
            <li>Correct game edition</li>
            <li>Correct region</li>
          </ul>
          <p className="text-[11px] text-slate-600">
            If your activation key does not work, contact support within 24 hours with screenshots of the activation error.
          </p>
        </div>
      ),
    },
    {
      category: "🔑 Account Support",
      description: "Login issues, password resets, account verification, and security.",
      content: (
        <div className="space-y-3 pt-2">
          <p className="text-[11px] text-slate-600">We can assist with login issues, password reset, account verification, and order history.</p>
          <p className="text-[11px] text-red-600 font-semibold bg-red-500/5 p-2 rounded-lg border border-red-500/10">
            ⚠️ Never share your password with anyone, including our support team.
          </p>
        </div>
      ),
    },
    {
      category: "💰 Refunds & Replacements",
      description: "Review refund eligibility, replacement guides, and invalid key claims.",
      content: (
        <div className="space-y-3 pt-2">
          <p className="text-[11px] text-slate-600">Digital products are generally non-refundable after delivery. However, you may qualify if:</p>
          <ul className="list-disc pl-5 text-[11px] text-slate-600 space-y-1">
            <li>You received an invalid key.</li>
            <li>We cannot deliver your order.</li>
            <li>Your order was charged multiple times.</li>
            <li>We cannot provide a replacement for a verified issue.</li>
          </ul>
          <p className="text-[11px] text-slate-600">
            Please review our{" "}
            <Link href="/refund-policy" className="underline font-bold text-mint hover:text-emerald-600">
              Refund & Replacement Policy
            </Link>{" "}
            for complete details.
          </p>
        </div>
      ),
    },
    {
      category: "🛡️ Security Tips",
      description: "Best practices to keep your digital account and keys safe.",
      content: (
        <div className="space-y-2 pt-2 text-[11px] text-slate-600">
          <p>To keep your account safe:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use a strong password.</li>
            <li>Enable two-factor authentication where available.</li>
            <li>Never share activation keys publicly.</li>
            <li>Purchase only through the official Millennium Games website.</li>
            <li>Beware of phishing emails claiming to be from Millennium Games.</li>
          </ul>
        </div>
      ),
    },
  ];

  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Most orders are delivered within minutes after payment confirmation.",
    },
    {
      q: "Can I cancel my order?",
      a: "Orders that have not yet been processed may be cancelled. Delivered digital products generally cannot be cancelled.",
    },
    {
      q: "Are your game keys genuine?",
      a: "Yes. We strive to supply genuine digital products from trusted distributors and suppliers.",
    },
    {
      q: "Can I return a digital game?",
      a: "No. Once a digital key has been delivered or revealed, it cannot be returned.",
    },
    {
      q: "Why was my order placed on hold?",
      a: "Orders may be temporarily held for payment verification or fraud prevention to protect both customers and our business.",
    },
    {
      q: "My activation key doesn't work.",
      a: "Please contact our support team within 24 hours and provide your Order ID together with a screenshot of the activation error. We will investigate and, if appropriate, provide a replacement or refund in accordance with our policy.",
    },
  ];

  return (
    <main className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#cbdce3]/85 z-10" />
        <div className="abstract-shape abstract-shape-mint w-[600px] h-[600px] -top-32 left-[10%] opacity-20" />
        <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] bottom-[10%] right-[10%] opacity-15" />
      </div>

      <div className="flex-1 container-custom pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase" style={{ fontFamily: "var(--font-outfit)" }}>
              Help <span className="gradient-text">Center</span>
            </h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto">
              Welcome to the Millennium Games Help Center. Need assistance? We&apos;re here to help you.
            </p>
          </div>

          {/* Popular Topics Grid */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0f172a] uppercase tracking-wider pl-1" style={{ fontFamily: "var(--font-outfit)" }}>
              Popular Topics
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topics.map((topic) => (
                <div key={topic.category} className="glass-card p-6 border-white/20 hover:border-mint/20 transition-all duration-300 shadow-sm space-y-3">
                  <h3 className="text-base font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                    {topic.category}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">{topic.description}</p>
                  <hr className="border-slate-300/30" />
                  {topic.content}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 border-white/20 shadow-sm space-y-4 text-[#0f172a]">
              <h3 className="text-base font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                📧 Contact Support
              </h3>
              <p className="text-xs text-slate-600">
                If you cannot find the answer you need, we&apos;re happy to help. When contacting support, please include:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                <li>Order ID</li>
                <li>Registered Email Address</li>
                <li>Product Name</li>
                <li>Detailed description of the issue</li>
                <li>Screenshots (if applicable)</li>
              </ul>
              <p className="text-[10px] text-slate-400">
                Providing complete information helps us resolve your issue more quickly.
              </p>
            </div>

            <div className="glass-card p-6 border-white/20 shadow-sm space-y-4 text-[#0f172a] flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-base font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                  ⏱️ Support Response Time
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2 font-semibold">
                    <span className="text-mint">✓</span> Average Response Time: Within 24 Hours
                  </li>
                  <li className="flex items-center gap-2 font-semibold">
                    <span className="text-mint">✓</span> Priority Issues: As soon as possible
                  </li>
                </ul>
                <p className="text-xs text-slate-500 italic">
                  Support is available for all customers who have purchased through Millennium Games.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/#support" className="btn-primary w-full text-center py-2.5 font-bold uppercase tracking-wider text-xs block">
                  Go to Contact Form
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ list */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0f172a] uppercase tracking-wider pl-1" style={{ fontFamily: "var(--font-outfit)" }}>
              Frequently Asked Questions
            </h2>
            <div className="glass-card p-6 sm:p-8 border-white/20 shadow-sm space-y-6">
              {faqs.map((faq, idx) => (
                <div key={faq.q} className="space-y-2">
                  <h4 className="text-sm font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  {idx < faqs.length - 1 && <hr className="border-slate-300/30 mt-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Still Need Help banner */}
          <div className="glass-card p-8 border-white/20 shadow-lg text-center space-y-4">
            <h3 className="text-lg font-black text-[#0f172a] uppercase" style={{ fontFamily: "var(--font-outfit)" }}>
              Still Need Help?
            </h3>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              We&apos;re committed to providing fast, friendly, and professional customer support. If your question isn&apos;t answered here, please reach out through our Contact Us page or your preferred support channel.
            </p>
            <p className="text-sm font-bold text-[#0f172a]">
              Thank you for choosing <span className="gradient-text">Millennium Games</span>.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
