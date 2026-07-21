"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerSections = [
  {
    title: "Store",
    links: [
      { label: "All Games", href: "/#catalog" },
      { label: "Steam Games", href: "/#catalog" },
      { label: "Epic Games", href: "/#catalog" },
      { label: "Upcoming Releases", href: "/#upcoming" },
      { label: "Special Deals", href: "/#deals" },
      { label: "Gift Cards", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/#support" },
      { label: "FAQ", href: "#" },
      { label: "How to Setup Accounts", href: "#" },
      { label: "Order Tracking", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Blog", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
];

const socialIcons = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-300/40" style={{ background: "transparent" }}>
      <div className="starburst starburst-lg -top-16 -right-16" style={{ animation: "rotateStar 60s linear infinite" }} />
      <div className="starburst starburst-sm bottom-[20%] left-[3%]" style={{ animation: "rotateStar 40s linear infinite reverse" }} />
      <div className="container-custom relative z-10">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link href="/#home" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full overflow-hidden relative flex items-center justify-center backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75)' }}>
                <img
                  src="/images/logo/Millennium%20Games.png"
                  alt="M"
                  className="absolute w-[180%] h-[180%] max-w-none top-[-2%] left-1/2 -translate-x-1/2 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-[#0f172a] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Millennium <span className="text-mint">Games</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Your trusted premium digital game account marketplace. Official accounts, instant delivery, and offline/online modes.
            </p>
            {/* Contact Info */}
            <div className="space-y-2.5 pt-2 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:millenniumpcgames@gmail.com" className="hover:text-mint transition-colors">
                  millenniumpcgames@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+918089406346" className="hover:text-mint transition-colors">
                  +91 8089406346
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span className="whitespace-pre-line leading-relaxed">
                  Millennium Games, Meencut PO Pallivasal, Munnar, Kerala - 685565
                </span>
              </div>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-mint transition-all duration-300 backdrop-blur-sm"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75)' }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-[#0f172a] transition-colors duration-300 font-semibold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-300/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Millennium Games. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">Payment Methods:</span>
            <div className="flex gap-2">
              {["Visa", "MC", "PayPal", "Crypto"].map((method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-slate-600 backdrop-blur-sm border border-slate-300/40"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75)' }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.a
        href="#home"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-[#0f172a] z-40 transition-all backdrop-blur-md"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 24px rgba(90,110,125,0.15), inset 0 1px 0 rgba(255,255,255,0.75)' }}
        id="back-to-top"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </motion.a>
    </footer>
  );
}
