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
  Zap,
  TrendingUp,
  Globe2,
  Play,
  ChevronRight,
  Sparkles,
  Cpu,
  Layers,
} from "lucide-react";
import { venturesData } from "@/artemis/data/ventures";
import { routeLegs } from "@/artemis/data/routes";

/* ══════════════════════════════════════════════════════════════════════════
   HOME 2 — Cinematic command-center homepage.
   Bolder, more immersive, more interactive than the original.
   Brand DNA preserved: #FF4D00, Space Grotesk, mono labels, Route thesis.
   ══════════════════════════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Hero slideshow ── */
const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    alt: "Engineer operating advanced machinery",
    position: "center 35%",
  },
  {
    src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1920&q=80",
    alt: "Solar panel field at dawn",
    position: "center 40%",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
    alt: "Circuit board macro detail",
    position: "center 45%",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    alt: "Earth from space at night",
    position: "center 50%",
  },
];

/* ── Live ticker metrics ── */
const tickerMetrics = [
  { label: "Companies on the Route", value: "5,000+" },
  { label: "Projected unicorns", value: "200+" },
  { label: "Hub locations", value: "190" },
  { label: "Countries", value: "39" },
  { label: "Investment vehicles", value: "6" },
  { label: "Civilizational fields", value: "9" },
];

/* ── Pillars for the interactive showcase ── */
const pillars = [
  {
    id: "infrastructure",
    icon: Building2,
    label: "01",
    title: "Infrastructure",
    tagline: "The physical substrate",
    description:
      "M1 Core campuses, XEmbassy nodes, and distributed living labs. We build the physical and digital substrate ventures need to move from prototype to production — 50,000+ sq ft of lab, maker, and co-working space in prime hub cities.",
    stats: [
      { value: "190", label: "Hub locations" },
      { value: "39", label: "Countries" },
      { value: "50K", label: "Sq ft / campus" },
    ],
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
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
      { value: "40+", label: "Portfolio companies" },
      { value: "9", label: "Verticals" },
      { value: "24", label: "MIT steps" },
    ],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
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
      { value: "$500", label: "Entry point" },
      { value: "6", label: "Vehicles" },
      { value: "39+", label: "Grant markets" },
    ],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
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
      { value: "100", label: "XCitizens / cohort" },
      { value: "190", label: "Hubs connected" },
      { value: "∞", label: "Compounding" },
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    link: "/community",
  },
];

/* ── Flywheel stages ── */
const flywheel = [
  { icon: Building2, label: "Infrastructure", desc: "Build the substrate" },
  { icon: Rocket, label: "Ventures", desc: "Commercialize technology" },
  { icon: Coins, label: "Capital", desc: "Fuel every stage" },
  { icon: Users, label: "Community", desc: "Compound the network" },
];

/* ── Voices / testimonials ── */
const voices = [
  {
    quote:
      "xCelero is not a fund or an accelerator. It is the missing operating system for a continent that has been waiting to build.",
    name: "Manifesto, §1",
    role: "Founding Thesis",
  },
  {
    quote:
      "A breakthrough in isolation is a tragedy. On the Route, it becomes a flywheel.",
    name: "Home, bridge",
    role: "Operating Belief",
  },
  {
    quote:
      "We are building the infrastructure that lets the next 5,000 companies deploy faster and compound across borders.",
    name: "Infrastructure pillar",
    role: "Platform Mandate",
  },
];

