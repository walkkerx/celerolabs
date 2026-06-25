"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Building2,
  Rocket,
  Coins,
  Users,
  MapPin,
  Check,
  Calendar,
  Clock,
  Star,
  Zap,
  TrendingUp,
  Globe2,
} from "lucide-react";
import { ReviewSection } from "@/artemis/components/ReviewSection";
import { routeLegs, MAP_LOCATIONS } from "@/artemis/data/routes";

/* ── Data ── */

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1631556760646-50241850eb25?auto=format&fit=crop&w=1200&q=80",
    alt: "Black woman scientist in laboratory",
    position: "center 25%",
  },
  {
    src: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?auto=format&fit=crop&w=1200&q=80",
    alt: "Nairobi city skyline",
    position: "center 40%",
  },
  {
    src: "https://images.unsplash.com/photo-1780567497689-025144c19b8c?auto=format&fit=crop&w=1200&q=80",
    alt: "Black entrepreneur working on laptop",
    position: "center 20%",
  },
  {
    src: "https://images.unsplash.com/photo-1573164574511-73c773193279?auto=format&fit=crop&w=1200&q=80",
    alt: "Black professionals in business meeting",
    position: "center 25%",
  },
];

const stats = [
  { value: 5000, prefix: "", suffix: "+", label: "Market-defining companies on the Route", icon: Rocket },
  { value: 1, prefix: "$", suffix: "T+", label: "Projected portfolio value at scale", icon: TrendingUp },
  { value: 200, prefix: "", suffix: "+", label: "Unicorns projected", icon: Zap },
  { value: 190, prefix: "", suffix: "", label: "Hub locations across 39 countries", icon: Globe2 },
];

const pillars = [
  {
    id: "infrastructure",
    icon: Building2,
    heading: "Infrastructure",
    subtext:
      "M1 Core campuses, XEmbassy nodes, & distributed living labs",
    description:
      "We are building the physical and digital infrastructure that ventures need to move from prototype to production. M1 Core campuses are designed to provide 50,000+ sq ft of lab, maker, and co-working space in prime hub cities. XEmbassy nodes — compact 5,000 sq ft drop-in studios — will extend reach into secondary markets. Distributed living labs will connect field testing sites across the Route, giving ventures access to real-world validation environments from day one.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1613457231357-a5db3bc5bd81?auto=format&fit=crop&w=1200&q=80",
        alt: "African urban infrastructure development",
        position: "center 40%",
      },
      {
        src: "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&w=1200&q=80",
        alt: "Black scientist conducting research",
        position: "center 25%",
      },
    ],
    link: "/infrastructure",
  },
  {
    id: "ventures",
    icon: Rocket,
    heading: "Ventures",
    subtext:
      "Venture commercialization programs with industry & government partners",
    description:
      "We are designing structured commercialization programs that take ventures from idea to revenue. Each program will be co-designed with industry and government partners who provide market access, pilot opportunities, and first-customer contracts. The Quest Fellowship — our flagship semester-long program run in collaboration with DDQIC at Queen's University — uses MIT's Disciplined Entrepreneurship framework to guide founders through 24 steps of validated learning. Programs will run on the Route, connecting cohorts across hub cities for shared deal flow and peer support.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1653566031535-bcf33e1c2893?auto=format&fit=crop&w=1200&q=80",
        alt: "Black founders building a venture",
        position: "center 25%",
      },
      {
        src: "https://images.unsplash.com/photo-1758691736903-c60a33e5b83f?auto=format&fit=crop&w=1200&q=80",
        alt: "Diverse team brainstorming startup ideas",
        position: "center 20%",
      },
    ],
    link: "/programs",
  },
  {
    id: "capital",
    icon: Coins,
    heading: "Capital",
    subtext: "Aligned network of venture & non-dilutive capital",
    description:
      "We are mobilizing capital that matches the realities of building in the Global South. Our network is being built to include venture funds, national development allocators, development finance institutions, and non-dilutive grant programs. Solidarity pricing will ensure that founders in early-stage markets access the same quality of support at a fraction of Silicon Valley costs. We are also building a non-dilutive capital desk to match ventures with grants, prizes, and government incentives across 39+ countries on the Route.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1767893609884-622503897e53?auto=format&fit=crop&w=1200&q=80",
        alt: "Investment discussion with data",
        position: "center 30%",
      },
      {
        src: "https://images.unsplash.com/photo-1741991109902-98bf764fb35d?auto=format&fit=crop&w=1200&q=80",
        alt: "African city lights at night",
        position: "center 40%",
      },
    ],
    link: "/capital",
  },
  {
    id: "community",
    icon: Users,
    heading: "Community",
    subtext:
      "The XCitizens network, operators, founders, investors & mentors across the Route",
    description:
      "The fourth pillar. Community is the connective tissue that will turn individual efforts into collective momentum. The XCitizens network is designed to span every hub on the Route: operators who run infrastructure, founders building ventures, investors deploying capital, and mentors transferring knowledge. Compound network effects mean every new member strengthens the whole, creating a flywheel that can accelerate commercialization for everyone.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1573496267526-08a69e46a409?auto=format&fit=crop&w=1200&q=80",
        alt: "Black women colleagues collaborating",
        position: "center 20%",
      },
      {
        src: "https://images.unsplash.com/photo-1778876091184-8839210e1917?auto=format&fit=crop&w=1200&q=80",
        alt: "Community gathering at conference",
        position: "center 25%",
      },
    ],
    link: "/join",
  },
];

