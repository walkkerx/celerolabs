"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Search, ArrowRight, Menu, X, ArrowUp, ChevronDown, LogIn, ArrowLeft, Shield, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouter } from "../router";
import { SearchModal } from "./SearchModal";

/* ── Page transition variants based on path ── */
function getTransitionForPath(path: string) {
  // Editorial pages: fade-only, no y movement
  const editorialPaths = ["/about", "/manifesto", "/approach"];
  // Content-heavy pages: slide-up
  const contentPaths = ["/ventures", "/programs", "/routes", "/capital", "/infrastructure"];
  // Data pages: subtle crossfade
  const dataPaths = ["/community", "/insights", "/careers", "/team", "/case-studies", "/admin"];

  if (editorialPaths.includes(path)) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    };
  }
  if (contentPaths.includes(path)) {
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    };
  }
  if (dataPaths.includes(path)) {
    return {
      initial: { opacity: 0, y: 4 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -4 },
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    };
  }
  // Default/home: gentle fade
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { path } = useRouter();

  // Town Square is a full-screen immersive experience: no nav, footer, or sticky bars
  const isImmersive = path === "/townsquare";
  // Admin dashboard has its own dark layout: no nav, footer, or sticky bars
  const isAdmin = path === "/admin";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const t = getTransitionForPath(path);

  if (isImmersive) {
    return (
      <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#FF4D00]/20 selection:text-[#111111]">
        {/* Floating close button for immersive mode */}
        <Link
          to="/"
          className="fixed top-4 left-4 z-[100] w-10 h-10 rounded-full bg-[#FF4D00] text-white flex items-center justify-center shadow-lg hover:bg-[#FF4D00]/90 transition-colors"
          aria-label="Close and return to home"
        >
          <X className="w-5 h-5" />
        </Link>
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#FF4D00]/20 selection:text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans flex flex-col selection:bg-[#FF4D00]/20 selection:text-[#111111]">
      <Nav />
      <main className="flex-grow pt-[64px] md:pt-[72px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={t.initial}
            animate={t.animate}
            exit={t.exit}
            transition={t.transition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <StickyInvestBar />
      <ScrollToTopButton />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NAV
   ══════════════════════════════════════════════════════════════════════════ */
function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { path } = useRouter();

  // Close mobile menu on route change (handled via Link onClick in mobile menu)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navGroups = [
    {
      label: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "How We Work", path: "/approach" },
        { name: "Manifesto", path: "/manifesto" },
      ],
    },
    {
      label: "Platform",
      links: [
        { name: "Infrastructure", path: "/infrastructure" },
        { name: "Routes", path: "/routes" },
        { name: "Ventures", path: "/ventures" },
      ],
    },
    {
      label: "Network",
      links: [
        { name: "Capital", path: "/capital" },
        { name: "Programs", path: "/programs" },
        { name: "Community", path: "/community" },
        { name: "Insights", path: "/insights" },
        { name: "Careers", path: "/careers" },
      ],
    },
  ];

  const mobileNavGroups = [
    {
      label: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "How We Work", path: "/approach" },
        { name: "Manifesto", path: "/manifesto" },
      ],
    },
    {
      label: "The Platform",
      links: [
        { name: "Infrastructure", path: "/infrastructure" },
        { name: "Routes", path: "/routes" },
        { name: "Ventures", path: "/ventures" },
      ],
    },
    {
      label: "Capital & Network",
      links: [
        { name: "Capital", path: "/capital" },
        { name: "Programs", path: "/programs" },
        { name: "Community", path: "/community" },
        { name: "Careers", path: "/careers" },
        { name: "Insights", path: "/insights" },
      ],
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-xl border-b border-[#111111]/8 h-[64px] md:h-[72px] flex items-center px-4 md:px-8 transition-all duration-300">
        <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-7 h-7 bg-[#FF4D00] flex items-center justify-center transition-all duration-300 group-hover:rotate-90 group-hover:rounded-lg">
              <span className="text-white font-bold text-[11px]">X</span>
            </div>
            <span className="text-[13px] font-bold tracking-tight uppercase whitespace-nowrap hidden sm:inline text-[#111111]">
              xCelero<span className="text-[#FF4D00]"> Labs</span>
            </span>
          </Link>

          {/* Desktop nav — mega menu dropdowns */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navGroups.map((group) => (
              <div key={group.label} className="relative group/dropdown">
                <button
                  className="flex items-center gap-1.5 px-4 py-2 text-[12px] tracking-[0.05em] font-semibold text-[#111111]/70 hover:text-[#111111] transition-colors rounded-full hover:bg-[#111111]/5"
                >
                  {group.label}
                  <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover/dropdown:rotate-180 text-[#111111]/40" />
                </button>
                {/* Dropdown panel — card style with shadow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 -translate-y-2 group-hover/dropdown:translate-y-0">
                  <div className="bg-white border border-[#111111]/8 shadow-2xl rounded-2xl min-w-[220px] py-2 overflow-hidden">
                    {/* Subtle top accent */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent" />
                    {group.links.map((item) => {
                      const isActive = path === item.path;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-center gap-2.5 px-5 py-2.5 text-[13px] tracking-[0.02em] font-medium transition-all duration-200 ${
                            isActive
                              ? "text-[#FF4D00] bg-[#FF4D00]/5"
                              : "text-[#111111]/60 hover:text-[#111111] hover:bg-[#FAFAFA] hover:pl-6"
                          }`}
                        >
                          {isActive && <span className="w-1 h-1 rounded-full bg-[#FF4D00]" />}
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-[#111111]/5 transition-colors group flex items-center gap-2"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#111111]/60 group-hover:text-[#111111] transition-colors" />
              <span className="hidden xl:inline-flex text-[10px] font-mono font-medium text-[#111111]/30 border border-[#111111]/10 rounded px-1.5 py-0.5">⌘K</span>
            </button>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-[#111111]/10" />

            {/* Sign In */}
            <Link
              to="/townsquare"
              className="px-4 py-2 bg-[#111111] text-white text-[11px] tracking-[0.05em] font-semibold rounded-full hover:bg-[#FF4D00] transition-all duration-300 inline-flex items-center gap-1.5 group"
            >
              <LogIn className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>

            {/* Join — desktop only */}
            <Link
              to="/join"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-[11px] tracking-[0.05em] font-semibold text-[#111111] border border-[#111111]/15 rounded-full hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300"
            >
              Join
              <ArrowRight className="w-3 h-3" />
            </Link>

            {/* Hamburger — mobile/tablet only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-[#111111]/5 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{ open: { rotate: 90, scale: 1 }, closed: { rotate: 0, scale: 1 } }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-[#111111]" /> : <Menu className="w-5 h-5 text-[#111111]" />}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 h-[64px] md:h-[72px] border-b border-white/8">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-7 h-7 bg-[#FF4D00] flex items-center justify-center rounded-lg">
                  <span className="text-white font-bold text-[11px]">X</span>
                </div>
                <span className="text-[13px] font-bold tracking-tight uppercase text-white">
                  xCelero<span className="text-[#FF4D00]"> Labs</span>
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links — scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              {mobileNavGroups.map((group, groupIdx) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIdx * 0.08, duration: 0.3 }}
                  className={groupIdx < mobileNavGroups.length - 1 ? "mb-8" : ""}
                >
                  {/* Category label */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FF4D00] whitespace-nowrap">
                      {group.label}
                    </span>
                    <div className="flex-1 h-px bg-white/8" />
                  </div>

                  {/* Links */}
                  <div className="flex flex-col gap-0.5">
                    {group.links.map((item) => {
                      const isActive = path === item.path;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-[18px] font-display font-medium tracking-tight transition-all duration-200 ${
                            isActive
                              ? "text-[#FF4D00] bg-[#FF4D00]/8"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] flex-shrink-0" />}
                          {item.name}
                          {!isActive && <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-30" />}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTAs */}
            <div className="px-5 py-5 border-t border-white/8 flex gap-3">
              <Link
                to="/townsquare"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-3 bg-[#FF4D00] text-white text-[12px] font-bold tracking-[0.05em] rounded-xl text-center hover:bg-[#FF6A28] transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link
                to="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-3 border border-white/20 text-white text-[12px] font-bold tracking-[0.05em] rounded-xl text-center hover:bg-white hover:text-[#0A0A0A] transition-colors flex items-center justify-center gap-2"
              >
                Join <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STICKY INVEST CTA BAR — pill style, matches nav
   ══════════════════════════════════════════════════════════════════════════ */
function StickyInvestBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    try { return sessionStorage.getItem("invest-bar-dismissed") === "true"; } catch { return false; }
  });
  const { path } = useRouter();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    try { sessionStorage.setItem("invest-bar-dismissed", "true"); } catch {}
  }, []);

  const shouldShow = visible && !dismissed && path !== "/capital";

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-xl border-t border-white/8 flex items-center justify-between px-4 md:px-8 h-[52px]"
        >
          <span className="text-[11px] sm:text-[12px] font-medium text-white/70 truncate mr-2">
            <span className="hidden sm:inline">Invest in critical technology from $500</span>
            <span className="sm:hidden">Invest from $500</span>
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/capital"
              className="px-4 py-2 bg-[#FF4D00] text-white text-[10px] font-bold tracking-[0.05em] rounded-full hover:bg-[#FF6A28] transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
            >
              Invest Now <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={handleDismiss}
              className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCROLL-TO-TOP BUTTON — pill circle, matches nav
   ══════════════════════════════════════════════════════════════════════════ */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-16 right-4 md:right-6 z-30 w-10 h-10 bg-[#111111] text-white rounded-full flex items-center justify-center hover:bg-[#FF4D00] transition-colors shadow-lg shadow-[#111111]/20"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FOOTER — modern, rounded cards, glass sections
   ══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-0">
      <div className="w-full max-w-[1400px] mx-auto bg-[#0A0A0A] text-white px-6 md:px-10 lg:px-14 pt-16 md:pt-20 pb-8 rounded-2xl md:rounded-3xl">
        {/* CTA cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-20">
          <Link to="/programs" className="group block">
            <div className="border border-white/8 rounded-2xl p-8 md:p-10 aspect-[16/9] md:aspect-auto md:h-[260px] flex flex-col justify-between hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#FF4D00]">xCelero Accelerator</div>
                <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-medium tracking-tight mb-2">From thesis to operating company in 24 months.</h2>
                <p className="text-white/40 text-[13px] font-medium">High-intensity venture building with funding, mentorship, and Route infrastructure built in.</p>
              </div>
            </div>
          </Link>

          <Link to="/capital" className="group block">
            <div className="border border-white/8 rounded-2xl p-8 md:p-10 aspect-[16/9] md:aspect-auto md:h-[260px] flex flex-col justify-between hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#FF4D00]">xCelero Capital</div>
                <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-medium tracking-tight mb-2">Invest in critical technology from $500.</h2>
                <p className="text-white/40 text-[13px] font-medium">Six vehicles, one thesis: back the technology the next century needs, in the markets that need it most.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Brand + links */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center rounded-lg">
                <span className="text-white font-bold text-[12px]">X</span>
              </div>
              <span className="text-[15px] font-bold tracking-tight uppercase">xCelero<span className="text-[#FF4D00]"> Labs</span></span>
            </Link>
            <p className="text-white/40 text-[14px] font-medium leading-[1.6] max-w-sm mb-6">
              Venture studio and infrastructure platform building critical technology across 39 countries. Invest from $500.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors text-[11px] font-bold">in</a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors text-[11px] font-bold">X</a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors text-[11px] font-bold">YT</a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/25">Company</span>
              <Link to="/about" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">About</Link>
              <Link to="/approach" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">How We Work</Link>
              <Link to="/manifesto" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Manifesto</Link>
              <Link to="/careers" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Careers</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/25">Platform</span>
              <Link to="/infrastructure" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Infrastructure</Link>
              <Link to="/routes" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Routes</Link>
              <Link to="/ventures" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Ventures</Link>
              <Link to="/programs" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Programs</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/25">Network</span>
              <Link to="/capital" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Capital</Link>
              <Link to="/community" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Community</Link>
              <Link to="/insights" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Insights</Link>
              <Link to="/townsquare" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Town Square</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/25">Legal</span>
              <Link to="/" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Terms</Link>
              <Link to="/" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Privacy</Link>
              <Link to="/admin" className="text-[13px] font-medium text-white/40 hover:text-[#FF4D00] transition-colors inline-flex items-center gap-1.5">
                <Shield className="w-3 h-3" /> Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/25" suppressHydrationWarning>
            © {new Date().getFullYear()} xCelero Labs
          </span>
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/20">
            Critical technology for emerging markets
          </span>
        </div>
      </div>
    </footer>
  );
}