export function Home2() {
  return (
    <div className="bg-[#FAFAFA] text-[#111111]">
      <CinematicHero />
      <ManifestoBand />
      <PillarShowcase />
      <RouteJourney />
      <VentureGallery />
      <ImpactNumbers />
      <FlywheelSection />
      <VoicesSection />
      <FinalCTA />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   1. CINEMATIC HERO — full-bleed, dark, kinetic headline, metric ticker
   ══════════════════════════════════════════════════════════════════════════ */
function CinematicHero() {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const headlineWords = ["Build", "the", "next", "century."];

  return (
    <section ref={heroRef} className="relative w-full min-h-[88vh] md:min-h-[92vh] overflow-hidden bg-[#0A0A0A]">
      {/* Slideshow */}
      {heroSlides.map((img, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1 : 1.06,
          }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute inset-0"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
            style={{ objectPosition: img.position }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Corner labels */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 flex items-center gap-2 text-white/40 z-10">
        <span className="w-1.5 h-1.5 bg-[#FF4D00] animate-pulse" />
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">xCelero Labs</span>
      </div>
      <div className="absolute top-6 right-6 md:top-8 md:right-12 text-white/40 z-10 text-[10px] font-mono tracking-[0.3em] uppercase hidden sm:block">
        Home&nbsp;02 / Cinematic
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto h-full min-h-[88vh] md:min-h-[92vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-5 md:mb-7"
        >
          Venture platform for critical technology
        </motion.span>

        {/* Kinetic headline */}
        <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-white text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8vw] xl:text-[120px] mb-8 md:mb-10">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.18em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease: EASE }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="text-white/55 text-[15px] md:text-[17px] font-medium leading-[1.6] max-w-xl"
          >
            A network of 190 hubs across 39 countries, built into a single
            commercialization engine — infrastructure to build, programs to
            validate, capital to scale, and community to compound.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
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
              <Play className="w-3.5 h-3.5" />
              Explore ventures
            </Link>
          </motion.div>
        </div>

        {/* Slide indicators + scroll cue */}
        <div className="mt-10 md:mt-12 flex items-center justify-between">
          <div className="flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                suppressHydrationWarning
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="min-h-[32px] min-w-[32px] flex items-center"
              >
                <span
                  className={`block h-[2px] transition-all duration-500 ${
                    i === current ? "bg-[#FF4D00] w-12" : "bg-white/25 w-7"
                  }`}
                />
              </button>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1, ease: EASE }}
            className="hidden md:flex items-center gap-2 text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase"
          >
            Scroll
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Metric ticker */}
      <MetricTicker />
    </section>
  );
}

/* ── Metric ticker (marquee) ── */
function MetricTicker() {
  const items = [...tickerMetrics, ...tickerMetrics];
  return (
    <div className="relative z-10 border-t border-white/10 bg-[#0A0A0A] overflow-hidden">
      <div className="flex w-max animate-[scroll_38s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map((m, i) => (
          <div key={i} className="flex items-center gap-3 px-8 py-4 border-r border-white/8 whitespace-nowrap">
            <span className="text-[#FF4D00] text-lg md:text-xl font-display font-medium">{m.value}</span>
            <span className="text-white/40 text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. MANIFESTO BAND — bold statement, marquee + centered thesis
   ══════════════════════════════════════════════════════════════════════════ */
function ManifestoBand() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-[#FAFAFA]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
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
          className="font-display font-medium tracking-[-0.025em] leading-[1.05] text-[30px] sm:text-[40px] md:text-[54px] lg:text-[68px] text-[#111111]"
        >
          The 21st century will be built in the markets that need its
          breakthroughs most.{" "}
          <span className="text-[#111111]/35">
            We are building the infrastructure to make that inevitable.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl"
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
            <div key={b.k} className="border-t border-[#111111]/15 pt-5">
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-3">
                {b.k}
              </p>
              <p className="text-[14px] md:text-[15px] text-[#111111]/70 font-medium leading-[1.6]">
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
   3. PILLAR SHOWCASE — interactive tabbed interface
   ══════════════════════════════════════════════════════════════════════════ */
function PillarShowcase() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const pillar = pillars[active];
  const Icon = pillar.icon;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
              Four pillars, one engine
            </span>
            <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-[#111111]">
              One machine,
              <br />
              <span className="text-[#111111]/35">four compounding parts.</span>
            </h2>
          </div>
          <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.6] max-w-sm">
            Each pillar reinforces the others. Together they form a flywheel no
            single fund, accelerator, or government could replicate alone.
          </p>
        </div>

        {/* Pillar selector tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-10 md:mb-14">
          {pillars.map((p, i) => {
            const PIcon = p.icon;
            const isActive = i === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`group relative text-left p-5 md:p-6 border transition-all duration-300 ${
                  isActive
                    ? "border-[#FF4D00] bg-[#FF4D00]/5"
                    : "border-[#111111]/12 hover:border-[#111111]/40 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <PIcon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-[#FF4D00]" : "text-[#111111]/40"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-[10px] font-mono tracking-[0.2em] ${
                      isActive ? "text-[#FF4D00]" : "text-[#111111]/30"
                    }`}
                  >
                    {p.label}
                  </span>
                </div>
                <p
                  className={`font-display font-medium tracking-tight text-[18px] md:text-[20px] transition-colors ${
                    isActive ? "text-[#111111]" : "text-[#111111]/60"
                  }`}
                >
                  {p.title}
                </p>
                <p className="text-[11px] text-[#111111]/40 font-medium mt-1 hidden md:block">
                  {p.tagline}
                </p>
                {isActive && (
                  <motion.span
                    layoutId="pillar-active-bar"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4D00]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active pillar panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
          >
            {/* Image */}
            <div className="relative overflow-hidden min-h-[320px] lg:min-h-[460px] bg-[#0A0A0A]">
              <img
                src={pillar.image}
                alt={pillar.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 40%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-2 text-white">
                <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase">
                  {pillar.title}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-2 md:p-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] block mb-4">
                  Pillar {pillar.label} — {pillar.tagline}
                </span>
                <p className="text-[16px] md:text-[18px] text-[#111111]/80 font-medium leading-[1.65] mb-8">
                  {pillar.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                  {pillar.stats.map((s) => (
                    <div key={s.label} className="border-t border-[#111111]/15 pt-3">
                      <p className="font-display font-medium text-[26px] md:text-[34px] tracking-tight text-[#111111] leading-none">
                        {s.value}
                      </p>
                      <p className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] uppercase text-[#111111]/45 mt-2">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={pillar.link}
                className="group inline-flex items-center gap-2 self-start px-6 py-3.5 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF4D00] transition-colors"
              >
                Explore {pillar.title}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   4. ROUTE JOURNEY — horizontal interactive leg cards
   ══════════════════════════════════════════════════════════════════════════ */
function RouteJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const legs = routeLegs.slice(0, 6);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
              The Route · 6 legs · 190 hubs
            </span>
            <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
              One corridor.
              <br />
              <span className="text-white/35">Six civilizations deep.</span>
            </h2>
          </div>
          <Link
            to="/routes"
            className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 hover:text-[#FF4D00] transition-colors flex-shrink-0"
          >
            Explore the full Route
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal scroll cards */}
        <div className="-mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 overflow-x-auto scrollbar-thin [scrollbar-color:rgba(255,77,0,0.4)_transparent]">
          <div className="flex gap-4 md:gap-5 pb-6 w-max">
            {legs.map((leg, i) => (
              <motion.div
                key={leg.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <Link
                  to="/routes"
                  className="group block w-[280px] md:w-[320px] border border-white/12 hover:border-[#FF4D00] bg-white/[0.02] hover:bg-white/[0.05] transition-colors p-6 md:p-7 h-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FF4D00]">
                      LEG {leg.legNumber}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.1em] text-white/40">
                      <MapPin className="w-3 h-3" />
                      {leg.hubCount} hubs
                    </span>
                  </div>

                  <h3 className="font-display font-medium tracking-tight text-[22px] md:text-[24px] leading-[1.15] mb-2 group-hover:text-[#FF4D00] transition-colors">
                    {leg.name}
                  </h3>
                  <p className="text-[12px] text-white/40 italic font-medium leading-[1.5] mb-5 line-clamp-2">
                    “{leg.subtitle}”
                  </p>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/30 mb-1.5">
                      Primary flow
                    </p>
                    <p className="text-[12px] text-white/65 font-medium leading-[1.5] line-clamp-2">
                      {leg.primaryFlow}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {leg.countries.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="text-[9px] font-mono tracking-[0.05em] uppercase text-white/50 border border-white/12 px-2 py-1"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/30 group-hover:text-[#FF4D00] transition-colors">
                    Enter leg
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   5. VENTURE GALLERY — filterable grid from real venture data
   ══════════════════════════════════════════════════════════════════════════ */
function VentureGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const verticals = useMemo(() => {
    const set = new Set(venturesData.map((v) => v.vertical));
    return ["All", ...Array.from(set)];
  }, []);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? venturesData.slice(0, 9)
        : venturesData.filter((v) => v.vertical === filter).slice(0, 9),
    [filter]
  );

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
              The portfolio · 40+ ventures
            </span>
            <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-[#111111]">
              Critical technology,
              <br />
              <span className="text-[#111111]/35">for the markets that need it most.</span>
            </h2>
          </div>
          <Link
            to="/ventures"
            className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/50 hover:text-[#FF4D00] transition-colors flex-shrink-0"
          >
            All ventures
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {verticals.map((v) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-[0.12em] uppercase border transition-colors ${
                filter === v
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-transparent text-[#111111]/55 border-[#111111]/15 hover:border-[#111111]/40"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((v, i) => (
              <motion.div
                key={v.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06, ease: EASE }}
              >
                <Link
                  to={`/ventures/${v.id}`}
                  className="group block h-full border border-[#111111]/12 hover:border-[#111111] bg-white p-6 md:p-7 transition-colors"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono tracking-[0.15em] text-[#FF4D00] font-bold">
                      {v.code}
                    </span>
                    <span className="text-[9px] font-mono tracking-[0.1em] uppercase text-[#111111]/40 border border-[#111111]/12 px-2 py-1">
                      {v.vertical}
                    </span>
                  </div>

                  <h3 className="font-display font-medium tracking-tight text-[26px] md:text-[30px] text-[#111111] mb-4 group-hover:text-[#FF4D00] transition-colors">
                    {v.name}
                  </h3>

                  <p className="text-[13px] text-[#111111]/60 font-medium leading-[1.55] line-clamp-3 mb-6">
                    {v.problem}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#111111]/10">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.1em] uppercase text-[#111111]/45">
                      <MapPin className="w-3 h-3" />
                      {v.pilotLocations.split(",")[0]}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-1 ${
                        v.launchModel === "Light"
                          ? "text-green-600 bg-green-50"
                          : "text-[#FF4D00] bg-[#FF4D00]/5"
                      }`}
                    >
                      {v.launchModel}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   6. IMPACT NUMBERS — animated count-up
   ══════════════════════════════════════════════════════════════════════════ */
function ImpactNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 5000, prefix: "", suffix: "+", label: "Companies on the Route", icon: Rocket },
    { value: 1, prefix: "$", suffix: "T+", label: "Projected portfolio value at scale", icon: TrendingUp },
    { value: 200, prefix: "", suffix: "+", label: "Unicorns projected", icon: Zap },
    { value: 190, prefix: "", suffix: "", label: "Hubs across 39 countries", icon: Globe2 },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
            The scale we are building toward
          </span>
          <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-[#111111]">
            Not a fund. An operating system.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#111111]/12 border border-[#111111]/12">
          {stats.map((s, i) => {
            const SIcon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="bg-white p-7 md:p-9 flex flex-col"
              >
                <SIcon className="w-5 h-5 text-[#FF4D00] mb-6" strokeWidth={1.5} />
                <div className="font-display font-medium tracking-[-0.03em] leading-none text-[#111111] text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] mb-4">
                  <Counter
                    end={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    active={isInView}
                  />
                </div>
                <p className="text-[11px] md:text-[12px] font-mono tracking-[0.1em] uppercase text-[#111111]/50 leading-[1.5]">
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
   7. FLYWHEEL — visual compounding loop
   ══════════════════════════════════════════════════════════════════════════ */
function FlywheelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
            The compounding loop
          </span>
          <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
            Each pillar spins the next.
          </h2>
          <p className="mt-6 text-[14px] md:text-[15px] text-white/50 font-medium leading-[1.6] max-w-xl mx-auto">
            Infrastructure lowers the cost of ventures. Ventures create deal flow
            for capital. Capital funds more infrastructure. Community compounds
            all of it.
          </p>
        </div>

        {/* Flywheel diagram */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-[#FF4D00] flex flex-col items-center justify-center"
            >
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 mb-1.5" strokeWidth={1.5} />
              <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
                Flywheel
              </span>
            </motion.div>
          </div>

          {/* Rotating ring */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-square max-w-[520px] mx-auto"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-white/15"
            />
            {/* Stage nodes */}
            {flywheel.map((stage, i) => {
              const angle = (i / flywheel.length) * 360 - 90;
              const rad = (angle * Math.PI) / 180;
              const SIcon = stage.icon;
              return (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: EASE }}
                  className="absolute w-28 md:w-36"
                  style={{
                    left: `${50 + 42 * Math.cos(rad)}%`,
                    top: `${50 + 42 * Math.sin(rad)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-[#111111] flex items-center justify-center mb-2">
                      <SIcon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                    </div>
                    <p className="font-display font-medium text-[13px] md:text-[14px] tracking-tight">
                      {stage.label}
                    </p>
                    <p className="text-[9px] md:text-[10px] font-mono tracking-[0.08em] uppercase text-white/40 mt-0.5">
                      {stage.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   8. VOICES — editorial pull quotes
   ══════════════════════════════════════════════════════════════════════════ */
function VoicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
            Operating beliefs
          </span>
          <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-[#111111]">
            What we hold to be true.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#111111]/12 border border-[#111111]/12">
          {voices.map((v, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="bg-[#FAFAFA] p-8 md:p-10 flex flex-col"
            >
              <span className="font-display text-[#FF4D00] text-5xl leading-none mb-4">“</span>
              <blockquote className="text-[18px] md:text-[20px] font-display font-medium tracking-tight leading-[1.35] text-[#111111] mb-8 flex-1">
                {v.quote}
              </blockquote>
              <figcaption className="border-t border-[#111111]/12 pt-4">
                <p className="text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-[#111111]">
                  {v.name}
                </p>
                <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-[#111111]/40 mt-1">
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
   9. FINAL CTA — full-bleed, bold
   ══════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1920&q=80"
          alt="City lights across Africa at night"
          className="w-full h-full object-cover opacity-25"
          style={{ objectPosition: "center 45%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/60" />
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
              <Layers className="w-4 h-4" />
              Apply to build
            </Link>
            <Link
              to="/community"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors"
            >
              <Users className="w-4 h-4" />
              Join community
            </Link>
          </div>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mt-20 md:mt-28 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-white/50">
            <Cpu className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
              xCelero Labs · Critical technology for emerging markets
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
