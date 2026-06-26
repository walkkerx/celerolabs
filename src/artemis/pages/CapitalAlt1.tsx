"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  CircleDollarSign,
  Layers,
  PiggyBank,
  Banknote,
  Shield,
  Landmark,
  ArrowDownRight,
  Activity,
  Globe2,
  TrendingUp,
} from "lucide-react";

/* ── Brand constants ── */
const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#FF4D00";
const DARK = "#0A0A0A";

/* ── Vehicle data (real-ish, xCelero Capital) ── */
const vehicles = [
  {
    name: "xCelero Fund",
    short: "The Fund",
    icon: CircleDollarSign,
    min: "$500",
    flow: 34,
    note: "Evergreen · broad exposure · quarterly liquidity",
  },
  {
    name: "SPV Syndicates",
    short: "SPV",
    icon: Layers,
    min: "$5K",
    flow: 22,
    note: "Single-deal co-investment · side-by-side economics",
  },
  {
    name: "Thematic Funds",
    short: "Thematic",
    icon: PiggyBank,
    min: "$50K",
    flow: 18,
    note: "7-yr closed-end · 4 verticals · 8–15 ventures each",
  },
  {
    name: "Catalyst Notes",
    short: "Catalyst",
    icon: Banknote,
    min: "$10K",
    flow: 11,
    note: "Revenue-linked · 1.5–2.5× target · non-dilutive",
  },
  {
    name: "Non-Dilutive Desk",
    short: "Grants",
    icon: Shield,
    min: "Advisory",
    flow: 9,
    note: "2,400+ programs · 39 countries · $180K avg raise",
  },
  {
    name: "Anchor Mandate",
    short: "Anchor",
    icon: Landmark,
    min: "$250K",
    flow: 6,
    note: "Bespoke SMA · advisory board · GP carry",
  },
];

const impactStats = [
  { value: "$4B", label: "Capital target by 2032" },
  { value: "6", label: "Vehicles in motion" },
  { value: "39", label: "Grant markets wired" },
  { value: "190", label: "Route hubs deployed" },
];

const futureMilestones = [
  { year: "2025", label: "$120M deployed across 6 vehicles", pct: 18 },
  { year: "2027", label: "First Thematic Fund closes at $400M", pct: 42 },
  { year: "2030", label: "Anchor Mandates cross $1.5B AUM", pct: 74 },
  { year: "2032", label: "$4B cumulative capital target reached", pct: 100 },
];

/* ══════════════════════════════════════════════════════════════════════════
   CAPITAL ALT 1 — FLOW VISUALIZATION (DARK)
   ══════════════════════════════════════════════════════════════════════════ */
export function CapitalAlt1() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <FlowHero />
      <CapitalSources />
      <PortfolioImpact />
      <FutureVision />
      <FlowCTA />
    </div>
  );
}

/* ── HERO: asymmetrical split with animated capital flow viz ── */
function FlowHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* ambient orange glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: ACCENT }}
      />
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* LEFT: editorial copy (cols 1-6) */}
        <div ref={ref} className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10" style={{ background: ACCENT }} />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
              Capital · Alt-01 · Flow
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-[44px] sm:text-[58px] md:text-[72px] lg:text-[84px]"
          >
            Capital that
            <br />
            <span style={{ color: ACCENT }}>moves</span> like
            <br />
            current.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="mt-8 max-w-xl text-[16px] md:text-[18px] leading-[1.6] text-white/65"
          >
            Six vehicles. One pipeline. Capital that flows from $500 scout
            checks to $250M anchor mandates — wired through 39 grant markets
            and 190 route hubs, deployed against critical-technology ventures
            the studio builds itself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/capital-alt-1"
              onClick={() => {}}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-mono font-bold tracking-[0.15em] uppercase text-[#0A0A0A] transition-transform hover:scale-[1.03]"
              style={{ background: ACCENT }}
            >
              Enter the flow
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/capital"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[13px] font-mono font-bold tracking-[0.15em] uppercase text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              Compare vehicles
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: animated flow visualization (cols 7-12) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="lg:col-span-6"
        >
          <FlowDiagram />
        </motion.div>
      </div>
    </section>
  );
}

/* ── SIGNATURE: animated capital flow diagram (SVG) ──
   Sources (left column) → flow lines → ventures (right column).
   Animated stroke-dashoffset + pulsing nodes + flowing particles. */
