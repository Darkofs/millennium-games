"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import CartDrawer from "@/components/CartDrawer";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Catalog", href: "/#catalog" },
  { label: "Steam Games", href: "/#catalog" },
  { label: "Epic Games", href: "/#catalog" },
  { label: "Upcoming", href: "/#upcoming" },
  { label: "Deals", href: "/#deals" },
  { label: "About", href: "/#about" },
  { label: "Support", href: "/#support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const { user, logoutUser, cart, setCartOpen } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-9 h-9 rounded-full overflow-hidden relative flex items-center justify-center backdrop-blur-md" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75)' }}>
              <img
                src="/images/logo/Millennium%20Games.png"
                alt="M"
                className="absolute w-[180%] h-[180%] max-w-none top-[-2%] left-1/2 -translate-x-1/2 object-contain"
              />
            </div>
            <span
              className="text-lg font-bold text-[#0f172a] tracking-tight hidden sm:block"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Millennium{" "}
              <span className="text-mint">Games</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                id={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                className="px-3 py-2 text-sm text-slate-700 hover:text-[#0f172a] rounded-full hover:bg-slate-200/50 transition-all duration-300 font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Magnetic>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-slate-600 hover:text-[#0f172a] hover:bg-slate-200/50 rounded-full transition-all duration-300"
                id="nav-search"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </Magnetic>

            {/* Wishlist */}
            <Magnetic>
              <button
                className="p-2.5 text-slate-600 hover:text-[#0f172a] hover:bg-slate-200/50 rounded-full transition-all duration-300 hidden sm:block"
                id="nav-wishlist"
                aria-label="Wishlist"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </Magnetic>

            {/* Cart */}
            <Magnetic>
              <button
                onClick={() => setCartOpen(true)}
                className="p-2.5 text-slate-600 hover:text-[#0f172a] hover:bg-slate-200/50 rounded-full transition-all duration-300 relative"
                id="nav-cart"
                aria-label="Cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 text-[10px] font-bold rounded-full flex items-center justify-center text-[#ffffff] bg-[#000000] shadow-[0_0_8px_rgba(0,0,0,0.3)]">
                    {cartCount}
                  </span>
                )}
              </button>
            </Magnetic>

            {/* Account */}
            <div className="relative">
              <Magnetic>
                {user ? (
                  <button
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-[#0f172a] rounded-full transition-all duration-300 backdrop-blur-md hover:text-[#000000]"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75), 0 4px 12px rgba(90,110,125,0.08)' }}
                    id="nav-account"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold bg-[#0f172a] uppercase">
                      {user.name.slice(0, 2)}
                    </div>
                    <span className="max-w-[70px] truncate">{user.name}</span>
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#0f172a] rounded-full transition-all duration-300 backdrop-blur-md hover:text-[#000000]"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75), 0 4px 12px rgba(90,110,125,0.08)' }}
                    id="nav-account"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Sign In
                  </Link>
                )}
              </Magnetic>

              {/* Account Dropdown */}
              <AnimatePresence>
                {user && accountMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setAccountMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2.5 w-48 rounded-2xl z-20 overflow-hidden p-1.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.55))',
                        backdropFilter: 'blur(30px) saturate(150%)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 10px 25px rgba(90,110,125,0.18)',
                      }}
                    >
                      <Link
                        href="/library"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#0f172a] hover:bg-slate-200/50 rounded-xl transition-all"
                      >
                        🎮 My Game Library
                      </Link>
                      <button
                        onClick={() => {
                          logoutUser();
                          setAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-left cursor-pointer"
                      >
                        🚪 Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-slate-600 hover:text-[#0f172a] hover:bg-slate-200/50 rounded-full transition-all duration-300"
              id="nav-mobile-menu"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-slate-200/30"
            >
              <div className="container-custom py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for games, accounts, platforms..."
                    className="w-full border rounded-full px-4 py-3 pl-11 text-slate-800 placeholder:text-slate-500 focus:outline-none transition-all backdrop-blur-md"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))', border: '1px solid rgba(255,255,255,0.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)' }}
                    id="search-input"
                    autoFocus
                  />
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-800/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 lg:hidden p-6 pt-20"
              style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.55))', backdropFilter: 'blur(40px) saturate(160%)', borderLeft: '1px solid rgba(255,255,255,0.6)', boxShadow: '-8px 0 32px rgba(90,110,125,0.18)' }}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-slate-700 hover:text-[#0f172a] hover:bg-slate-200/50 rounded-2xl transition-all duration-300 font-semibold"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2.5">
                  {user ? (
                    <>
                      <Link
                        href="/library"
                        onClick={() => setMobileOpen(false)}
                        className="w-full btn-outline text-center block text-xs py-2.5"
                      >
                        🎮 My Library
                      </Link>
                      <button
                        onClick={() => {
                          logoutUser();
                          setMobileOpen(false);
                        }}
                        className="w-full btn-primary text-center bg-red-500/10 text-red-600 border-red-500/20 text-xs py-2.5 cursor-pointer block"
                      >
                        🚪 Sign Out ({user.name})
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth"
                      onClick={() => setMobileOpen(false)}
                      className="w-full btn-primary text-center block text-xs py-2.5"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </>
  );
}
