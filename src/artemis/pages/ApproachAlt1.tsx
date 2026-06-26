"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Subway map stations ── */
const stations = [
  { id: "s1", name: "Discover", x: 8, y: 50, line: "orange", detail: "Market research, problem validation, and founder discovery across the Route's 190 hubs." },
  { id: "s2", name: "Validate", x: 24, y: 30, line: "orange", detail: "MIT Disciplined Entrepreneurship steps 1-12: beachhead market, persona, use case, quantified value proposition." },
  { id: "s3", name: "Build", x: 42, y: 50, line: "orange", detail: "Co-build at Inception Studios. M1 Core lab access, maker space, and engineering talent from the XCitizens network." },
  { id: "s4", name: "Deploy", x: 60, y: 30, line: "white", detail: "Route-based commercialization: pilot in one hub, scale across the corridor. First-customer contracts via industry partners." },
  { id: "s5", name: "Scale", x: 78, y: 50, line: "white", detail: "Capital deployment from $500 to $250K+. Cross-border expansion across 39 countries. Non-dilutive grant matching." },
  { id: "s6", name: "Compound", x: 92, y: 30, line: "white", detail: "Network effects kick in: every venture strengthens infrastructure, capital, and community for the next." },
];

export function ApproachAlt1() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStation, setActiveStation] = useState<string | null>(null);
  const activeData = stations.find((s) => s.id === activeStation);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero */}
      <section ref={ref} className="px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            How We Work · Alt 1 · Subway Map
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            The Route<br />
            <span className="text-white/30">has stops.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-white/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl">
            Every venture passes through six stations — from discovery to compounding. Click a stop to see what happens there.
          </motion.p>
        </div>
      </section>

      {/* Subway Map */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative w-full h-[320px] md:h-[420px] border border-white/10 bg-[#050505] overflow-hidden">
            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* SVG lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Orange line (s1→s2→s3) */}
              <polyline points="8,50 24,30 42,50" fill="none" stroke="#FF4D00" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              {/* White line (s3→s4→s5→s6) */}
              <polyline points="42,50 60,30 78,50 92,30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              {/* Transfer connector s3 */}
              <line x1="42" y1="50" x2="42" y2="50" stroke="#FF4D00" strokeWidth="0.4" strokeDasharray="1,1" />
            </svg>

            {/* Stations */}
            {stations.map((s, i) => {
              const isActive = activeStation === s.id;
              const color = s.line === "orange" ? "#FF4D00" : "rgba(255,255,255,0.5)";
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStation(isActive ? null : s.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`w-5 h-5 md:w-7 md:h-7 rounded-full border-[3px] transition-all ${isActive ? "scale-125" : "group-hover:scale-110"}`} style={{ borderColor: color, backgroundColor: "#0A0A0A" }} />
                    <span className={`mt-2 text-[10px] md:text-[12px] font-mono font-bold tracking-[0.1em] uppercase whitespace-nowrap transition-colors ${isActive ? "text-[#FF4D00]" : "text-white/50 group-hover:text-white"}`}>
                      {s.name}
                    </span>
                  </motion.div>
                </button>
              );
            })}

            {/* Detail panel */}
            <AnimatePresence>
              {activeData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 bg-[#111111] border border-white/10 p-6 z-20"
                >
                  <button onClick={() => setActiveStation(null)} className="absolute top-3 right-3 text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] block mb-2">{activeData.name}</span>
                  <p className="text-[14px] text-white/70 leading-[1.6]">{activeData.detail}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/30 mt-3 text-center">Click any station to see the process</p>
        </div>
      </section>

      {/* Methodology Lines */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Methodology Lines</span>
          <h2 className="font-display font-medium tracking-[-0.025em] text-[32px] md:text-[48px] lg:text-[56px] mb-12">Two tracks, one destination.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { line: "Orange Line", color: "#FF4D00", stops: "Discover → Validate → Build", desc: "The creation track. MIT Disciplined Entrepreneurship steps 1-24, co-built at Inception Studios with lab access and engineering talent." },
              { line: "White Line", color: "rgba(255,255,255,0.5)", stops: "Deploy → Scale → Compound", desc: "The commercialization track. Route-based pilots, capital deployment, and cross-border expansion across 39 countries." },
            ].map((m) => (
              <div key={m.line} className="border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase" style={{ color: m.color }}>{m.line}</span>
                </div>
                <p className="font-display font-medium text-[20px] mb-3">{m.stops}</p>
                <p className="text-[14px] text-white/55 leading-[1.6]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">Ready to board?</h2>
        <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors">
          Apply to build <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
