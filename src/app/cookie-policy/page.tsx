"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CookiePolicyPage() {
  const sections = [
    {
      id: 1,
      title: "1. What Are Cookies?",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            Cookies are small text files that are stored on your computer, smartphone, or other device when you visit a website.
          </p>
          <p>
            Cookies help websites remember your preferences, improve performance, enhance security, and provide a better browsing experience.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "2. How We Use Cookies",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Millennium Games uses cookies to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Keep you signed in to your account.</li>
            <li>Remember your shopping cart and preferences.</li>
            <li>Process orders securely.</li>
            <li>Improve website performance.</li>
            <li>Analyze website traffic and visitor behavior.</li>
            <li>Detect and prevent fraud or unauthorized access.</li>
            <li>Personalize your browsing experience.</li>
            <li>Maintain the security and stability of our services.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. Types of Cookies We Use",
      content: (
        <div className="space-y-4 text-xs text-slate-600">
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#0f172a] text-xs">Essential Cookies</h3>
            <p>These cookies are required for the website to function properly. They enable features such as:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>User login</li>
              <li>Shopping cart functionality</li>
              <li>Secure checkout</li>
              <li>Payment processing</li>
              <li>Account authentication</li>
              <li>Fraud prevention</li>
            </ul>
            <p className="font-semibold text-red-600">Disabling these cookies may prevent certain parts of the website from functioning correctly.</p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#0f172a] text-xs">Performance & Analytics Cookies</h3>
            <p>These cookies help us understand how visitors interact with our website by collecting anonymous information such as:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Pages visited</li>
              <li>Time spent on the website</li>
              <li>Device type</li>
              <li>Browser type</li>
              <li>General geographic region</li>
              <li>Website performance</li>
            </ul>
            <p>This information helps us improve our services and user experience.</p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#0f172a] text-xs">Functional Cookies</h3>
            <p>These cookies remember your preferences, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Language selection</li>
              <li>Currency preference (if available)</li>
              <li>Login session</li>
              <li>User settings</li>
            </ul>
            <p>These cookies provide a more personalized experience.</p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#0f172a] text-xs">Security Cookies</h3>
            <p>Security cookies help protect our website and users by:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Detecting suspicious activity</li>
              <li>Preventing fraudulent transactions</li>
              <li>Protecting user accounts</li>
              <li>Supporting secure login sessions</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "4. Third-Party Cookies",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Some cookies may be placed by trusted third-party service providers that support our website, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Payment gateway providers</li>
            <li>Analytics services</li>
            <li>Cloud hosting providers</li>
            <li>Customer support tools</li>
            <li>Security and fraud prevention services</li>
          </ul>
          <p>These third parties manage their own cookies in accordance with their respective privacy policies.</p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Managing Cookies",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Most web browsers allow you to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>View stored cookies.</li>
            <li>Delete existing cookies.</li>
            <li>Block future cookies.</li>
            <li>Receive notifications before cookies are stored.</li>
          </ul>
          <p className="font-semibold">Please note that disabling cookies may affect the functionality of certain features, including account login, shopping cart, and checkout.</p>
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Cookie Retention",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Some cookies are deleted automatically when you close your browser (session cookies), while others remain on your device until they expire or are manually deleted (persistent cookies).</p>
          <p>The retention period depends on the type and purpose of each cookie.</p>
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Changes to This Cookie Policy",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>We may update this Cookie Policy from time to time to reflect changes in our technology, legal requirements, or business practices.</p>
          <p>Any updates will be posted on this page with a revised Effective Date.</p>
          <p>Your continued use of Millennium Games after changes become effective constitutes your acceptance of the updated Cookie Policy.</p>
        </div>
      ),
    },
    {
      id: 8,
      title: "8. Contact Us",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>If you have any questions regarding this Cookie Policy or how we use cookies, please contact us using the contact information provided on the Millennium Games website.</p>
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
        <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] -top-32 right-[15%] opacity-20" />
        <div className="abstract-shape abstract-shape-mint w-[500px] h-[500px] bottom-[10%] left-[10%] opacity-15" />
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
              Cookie <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Effective Date: July 21, 2026
            </p>
          </div>

          {/* Card */}
          <div className="glass-card p-8 sm:p-12 border-white/20 shadow-2xl relative overflow-hidden space-y-8 text-[#0f172a] leading-relaxed">
            <p className="text-sm text-slate-600 font-medium">
              This Cookie Policy explains how <strong className="text-[#0f172a]">Millennium Games</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) uses cookies and similar technologies when you visit or use <strong className="text-[#0f172a]">millenniumgames.store</strong>.
            </p>
            <p className="text-xs text-slate-600 font-semibold">
              By continuing to browse or use our website, you agree to our use of cookies as described in this policy.
            </p>

            <hr className="border-slate-300/40" />

            {sections.map((section) => (
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
