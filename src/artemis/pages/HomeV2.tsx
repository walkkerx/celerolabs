"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Rocket,
  Coins,
  Users,
  MapPin,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { venturesData } from "@/artemis/data/ventures";
import { routeLegs } from "@/artemis/data/routes";

/* ══════════════════════════════════════════════════════════════════════════
   HOME V2 — "The Operating System"
   Full-bleed, immersive, system/dashboard aesthetic.
   Distinct from v1's contained editorial style.
   Brand DNA: #FF4D00, Space Grotesk, mono labels, Route thesis.
   ══════════════════════════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Pillars for the accordion ── */
const pillars = [
  {
    id: "infrastructure",
    icon: Building2,
    label: "01",
    title: "Infrastructure",
    tagline: "The physical substrate",
    description:
      "M1 Core campuses, XEmbassy nodes, and distributed living labs. 50,000+ sq ft of lab, maker, and co-working space in prime hub cities — the substrate ventures need to move from prototype to production.",
    stats: [
      { value: "190", label: "Hubs" },
      { value: "39", label: "Countries" },
      { value: "50K", label: "Sq ft" },
    ],
    link: "/infrastructure",
  },
  {
    id: "ventures",
    icon: Rocket,
    label: "02",
    title: "Ventures",
    tagline: "Critical technology, commercialized",
    description:
      "Structured commercialization programs take ventures from idea to revenue, co-designed with industry and government partners who provide market access, pilot opportunities, and first-customer contracts across the Route.",
    stats: [
      { value: "40+", label: "Companies" },
      { value: "9", label: "Verticals" },
      { value: "24", label: "MIT steps" },
    ],
    link: "/ventures",
  },
  {
    id: "capital",
    icon: Coins,
    label: "03",
    title: "Capital",
    tagline: "Aligned, from $500 to $250K+",
    description:
      "Capital that matches the realities of building in the Global South — venture funds, development finance, and a non-dilutive desk matching ventures with grants and incentives across 39+ countries. Solidarity pricing, every stage.",
    stats: [
      { value: "$500", label: "Entry" },
      { value: "6", label: "Vehicles" },
      { value: "39+", label: "Grant markets" },
    ],
    link: "/capital",
  },
  {
    id: "community",
    icon: Users,
    label: "04",
    title: "Community",
    tagline: "The connective tissue",
    description:
      "The XCitizens network spans every hub — operators who run infrastructure, founders building ventures, investors deploying capital, mentors transferring knowledge. Compound network effects turn efforts into collective momentum.",
    stats: [
      { value: "100", label: "/ cohort" },
      { value: "190", label: "Hubs" },
      { value: "∞", label: "Compounding" },
    ],
    link: "/community",
  },
];

/* ── Principles for the manifesto marquee ── */
const principles = [
  "A breakthrough in isolation is a tragedy",
  "On the Route, it becomes a flywheel",
  "Infrastructure first, ventures second, capital third",
  "Solidarity pricing, every stage",
  "190 hubs · 39 countries · one engine",
  "Critical technology for the markets that need it most",
];

/* ── Voices ── */
const voices = [
  {
    quote:
      "xCelero is not a fund or an accelerator. It is the missing operating system for a continent that has been waiting to build.",
    name: "Manifesto, §1",
    role: "Founding Thesis",
  },
  {
    quote:
      "We are building the infrastructure that lets the next 5,000 companies deploy faster and compound across borders.",
    name: "Infrastructure pillar",
    role: "Platform Mandate",
  },
  {
    quote:
      "The 21st century will be built in the markets that need its breakthroughs most. We are building the infrastructure to make that inevitable.",
    name: "The thesis",
    role: "Operating Belief",
  },
];

export function HomeV2() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      <SystemHero />
      <ManifestoBand />
      <PillarAccordion />
      <VentureMarquee />
      <RouteTimeline />
      <ImpactGrid />
      <VoicesSection />
      <FinalCTA />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   1. SYSTEM HERO — full-bleed, split layout, live status panel
   ══════════════════════════════════════════════════════════════════════════ */