function FlowDiagram() {
  const sources = [
    { y: 60, label: "FUND", sub: "$500+" },
    { y: 150, label: "SPV", sub: "$5K+" },
    { y: 240, label: "THEMATIC", sub: "$50K+" },
    { y: 330, label: "CATALYST", sub: "$10K+" },
    { y: 420, label: "GRANTS", sub: "39 mkts" },
  ];
  const ventures = [
    { y: 50, label: "Energy" },
    { y: 130, label: "Water" },
    { y: 210, label: "Food" },
    { y: 290, label: "Digital Finance" },
    { y: 370, label: "Manufacturing" },
    { y: 450, label: "Critical Tech" },
  ];

  return (
    <div className="relative w-full aspect-[5/6] sm:aspect-[5/5] max-w-[520px] mx-auto">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.05" />
            <stop offset="50%" stopColor={ACCENT} stopOpacity="0.9" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.6" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint grid */}
        {[100, 200, 300, 400].map((x) => (
          <line key={`v${x}`} x1={x} y1="20" x2={x} y2="480" stroke="#ffffff" strokeOpacity="0.04" />
        ))}

        {/* flow paths: each source fans to 2-3 ventures */}
        {sources.map((s, si) =>
          ventures.map((v, vi) => {
            // connect each source to ~2 ventures
            if ((si + vi) % 2 !== 0 && (si + vi) % 3 !== 0) return null;
            const x1 = 110;
            const y1 = s.y;
            const x2 = 390;
            const y2 = v.y;
            const cx1 = 230;
            const cy1 = s.y;
            const cx2 = 270;
            const cy2 = v.y;
            const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
            return (
              <g key={`${si}-${vi}`}>
                {/* base faint line */}
                <path d={d} stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
                {/* animated orange flow */}
                <motion.path
                  d={d}
                  stroke="url(#flowGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="6 240"
                  initial={{ strokeDashoffset: 246 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 2.6,
                    delay: 0.4 + si * 0.15 + vi * 0.05,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </g>
            );
          })
        )}

        {/* source nodes (left) */}
        {sources.map((s, i) => (
          <g key={`s${i}`}>
            <circle cx="110" cy={s.y} r="26" fill="url(#nodeGlow)" />
            <motion.circle
              cx="110"
              cy={s.y}
              r="6"
              fill={ACCENT}
              initial={{ scale: 0.6, opacity: 0.4 }}
              animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="110" cy={s.y} r="11" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="1" />
            <text x="92" y={s.y - 18} fill="#ffffff" fillOpacity="0.85" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5" textAnchor="end">
              {s.label}
            </text>
            <text x="92" y={s.y - 6} fill={ACCENT} fontSize="8" fontFamily="monospace" textAnchor="end">
              {s.sub}
            </text>
          </g>
        ))}

        {/* venture nodes (right) */}
        {ventures.map((v, i) => (
          <g key={`v${i}`}>
            <circle cx="390" cy={v.y} r="4" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="390" cy={v.y} r="9" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" />
            <text x="410" y={v.y + 3} fill="#ffffff" fillOpacity="0.7" fontSize="9" fontFamily="monospace" letterSpacing="0.5">
              {v.label}
            </text>
          </g>
        ))}

        {/* center label */}
        <text x="250" y="248" fill="#ffffff" fillOpacity="0.3" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="2" textAnchor="middle">
          DEPLOYMENT
        </text>
        <text x="250" y="262" fill={ACCENT} fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5" textAnchor="middle">
          FLOW ENGINE
        </text>
      </svg>

      {/* corner mono labels */}
      <div className="absolute top-0 left-0 text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/30">
        Sources
      </div>
      <div className="absolute top-0 right-0 text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/30">
        Ventures
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
        Live · 6 vehicles → 6 verticals
      </div>
    </div>
  );
}

/* ── CAPITAL SOURCES: the 6 vehicles as animated horizontal flow bars ── */
function CapitalSources() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="border-b border-white/10 py-20 md:py-28">
      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
              01 · Sources
            </span>
            <h2 className="mt-4 font-display font-medium tracking-[-0.03em] leading-[0.95] text-[36px] md:text-[52px] lg:text-[64px]">
              Six channels,
              <br />
              one reservoir.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-[1.6] text-white/55">
            Every dollar enters through one of six purpose-built vehicles.
            The bar shows relative deployment weight in the live portfolio.
          </p>
        </div>

        <div className="space-y-2">
          {vehicles.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="group relative grid grid-cols-12 items-center gap-4 border-t border-white/10 py-5 md:py-6 transition-colors hover:bg-white/[0.02]"
              >
                {/* index */}
                <div className="col-span-1 text-[11px] font-mono font-bold tracking-[0.15em] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* icon + name */}
                <div className="col-span-4 md:col-span-3 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                    style={{ borderColor: `${ACCENT}55`, color: ACCENT }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-display font-medium text-[18px] md:text-[20px] tracking-[-0.01em]">
                      {v.name}
                    </div>
                    <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/35">
                      {v.short}
                    </div>
                  </div>
                </div>
                {/* note */}
                <div className="hidden md:block col-span-4 text-[13px] text-white/55 leading-[1.5]">
                  {v.note}
                </div>
                {/* min entry */}
                <div className="col-span-3 md:col-span-1 text-right md:text-left">
                  <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/30">
                    Min
                  </div>
                  <div className="font-mono font-bold text-[15px] text-white">{v.min}</div>
                </div>
                {/* flow bar */}
                <div className="col-span-4 md:col-span-3">
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${v.flow}%` } : {}}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.3 + i * 0.08 }}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT}00, ${ACCENT})`,
                      }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[9px] font-mono tracking-[0.15em] uppercase text-white/30">
                    <span>deploy weight</span>
                    <span style={{ color: ACCENT }}>{v.flow}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── PORTFOLIO IMPACT: where the flow lands ── */
function PortfolioImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20 md:py-28">
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: ACCENT }}
      />
      <div ref={ref} className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
              02 · Impact
            </span>
            <h2 className="mt-4 font-display font-medium tracking-[-0.03em] leading-[0.95] text-[36px] md:text-[52px] lg:text-[60px]">
              The flow
              <br />
              has a <span style={{ color: ACCENT }}>destination.</span>
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-[1.65] text-white/60">
              Capital is not the product. The ventures are. Every vehicle
              routes into companies the studio originates — energy, water,
              food, digital finance, manufacturing, critical tech — across
              39 countries and 190 route hubs.
            </p>
            <div className="mt-8 flex items-center gap-3 text-[12px] font-mono tracking-[0.15em] uppercase text-white/40">
              <Activity className="h-4 w-4" style={{ color: ACCENT }} />
              Live deployment · updated quarterly
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-px bg-white/10 border border-white/10">
            {impactStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="bg-[#0A0A0A] p-6 md:p-8 flex flex-col justify-between min-h-[180px]"
              >
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-display font-medium tracking-[-0.03em] text-[44px] md:text-[56px] leading-none">
                    {s.value}
                  </div>
                  <div className="mt-3 text-[13px] text-white/55 leading-[1.4]">
                    {s.label}
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

/* ── FUTURE VISION: capital target trajectory ── */
function FutureVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-b border-white/10 py-20 md:py-28">
      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-14 md:mb-20">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            03 · Trajectory
          </span>
          <h2 className="mt-4 font-display font-medium tracking-[-0.03em] leading-[0.95] text-[36px] md:text-[52px] lg:text-[64px] max-w-3xl">
            From $120M to $4B,
            <br />
            <span style={{ color: ACCENT }}>in current.</span>
          </h2>
        </div>

        <div className="relative">
          {/* baseline */}
          <div className="absolute left-0 right-0 bottom-[2px] h-px bg-white/15" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {futureMilestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                className="relative"
              >
                {/* vertical bar */}
                <div className="relative h-44 md:h-56 mb-4 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${m.pct}%` } : {}}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.3 + i * 0.12 }}
                    className="w-full rounded-t-sm relative"
                    style={{
                      background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}22)`,
                    }}
                  >
                    <span className="absolute -top-7 left-0 right-0 text-center text-[12px] font-mono font-bold tracking-[0.1em]" style={{ color: ACCENT }}>
                      {m.pct}%
                    </span>
                  </motion.div>
                </div>
                {/* node on baseline */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
                  <span className="text-[14px] font-mono font-bold tracking-[0.15em] text-white">
                    {m.year}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.5] text-white/55 pr-4">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex items-center gap-3 text-[12px] font-mono tracking-[0.15em] uppercase text-white/40">
          <TrendingUp className="h-4 w-4" style={{ color: ACCENT }} />
          Projected · subject to fund formation &amp; regulatory approval
        </div>
      </div>
    </section>
  );
}

/* ── CTA: enter the flow ── */
function FlowCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ACCENT}, transparent 60%)`,
        }}
      />
      <div ref={ref} className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Globe2 className="h-4 w-4" style={{ color: ACCENT }} />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
              Enter the flow
            </span>
          </div>
          <h2 className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-[40px] md:text-[60px] lg:text-[76px] max-w-4xl mx-auto">
            Start with <span style={{ color: ACCENT }}>$500.</span>
            <br />
            Move with the current.
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-[15px] md:text-[16px] leading-[1.6] text-white/60">
            Open a Fund account in minutes, or talk to us about Syndicate,
            Thematic, Catalyst, and Anchor mandates. Every vehicle is wired to
            the same deployment engine.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/capital"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[13px] font-mono font-bold tracking-[0.15em] uppercase text-[#0A0A0A] transition-transform hover:scale-[1.03]"
              style={{ background: ACCENT }}
            >
              Open Fund account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/capital"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-[13px] font-mono font-bold tracking-[0.15em] uppercase text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              <ArrowDownRight className="h-4 w-4" />
              Talk to investor relations
            </Link>
          </div>
          <p className="mt-12 text-[10px] font-mono tracking-[0.1em] uppercase text-white/25 max-w-2xl mx-auto leading-[1.6]">
            This is not an offer to sell securities. All vehicle structures are
            subject to regulatory approval and may differ from what is described
            here. Venture investments are illiquid and involve substantial risk.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
