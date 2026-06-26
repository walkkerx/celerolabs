"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  ArrowUpRight,
  Quote,
  Mail,
  BookOpen,
  Layers,
  Sun,
  Droplets,
  Wheat,
  Cpu,
  Factory,
  Wallet,
} from "lucide-react";

/* ── Brand constants ── */
const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#FF4D00";

/* serif stack for editorial drop-caps + pull quotes */
const SERIF =
  'Georgia, "Times New Roman", "Iowan Old Style", "Palatino Linotype", serif';

/* ── Editorial data ── */
const timeline = [
  {
    issue: "No. 01",
    year: "2024",
    title: "The Fund opens",
    copy: "Evergreen commingled vehicle launches with $500 entry. First 1,200 scout investors onboarded across 14 countries.",
    metric: "$8.4M raised",
  },
  {
    issue: "No. 02",
    year: "2024",
    title: "First SPV closes",
    copy: "Single-asset syndicate co-invests alongside a sovereign DFI on the Helios microgrid seed round.",
    metric: "$3.1M deployed",
  },
  {
    issue: "No. 03",
    year: "2025",
    title: "Catalyst Notes pilot",
    copy: "Revenue-linked notes issued to four revenue-stage ventures. First repayment cycle completed in 38 days.",
    metric: "1.8× on pace",
  },
  {
    issue: "No. 04",
    year: "2025",
    title: "Non-Dilutive Desk scales",
    copy: "Desk secures $4.2M in grants and incentives across 39 markets for portfolio ventures — at zero equity cost.",
    metric: "$180K avg raise",
  },
  {
    issue: "No. 05",
    year: "2026",
    title: "Thematic Fund I",
    copy: "Closed-end Energy vehicle targets $400M across 12 ventures. Board observer seats reserved for Partner tier.",
    metric: "$400M target",
  },
];

const sectors = [
  { icon: Sun, name: "Energy", alloc: "28%", ventures: "Helios · Ampere · Ember · Ignis" },
  { icon: Droplets, name: "Water", alloc: "12%", ventures: "Nimbus · Aqueduct · Maru" },
  { icon: Wheat, name: "Food Systems", alloc: "18%", ventures: "Tilth · Granary · Soko" },
  { icon: Wallet, name: "Digital Finance", alloc: "16%", ventures: "Ledger · Soko Pay · Tab" },
  { icon: Factory, name: "Manufacturing", alloc: "14%", ventures: "Forge · Loom · Crucible" },
  { icon: Cpu, name: "Critical Tech", alloc: "12%", ventures: "Cipher · Vector · Lodestar" },
];

const pullQuotes = [
  {
    quote:
      "We didn't build a fund and then look for deals. We built the ventures first, then wired the capital to follow them. The vehicle is the plumbing, not the product.",
    attr: "Founding partner",
    role: "xCelero Capital · investment committee",
  },
  {
    quote:
      "Entry from $500 is not a marketing decision. It is the structural consequence of an evergreen fund that believes critical-technology exposure should not be gated by accreditation.",
    attr: "Head of vehicle design",
    role: "xCelero Capital · structuring",
  },
];

const masthead = [
  { label: "Issue", value: "No. 04" },
  { label: "Volume", value: "Capital" },
  { label: "Vehicles", value: "06" },
  { label: "Markets", value: "39" },
  { label: "Entry", value: "$500" },
];

/* ══════════════════════════════════════════════════════════════════════════
   CAPITAL ALT 2 — MAGAZINE EDITORIAL (LIGHT)
   ══════════════════════════════════════════════════════════════════════════ */
export function CapitalAlt2() {
  return (
    <div className="bg-[#FAFAFA] text-[#111111] min-h-screen">
      <MagazineHero />
      <InvestmentTimeline />
      <SectorBreakdown />
      <TeamInsights />
      <ContactCTA />
    </div>
  );
}

