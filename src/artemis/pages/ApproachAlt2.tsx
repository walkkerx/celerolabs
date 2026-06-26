"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, Plus } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Method cards (sticky-note aesthetic) ── */
const methodCards = [
  { id: 1, title: "Market Discovery", color: "#FF4D00", rotation: -2, body: "Scan 190 hubs for market gaps. Map the problem, the population, and the purchasing power." },
  { id: 2, title: "MIT 24 Steps", color: "#111111", rotation: 1.5, body: "Disciplined Entrepreneurship framework: beachhead → persona → use case → value prop → pricing → channel." },
  { id: 3, title: "Co-Build", color: "#059669", rotation: -1, body: "Inception Studios: lab access, maker space, engineering talent. We build WITH founders, not just fund them." },
  { id: 4, title: "Route Pilots", color: "#d97706", rotation: 2, body: "First-customer contracts via industry partners. Pilot in one hub, validate, then scale across the corridor." },
  { id: 5, title: "Capital Stack", color: "#7c3aed", rotation: -1.5, body: "From $500 scouts to $250K+ anchors. Non-dilutive grant desk matching ventures with 39+ country incentives." },
  { id: 6, title: "Compound", color: "#0284c7", rotation: 1, body: "Every venture strengthens the network. Infrastructure, capital, and community compound for the next founder." },
];

export function ApproachAlt2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Hero — workspace feel */}
      <section ref={ref} className="px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            How We Work · Alt 2 · Workspace
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            A workspace,<br />
            <span className="text-[#111111]/30">not a playbook.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-[#111111]/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl">
            Six method cards pinned to the wall. Pick one up. See what&apos;s inside. This is how ventures actually get built on the Route.
          </motion.p>
        </div>
      </section>

      {/* Method Cards — sticky-note style */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#111111]/40 block mb-8">Method Cards · Click to expand</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodCards.map((card, i) => {
              const isOpen = expanded === card.id;
              return (
                <motion.button
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  onClick={() => setExpanded(isOpen ? null : card.id)}
                  className="group text-left"
                  style={{ transform: `rotate(${isOpen ? 0 : card.rotation}deg)` }}
                >
                  <div className={`relative bg-white border border-[#111111]/10 p-6 transition-all duration-300 ${isOpen ? "shadow-2xl" : "shadow-md group-hover:shadow-lg"}`} style={{ borderTop: `4px solid ${card.color}` }}>
                    {/* Pin dot */}
                    <div className="absolute -top-2 left-6 w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: card.color }} />
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40">No. {String(card.id).padStart(2, "0")}</span>
                      <Plus className={`w-4 h-4 text-[#111111]/30 transition-transform ${isOpen ? "rotate-45" : ""}`} />
                    </div>
                    <h3 className="font-display font-medium text-[20px] md:text-[22px] mb-2" style={{ color: card.color }}>{card.title}</h3>
                    <p className="text-[13px] text-[#111111]/60 leading-[1.55]">{card.body}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles Wall */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-[#111111]/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Principles Wall</span>
          <h2 className="font-display font-medium tracking-[-0.025em] text-[32px] md:text-[48px] lg:text-[56px] mb-12">What we pin above the desk.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Solidarity pricing, every stage",
              "Infrastructure before ventures",
              "A breakthrough in isolation is a tragedy",
              "The Route compounds what capital cannot",
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#FF4D00]/5 border-l-[3px] border-[#FF4D00] p-5"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
              >
                <p className="text-[14px] font-display font-medium leading-[1.4]">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-[#111111]/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">Pull up a chair.</h2>
        <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF4D00] transition-colors">
          Apply to build <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
