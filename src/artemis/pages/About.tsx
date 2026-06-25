"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  MapPin,
  ChevronDown,
  Flame,
  Wheat,
  Anchor,
  Cog,
  Factory,
  Rocket,
  Globe,
  Lightbulb,
  Users,
  Crown,
} from "lucide-react";
import { teamData, TeamMember } from "@/artemis/data/team";

/* ── Timeline Data ── */
const timelineEras = [
  {
    era: "200,000 BCE",
    title: "The First Networks",
    subtitle: "Food Gatherers & Hunting Circles",
    description:
      "Early humans survived not as individuals, but as circles. Hunting parties coordinated across vast savannahs. Food gatherers shared knowledge of seasons, water sources, and medicinal plants. The first technology was cooperation. The first infrastructure was trust.",
    icon: Flame,
    isCurrentDay: false,
  },
  {
    era: "10,000 BCE",
    title: "The Agricultural Compact",
    subtitle: "Settlement, Surplus, and Specialization",
    description:
      "When humans planted the first seed, they also planted the first economy. Surplus created trade. Trade created routes. Routes created cities. The Nile, the Niger, the Zambezi became arteries of commerce. Specialization was born: the blacksmith, the weaver, the healer.",
    icon: Wheat,
    isCurrentDay: false,
  },
  {
    era: "800 - 1600 CE",
    title: "The Trade Routes",
    subtitle: "Trans-Saharan, Swahili Coast, and Silk Road",
    description:
      "Gold, salt, ivory, and ideas flowed along routes that connected Timbuktu to Cairo, Kilwa to Gujarat, and Mogadishu to Malacca. These were not just trade corridors; they were knowledge highways. The Hausa city-states, the Great Zimbabwe, the Swahili coast: all built on the principle that commerce and culture travel together.",
    icon: Anchor,
    isCurrentDay: false,
  },
  {
    era: "1800 - 1960",
    title: "The Extraction Century",
    subtitle: "Colonial Infrastructure, Extractive Economics",
    description:
      "Railways were built, but only from mine to port. Universities were founded, but only to train administrators. Infrastructure served extraction, not self-reliance. The pattern was consistent: raw materials left, finished goods returned, value accumulated elsewhere.",
    icon: Cog,
    isCurrentDay: false,
  },
  {
    era: "1960 - 2000",
    title: "Independence Without Infrastructure",
    subtitle: "Political Freedom, Economic Dependency",
    description:
      "Flags changed. Borders hardened. But the infrastructure of extraction remained. Post-colonial economies inherited railways that still ran mine-to-port. Aid replaced trade. Structural adjustment replaced industrial policy. The talent drain accelerated: 70,000 professionals leaving Africa annually by the year 2000.",
    icon: Globe,
    isCurrentDay: false,
  },
  {
    era: "2000 - 2019",
    title: "The Digital Leap",
    subtitle: "Mobile Money, Fintech, and the Startup Ecosystem",
    description:
      "M-Pesa proved that Africa could leapfrog. Mobile-first innovation spread across the continent: fintech in Lagos, agritech in Nairobi, healthtech in Kigali. But 90% of ventures still failed. The ecosystem had talent and ambition but lacked the architecture to turn ideas into operating companies at scale.",
    icon: Factory,
    isCurrentDay: false,
  },
  {
    era: "2020",
    title: "The Thesis Is Drafted",
    subtitle: "Amina Osei-Mensah drafts the xCelero thesis",
    description:
      "After a decade leading Africa investments at a sovereign wealth fund, and building three venture-backed companies, Amina Osei-Mensah drafts the founding thesis: the Global South doesn't need more incubators or more aid. It needs infrastructure, ventures, capital, and community, integrated as a single platform. The four pillars.",
    icon: Lightbulb,
    isCurrentDay: true,
  },
  {
    era: "2021 - 2022",
    title: "The Platform Takes Shape",
    subtitle: "M1 Core Nairobi, XEmbassy Lagos, Route Leg 1",
    description:
      "The first M1 Core campus is planned for Nairobi: 50,000 sq ft of lab, maker, and co-working space. XEmbassy nodes are designed for Lagos and Accra. The first accelerator cohort is targeted. Six investment vehicles are being structured. The Route moves from thesis to operating infrastructure.",
    icon: Rocket,
    isCurrentDay: true,
  },
  {
    era: "2023 - Present",
    title: "The Flywheel Is Building",
    subtitle: "Assembling 190 hubs, 39 countries, 40+ ventures on the Route",
    description:
      "xCelero is assembling the infrastructure to operate across 190 hubs in 39 countries. 40+ ventures are projected to build on the Route. Seven accelerator cohorts are planned. The XCitizen network is designed to exceed 1,200 members at scale. The four pillars will compound with every cycle.",
    icon: Users,
    isCurrentDay: true,
  },
];

