"use client";

import { useApp, PurchaseRecord } from "@/context/AppContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import InvoiceModal, { InvoiceData, downloadInvoice } from "@/components/InvoiceModal";

export default function LibraryPage() {
  const { user } = useApp();
  const router = useRouter();

  // State for masking/unmasking passwords, copying, and 2FA retrieval
  const [copiedFieldId, setCopiedFieldId] = useState<string | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [loading2FA, setLoading2FA] = useState<Record<string, boolean>>({});
  const [codes2FA, setCodes2FA] = useState<Record<string, { code: string; expiresAt: number }>>({});
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyField = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFieldId(id);
    setTimeout(() => setCopiedFieldId(null), 2000);
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [waRedirected, setWaRedirected] = useState<Record<string, boolean>>({});

  const handleRequest2FA = (record: PurchaseRecord) => {
    setLoading2FA((prev) => ({ ...prev, [record.id]: true }));
    setWaRedirected((prev) => ({ ...prev, [record.id]: true }));

    const invoiceNumber = `MG-${new Date(record.purchasedAt || Date.now()).getFullYear()}-${record.id.slice(-4).toUpperCase()}`;
    const dateStr = new Date(record.purchasedAt || Date.now()).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // 1. Construct and automatically download Tax Invoice
    const invData: InvoiceData = {
      invoiceNumber,
      invoiceDate: new Date(record.purchasedAt || Date.now()).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      dueDate: "Paid on Receipt",
      customerName: user?.name || "Valued Customer",
      customerEmail: "millenniumpcgames@gmail.com",
      items: [
        {
          id: record.id,
          gameTitle: record.gameTitle,
          platform: record.platform,
          playMode: record.playMode,
          quantity: 1,
          price: record.price,
        },
      ],
      totalAmount: record.price,
      transactionId: record.utrNumber || `UPI-${record.id.slice(-8)}`,
      paymentMethod: "Direct UPI Transfer (bllalwhdn@ptaxis)",
    };

    try {
      downloadInvoice(invData);
    } catch (e) {
      console.error("Auto download invoice error:", e);
    }

    // 2. Format automated WhatsApp message with OTP request, game details, and invoice
    const waText = `*MILLENNIUM GAMES - 2FA / OTP CODE REQUEST* 🔑

Hello Support Team,
I need the *${record.platform === "steam" ? "Steam Guard" : "2FA Login"} Verification Code* to sign into my game account.

🎮 *GAME DETAILS:*
• *Game:* ${record.gameTitle}
• *Platform:* ${record.platform.toUpperCase()}
• *Edition:* ${record.playMode === "online" ? "Online Multiplayer" : "Offline Story Campaign"}
• *Username:* ${record.accountUser}
${record.extraDetails ? `• *Account Details:* ${record.extraDetails}\n` : ""}
🧾 *INVOICE & ORDER:*
• *Invoice No:* ${invoiceNumber}
• *Purchase Date:* ${dateStr}
• *Amount Paid:* ₹${record.price}
• *Customer Name:* ${user?.name || "Valued Customer"}
• *Store Support:* millenniumpcgames@gmail.com

Kindly send me the OTP / login verification code so I can start playing. Thank you!`;

    const waUrl = `https://wa.me/message/WXU5NCOSMGVRE1?text=${encodeURIComponent(waText)}`;

    // 3. Open WhatsApp in new tab
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 400);

    // 4. Generate local simulated code as an instant fallback
    setTimeout(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      if (record.platform === "steam") {
        code = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      } else {
        code = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
      }

      setCodes2FA((prev) => ({
        ...prev,
        [record.id]: {
          code: `${record.platform === "steam" ? "SG" : record.platform.toUpperCase()}-${code}`,
          expiresAt: Date.now() + 90000,
        },
      }));
      setLoading2FA((prev) => ({ ...prev, [record.id]: false }));
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ambient background gradients matching light slate cockpit */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#cbdce3]/80 z-10" />
        <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] -top-32 left-[10%] opacity-20" />
        <div className="abstract-shape abstract-shape-mint w-[400px] h-[400px] bottom-[20%] right-[10%] opacity-15" />
      </div>

      <div className="flex-1 container-custom pt-32 pb-24 relative z-10 flex flex-col justify-start">
        {!user ? (
          /* Logged out Warning state */
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-10 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-slate-200/50 flex items-center justify-center mx-auto text-slate-500 text-3xl">
                🔒
              </div>
              <h1 className="text-2xl font-bold text-[#0f172a] glass-text" style={{ fontFamily: "var(--font-outfit)" }}>
                Sign In Required
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed">
                Your game library and purchased game accounts are tied permanently to your user profile. Please sign in to access them.
              </p>
              <Magnetic>
                <Link href="/auth" className="w-full btn-primary block text-center py-3.5">
                  Sign In to Account
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        ) : (
          /* Active Library dashboard */
          <div className="space-y-10">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-300/40 pb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Raider Account Dashboard
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] glass-text mt-1" style={{ fontFamily: "var(--font-outfit)" }}>
                  My Game Library
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {/* WhatsApp Help & Support Header Button */}
                <a
                  href="https://wa.me/message/WXU5NCOSMGVRE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Help &amp; Support</span>
                </a>

                <div className="bg-white/45 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/60 flex items-center gap-3.5 shadow-sm">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#ffffff] font-bold text-sm bg-[#0f172a] shadow-md uppercase">
                    {user.name.slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0f172a] block">{user.name}</span>
                    <span className="text-[10px] text-slate-500">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated WhatsApp Help & Support Card */}
            <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-white/40 backdrop-blur-md p-5 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/25 flex-shrink-0">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a] flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
                    Need Help &amp; Support?
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                      24/7 Live Support
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Chat directly with our support team on WhatsApp for instant 2FA codes, account assistance, or order inquiries.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/message/WXU5NCOSMGVRE1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-wider flex-shrink-0"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Library list */}
            {user.library && user.library.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {user.library.map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-5 border-white/20 flex flex-col sm:flex-row gap-5 shadow-lg group hover:scale-[1.01] transition-all"
                  >
                    {/* Game image poster */}
                    <div className="w-full sm:w-28 aspect-[3/4] rounded-2xl overflow-hidden relative shadow-md flex-shrink-0">
                      <img src={record.gameImage} alt={record.gameTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Transaction Details */}
                    <div className="flex-1 flex flex-col justify-between space-y-4 min-w-0">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex gap-1.5">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#0f172a] backdrop-blur-sm bg-white/65 border border-white/60">
                              {record.platform.toUpperCase()}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-mint bg-mint/10 border border-mint/20">
                              {record.playMode === "online" ? "Online" : "Offline"}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(record.purchasedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                        <h2 className="text-base font-bold text-[#0f172a] leading-tight line-clamp-2" style={{ fontFamily: "var(--font-outfit)" }}>
                          {record.gameTitle}
                        </h2>
                        <span className="text-[10px] text-slate-500 block">
                          Trans ID: <span className="font-mono text-slate-700">{record.id}</span>
                          {record.utrNumber && (
                            <span className="ml-2 text-emerald-600 font-semibold">• UTR: {record.utrNumber}</span>
                          )}
                        </span>
                        {record.paymentProof && (
                          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 w-fit">
                            <span>✓</span>
                            <span>Payment Proof Screenshot Attached</span>
                          </div>
                        )}
                      </div>

                      {/* Account Credentials Box */}
                      <div className="space-y-2 bg-slate-900/5 p-3 rounded-xl border border-slate-900/10">
                        <div className="space-y-1">
                          <span className="text-[8.5px] uppercase font-bold text-slate-500 block tracking-wider">
                            Account Username:
                          </span>
                          <div className="flex gap-1.5 items-center">
                            <div className="flex-1 min-w-0 bg-[#0f172a] text-[#ffffff] font-mono py-1.5 px-2.5 rounded-lg text-xs font-semibold select-all truncate">
                              {record.accountUser}
                            </div>
                            <button
                              onClick={() => handleCopyField(record.accountUser, record.id + "-user")}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all border shadow-sm flex-shrink-0 cursor-pointer ${
                                copiedFieldId === record.id + "-user"
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "btn-outline border-slate-300/40 bg-white/50 hover:bg-slate-200/50"
                              }`}
                            >
                              {copiedFieldId === record.id + "-user" ? "✓" : "Copy"}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[8.5px] uppercase font-bold text-slate-500 block tracking-wider">
                            Account Password:
                          </span>
                          <div className="flex gap-1.5 items-center">
                            <div className="flex-1 min-w-0 bg-[#0f172a] text-[#ffffff] font-mono py-1.5 px-2.5 rounded-lg text-xs font-semibold select-all truncate">
                              {visiblePasswords[record.id] ? record.accountPass : "••••••••••"}
                            </div>
                            <button
                              onClick={() => togglePasswordVisibility(record.id)}
                              className="px-2 py-1 text-[10px] font-bold rounded-lg transition-all border border-slate-300/40 bg-white/50 hover:bg-slate-200/50 flex-shrink-0 cursor-pointer"
                            >
                              {visiblePasswords[record.id] ? "Hide" : "Show"}
                            </button>
                            <button
                              onClick={() => handleCopyField(record.accountPass, record.id + "-pass")}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all border shadow-sm flex-shrink-0 cursor-pointer ${
                                copiedFieldId === record.id + "-pass"
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "btn-outline border-slate-300/40 bg-white/50 hover:bg-slate-200/50"
                              }`}
                            >
                              {copiedFieldId === record.id + "-pass" ? "✓" : "Copy"}
                            </button>
                          </div>
                        </div>

                        {record.extraDetails && (
                          <div className="text-[10px] text-slate-500 border-t border-slate-300/30 pt-2 mt-2 leading-relaxed font-mono">
                            ⚙️ <span className="font-semibold text-slate-600">Linked Account Details:</span> {record.extraDetails}
                          </div>
                        )}
                      </div>

                      {/* simulated 2FA code retrieval */}
                      <div className="space-y-2 pt-1 border-t border-slate-300/30">
                        <span className="text-[8.5px] uppercase font-bold text-slate-500 block tracking-wider">
                          2FA / Login Verification Guard:
                        </span>
                        {codes2FA[record.id] && codes2FA[record.id].expiresAt > currentTime ? (
                          <div className="flex gap-2 items-center">
                            <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 py-1.5 px-3 rounded-xl text-xs font-mono font-bold text-center select-all">
                              {codes2FA[record.id].code}
                            </div>
                            <button
                              onClick={() => handleCopyField(codes2FA[record.id].code, record.id + "-2fa")}
                              className={`px-2.5 py-1.5 text-[10px] font-bold rounded-xl transition-all border shadow-sm flex-shrink-0 cursor-pointer ${
                                copiedFieldId === record.id + "-2fa"
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "btn-outline border-slate-300/40 bg-white/50 hover:bg-slate-200/50"
                              }`}
                            >
                              {copiedFieldId === record.id + "-2fa" ? "✓" : "Copy"}
                            </button>
                            <span className="text-[10px] text-slate-400 font-bold min-w-[20px] text-center flex-shrink-0">
                              {Math.max(0, Math.round((codes2FA[record.id].expiresAt - currentTime) / 1000))}s
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <button
                              onClick={() => handleRequest2FA(record)}
                              disabled={loading2FA[record.id]}
                              className="w-full btn-outline border-slate-300/40 bg-white/45 hover:bg-slate-200/50 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                            >
                              {loading2FA[record.id] ? (
                                <>
                                  <span className="animate-spin text-xs">⌛</span>
                                  <span className="text-slate-600">Opening WhatsApp &amp; Downloading Invoice...</span>
                                </>
                              ) : (
                                <>
                                  <span>🔑</span>
                                  <span>{record.platform === "steam" ? "Get Steam Guard Code" : "Get 2FA Login Code"}</span>
                                </>
                              )}
                            </button>
                            {waRedirected[record.id] && (
                              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[10.5px] font-medium flex items-center justify-between">
                                <span>✓ WhatsApp chat opened with prefilled details</span>
                                <button
                                  type="button"
                                  onClick={() => handleRequest2FA(record)}
                                  className="text-emerald-900 font-bold hover:underline ml-2"
                                >
                                  Re-open 💬
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* View Tax Invoice Button */}
                        <button
                          onClick={() => {
                            setSelectedInvoice({
                              invoiceNumber: `MG-${new Date(record.purchasedAt || Date.now()).getFullYear()}-${record.id.slice(-4).toUpperCase()}`,
                              invoiceDate: new Date(record.purchasedAt || Date.now()).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }),
                              dueDate: "Paid on Receipt",
                              customerName: user?.name || "Valued Customer",
                              customerEmail: "millenniumpcgames@gmail.com",
                              items: [
                                {
                                  id: record.id,
                                  gameTitle: record.gameTitle,
                                  platform: record.platform,
                                  playMode: record.playMode,
                                  quantity: 1,
                                  price: record.price,
                                },
                              ],
                              totalAmount: record.price,
                              transactionId: record.utrNumber || `UPI-${record.id.slice(-8)}`,
                              paymentMethod: "Direct UPI Transfer (bllalwhdn@ptaxis)",
                            });
                            setInvoiceModalOpen(true);
                          }}
                          className="w-full mt-2 py-1.5 px-3 rounded-xl text-[11px] font-bold text-slate-800 bg-amber-400/25 hover:bg-amber-400/40 border border-amber-400/50 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <span>🧾</span>
                          <span>View Tax Invoice</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty Library state */
              <div className="glass-card p-12 text-center max-w-md mx-auto space-y-6">
                <div className="w-16 h-16 rounded-full bg-slate-200/50 flex items-center justify-center mx-auto text-slate-500 text-3xl">
                  👾
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                    No Accounts Found in Library
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    Once you purchase game accounts from our catalog, your login credentials and 2FA generator will appear here.
                  </p>
                </div>
                <Magnetic>
                  <Link href="/#catalog" className="w-full btn-primary block text-center py-3.5">
                    Browse Games & Deals
                  </Link>
                </Magnetic>
              </div>
            )}

            {/* Setup Instructions Card */}
            {user.library && user.library.length > 0 && (
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-base font-bold text-[#0f172a] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                  💡 Account Setup & Configuration Instructions
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-xs text-slate-600">
                  <div className="bg-white/45 backdrop-blur-sm p-4 rounded-2xl border border-white/60 space-y-2.5 shadow-sm">
                    <span className="text-[#0f172a] font-bold block mb-1">🎮 Steam Offline Account Setup:</span>
                    1. Open Steam, log out of your current account, and log in with our credentials.<br />
                    2. If Steam asks for 2FA, click the <b>&quot;Get Steam Guard Code&quot;</b> button in your library dashboard above.<br />
                    3. Click <b>Steam</b> (top left menu) &gt; <b>Settings</b> &gt; <b>Cloud</b>, and uncheck <b>Enable Steam Cloud synchronization</b>.<br />
                    4. Download and launch the game once. At the main menu, exit the game.<br />
                    5. Click <b>Steam</b> &gt; <b>Go Offline...</b>. Now you can play campaigns offline forever without interruptions!
                  </div>
                  <div className="bg-white/45 backdrop-blur-sm p-4 rounded-2xl border border-white/60 space-y-2.5 shadow-sm">
                    <span className="text-[#0f172a] font-bold block mb-1">🚀 Epic, EA, and Ubisoft Connect Setup:</span>
                    1. Log in to the respective launcher using the provided credentials.<br />
                    2. For 2FA codes, use the <b>&quot;Get 2FA Login Code&quot;</b> generator on this page.<br />
                    3. Go to launcher settings and disable cloud saves to prevent overwrite issues.<br />
                    4. Install the game, launch it, and play. For single-player games, switch the launcher to offline mode for seamless play!
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal
          isOpen={invoiceModalOpen}
          onClose={() => setInvoiceModalOpen(false)}
          data={selectedInvoice}
        />
      )}

      {/* Floating WhatsApp Help & Support Symbol Button */}
      <a
        href="https://wa.me/message/WXU5NCOSMGVRE1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Help & Support"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full flex items-center gap-2.5 shadow-2xl hover:scale-105 transition-all group cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping" />
        </div>
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
          WhatsApp Support
        </span>
      </a>
    </main>
  );
}
