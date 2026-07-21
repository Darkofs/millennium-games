"use client";

import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";

export default function LibraryPage() {
  const { user } = useApp();
  const router = useRouter();

  // State for masking/unmasking passwords, copying, and 2FA retrieval
  const [copiedFieldId, setCopiedFieldId] = useState<string | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [loading2FA, setLoading2FA] = useState<Record<string, boolean>>({});
  const [codes2FA, setCodes2FA] = useState<Record<string, { code: string; expiresAt: number }>>({});
  const [currentTime, setCurrentTime] = useState(Date.now());

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

  const handleRequest2FA = (recordId: string, platform: string) => {
    setLoading2FA(prev => ({ ...prev, [recordId]: true }));
    
    setTimeout(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      if (platform === "steam") {
        code = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      } else {
        code = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
      }
      
      setCodes2FA(prev => ({
        ...prev,
        [recordId]: {
          code: `${platform === "steam" ? "SG" : platform.toUpperCase()}-${code}`,
          expiresAt: Date.now() + 60000
        }
      }));
      setLoading2FA(prev => ({ ...prev, [recordId]: false }));
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
              <div className="bg-white/45 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/60 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#ffffff] font-bold text-sm bg-[#0f172a] shadow-md uppercase">
                  {user.name.slice(0, 2)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0f172a] block">{user.name}</span>
                  <span className="text-[10px] text-slate-500">{user.email}</span>
                </div>
              </div>
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
                        </span>
                      </div>

                      {/* Account Credentials Box */}
                      <div className="space-y-2 bg-slate-900/5 p-3 rounded-xl border border-slate-900/10">
                        <div className="space-y-1">
                          <span className="text-[8.5px] uppercase font-bold text-slate-500 block tracking-wider">
                            Account Username:
                          </span>
                          <div className="flex gap-1.5 items-center">
                            <div className="flex-1 bg-[#0f172a] text-[#ffffff] font-mono py-1.5 px-2.5 rounded-lg text-xs font-semibold select-all truncate">
                              {record.accountUser}
                            </div>
                            <button
                              onClick={() => handleCopyField(record.accountUser, record.id + "-user")}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all border shadow-sm ${
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
                            <div className="flex-1 bg-[#0f172a] text-[#ffffff] font-mono py-1.5 px-2.5 rounded-lg text-xs font-semibold select-all truncate">
                              {visiblePasswords[record.id] ? record.accountPass : "••••••••••"}
                            </div>
                            <button
                              onClick={() => togglePasswordVisibility(record.id)}
                              className="px-2 py-1 text-[10px] font-bold rounded-lg transition-all border border-slate-300/40 bg-white/50 hover:bg-slate-200/50"
                            >
                              {visiblePasswords[record.id] ? "Hide" : "Show"}
                            </button>
                            <button
                              onClick={() => handleCopyField(record.accountPass, record.id + "-pass")}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all border shadow-sm ${
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
                              className={`px-2.5 py-1.5 text-[10px] font-bold rounded-xl transition-all border shadow-sm ${
                                copiedFieldId === record.id + "-2fa"
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "btn-outline border-slate-300/40 bg-white/50 hover:bg-slate-200/50"
                              }`}
                            >
                              {copiedFieldId === record.id + "-2fa" ? "✓" : "Copy"}
                            </button>
                            <span className="text-[10px] text-slate-400 font-bold min-w-[20px] text-center">
                              {Math.max(0, Math.round((codes2FA[record.id].expiresAt - currentTime) / 1000))}s
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRequest2FA(record.id, record.platform)}
                            disabled={loading2FA[record.id]}
                            className="w-full btn-outline border-slate-300/40 bg-white/45 hover:bg-slate-200/50 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {loading2FA[record.id] ? (
                              <>
                                <span className="animate-spin text-xs">⌛</span>
                                <span className="text-slate-500">Requesting verification code...</span>
                              </>
                            ) : (
                              <>
                                <span>🔑</span>
                                <span>{record.platform === "steam" ? "Get Steam Guard Code" : "Get 2FA Login Code"}</span>
                              </>
                            )}
                          </button>
                        )}
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
    </main>
  );
}
