"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, ArrowUpRight, Rocket, Building2, Coins, Users, TrendingUp } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Founder's journey stages ── */
const journey = [
  { stage: "01", name: "Discover", time: "Weeks 1-4", desc: "Market research, problem validation, founder discovery across 190 hubs.", deliverable: "Validated problem + beachhead market" },
  { stage: "02", name: "Build", time: "Months 2-4", desc: "Co-build at Inception Studios. MIT 24 steps. Lab access, engineering talent.", deliverable: "Working prototype + MVP" },
  { stage: "03", name: "Deploy", time: "Months 5-9", desc: "Route-based pilot. First-customer contracts via industry partners. One hub, then the corridor.", deliverable: "Pilot revenue + case study" },
  { stage: "04", name: "Scale", time: "Months 10-18", desc: "Capital deployment. Cross-border expansion. Non-dilutive grant matching across 39 countries.", deliverable: "Series A readiness" },
  { stage: "05", name: "Compound", time: "Year 2+", desc: "Network effects kick in. Venture strengthens infrastructure, capital, community for the next founder.", deliverable: "Category leader" },
];

const principles = [
  { icon: Building2, title: "Infrastructure first", desc: "We build the substrate before we back the venture. Labs, legal, logistics — the unsexy layer that makes everything else possible." },
  { icon: Users, title: "Co-build, not just fund", desc: "Our team builds alongside founders. Engineering, design, ops, regulatory — embedded, not advisory." },
  { icon: TrendingUp, title: "Route-leveraged", desc: "Every venture gets 190 hubs, 39 countries, and the XCitizens network from day one. Capital alone doesn't compound." },
  { icon: Coins, title: "Solidarity pricing", desc: "Founders in early-stage markets access the same support at a fraction of Silicon Valley costs. The market forms before it's squeezed." },
];

export function ApproachAlt() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Hero */}
      <section ref={ref} className="px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6">
            How We Work · Alt
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE }} className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] mb-8">
            We don&apos;t fund<br />
            <span className="text-[#111111]/30">founders. We build them.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: EASE }} className="text-[#111111]/55 text-[16px] md:text-[18px] font-medium leading-[1.6] max-w-xl mb-8">
            Most accelerators write a check and disappear. We co-build for 18 months — from market discovery to Series A — using MIT&apos;s 24-step framework, embedded talent, and the Route&apos;s 190 hubs.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45, ease: EASE }} className="flex flex-col sm:flex-row gap-3">
            <Link to="/join" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors">
              Apply to build <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/approach" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-[#111111] text-[#111111] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#111111] hover:text-white transition-colors">
              See the full method
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Founder's journey — visual timeline */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">The partnership journey</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05]">
              18 months. Five stages.<br />One founder.
            </h2>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            <div className="absolute left-[19px] md:left-[27px] top-2 bottom-2 w-px bg-[#111111]/10" />
            <div className="space-y-4">
              {journey.map((j, i) => (
                <motion.div
                  key={j.stage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start gap-5 md:gap-8"
                >
                  <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-white border-2 border-[#FF4D00] flex items-center justify-center">
                    <span className="text-[11px] md:text-[13px] font-mono font-bold text-[#FF4D00]">{j.stage}</span>
                  </div>
                  <div className="flex-1 pb-6 border-b border-[#111111]/10 pt-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                      <h3 className="font-display font-medium text-[20px] md:text-[24px] text-[#111111]">{j.name}</h3>
                      <span className="text-[10px] font-mono tracking-[0.1em] uppercase text-[#111111]/40">{j.time}</span>
                    </div>
                    <p className="text-[13px] md:text-[14px] text-[#111111]/60 leading-[1.6] mb-2">{j.desc}</p>
                    <p className="text-[11px] font-mono text-[#FF4D00]">
                      <span className="text-[#111111]/30 mr-1.5">→</span>{j.deliverable}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles — how we approach it */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 bg-white border-t border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Our approach</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05]">
              Four things we do differently.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border border-[#111111]/10 p-6 md:p-8 hover:border-[#FF4D00] transition-colors">
                  <Icon className="w-6 h-6 text-[#FF4D00] mb-4" strokeWidth={1.5} />
                  <h3 className="font-display font-medium text-[20px] md:text-[22px] mb-2">{p.title}</h3>
                  <p className="text-[13px] md:text-[14px] text-[#111111]/60 leading-[1.6]">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What success looks like */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">What success looks like</span>
            <h2 className="font-display font-medium tracking-[-0.025em] text-[28px] md:text-[40px] lg:text-[48px] leading-[1.05]">
              By the numbers.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#111111]/10 border border-[#111111]/10">
            {[
              { v: "18", l: "Months to Series A", icon: Rocket },
              { v: "24", l: "MIT steps", icon: Building2 },
              { v: "190", l: "Hubs accessible", icon: Users },
              { v: "100%", l: "Retention after 12mo", icon: TrendingUp },
            ].map((s, i) => {
              const SIcon = s.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white p-7 md:p-9">
                  <SIcon className="w-5 h-5 text-[#FF4D00] mb-5" strokeWidth={1.5} />
                  <p className="font-display font-medium text-[36px] md:text-[44px] tracking-tight leading-none mb-2">{s.v}</p>
                  <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-[#111111]/40">{s.l}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 border-t border-[#111111]/10 text-center">
        <h2 className="font-display font-medium tracking-[-0.03em] text-[32px] md:text-[48px] lg:text-[64px] mb-6">Build with us.</h2>
        <p className="text-[#111111]/55 text-[15px] mb-8 max-w-md mx-auto">We take 5 founders per cohort. Applications open quarterly.</p>
        <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF4D00] transition-colors">
          Apply to build <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
