"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Search, ArrowRight, Menu, X, ArrowUp, ChevronDown, LogIn, ArrowLeft, Shield } from "lucide-react";
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
      <main className="flex-grow pt-[80px]">
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#111111]/10 h-[80px] flex items-center px-6 md:px-12">
        <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-6 h-6 bg-[#FF4D00] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-[10px]">X</span>
            </div>
            <span className="text-sm font-bold tracking-tight uppercase whitespace-nowrap hidden sm:inline text-[#111111]">xCelero Labs</span>
          </Link>

          {/* Desktop nav links with dropdowns */}
          <div className="hidden lg:flex items-center gap-1">
            {/* V2 — direct link to the v2 homepage */}
            <Link
              to="/v2"
              className={`relative flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-[0.1em] font-bold transition-colors ${
                path === "/v2"
                  ? "text-[#FF4D00]"
                  : "text-[#111111]/80 hover:text-[#FF4D00]"
              }`}
            >
              V2
              <span className="inline-flex items-center justify-center text-[7px] font-mono font-bold tracking-[0.05em] uppercase px-1 py-0.5 bg-[#FF4D00] text-white">
                New
              </span>
            </Link>
            {navGroups.map((group) => (
              <div key={group.label} className="relative group/dropdown">
                <button
                  className="flex items-center gap-1 px-3 py-2 text-[11px] tracking-[0.1em] font-medium text-[#111111]/60 hover:text-[#FF4D00] transition-colors"
                >
                  {group.label}
                  <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover/dropdown:rotate-180" />
                </button>
                {/* Dropdown panel */}
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 -translate-y-1 group-hover/dropdown:translate-y-0">
                  <div className="bg-white border border-[#111111]/10 shadow-lg min-w-[200px] py-2">
                    {group.links.map((item) => {
                      const isActive = path === item.path;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`block px-5 py-2.5 text-[12px] tracking-[0.05em] font-medium transition-colors ${
                            isActive
                              ? "text-[#FF4D00] bg-[#FF4D00]/5"
                              : "text-[#111111]/60 hover:text-[#FF4D00] hover:bg-[#FF4D00]/5"
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 border border-[#111111]/10 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-colors group flex items-center gap-2"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#111111] group-hover:text-white" />
              <span className="hidden sm:inline-flex text-[10px] font-mono font-medium text-[#111111]/40 group-hover:text-white/50">⌘K</span>
            </button>
            <Link to="/townsquare" className="px-5 py-2.5 bg-[#FF4D00] text-white text-[11px] tracking-[0.1em] font-bold hover:bg-[#FF4D00]/90 transition-colors inline-flex items-center gap-1.5">
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </Link>
            <Link to="/join" className="px-5 py-2.5 border border-[#111111] text-[11px] tracking-[0.1em] font-bold hover:bg-[#111111] hover:text-white transition-colors hidden sm:inline-flex">
              Join
            </Link>

            {/* Hamburger button: mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 border border-[#111111]/10 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-colors group"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90, scale: 1 },
                  closed: { rotate: 0, scale: 1 },
                }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#111111] group-hover:text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-[#111111] group-hover:text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 h-[80px]">
              <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-6 h-6 bg-[#FF4D00] flex items-center justify-center">
                  <span className="text-white font-bold text-[10px]">X</span>
                </div>
                <span className="text-sm font-bold tracking-tight uppercase text-white">xCelero Labs</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-sm hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Categorized nav links: centered vertically */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
              {/* V2 — new homepage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.4 }}
                className="mb-8 md:mb-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FF4D00] whitespace-nowrap">
                    New
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <Link
                  to="/v2"
                  className={`text-2xl sm:text-3xl font-display font-medium tracking-tight transition-colors flex items-center gap-2 ${
                    path === "/v2"
                      ? "text-[#FF4D00]"
                      : "text-white/60 hover:text-[#FF4D00]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {path === "/v2" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] flex-shrink-0" />
                  )}
                  V2
                  <span className="inline-flex items-center justify-center text-[7px] font-mono font-bold tracking-[0.05em] uppercase px-1 py-0.5 bg-[#FF4D00] text-white">
                    New
                  </span>
                </Link>
              </motion.div>
              {mobileNavGroups.map((group, groupIdx) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIdx * 0.1, duration: 0.4 }}
                  className={groupIdx < mobileNavGroups.length - 1 ? "mb-8 md:mb-10" : ""}
                >
                  {/* Category label with extending line */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FF4D00] whitespace-nowrap">
                      {group.label}
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Links within category */}
                  <div className="flex flex-col gap-2">
                    {group.links.map((item) => {
                      const isActive = path === item.path;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`text-2xl sm:text-3xl font-display font-medium tracking-tight transition-colors flex items-center gap-2 ${
                            isActive
                              ? "text-[#FF4D00]"
                              : "text-white/60 hover:text-[#FF4D00]"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] flex-shrink-0" />
                          )}
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTAs */}
            <div
              className="px-6 pb-16 flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ paddingBottom: 'max(4rem, calc(4rem + env(safe-area-inset-bottom, 0px)))' }}
            >
              <Link
                to="/townsquare"
                className="min-h-[44px] px-8 py-3 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF4D00]/90 transition-colors inline-flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
              <Link
                to="/capital"
                className="min-h-[44px] px-8 py-3 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors inline-flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Invest Now
              </Link>
              <Link
                to="/join"
                className="min-h-[44px] px-8 py-3 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors inline-flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join
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
   STICKY INVEST CTA BAR
   ══════════════════════════════════════════════════════════════════════════ */
function StickyInvestBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("invest-bar-dismissed") === "true";
    } catch {
      return false;
    }
  });
  const { path } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      setVisible(window.scrollY > viewportHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    try {
      sessionStorage.setItem("invest-bar-dismissed", "true");
    } catch {
      // sessionStorage not available
    }
  }, []);

  // Don't show on capital page or if dismissed
  const isCapitalPage = path === "/capital";
  const shouldShow = visible && !dismissed && !isCapitalPage;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 48, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#111111] text-white flex items-center justify-between px-4 md:px-6 min-h-[48px] md:h-12"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <span className="text-[11px] sm:text-[13px] font-medium text-white/70 truncate mr-2 sm:mr-4">
            <span className="hidden sm:inline">Invest in critical technology from $500</span>
            <span className="sm:hidden">Invest in critical tech from $500</span>
          </span>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link
              to="/capital"
              className="min-h-[44px] px-4 py-2 bg-[#FF4D00] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF4D00]/90 transition-colors whitespace-nowrap inline-flex items-center"
            >
              Invest Now →
            </Link>
            <button
              onClick={handleDismiss}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
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
   SCROLL-TO-TOP BUTTON
   ══════════════════════════════════════════════════════════════════════════ */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-24 md:bottom-20 right-4 md:right-6 z-30 w-11 h-11 bg-white border border-[#111111]/10 flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors shadow-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-0">
      <div className="w-full max-w-[1400px] mx-auto bg-[#000000] text-white px-6 md:px-12 lg:px-20 pt-24 pb-12 rounded-sm">
        {/* CTA cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          <Link to="/programs" className="group block">
            <div className="border border-white/10 p-10 md:p-12 aspect-[16/9] md:aspect-auto md:h-[300px] flex flex-col justify-between hover:bg-white/5 transition-colors relative overflow-hidden">
               <div className="flex justify-between items-start">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-white/50">xCelero Accelerator</div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
               </div>
               <div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">From thesis to operating company in 24 months.</h2>
                  <p className="text-white/50 font-medium">High-intensity venture building with funding, mentorship, and Route infrastructure built in.</p>
               </div>
            </div>
          </Link>

          <Link to="/capital" className="group block">
            <div className="border border-white/10 p-10 md:p-12 aspect-[16/9] md:aspect-auto md:h-[300px] flex flex-col justify-between hover:bg-white/5 transition-colors relative overflow-hidden">
               <div className="flex justify-between items-start">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-white/50">xCelero Capital</div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
               </div>
               <div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">Invest in critical technology from $500.</h2>
                  <p className="text-white/50 font-medium">Six vehicles, one thesis: back the technology the next century needs, in the markets that need it most.</p>
               </div>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <div className="lg:col-span-6">
            <div className="text-[36px] sm:text-[50px] md:text-[80px] lg:text-[100px] font-display font-medium leading-[0.9] tracking-tight uppercase mb-8">
              xCelero<br />Labs
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">xCelero Labs</span>
              <Link to="/about" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">About</Link>
              <Link to="/ventures" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">Companies</Link>
              <Link to="/careers" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">Careers</Link>
              <Link to="/approach" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">How We Work</Link>
              <Link to="/insights" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">News</Link>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">Programs</span>
              <Link to="/programs" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">Overview</Link>
              <Link to="/programs" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">Fellowship</Link>
              <Link to="/programs" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">Hansa Hubs</Link>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">Social</span>
              <a href="#" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">X</a>
              <a href="#" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">YouTube</a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">Legal</span>
              <Link to="/" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">Terms of Use</Link>
              <Link to="/" className="text-[13px] font-bold text-white/60 hover:text-white transition-colors">Privacy</Link>
              <Link to="/admin" className="text-[13px] font-bold text-white/40 hover:text-[#FF4D00] transition-colors inline-flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                Admin
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-[10px] text-white/30 uppercase tracking-widest font-mono" suppressHydrationWarning>
          © {new Date().getFullYear()} xCelero Labs.
        </div>
      </div>
    </footer>
  );
}
