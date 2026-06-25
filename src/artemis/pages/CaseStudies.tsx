"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  ChevronDown,
  X,
  Quote,
  TrendingUp,
  Users,
  Globe,
  DollarSign,
} from "lucide-react";
import { caseStudiesData, CaseStudy } from "@/artemis/data/caseStudies";

/* ── Metric icon map ── */
const metricConfig = [
  { key: "revenue" as const, label: "Annual Revenue", icon: DollarSign },
  { key: "jobsCreated" as const, label: "Jobs Created", icon: Users },
  { key: "capitalRaised" as const, label: "Capital Raised", icon: TrendingUp },
  { key: "countriesReached" as const, label: "Countries", icon: Globe },
];

/* ══════════════════════════════════════════════════════════════════════════
   CASE STUDIES PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function CaseStudies() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <FeaturedCaseStudy />
      <CaseStudyGrid />
      <CTASection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, Editorial centered with serif accent
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 md:mb-12">
            Case Studies
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-8 md:mb-10">
            Proof that critical technology{" "}
            <em className="italic font-serif text-[#FF4D00]">works</em>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-[1.6] text-[#111111]/50 font-medium max-w-2xl">
            Real ventures. Real revenue. Real impact. Every case study is a
            company that moved from thesis to operating business using the
            xCelero platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FEATURED CASE STUDY, Full width dark bg with overlay image
   ══════════════════════════════════════════════════════════════════════════ */
function FeaturedCaseStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const featured = caseStudiesData[0];

  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[1400px] mx-auto relative bg-[#111111] text-white rounded-sm overflow-hidden"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={featured.image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#111111]/85" />
        </div>

        {/* Content */}
        <div className="relative py-16 md:py-24 px-6 md:px-12 lg:px-20">
          <div className="w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-7">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-6 block">
                Featured Case Study
              </span>

              <span className="inline-block px-2.5 py-1 bg-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-white/60 mb-6">
                {featured.vertical}
              </span>

              <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-[-0.02em] leading-[1.05] mb-6">
                {featured.title}
              </h2>

              <p className="text-[15px] md:text-[17px] text-white/50 font-medium leading-[1.7] max-w-lg mb-8">
                {featured.summary}
              </p>

              {/* Key metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                {metricConfig.map((m) => (
                  <div key={m.key}>
                    <div className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-[#FF4D00] leading-none mb-1">
                      {m.key === "jobsCreated"
                        ? featured.results[m.key].toLocaleString()
                        : m.key === "countriesReached"
                        ? String(featured.results[m.key])
                        : featured.results[m.key]}
                    </div>
                    <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/30">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/30">
                  {featured.timeline}
                </span>
              </div>
            </div>

            {/* Right: Quote card */}
            <div className="lg:col-span-5">
              <div className="border border-white/10 p-8 md:p-10 bg-white/5">
                <Quote className="w-8 h-8 text-[#FF4D00]/40 mb-6" />
                <p className="text-[16px] md:text-[18px] text-white/70 font-medium leading-[1.7] mb-6 italic">
                  &ldquo;{featured.quotes[0].text}&rdquo;
                </p>
                <div>
                  <div className="text-[14px] font-bold text-white/80">
                    {featured.quotes[0].author}
                  </div>
                  <div className="text-[12px] text-white/40">
                    {featured.quotes[0].role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CASE STUDY GRID, Expandable detail cards
   ══════════════════════════════════════════════════════════════════════════ */
function CaseStudyGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Skip first (featured)
  const remaining = caseStudiesData.slice(1);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            More Case Studies
          </span>
          <h2 className="text-[28px] md:text-[40px] font-display font-medium tracking-[-0.02em] leading-[1.1] mt-3">
            From thesis to <em className="italic font-serif text-[#FF4D00]">traction</em>
          </h2>
        </motion.div>

        {/* Grid of cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {remaining.map((study, i) => {
            const isSelected = expandedId === study.id;
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`border p-6 md:p-8 bg-white transition-all cursor-pointer group ${
                  isSelected
                    ? "border-[#FF4D00] ring-1 ring-[#FF4D00]/20"
                    : "border-[#111111]/10 hover:border-[#FF4D00]/30"
                }`}
                onClick={() => setExpandedId(isSelected ? null : study.id)}
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden mb-6 -mx-6 md:-mx-8 -mt-6 md:-mt-8">
                  <img
                    src={study.image}
                    alt={study.ventureName}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Vertical tag */}
                <span className="inline-block px-2.5 py-1 bg-[#FAFAFA] text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 mb-4">
                  {study.vertical}
                </span>

                {/* Title */}
                <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight mb-2">
                  {study.ventureName}
                </h3>

                {/* Summary */}
                <p className="text-[13px] md:text-[14px] text-[#111111]/50 font-medium leading-[1.7] mb-5">
                  {study.summary}
                </p>

                {/* Key metrics row */}
                <div className="flex gap-4 mb-4">
                  <div>
                    <div className="text-[20px] font-display font-medium tracking-tight text-[#FF4D00]">
                      {study.results.revenue}
                    </div>
                    <div className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">
                      Revenue
                    </div>
                  </div>
                  <div>
                    <div className="text-[20px] font-display font-medium tracking-tight text-[#111111]">
                      {study.results.jobsCreated}
                    </div>
                    <div className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">
                      Jobs
                    </div>
                  </div>
                  <div>
                    <div className="text-[20px] font-display font-medium tracking-tight text-[#111111]">
                      {study.results.countriesReached}
                    </div>
                    <div className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">
                      Countries
                    </div>
                  </div>
                </div>

                {/* Expand hint */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#111111]/5 text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/20 group-hover:text-[#FF4D00]/60 transition-colors">
                  <span>{isSelected ? "Close details" : "View details"}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${
                      isSelected ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full Detail Expansion */}
        <AnimatePresence>
          {expandedId && (
            <CaseStudyDetail
              study={caseStudiesData.find((s) => s.id === expandedId)!}
              onClose={() => setExpandedId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Case Study Detail Expansion ── */
function CaseStudyDetail({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const detailRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={detailRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 md:mt-12 border border-[#111111]/10 bg-white"
    >
      {/* Header */}
      <div className="p-8 md:p-12 lg:p-16 border-b border-[#111111]/10 bg-[#FAFAFA]">
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="inline-block px-2.5 py-1 bg-[#111111]/5 text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-4">
              {study.vertical}
            </span>
            <h3 className="text-[28px] md:text-[40px] font-display font-medium tracking-[-0.02em]">
              {study.ventureName}
            </h3>
            <p className="text-[17px] md:text-[20px] text-[#FF4D00] font-medium leading-[1.5] mt-2">
              {study.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 border border-[#111111]/10 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7] max-w-3xl">
          {study.summary}
        </p>
      </div>

      <div className="p-8 md:p-12 lg:p-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Challenge + Approach */}
          <div className="lg:col-span-6">
            {/* Challenge */}
            <div className="mb-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-4">
                The Challenge
              </span>
              <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">
                {study.challenge}
              </p>
            </div>

            {/* Approach */}
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-4">
                The Approach
              </span>
              <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">
                {study.approach}
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-8 border-t border-[#111111]/10 pt-6">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 block mb-2">
                Timeline
              </span>
              <p className="text-[15px] font-display font-medium tracking-tight">
                {study.timeline}
              </p>
            </div>
          </div>

          {/* Right: Results + Quotes */}
          <div className="lg:col-span-6">
            {/* Results metrics */}
            <div className="mb-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-6">
                Results
              </span>
              <div className="grid grid-cols-2 gap-4">
                {metricConfig.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.key}
                      className="border border-[#111111]/10 p-5 hover:border-[#FF4D00]/30 transition-colors group"
                    >
                      <Icon
                        className="w-4 h-4 text-[#111111]/20 group-hover:text-[#FF4D00] transition-colors mb-3"
                        strokeWidth={1.5}
                      />
                      <div className="text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] leading-none mb-2 text-[#111111] group-hover:text-[#FF4D00] transition-colors">
                        {m.key === "jobsCreated"
                          ? study.results[m.key].toLocaleString()
                          : m.key === "countriesReached"
                          ? String(study.results[m.key])
                          : study.results[m.key]}
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
                        {m.label}
                      </span>
                      <div className="mt-4 h-[2px] bg-[#111111]/5 group-hover:bg-[#FF4D00]/30 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quotes */}
            {study.quotes.map((quote, i) => (
              <div
                key={i}
                className="border-l-2 border-[#FF4D00]/20 pl-5 mb-6 last:mb-0"
              >
                <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7] italic mb-3">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <div className="text-[12px] font-bold text-[#111111]/70">
                  {quote.author}
                </div>
                <div className="text-[11px] text-[#111111]/40">
                  {quote.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CTA SECTION, Dark bg
   ══════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
    >
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
      <div className="w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-8 block">
            Build With Us
          </span>
          <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6">
            Your venture could be the next case study.
          </h2>
          <p className="text-[15px] md:text-[17px] text-white/50 font-medium leading-[1.6] max-w-lg mx-auto mb-10">
            Apply to the xCelero Accelerator and join a cohort of founders
            building critical technology for the markets that need it most.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/programs"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FF4D00] text-white text-[12px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-colors"
            >
              Apply to Accelerator
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/capital"
              className="inline-flex items-center justify-center px-10 py-5 border border-white/20 text-white text-[12px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-colors"
            >
              Invest in Ventures
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