function SystemHero() {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-80px" });

  const slides = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section ref={heroRef} className="relative w-full min-h-[92vh] overflow-hidden">
      {/* Background slideshow */}
      {slides.map((src, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.08 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0"
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#0A0A0A]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/60">
            xCelero OS · v2.0
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">
          <span>System: Online</span>
          <span>Route: 6 legs active</span>
          <span>Hubs: 190</span>
        </div>
      </div>

      {/* Content — split layout */}
      <div className="relative z-10 w-full min-h-[92vh] flex items-center px-6 md:px-12 lg:px-20 pt-20 pb-16">
        <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: headline */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[11px] md:text-[12px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6"
            >
              The operating system for critical technology
            </motion.span>

            <h1 className="font-display font-medium tracking-[-0.035em] leading-[0.88] text-white text-[13vw] sm:text-[10vw] md:text-[7.5vw] lg:text-[6vw] xl:text-[96px] mb-8">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  className="inline-block"
                >
                  Build
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
                  className="inline-block"
                >
                  the next
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.41, ease: EASE }}
                  className="inline-block text-[#FF4D00]"
                >
                  century.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              className="text-white/55 text-[15px] md:text-[17px] font-medium leading-[1.6] max-w-lg mb-8"
            >
              A network of 190 hubs across 39 countries, fused into a single
              commercialization engine. Infrastructure to build, ventures to
              validate, capital to scale, community to compound.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/capital"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors"
              >
                Invest from $500
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ventures"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors"
              >
                Explore ventures
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right: live system panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="border border-white/12 bg-white/[0.03] backdrop-blur-sm">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/50">
                    Live · Route Status
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-[0.15em] text-white/30">
                  T-0
                </span>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2">
                {[
                  { v: "5,000+", l: "Companies" },
                  { v: "200+", l: "Unicorns" },
                  { v: "190", l: "Hubs" },
                  { v: "39", l: "Countries" },
                ].map((m, i) => (
                  <div
                    key={m.l}
                    className={`p-5 ${
                      i < 2 ? "border-b border-white/8" : ""
                    } ${i % 2 === 0 ? "border-r border-white/8" : ""}`}
                  >
                    <p className="font-display font-medium text-[28px] md:text-[32px] tracking-[-0.03em] text-white leading-none mb-2">
                      {m.v}
                    </p>
                    <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/40">
                      {m.l}
                    </p>
                  </div>
                ))}
              </div>

              {/* Route progress bar */}
              <div className="px-5 py-4 border-t border-white/8">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/40">
                    Route deployment
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-[0.1em] text-[#FF4D00]">
                    6 / 6 legs
                  </span>
                </div>
                <div className="h-1 bg-white/8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
                    className="h-full bg-[#FF4D00]"
                  />
                </div>
              </div>

              {/* Slide indicators */}
              <div className="flex gap-1.5 px-5 py-3 border-t border-white/8">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    suppressHydrationWarning
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="min-h-[24px] flex-1 flex items-center"
                  >
                    <span
                      className={`block h-[2px] w-full transition-all duration-500 ${
                        i === current ? "bg-[#FF4D00]" : "bg-white/15"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. MANIFESTO BAND — full-bleed dark, marquee + thesis
   ══════════════════════════════════════════════════════════════════════════ */
function ManifestoBand() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 md:py-40 border-t border-white/8 overflow-hidden">
      {/* Marquee */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden border-b border-white/8 py-5">
        <div className="flex w-max animate-[scroll_45s_linear_infinite] hover:[animation-play-state:paused]">
          {[...principles, ...principles].map((p, i) => (
            <div key={i} className="flex items-center gap-6 px-8 whitespace-nowrap">
              <span className="text-[#FF4D00] text-2xl">✦</span>
              <span className="text-[14px] md:text-[16px] font-display font-medium tracking-tight text-white/30">
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-28">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-8"
        >
          The thesis
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display font-medium tracking-[-0.03em] leading-[1.02] text-[32px] sm:text-[44px] md:text-[60px] lg:text-[76px] max-w-5xl"
        >
          The 21st century will be built in the markets that need its breakthroughs most.{" "}
          <span className="text-white/30">
            We are building the infrastructure to make that inevitable.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 border border-white/8"
        >
          {[
            {
              k: "The gap",
              v: "Capital, infrastructure, and talent sit on one side; the markets that need them sit on the other.",
            },
            {
              k: "The method",
              v: "Four pillars — Infrastructure, Ventures, Capital, Community — fused into a single commercialization engine.",
            },
            {
              k: "The compounding",
              v: "Every new venture strengthens the network. Every hub compounds the reach. 5,000 companies. 200 unicorns.",
            },
          ].map((b) => (
            <div key={b.k} className="bg-[#0A0A0A] p-8 md:p-10">
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4">
                {b.k}
              </p>
              <p className="text-[14px] md:text-[16px] text-white/60 font-medium leading-[1.6]">
                {b.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   3. PILLAR ACCORDION — vertical, expandable (distinct from v1's tabs)
   ══════════════════════════════════════════════════════════════════════════ */
function PillarAccordion() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-white/8">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
            Four pillars, one engine
          </span>
          <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
            One machine,
            <br />
            <span className="text-white/30">four compounding parts.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="border-t border-white/10">
          {pillars.map((p, i) => {
            const isOpen = i === active;
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-6 py-7 md:py-8 text-left group"
                >
                  <span className={`text-[11px] font-mono tracking-[0.2em] transition-colors ${isOpen ? "text-[#FF4D00]" : "text-white/30"}`}>
                    {p.label}
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center border transition-colors ${isOpen ? 'border-[#FF4D00]' : 'border-white/15'}" style={{ borderColor: isOpen ? "#FF4D00" : "rgba(255,255,255,0.15)" }}>
                    <Icon className={`w-5 h-5 transition-colors ${isOpen ? "text-[#FF4D00]" : "text-white/40"}`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-display font-medium tracking-tight text-[24px] md:text-[32px] lg:text-[38px] flex-1 transition-colors ${isOpen ? "text-white" : "text-white/60 group-hover:text-white/80"}`}>
                    {p.title}
                  </h3>
                  <span className="hidden md:block text-[12px] font-mono tracking-[0.1em] uppercase text-white/30 mr-4">
                    {p.tagline}
                  </span>
                  <div className={`w-9 h-9 shrink-0 flex items-center justify-center border transition-colors ${isOpen ? "border-[#FF4D00] bg-[#FF4D00] text-white" : "border-white/15 text-white/40"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid lg:grid-cols-12 gap-8 pb-10 md:pb-12 pl-0 lg:pl-[4.5rem]">
                        <div className="lg:col-span-7">
                          <p className="text-[16px] md:text-[18px] text-white/70 font-medium leading-[1.65] mb-8">
                            {p.description}
                          </p>
                          <Link
                            to={p.link}
                            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#0A0A0A] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF4D00] hover:text-white transition-colors"
                          >
                            Explore {p.title}
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                        <div className="lg:col-span-5 grid grid-cols-3 gap-4">
                          {p.stats.map((s) => (
                            <div key={s.label} className="border-t border-white/15 pt-3">
                              <p className="font-display font-medium text-[26px] md:text-[32px] tracking-tight text-white leading-none">
                                {s.value}
                              </p>
                              <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-white/40 mt-2">
                                {s.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   4. VENTURE MARQUEE — auto-scrolling featured ventures (distinct from v1's grid)
   ══════════════════════════════════════════════════════════════════════════ */
function VentureMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featured = useMemo(() => venturesData.slice(0, 12), []);
  const rowA = featured.slice(0, 6);
  const rowB = featured.slice(6, 12);

  const Card = ({ v }: { v: (typeof venturesData)[number] }) => (
    <Link
      to={`/ventures/${v.id}`}
      className="group block w-[300px] md:w-[340px] shrink-0 bg-[#111111] border border-white/8 hover:border-[#FF4D00] transition-colors mx-2"
    >
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="min-w-0">
            <h3 className="text-[15px] font-display font-bold text-white truncate">{v.name}</h3>
            <span className="text-[10px] font-mono text-white/40 tracking-wider block mt-0.5">{v.code}</span>
          </div>
          <span className="inline-block px-2 py-0.5 bg-white/10 text-[9px] font-mono uppercase tracking-widest text-white/60 shrink-0">
            {v.vertical}
          </span>
        </div>
        <p className="text-[11px] text-white/55 leading-relaxed line-clamp-2">{v.solution}</p>
      </div>
      <div className="px-5 pb-5 pt-2 flex items-center justify-between">
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-white/25 block">Anchor</span>
          <span className="text-[10px] text-white/50 leading-snug line-clamp-1 block max-w-[180px]">{v.anchorPartners}</span>
        </div>
        <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center font-display font-bold text-sm text-white shrink-0">
          {v.name.charAt(0)}
        </div>
      </div>
    </Link>
  );

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-white/8 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
              The portfolio · 40+ ventures
            </span>
            <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
              Critical technology,
              <br />
              <span className="text-white/30">for the markets that need it most.</span>
            </h2>
          </div>
          <Link
            to="/ventures"
            className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 hover:text-[#FF4D00] transition-colors flex-shrink-0"
          >
            All ventures
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Dual auto-scrolling marquees (opposite directions) */}
      <div className="space-y-4">
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex w-max animate-[scroll_50s_linear_infinite] hover:[animation-play-state:paused]"
          >
            {[...rowA, ...rowA].map((v, i) => (
              <Card key={`${v.id}-${i}`} v={v} />
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="flex w-max animate-[scroll_60s_linear_infinite_reverse] hover:[animation-play-state:paused]"
          >
            {[...rowB, ...rowB].map((v, i) => (
              <Card key={`${v.id}-${i}-b`} v={v} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   5. ROUTE TIMELINE — vertical timeline of legs (distinct from v1's map + horizontal cards)
   ══════════════════════════════════════════════════════════════════════════ */
function RouteTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const legs = routeLegs.slice(0, 6);

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-white/8 bg-[#050505]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
            The Route · 6 legs · 190 hubs
          </span>
          <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
            One corridor.
            <br />
            <span className="text-white/30">Six civilizations deep.</span>
          </h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-[27px] top-2 bottom-2 w-px bg-white/10" />

          <div className="space-y-3">
            {legs.map((leg, i) => (
              <motion.div
                key={leg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <Link
                  to="/routes"
                  className="group relative flex items-start gap-5 md:gap-8 pl-0"
                >
                  {/* Node */}
                  <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-[#0A0A0A] border-2 flex items-center justify-center transition-colors group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00]" style={{ borderColor: leg.color }}>
                    <span className="text-[11px] md:text-[13px] font-mono font-bold tracking-wider text-white">
                      {leg.legNumber}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6 border-b border-white/8 group-hover:border-white/20 transition-colors pt-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                      <h3 className="font-display font-medium tracking-tight text-[20px] md:text-[26px] text-white group-hover:text-[#FF4D00] transition-colors">
                        {leg.name}
                      </h3>
                      <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.1em] uppercase text-white/40">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {leg.hubCount} hubs
                        </span>
                        <span className="text-white/20">/</span>
                        <span>{leg.countries.length} countries</span>
                      </div>
                    </div>
                    <p className="text-[13px] md:text-[14px] text-white/50 italic font-medium leading-[1.5] mb-3">
                      &ldquo;{leg.subtitle}&rdquo;
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/30 mr-1">
                        Flow:
                      </span>
                      <span className="text-[11px] text-white/55 font-medium">{leg.primaryFlow}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#FF4D00] group-hover:translate-x-1 transition-all ml-auto hidden md:block" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/routes"
            className="group inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors"
          >
            View Full Route Map
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   6. IMPACT GRID — bold full-bleed numbers
   ══════════════════════════════════════════════════════════════════════════ */
function ImpactGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 5000, prefix: "", suffix: "+", label: "Companies on the Route", icon: Rocket },
    { value: 1, prefix: "$", suffix: "T+", label: "Projected portfolio value at scale", icon: Sparkles },
    { value: 200, prefix: "", suffix: "+", label: "Unicorns projected", icon: ArrowUpRight },
    { value: 190, prefix: "", suffix: "", label: "Hubs across 39 countries", icon: Building2 },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-white/8">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
            The scale we are building toward
          </span>
          <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
            Not a fund.
            <br />
            <span className="text-white/30">An operating system.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/8">
          {stats.map((s, i) => {
            const SIcon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="bg-[#0A0A0A] p-7 md:p-9 flex flex-col"
              >
                <SIcon className="w-5 h-5 text-[#FF4D00] mb-6" strokeWidth={1.5} />
                <div className="font-display font-medium tracking-[-0.03em] leading-none text-white text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] mb-4">
                  <Counter end={s.value} prefix={s.prefix} suffix={s.suffix} active={isInView} />
                </div>
                <p className="text-[11px] md:text-[12px] font-mono tracking-[0.1em] uppercase text-white/50 leading-[1.5]">
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Counter({
  end,
  prefix = "",
  suffix = "",
  active,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);

  return (
    <span>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   7. VOICES — editorial pull quotes
   ══════════════════════════════════════════════════════════════════════════ */
function VoicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-white/8 bg-[#050505]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
            Operating beliefs
          </span>
          <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
            What we hold to be true.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 border border-white/8">
          {voices.map((v, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="bg-[#050505] p-8 md:p-10 flex flex-col"
            >
              <span className="font-display text-[#FF4D00] text-5xl leading-none mb-4">&ldquo;</span>
              <blockquote className="text-[18px] md:text-[20px] font-display font-medium tracking-tight leading-[1.35] text-white mb-8 flex-1">
                {v.quote}
              </blockquote>
              <figcaption className="border-t border-white/10 pt-4">
                <p className="text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-white">
                  {v.name}
                </p>
                <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-white/40 mt-1">
                  {v.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   8. FINAL CTA — full-bleed, dramatic
   ══════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/8">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1920&q=80"
          alt="City lights across Africa at night"
          className="w-full h-full object-cover opacity-20"
          style={{ objectPosition: "center 45%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/70" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            Build with us
          </span>
          <h2 className="font-display font-medium tracking-[-0.03em] leading-[0.92] text-[40px] sm:text-[56px] md:text-[76px] lg:text-[96px] mb-8">
            The next century
            <br />
            <span className="text-white/40">won&apos;t wait.</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-white/55 font-medium leading-[1.6] max-w-xl mb-10">
            Invest from $500. Apply to build. Partner at scale. Or join the
            XCitizens moving through the Route together.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/capital"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors"
            >
              Invest now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/join"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors"
            >
              Apply to build
            </Link>
            <Link
              to="/community"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors"
            >
              Join community
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mt-20 md:mt-28 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
              xCelero OS · Critical technology for emerging markets
            </span>
          </div>
          <Link
            to="/manifesto"
            className="group inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 hover:text-[#FF4D00] transition-colors"
          >
            Read the manifesto
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
