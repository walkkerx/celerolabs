"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, Layers } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Construction layers ── */
const layers = [
  { id: 1, name: "Foundation", desc: "Market research + problem validation. 190 hubs scanned for gaps.", height: 60 },
  { id: 2, name: "Framework", desc: "MIT Disciplined Entrepreneurship — 24 steps from beachhead to scale.", height: 70 },
  { id: 3, name: "Structure", desc: "Co-build at Inception Studios. Lab, maker space, engineering talent.", height: 80 },
  { id: 4, name: "Systems", desc: "Route-based commercialization. Pilots, first-customer contracts, corridor scaling.", height: 90 },
  { id: 5, name: "Capital", desc: "From $500 to $250K+. Non-dilutive grant desk. 39+ country incentives.", height: 100 },
  { id: 6, name: "Compound", desc: "Network effects: every venture strengthens infrastructure, capital, community.", height: 110 },
];

export function ApproachAlt3() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero */}
      <section ref={ref} className="relative px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-20 overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Construction lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#FF4D00" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#FF4D00" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
        </svg>

        <div className="relative max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            How We Work · Alt 3 · Blueprint
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            We build<br />
            <span className="text-[#FF4D00]">in layers.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-white/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl">
            Every venture is assembled one layer at a time — from foundation to compounding. Hover a layer to see the spec.
          </motion.p>
        </div>
      </section>

      {/* Assembly visualization */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative border border-white/10 bg-[#050505] p-6 md:p-10 overflow-hidden">
            {/* Blueprint annotations */}
            <div className="absolute top-4 left-4 text-[9px] font-mono tracking-[0.15em] uppercase text-white/20">SPEC · v2.0 · xCELERO METHOD</div>
            <div className="absolute top-4 right-4 text-[9px] font-mono tracking-[0.15em] uppercase text-white/20">SCALE 1:1</div>

            {/* Stacked layers */}
            <div className="flex flex-col-reverse gap-2 mt-8">
              {layers.map((layer, i) => {
                const isActive = activeLayer === layer.id;
                return (
                  <motion.button
                    key={layer.id}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: EASE }}
                    onMouseEnter={() => setActiveLayer(layer.id)}
                    onMouseLeave={() => setActiveLayer(null)}
                    className="relative text-left transition-all duration-300"
                    style={{ marginLeft: `${i * 3}%`, marginRight: `${(6 - i) * 2}%` }}
                  >
                    <div
                      className={`border transition-all duration-300 flex items-center gap-4 px-5 ${isActive ? "border-[#FF4D00] bg-[#FF4D00]/10" : "border-white/15 bg-white/[0.02]"}`}
                      style={{ height: `${layer.height}px` }}
                    >
                      <span className={`text-[10px] font-mono font-bold tracking-[0.2em] transition-colors ${isActive ? "text-[#FF4D00]" : "text-white/30"}`}>
                        L{layer.id}
                      </span>
                      <div className="flex-1">
                        <p className={`font-display font-medium text-[16px] md:text-[18px] transition-colors ${isActive ? "text-white" : "text-white/70"}`}>{layer.name}</p>
                        {isActive && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12px] text-white/50 mt-1 leading-[1.5]">
                            {layer.desc}
                          </motion.p>
                        )}
                      </div>
                      <Layers className={`w-4 h-4 transition-colors ${isActive ? "text-[#FF4D00]" : "text-white/20"}`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/30 mt-6 text-center">Hover layers to inspect</p>
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Case Study</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[32px] md:text-[48px] mb-6">Helios: 6 layers, 18 months.</h2>
            <p className="text-white/55 text-[15px] leading-[1.7] mb-8">
              Helios — an AI-managed solar microgrid venture — went from market discovery to 50-node pilot in 18 months. Each layer took 3 months. The compound layer is still building.
            </p>
            <Link to="/ventures/helios" className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] hover:text-white transition-colors">
              Read the case <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {layers.map((l, i) => (
              <motion.div key={l.id} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border border-white/10 p-4 aspect-square flex flex-col justify-between">
                <span className="text-[9px] font-mono text-white/30">L{l.id}</span>
                <span className="text-[10px] font-mono font-bold text-[#FF4D00]">3mo</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">Start laying foundations.</h2>
        <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors">
          Apply to build <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
