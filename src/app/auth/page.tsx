"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";

export default function AuthPage() {
  const { user, loginUser, registerUser } = useApp();
  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    // Minor delay for high premium UX feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (mode === "signin") {
      const res = loginUser(email, password);
      if (res.success) {
        router.push("/");
      } else {
        setErrorMsg(res.error || "Failed to sign in.");
        setLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        setLoading(false);
        return;
      }
      const res = registerUser(name, email, password);
      if (res.success) {
        router.push("/");
      } else {
        setErrorMsg(res.error || "Failed to create account.");
        setLoading(false);
      }
    }
  };

  const toggleMode = (target: "signin" | "signup") => {
    if (loading) return;
    setMode(target);
    setErrorMsg("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ambient backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#cbdce3]/85 z-10" />
        <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] -top-32 left-[10%] opacity-20" />
        <div className="abstract-shape abstract-shape-mint w-[500px] h-[500px] bottom-[10%] right-[5%] opacity-15" />
      </div>

      <div className="flex-1 flex items-center justify-center container-custom pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Card container */}
          <div className="glass-card p-8 border-white/20 shadow-2xl relative overflow-hidden space-y-6">
            
            {/* Header/Toggle slider */}
            <div className="space-y-4 text-center">
              <Link href="/" className="inline-flex items-center gap-2 group justify-center">
                <div className="w-8 h-8 rounded-full overflow-hidden relative flex items-center justify-center backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)' }}>
                  <img
                    src="/images/logo/Millennium%20Games.png"
                    alt="M"
                    className="absolute w-[180%] h-[180%] max-w-none top-[-2%] left-1/2 -translate-x-1/2 object-contain"
                  />
                </div>
                <span className="text-base font-bold text-[#0f172a] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                  Millennium <span className="text-mint">Games</span>
                </span>
              </Link>
              <h1 className="text-2xl font-black text-[#0f172a] glass-text uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                {mode === "signin" ? "Welcome Back" : "Join the Raider Squad"}
              </h1>
              <p className="text-slate-500 text-xs">
                {mode === "signin"
                  ? "Access your dashboard to claim your game activation keys."
                  : "Create an account to securely save and access your purchases."}
              </p>
            </div>

            {/* Premium toggle bar */}
            <div className="flex rounded-full bg-slate-300/40 p-1 border border-slate-300/50 relative">
              <button
                type="button"
                onClick={() => toggleMode("signin")}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-full relative z-10 transition-colors duration-300 ${
                  mode === "signin" ? "text-[#0f172a]" : "text-slate-500 hover:text-[#0f172a]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => toggleMode("signup")}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-full relative z-10 transition-colors duration-300 ${
                  mode === "signup" ? "text-[#0f172a]" : "text-slate-500 hover:text-[#0f172a]"
                }`}
              >
                Sign Up
              </button>
              
              {/* Dynamic slider background */}
              <motion.div
                layoutId="auth-slider"
                className="absolute inset-y-1 rounded-full shadow-md z-0"
                style={{
                  left: mode === "signin" ? "4px" : "calc(50% + 2px)",
                  right: mode === "signin" ? "calc(50% + 2px)" : "4px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 100%)",
                  border: "1px solid rgba(255,255,255,0.9)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === "signin" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === "signin" ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {mode === "signup" && (
                    <div className="space-y-1.5">
                      <label htmlFor="name-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Full Name
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all backdrop-blur-md bg-white/45 border-white/60 shadow-inner"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                      Email Address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="raider@millennium.com"
                      className="w-full border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all backdrop-blur-md bg-white/45 border-white/60 shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="password-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                      Password
                    </label>
                    <input
                      id="password-input"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all backdrop-blur-md bg-white/45 border-white/60 shadow-inner"
                    />
                  </div>

                  {mode === "signup" && (
                    <div className="space-y-1.5">
                      <label htmlFor="confirm-password-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Confirm Password
                      </label>
                      <input
                        id="confirm-password-input"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all backdrop-blur-md bg-white/45 border-white/60 shadow-inner"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Error messages */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              {/* Submit button */}
              <div className="pt-2">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3.5 font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#0f172a]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Loading...
                      </>
                    ) : mode === "signin" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>

            {/* Quick Demo Credentials Help */}
            {mode === "signin" && (
              <div className="bg-slate-200/40 p-3.5 rounded-xl border border-slate-300/40 text-[10px] text-slate-600 leading-relaxed">
                <span className="font-bold text-[#0f172a] block mb-0.5">💡 Account Persistence:</span>
                Accounts created on Sign Up are stored locally. If you already created an account, log back in. If not, toggle to <b>Sign Up</b> to create one instantly!
              </div>
            )}

          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
