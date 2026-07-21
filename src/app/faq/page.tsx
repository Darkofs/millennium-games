"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FAQPage() {
  const faqCategories = [
    {
      category: "General",
      items: [
        {
          q: "What is Millennium Games?",
          a: "Millennium Games is an online digital gaming store offering PC game keys, gift cards, downloadable content (DLC), software licenses, and other digital gaming products from trusted sources.",
        },
        {
          q: "Are your products genuine?",
          a: "Yes. We strive to provide genuine digital products sourced from trusted distributors and suppliers.",
        },
        {
          q: "Do I receive a physical product?",
          a: "No. All products sold on Millennium Games are delivered digitally. Nothing is shipped physically.",
        },
      ],
    },
    {
      category: "Orders & Delivery",
      items: [
        {
          q: "How will I receive my order?",
          a: "After your payment is successfully verified, your digital product will be delivered to the email address associated with your order or made available through your account on our website, depending on the product.",
        },
        {
          q: "How long does delivery take?",
          a: "Many orders are delivered within minutes. Some orders may require additional verification and can take longer during peak periods or for fraud prevention checks.",
        },
        {
          q: "My order is delayed. What should I do?",
          a: "Please check your email (including your Spam or Junk folder) and your account order history. If your order has not arrived within the estimated delivery time, contact our support team with your Order ID.",
        },
      ],
    },
    {
      category: "Payments",
      items: [
        {
          q: "Which payment methods do you accept?",
          a: "We accept the payment methods displayed during checkout, which may include UPI, debit cards, credit cards, net banking, wallets, and other supported payment options.",
        },
        {
          q: "My payment was successful, but I haven't received my order.",
          a: "Occasionally, payment verification may take a little longer. If your order has not been delivered within the expected timeframe, please contact our support team with your Order ID and payment details.",
        },
      ],
    },
    {
      category: "Game Keys & Activation",
      items: [
        {
          q: "Where do I activate my game key?",
          a: "Each product page indicates the platform for activation, such as Steam, Epic Games, EA App, Ubisoft Connect, Rockstar Games Launcher, or another supported platform.",
        },
        {
          q: "Can I activate a key in any country?",
          a: "Not always. Some products are region-specific. Please check the product description carefully before purchasing to ensure the key is valid for your country.",
        },
        {
          q: "I received an activation error.",
          a: "If your key cannot be activated, contact our support team within 24 hours and provide:\n- Your Order ID\n- A screenshot of the activation error\n- Any additional information requested for verification\n\nWe will investigate the issue and, if confirmed, provide a replacement or refund in accordance with our Refund & Replacement Policy.",
        },
      ],
    },
    {
      category: "Refunds",
      items: [
        {
          q: "Can I get a refund?",
          a: "Refunds are available only in the situations described in our Refund & Replacement Policy, such as undelivered orders or verified invalid activation keys that cannot be replaced.",
        },
        {
          q: "Can I return a digital game after receiving it?",
          a: "No. Due to the nature of digital products, delivered or revealed activation keys cannot be returned.",
        },
        {
          q: "What if I bought the wrong game or wrong edition?",
          a: "Please review your order carefully before completing your purchase. We generally cannot provide refunds for purchases made in error, including selecting the wrong game, edition, platform, or region.",
        },
      ],
    },
    {
      category: "Account & Security",
      items: [
        {
          q: "Is my payment information secure?",
          a: "Yes. Payments are processed through trusted payment providers. Millennium Games does not store your complete card details, CVV, or UPI PIN.",
        },
        {
          q: "Do I need an account to purchase?",
          a: "Some purchases may allow guest checkout, while others may require you to create an account to manage your orders and access your digital products. (Note: Account creation ensures your generated keys are permanently stored in your Library page).",
        },
      ],
    },
    {
      category: "Support",
      items: [
        {
          q: "How do I contact customer support?",
          a: "You can reach our support team using the contact details available on the Contact Us page (or our email support: millenniumpcgames@gmail.com). Please include your Order ID and a clear description of your issue for faster assistance.",
        },
        {
          q: "What are your support hours?",
          a: "Our support team aims to respond to all inquiries within 24 hours. Response times may vary during weekends, holidays, or periods of high demand.",
        },
      ],
    },
    {
      category: "Other Questions",
      items: [
        {
          q: "Do you offer discounts?",
          a: "Yes. Millennium Games regularly features promotions, seasonal sales, and special offers. Visit our website frequently or follow our social media channels to stay updated.",
        },
        {
          q: "Can I pre-order upcoming games?",
          a: "If pre-orders are available, they will be clearly marked on the product page along with the expected release date and delivery information.",
        },
        {
          q: "Can I cancel my order?",
          a: "Orders that have not yet been processed or delivered may be eligible for cancellation. Once a digital product has been delivered, the order generally cannot be cancelled.",
        },
        {
          q: "How can I stay informed about new releases?",
          a: "Subscribe to our newsletter or follow Millennium Games on our official social media channels to receive updates on new game releases, exclusive deals, and special promotions.",
        },
      ],
    },
  ];

  // Store expanded state for FAQ items. Key format: "categoryIndex-itemIndex"
  const [expandedId, setExpandedId] = useState<string | null>("0-0");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#cbdce3]/85 z-10" />
        <div className="abstract-shape abstract-shape-mint w-[600px] h-[600px] -top-32 left-[5%] opacity-20" />
        <div className="abstract-shape abstract-shape-emerald w-[500px] h-[500px] bottom-[10%] right-[10%] opacity-15" />
      </div>

      <div className="flex-1 container-custom pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto space-y-10"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase" style={{ fontFamily: "var(--font-outfit)" }}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Quick help for common questions about orders, payments, and activation
            </p>
          </div>

          {/* Accordion container */}
          <div className="space-y-8">
            {faqCategories.map((cat, catIdx) => (
              <div key={cat.category} className="space-y-3">
                <h2 className="text-base font-bold text-[#0f172a] uppercase tracking-wider pl-1" style={{ fontFamily: "var(--font-outfit)" }}>
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item, itemIdx) => {
                    const id = `${catIdx}-${itemIdx}`;
                    const isExpanded = expandedId === id;
                    return (
                      <div
                        key={item.q}
                        className="glass-card overflow-hidden border-white/20 hover:border-mint/20 transition-all duration-300 shadow-sm"
                      >
                        <button
                          onClick={() => toggleExpand(id)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0f172a] transition-colors"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          <span>{item.q}</span>
                          <span
                            className="w-6 h-6 rounded-lg bg-slate-200/50 hover:bg-slate-200 flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                          >
                            ▼
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <div className="px-5 pb-5 pt-1 border-t border-slate-300/20 text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