const routeRegions = [
  {
    name: "Gulf of Guinea Arc",
    description: "Lagos, Accra, Abidjan, Dakar: the commercial backbone of West Africa",
  },
  {
    name: "East Africa Corridor",
    description:
      "Nairobi, Kampala, Kigali, Addis Ababa: innovation hubs of East Africa",
  },
  {
    name: "Southern Africa Arc",
    description:
      "Cape Town, Johannesburg, Harare, Maputo: mining, manufacturing, and finance",
  },
  {
    name: "Mediterranean Bridge",
    description: "Cairo, Tunis, Casablanca: Mediterranean gateway to the continent",
  },
  {
    name: "Sahel Band",
    description: "Bamako, Ouagadougou, Niamey, N'Djamena: climate adaptation frontier",
  },
  {
    name: "Central African Heartland",
    description:
      "Kinshasa, Brazzaville, Douala: mineral-rich, infrastructure-poor corridor",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   HOME
   ══════════════════════════════════════════════════════════════════════════ */
export function Home() {
  return (
    <div className="bg-white text-[#111111]">
      <Hero />
      <MissionBridge />
      <BentoGrid />
      <NumbersSection />
      <ThreePillarsSection />
      <LocationsSection />
      <UpcomingEventsSection />
      <ReviewSection title="Dispatches from the field" />
      <NewsletterSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, Contained image with heading below (NEWLAB style)
   ══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-20 pt-4 md:pt-6">
      {/* Contained image, not full-bleed */}
      <div className="relative w-full max-w-[1400px] mx-auto h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden">
        {heroImages.map((img, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              opacity: i === currentImage ? 1 : 0,
              scale: i === currentImage ? 1 : 1.03,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
        {/* Gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

        {/* Image indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              suppressHydrationWarning
              onClick={() => setCurrentImage(i)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span
                className={`block h-[3px] transition-all duration-500 ${
                  i === currentImage ? "bg-[#FF4D00] w-12 active:w-14" : "bg-black/30 w-8"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Large centered heading below the image (NEWLAB style) */}
      <div className="w-full max-w-[1400px] mx-auto pt-8 md:pt-12 pb-6 md:pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-[28px] sm:text-[44px] md:text-[64px] lg:text-[86px] xl:text-[104px] leading-[0.9] font-display font-medium tracking-[-0.03em] text-center uppercase"
        >
          Venture platform
          <br />
          for critical
          <br />
          technology
        </motion.h1>

        {/* Subtitle + CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="mt-6 md:mt-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-[15px] md:text-[17px] leading-[1.6] text-[#111111]/60 font-medium mb-8">
            Designed to unite 190 hubs across 39 countries — commercializing the technology the next century needs: infrastructure, ventures, capital, and community, all on one platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/ventures"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#FF4D00]/90 transition-colors"
            >
              Explore Ventures
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/capital"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#111111] text-[#111111] text-[12px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors bg-transparent"
            >
              Invest from $500
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center mt-10 md:mt-14"
        >
          <span className="text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-[#111111]/25 mb-3">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-[#FF4D00]/50" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MISSION BRIDGE: Image strip + two-column mission statement with dotted map
   ══════════════════════════════════════════════════════════════════════════ */

/* Dot-matrix world map: recognizable continent outlines */
const worldDots = (() => {
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

const bridgeImages = [
  {
    src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    alt: "Black researcher in laboratory",
    position: "center 30%",
  },
  {
    src: "https://images.unsplash.com/photo-1573164574397-dd250bc8a598?auto=format&fit=crop&w=800&q=80",
    alt: "Black professionals collaborating",
    position: "center 25%",
  },
  {
    src: "https://images.unsplash.com/photo-1669127300649-940337f1487e?auto=format&fit=crop&w=800&q=80",
    alt: "African city development",
    position: "center 40%",
  },
];

function MissionBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Image strip: three overlapping images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-3 md:flex md:items-end md:justify-start md:gap-0 gap-3 md:gap-0 mb-16 md:mb-24"
        >
          {bridgeImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden bg-[#F5F5F5] shadow-lg ${
                i === 0
                  ? "w-full md:w-[32%] aspect-[4/3] z-10"
                  : i === 1
                  ? "w-full md:w-[40%] aspect-[4/3] z-30 md:-mt-3 md:-ml-[4%]"
                  : "w-full md:w-[32%] aspect-[4/3] z-10 md:-ml-[4%]"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                style={{ objectPosition: img.position }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column layout: text left, dotted map right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Mission text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-[22px] sm:text-[28px] md:text-[34px] leading-[1.25] font-display font-medium tracking-[-0.02em] text-[#111111] mb-6 md:mb-8">
              The markets with the youngest populations and fastest growth will build what the next century runs on, yet <span className="text-[#FF4D00]">most ventures there never cross the valley of death</span>.
            </p>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#111111]/60 font-medium max-w-xl">
              xCelero is designed to bridge that gap. A network of 190 hubs across 39 countries, built into a single commercialization engine: infrastructure to build, programs to validate, capital to scale, and community to compound. A breakthrough in isolation is a tragedy. <span className="text-[#111111] font-semibold">On the Route, it can become a flywheel.</span>
            </p>
          </motion.div>

          {/* Right: Dotted world map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <svg
                viewBox="0 0 60 30"
                className="w-full h-auto"
                style={{ imageRendering: "auto" }}
              >
                {/* All land dots in dark color */}
                {worldDots.map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.col * 1}
                    cy={dot.row * 1}
                    r="0.35"
                    className="fill-[#111111]/70"
                  />
                ))}
                {/* Africa highlighted region: cols 23-33, rows 3-21 */}
                {worldDots
                  .filter(
                    (d) =>
                      d.col >= 23 && d.col <= 33 && d.row >= 3 && d.row <= 21
                  )
                  .map((dot, i) => (
                    <circle
                      key={`af-${i}`}
                      cx={dot.col * 1}
                      cy={dot.row * 1}
                      r="0.4"
                      className="fill-[#FF4D00]"
                    />
                  ))}
              </svg>
              {/* Label */}
              <div className="absolute bottom-2 right-4 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                39 Countries · 190 Projected Hubs
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE PLATFORM: Countdown ticker + thesis + pillar cards
   ══════════════════════════════════════════════════════════════════════════ */

/* Live countdown hook — ticks every second toward a target date */
function useCountdown(targetDate: Date) {
  const [tick, setTick] = useState(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = mountedRef.current ? Date.now() : targetDate.getTime();
  const diff = Math.max(0, targetDate.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return { days, hours, minutes, seconds, elapsed: diff === 0, mounted: mountedRef.current };
}

/* Pad a number to 2 digits */
function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Year One launch: March 15, 2027 — first cohort departs the Gulf of Guinea
  const launchDate = new Date("2027-03-15T00:00:00Z");
  const { days, hours, minutes, seconds, mounted } = useCountdown(launchDate);

  const pillars = [
    {
      title: "Infrastructure",
      stat: "190",
      statLabel: "Hubs · 39 Countries",
      description: "Physical spaces, legal frameworks, and shared systems that let ventures deploy faster and compound across borders.",
      icon: Building2,
      link: "/infrastructure",
    },
    {
      title: "Ventures",
      stat: "40+",
      statLabel: "Portfolio Companies",
      description: "From energy to space — critical technology designed for the markets that need it most and the century that demands it.",
      icon: Rocket,
      link: "/ventures",
    },
    {
      title: "Capital",
      stat: "6",
      statLabel: "Investment Vehicles",
      description: "From $500 to $250K+, aligned capital designed for every stage — so breakthroughs don't stall for funding.",
      icon: Coins,
      link: "/capital",
    },
    {
      title: "Community",
      stat: "100",
      statLabel: "XCitizens per Cohort",
      description: "Operators and builders moving through the Route together — a mobile university for civilizational prototyping.",
      icon: Users,
      link: "/programs",
    },
  ];

  const countdownUnits = [
    { value: days, label: "Days" },
    { value: hours, label: "Hrs" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto bg-[#0A0A0A] rounded-sm overflow-hidden">
        {/* ── Countdown ticker bar ── */}
        <div className="border-b border-white/[0.06]">
          <div className="flex items-center">
            {/* Mission status indicator */}
            <div className="flex items-center gap-2 px-4 md:gap-2.5 md:px-10 py-3.5 md:py-5 border-r border-white/[0.06] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]/60">
                T-0
              </span>
            </div>
            {/* Countdown digits */}
            {countdownUnits.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                className={`flex items-center gap-1.5 md:gap-2.5 px-2.5 md:px-7 py-3.5 md:py-5 shrink-0 ${
                  i < countdownUnits.length - 1 ? "border-r border-white/[0.06]" : ""
                }`}
              >
                <span className="text-[18px] md:text-[28px] font-display font-medium tracking-[-0.02em] text-white leading-none tabular-nums">
                  {mounted ? pad2(unit.value) : "--"}
                </span>
                <span className="text-[8px] md:text-[9px] font-mono font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-white/25">
                  {unit.label}
                </span>
              </motion.div>
            ))}
            {/* Launch date label */}
            <div className="hidden md:flex items-center ml-auto px-6 md:px-10 py-5 shrink-0">
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/15">
                Mar 15, 2027 · Gulf of Guinea · Leg 1
              </span>
            </div>
          </div>
        </div>

        {/* ── Thesis + Pillars: side-by-side on desktop ── */}
        <div className="grid lg:grid-cols-12">
          {/* Left: Thesis statement — sticky on scroll */}
          <div className="lg:col-span-5 px-6 md:px-14 lg:px-20 py-14 md:py-20 lg:py-24 lg:sticky lg:top-[80px] lg:self-start border-b lg:border-b-0 lg:border-r border-white/[0.06]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-6 block">
                The Platform
              </span>
              <h2 className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.035em] leading-[0.92] text-white mb-8 md:mb-10">
                Four pillars,{" "}
                <em className="italic font-serif text-[#FF4D00]">one thesis</em>.
              </h2>
              <div className="space-y-5">
                <p className="text-[17px] md:text-[19px] leading-[1.6] text-white/40 font-medium">
                  Critical technology creates industries, builds cities, and unlocks wealth for generations. The next century belongs to the Global South — youngest populations, fastest-growing markets, boldest ambitions.
                </p>
                <p className="text-[14px] md:text-[16px] leading-[1.65] text-white/25 font-medium">
                  But isolated breakthroughs won&apos;t compound on their own.{" "}
                  <span className="text-white/70 font-semibold">Connected ones can.</span> xCelero unites 190 hubs across 39 countries into one commercialization engine — infrastructure, ventures, capital, community — so prosperity doesn&apos;t remain a promise but can become a product.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Pillar cards stacked vertically */}
          <div className="lg:col-span-7">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={pillar.link}
                    className="group block"
                  >
                    <div className={`relative overflow-hidden px-6 md:px-14 py-10 md:py-14 hover:bg-white/[0.02] transition-colors duration-500 ${
                      i < pillars.length - 1 ? "border-b border-white/[0.06]" : ""
                    }`}>
                      {/* Watermark number */}
                      <span className="absolute top-6 right-8 text-[72px] md:text-[96px] font-display font-medium tracking-[-0.04em] text-white/[0.03] leading-none select-none pointer-events-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                        {/* Icon */}
                        <div className="w-11 h-11 shrink-0 flex items-center justify-center border border-white/10 group-hover:border-[#FF4D00]/30 transition-colors duration-300">
                          <Icon className="w-[18px] h-[18px] text-white/20 group-hover:text-[#FF4D00] transition-colors duration-300" strokeWidth={1.5} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-4 mb-4">
                            <h3 className="text-[22px] md:text-[28px] font-display font-medium tracking-[-0.02em] text-white group-hover:text-[#FF4D00] transition-colors duration-300">
                              {pillar.title}
                            </h3>
                            <ArrowRight className="w-4 h-4 text-white/0 group-hover:text-[#FF4D00] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                          </div>

                          <p className="text-[13px] md:text-[14px] leading-[1.75] text-white/20 group-hover:text-white/40 transition-colors duration-300 mb-6 max-w-md">
                            {pillar.description}
                          </p>

                          {/* Stat badge */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-[32px] md:text-[40px] font-display font-medium tracking-[-0.03em] text-white/80 leading-none">
                              {pillar.stat}
                            </span>
                            <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]/40">
                              {pillar.statLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NUMBERS SECTION: Animated counting stats
   ══════════════════════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, prefix, suffix, duration = 2 }: {
  value: number;
  prefix: string;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          let startTime: number | null = null;
          let animationFrame: number;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(value * eased);

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            }
          };

          animationFrame = requestAnimationFrame(animate);
          return () => cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, value, duration]);

  const displayValue = value % 1 === 0 ? Math.round(count) : count.toFixed(1);

  return (
    <div ref={ref} className="tabular-nums">
      <span className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[88px] font-display font-medium tracking-[-0.03em] leading-[1]">
        {prefix}{displayValue}{suffix}
      </span>
    </div>
  );
}

function NumbersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10 bg-[#FAFAFA]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#FF4D00] block mb-4">
            By the numbers
          </span>
          <span className="text-[28px] sm:text-[36px] md:text-[48px] font-display font-medium tracking-[-0.02em] text-[#111111]/80 leading-[1.1]">
            10-Year Outlook
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`border-t border-[#111111]/10 pt-8 pb-8 ${
                  i > 0 ? "lg:border-l lg:pl-8" : ""
                } ${i % 2 === 1 ? "pl-6 sm:pl-8" : ""}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <div className="text-[13px] md:text-[15px] leading-[1.5] text-[#111111]/50 font-medium max-w-[200px] mt-4">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THREE PILLARS SECTION, Each pillar: heading + subtext left, 2 images right
   ══════════════════════════════════════════════════════════════════════════ */
function ThreePillarsSection() {
  return (
    <section className="border-t border-[#111111]/10">
      {pillars.map((pillar, idx) => (
        <PillarBlock key={pillar.id} pillar={pillar} index={idx} />
      ))}
    </section>
  );
}

function PillarBlock({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = pillar.icon;

  return (
    <div
      ref={ref}
      className={`py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10`}
    >
      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: heading + subtext + description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full border border-[#111111]/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#111111]/40">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[64px] lg:text-[80px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-4">
            {pillar.heading}
          </h2>

          <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#111111]/80 font-medium max-w-md mb-4">
            {pillar.subtext}
          </p>

          <p className="text-[14px] md:text-[15px] leading-[1.7] text-[#111111]/50 font-medium max-w-md mb-8">
            {pillar.description}
          </p>

          <Link
            to={pillar.link}
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group"
          >
            Explore {pillar.heading}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Right: 2 image cards side by side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 grid grid-cols-2 gap-4"
        >
          {pillar.images.map((img, i) => (
            <div
              key={i}
              className="aspect-[3/4] overflow-hidden group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                style={{ objectPosition: img.position }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Upcoming Events Data ── */
const homeEvents = [
  {
    title: "Accelerator Cohort 1 Demo Day",
    date: "March 28, 2026",
    time: "10:00 AM EAT",
    location: "M1 Core Nairobi + Virtual",
    type: "Demo Day",
    description: "Ventures present validated MVPs to investors and partners. Sector deep-dives in energy, life sciences, and digital finance.",
    featured: true,
    image: "https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Route Summit: Gulf of Guinea Arc",
    date: "April 12, 2026",
    time: "9:00 AM WAT",
    location: "XEmbassy Lagos",
    type: "Summit",
    description: "Operators and founders from Lagos, Accra, and Abidjan convene for cross-hub deal flow and peer mentorship.",
    featured: false,
    image: "https://images.unsplash.com/photo-1775163560631-6ff15eb2fa1f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Building in Life Sciences: From Lab to Market",
    date: "April 25, 2026",
    time: "2:00 PM EAT",
    location: "Virtual Masterclass",
    type: "Masterclass",
    description: "Regulatory pathways for diagnostics and therapeutics in African markets. Case studies from Refract and Allele.",
    featured: false,
    image: "https://images.unsplash.com/photo-1707944746042-e4c81c191812?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Capital Roundtable: Thematic Fund Deep Dive",
    date: "May 15, 2026",
    time: "11:00 AM CAT",
    location: "M1 Core Cape Town + Virtual",
    type: "Investor Event",
    description: "Thematic Fund allocation strategy, portfolio construction, and co-investment opportunities for LPs.",
    featured: true,
    image: "https://images.unsplash.com/photo-1767893609884-622503897e53?auto=format&fit=crop&w=800&q=80",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   UPCOMING EVENTS SECTION, Magazine-style editorial layout
   ══════════════════════════════════════════════════════════════════════════ */
function UpcomingEventsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featuredEvents = homeEvents.filter((e) => e.featured);
  const otherEvents = homeEvents.filter((e) => !e.featured);
  const heroEvent = featuredEvents[0];

  const eventTypeStyle: Record<string, string> = {
    "Demo Day": "bg-[#FF4D00] text-white",
    Summit: "bg-[#111111] text-white",
    Masterclass: "bg-[#FF4D00]/10 text-[#FF4D00]",
    "Investor Event": "bg-[#FF4D00] text-white",
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10 bg-[#FAFAFA]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-4 block">
                Upcoming Events
              </span>
              <h2 className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.95]">
                Where the network
                <br />
                <em className="italic font-serif text-[#FF4D00]">convenes</em>.
              </h2>
            </div>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group flex-shrink-0"
            >
              View all events
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Magazine layout: featured hero + compact list */}
        <div className="grid lg:grid-cols-12 gap-5 md:gap-6">
          {/* Left: Featured hero event */}
          {heroEvent && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 group border bg-white overflow-hidden hover:shadow-md transition-all duration-300 border-[#FF4D00]/30 hover:border-[#FF4D00]/50"
            >
              {/* Tall hero image */}
              <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                <img
                  src={heroEvent.image}
                  alt={heroEvent.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Type badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2.5 py-1 ${eventTypeStyle[heroEvent.type] || "bg-[#111111]/10 text-[#111111]"}`}>
                    {heroEvent.type}
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2.5 py-1 bg-[#FF4D00] text-white flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                </div>
                {/* Title + date overlaid on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <h3 className="text-[22px] sm:text-[28px] md:text-[34px] font-display font-medium tracking-tight leading-[1.1] text-white mb-3 group-hover:text-[#FF4D00] transition-colors">
                    {heroEvent.title}
                  </h3>
                  <p className="text-[13px] md:text-[15px] text-white/70 leading-[1.6] font-medium mb-4 line-clamp-2">
                    {heroEvent.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/60 font-mono font-bold tracking-[0.05em] uppercase">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF4D00]" />
                      {heroEvent.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF4D00]" />
                      {heroEvent.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF4D00]" />
                      {heroEvent.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Right: Compact event list */}
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
            {/* Second featured event (if any) */}
            {featuredEvents[1] && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="group border bg-white overflow-hidden hover:shadow-md transition-all duration-300 border-[#FF4D00]/30 hover:border-[#FF4D00]/50"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={featuredEvents[1].image}
                    alt={featuredEvents[1].title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-0.5 ${eventTypeStyle[featuredEvents[1].type] || "bg-[#111111]/10 text-[#111111]"}`}>
                      {featuredEvents[1].type}
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-0.5 bg-[#FF4D00] text-white flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[18px] md:text-[20px] font-display font-medium tracking-tight leading-tight mb-2 group-hover:text-[#FF4D00] transition-colors">
                    {featuredEvents[1].title}
                  </h3>
                  <p className="text-[12px] md:text-[13px] text-[#111111]/50 leading-[1.6] font-medium mb-3 line-clamp-2">
                    {featuredEvents[1].description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#111111]/40 font-mono font-bold tracking-[0.05em] uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#FF4D00]/60" />
                      {featuredEvents[1].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF4D00]/60" />
                      {featuredEvents[1].location}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other events as compact rows */}
            {otherEvents.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: "easeOut" }}
                className="group border bg-white overflow-hidden hover:shadow-md transition-all duration-300 border-[#111111]/10 hover:border-[#111111]/25"
              >
                <div className="flex gap-4 p-4 md:p-5">
                  {/* Date block */}
                  <div className="flex-shrink-0 w-16 md:w-20 flex flex-col items-center justify-center border border-[#111111]/10 bg-white py-2">
                    <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#FF4D00]">
                      {event.date.split(" ")[0]}
                    </span>
                    <span className="text-[24px] md:text-[28px] font-display font-medium leading-[1] text-[#111111]">
                      {event.date.split(" ")[1].replace(",", "")}
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#111111]/40">
                      {event.date.split(" ")[2]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[8px] font-mono font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 ${eventTypeStyle[event.type] || "bg-[#111111]/10 text-[#111111]"}`}>
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-[15px] md:text-[17px] font-display font-medium tracking-tight leading-tight mb-1.5 group-hover:text-[#FF4D00] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#111111]/40 font-mono font-bold tracking-[0.05em] uppercase">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF4D00]/60" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF4D00]/60" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LOCATIONS SECTION, Interactive Blueprint Map with leg filters
   ══════════════════════════════════════════════════════════════════════════ */
function LocationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeLeg, setActiveLeg] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10 bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header, centered, NEWLAB style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[36px] sm:text-[56px] md:text-[80px] lg:text-[110px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-4 uppercase">
            The Route
          </h2>
          <p className="text-[14px] md:text-[16px] text-[#111111]/40 font-medium tracking-[0.1em] uppercase max-w-2xl mx-auto">
            Global hubs in geographies prioritizing reindustrialization
          </p>
        </motion.div>

        {/* Leg filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
        >
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
        </motion.div>

        {/* Blueprint Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative w-full mb-8 md:mb-12"
        >
          <BlueprintMap activeLeg={activeLeg} />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] font-mono text-[#111111]/40 mb-8 md:mb-12"
        >
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
        </motion.div>

        {/* View Full Route Map link */}
        <div className="text-center mb-16 md:mb-24">
          <Link
            to="/routes"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-[12px] uppercase tracking-[0.12em] font-bold hover:bg-[#FF4D00] transition-colors duration-300 group"
          >
            View Full Route Map
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Accordion list of route regions */}
        <div className="max-w-4xl mx-auto">
          {routeRegions.map((region, i) => (
            <LocationAccordion key={i} region={region} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Blueprint Map, Newlab topographic map with color-coded pin markers ── */
function BlueprintMap({ activeLeg }: { activeLeg: string | null }) {
  const isAnyActive = activeLeg !== null;

  const visibleLocations = useMemo(
    () => (isAnyActive ? MAP_LOCATIONS.filter((l) => l.legId === activeLeg) : MAP_LOCATIONS),
    [isAnyActive, activeLeg]
  );

  return (
    <div className="w-full relative">
      <div className="relative w-full overflow-hidden bg-white">
        {/* World map image, Newlab topographic map */}
        <img
          alt="World Map showing xCelero Routes"
          className="w-full h-auto pointer-events-none select-none opacity-80"
          src="/routes/newlab-map.avif"
        />

        {/* Pin markers with always-visible labels */}
        {visibleLocations.map((loc, index) => (
          <Link
            key={loc.id}
            to="/routes"
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, delay: index * 0.03 }}
              className="relative flex items-center justify-center"
            >
              {/* Colored marker dot */}
              <span
                className="relative w-3.5 h-3.5 md:w-4 md:h-4 rounded-full shrink-0 cursor-pointer transition-all duration-200 border-[2.5px] border-transparent hover:border-black/20 hover:scale-110"
                style={{ backgroundColor: loc.legColor }}
                aria-label={`View ${loc.name} on Routes page`}
              />

              {/* Always-visible label */}
              <div
                className={`absolute bg-[#111111] text-white font-mono text-[8px] md:text-[10px] font-bold tracking-[0.15em] px-2 py-1 md:px-3 md:py-1.5 whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none shadow-sm ${
                  loc.labelPos === "left" ? "right-full mr-2 md:mr-3" : "left-full ml-2 md:ml-3"
                }`}
              >
                {loc.name}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Location Accordion ── */
function LocationAccordion({
  region,
  index,
}: {
  region: (typeof routeRegions)[number];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-t border-[#111111]/10 border-l-[3px] border-l-[#FF4D00] pl-4 md:pl-6 hover:bg-[#FF4D00]/[0.02] transition-colors"
    >
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF4D00]" />
          </span>
          <MapPin className="w-4 h-4 text-[#FF4D00]/60 group-hover:text-[#FF4D00] transition-colors" />
          <span className="text-[18px] md:text-[22px] font-display font-medium tracking-tight">
            {region.name}
          </span>
        </div>
        <div className="text-[#111111]/30 group-hover:text-[#111111]/60 transition-colors">
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-5 md:pb-6 pl-10 text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.6]">
          {region.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NEWSLETTER SECTION, Two-column: heading + form
   ══════════════════════════════════════════════════════════════════════════ */
function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleReturnToSite = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={ref}
      className="border-t border-[#111111]/10 relative overflow-hidden"
    >
      {/* Subtle dot-grid background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#FF4D00 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white relative z-10">
        <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.95] uppercase mb-6">
              Subscribe to the
              <br />
              xCelero Letter
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.6] max-w-md">
              Quarterly dispatches on critical technology commercialization,
              Route Deal insights, and venture infrastructure across the Global South.
            </p>
          </motion.div>

          {/* Right: Form or Confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Checkmark icon */}
                <div className="w-16 h-16 rounded-full border-2 border-[#FF4D00] flex items-center justify-center">
                  <Check className="w-7 h-7 text-[#FF4D00]" strokeWidth={2.5} />
                </div>

                {/* Confirmation heading */}
                <h3 className="text-[28px] sm:text-[36px] md:text-[44px] font-display font-medium tracking-[-0.02em] leading-[0.95]">
                  Check your inbox
                </h3>

                {/* Confirmation body */}
                <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.6] max-w-md">
                  You&apos;re now subscribed to the xCelero Letter. Look for our quarterly dispatch on critical technology commercialization.
                </p>

                {/* Return to site link */}
                <button
                  onClick={handleReturnToSite}
                  className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group"
                >
                  Return to site
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitError("");
                  setIsSubmitting(true);
                  try {
                    const res = await fetch("/api/capital/subscribe", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, firstName, lastName, consent: true, source: "newsletter_home" }),
                    });
                    if (!res.ok) {
                      const data = await res.json().catch(() => ({}));
                      throw new Error(data.error || "Subscription failed");
                    }
                    setSubmitted(true);
                  } catch (err) {
                    setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                      First Name *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border-b border-[#111111]/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-[#111111]/20"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                      Last Name *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border-b border-[#111111]/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-[#111111]/20"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                    Email *
                  </label>
                  <input
                    suppressHydrationWarning
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-[#111111]/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-[#111111]/20"
                    placeholder="you@email.com"
                  />
                </div>
                <p className="text-[11px] text-[#111111]/30 leading-[1.5]">
                  By subscribing you agree to our{" "}
                  <span className="text-[#2563EB] underline cursor-pointer">Privacy Policy</span>.
                  We respect your data. Unsubscribe anytime.
                </p>
                {submitError && (
                  <p className="text-[13px] text-red-600 font-medium">{submitError}</p>
                )}
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 min-h-[44px] bg-[#FF4D00] text-white text-[12px] uppercase tracking-[0.12em] font-bold hover:bg-[#FF4D00]/90 transition-colors duration-300 shadow-lg shadow-[#FF4D00]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing…" : "Subscribe Now"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
                <p className="text-[10px] text-[#111111]/25 leading-[1.5] mt-3 max-w-sm">
                  We never share your email with third parties. You can unsubscribe at any time. Read our Privacy Policy for details.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