/* ── Manifesto data ── */
const manifestoPoints = [
  {
    number: "01",
    title: "The Model is Broken",
    heading: "Centralized, extractive, myopic.",
    text: "The dominant model of global innovation is broken. For decades, \"critical technologies\" have been defined by narrow geopolitical interests, focused on supremacy in defense, aerospace, and computing. These models hoard genius in a handful of elite cities, while treating the rest of the world as a market for consumption or an arena for extraction.",
  },
  {
    number: "02",
    title: "The Self-Reliance Mandate",
    heading: "True self-reliance is technological.",
    text: "We reject the centralized, elitist models that hoard opportunity. We champion a world where a coder in Niamey can spark a startup with a financier in Tokyo. Under xHansa, we recognize that true self-reliance is not just political; it is technological. It is the ability to generate electricity, secure food, purify water, and defend networks on one's own terms.",
  },
  {
    number: "03",
    title: "Systematic Maximalism",
    heading: "Deep-tech architecture.",
    text: "xCelero represents a systemic rewrite of how critical innovation is funded, built, and deployed. We do not do \"apps for convenience.\" We do deep-tech infrastructure. We do Civilizational Flow. This is not a manifesto of hope; it is a declaration of intent. Welcome to the engine of the next civilization.",
  },
];

/* ── Team categories ── */
const categories = [
  { key: "all", label: "All" },
  { key: "investment", label: "Investment" },
  { key: "product-programs", label: "Product & Programs" },
  { key: "business-community", label: "Business & Community" },
  { key: "finance-operations", label: "Finance & Operations" },
  { key: "research", label: "Research & Associates" },
];

