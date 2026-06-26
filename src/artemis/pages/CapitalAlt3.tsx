"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Orbit,
  Crosshair,
  CircleDollarSign,
  Layers,
  PiggyBank,
  Banknote,
  Shield,
  Landmark,
  Sparkles,
} from "lucide-react";

/* ── Brand constants ── */
const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#FF4D00";

/* ── Portfolio companies (real xCelero ventures) positioned on orbits ── */
type Node = {
  id: string;
  name: string;
  vertical: string;
  code: string;
  loc: string;
  ring: number; // 1, 2, 3 (inner → outer)
  angle: number; // degrees
  vehicle: string;
};

const nodes: Node[] = [
  { id: "helios", name: "Helios", vertical: "Energy", code: "XCL-101", loc: "Kano · Kisumu", ring: 1, angle: -70, vehicle: "The Fund" },
  { id: "ampere", name: "Ampere", vertical: "Energy", code: "XCL-102", loc: "Cape Town · Dubai", ring: 2, angle: -130, vehicle: "Thematic" },
  { id: "ember", name: "Ember", vertical: "Energy", code: "XCL-103", loc: "Rwanda · Tanzania", ring: 1, angle: 200, vehicle: "SPV" },
  { id: "ignis", name: "Ignis", vertical: "Energy", code: "XCL-104", loc: "Namibia · DRC", ring: 3, angle: 160, vehicle: "Anchor" },
  { id: "nimbus", name: "Nimbus", vertical: "Water", code: "XCL-105", loc: "Zinder · Maiduguri", ring: 2, angle: 30, vehicle: "Catalyst" },
  { id: "ceres", name: "Ceres", vertical: "Food", code: "XCL-201", loc: "Ghana · Kenya", ring: 2, angle: 90, vehicle: "Thematic" },
  { id: "bounty", name: "Bounty", vertical: "Food", code: "XCL-202", loc: "Nairobi · Lagos", ring: 1, angle: 60, vehicle: "The Fund" },
  { id: "meridian", name: "Meridian", vertical: "Food", code: "XCL-203", loc: "Rwanda · Ethiopia", ring: 3, angle: 20, vehicle: "SPV" },
  { id: "manna", name: "Manna", vertical: "Food", code: "XCL-204", loc: "Lagos · Kampala", ring: 3, angle: -40, vehicle: "Anchor" },
];

const ringRadii = [90, 150, 215];

function polar(ring: number, angleDeg: number) {
  const r = ringRadii[ring - 1];
  const a = (angleDeg * Math.PI) / 180;
  return { x: 300 + r * Math.cos(a), y: 300 + r * Math.sin(a) };
}

const vehicles = [
  { icon: CircleDollarSign, name: "The Fund", min: "$500", note: "Evergreen · broad exposure" },
  { icon: Layers, name: "SPV Syndicates", min: "$5K", note: "Single-deal co-investment" },
  { icon: PiggyBank, name: "Thematic Funds", min: "$50K", note: "Closed-end · 4 verticals" },
  { icon: Banknote, name: "Catalyst Notes", min: "$10K", note: "Revenue-linked · non-dilutive" },
  { icon: Shield, name: "Non-Dilutive Desk", min: "Advisory", note: "39 markets · 2,400+ programs" },
  { icon: Landmark, name: "Anchor Mandate", min: "$250K", note: "Bespoke SMA · advisory board" },
];

const geoStats = [
  { value: "39", label: "Grant markets wired" },
  { value: "190", label: "Route hubs deployed" },
  { value: "4", label: "Continents in orbit" },
  { value: "2", label: "HoldCo jurisdictions" },
];

/* ══════════════════════════════════════════════════════════════════════════
   CAPITAL ALT 3 — SPATIAL GLOBE (DARK)
   ══════════════════════════════════════════════════════════════════════════ */
export function CapitalAlt3() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <SpatialHero />
      <GeographicDistribution />
      <InvestmentThesis />
      <PortfolioGrid />
      <SpatialCTA />
    </div>
  );
}

