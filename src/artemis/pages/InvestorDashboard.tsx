"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, TrendingUp, Building2, BarChart3, CircleDot } from "lucide-react";

/* ── Data ── */

const keyMetrics = [
  { value: "$127.4M", label: "Assets Under Management", icon: TrendingUp },
  { value: "43", label: "Active Ventures", icon: Building2 },
  { value: "28.6%", label: "Net Internal Rate of Return", icon: BarChart3 },
  { value: "7", label: "Successful Exits", icon: CircleDot },
];

const fundData = [
  { name: "xCelero Venture Fund I", aum: "$45M", performance: "+32.4% IRR", count: "12 Companies", focus: "Energy, Water, Food" },
  { name: "Critical Tech Thematic Fund", aum: "$28M", performance: "+24.8% IRR", count: "8 Companies", focus: "AI, Quantum, Space" },
  { name: "Route Infrastructure Fund", aum: "$22M", performance: "+18.2% IRR", count: "6 Projects", focus: "Hubs, Labs, Logistics" },
  { name: "xCelero Catalyst Notes", aum: "$15M", performance: "+12.6% Yield", count: "11 Ventures", focus: "Revenue-linked" },
  { name: "Community Investment Notes", aum: "$8.4M", performance: "+8.4% Yield", count: "340+ Investors", focus: "From $500" },
  { name: "Single-Venture SPVs", aum: "$9M", performance: "Varies", count: "6 SPVs", focus: "Deal-by-deal" },
];

const sectorAllocation = [
  { label: "Energy", pct: 28 },
  { label: "Water & Food", pct: 22 },
  { label: "Digital Infrastructure", pct: 18 },
  { label: "Manufacturing", pct: 14 },
  { label: "Mobility & Logistics", pct: 10 },
  { label: "Other", pct: 8 },
];

const stageAllocation = [
  { label: "Pre-Seed", pct: 35 },
  { label: "Seed", pct: 40 },
  { label: "Growth", pct: 25 },
];

const recentActivity = [
  { event: "SolarGrid Africa raises $4.2M Series A", time: "2 weeks ago" },
  { event: "AquaPure expands to Djibouti", time: "1 month ago" },
  { event: "Denari Finance hits $12M disbursed", time: "6 weeks ago" },
  { event: "NomaAgri reaches 12,000 farmer milestone", time: "2 months ago" },
  { event: "xCelero Venture Fund I Q3 distribution: $2.1M", time: "3 months ago" },
];

/* ══════════════════════════════════════════════════════════════════════════
   INVESTOR DASHBOARD PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function InvestorDashboard() {
  return (
    <div className="bg-white text-[#111111]">
      <Hero />
      <KeyMetrics />
      <FundPerformance />
      <PortfolioBreakdown />
      <RecentActivity />
      <CTASection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO – Dark bg, editorial
   ══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section>
      <div ref={ref} className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Label */}
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 md:mb-12 block">
            xCelero Capital Dashboard
          </span>

          {/* Heading */}
          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-6 md:mb-8">
            Portfolio at a glance.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl leading-[1.6] text-white/50 font-medium max-w-2xl mb-8 md:mb-12">
            Real-time metrics across six investment vehicles. Performance data updated quarterly.
          </p>

          {/* Disclaimer */}
          <p className="text-[11px] text-white/30 font-medium leading-[1.6] max-w-xl">
            For informational purposes only. Past performance does not guarantee future results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   KEY METRICS ROW – 4 cards, white bg
   ══════════════════════════════════════════════════════════════════════════ */
function KeyMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {keyMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="border border-[#111111]/10 p-6 md:p-8 bg-white hover:border-[#FF4D00]/30 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full border border-[#111111]/10 flex items-center justify-center group-hover:border-[#FF4D00]/30 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-[#FF4D00]" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-[32px] sm:text-[40px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1] mb-3 group-hover:text-[#FF4D00] transition-colors">
                  {metric.value}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/40">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FUND PERFORMANCE – Table-style
   ══════════════════════════════════════════════════════════════════════════ */
function FundPerformance() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-14"
        >
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
              Performance
            </span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.9] mt-3">
              Vehicle Performance
            </h2>
          </div>
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 mt-4 sm:mt-0">
            Q4 2025
          </span>
        </motion.div>

        {/* Table Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b border-[#111111]/10 mb-0"
        >
          <div className="col-span-4 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">Fund</div>
          <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">AUM</div>
          <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">Performance</div>
          <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">Count</div>
          <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">Focus</div>
        </motion.div>

        {/* Table Rows */}
        <div className="divide-y divide-[#111111]/10">
          {fundData.map((fund, i) => (
            <motion.div
              key={fund.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
              className="py-5 md:py-6 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-[#FAFAFA] transition-colors group"
            >
              {/* Fund Name */}
              <div className="col-span-4 mb-2 md:mb-0">
                <span className="text-[15px] md:text-[16px] font-display font-medium tracking-tight group-hover:text-[#FF4D00] transition-colors">
                  {fund.name}
                </span>
              </div>

              {/* AUM */}
              <div className="col-span-2 mb-1 md:mb-0">
                <span className="md:hidden text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mr-2">AUM </span>
                <span className="text-[14px] md:text-[15px] font-medium text-[#111111]/70">{fund.aum}</span>
              </div>

              {/* Performance */}
              <div className="col-span-2 mb-1 md:mb-0">
                <span className="md:hidden text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mr-2">Perf </span>
                <span className="text-[14px] md:text-[15px] font-medium text-[#FF4D00]">{fund.performance}</span>
              </div>

              {/* Count */}
              <div className="col-span-2 mb-1 md:mb-0">
                <span className="md:hidden text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mr-2">Count </span>
                <span className="text-[14px] md:text-[15px] font-medium text-[#111111]/70">{fund.count}</span>
              </div>

              {/* Focus */}
              <div className="col-span-2">
                <span className="md:hidden text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mr-2">Focus </span>
                <span className="text-[13px] md:text-[14px] text-[#111111]/50 font-medium">{fund.focus}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PORTFOLIO BREAKDOWN – 2 columns, CSS bar charts
   ══════════════════════════════════════════════════════════════════════════ */
function PortfolioBreakdown() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            Allocation
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.9] mt-3">
            Portfolio Breakdown
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {/* Sector Allocation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 block mb-6">
              Sector Allocation
            </span>
            <div className="space-y-5">
              {sectorAllocation.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  className="flex items-center gap-4"
                >
                  <span className="text-[13px] font-medium text-[#111111]/60 w-[100px] sm:w-[140px] md:w-[160px] shrink-0 text-right">
                    {item.label}
                  </span>
                  <div className="flex-1 h-8 bg-[#111111]/5 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.pct}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-[#FF4D00]/60 group-hover:bg-[#FF4D00] transition-colors"
                    />
                  </div>
                  <span className="text-[13px] font-mono font-bold text-[#111111]/50 w-[40px] shrink-0">
                    {item.pct}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stage Allocation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 block mb-6">
              Stage Allocation
            </span>
            <div className="space-y-5">
              {stageAllocation.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                  className="flex items-center gap-4"
                >
                  <span className="text-[13px] font-medium text-[#111111]/60 w-[100px] sm:w-[140px] md:w-[160px] shrink-0 text-right">
                    {item.label}
                  </span>
                  <div className="flex-1 h-8 bg-[#111111]/5 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.pct}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-[#FF4D00]/40 group-hover:bg-[#FF4D00]/60 transition-colors"
                    />
                  </div>
                  <span className="text-[13px] font-mono font-bold text-[#111111]/50 w-[40px] shrink-0">
                    {item.pct}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   RECENT ACTIVITY – Timeline
   ══════════════════════════════════════════════════════════════════════════ */
function RecentActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            Activity
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.9] mt-3">
            Recent Activity
          </h2>
        </motion.div>

        <div className="max-w-2xl">
          {recentActivity.map((item, i) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              className="relative pl-8 pb-8 last:pb-0"
            >
              {/* Left border line */}
              <div className="absolute left-[7px] top-[10px] bottom-0 w-px bg-[#111111]/10" />

              {/* Dot marker */}
              <div className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 border-[#FF4D00] bg-white flex items-center justify-center">
                <div className="w-[5px] h-[5px] rounded-full bg-[#FF4D00]" />
              </div>

              {/* Content */}
              <div className="pt-0">
                <p className="text-[15px] md:text-[16px] font-medium text-[#111111]/80 leading-[1.5] mb-1">
                  {item.event}
                </p>
                <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30">
                  {item.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CTA SECTION – Dark bg
   ══════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref}>
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-6 md:mb-8 block">
            Get Started
          </span>

          <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-display font-medium tracking-[-0.02em] leading-[1.05] mb-6">
            Ready to invest?
          </h2>

          <p className="text-base sm:text-lg leading-[1.6] text-white/50 font-medium mb-10 md:mb-12">
            Access our data room, schedule a call with the investment team, or start with a Community Investment Note from $500.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00]/90 transition-colors"
            >
              Schedule a Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/capital"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-white hover:text-[#111111] transition-colors"
            >
              View Investment Vehicles
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
