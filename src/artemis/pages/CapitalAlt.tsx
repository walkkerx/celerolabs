"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, ArrowUpRight, Coins, TrendingUp, Users, Building2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Capital ecosystem nodes ── */
const vehicles = [
  { id: "fund", name: "The xCelero Fund", stage: "Core", ticket: "$50K – $2M", desc: "The flagship evergreen fund. Deployed across all 9 verticals, anchored by institutional LPs.", color: "#FF4D00" },
  { id: "spv", name: "SPV Syndicates", stage: "Deal-by-deal", ticket: "$25K – $500K", desc: "Special-purpose vehicles for individual deals. Co-invest alongside the fund on specific ventures.", color: "#059669" },
  { id: "thematic", name: "Thematic Funds", stage: "Sector", ticket: "$10K – $250K", desc: "Focused pools per vertical — Energy, Life Sciences, Digital Finance. For investors with sector conviction.", color: "#d97706" },
  { id: "catalyst", name: "Catalyst Notes", stage: "Pre-seed", ticket: "$500 – $25K", desc: "Convertibles that bridge ventures from prototype to pilot. The earliest entry point.", color: "#7c3aed" },
  { id: "nondilutive", name: "Non-Dilutive Desk", stage: "Grants", ticket: "$5K – $500K", desc: "Matches ventures with grants, prizes, and government incentives across 39+ countries. No equity lost.", color: "#0284c7" },
  { id: "anchor", name: "Anchor Mandate", stage: "Series A+", ticket: "$250K – $2M+", desc: "Lead or co-lead rounds for breakout ventures scaling across the Route.", color: "#e11d48" },
];

const tiers = [
  { name: "Scout", range: "$500 – $5K", desc: "Entry point. Learn the Route, back catalyst notes, access deal flow.", perks: ["Quarterly deal memos", "Community access", "Annual LP call"] },
  { name: "Syndicate", range: "$5K – $50K", desc: "Co-invest via SPVs. Sector access, quarterly deep-dives.", perks: ["SPV participation", "Thematic reports", "Founder access events"] },
  { name: "Partner", range: "$50K – $250K", desc: "Fund LP stake + direct co-investment rights.", perks: ["Fund LP share", "Direct co-invest", "Board observer seats"] },
  { name: "Anchor", range: "$250K+", desc: "Strategic capital. Lead rounds, shape thesis.", perks: ["Lead investor rights", "Thesis input", "Joint venture creation"] },
];

export function CapitalAlt() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Hero */}
      <section ref={ref} className="px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            Capital · Alt
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            Capital that<br />
            <span className="text-[#111111]/30">knows the terrain.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-[#111111]/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl mb-8">
            Six vehicles, one thesis: back critical technology in the markets that need it most. From $500 scouts to $2M+ anchors — capital that matches the realities of building across 39 countries.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45, ease: EASE }} className="flex flex-col sm:flex-row gap-3">
            <Link to="/capital" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors">
              Invest from $500 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/join" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-[#111111] text-[#111111] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#111111] hover:text-white transition-colors">
              Talk to the team
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Capital ecosystem — all vehicles visible, no tabs */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">The ecosystem</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05] mb-4">
              Six vehicles. One engine.
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#111111]/55 leading-[1.6]">
              Each vehicle serves a stage. Together they cover the full capital journey — from a $500 catalyst note to a $2M+ anchor round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-white border border-[#111111]/10 hover:border-[#FF4D00] transition-colors p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-1 text-white" style={{ backgroundColor: v.color }}>{v.stage}</span>
                  <span className="text-[10px] font-mono tracking-[0.1em] text-[#111111]/40">{v.ticket}</span>
                </div>
                <h3 className="font-display font-medium text-[18px] md:text-[20px] tracking-tight mb-2 group-hover:text-[#FF4D00] transition-colors">{v.name}</h3>
                <p className="text-[13px] text-[#111111]/60 leading-[1.55]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment philosophy */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 bg-white border-t border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Philosophy</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05]">
              How we think about returns.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Patient capital, compounding returns", desc: "We optimize for compounding across the network, not quarterly markups. The Route rewards patience." },
              { icon: Users, title: "Solidarity pricing", desc: "Founders in early-stage markets access the same quality of support at a fraction of Silicon Valley costs." },
              { icon: Building2, title: "Infrastructure-leveraged", desc: "Every investment is amplified by 190 hubs, shared services, and the XCitizens network. Capital alone doesn't compound." },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border-l-2 border-[#FF4D00] pl-5">
                  <Icon className="w-5 h-5 text-[#FF4D00] mb-4" strokeWidth={1.5} />
                  <h3 className="font-display font-medium text-[18px] mb-2">{p.title}</h3>
                  <p className="text-[13px] text-[#111111]/60 leading-[1.6]">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tiers — with context */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Tiers</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05]">
              From scout to anchor.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-[#111111]/10 p-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] block mb-3">{t.range}</span>
                <h3 className="font-display font-medium text-[22px] mb-3">{t.name}</h3>
                <p className="text-[13px] text-[#111111]/60 leading-[1.55] mb-4">{t.desc}</p>
                <ul className="space-y-2 pt-4 border-t border-[#111111]/10">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-[12px] text-[#111111]/70">
                      <span className="w-1 h-1 rounded-full bg-[#FF4D00] mt-1.5 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-[#111111]/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">Ready to deploy?</h2>
        <p className="text-[#111111]/55 text-[15px] mb-8 max-w-md mx-auto">Start with $500 or talk to us about a partner commitment.</p>
        <Link to="/capital" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors">
          Invest now <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