/* ── HERO: interactive orbital globe with hover reveals ── */
function SpatialHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<Node>(nodes[0]);

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full opacity-[0.12] blur-[140px]"
        style={{ background: ACCENT }}
      />
      <div ref={ref} className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-16 md:pb-24">
        {/* kicker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3 mb-8"
        >
          <Orbit className="h-4 w-4" style={{ color: ACCENT }} />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            Capital · Alt-03 · Spatial
          </span>
          <span className="h-px w-12 bg-white/20" />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/35">
            Hover the orbit
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT: headline + copy */}
          <div className="lg:col-span-5">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
              className="font-display font-medium tracking-[-0.035em] leading-[0.93] text-[44px] sm:text-[60px] md:text-[74px] lg:text-[82px]"
            >
              Capital in
              <br />
              <span style={{ color: ACCENT }}>orbit.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
              className="mt-8 max-w-md text-[16px] md:text-[18px] leading-[1.6] text-white/65"
            >
              Nine ventures. Three orbital rings. One capital core. Each node
              is a real xCelero company — hover to see which vehicle funded it,
              where it operates, and how it connects back to the center.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/capital"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-mono font-bold tracking-[0.15em] uppercase text-[#0A0A0A] transition-transform hover:scale-[1.03]"
                style={{ background: ACCENT }}
              >
                Enter the orbit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/capital"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[13px] font-mono font-bold tracking-[0.15em] uppercase text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                View all vehicles
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: globe + detail panel */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="sm:col-span-7"
              >
                <Globe active={active} setActive={setActive} />
              </motion.div>

              {/* detail card */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
                className="sm:col-span-5"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="relative border border-white/15 bg-white/[0.03] p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                        {active.code}
                      </span>
                      <Crosshair className="h-4 w-4 text-white/40" />
                    </div>
                    <h3 className="font-display font-medium text-[28px] tracking-[-0.02em] leading-[1] mb-2">
                      {active.name}
                    </h3>
                    <div className="text-[12px] font-mono tracking-[0.1em] uppercase text-white/55 mb-5">
                      {active.vertical}
                    </div>
                    <dl className="space-y-3 text-[13px]">
                      <div className="flex justify-between gap-3 border-t border-white/10 pt-3">
                        <dt className="text-white/40 font-mono uppercase tracking-[0.1em] text-[10px]">Location</dt>
                        <dd className="text-white/85 text-right">{active.loc}</dd>
                      </div>
                      <div className="flex justify-between gap-3 border-t border-white/10 pt-3">
                        <dt className="text-white/40 font-mono uppercase tracking-[0.1em] text-[10px]">Vehicle</dt>
                        <dd className="text-right" style={{ color: ACCENT }}>{active.vehicle}</dd>
                      </div>
                      <div className="flex justify-between gap-3 border-t border-white/10 pt-3">
                        <dt className="text-white/40 font-mono uppercase tracking-[0.1em] text-[10px]">Orbit</dt>
                        <dd className="text-white/85 text-right">Ring {active.ring} · {active.angle}°</dd>
                      </div>
                    </dl>
                    <div className="mt-5 pt-4 border-t border-white/10 text-[10px] font-mono tracking-[0.15em] uppercase text-white/35">
                      Node · {nodes.findIndex((n) => n.id === active.id) + 1} of {nodes.length}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SIGNATURE: stylized SVG orbital globe ── */
function Globe({ active, setActive }: { active: Node; setActive: (n: Node) => void }) {
  return (
    <div className="relative w-full max-w-[460px] mx-auto aspect-square">
      <svg viewBox="0 0 600 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.9" />
            <stop offset="60%" stopColor={ACCENT} stopOpacity="0.25" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.05" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* faint grid backdrop */}
        {[150, 300, 450].map((p) => (
          <g key={p} stroke="#ffffff" strokeOpacity="0.04">
            <line x1={p} y1="40" x2={p} y2="560" />
            <line x1="40" y1={p} x2="560" y2={p} />
          </g>
        ))}

        {/* orbital rings */}
        {ringRadii.map((r, i) => (
          <motion.circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            stroke="#ffffff"
            strokeOpacity="0.12"
            strokeWidth="1"
            strokeDasharray="2 6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: EASE }}
            style={{ transformOrigin: "300px 300px" }}
          />
        ))}

        {/* outer halo ring */}
        <circle cx="300" cy="300" r="260" stroke={ACCENT} strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="300" cy="300" r="278" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="1 10" />

        {/* arcs from core to each node + the node itself */}
        {nodes.map((n, i) => {
          const p = polar(n.ring, n.angle);
          const isActive = active.id === n.id;
          return (
            <g key={n.id}>
              {/* arc to center */}
              <motion.path
                d={`M 300 300 Q ${300 + (p.x - 300) * 0.3} ${300 + (p.y - 300) * 0.3}, ${p.x} ${p.y}`}
                stroke={isActive ? ACCENT : "url(#arcGrad)"}
                strokeWidth={isActive ? 1.6 : 1}
                strokeDasharray="3 8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.08, ease: EASE }}
              />
              {/* flow particle along arc */}
              <motion.circle
                r="2"
                fill={ACCENT}
                initial={{ cx: 300, cy: 300, opacity: 0 }}
                animate={{
                  cx: [300, p.x],
                  cy: [300, p.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  delay: 1 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />
              {/* node hit area + dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r="18"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActive(n)}
                onClick={() => setActive(n)}
              />
              {/* glow */}
              <circle cx={p.x} cy={p.y} r={isActive ? 14 : 8} fill={ACCENT} fillOpacity={isActive ? 0.25 : 0.12} />
              {/* dot */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 6 : 4}
                fill={isActive ? ACCENT : "#ffffff"}
                stroke={ACCENT}
                strokeOpacity={isActive ? 1 : 0.5}
                strokeWidth="1.5"
                animate={isActive ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
              {/* label */}
              <text
                x={p.x}
                y={p.y - 14}
                fill={isActive ? ACCENT : "#ffffff"}
                fillOpacity={isActive ? 1 : 0.55}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="1"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {n.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* central core */}
        <circle cx="300" cy="300" r="50" fill="url(#coreGlow)" />
        <circle cx="300" cy="300" r="20" fill={ACCENT} />
        <circle cx="300" cy="300" r="20" fill="none" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1">
          <animate attributeName="r" values="20;32;20" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x="300" y="297" fill="#0A0A0A" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5" textAnchor="middle">
          xCELERO
        </text>
        <text x="300" y="308" fill="#0A0A0A" fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="1" textAnchor="middle">
          CAPITAL
        </text>
      </svg>

      {/* corner mono labels */}
      <div className="absolute top-0 left-0 text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/30">
        Orbital map
      </div>
      <div className="absolute top-0 right-0 text-[9px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
        {nodes.length} nodes · live
      </div>
      <div className="absolute bottom-0 left-0 text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/30">
        Ring 1 → 3
      </div>
      <div className="absolute bottom-0 right-0 text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/30">
        Interactive
      </div>
    </div>
  );
}

/* ── GEOGRAPHIC DISTRIBUTION ── */
function GeographicDistribution() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-b border-white/10 py-20 md:py-28">
      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-12">
          <Globe2 className="h-4 w-4" style={{ color: ACCENT }} />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            01 · Geography
          </span>
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <h2 className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-[36px] md:text-[52px] lg:text-[64px]">
              39 markets.
              <br />
              <span style={{ color: ACCENT }}>190 hubs.</span>
              <br />
              One constellation.
            </h2>
            <p className="mt-8 max-w-lg text-[15px] leading-[1.65] text-white/60">
              Capital routes through Mauritius HoldCos and UAE Free Zone
              entities, then lands in ventures operating across Sub-Saharan
              Africa, the Gulf, and select OECD markets. The Non-Dilutive Desk
              adds 39 grant jurisdictions on top — capital that never costs
              equity.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px bg-white/10 border border-white/10">
              {geoStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                  className="bg-[#0A0A0A] p-5"
                >
                  <div className="font-display font-medium tracking-[-0.03em] text-[40px] leading-none">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[12px] text-white/55 leading-[1.4]">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* mini orbital cluster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className="relative w-full aspect-square max-w-[440px] mx-auto">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* dotted world-ish field */}
                {Array.from({ length: 7 }).map((_, r) =>
                  Array.from({ length: 7 }).map((__, c) => {
                    const x = 60 + c * 46;
                    const y = 60 + r * 46;
                    // create an irregular continent silhouette
                    const inContinent =
                      (r > 1 && r < 5 && c > 0 && c < 6) || (r === 1 && c > 1 && c < 5);
                    if (!inContinent) return null;
                    return (
                      <circle key={`${r}-${c}`} cx={x} cy={y} r="1.6" fill="#ffffff" fillOpacity="0.18" />
                    );
                  })
                )}
                {/* orange hub nodes scattered */}
                {[
                  [120, 140],
                  [180, 110],
                  [240, 160],
                  [150, 200],
                  [210, 220],
                  [280, 200],
                  [170, 280],
                  [250, 290],
                  [310, 250],
                  [130, 250],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="9" fill={ACCENT} fillOpacity="0.12" />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill={ACCENT}
                      initial={{ scale: 0.5, opacity: 0.3 }}
                      animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.2, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </g>
                ))}
                {/* connecting arcs */}
                <path d="M 120 140 Q 180 150 240 160" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                <path d="M 150 200 Q 200 210 280 200" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                <path d="M 170 280 Q 210 285 250 290" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 4" fill="none" />
              </svg>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                Route constellation · 190 hubs
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── INVESTMENT THESIS: vehicles as a vertical spatial list ── */
function InvestmentThesis() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-b border-white/10 py-20 md:py-28">
      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-12">
          <Sparkles className="h-4 w-4" style={{ color: ACCENT }} />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            02 · Thesis
          </span>
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14">
          <h2 className="lg:col-span-7 font-display font-medium tracking-[-0.033em] leading-[0.95] text-[36px] md:text-[52px] lg:text-[60px]">
            Six vehicles, sequenced by
            <span style={{ color: ACCENT }}> conviction.</span>
          </h2>
          <p className="lg:col-span-5 self-end text-[15px] leading-[1.65] text-white/60">
            The studio builds the venture first. Capital is then routed through
            the vehicle that fits the stage, the geography, and the investor —
            from a $500 scout check to a $250M anchor mandate.
          </p>
        </div>

        <div className="relative">
          {/* vertical spine */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/15" />
          <div className="space-y-3">
            {vehicles.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                  className="group relative grid grid-cols-12 items-center gap-4 pl-0 py-5 border-t border-white/10 transition-colors hover:bg-white/[0.02]"
                >
                  {/* spine node */}
                  <div className="col-span-1 relative flex justify-center">
                    <span
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
                      style={{ borderColor: `${ACCENT}55`, color: ACCENT, background: "#0A0A0A" }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  {/* name */}
                  <div className="col-span-6 md:col-span-5">
                    <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30">
                      Vehicle {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="font-display font-medium text-[20px] md:text-[24px] tracking-[-0.015em] mt-1">
                      {v.name}
                    </div>
                  </div>
                  {/* note */}
                  <div className="hidden md:block col-span-4 text-[13px] text-white/55 leading-[1.5]">
                    {v.note}
                  </div>
                  {/* min */}
                  <div className="col-span-5 md:col-span-2 text-right">
                    <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/30">
                      Min entry
                    </div>
                    <div className="font-mono font-bold text-[16px]" style={{ color: ACCENT }}>
                      {v.min}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PORTFOLIO GRID: company cards ── */
function PortfolioGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-b border-white/10 py-20 md:py-28">
      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-12">
          <Crosshair className="h-4 w-4" style={{ color: ACCENT }} />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            03 · Portfolio
          </span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/35">
            {nodes.length} ventures shown
          </span>
        </div>

        <h2 className="font-display font-medium tracking-[-0.033em] leading-[0.95] text-[36px] md:text-[52px] lg:text-[60px] mb-12 max-w-3xl">
          The nodes on the map,
          <br />
          <span style={{ color: ACCENT }}>decoded.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {nodes.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="group relative bg-[#0A0A0A] p-6 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                  {n.code}
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30">
                  Ring {n.ring}
                </span>
              </div>
              <h3 className="font-display font-medium text-[24px] tracking-[-0.02em] leading-[1] mb-2">
                {n.name}
              </h3>
              <div className="text-[12px] font-mono tracking-[0.1em] uppercase text-white/55 mb-5">
                {n.vertical}
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[12px] text-white/60">{n.loc}</span>
                <span className="text-[11px] font-mono font-bold tracking-[0.1em]" style={{ color: ACCENT }}>
                  {n.vehicle}
                </span>
              </div>
              {/* hover orbit indicator */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" style={{ background: ACCENT }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA: enter the orbit ── */
function SpatialCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{ background: `radial-gradient(circle at 50% 60%, ${ACCENT}, transparent 55%)` }}
      />
      <div ref={ref} className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Orbit className="h-4 w-4" style={{ color: ACCENT }} />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
              Enter the orbit
            </span>
          </div>
          <h2 className="font-display font-medium tracking-[-0.035em] leading-[0.92] text-[42px] md:text-[64px] lg:text-[80px] max-w-4xl mx-auto">
            From <span style={{ color: ACCENT }}>$500</span> to the
            <br />
            outermost ring.
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-[15px] md:text-[16px] leading-[1.6] text-white/60">
            Open a Fund account in minutes, or talk to investor relations about
            Syndicate, Thematic, Catalyst, and Anchor mandates. Every vehicle
            connects back to the same capital core.
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
              Talk to investor relations
              <ArrowUpRight className="h-4 w-4" />
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
