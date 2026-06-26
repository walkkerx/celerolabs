"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, X, Plus } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── System cards (expandable grid) ── */
const systems = [
  { id: "s1", title: "M1 Core", tag: "Campus", desc: "Flagship 50,000 sq ft campuses in prime hub cities. Lab, maker space, co-working.", stats: [{ v: "50K", l: "Sq ft" }, { v: "6", l: "Cities" }] },
  { id: "s2", title: "XEmbassy", tag: "Node", desc: "Compact 5,000 sq ft drop-in studios extending reach into secondary markets.", stats: [{ v: "5K", l: "Sq ft" }, { v: "12", l: "Nodes" }] },
  { id: "s3", title: "Living Labs", tag: "Field", desc: "Distributed real-world validation environments across the Route.", stats: [{ v: "39", l: "Countries" }, { v: "∞", l: "Test sites" }] },
  { id: "s4", title: "Capital Desk", tag: "Finance", desc: "6 vehicles from $500 scouts to $250K+ anchors. Non-dilutive grant matching.", stats: [{ v: "6", l: "Vehicles" }, { v: "$500", l: "Entry" }] },
  { id: "s5", title: "Route OS", tag: "Engine", desc: "The commercialization engine connecting 190 hubs across 39 countries.", stats: [{ v: "190", l: "Hubs" }, { v: "39", l: "Countries" }] },
  { id: "s6", title: "XCitizens", tag: "Network", desc: "Operators, founders, investors, mentors. 100 per cohort. The connective tissue.", stats: [{ v: "100", l: "/ cohort" }, { v: "4", l: "Roles" }] },
];

export function InfrastructureAlt3() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero */}
      <section ref={ref} className="px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            Infrastructure · Alt 3 · System Grid
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            Six systems.<br />
            <span className="text-white/30">Click to expand.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-white/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl">
            Each card is a standalone system. Together they form one machine. Expand any card to see the spec.
          </motion.p>
        </div>
      </section>

      {/* Expandable grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8">
            {systems.map((sys, i) => {
              const isOpen = expanded === sys.id;
              return (
                <motion.button
                  key={sys.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  onClick={() => setExpanded(isOpen ? null : sys.id)}
                  className={`relative text-left p-6 md:p-8 transition-colors ${isOpen ? "bg-[#FF4D00]/5" : "bg-[#0A0A0A] hover:bg-white/[0.02]"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">{sys.tag}</span>
                    <Plus className={`w-4 h-4 text-white/30 transition-transform ${isOpen ? "rotate-45 text-[#FF4D00]" : ""}`} />
                  </div>
                  <h3 className={`font-display font-medium text-[24px] md:text-[28px] tracking-tight mb-2 transition-colors ${isOpen ? "text-[#FF4D00]" : "text-white"}`}>{sys.title}</h3>
                  <p className="text-[13px] text-white/55 leading-[1.55] mb-4">{sys.desc}</p>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                          {sys.stats.map((s) => (
                            <div key={s.l}>
                              <p className="font-display font-medium text-[24px] text-white leading-none">{s.v}</p>
                              <p className="text-[9px] font-mono tracking-[0.1em] uppercase text-white/40 mt-1">{s.l}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
          <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/30 mt-3 text-center">Click cards to expand specs</p>
        </div>
      </section>

      {/* Interconnections */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Interconnections</span>
          <h2 className="font-display font-medium tracking-[-0.025em] text-[32px] md:text-[48px] lg:text-[56px] mb-12">No system stands alone.</h2>
          <div className="space-y-3">
            {[
              { from: "M1 Core", to: "Living Labs", flow: "Prototypes → field validation" },
              { from: "Route OS", to: "Capital Desk", flow: "Market access → capital deployment" },
              { from: "XCitizens", to: "M1 Core", flow: "Talent → campus operations" },
              { from: "XEmbassy", to: "Route OS", flow: "Secondary markets → corridor scaling" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 border border-white/10"
              >
                <span className="text-[12px] font-mono font-bold text-white/70 min-w-[100px]">{c.from}</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FF4D00] to-[#FF4D00]/20" />
                  <span className="text-[10px] font-mono text-white/40">{c.flow}</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#FF4D00]/20 to-[#FF4D00]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
                </div>
                <span className="text-[12px] font-mono font-bold text-white/70 min-w-[100px] text-right">{c.to}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">One machine. Many systems.</h2>
        <Link to="/infrastructure" className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors">
          Explore Infrastructure <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
