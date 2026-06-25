"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { Search, ChevronDown, X, MapPin, Rocket, DollarSign, Users, ArrowRight } from "lucide-react";
import { venturesData } from "@/artemis/data/ventures";
import { caseStudiesData, CaseStudy } from "@/artemis/data/caseStudies";
import { ReviewSection } from "@/artemis/components/ReviewSection";

const ITEMS_PER_PAGE = 25;

/* ══════════════════════════════════════════════════════════════════════════
   VENTURE CARD (Link to VentureDetail page)
   ══════════════════════════════════════════════════════════════════════════ */
function VentureCard({ venture }: { venture: (typeof venturesData)[number] }) {
  return (
    <Link
      to={`/ventures/${venture.id}`}
      className="group block text-left w-full"
    >
      <div className="relative bg-[#111111] text-white overflow-hidden transition-all duration-200 group-hover:scale-[1.02] group-hover:brightness-110 group-hover:ring-1 group-hover:ring-[#FF4D00]">
        {/* Top section: name + code */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-display font-bold text-white leading-tight truncate">
                {venture.name}
              </h3>
              <span className="text-[10px] font-mono text-white/50 tracking-wider mt-1 block">
                {venture.code}
              </span>
            </div>
          </div>

          {/* Vertical badge */}
          <div className="mt-2.5">
            <span className="inline-block px-2 py-0.5 bg-white/10 text-[9px] font-mono uppercase tracking-widest text-white/70">
              {venture.vertical}
            </span>
          </div>
        </div>

        {/* Middle section: solution excerpt */}
        <div className="px-4 pb-3">
          <p className="text-[11px] text-white/70 leading-relaxed line-clamp-2">
            {venture.solution}
          </p>
        </div>

        {/* Bottom section: anchor partners */}
        <div className="px-4 pb-4 pt-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block mb-0.5">
            Anchor Partners
          </span>
          <span className="text-[11px] text-white/60 leading-snug line-clamp-1 block">
            {venture.anchorPartners}
          </span>
        </div>

        {/* Bottom-right orange square with first letter */}
        <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#FF4D00] flex items-center justify-center font-display font-bold text-sm text-white">
          {venture.name.charAt(0)}
        </div>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CASE STUDIES SECTION (Expandable cards)
   ══════════════════════════════════════════════════════════════════════════ */
function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const selectedStudy = expandedId
    ? caseStudiesData.find((cs) => cs.id === expandedId) || null
    : null;

  return (
    <section className="bg-white border-t border-[#111111]/10">
      <div ref={sectionRef} className="px-6 md:px-12 lg:px-20 w-full max-w-[1400px] mx-auto py-20 md:py-28">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[#FF4D00] mb-4">
            Case Studies
          </div>
          <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-4">
            Proof that critical technology <em className="font-serif italic text-[#FF4D00]">can work</em>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] max-w-2xl">
            Four ventures. Four verticals. Projected revenue, projected jobs, projected impact. Click any card to explore.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {caseStudiesData.map((cs, i) => {
            const isSelected = expandedId === cs.id;
            return (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setExpandedId(isSelected ? null : cs.id)}
                  className="group block relative aspect-[4/3] overflow-hidden w-full text-left"
                >
                  {/* Background Image */}
                  <img
                    src={cs.image}
                    alt={cs.ventureName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? "bg-gradient-to-t from-[#FF4D00]/80 via-[#FF4D00]/40 to-[#FF4D00]/20" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/20"}`} />

                  {/* Vertical Tag Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-[#FF4D00] text-[8px] font-mono font-bold tracking-widest uppercase text-white">
                      {cs.vertical}
                    </span>
                  </div>

                  {/* Expand/Collapse indicator */}
                  <div className="absolute top-3 right-3">
                    <span className={`w-6 h-6 flex items-center justify-center transition-colors ${isSelected ? "bg-white text-[#FF4D00]" : "bg-black/30 text-white/60 group-hover:bg-black/50"}`}>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isSelected ? "rotate-180" : ""}`} />
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-[15px] md:text-[17px] font-display font-bold text-white leading-tight mb-1">
                      {cs.ventureName}
                    </h3>
                    <span className="text-[12px] md:text-[13px] font-display font-medium text-[#FF4D00]">
                      {cs.results.revenue}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Case Study Detail */}
        <AnimatePresence>
          {selectedStudy && (
            <CaseStudyExpanded
              study={selectedStudy}
              onClose={() => setExpandedId(null)}
            />
          )}
        </AnimatePresence>

        {/* Redirect to full Case Studies page */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/case-studies"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#111111] text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Case Study Expanded Detail (inline on Ventures page) ── */
function CaseStudyExpanded({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const detailRef = useRef<HTMLDivElement>(null);

  const metricItems = [
    { key: "revenue" as const, label: "Annual Revenue", icon: DollarSign },
    { key: "jobsCreated" as const, label: "Jobs Created", icon: Users },
    { key: "capitalRaised" as const, label: "Capital Raised", icon: Rocket },
    { key: "countriesReached" as const, label: "Countries", icon: MapPin },
  ];

  return (
    <motion.div
      ref={detailRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 md:mt-12 border-2 border-[#FF4D00] bg-white relative"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-[#111111]/10 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors text-[#111111]/40"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header with image */}
      <div className="relative h-[200px] md:h-[280px] overflow-hidden">
        <img
          src={study.image}
          alt={study.ventureName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="inline-block px-2.5 py-1 bg-[#FF4D00] text-[10px] font-mono font-bold tracking-widest uppercase text-white mb-3">
            {study.vertical}
          </span>
          <h3 className="text-[24px] md:text-[36px] font-display font-medium tracking-tight text-white">
            {study.ventureName}
          </h3>
          <p className="text-[14px] md:text-[16px] text-[#FF4D00] font-medium mt-1">
            {study.title}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-10 lg:p-12">
        {/* Summary */}
        <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7] mb-8">
          {study.summary}
        </p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {metricItems.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.key} className="border border-[#111111]/10 p-4 hover:border-[#FF4D00]/30 transition-colors group">
                <Icon className="w-4 h-4 text-[#111111]/20 group-hover:text-[#FF4D00] transition-colors mb-2" strokeWidth={1.5} />
                <div className="text-[24px] md:text-[32px] font-display font-medium tracking-[-0.02em] leading-none mb-1 text-[#111111] group-hover:text-[#FF4D00] transition-colors">
                  {m.key === "jobsCreated"
                    ? study.results[m.key].toLocaleString()
                    : m.key === "countriesReached"
                    ? String(study.results[m.key])
                    : study.results[m.key]}
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Challenge + Approach */}
          <div>
            <div className="mb-8">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-3">The Challenge</span>
              <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">{study.challenge}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-3">The Approach</span>
              <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">{study.approach}</p>
            </div>
            <div className="mt-6 border-t border-[#111111]/10 pt-4">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 block mb-1">Timeline</span>
              <p className="text-[15px] font-display font-medium tracking-tight">{study.timeline}</p>
            </div>
          </div>

          {/* Quotes */}
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-4">What They Said</span>
            {study.quotes.map((quote, i) => (
              <div key={i} className="border-l-2 border-[#FF4D00]/20 pl-5 mb-6 last:mb-0">
                <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7] italic mb-3">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <div className="text-[12px] font-bold text-[#111111]/70">{quote.author}</div>
                <div className="text-[11px] text-[#111111]/40">{quote.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   VENTURES PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Ventures() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Dynamically derive unique verticals from data
  const verticals = useMemo(() => {
    const unique = Array.from(new Set(venturesData.map((v) => v.vertical)));
    unique.sort();
    return unique;
  }, []);

  const categories = useMemo(() => ["All", ...verticals], [verticals]);

  const filteredVentures = useMemo(() => {
    return venturesData.filter((v) => {
      const matchesCategory =
        activeCategory === "All" || v.vertical === activeCategory;
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleVentures = filteredVentures.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVentures.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  // Reset visible count when filters change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="bg-[#FAFAFA] text-[#111111] min-h-screen pb-32">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 md:pt-40 pb-20 px-6 md:px-12 lg:px-20 w-full max-w-[1400px] mx-auto">
        <h1 className="text-[32px] sm:text-[50px] md:text-[80px] lg:text-[100px] leading-[0.9] font-display font-medium tracking-tight mb-8">
          We invest in companies long before anyone knows their name.
        </h1>
        <div className="text-xl md:text-2xl text-[#111111]/50 font-medium mb-20">
          <p>(Often before they even have one.)</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="relative w-full lg:w-[400px] group border-b border-[#111111]/20 hover:border-[#111111] focus-within:!border-[#FF4D00] transition-colors pb-4 flex items-center">
            <Search className="w-5 h-5 text-[#111111]/40 group-focus-within:text-[#FF4D00] mr-4 transition-colors" />
            <input
              type="text"
              placeholder="Search ventures"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="bg-transparent text-lg font-medium outline-none w-full placeholder:text-[#111111]/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#111111]/40 mr-2 border-r border-[#111111]/10 pr-4">
              Verticals
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors min-h-[44px] ${
                  activeCategory === cat
                    ? "bg-[#111111] text-white"
                    : "bg-white border border-[#111111]/10 text-[#111111]/60 hover:bg-[#111111]/5 hover:text-[#111111]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures Grid */}
      <section className="px-6 md:px-12 lg:px-20 w-full max-w-[1400px] mx-auto">
        {/* Count display */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#111111]/40">
            {filteredVentures.length} venture{filteredVentures.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {visibleVentures.map((venture) => (
            <VentureCard
              key={venture.id}
              venture={venture}
            />
          ))}
        </div>

        {filteredVentures.length === 0 && (
          <div className="py-32 text-center text-xl text-[#111111]/50 font-medium">
            No ventures found matching your criteria.
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-3 px-8 py-4 border border-[#111111]/10 text-[11px] font-mono uppercase tracking-widest font-bold text-[#111111]/60 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors"
            >
              Load More
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </section>

      <CaseStudiesSection />

      <ReviewSection title="Dispatches from the field" />
    </div>
  );
}
