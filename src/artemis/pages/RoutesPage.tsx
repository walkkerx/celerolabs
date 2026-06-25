"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MapPin,
  Package,
  Banknote,
  Database,
  Users,
  Clock,
  Sun,
  Compass,
  Flame,
  Anchor,
  Check,
  Route,
  Sparkles,
  Rocket,
  Building2,
  Coins,
  X,
} from "lucide-react";
import { Link } from "@/artemis/router";
import {
  routeLegs,
  annualSchedule,
  routeMetrics,
  arcPricing,
  fullRoutePricing,
  arcImages,
  MAP_LOCATIONS,
} from "@/artemis/data/routes";
import type { RouteLeg, KeyCity, MapLocation, ArcPricing } from "@/artemis/data/routes";

/* ══════════════════════════════════════════════════════════════════════════
   ROUTES BRIDGE: Cinematic hero + stat strip + editorial text/map layout
   ══════════════════════════════════════════════════════════════════════════ */

const routesBridgeImages = [
  {
    src: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?auto=format&fit=crop&w=1600&q=80",
    alt: "Nairobi skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1741991110666-88115e724741?auto=format&fit=crop&w=800&q=80",
    alt: "African cityscape",
  },
  {
    src: "https://images.unsplash.com/photo-1669127300649-940337f1487e?auto=format&fit=crop&w=800&q=80",
    alt: "African city development",
  },
];

const bridgeStats = [
  { value: "190", label: "Hubs" },
  { value: "39", label: "Countries" },
  { value: "6", label: "Route Legs" },
  { value: "1", label: "Year Circuit" },
];

/* Dot-matrix world map for Routes page */
const routesWorldDots = (() => {
  const rows = [
    ".......##..........###.............#####..####..............",
    "......####.........####............######.######............",
    ".....######........#####...........########.######..........",
    ".....#######.......#####..........#########..######.........",
    "....#########......######.........#########...######........",
    "....##########.....#######........#########....#####........",
    "...############....########.......########.....#####........",
    "...############....########.......########......####........",
    "....###########....#########......#######.......####........",
    "....##########.....##########.....######........###.........",
    ".....#########.....##########.....######........###.........",
    "......########.....###########....#####.........##..........",
    ".......#######.....###########....#####.........##..........",
    "........######.....############...######.........#..........",
    ".........#####.....####.#####....########...................",
    "..........####.....####..####...#########...................",
    "...........###.....####...####..#########...................",
    "............##.....####....###..########....................",
    ".............#......###....###..#######.....................",
    "....................###.....##...######.....................",
    ".....................##.....##...#####......................",
    "......................##.....#...####.......................",
    ".......................#.........###........................",
    "................................##.........................",
    "................................#..........................",
    "............................................................",
    "............................................................",
    "............................................................",
    "............................................................",
    "............................................................",
  ];
  const dots: { row: number; col: number }[] = [];
  rows.forEach((row, r) => {
    [...row].forEach((ch, c) => {
      if (ch === "#") dots.push({ row: r, col: c });
    });
  });
  return dots;
})();

function RoutesBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="border-b border-[#111111]/10">
      {/* ── Contained hero image + stat strip ── */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto overflow-hidden rounded-sm">
          {/* ── Cinematic hero image ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-[55vh] md:h-[68vh] overflow-hidden"
          >
            <img
              src={routesBridgeImages[0].src}
              alt={routesBridgeImages[0].alt}
              className="w-full h-full object-cover grayscale"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/20 to-transparent" />
            {/* overlaid label + title */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-10 md:pb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-3 block">
                  Ba-Hanse Network
                </span>
                <h2 className="text-[42px] sm:text-[60px] md:text-[76px] lg:text-[92px] font-display font-medium leading-none tracking-[-0.03em] text-white">
                  The world operates<br />
                  in <span className="italic text-[#FF4D00]">flow</span>.
                </h2>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Stat strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {bridgeStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-6 md:px-10 lg:px-14 py-7 md:py-9 flex flex-col gap-1 ${
                  i < bridgeStats.length - 1 ? "border-r border-[#111111]/10" : ""
                }`}
              >
                <span className="text-[36px] md:text-[44px] font-display font-medium tracking-[-0.03em] text-[#111111] leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-[#111111]/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Editorial text + dotted map ── */}
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: two stacked images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <div className="aspect-[3/2] sm:aspect-[4/3] overflow-hidden bg-[#F5F5F5] max-h-[200px] sm:max-h-none">
              <img
                src={routesBridgeImages[1].src}
                alt={routesBridgeImages[1].alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="aspect-[3/2] sm:aspect-[4/3] overflow-hidden bg-[#F5F5F5] max-h-[200px] sm:max-h-none">
              <img
                src={routesBridgeImages[2].src}
                alt={routesBridgeImages[2].alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Right: thesis + dotted map */}
          <div className="lg:col-span-8 flex flex-col gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[19px] md:text-[23px] lg:text-[27px] leading-[1.35] font-display font-medium tracking-[-0.02em] text-[#111111] mb-6 md:mb-8 max-w-2xl">
                The Hanseatic League connected 190 cities through shared covenants for trade, law, and mutual defense. It lasted 300 years and made its member cities the wealthiest in Europe — not through conquest, but through <span className="text-[#FF4D00]">flow</span>.
              </p>
              <p className="text-[14px] md:text-[16px] leading-[1.75] text-[#111111]/55 font-medium max-w-xl">
                The Ba-Hanse is not a copy of that League. It is a new union, inspired by it, for a different continent, a different philosophy, a different century. 190 hubs, 39 countries, one circulatory system where prosperity is designed to flow.{" "}
                <span className="text-[#111111] font-semibold">Where flow connects, mutual flourishing follows.</span>
              </p>
            </motion.div>

            {/* Dotted map — full width of the right column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full"
            >
              <svg
                viewBox="0 0 60 30"
                className="w-full h-auto"
                style={{ imageRendering: "auto" }}
              >
                {routesWorldDots.map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.col * 1}
                    cy={dot.row * 1}
                    r="0.35"
                    className="fill-[#111111]/20"
                  />
                ))}
                {routesWorldDots
                  .filter(
                    (d) =>
                      d.col >= 23 && d.col <= 33 && d.row >= 3 && d.row <= 21
                  )
                  .map((dot, i) => (
                    <circle
                      key={`af-${i}`}
                      cx={dot.col * 1}
                      cy={dot.row * 1}
                      r="0.42"
                      className="fill-[#FF4D00]"
                    />
                  ))}
              </svg>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-[#111111]/30">
                  Ba-Hanse Circuit — 39 Countries
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-[#FF4D00]">
                  6 Legs · 190 Hubs
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ══════════════════════════════════════════════════════════════════════════
   BA-HANSE FORMAT SECTION: The four modalities of the Ba-Hanse experience
   ══════════════════════════════════════════════════════════════════════════ */
function BaHanseFormatSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const formatItems = [
    {
      number: "01",
      icon: Route,
      title: "Flow Immersions",
      description:
        "Deep-dive cohort experiences in each hub city. Not observation — participation. You enter the flow of goods, capital, data, and people, and you shape it from inside.",
    },
    {
      number: "02",
      icon: Database,
      title: "Covenant Sprints",
      description:
        "Intensive sessions where the cohort convenes operators, regulators, and builders to design the arrangements the Route needs. Cross-border value flows, shared infrastructure, identity systems — co-designed with the people who will live inside them.",
    },
    {
      number: "03",
      icon: Users,
      title: "Commons Feasts",
      description:
        "Every leg culminates in a shared meal that is also a shared deliberation. Jollof cook-offs in Lagos, tea ceremonies in Agadez, dhow dinners in Mombasa. Food as treaty. Table as parliament.",
    },
    {
      number: "04",
      icon: Compass,
      title: "Heritage Walks",
      description:
        "Guided walks through sites of memory and consequence. Not tourism — witnessing. From slave castles to manuscript libraries, each walk places the Route in the long arc of human exchange.",
    },
  ];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto bg-[#111111] rounded-sm overflow-hidden">
      {/* Header row */}
      <div className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 md:pb-16 border-b border-white/10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-4 block">
              The Format
            </span>
            <h2 className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[50px] leading-[1.1] font-display font-medium tracking-[-0.025em] text-white max-w-2xl">
              Not a tour. Not a conference.<br />
              A mobile university.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13px] md:text-[14px] leading-[1.75] text-white/40 font-medium max-w-xs md:max-w-sm md:text-right"
          >
            10–100 XCitizens per cohort. Rolling departures. One year, six legs, four pillars: Ventures, Infrastructure, Capital, Community.
          </motion.p>
        </div>
      </div>

      {/* Numbered list */}
      <div className="w-full">
        {formatItems.map((item, i) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`group px-6 md:px-12 lg:px-20 py-10 md:py-12 grid md:grid-cols-12 gap-6 md:gap-10 items-start hover:bg-white/[0.025] transition-colors ${
              i < formatItems.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            {/* Number */}
            <div className="md:col-span-1 flex items-start pt-1">
              <span className="text-[13px] font-mono font-bold tracking-[0.15em] text-[#FF4D00]">
                {item.number}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="md:col-span-4 flex items-start gap-4">
              <div className="mt-0.5 w-9 h-9 shrink-0 flex items-center justify-center border border-white/10 group-hover:border-[#FF4D00]/40 transition-colors">
                <item.icon className="w-4 h-4 text-white/40 group-hover:text-[#FF4D00] transition-colors" />
              </div>
              <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-[-0.02em] text-white leading-tight pt-0.5">
                {item.title}
              </h3>
            </div>

            {/* Description */}
            <div className="md:col-span-7">
              <p className="text-[14px] md:text-[15px] leading-[1.8] text-white/45 font-medium">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
        className="px-6 md:px-12 lg:px-20 py-10 md:py-12 border-t border-white/10"
      >
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-white/20">
          Hosting events · Convening conversations · Pushing for policy · Building ventures at every port
        </p>
      </motion.div>
      </div>
    </section>
  );
}



/* ══════════════════════════════════════════════════════════════════════════
   ROUTES PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function RoutesPage() {
  const [activeLeg, setActiveLeg] = useState<string | null>(null);
  const [expandedLeg, setExpandedLeg] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play: cycle through legs every 4 seconds when no manual selection
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveLeg((prev) => {
        const currentIdx = prev
          ? routeLegs.findIndex((l) => l.id === prev)
          : -1;
        const nextIdx = (currentIdx + 1) % routeLegs.length;
        return routeLegs[nextIdx].id;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Manual leg selection: stops auto-play
  const manualSetActiveLeg = useCallback((id: string | null) => {
    setIsAutoPlaying(false);
    setActiveLeg(id);
  }, []);

  // Synchronized: map click expands accordion, accordion hover/click highlights map
  const handleLegSelectFromMap = useCallback((legId: string) => {
    setIsAutoPlaying(false);
    setActiveLeg(legId);
    setExpandedLeg(legId);
    // Scroll to the accordion panel after a brief delay for expansion
    setTimeout(() => {
      const el = document.getElementById(`leg-${legId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const handleLegSelectFromAccordion = useCallback((legId: string) => {
    if (!isAutoPlaying) {
      setActiveLeg(legId);
    }
  }, [isAutoPlaying]);

  const handleLegDeselectFromAccordion = useCallback(() => {
    if (!isAutoPlaying) {
      setActiveLeg(null);
    }
  }, [isAutoPlaying]);

  return (
    <div className="bg-[#FAFAFA] text-[#111111]">
      <HeroSection />
      <PreambleSection />
      <RoutesBridge />
      <BaHanseFormatSection />
      <MapSection
        activeLeg={activeLeg}
        setActiveLeg={manualSetActiveLeg}
        onLegSelectFromMap={handleLegSelectFromMap}
        isAutoPlaying={isAutoPlaying}
      />
      <ArcAccordion
        expandedLeg={expandedLeg}
        setExpandedLeg={setExpandedLeg}
        activeLeg={activeLeg}
        setActiveLeg={manualSetActiveLeg}
        onLegHover={handleLegSelectFromAccordion}
        onLegHoverEnd={handleLegDeselectFromAccordion}
      />
      <JourneySection />
      <PricingSection />
      <InvitationSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO SECTION, Editorial, centered, clean
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative bg-white text-[#111111] pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28 px-5 sm:px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div ref={ref} className="w-full max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Small label */}
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 md:mb-12">
            The Ba-Hanse
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-8 md:mb-10">
            Borders are not the real geography.{" "}
            <span className="italic font-serif text-[#FF4D00]">Flow</span> is.
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-[1.6] text-[#111111]/50 font-medium max-w-2xl mb-10 sm:mb-14 md:mb-20">
            A union of flow. Six legs. 190+ hubs. 35+ countries. One circulatory
            system where goods, capital, data, and people move not across borders,
            but through them.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-10 md:gap-x-16">
            {[
              { value: "6", label: "Legs" },
              { value: "190+", label: "Hub Cities" },
              { value: "35+", label: "Countries" },
              { value: "100", label: "XCitizens/cohort" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                className="text-center min-w-[60px]"
              >
                <div className="text-[26px] sm:text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] text-[#111111]">
                  {m.value}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PREAMBLE SECTION: Dark immersive Ba-Hanse manifesto
   ══════════════════════════════════════════════════════════════════════════ */
function PreambleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto bg-[#0A0A0A] rounded-sm overflow-hidden">

        {/* ── Opening statement: political cages ── */}
        <div className="px-8 md:px-14 lg:px-20 pt-16 md:pt-24 pb-12 md:pb-16 border-b border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00]/60 mb-6 block">
              The Ba-Hanse Manifesto
            </span>
            <h2 className="text-[28px] sm:text-[38px] md:text-[50px] lg:text-[62px] font-display font-medium leading-[1.08] tracking-[-0.03em] text-white max-w-4xl">
              It&apos;s a diagram of <span className="italic text-[#FF4D00]">political cages</span>. Lines drawn by men who never walked the terrain.
            </h2>
          </motion.div>
        </div>

        {/* ── Historical parallel + map: split grid ── */}
        <div className="grid lg:grid-cols-12 border-b border-white/[0.06]">
          {/* Left: Hanseatic League narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 px-8 md:px-14 lg:px-20 py-14 md:py-20 lg:border-r border-white/[0.06]"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-white/30">
                Historical Parallel · 1356
              </span>
            </div>
            <p className="text-[18px] md:text-[22px] lg:text-[26px] leading-[1.35] font-display font-medium tracking-[-0.02em] text-white/90 mb-8">
              The Hanseatic League understood this in 1356. They didn&apos;t build a nation — they built a network of 190 cities connected by shared covenants for trade, law, and mutual defense.
            </p>
            <p className="text-[15px] md:text-[17px] leading-[1.75] text-white/40 font-medium mb-10">
              The League lasted 300 years and made its member cities the wealthiest in Europe. Not through conquest, but through <span className="text-white font-semibold">flow</span>.
            </p>

            {/* Key stats row */}
            <div className="grid grid-cols-3 gap-px bg-white/[0.06]">
              {[
                { value: "190", label: "Cities" },
                { value: "300", label: "Years" },
                { value: "1", label: "Covenant" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0A0A0A] px-2 sm:px-4 py-4 sm:py-5 text-center">
                  <span className="text-[24px] md:text-[30px] font-display font-medium tracking-[-0.02em] text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="block text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/20 mt-1.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Dot map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 px-8 md:px-14 lg:px-20 py-14 md:py-20 flex flex-col justify-between"
          >
            <div className="mb-8">
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00]/50 mb-3 block">
                The Ba-Hanse Circuit
              </span>
              <p className="text-[13px] md:text-[14px] leading-[1.75] text-white/30 font-medium max-w-sm">
                From the Gulf of Guinea to the Horn, through the Sahel and along the Swahili Coast — the Ba-Hanse traces the routes where civilizations have always exchanged goods, ideas, and people.
              </p>
            </div>
            <div className="relative w-full">
              <svg
                viewBox="0 0 60 30"
                className="w-full h-auto"
                style={{ imageRendering: "auto" }}
              >
                {routesWorldDots.map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.col * 1}
                    cy={dot.row * 1}
                    r="0.35"
                    className="fill-white/[0.07]"
                  />
                ))}
                {routesWorldDots
                  .filter(
                    (d) =>
                      d.col >= 23 && d.col <= 33 && d.row >= 3 && d.row <= 21
                  )
                  .map((dot, i) => (
                    <circle
                      key={`af-${i}`}
                      cx={dot.col * 1}
                      cy={dot.row * 1}
                      r="0.45"
                      className="fill-[#FF4D00]"
                    />
                  ))}
              </svg>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/15">
                  Ba-Hanse Circuit — {routeMetrics.countries} Countries
                </span>
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]/60">
                  6 Legs · {routeMetrics.hubs} Hubs
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── The Ba-Hanse definition: full-width manifesto ── */}
        <div className="px-8 md:px-14 lg:px-20 py-14 md:py-20 border-b border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-white/20 mb-6 block">
              Definition
            </span>
            <p className="text-[16px] md:text-[19px] lg:text-[22px] leading-[1.5] font-display font-medium tracking-[-0.015em] text-white/80 mb-6">
              We are not rebuilding the League. We are birthing something inspired by it for a different continent, a different philosophy, a different century.
            </p>
            <p className="text-[15px] md:text-[17px] leading-[1.8] text-white/35 font-medium mb-8">
              The Ba-Hanse: a union of micro-cities, borderless, interdependent, prosperous by design. Where deals are not transactions but acts of <span className="text-white/70 font-semibold">mutual flourishing</span>. Where a prototype in one city becomes infrastructure for ten. Where talent, capital, and knowledge circulate like water.
            </p>
            {/* Flow attributes */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Sparkles, text: "Próspera's ethos of wealth creation for everyone" },
                { icon: Compass, text: "Praxis's pursuit of heroism, truth, and beauty" },
              ].map((attr) => (
                <div key={attr.text} className="flex items-start gap-3 px-5 py-4 border border-white/[0.06] hover:border-[#FF4D00]/20 transition-colors">
                  <attr.icon className="w-4 h-4 text-[#FF4D00]/60 mt-0.5 shrink-0" />
                  <span className="text-[13px] leading-[1.6] text-white/40 font-medium">
                    {attr.text}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[13px] md:text-[14px] leading-[1.75] text-white/25 font-medium mt-6">
              — and xCelero carries it all toward the next epoch of human civilization.
            </p>
          </motion.div>
        </div>

        {/* ── Semester at Sea + closing ── */}
        <div className="grid lg:grid-cols-12">
          {/* Left: Semester at Sea narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 px-8 md:px-14 lg:px-20 py-14 md:py-20 lg:border-r border-white/[0.06]"
          >
            <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-white/20 mb-6 block">
              The Format
            </span>
            <p className="text-[16px] md:text-[19px] leading-[1.7] text-white/50 font-medium mb-6">
              Think of it as Semester at Sea with a twist: cohorts of 10–100 XCitizens moving through the regions, countries, and historical innovation periods that will define the next century.
            </p>
            <p className="text-[14px] md:text-[16px] leading-[1.75] text-white/30 font-medium mb-8">
              Not tourists. Not consultants. A mobile university for civilizational prototyping — hosting events, convening conversations, pushing for policy, and building ventures at every port.
            </p>
            {/* Four pillars strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06]">
              {[
                { label: "Ventures", icon: Rocket },
                { label: "Infrastructure", icon: Building2 },
                { label: "Capital", icon: Coins },
                { label: "Community", icon: Users },
              ].map((pillar) => (
                <div key={pillar.label} className="bg-[#0A0A0A] px-4 py-5 flex flex-col items-center gap-2">
                  <pillar.icon className="w-4 h-4 text-[#FF4D00]/50" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/30">
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Closing statement + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 px-8 md:px-14 lg:px-20 py-14 md:py-20 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-[22px] md:text-[28px] lg:text-[34px] font-display font-medium leading-[1.15] tracking-[-0.02em] text-white mb-6">
                You can&apos;t prototype civilization from a desk.
              </h3>
              <p className="text-[14px] leading-[1.75] text-white/30 font-medium">
                {routeMetrics.countries} countries. {routeMetrics.hubs} hubs. One cohort. Civilizational prototyping, at micro-scale.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] mt-10">
              {[
                { value: routeMetrics.countries, label: "Countries" },
                { value: String(routeMetrics.hubs), label: "Hubs" },
                { value: "6", label: "Legs" },
                { value: "10–100", label: "XCitizens" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0A0A0A] px-3 sm:px-5 py-4 sm:py-6">
                  <span className="text-[22px] sm:text-[28px] md:text-[34px] font-display font-medium tracking-[-0.03em] text-[#FF4D00] leading-none">
                    {stat.value}
                  </span>
                  <span className="block text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/20 mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAP SECTION, Blueprint-style: static world map image + positioned pins
   + dynamic header + slide-in side panel
   ══════════════════════════════════════════════════════════════════════════ */
function MapSection({
  activeLeg,
  setActiveLeg,
  onLegSelectFromMap,
  isAutoPlaying,
}: {
  activeLeg: string | null;
  setActiveLeg: (id: string | null) => void;
  onLegSelectFromMap: (legId: string) => void;
  isAutoPlaying: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="border-b border-[#111111]/10">
      {/* Section label + filter buttons */}
      <div className="py-12 md:py-16 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
              The Six Legs, Interactive Map
            </span>
            {isAutoPlaying && (
              <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                Auto-playing
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveLeg(null)}
              className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase border transition-colors ${
                activeLeg === null
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
              }`}
            >
              All Legs
            </button>
            {routeLegs.map((leg) => (
              <button
                key={leg.id}
                onClick={() => setActiveLeg(activeLeg === leg.id ? null : leg.id)}
                className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase border transition-colors ${
                  activeLeg === leg.id
                    ? "text-white border-transparent"
                    : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
                }`}
                style={activeLeg === leg.id ? { backgroundColor: leg.color, borderColor: leg.color } : {}}
              >
                {leg.legNumber}. {leg.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-8 md:py-12 px-6 md:px-12 lg:px-20 bg-white"
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <BlueprintMap activeLeg={activeLeg} setActiveLeg={setActiveLeg} onLegSelectFromMap={onLegSelectFromMap} isAutoPlaying={isAutoPlaying} />
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BLUEPRINT MAP, Newlab-style: static world map image + positioned pin
   markers with always-visible labels + slide-in detail panel
   Based on: https://github.com/Questy708/map2-
   ══════════════════════════════════════════════════════════════════════════ */
function BlueprintMap({
  activeLeg,
  setActiveLeg,
  onLegSelectFromMap,
  isAutoPlaying,
}: {
  activeLeg: string | null;
  setActiveLeg: (id: string | null) => void;
  onLegSelectFromMap: (legId: string) => void;
  isAutoPlaying: boolean;
}) {
  const [activeLocId, setActiveLocId] = useState<string | null>(null);
  const isAnyActive = activeLeg !== null;

  // Compute center of each leg's cities for zoom transform-origin
  const legCenters = useMemo(() => {
    const centers: Record<string, { x: number; y: number }> = {};
    routeLegs.forEach((leg) => {
      const locs = MAP_LOCATIONS.filter((l) => l.legId === leg.id);
      if (locs.length > 0) {
        centers[leg.id] = {
          x: locs.reduce((sum, l) => sum + l.x, 0) / locs.length,
          y: locs.reduce((sum, l) => sum + l.y, 0) / locs.length,
        };
      }
    });
    return centers;
  }, []);

  // Build curved arc paths connecting cities within each leg
  const legArcPaths = useMemo(() => {
    const paths: Record<string, string> = {};
    routeLegs.forEach((leg) => {
      const locs = MAP_LOCATIONS.filter((l) => l.legId === leg.id);
      if (locs.length < 2) return;
      const parts: string[] = [`M ${locs[0].x} ${locs[0].y}`];
      for (let i = 1; i < locs.length; i++) {
        const prev = locs[i - 1];
        const curr = locs[i];
        const mx = (prev.x + curr.x) / 2;
        const my = (prev.y + curr.y) / 2;
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        // Perpendicular offset for a subtle arc bow
        const curvature = -0.8;
        const cx = mx + (-dy / len) * curvature;
        const cy = my + (dx / len) * curvature;
        parts.push(`Q ${cx} ${cy} ${curr.x} ${curr.y}`);
      }
      paths[leg.id] = parts.join(" ");
    });
    return paths;
  }, []);

  // Zoom transform targeting the active leg's region
  const mapTransform = useMemo(() => {
    if (activeLeg && legCenters[activeLeg]) {
      return {
        transform: "scale(1.1)",
        transformOrigin: `${legCenters[activeLeg].x}% ${legCenters[activeLeg].y}%`,
        transition: "transform 0.8s ease",
      };
    }
    return {
      transform: "scale(1)",
      transformOrigin: "50% 50%",
      transition: "transform 0.8s ease",
    };
  }, [activeLeg, legCenters]);

  const activeLocData = useMemo(
    () => MAP_LOCATIONS.find((l) => l.id === activeLocId),
    [activeLocId]
  );

  const visibleLocations = useMemo(
    () => (isAnyActive ? MAP_LOCATIONS.filter((l) => l.legId === activeLeg) : MAP_LOCATIONS),
    [isAnyActive, activeLeg]
  );

  const legOfActive = activeLocData
    ? routeLegs.find((l) => l.id === activeLocData.legId)
    : null;

  const scrollToLeg = useCallback((legId: string) => {
    const el = document.getElementById(`leg-${legId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="w-full relative">
      {/* Auto-playing indicator on map */}
      {isAutoPlaying && (
        <div className="absolute top-3 right-3 z-50 flex items-center gap-1.5 bg-white/90 border border-[#111111]/10 px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
          <span className="text-[9px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]/70">
            Auto-playing
          </span>
        </div>
      )}

      {/* Map container with zoom */}
      <div
        className="w-full overflow-x-auto bg-white [-webkit-overflow-scrolling:touch]"
      >
      <div
        className="relative min-w-[600px] md:min-w-0"
        style={mapTransform}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setActiveLocId(null);
          }
        }}
      >
        {/* World map image, Newlab topographic map */}
        <img
          alt="World Map showing xCelero Routes"
          className="w-full h-auto pointer-events-none select-none opacity-80"
          src="/routes/newlab-map.avif"
        />

        {/* SVG overlay for route arcs and city markers */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Route arcs for each leg */}
          {routeLegs.map((leg) => {
            const path = legArcPaths[leg.id];
            if (!path) return null;
            const isActive = activeLeg === leg.id;
            const isDimmed = isAnyActive && !isActive;
            return (
              <g key={leg.id}>
                {/* Glow layer for active arc */}
                {isActive && (
                  <path
                    d={path}
                    fill="none"
                    stroke="#FF4D00"
                    strokeWidth={2}
                    strokeLinecap="round"
                    opacity={0.35}
                    filter="url(#arc-glow)"
                  />
                )}
                {/* Main arc path */}
                <motion.path
                  d={path}
                  fill="none"
                  strokeLinecap="round"
                  animate={{
                    stroke: isActive ? "#FF4D00" : leg.color,
                    strokeWidth: isActive ? 1.0 : 0.4,
                    opacity: isDimmed ? 0.15 : isActive ? 0.9 : 0.5,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </g>
            );
          })}

          {/* City marker dots with pulse animation */}
          {MAP_LOCATIONS.map((loc) => {
            const isActiveLeg = activeLeg === loc.legId;
            const isDimmed = isAnyActive && !isActiveLeg;
            return (
              <g key={`svg-marker-${loc.id}`}>
                {/* Pulse ring for active leg cities */}
                {isActiveLeg && (
                  <motion.circle
                    cx={loc.x}
                    cy={loc.y}
                    fill="none"
                    stroke={loc.legColor}
                    strokeWidth={0.3}
                    animate={{
                      r: [1, 2.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                {/* Core dot */}
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  fill={loc.legColor}
                  opacity={isDimmed ? 0.12 : 0.9}
                  animate={isActiveLeg ? {
                    r: [0.8, 1.2, 0.8],
                  } : { r: 0.6 }}
                  transition={isActiveLeg ? {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  } : { duration: 0.3 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Pin markers with always-visible labels */}
        {visibleLocations.map((loc, index) => {
          const isActive = activeLocId === loc.id;
          return (
            <div
              key={loc.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${isActive ? "z-40" : "z-10"}`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 }}
                className="relative flex items-center justify-center"
              >
                {/* Colored marker dot */}
                <button
                  onClick={() => {
                    setActiveLocId(activeLocId === loc.id ? null : loc.id);
                    setActiveLeg(loc.legId);
                    onLegSelectFromMap(loc.legId);
                  }}
                  className={`relative w-3.5 h-3.5 md:w-4 md:h-4 rounded-full shrink-0 cursor-pointer transition-all duration-200 border-[2.5px] border-transparent hover:border-black/20 hover:scale-110 ${isActive ? "scale-125 border-black/30" : ""}`}
                  style={{ backgroundColor: loc.legColor }}
                  aria-label={`View ${loc.name}`}
                />

                {/* Always-visible label — hidden on small screens to prevent overlap */}
                <div
                  className={`hidden sm:block absolute bg-[#111111] text-white font-mono text-[8px] md:text-[10px] font-bold tracking-[0.15em] px-2 py-1 md:px-3 md:py-1.5 whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none shadow-sm transition-all duration-200 ${
                    isActive ? "bg-black" : ""
                  } ${loc.labelPos === "left" ? "right-full mr-2 md:mr-3" : "left-full ml-2 md:ml-3"}`}
                >
                  {loc.name}
                </div>
              </motion.div>
            </div>
          );
        })}

        {/* Info Panel Overlay, bottom sheet on mobile, side panel on desktop */}
        <AnimatePresence>
          {activeLocData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 top-auto sm:inset-x-auto sm:left-auto sm:top-4 sm:bottom-4 sm:right-4 w-full sm:w-72 md:w-80 lg:w-96 max-h-[85vh] sm:max-h-none bg-white border border-[#111111]/10 shadow-2xl p-5 sm:p-6 md:p-8 flex flex-col z-50 overflow-y-auto rounded-t-lg sm:rounded-none"
            >
              <button
                onClick={() => setActiveLocId(null)}
                className="absolute top-4 right-4 p-2 text-[#111111]/30 hover:text-[#111111] transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Leg indicator */}
              <div className="flex items-center gap-2 mb-4 mt-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: activeLocData.legColor }}
                />
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase" style={{ color: activeLocData.legColor }}>
                  Leg {activeLocData.legNumber}
                </span>
              </div>

              {/* City name */}
              <h3 className="text-2xl font-display font-medium uppercase tracking-tight text-[#111111] mb-4 pr-8">
                {activeLocData.name}
              </h3>

              <div className="w-10 h-1 mb-5" style={{ backgroundColor: activeLocData.legColor }} />

              <div className="space-y-6">
                {/* About */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-2" style={{ color: activeLocData.legColor }}>
                    About
                  </h4>
                  <p className="text-[#111111]/60 text-sm leading-relaxed">
                    {activeLocData.description}
                  </p>
                </div>

                {/* Route info */}
                {legOfActive && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-2" style={{ color: activeLocData.legColor }}>
                      Route
                    </h4>
                    <p className="text-sm font-display font-medium text-[#111111]/70">
                      {legOfActive.name}
                    </p>
                    <p className="text-xs text-[#111111]/40 mt-1">
                      {legOfActive.subtitle}, {legOfActive.hubCount} hubs
                    </p>
                  </div>
                )}

                {/* Countries */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-3" style={{ color: activeLocData.legColor }}>
                    Countries
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {activeLocData.countries.map((c, i) => (
                      <li
                        key={i}
                        className="bg-[#111111]/[0.06] px-3 py-1.5 text-xs font-medium text-[#111111]/70 rounded-sm"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* View leg details button */}
              <div className="mt-auto pt-6">
                <button
                  className="w-full py-3 text-[11px] font-mono font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: activeLocData.legColor }}
                  onClick={() => {
                    scrollToLeg(activeLocData.legId);
                    onLegSelectFromMap(activeLocData.legId);
                    setActiveLocId(null);
                  }}
                >
                  View Leg {activeLocData.legNumber} Details
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-mono text-[#111111]/40">
        {routeLegs.map((leg) => (
          <button
            key={leg.id}
            onClick={() => setActiveLeg(activeLeg === leg.id ? null : leg.id)}
            className="flex items-center gap-2 hover:text-[#111111]/70 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: leg.color }} />
            <span>
              Leg {leg.legNumber}: {leg.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ARC ACCORDION, Expandable sections per leg (no dark bands)
   ══════════════════════════════════════════════════════════════════════════ */
function ArcAccordion({
  expandedLeg,
  setExpandedLeg,
  activeLeg,
  setActiveLeg,
  onLegHover,
  onLegHoverEnd,
}: {
  expandedLeg: string | null;
  setExpandedLeg: (id: string | null) => void;
  activeLeg: string | null;
  setActiveLeg: (id: string | null) => void;
  onLegHover: (legId: string) => void;
  onLegHoverEnd: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="border-b border-[#111111]/10">
      <div className="py-12 md:py-16 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
        <div className="w-full max-w-[1400px] mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
            The Arcs, In Detail
          </span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-6 md:px-12 lg:px-20 py-6 md:py-8"
      >
        <div className="w-full max-w-[1400px] mx-auto space-y-2">
          {routeLegs.map((leg) => {
            const isExpanded = expandedLeg === leg.id;
            return (
              <LegAccordionPanel
                key={leg.id}
                leg={leg}
                isExpanded={isExpanded}
                onToggle={() =>
                  setExpandedLeg(isExpanded ? null : leg.id)
                }
                activeLeg={activeLeg}
                setActiveLeg={setActiveLeg}
                onLegHover={onLegHover}
                onLegHoverEnd={onLegHoverEnd}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LEG ACCORDION PANEL, Single expandable panel per leg
   ══════════════════════════════════════════════════════════════════════════ */
function LegAccordionPanel({
  leg,
  isExpanded,
  onToggle,
  activeLeg,
  setActiveLeg,
  onLegHover,
  onLegHoverEnd,
}: {
  leg: RouteLeg;
  isExpanded: boolean;
  onToggle: () => void;
  activeLeg: string | null;
  setActiveLeg: (id: string | null) => void;
  onLegHover: (legId: string) => void;
  onLegHoverEnd: () => void;
}) {
  const images = arcImages[leg.id] || [];

  return (
    <div
      id={`leg-${leg.id}`}
      className={`border transition-colors ${
        isExpanded ? "border-[#111111]/20 bg-white" : "border-[#111111]/10 bg-white hover:border-[#111111]/20"
      }`}
    >
      {/* Header row */}
      <button
        suppressHydrationWarning
        onClick={() => {
          onToggle();
          setActiveLeg(isExpanded ? null : leg.id);
        }}
        onMouseEnter={() => onLegHover(leg.id)}
        onMouseLeave={onLegHoverEnd}
        className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-center justify-between text-left group gap-3"
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 rounded-full"
            style={{ backgroundColor: leg.color }}
          />
          <span
            className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase shrink-0"
            style={{ color: leg.color }}
          >
            Leg {leg.legNumber}
          </span>
          <span className="font-display font-medium text-base sm:text-lg md:text-xl group-hover:text-[#FF4D00] transition-colors truncate">
            {leg.name}
          </span>
          <span className="hidden md:inline text-[11px] font-mono tracking-wide text-[#111111]/30 shrink-0">
            {leg.subtitle}
          </span>
          <span className="hidden sm:inline text-[11px] font-mono tracking-wide text-[#111111]/30 shrink-0">
            {leg.hubCount} Hubs
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[#111111]/30 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 border-t border-[#111111]/8 pt-5 sm:pt-6">
              {/* Countries as tag pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {leg.countries.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-mono tracking-wide px-3 py-1 border border-[#111111]/10 text-[#111111]/50"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Horizontal collage, Activities & Infrastructure */}
              {images.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-[2px]" style={{ backgroundColor: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      Activities &amp; Infrastructure
                    </span>
                  </div>
                  <div className="relative group/collage">
                    <div
                      className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
                      style={{
                        // @ts-expect-error CSS custom property
                        "--scrollbar-color": `${leg.color}40`,
                        "--scrollbar-color-hover": `${leg.color}80`,
                      }}
                    >
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className={`h-[140px] sm:h-[180px] md:h-[220px] overflow-hidden border border-[#111111]/8 shrink-0 ${
                            i === 0 ? "w-[260px] sm:w-[340px] md:w-[420px]" : "w-[200px] sm:w-[260px] md:w-[320px]"
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    {/* Right edge gradient fade */}
                    <div
                      className="absolute top-0 right-0 bottom-2 w-12 pointer-events-none bg-gradient-to-l from-white to-transparent opacity-0 group-hover/collage:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Historical Anchor + Core Flows side by side */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Anchor className="w-4 h-4" style={{ color: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      Historical Anchor
                    </span>
                  </div>
                  <p className="text-base md:text-lg leading-[1.7] text-[#111111]/70 font-medium">
                    {leg.historicalAnchor}
                  </p>
                  <p className="mt-3 text-sm text-[#111111]/35 font-medium">
                    {leg.coreGeography}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-4 h-4" style={{ color: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      Core Flows
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Package, label: "Goods", value: leg.coreFlows.goods },
                      { icon: Banknote, label: "Capital", value: leg.coreFlows.capital },
                      { icon: Database, label: "Data", value: leg.coreFlows.data },
                      { icon: Users, label: "People", value: leg.coreFlows.people },
                    ].map((flow) => (
                      <div key={flow.label} className="p-3 border border-[#111111]/6">
                        <div className="flex items-center gap-2 mb-2">
                          <flow.icon className="w-3.5 h-3.5" style={{ color: leg.color }} />
                          <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40">
                            {flow.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#111111]/55 font-medium leading-[1.5]">
                          {flow.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Route Deal Thesis */}
              <div
                className="border-l-3 pl-5 py-4 mb-8"
                style={{ borderLeftColor: leg.color, borderLeftWidth: 3 }}
              >
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-2 block">
                  Route Deal Thesis
                </span>
                <h3 className="text-xl md:text-2xl font-display font-medium mb-3">
                  {leg.routeDealThesis.title}
                </h3>
                <p className="text-sm md:text-base leading-[1.7] text-[#111111]/55 font-medium">
                  {leg.routeDealThesis.description}
                </p>
              </div>

              {/* Friction + Cultural Weaving side by side */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-[2px]" style={{ backgroundColor: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      The Friction
                    </span>
                  </div>
                  <div className="space-y-2">
                    {leg.friction.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span
                          className="text-[9px] font-mono font-bold mt-1.5 shrink-0 w-4 h-4 flex items-center justify-center"
                          style={{ backgroundColor: `${leg.color}15`, color: leg.color }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm text-[#111111]/65 font-medium leading-[1.5]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-[2px]" style={{ backgroundColor: leg.color }} />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                      Cultural Weaving
                    </span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Commons Feast", value: leg.culturalWeaving.commonsFeast, icon: Sun },
                      { label: "Heritage Walk", value: leg.culturalWeaving.heritageWalk, icon: Compass },
                      { label: "Ritual Closing", value: leg.culturalWeaving.ritualClosing, icon: Sparkles },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="w-3 h-3" style={{ color: leg.color }} />
                          <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#111111]/50 font-medium leading-[1.6] pl-5">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Signature Route Deals */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-[2px]" style={{ backgroundColor: leg.color }} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                    Signature Route Deals
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {leg.signatureDeals.map((deal, i) => (
                    <DealCard key={i} deal={deal} legColor={leg.color} index={i} />
                  ))}
                </div>
              </div>

              {/* Key Cities as tag pills */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4" style={{ color: leg.color }} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                    Key Cities
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leg.keyCities.map((city) => (
                    <span
                      key={city.name}
                      className="text-[11px] font-mono px-3 py-1.5 border text-[#111111]/60"
                      style={{ borderColor: `${leg.color}30` }}
                    >
                      <MapPin className="w-3 h-3 inline mr-1" style={{ color: leg.color }} />
                      {city.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DEAL CARD (expandable)
   ══════════════════════════════════════════════════════════════════════════ */
function DealCard({
  deal,
  legColor,
  index,
}: {
  deal: RouteLeg["signatureDeals"][number];
  legColor: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#111111]/10">
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left group gap-4"
      >
        <div className="flex items-center gap-4">
          <span
            className="text-[10px] font-mono font-bold tracking-widest shrink-0"
            style={{ color: legColor }}
          >
            {deal.duration}
          </span>
          <span className="font-display font-medium text-base md:text-lg group-hover:text-[#FF4D00] transition-colors">
            {deal.name}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-[#111111]/30 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[#111111]/5 pt-4">
              <p className="text-sm text-[#111111]/60 font-medium mb-3">
                {deal.focus}
              </p>
              <div className="space-y-1">
                {deal.inclusions.map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-[#111111]/50"
                  >
                    <ChevronRight className="w-3 h-3 text-[#FF4D00] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE JOURNEY SECTION
   ══════════════════════════════════════════════════════════════════════════ */
function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activePhase, setActivePhase] = useState<number | null>(null);

  /* Journey phases for the timeline visualization */
  const journeyPhases = annualSchedule.map((s, i) => ({
    ...s,
    phase: i + 1,
    totalPhases: annualSchedule.length,
    description: [
      "Orientation and immersion. Founders arrive at hub cities, conduct market walks, and map the local commercial landscape.",
      "Deep diligence. Structured sprints on the signature route deal, regulatory mapping, and counterparty discovery.",
      "Peak operations. Deal rooms, pilot launches, and cross-hub collaboration at maximum velocity.",
      "Integration and harvest. Signed deals, codified playbooks, and the covenant ceremony marking lifelong membership.",
      "Cross-leg connect. Hubs share deal flow, talent, and capital across arcs. The flywheel accelerates.",
      "Synthesis. Annual assembly, portfolio review, and thesis ratification for the next cycle.",
    ][i] || "Operations and deal flow on the Route.",
    highlights: [
      ["Market mapping", "Hub onboarding", "Local partnerships"],
      ["Due diligence sprints", "Regulatory review", "Counterparty meetings"],
      ["Deal execution", "Pilot deployment", "Capital deployment"],
      ["Route Deal signing", "Playbook codification", "Covenant ceremony"],
      ["Cross-arc deal flow", "Talent exchange", "Capital syndication"],
      ["State of the Route", "Thesis ratification", "Alumni gathering"],
    ][i] || [],
  }));

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The Journey
          </span>
          <h2 className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6">
            Annual Cohort
            <br />
            <span className="text-[#111111]/40">Architecture</span>
          </h2>
          <p className="text-lg md:text-xl text-[#111111]/50 font-medium leading-relaxed max-w-2xl">
            The Routes run on climate, not calendar. Each leg is timed to
            seasonal windows that maximize mobility and minimize friction.
          </p>
        </motion.div>

        {/* ── Route Journey Steps Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mb-20 md:mb-28"
        >
          <div className="flex items-center gap-2 mb-8">
            <Route className="w-4 h-4 text-[#FF4D00]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">
              The Route Journey
            </span>
          </div>

          {/* Desktop: Horizontal steps with connecting line */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Continuous horizontal line */}
              <div className="absolute top-[28px] left-0 right-0 h-[2px] bg-[#111111]/8" />

              <div className="flex">
                {[
                  {
                    step: "01",
                    icon: Database,
                    title: "Application",
                    desc: "Submit your venture thesis, team profile, and route alignment. We evaluate conviction, not credentials.",
                  },
                  {
                    step: "02",
                    icon: Check,
                    title: "Acceptance",
                    desc: "Covenant selection. 100 Xcitizens per cohort, chosen for what they'll contribute to the Route, not just what they'll take.",
                  },
                  {
                    step: "03",
                    icon: Anchor,
                    title: "Departure",
                    desc: "The cohort assembles. Orientation at the origin hub. Market walks, operator introductions, and the first deal room.",
                  },
                  {
                    step: "04",
                    icon: MapPin,
                    title: "Hub Rotation",
                    desc: "Six legs. Each hub is a new market, a new counterparty, a new operating environment. The flywheel accelerates.",
                  },
                  {
                    step: "05",
                    icon: Flame,
                    title: "Return",
                    desc: "The covenant ceremony. Signed deals, codified playbooks, and lifelong membership in the Routes alumni network.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className="flex-1 relative group"
                    >
                      {/* Node on the line */}
                      <div className="flex items-center justify-center mb-6 relative z-10">
                        <div className="w-14 h-14 rounded-full border-2 border-[#111111]/10 bg-white flex items-center justify-center group-hover:border-[#FF4D00] group-hover:bg-[#FF4D00]/5 transition-all duration-300">
                          <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Step number */}
                      <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] block text-center mb-2">
                        Step {item.step}
                      </span>

                      {/* Title */}
                      <h4 className="text-[16px] font-display font-medium tracking-tight text-center mb-3 group-hover:text-[#FF4D00] transition-colors">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6] text-center max-w-[200px] mx-auto">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical steps with connecting line */}
          <div className="md:hidden">
            <div className="relative">
              {/* Continuous vertical line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[#111111]/8" />

              {[
                {
                  step: "01",
                  icon: Database,
                  title: "Application",
                  desc: "Submit your venture thesis, team profile, and route alignment. We evaluate conviction, not credentials.",
                },
                {
                  step: "02",
                  icon: Check,
                  title: "Acceptance",
                  desc: "Covenant selection. 100 Xcitizens per cohort, chosen for what they'll contribute to the Route.",
                },
                {
                  step: "03",
                  icon: Anchor,
                  title: "Departure",
                  desc: "The cohort assembles. Orientation at the origin hub. Market walks and the first deal room.",
                },
                {
                  step: "04",
                  icon: MapPin,
                  title: "Hub Rotation",
                  desc: "Six legs. Each hub is a new market, a new counterparty. The flywheel accelerates.",
                },
                {
                  step: "05",
                  icon: Flame,
                  title: "Return",
                  desc: "The covenant ceremony. Signed deals, codified playbooks, and lifelong alumni membership.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                    className="relative pl-14 pb-8 last:pb-0"
                  >
                    {/* Node on the line */}
                    <div className="absolute left-[5px] top-0 w-7 h-7 rounded-full border-2 border-[#111111]/10 bg-white flex items-center justify-center z-10">
                      <Icon className="w-3.5 h-3.5 text-[#FF4D00]" strokeWidth={1.5} />
                    </div>

                    {/* Step number */}
                    <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] block mb-1">
                      Step {item.step}
                    </span>

                    {/* Title */}
                    <h4 className="text-[16px] font-display font-medium tracking-tight mb-2">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6]">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Annual Schedule Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-20 md:mb-28"
        >
          {/* Desktop: Horizontal timeline with expandable nodes */}
          <div className="hidden lg:block">
            {/* Connecting horizontal line */}
            <div className="relative flex items-stretch gap-0">
              {/* The continuous thread */}
              <div className="absolute top-[40px] left-0 right-0 h-[2px] bg-[#111111]/8 z-0" />

              {journeyPhases.map((phase, i) => {
                const isActive = activePhase === i;
                const leg = routeLegs.find((l) => l.id === phase.legId);
                const legColor = leg?.color || "#FF4D00";

                return (
                  <div
                    key={phase.legId}
                    className="flex-1 relative z-10"
                    onMouseEnter={() => setActivePhase(i)}
                    onMouseLeave={() => setActivePhase(null)}
                  >
                    {/* Timeline node */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => setActivePhase(isActive ? null : i)}
                    >
                      {/* Node circle */}
                      <div
                        className={`relative w-5 h-5 rounded-full border-2 transition-all duration-300 z-10 ${
                          isActive
                            ? "scale-150 border-transparent shadow-lg"
                            : "bg-white border-[#111111]/20 hover:border-[#FF4D00]/50 hover:scale-110"
                        }`}
                        style={isActive ? { backgroundColor: legColor, borderColor: legColor } : {}}
                      >
                        {/* Pulse ring on active */}
                        {isActive && (
                          <div
                            className="absolute inset-[-6px] rounded-full animate-ping opacity-20"
                            style={{ backgroundColor: legColor }}
                          />
                        )}
                      </div>

                      {/* Phase number below dot */}
                      <span className={`text-[10px] font-mono font-bold tracking-[0.15em] uppercase mt-3 transition-colors duration-300 ${
                        isActive ? "text-[#FF4D00]" : "text-[#111111]/25"
                      }`}>
                        Phase {phase.phase}
                      </span>

                      {/* Period label */}
                      <span className={`text-[11px] font-mono font-bold mt-1 transition-colors duration-300 ${
                        isActive ? "text-[#111111]" : "text-[#111111]/40"
                      }`}>
                        {phase.period}
                      </span>

                      {/* Leg name */}
                      <span className={`text-[13px] font-display font-medium mt-1 text-center transition-colors duration-300 ${
                        isActive ? "text-[#111111]" : "text-[#111111]/55"
                      }`}>
                        {phase.leg.split(" ").slice(0, 2).join(" ")}
                      </span>

                      {/* Hub count */}
                      <span className="text-[10px] font-mono text-[#111111]/30 mt-0.5">
                        {phase.hubs}
                      </span>
                    </motion.div>

                    {/* Expandable detail card below */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-4 border border-[#111111]/10 bg-white p-5 shadow-md overflow-hidden"
                        >
                          {/* Leg color bar */}
                          <div className="h-1 w-8 mb-4" style={{ backgroundColor: legColor }} />

                          {/* Phase title + climate */}
                          <h4 className="text-[16px] font-display font-medium tracking-tight mb-2">
                            {phase.leg}
                          </h4>
                          <div className="flex items-center gap-2 text-[12px] text-[#111111]/50 mb-4">
                            <Sun className="w-3 h-3 text-[#FF4D00] shrink-0" />
                            {phase.climateNote}
                          </div>

                          {/* Description */}
                          <p className="text-[13px] text-[#111111]/55 font-medium leading-[1.6] mb-4">
                            {phase.description}
                          </p>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-2">
                            {phase.highlights.map((h) => (
                              <span
                                key={h}
                                className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase bg-[#111111]/[0.04] px-2.5 py-1 text-[#111111]/45"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Progress indicator bar */}
            <div className="mt-8 flex items-center gap-3 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/25">
              <span>Q1</span>
              <div className="flex-1 h-px bg-[#111111]/10 relative">
                {journeyPhases.map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#111111]/20"
                    style={{ left: `${((i + 0.5) / journeyPhases.length) * 100}%` }}
                  />
                ))}
              </div>
              <span>Q4</span>
            </div>
          </div>

          {/* Tablet/Mobile: Vertical timeline with expandable nodes */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Continuous vertical thread */}
              <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-[#111111]/8 z-0" />

              {journeyPhases.map((phase, i) => {
                const isActive = activePhase === i;
                const leg = routeLegs.find((l) => l.id === phase.legId);
                const legColor = leg?.color || "#FF4D00";

                return (
                  <motion.div
                    key={phase.legId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                    className="relative pl-12 pb-8 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <button
                      onClick={() => setActivePhase(isActive ? null : i)}
                      className={`absolute left-[7px] top-1 w-[18px] h-[18px] rounded-full border-2 transition-all duration-300 z-10 ${
                        isActive
                          ? "border-transparent scale-125"
                          : "bg-white border-[#111111]/20 hover:border-[#FF4D00]/50"
                      }`}
                      style={isActive ? { backgroundColor: legColor, borderColor: legColor } : {}}
                    />

                    {/* Content */}
                    <div
                      className={`cursor-pointer transition-all duration-300 ${
                        isActive ? "" : "hover:opacity-80"
                      }`}
                      onClick={() => setActivePhase(isActive ? null : i)}
                    >
                      {/* Phase + Period */}
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                          Phase {phase.phase}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#111111]/40">
                          {phase.period}
                        </span>
                      </div>

                      {/* Leg name + hubs */}
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`text-[16px] font-display font-medium tracking-tight transition-colors duration-300 ${
                          isActive ? "text-[#FF4D00]" : "text-[#111111]"
                        }`}>
                          {phase.leg}
                        </h4>
                        <span className="text-[10px] font-mono text-[#111111]/25">{phase.hubs}</span>
                      </div>

                      {/* Climate note (always visible) */}
                      <div className="flex items-center gap-2 text-[12px] text-[#111111]/45 mb-2">
                        <Sun className="w-3 h-3 text-[#FF4D00] shrink-0" />
                        {phase.climateNote}
                      </div>
                    </div>

                    {/* Expandable detail */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border border-[#111111]/10 bg-white p-4 mt-1">
                            {/* Leg color bar */}
                            <div className="h-1 w-8 mb-3" style={{ backgroundColor: legColor }} />

                            <p className="text-[13px] text-[#111111]/55 font-medium leading-[1.6] mb-3">
                              {phase.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {phase.highlights.map((h) => (
                                <span
                                  key={h}
                                  className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase bg-[#111111]/[0.04] px-2.5 py-1 text-[#111111]/45"
                                >
                                  {h}
                                </span>
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
        </motion.div>

        {/* Daily Rhythm + What You Leave With */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-[#FF4D00]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                Daily Rhythm Per Hub
              </span>
            </div>
            {/* Daily rhythm timeline */}
            <div className="relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#FF4D00]/12" />
              {[
                {
                  time: "06:00",
                  desc: "Dawn patrol, market visit, port walk, or field deployment",
                },
                {
                  time: "09:00",
                  desc: "Deal room, structured sprint on the signature route deal",
                },
                {
                  time: "12:00",
                  desc: "Commons feast, shared meal with local operators and partners",
                },
                {
                  time: "14:00",
                  desc: "Deep work, prototyping, API integration, or regulatory mapping",
                },
                {
                  time: "17:00",
                  desc: "Heritage walk, curated walk through the hub's trade history",
                },
                {
                  time: "19:00",
                  desc: "Ritual closing, reflection, documentation, and intention setting",
                },
              ].map((r, i) => (
                <div key={r.time} className="flex items-start gap-4 relative pb-5 last:pb-0">
                  {/* Timeline dot */}
                  <div className="shrink-0 w-[23px] flex items-center justify-center pt-0.5">
                    <div className={`w-2 h-2 rounded-full z-10 ${
                      i === 0 ? "bg-[#FF4D00] shadow-[0_0_6px_rgba(255,77,0,0.3)]" : "bg-[#FF4D00]/30"
                    }`} />
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[11px] font-mono font-bold text-[#FF4D00] shrink-0 pt-0.5">
                      {r.time}
                    </span>
                    <span className="text-sm text-[#111111]/60 font-medium leading-[1.6]">
                      {r.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-4 h-4 text-[#FF4D00]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                What You Leave With
              </span>
            </div>
            <div className="space-y-4">
              {[
                { icon: "📝", title: "A Signed Route Deal", desc: "Commercial agreement with at least one counterparty across the leg" },
                { icon: "📘", title: "A Playbook", desc: "Codified operating procedures for every friction point encountered" },
                { icon: "🤝", title: "A Network", desc: "Direct relationships with operators, regulators, and capital sources across the leg" },
                { icon: "🌍", title: "A Worldview", desc: "Firsthand understanding of how 80% of global trade actually moves" },
                { icon: "🗝️", title: "A Covenant", desc: "Lifelong membership in the Routes alumni network, with access to every hub" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <span className="text-sm mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div>
                    <span className="text-sm text-[#111111] font-semibold leading-[1.4] block">
                      {item.title}
                    </span>
                    <span className="text-[13px] text-[#111111]/50 font-medium leading-[1.5]">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PRICING SECTION
   ══════════════════════════════════════════════════════════════════════════ */

const coverageItems = [
  { key: "lodging", label: "Lodging", icon: "🏠" },
  { key: "meals", label: "Meals", icon: "🍽" },
  { key: "transport", label: "Transport", icon: "🚛" },
  { key: "siteVisits", label: "Site Visits", icon: "🏭" },
] as const;

function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10 bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            Pricing
          </span>
          <h2 className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6">
            Invest in the Journey
          </h2>
          <p className="text-lg md:text-xl text-[#111111]/50 font-medium leading-relaxed max-w-2xl">
            Each arc covers lodging, meals, transport, and site visits. Pricing
            reflects the terrain.
          </p>
        </motion.div>

        {/* Per-arc pricing — horizontal cards stacked vertically */}
        <div className="space-y-4 md:space-y-6 mb-12">
          {arcPricing.map((pricing, i) => {
            const leg = routeLegs.find((l) => l.id === pricing.legId);
            if (!leg) return null;
            return (
              <motion.div
                key={pricing.legId}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.08 * i,
                  ease: "easeOut",
                }}
                className="border border-[#111111]/10 hover:border-[#111111]/20 transition-colors overflow-hidden"
                style={{ borderLeftWidth: 4, borderLeftColor: leg.color }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-0">
                  {/* Left: Arc info */}
                  <div className="p-5 sm:p-6 md:p-8 lg:border-r border-b lg:border-b-0 border-[#111111]/10 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-3 h-3 shrink-0"
                        style={{ backgroundColor: leg.color }}
                      />
                      <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00]">
                        Leg {leg.legNumber}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-medium mb-1">
                      {leg.name}
                    </h3>
                    <p className="text-sm text-[#111111]/40 font-medium mb-6">
                      {leg.subtitle}
                    </p>

                    {/* Price block */}
                    <div className="mb-3">
                      <div className="text-3xl md:text-4xl font-display font-medium">
                        ${pricing.pricePerPerson.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mt-1">
                        Per Person
                      </div>
                    </div>
                    <div className="mb-6">
                      <div
                        className="text-lg font-display font-medium"
                        style={{ color: leg.color }}
                      >
                        ${pricing.solidarityRate.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mt-0.5">
                        Solidarity Rate
                      </div>
                    </div>

                    {/* Duration + scholarships */}
                    <div className="flex gap-5 mb-6 text-sm">
                      <div>
                        <span className="font-display font-medium">
                          {pricing.durationWeeks}
                        </span>{" "}
                        <span className="text-[#111111]/40">weeks</span>
                      </div>
                      <div>
                        <span className="font-display font-medium">
                          {pricing.scholarshipsPerDeparture}
                        </span>{" "}
                        <span className="text-[#111111]/40">scholarships</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={`#leg-${leg.id}`}
                      className="mt-auto w-full lg:w-auto inline-flex items-center justify-center gap-2 border px-5 py-3 min-h-[44px] text-xs font-mono font-bold tracking-wider uppercase transition-colors hover:bg-[#111111] hover:text-white"
                      style={{ borderColor: leg.color, color: leg.color }}
                    >
                      Explore This Arc
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Right: Coverage breakdown */}
                  <div className="p-6 md:p-8">
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mb-4">
                      What&apos;s Covered
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                      {coverageItems.map((item) => (
                        <div key={item.key}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">{item.icon}</span>
                            <span className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase text-[#111111]/50">
                              {item.label}
                            </span>
                          </div>
                          <p className="text-sm text-[#111111]/70 font-medium leading-relaxed pl-6">
                            {pricing[item.key as keyof ArcPricing] as string}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Extras */}
                    {pricing.extras.length > 0 && (
                      <div>
                        <div className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase text-[#111111]/30 mb-3">
                          Arc-Specific Extras
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {pricing.extras.map((extra, j) => (
                            <span
                              key={j}
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-[#111111]/10 text-[#111111]/60"
                            >
                              <Check
                                className="w-3 h-3 shrink-0"
                                style={{ color: leg.color }}
                              />
                              {extra}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Full Route Package */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="bg-[#1B1C1E] text-white overflow-hidden"
          style={{ borderLeftWidth: 4, borderLeftColor: "#FF4D00" }}
        >
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-[#FF4D00]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                Full Route Package
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-16 items-start">
              {/* Left: Info + pricing */}
              <div>
                <h3 className="text-[28px] sm:text-[36px] md:text-[48px] font-display font-medium tracking-[-0.02em] leading-[0.95] mb-4">
                  The Full Circumnavigation
                </h3>
                <p className="text-base md:text-lg text-white/40 font-medium leading-[1.7] mb-8">
                  All six arcs. Twelve months. The complete journey from Lagos
                  to Cairo, from the Gulf of Guinea to the Mediterranean
                  gateways. One continuous route that builds on itself with every
                  leg.
                </p>

                <div className="flex flex-wrap gap-8 mb-8">
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-medium text-[#FF4D00]">
                      ${fullRoutePricing.pricePerPerson.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mt-1">
                      Per Person
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-medium text-[#FF4D00]/80">
                      ${fullRoutePricing.solidarityRate.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mt-1">
                      Solidarity Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-medium text-white">
                      {fullRoutePricing.durationMonths}
                    </div>
                    <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mt-1">
                      Months
                    </div>
                  </div>
                </div>

                <button
                  suppressHydrationWarning
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-8 py-4 min-h-[44px] text-sm font-mono font-bold tracking-wider uppercase transition-colors"
                >
                  Book for the Full Route
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Coverage breakdown + extras */}
              <div>
                <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/30 mb-4">
                  What&apos;s Covered
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                  {coverageItems.map((item) => (
                    <div key={item.key}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{item.icon}</span>
                        <span className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase text-white/40">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 font-medium leading-relaxed pl-6">
                        {fullRoutePricing[
                          item.key as keyof typeof fullRoutePricing
                        ] as string}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase text-white/30 mb-3">
                  Full Route Extras
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {fullRoutePricing.extras.map((extra, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-white/55"
                    >
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#FF4D00]" />
                      <span>{extra}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE INVITATION (CTA)
   ══════════════════════════════════════════════════════════════════════════ */
function InvitationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
    >
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-20 md:py-32 rounded-sm">
      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] inline-block mb-6">
            The Invitation
          </span>
          <h2 className="text-[30px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6 sm:mb-8 uppercase">
            The Routes is not a program.{" "}
            <span className="text-[#FF4D00]">It is a covenant.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/40 font-medium leading-[1.6] max-w-lg">
            Whether you&apos;re a founder, investor, or independent partner, there&apos;s a place on the Route for those who refuse to build in
            isolation. For those who understand that the next frontier isn&apos;t
            a metaphor. It&apos;s a map.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <Link
            to="/programs"
            className="group flex items-center justify-between border border-white/20 px-5 sm:px-8 py-5 sm:py-6 min-h-[44px] hover:bg-white/5 transition-colors"
          >
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                For Founders
              </div>
              <div className="text-lg md:text-xl font-display font-medium">
                Explore Programs
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/capital"
            className="group flex items-center justify-between border border-white/20 px-5 sm:px-8 py-5 sm:py-6 min-h-[44px] hover:bg-white/5 transition-colors"
          >
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                For Investors
              </div>
              <div className="text-lg md:text-xl font-display font-medium">
                Deploy Capital
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/join"
            className="group flex items-center justify-between border border-white/20 px-5 sm:px-8 py-5 sm:py-6 min-h-[44px] hover:bg-white/5 transition-colors"
          >
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                For Independent Partners
              </div>
              <div className="text-lg md:text-xl font-display font-medium">
                Build With Us
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
