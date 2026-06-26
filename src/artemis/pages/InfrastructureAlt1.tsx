"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, X, Cpu } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Neural network nodes ── */
const nodes = [
  { id: "n1", label: "M1 Core", x: 50, y: 15, desc: "50,000 sq ft flagship campuses. Lab, maker space, co-working in prime hub cities." },
  { id: "n2", label: "XEmbassy", x: 20, y: 40, desc: "5,000 sq ft drop-in studios. Compact nodes extending reach into secondary markets." },
  { id: "n3", label: "Living Labs", x: 80, y: 40, desc: "Distributed field testing sites. Real-world validation environments across the Route." },
  { id: "n4", label: "Capital Desk", x: 15, y: 70, desc: "6 vehicles: Fund, SPVs, Thematic, Catalyst Notes, Non-Dilutive, Anchor Mandate." },
  { id: "n5", label: "XCitizens", x: 50, y: 80, desc: "Operators, founders, investors, mentors. 100 per cohort. The connective tissue." },
  { id: "n6", label: "Route OS", x: 85, y: 70, desc: "The commercialization engine connecting 190 hubs across 39 countries." },
];

const connections = [
  ["n1", "n2"], ["n1", "n3"], ["n2", "n4"], ["n3", "n6"],
  ["n4", "n5"], ["n6", "n5"], ["n1", "n5"], ["n2", "n3"],
];

export function InfrastructureAlt1() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const activeData = nodes.find((n) => n.id === activeNode);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero */}
      <section ref={ref} className="px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            Infrastructure · Alt 1 · Neural Network
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            The network<br />
            <span className="text-white/30">is the product.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-white/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl">
            Six interconnected nodes form the xCelero nervous system. Click any node to trace its connections.
          </motion.p>
        </div>
      </section>

      {/* Neural network diagram */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative w-full h-[440px] md:h-[520px] border border-white/10 bg-[#050505] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map(([a, b], i) => {
                const na = nodes.find((n) => n.id === a)!;
                const nb = nodes.find((n) => n.id === b)!;
                const isActive = activeNode === a || activeNode === b;
                return (
                  <line
                    key={i}
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke={isActive ? "#FF4D00" : "rgba(255,255,255,0.12)"}
                    strokeWidth={isActive ? "0.5" : "0.25"}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Pulsing connection pulses */}
            {connections.map(([a, b], i) => {
              const na = nodes.find((n) => n.id === a)!;
              const nb = nodes.find((n) => n.id === b)!;
              return (
                <motion.div
                  key={`pulse-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#FF4D00] pointer-events-none"
                  initial={{ left: `${na.x}%`, top: `${na.y}%`, opacity: 0 }}
                  animate={isInView ? {
                    left: [`${na.x}%`, `${nb.x}%`],
                    top: [`${na.y}%`, `${nb.y}%`],
                    opacity: [0, 1, 0],
                  } : {}}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "linear" }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((n, i) => {
              const isActive = activeNode === n.id;
              const hasConnection = activeNode && connections.some(([a, b]) => (a === n.id && b === activeNode) || (b === n.id && a === activeNode));
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveNode(isActive ? null : n.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all ${isActive ? "bg-[#FF4D00] border-[#FF4D00] scale-125" : hasConnection ? "border-[#FF4D00]/50 bg-[#FF4D00]/10" : "border-white/30 bg-[#0A0A0A] group-hover:border-[#FF4D00]"}`}>
                      {isActive && <span className="absolute inset-0 rounded-full bg-[#FF4D00] animate-ping opacity-40" />}
                    </div>
                    <span className={`mt-2 text-[10px] md:text-[11px] font-mono font-bold tracking-[0.1em] uppercase whitespace-nowrap transition-colors ${isActive ? "text-[#FF4D00]" : "text-white/50 group-hover:text-white"}`}>
                      {n.label}
                    </span>
                  </motion.div>
                </button>
              );
            })}

            {/* Detail panel */}
            <AnimatePresence>
              {activeData && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 bg-[#111111] border border-white/10 p-6 z-20">
                  <button onClick={() => setActiveNode(null)} className="absolute top-3 right-3 text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="w-4 h-4 text-[#FF4D00]" />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">{activeData.label}</span>
                  </div>
                  <p className="text-[14px] text-white/70 leading-[1.6]">{activeData.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Core stats */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/8">
            {[
              { v: "190", l: "Hubs" },
              { v: "39", l: "Countries" },
              { v: "50K", l: "Sq ft / campus" },
              { v: "6", l: "Core nodes" },
            ].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#0A0A0A] p-7 md:p-9">
                <p className="font-display font-medium text-[40px] md:text-[56px] tracking-tight leading-none mb-2">{s.v}</p>
                <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-white/40">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">Plug into the network.</h2>
        <Link to="/infrastructure" className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors">
          Explore Infrastructure <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
