"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsOfServicePage() {
  const termsSections = [
    {
      id: 1,
      title: "1. Eligibility",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            You must be at least <strong className="text-[#0f172a]">18 years old</strong>, or have the permission of a parent or legal guardian, to purchase products from Millennium Games.
          </p>
          <p>
            By placing an order, you confirm that the information you provide is accurate and complete.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "2. Our Services",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Millennium Games provides digital gaming products, including but not limited to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>PC Game Activation Keys</li>
            <li>Steam Products</li>
            <li>Epic Games Products</li>
            <li>Gift Cards</li>
            <li>Digital Game Accounts (where clearly stated)</li>
            <li>DLCs</li>
            <li>Gaming Software and Digital Licenses</li>
          </ul>
          <p>All products are delivered digitally unless otherwise stated.</p>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. Account Responsibility",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>If you create an account, you are responsible for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Maintaining the confidentiality of your login credentials.</li>
            <li>All activity that occurs under your account.</li>
            <li>Providing accurate account information.</li>
          </ul>
          <p>We reserve the right to suspend or terminate accounts involved in fraud, abuse, or violations of these Terms.</p>
        </div>
      ),
    },
    {
      id: 4,
      title: "4. Pricing & Payments",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>All prices are displayed in the applicable currency shown on the website.</p>
          <p>We reserve the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Change prices without prior notice.</li>
            <li>Correct pricing errors.</li>
            <li>Cancel orders affected by pricing mistakes.</li>
          </ul>
          <p>Payment must be completed before any product is delivered.</p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Digital Delivery",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Most orders are delivered automatically or within the estimated delivery time shown on the product page.</p>
          <p>Delivery times may vary due to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Payment verification</li>
            <li>Technical issues</li>
            <li>Supplier availability</li>
            <li>High order volumes</li>
          </ul>
          <p>Delivery estimates are not guaranteed.</p>
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Product Availability",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Although we strive to maintain accurate stock information, products may occasionally become unavailable.</p>
          <p>If a purchased product cannot be supplied, we may:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide an equivalent replacement.</li>
            <li>Offer store credit.</li>
            <li>Issue a full refund.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Refunds & Replacements",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            Refunds and replacements are governed by our{" "}
            <Link href="/refund-policy" className="underline font-bold text-mint hover:text-emerald-600">
              Refund & Replacement Policy
            </Link>
            .
          </p>
          <p>Customers agree to review that policy before making a purchase.</p>
        </div>
      ),
    },
    {
      id: 8,
      title: "8. Product Compatibility",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Customers are responsible for ensuring:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Their device meets the game&apos;s minimum system requirements.</li>
            <li>They purchase the correct platform.</li>
            <li>They purchase the correct edition.</li>
            <li>They purchase the correct regional version.</li>
          </ul>
          <p className="font-semibold">Millennium Games is not responsible for purchases made in error.</p>
        </div>
      ),
    },
    {
      id: 9,
      title: "9. Prohibited Activities",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Attempt payment fraud.</li>
            <li>Abuse refund requests.</li>
            <li>Share or resell digital products when prohibited.</li>
            <li>Reverse engineer or exploit our website.</li>
            <li>Use bots or automated purchasing software.</li>
            <li>Attempt unauthorized access to our systems.</li>
            <li>Upload malicious software or harmful content.</li>
          </ul>
          <p className="font-semibold text-red-600">Violation of these terms may result in account suspension or permanent banning.</p>
        </div>
      ),
    },
    {
      id: 10,
      title: "10. Intellectual Property",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>All website content, including logos, graphics, product descriptions, images, website design, and text, is the property of Millennium Games or its licensors and may not be copied, reproduced, or distributed without written permission.</p>
        </div>
      ),
    },
    {
      id: 11,
      title: "11. Third-Party Platforms",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Products sold by Millennium Games may require activation on third-party platforms, including Steam, Epic Games, Ubisoft Connect, EA App, Rockstar Games Launcher, and others.</p>
          <p>Millennium Games is not affiliated with or endorsed by these platform providers unless explicitly stated.</p>
          <p>Customers must comply with the terms and policies of the respective platform when using purchased products.</p>
        </div>
      ),
    },
    {
      id: 12,
      title: "12. Limitation of Liability",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>To the fullest extent permitted by law, Millennium Games shall not be liable for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Loss of data</li>
            <li>Lost profits</li>
            <li>Business interruption</li>
            <li>Game publisher account suspensions</li>
            <li>Platform outages</li>
            <li>Indirect or consequential damages arising from the use of our products or services</li>
          </ul>
          <p className="font-semibold">Our maximum liability for any claim shall not exceed the amount paid for the affected order.</p>
        </div>
      ),
    },
    {
      id: 13,
      title: "13. Fraud Prevention",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Orders may be delayed or cancelled if fraud is suspected.</p>
          <p>We reserve the right to request additional verification before processing certain transactions.</p>
        </div>
      ),
    },
    {
      id: 14,
      title: "14. Privacy",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Your use of our website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.</p>
        </div>
      ),
    },
    {
      id: 15,
      title: "15. Changes to These Terms",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Millennium Games reserves the right to update or modify these Terms of Service at any time.</p>
          <p>Updated versions become effective immediately upon publication on this website.</p>
          <p>Continued use of our services after changes are published constitutes acceptance of the revised Terms.</p>
        </div>
      ),
    },
    {
      id: 16,
      title: "16. Governing Law",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>These Terms shall be governed by and interpreted in accordance with the laws of <strong className="text-[#0f172a]">India</strong>.</p>
          <p>Any disputes arising from these Terms or your use of the website shall be subject to the exclusive jurisdiction of the competent courts in the location where Millennium Games operates.</p>
        </div>
      ),
    },
    {
      id: 17,
      title: "17. Contact Us",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>If you have any questions regarding these Terms of Service, please contact our support team through the contact information provided on the Millennium Games website.</p>
          <p className="font-semibold text-[#0f172a] bg-slate-200/40 border border-slate-300/30 p-3 rounded-xl">
            By using Millennium Games or placing an order, you acknowledge that you have read, understood, and agreed to these Terms of Service.
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#cbdce3]/85 z-10" />
        <div className="abstract-shape abstract-shape-mint w-[600px] h-[600px] -top-32 right-[10%] opacity-20" />
        <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] bottom-[10%] left-[5%] opacity-15" />
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
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Effective Date: July 21, 2026
            </p>
          </div>

          {/* Policy Card */}
          <div className="glass-card p-8 sm:p-12 border-white/20 shadow-2xl relative overflow-hidden space-y-8 text-[#0f172a] leading-relaxed">
            <p className="text-sm text-slate-600 font-medium">
              Welcome to <strong className="text-[#0f172a]">Millennium Games</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website, purchasing products, or creating an account, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our website or services.
            </p>

            <hr className="border-slate-300/40" />

            {termsSections.map((section) => (
              <div key={section.id} className="space-y-3">
                <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                  {section.title}
                </h2>
                {section.content}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