/* ── Critical Domains Data ── */
const criticalDomains = [
  {
    name: "Energy",
    description: "Distributed power generation, microgrids, and off-grid infrastructure",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Water",
    description: "Atmospheric harvesting, desalination, and purification systems",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Food & Agriculture",
    description: "Precision farming, agritech, and food supply chain infrastructure",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Manufacturing",
    description: "Distributed production, additive manufacturing, and local value addition",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mobility & Logistics",
    description: "Autonomous transport, cross-border trade rails, and last-mile delivery",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Data & Intelligence",
    description: "Independent AI, federated learning, and locally-controlled data infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Built Environments",
    description: "Prefabricated housing, smart cities, and climate-adaptive construction",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Life Sciences",
    description: "Diagnostics, therapeutics, and point-of-care biotech for emerging markets",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Digital Finance",
    description: "Mobile money rails, fractional investment, and cross-border settlement",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Education",
    description: "Adaptive learning, project-based curricula, and cognitive infrastructure",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Space",
    description: "Orbital independence, satellite infrastructure, and off-world capability",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Defense & Security",
    description: "Independent security tech, AI-driven surveillance, and cyber infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Climate & Regeneration",
    description: "Carbon credits, bio-acoustic monitoring, and circular industrial systems",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   ABOUT PAGE: Opening + What Is + Flowing narrative + How we work + critical domains + manifesto cards
   ══════════════════════════════════════════════════════════════════════════ */
export function About() {
  return (
    <div className="bg-white text-[#111111]">
      <OpeningSection />
      <WhatIsXceleroSection />
      <FlowingContent />
      <HowWeWorkSection />
      <CriticalDomainsSection />
      <ManifestoCardsSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   OPENING: Understated entry point, not a "hero"
   ══════════════════════════════════════════════════════════════════════════ */
function OpeningSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="pt-16 sm:pt-20 md:pt-28 pb-0 px-5 sm:px-6 md:px-12 lg:px-20">
      <div ref={ref} className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-6 block">
            About
          </span>

          <h1 className="text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.08] font-display font-medium tracking-[-0.02em] mb-6">
            From the first{" "}
            <em className="italic font-serif text-[#FF4D00]">circle</em> to the
            four pillars.
          </h1>

          <p className="text-base sm:text-lg md:text-xl leading-[1.6] text-[#111111]/45 font-medium max-w-2xl">
            For 200,000 years, humans have organized in circles to hunt, trade,
            build, and compound. xCelero is the latest iteration of that oldest
            pattern. This is the story of how we got here, what we believe, and
            who is building it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   WHAT IS XCELERO LABS: Clean single-column editorial layout
   ══════════════════════════════════════════════════════════════════════════ */
const whatIsStats = [
  { value: "4", label: "Integrated Pillars" },
  { value: "190", label: "Projected Hubs" },
  { value: "39+", label: "Countries in Scope" },
];

function WhatIsXceleroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-5 sm:px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-b border-[#111111]/10"
    >
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-6 block">
            What is xCelero Labs
          </span>

          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-display font-medium tracking-[-0.02em] leading-[1.12] mb-8">
            Building the operating system for the next civilization.
          </h2>

          <div className="space-y-5">
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#111111]/55 font-medium">
              xCelero Labs is a venture platform that exists to solve one problem: critical technology doesn&apos;t commercialize in the markets that need it most. The Global South has the youngest populations, the fastest-growing economies, and the boldest ambitions, but 90% of ventures there never cross the valley of death. Not because the technology doesn&apos;t work. Because the infrastructure to scale it doesn&apos;t exist.
            </p>

            <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#111111]/55 font-medium">
              We are building xCelero to fill that gap. Four integrated pillars — Infrastructure, Ventures, Capital, and Community — are designed to operate as a single machine. M1 Core campuses will provide 50,000+ sq ft of lab and maker space. Structured commercialization programs will take ventures from prototype to revenue. Six investment vehicles are designed to deploy capital from $500 to $250K+. And the XCitizen network will connect every operator, founder, investor, and mentor across 190 hubs and 39 countries.
            </p>

            <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#111111]/55 font-medium">
              <strong className="text-[#111111] font-semibold">
                The ambition is not incremental. We are not building another accelerator or another fund. We are building the operating system for a new civilization — one where the geographies that were once extracted from can become the geographies that produce, invent, and export. Where self-reliance is not a slogan but a technological reality. Where a founder in Nairobi will have the same architecture to scale as a founder in New York.
              </strong>
            </p>
          </div>
        </motion.div>

        {/* Stats row: horizontal, clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-12 md:mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-[#111111]/10 pt-8"
        >
          {whatIsStats.map((stat, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <div className="text-[32px] sm:text-[40px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1] text-[#FF4D00]">
                {stat.value}
              </div>
              <div className="text-[12px] md:text-[13px] text-[#111111]/40 font-medium leading-[1.4] max-w-[100px]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FLOWING CONTENT: Timeline only, one continuous thread
   ══════════════════════════════════════════════════════════════════════════ */
function FlowingContent() {
  return (
    <section className="pt-16 md:pt-24 pb-16 md:pb-24 px-5 sm:px-6 md:px-12 lg:px-20">
      {/* Keyframe animation for current-day glow pulse */}
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 6px 2px rgba(255,77,0,0.35); }
          50% { box-shadow: 0 0 14px 5px rgba(255,77,0,0.55); }
        }
        .timeline-glow-dot {
          animation: glow-pulse 2.4s ease-in-out infinite;
        }
      `}</style>
      <div className="w-full max-w-3xl mx-auto relative">
        {/* The continuous vertical thread */}
        <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px bg-[#111111]/8" />

        {/* Timeline entries */}
        {timelineEras.map((era, i) => (
          <TimelineEntry key={era.era} era={era} index={i} isLast={i === timelineEras.length - 1} />
        ))}
      </div>
    </section>
  );
}

/* ── Timeline Entry ── */
function TimelineEntry({
  era,
  index,
  isLast,
}: {
  era: (typeof timelineEras)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = era.icon;

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
      className={`relative pl-10 md:pl-14 ${isLast ? "" : "pb-10 md:pb-14"}`}
    >
      {/* Dot on the thread */}
      <div className="absolute left-0 md:left-0 top-1.5 flex items-center justify-center w-[23px] md:w-[31px]">
        <div
          className={`rounded-full z-10 ${
            era.isCurrentDay
              ? "w-3.5 h-3.5 bg-[#FF4D00] timeline-glow-dot"
              : "w-2 h-2 bg-[#111111]/20"
          }`}
        />
      </div>

      {/* Content */}
      <div
        className={`rounded-sm px-4 py-4 -mx-4 transition-colors duration-300 ${
          era.isCurrentDay
            ? "bg-[#FF4D00]/[0.04]"
            : isEven
              ? "bg-[#111111]/[0.015]"
              : "bg-transparent"
        }`}
      >
        {/* Era + icon row */}
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className={`w-6 h-6 flex items-center justify-center ${
              era.isCurrentDay
                ? "bg-[#FF4D00] text-white"
                : "text-[#111111]/25"
            }`}
          >
            <Icon className="w-3 h-3" strokeWidth={1.5} />
          </div>
          <span
            className={`text-[11px] font-mono font-bold tracking-[0.12em] uppercase ${
              era.isCurrentDay ? "text-[#FF4D00]" : "text-[#111111]/30"
            }`}
          >
            {era.era}
          </span>
          {era.isCurrentDay && (
            <span className="text-[9px] font-mono font-bold tracking-[0.08em] uppercase px-1.5 py-0.5 bg-[#FF4D00]/8 text-[#FF4D00]">
              Now
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight leading-[1.2] mb-1">
          {era.title}
        </h3>
        <p className="text-[12px] font-mono font-bold tracking-[0.08em] uppercase text-[#FF4D00]/60 mb-3">
          {era.subtitle}
        </p>

        {/* Description */}
        <p className="text-[14px] md:text-[15px] text-[#111111]/50 leading-[1.7] font-medium">
          {era.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HOW WE WORK: Card grid with photos, bios, filter tabs
   ══════════════════════════════════════════════════════════════════════════ */
function HowWeWorkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredMembers =
    activeCategory === "all"
      ? teamData
      : teamData.filter((m) => m.category === activeCategory);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-5 sm:px-6 md:px-12 lg:px-20 bg-[#FAFAFA]"
    >
      {/* Header: narrow, aligned with rest of page */}
      <div className="w-full max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4 block">
            How we work
          </span>
          <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-display font-medium tracking-tight leading-[1.08] mb-4">
            Not a hierarchy.{" "}
            <em className="italic font-serif text-[#FF4D00]">An operating system</em>.
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111111]/40 font-medium leading-[1.6] max-w-xl">
            Part venture studio, part accelerator, part infrastructure platform.
            Every function exists to compound founder outcomes.
          </p>
        </motion.div>
      </div>

      {/* Filter tabs + Team grid: wider for the card grid */}
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-1.5 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              suppressHydrationWarning
              onClick={() => {
                setActiveCategory(cat.key);
                setExpandedId(null);
              }}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all min-h-[44px] ${
                activeCategory === cat.key
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/20 hover:text-[#111111]/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Team grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {filteredMembers.map((member, i) => (
              <TeamCard
                key={member.id}
                member={member}
                index={i}
                isExpanded={expandedId === member.id}
                onToggle={() =>
                  setExpandedId(expandedId === member.id ? null : member.id)
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Helper: Get initials from name ── */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !part.endsWith("."))
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ── Team Card ── */
function TeamCard({
  member,
  index,
  isExpanded,
  onToggle,
}: {
  member: TeamMember;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardInView = useInView(ref, { once: true, margin: "-20px" });
  const initials = getInitials(member.name);
  const isFounder = member.isFounder;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      className={`border p-5 md:p-6 bg-white transition-all duration-300 cursor-pointer group ${
        isFounder
          ? isExpanded
            ? "border-[#FF4D00]/40"
            : "border-[#FF4D00]/20 hover:border-[#FF4D00]/40"
          : isExpanded
            ? "border-[#FF4D00]/30"
            : "border-[#111111]/8 hover:border-[#FF4D00]/25"
      }`}
      onClick={onToggle}
    >
      {/* Monogram + Name */}
      <div className="flex items-start gap-4 mb-3">
        <div
          className={`shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center ${
            isFounder
              ? "bg-[#FF4D00] text-white"
              : "bg-[#111111] text-white/70 group-hover:bg-[#111111]/80 transition-colors"
          }`}
        >
          <span className="text-[14px] md:text-[16px] font-display font-medium tracking-tight leading-none">
            {initials}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-[16px] md:text-[18px] font-display font-medium tracking-tight leading-[1.2] mb-0.5">
              {member.name}
            </h4>
            {isFounder && (
              <Crown className="w-3.5 h-3.5 text-[#FF4D00] shrink-0" strokeWidth={1.5} />
            )}
          </div>
          <p className={`text-[12px] md:text-[13px] font-medium leading-[1.4] ${
            isFounder ? "text-[#FF4D00]" : "text-[#FF4D00]/70"
          }`}>
            {member.role}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 mb-3">
        <MapPin className="w-3 h-3 text-[#111111]/25" />
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">
          {member.location}
        </span>
      </div>

      {/* Category tag */}
      <span className="inline-block px-2 py-0.5 bg-[#F5F5F5] text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 mb-1">
        {member.category}
      </span>

      {/* Expandable bio */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="pt-3 mt-3 border-t border-[#111111]/8">
              <p className="text-[13px] md:text-[14px] text-[#111111]/50 leading-[1.7] font-medium">
                {member.bio}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand hint */}
      <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#111111]/5">
        <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/15 group-hover:text-[#FF4D00]/50 transition-colors">
          {isExpanded ? "Close" : "Bio"}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#111111]/15 group-hover:text-[#FF4D00]/50 transition-all duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CRITICAL DOMAINS: 13 domain image cards
   ══════════════════════════════════════════════════════════════════════════ */
function CriticalDomainsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24"
    >
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-5 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4 block">
            Critical Domains
          </span>
          <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-display font-medium tracking-tight leading-[1.08] mb-4">
            13 technologies. One{" "}
            <em className="italic font-serif text-[#FF4D00]">Route</em>.
          </h2>
          <p className="text-[15px] md:text-[17px] text-white/40 font-medium leading-[1.6] max-w-xl">
            Each domain is a vertical where self-reliance is not optional but
            existential. We build, invest, and deploy across all thirteen.
          </p>
        </motion.div>

        {/* Domain image cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {criticalDomains.map((domain, i) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              {/* Background image */}
              <img
                src={domain.image}
                alt={domain.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/30" />

              {/* Text content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h3 className="text-[14px] md:text-[16px] font-display font-medium text-white leading-tight mb-1">
                  {domain.name}
                </h3>
                <p className="text-[11px] text-white/60 leading-[1.5] font-medium">
                  {domain.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link to ventures */}
        <div className="mt-8 md:mt-10">
          <Link
            to="/ventures"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#FF4D00] hover:text-white transition-colors group"
          >
            Explore ventures in these domains
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MANIFESTO CARDS: Horizontal side-by-side cards below How We Work
   ══════════════════════════════════════════════════════════════════════════ */
function ManifestoCardsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-5 sm:px-6 md:px-12 lg:px-20 bg-white"
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4 block">
            What we believe
          </span>
          <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-display font-medium tracking-tight leading-[1.08] mb-4">
            Not incrementalists.{" "}
            <em className="italic font-serif text-[#FF4D00]">Systematic maximalists</em>.
          </h2>
        </motion.div>

        {/* Horizontal cards grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {manifestoPoints.map((point, i) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="relative border border-[#111111]/8 border-l-2 border-l-transparent p-6 md:p-8 bg-[#FAFAFA] group hover:border-[#FF4D00]/20 hover:border-l-[#FF4D00] transition-colors overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4D00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Background watermark number */}
              <span
                className="absolute -top-4 -right-2 text-[100px] md:text-[120px] font-display font-bold leading-none text-[#111111]/[0.03] select-none pointer-events-none"
                aria-hidden="true"
              >
                {point.number}
              </span>

              {/* Number + label */}
              <div className="flex items-center gap-2 mb-5 relative z-10">
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#FF4D00]">
                  {point.number}
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#111111]/25">
                  {point.title}
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight leading-[1.2] mb-4 relative z-10">
                {point.heading}
              </h3>

              {/* Text */}
              <p className="text-[13px] md:text-[14px] text-[#111111]/45 leading-[1.7] font-medium relative z-10">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Link to full manifesto */}
        <div className="mt-8 md:mt-10">
          <Link
            to="/manifesto"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#FF4D00] hover:text-[#111111] transition-colors group"
          >
            Read the full manifesto
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