/* ── HERO: full-bleed magazine cover ── */
function MagazineHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative border-b border-[#111111]/15 bg-white">
      {/* top masthead bar */}
      <div className="border-b border-[#111111]/15">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/50">
            xCelero Editorial
          </span>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            Issue 04 · Capital
          </span>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/50">
            Cover story
          </span>
        </div>
      </div>

      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-20 md:pb-28">
        {/* issue kicker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
            ISSUE 04
          </span>
          <span className="h-px flex-1 bg-[#111111]/15" />
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#111111]/40">
            THE CAPITAL NUMBER
          </span>
        </motion.div>

        {/* giant serif headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          className="font-display font-medium tracking-[-0.035em] leading-[0.92] text-[52px] sm:text-[80px] md:text-[110px] lg:text-[140px]"
        >
          The <span style={{ color: ACCENT }}>Capital</span>
          <br />
          Number.
        </motion.h1>

        {/* deck / standfirst */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="lg:col-span-7 lg:col-start-2"
          >
            <p
              className="text-[20px] md:text-[24px] leading-[1.45] text-[#111111]/85"
              style={{ fontFamily: SERIF }}
            >
              <span
                className="float-left mr-3 mt-2 leading-[0.78] font-bold"
                style={{
                  fontSize: "5.2rem",
                  fontFamily: SERIF,
                  color: ACCENT,
                }}
              >
                S
              </span>
              ix vehicles, $500 entry, 39 grant markets, one deployment engine.
              Inside the xCelero Capital apparatus — where the studio builds the
              venture, then wires the capital to follow it. This issue maps the
              plumbing, the people, and the path from scout check to anchor mandate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
            className="lg:col-span-3 lg:col-start-10 border-l-2 pl-6"
            style={{ borderColor: ACCENT }}
          >
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40 mb-3">
              In this issue
            </div>
            <ul className="space-y-2 text-[14px] leading-[1.4]">
              <li className="flex gap-2">
                <span className="font-mono text-[#111111]/40">01</span>
                <span>The vehicles, decoded</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#111111]/40">02</span>
                <span>A timeline of deployment</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#111111]/40">03</span>
                <span>Where the money lands</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#111111]/40">04</span>
                <span>Voices from the committee</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#111111]/40">05</span>
                <span>How to subscribe</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* masthead strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.44 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-5 border-t border-[#111111]/15"
        >
          {masthead.map((m) => (
            <div key={m.label} className="border-r border-[#111111]/15 last:border-r-0 py-5 px-4">
              <div className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                {m.label}
              </div>
              <div className="mt-1 font-display font-medium text-[22px] tracking-[-0.02em]">
                {m.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── INVESTMENT TIMELINE: horizontal editorial timeline ── */
function InvestmentTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-b border-[#111111]/15 py-20 md:py-28">
      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* section divider */}
        <div className="flex items-center gap-4 mb-14 md:mb-20">
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
            01 — DISPATCHES
          </span>
          <span className="h-px flex-1 bg-[#111111]/15" />
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#111111]/40">
            A TIMELINE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <h2
            className="lg:col-span-8 font-display font-medium tracking-[-0.035em] leading-[0.95] text-[40px] md:text-[60px] lg:text-[76px]"
          >
            Five issues, <span style={{ color: ACCENT }}>one</span> deployment arc.
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 self-end text-[14px] leading-[1.6] text-[#111111]/60">
            A chronological record of how xCelero Capital opened, scaled, and
            sequenced its six vehicles — from the first scout check to the
            Thematic Fund I close.
          </p>
        </div>

        {/* horizontal timeline */}
        <div className="relative overflow-x-auto scrollbar-thin pb-6">
          <div className="relative min-w-[920px] lg:min-w-0">
            {/* the spine */}
            <div className="absolute left-0 right-0 top-[88px] h-px bg-[#111111]/20" />

            <div className="grid grid-cols-5 gap-4">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.issue}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* issue + year above spine */}
                  <div className="h-[72px] flex flex-col justify-end pb-3">
                    <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                      {t.issue}
                    </div>
                    <div className="text-[12px] font-mono tracking-[0.15em] text-[#111111]/45">
                      {t.year}
                    </div>
                  </div>
                  {/* node */}
                  <div className="relative flex items-center justify-center h-[32px]">
                    <span
                      className="h-3 w-3 rounded-full ring-4 ring-[#FAFAFA]"
                      style={{ background: ACCENT }}
                    />
                  </div>
                  {/* content below spine */}
                  <div className="pt-4 pr-3">
                    <h3 className="font-display font-medium text-[20px] md:text-[22px] tracking-[-0.015em] leading-[1.1] mb-3">
                      {t.title}
                    </h3>
                    <p
                      className="text-[13px] leading-[1.55] text-[#111111]/70 mb-4"
                      style={{ fontFamily: SERIF }}
                    >
                      {t.copy}
                    </p>
                    <div className="inline-flex items-center gap-1.5 border-t border-[#111111]/15 pt-2">
                      <span className="text-[11px] font-mono font-bold tracking-[0.1em]" style={{ color: ACCENT }}>
                        {t.metric}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SECTOR BREAKDOWN: grid showcase ── */
function SectorBreakdown() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-b border-[#111111]/15 py-20 md:py-28 bg-white">
      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-4 mb-14">
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
            02 — THE PORTFOLIO
          </span>
          <span className="h-px flex-1 bg-[#111111]/15" />
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#111111]/40">
            WHERE THE MONEY LANDS
          </span>
        </div>

        <h2 className="font-display font-medium tracking-[-0.035em] leading-[0.95] text-[40px] md:text-[60px] lg:text-[72px] mb-14 md:mb-16 max-w-3xl">
          Six verticals,
          <span style={{ color: ACCENT }}> one thesis.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111111]/15 border border-[#111111]/15">
          {sectors.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                className="group bg-white p-6 md:p-8 transition-colors hover:bg-[#FAFAFA]"
              >
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
                    style={{ borderColor: `${ACCENT}44`, color: ACCENT }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">
                    {String(i + 1).padStart(2, "0")} / 06
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="font-display font-medium text-[26px] tracking-[-0.02em]">
                    {s.name}
                  </h3>
                  <span className="font-mono font-bold text-[20px]" style={{ color: ACCENT }}>
                    {s.alloc}
                  </span>
                </div>
                <p className="text-[12px] font-mono tracking-[0.05em] text-[#111111]/55 leading-[1.5]">
                  {s.ventures}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-3 text-[12px] font-mono tracking-[0.15em] uppercase text-[#111111]/45">
          <Layers className="h-4 w-4" style={{ color: ACCENT }} />
          Allocation weights · target portfolio composition
        </div>
      </div>
    </section>
  );
}

/* ── TEAM INSIGHTS: serif drop-cap pull quotes ── */
function TeamInsights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-b border-[#111111]/15 py-20 md:py-32">
      <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-4 mb-14 md:mb-20">
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
            03 — VOICES
          </span>
          <span className="h-px flex-1 bg-[#111111]/15" />
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#111111]/40">
            FROM THE COMMITTEE
          </span>
        </div>

        <div className="space-y-20 md:space-y-28">
          {pullQuotes.map((q, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              {/* index marker */}
              <div className="lg:col-span-2 lg:[direction:ltr]">
                <div className="flex items-center gap-2">
                  <Quote className="h-5 w-5" style={{ color: ACCENT }} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#111111]/40">
                    Quote {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              {/* the pull quote with serif drop cap */}
              <blockquote
                className="lg:col-span-8 lg:[direction:ltr]"
                style={{ fontFamily: SERIF }}
              >
                <p className="text-[26px] md:text-[34px] lg:text-[40px] leading-[1.25] tracking-[-0.01em] text-[#111111]">
                  <span
                    className="float-left mr-3 mt-2 leading-[0.72] font-bold"
                    style={{ fontSize: "5.6rem", color: ACCENT, fontFamily: SERIF }}
                  >
                    {q.quote.charAt(0)}
                  </span>
                  {q.quote.slice(1)}
                </p>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="h-px w-8" style={{ background: ACCENT }} />
                  <span className="text-[13px] font-mono font-bold tracking-[0.1em] uppercase text-[#111111]">
                    {q.attr}
                  </span>
                  <span className="text-[12px] font-mono tracking-[0.05em] text-[#111111]/45">
                    / {q.role}
                  </span>
                </figcaption>
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT CTA: subscribe to the issue ── */
function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-[#111111] text-white py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ background: `radial-gradient(circle at 30% 40%, ${ACCENT}, transparent 55%)` }}
      />
      <div ref={ref} className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-7"
          >
            <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
              04 — SUBSCRIBE
            </span>
            <h2 className="mt-6 font-display font-medium tracking-[-0.035em] leading-[0.92] text-[44px] md:text-[68px] lg:text-[88px]">
              Read the next
              <br />
              <span style={{ color: ACCENT }}>issue</span> from inside.
            </h2>
            <p className="mt-8 max-w-lg text-[16px] leading-[1.6] text-white/65">
              Open a Fund account from $500 and receive quarterly NAV dispatches,
              or talk to investor relations about Syndicate, Thematic, Catalyst,
              and Anchor mandates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="lg:col-span-5 space-y-3"
          >
            <Link
              to="/capital"
              className="group flex items-center justify-between gap-4 rounded-none border border-white/15 px-6 py-5 transition-colors hover:border-white/40 hover:bg-white/[0.03]"
            >
              <div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40">
                  Action 01
                </div>
                <div className="mt-1 font-display font-medium text-[20px] tracking-[-0.015em]">
                  Open a Fund account
                </div>
                <div className="text-[12px] font-mono text-white/50 mt-1">
                  $500 entry · evergreen · quarterly liquidity
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: ACCENT }} />
            </Link>

            <Link
              to="/capital"
              className="group flex items-center justify-between gap-4 rounded-none border border-white/15 px-6 py-5 transition-colors hover:border-white/40 hover:bg-white/[0.03]"
            >
              <div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40">
                  Action 02
                </div>
                <div className="mt-1 font-display font-medium text-[20px] tracking-[-0.015em]">
                  Talk to investor relations
                </div>
                <div className="text-[12px] font-mono text-white/50 mt-1">
                  SPV · Thematic · Catalyst · Anchor mandates
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: ACCENT }} />
            </Link>

            <Link
              to="/capital"
              className="group flex items-center justify-between gap-4 rounded-none border border-white/15 px-6 py-5 transition-colors hover:border-white/40 hover:bg-white/[0.03]"
            >
              <div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40">
                  Action 03
                </div>
                <div className="mt-1 font-display font-medium text-[20px] tracking-[-0.015em]">
                  Subscribe to dispatches
                </div>
                <div className="text-[12px] font-mono text-white/50 mt-1">
                  Quarterly capital updates · no commitment
                </div>
              </div>
              <Mail className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: ACCENT }} />
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.15em] uppercase text-white/40">
            <BookOpen className="h-4 w-4" style={{ color: ACCENT }} />
            xCelero Editorial · Issue 04 · Capital
          </div>
          <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-white/25 max-w-2xl md:text-right leading-[1.6]">
            This is not an offer to sell securities. Vehicle structures subject
            to regulatory approval. Venture investments are illiquid and involve
            substantial risk of loss.
          </p>
        </div>
      </div>
    </section>
  );
}
