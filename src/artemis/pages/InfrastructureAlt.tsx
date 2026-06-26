"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, ArrowUpRight, Building2, Wrench, Users, Globe2, Cpu, Layers } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Core components of the OS ── */
const components = [
  { icon: Building2, name: "M1 Core Campuses", desc: "50,000 sq ft flagships in prime hub cities. Lab, maker space, co-working — the physical substrate.", stats: [{ v: "50K", l: "Sq ft" }, { v: "6", l: "Cities" }] },
  { icon: Layers, name: "XEmbassy Nodes", desc: "5,000 sq ft drop-in studios extending reach into secondary markets across the Route.", stats: [{ v: "5K", l: "Sq ft" }, { v: "12", l: "Nodes" }] },
  { icon: Globe2, name: "Living Labs", desc: "Distributed field testing sites. Real-world validation environments across 39 countries.", stats: [{ v: "39", l: "Countries" }, { v: "∞", l: "Test sites" }] },
  { icon: Wrench, name: "Shared Services", desc: "Legal stack, ops dashboard, design system, accounting — shared infrastructure for every venture.", stats: [{ v: "8", l: "Services" }, { v: "1", l: "Stack" }] },
  { icon: Cpu, name: "Route OS", desc: "The commercialization engine connecting 190 hubs. Moves a breakthrough from lab to market without losing it in transit.", stats: [{ v: "190", l: "Hubs" }, { v: "6", l: "Legs" }] },
  { icon: Users, name: "XCitizens Network", desc: "Operators, founders, investors, mentors — 100 per cohort. The connective tissue that compounds everything.", stats: [{ v: "100", l: "/ cohort" }, { v: "4", l: "Roles" }] },
];

export function InfrastructureAlt() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero */}
      <section ref={ref} className="relative px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-20 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF4D00]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            Infrastructure · Alt
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            An operating system<br />
            <span className="text-[#FF4D00]">for critical technology.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-white/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl mb-8">
            Infrastructure isn&apos;t a building. It&apos;s the connected system that lets a breakthrough in one hub become a product in thirty-nine countries. Six components. One machine.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45, ease: EASE }} className="flex flex-col sm:flex-row gap-3">
            <Link to="/infrastructure" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors">
              Explore the system <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/join" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors">
              Build on it
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OS overview — thesis */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">The thesis</span>
              <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05] mb-6">
                Infrastructure is the scarce thing.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <p className="text-[15px] md:text-[16px] text-white/60 leading-[1.7]">
                A lab in Kigali that can&apos;t manufacture, ship, or get paid isn&apos;t innovation — it&apos;s waste. The breakthrough is the cheap part. The substrate that lets it compound is the scarce thing.
              </p>
              <p className="text-[15px] md:text-[16px] text-white/60 leading-[1.7]">
                We build that substrate: campuses, nodes, labs, shared services, the Route OS, and the XCitizens network. Connected, not scattered. So a breakthrough in one hub becomes a flywheel across thirty-nine countries.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-white/40">The difference</p>
                <p className="text-[14px] text-white/50 mt-2">Scattered projects stall. Connected systems compound.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core components — all visible, unified */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-white/10 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Core components</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05]">
              Six parts. One machine.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-[#0A0A0A] border border-white/10 hover:border-[#FF4D00] transition-colors p-6 md:p-7"
                >
                  <Icon className="w-6 h-6 text-[#FF4D00] mb-5" strokeWidth={1.5} />
                  <h3 className="font-display font-medium text-[20px] md:text-[22px] tracking-tight mb-3 group-hover:text-[#FF4D00] transition-colors">{c.name}</h3>
                  <p className="text-[13px] text-white/55 leading-[1.55] mb-5">{c.desc}</p>
                  <div className="flex gap-6 pt-4 border-t border-white/10">
                    {c.stats.map((s) => (
                      <div key={s.l}>
                        <p className="font-display font-medium text-[22px] text-white leading-none">{s.v}</p>
                        <p className="text-[9px] font-mono tracking-[0.1em] uppercase text-white/40 mt-1">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it serves founders */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">How it serves founders</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05]">
              From day one, founders get the machine.
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { step: "Day 1", desc: "M1 Core campus access — lab, maker space, co-working" },
              { step: "Week 2", desc: "Shared services live: legal stack, ops dashboard, design system" },
              { step: "Month 3", desc: "Route OS activated: pilot in one hub, first-customer contracts" },
              { step: "Month 6", desc: "Living lab deployment: field testing across 39 countries" },
              { step: "Month 12", desc: "XCitizens network compounding: talent, mentors, investors" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-6 p-5 border border-white/10 hover:border-[#FF4D00]/30 transition-colors"
              >
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] min-w-[80px]">{m.step}</span>
                <div className="flex-1 h-px bg-white/10" />
                <p className="text-[14px] text-white/70 font-medium flex-1">{m.desc}</p>
                <ArrowUpRight className="w-4 h-4 text-white/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-white/10 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Proof points</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05]">
              What the machine produces.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/8">
            {[
              { v: "190", l: "Hubs operational" },
              { v: "39", l: "Countries" },
              { v: "40+", l: "Ventures deployed" },
              { v: "5,000+", l: "Companies projected" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#0A0A0A] p-7 md:p-9">
                <p className="font-display font-medium text-[40px] md:text-[56px] tracking-tight leading-none mb-2">{s.v}</p>
                <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-white/40">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-white/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">Build on the machine.</h2>
        <p className="text-white/55 text-[15px] mb-8 max-w-md mx-auto">The infrastructure exists. The question is what you build on it.</p>
        <Link to="/infrastructure" className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors">
          Explore full infrastructure <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
