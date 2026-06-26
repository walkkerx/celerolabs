"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, Building2, Wrench, Users, Globe2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Building cross-section floors ── */
const floors = [
  { id: 6, name: "Ecosystem", icon: Globe2, desc: "39 countries, 190 hubs, the Route connects it all.", items: ["Cross-border trade", "Regulatory frameworks", "Diaspora capital"] },
  { id: 5, name: "Tools", icon: Wrench, desc: "Shared services: legal, accounting, HR, design, engineering.", items: ["Legal stack", "Ops dashboard", "Design system"] },
  { id: 4, name: "Frameworks", icon: Building2, desc: "MIT 24-step methodology. Quest Fellowship. Commercialization playbook.", items: ["MIT Disciplined Entrepreneurship", "Route pilot framework", "Capital stack model"] },
  { id: 3, name: "Foundation", icon: Users, desc: "M1 Core campuses, XEmbassy nodes, living labs. The physical substrate.", items: ["M1 Core (50K sq ft)", "XEmbassy (5K sq ft)", "Living labs"] },
];

export function InfrastructureAlt2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Hero */}
      <section ref={ref} className="px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            Infrastructure · Alt 2 · Cross-Section
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            Cut it open<br />
            <span className="text-[#111111]/30">and look inside.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-[#111111]/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl">
            xCelero&apos;s infrastructure is a building with four floors. Each one supports the next. Here&apos;s the cross-section.
          </motion.p>
        </div>
      </section>

      {/* Building cross-section */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative border border-[#111111]/10 bg-white overflow-hidden">
            {/* Blueprint annotations */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#111111]/10 bg-[#111111]/[0.02]">
              <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-[#111111]/30">CROSS-SECTION · xCELERO INFRA</span>
              <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-[#111111]/30">SCALE 1:50</span>
            </div>

            {/* Floors stacked */}
            <div className="divide-y divide-[#111111]/10">
              {floors.map((floor, i) => {
                const Icon = floor.icon;
                return (
                  <motion.div
                    key={floor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: EASE }}
                    className="relative grid lg:grid-cols-12 gap-6 p-6 md:p-8 group hover:bg-[#FF4D00]/[0.02] transition-colors"
                  >
                    {/* Floor number (blueprint style) */}
                    <div className="lg:col-span-2 flex items-center gap-3">
                      <span className="text-[32px] md:text-[40px] font-display font-medium text-[#111111]/15 leading-none">{floor.id}</span>
                      <Icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                    </div>

                    {/* Floor name + desc */}
                    <div className="lg:col-span-4">
                      <h3 className="font-display font-medium text-[22px] md:text-[26px] tracking-tight mb-2">{floor.name}</h3>
                      <p className="text-[13px] text-[#111111]/55 leading-[1.55]">{floor.desc}</p>
                    </div>

                    {/* Floor items */}
                    <div className="lg:col-span-6 flex flex-wrap items-center gap-2">
                      {floor.items.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#111111]/12 text-[11px] font-mono tracking-[0.05em] text-[#111111]/60">
                          <span className="w-1 h-1 rounded-full bg-[#FF4D00]" />
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Blueprint dashed line */}
                    <div className="absolute left-0 right-0 bottom-0 h-px" style={{ backgroundImage: "repeating-linear-gradient(to right, #111111 0, #111111 4px, transparent 4px, transparent 8px)", opacity: 0.08 }} />
                  </motion.div>
                );
              })}
            </div>
          </div>
          <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#111111]/30 mt-3 text-center">Read floor 3 → 6: foundation to ecosystem</p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-[#111111]/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "190", l: "Hubs", icon: Globe2 },
              { v: "39", l: "Countries", icon: Building2 },
              { v: "50K", l: "Sq ft / campus", icon: Building2 },
              { v: "100", l: "XCitizens / cohort", icon: Users },
            ].map((s, i) => {
              const SIcon = s.icon;
              return (
                <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-[#111111]/10 p-6">
                  <SIcon className="w-4 h-4 text-[#FF4D00] mb-4" strokeWidth={1.5} />
                  <p className="font-display font-medium text-[32px] md:text-[40px] tracking-tight leading-none mb-2">{s.v}</p>
                  <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-[#111111]/40">{s.l}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-[#111111]/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">Build on the foundation.</h2>
        <Link to="/infrastructure" className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF4D00] transition-colors">
          Explore Infrastructure <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
