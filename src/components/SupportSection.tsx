"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export default function SupportSection() {
  const contactDetails = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      title: "Email Support",
      value: "millenniumpcgames@gmail.com",
      link: "mailto:millenniumpcgames@gmail.com",
      actionText: "Send an Email",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: "Call/WhatsApp Support",
      value: "+91 8089406346",
      link: "tel:+918089406346",
      actionText: "Get in Touch",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      title: "Our Headquarters",
      value: "Millennium Games\nMeencut PO Pallivasal\nMunnar, Kerala\nPIN - 685565",
      link: "https://maps.google.com/?q=Munnar,+Kerala",
      actionText: "Open in Maps",
    },
  ];

  return (
    <section id="support" className="relative py-24 overflow-hidden border-t border-slate-300/40">
      {/* Background ambient lighting */}
      <div className="abstract-shape abstract-shape-mint w-[600px] h-[600px] -bottom-64 left-10 opacity-10" />
      <div className="abstract-shape abstract-shape-emerald w-[400px] h-[400px] top-10 right-10 opacity-10" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3 py-1 rounded-full text-xs font-bold text-[#0f172a] backdrop-blur-md uppercase tracking-wider"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.75)",
            }}
          >
            Support Center
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            We are Here to <span className="gradient-text">Help You.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm max-w-lg mx-auto"
          >
            Have questions about account logins, setup guides, or Steam Guard codes? Contact our customer support team directly.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactDetails.map((contact, i) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col justify-between items-center text-center group"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#0f172a] mb-2 group-hover:scale-105 transition-transform backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75)' }}>
                  {contact.icon}
                </div>
                <h3 className="text-base font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                  {contact.title}
                </h3>
                <p className="text-sm text-slate-600 font-semibold whitespace-pre-line leading-relaxed">
                  {contact.value}
                </p>
              </div>

              <div className="pt-6 w-full">
                <Magnetic>
                  <a
                    href={contact.link}
                    target={contact.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="btn-outline w-full text-center py-2.5 text-xs font-bold block"
                  >
                    {contact.actionText}
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
