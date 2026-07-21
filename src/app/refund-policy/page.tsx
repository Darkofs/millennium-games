"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#cbdce3]/85 z-10" />
        <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] -top-32 left-[10%] opacity-20" />
        <div className="abstract-shape abstract-shape-mint w-[500px] h-[500px] bottom-[10%] right-[5%] opacity-15" />
      </div>

      <div className="flex-1 container-custom pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase" style={{ fontFamily: "var(--font-outfit)" }}>
              Refund & Replacement <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Effective Date: July 21, 2026
            </p>
          </div>

          {/* Policy Card */}
          <div className="glass-card p-8 sm:p-12 border-white/20 shadow-2xl relative overflow-hidden space-y-8 text-[#0f172a] leading-relaxed">
            <p className="text-sm text-slate-600 font-medium">
              At <strong className="text-[#0f172a]">Millennium Games</strong>, we are committed to providing genuine digital gaming products and excellent customer service. As all products sold on our website are delivered digitally, our refund policy differs from that of physical goods.
            </p>

            <hr className="border-slate-300/40" />

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Digital Product Policy
              </h2>
              <p className="text-xs text-slate-600">
                All products sold through Millennium Games—including game activation keys, digital gift cards, game accounts, software licenses, downloadable content (DLC), and digital subscriptions—are delivered electronically.
              </p>
              <p className="text-xs text-slate-600 font-semibold bg-slate-200/40 border border-slate-300/30 p-3 rounded-xl">
                ⚠️ Once a digital product has been delivered or the activation key has been displayed, it is considered delivered and cannot be returned.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Refund Eligibility
              </h2>
              <p className="text-xs text-slate-600">
                A refund may be approved only under the following circumstances:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2">
                <li>Your order has not yet been processed or delivered.</li>
                <li>We are unable to deliver your purchased product.</li>
                <li>You were charged multiple times for the same order.</li>
                <li>The product you received is permanently unavailable.</li>
                <li>You received an invalid or non-working activation key, and our support team is unable to provide a working replacement after verification.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Replacement Before Refund
              </h2>
              <p className="text-xs text-slate-600">
                Whenever possible, Millennium Games will first attempt to resolve any issue by providing:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2">
                <li>A new activation key.</li>
                <li>A replacement product of equal value.</li>
                <li>Another suitable solution agreed upon by both parties.</li>
              </ul>
              <p className="text-xs text-slate-600">
                If a replacement cannot be provided, a full refund will be issued.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Non-Refundable Purchases
              </h2>
              <p className="text-xs text-slate-600">
                Refund requests will not be accepted for:
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-5 text-xs text-slate-600">
                <li>Incorrect purchases made by the customer.</li>
                <li>Wrong platform selected (Steam, Epic Games, EA, Ubisoft, Rockstar, etc.).</li>
                <li>Wrong region purchased.</li>
                <li>Change of mind after delivery.</li>
                <li>Products that have already been redeemed or activated.</li>
                <li>Orders placed without checking the product description or system requirements.</li>
                <li>Compatibility issues with your PC or operating system.</li>
                <li>Account suspensions or bans issued by game publishers.</li>
                <li>Promotional, discounted, clearance, or special-offer items unless the product is defective.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Invalid Key Claims
              </h2>
              <p className="text-xs text-slate-600">
                If you believe your activation key is invalid, please contact us within <strong className="text-mint">24 hours</strong> of delivery.
              </p>
              <p className="text-xs text-slate-600">
                To investigate your claim, we may request:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2">
                <li>Your Order ID</li>
                <li>Screenshot of the activation error</li>
                <li>Screenshot showing the key was not previously redeemed (where applicable)</li>
                <li>Any additional information required by the game platform or publisher</li>
              </ul>
              <p className="text-xs text-slate-600 bg-red-500/10 border border-red-500/20 text-red-600 p-3 rounded-xl font-semibold">
                ⚠️ False or manipulated claims may result in permanent suspension of your account.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Chargebacks & Payment Disputes
              </h2>
              <p className="text-xs text-slate-600">
                Customers should contact Millennium Games before filing a payment dispute or chargeback.
              </p>
              <p className="text-xs text-slate-600">
                Fraudulent chargebacks, payment reversals after successful delivery, or abuse of our refund policy may result in:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2">
                <li>Permanent account suspension</li>
                <li>Cancellation of future orders</li>
                <li>Legal action where applicable</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Refund Processing Time
              </h2>
              <p className="text-xs text-slate-600">
                After approval, refunds will be credited back via the original payment method:
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 text-xs text-slate-600 pt-1">
                <li className="bg-white/45 p-3 border border-white/60 rounded-xl">
                  <strong>💳 UPI:</strong> 1–3 Business Days
                </li>
                <li className="bg-white/45 p-3 border border-white/60 rounded-xl">
                  <strong>💳 Debit/Credit Cards:</strong> 3–7 Business Days
                </li>
                <li className="bg-white/45 p-3 border border-white/60 rounded-xl">
                  <strong>💳 Net Banking:</strong> 3–7 Business Days
                </li>
                <li className="bg-white/45 p-3 border border-white/60 rounded-xl">
                  <strong>💳 International:</strong> Up to 10 Business Days
                </li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Contact Support
              </h2>
              <p className="text-xs text-slate-600">
                If you require assistance regarding your order, please contact our support team before requesting a refund.
              </p>
              <p className="text-xs text-slate-600">
                Please include:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                <li>Order Number</li>
                <li>Registered Email Address</li>
                <li>Description of the issue</li>
                <li>Supporting screenshots (if applicable)</li>
              </ul>
              <p className="text-xs text-slate-600 font-semibold">
                Our support team aims to respond within <strong className="text-mint">24 hours</strong>. Email: <a href="mailto:millenniumpcgames@gmail.com" className="underline text-[#0f172a] hover:text-mint">millenniumpcgames@gmail.com</a>
              </p>
            </div>

            <hr className="border-slate-300/40" />

            {/* Section 9 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                Policy Updates
              </h2>
              <p className="text-xs text-slate-600">
                Millennium Games reserves the right to modify this Refund & Replacement Policy at any time without prior notice. Any changes will become effective immediately after being published on this website.
              </p>
              <p className="text-xs text-slate-600 font-bold">
                By placing an order with Millennium Games, you confirm that you have read, understood, and agreed to this Refund & Replacement Policy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
