"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import { MapPin, ChevronDown, ArrowRight, Crown } from "lucide-react";
import { teamData, TeamMember } from "@/artemis/data/team";

/* ── Category definitions ── */
const categories = [
  { key: "all", label: "All" },
  { key: "investment", label: "Investment" },
  { key: "product-programs", label: "Product & Programs" },
  { key: "business-community", label: "Business & Community" },
  { key: "finance-operations", label: "Finance & Operations" },
  { key: "research", label: "Research & Associates" },
];

/* ══════════════════════════════════════════════════════════════════════════
   TEAM PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Team() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <TeamGrid />
      <CTASection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, White bg, centered editorial
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const heroStats = [
    { value: String(teamData.length), label: "Team Members" },
    { value: "6", label: "African Cities" },
    { value: "5", label: "Functions" },
  ];

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
            The Team
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-8 md:mb-10">
            The people behind the{" "}
            <em className="italic font-serif text-[#FF4D00]">platform</em>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-[1.6] text-[#111111]/50 font-medium max-w-2xl mb-10 sm:mb-14 md:mb-20">
            Founders, scientists, engineers, investors, and operators. Now we
            use our expertise to help critical technology founders go further,
            faster.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-x-10 md:gap-x-16">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                className="text-center min-w-[60px]"
              >
                <div className="text-[26px] sm:text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] text-[#111111]">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TEAM GRID, Filter tabs + card grid
   ══════════════════════════════════════════════════════════════════════════ */
function TeamGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredMembers =
    activeCategory === "all"
      ? teamData
      : teamData.filter((m) => m.category === activeCategory);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-2 mb-12 md:mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              suppressHydrationWarning
              onClick={() => {
                setActiveCategory(cat.key);
                setExpandedId(null);
              }}
              className={`px-4 py-2 text-[11px] font-mono font-bold tracking-widest uppercase border transition-all min-h-[44px] ${
                activeCategory === cat.key
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#111111]/50 border-[#111111]/10 hover:border-[#111111]/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#111111]/40">
            {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
            {activeCategory !== "all" && ` in ${categories.find((c) => c.key === activeCategory)?.label}`}
          </span>
        </motion.div>

        {/* Team cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredMembers.map((member, i) => (
              <TeamCard
                key={member.id}
                member={member}
                index={i}
                isInView={isInView}
                isExpanded={expandedId === member.id}
                onToggle={() =>
                  setExpandedId(expandedId === member.id ? null : member.id)
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredMembers.length === 0 && (
          <div className="py-32 text-center text-xl text-[#111111]/50 font-medium">
            No team members in this category.
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Helper: Get initials from name ── */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !part.endsWith("."))
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ── Team Card ── */
function TeamCard({
  member,
  index,
  isInView,
  isExpanded,
  onToggle,
}: {
  member: TeamMember;
  index: number;
  isInView: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const initials = getInitials(member.name);
  const isFounder = member.isFounder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className={`border p-6 md:p-8 bg-white transition-all duration-300 cursor-pointer group ${
        isFounder
          ? isExpanded
            ? "border-[#FF4D00]/40"
            : "border-[#FF4D00]/20 hover:border-[#FF4D00]/40"
          : isExpanded
            ? "border-[#FF4D00]/30"
            : "border-[#111111]/10 hover:border-[#FF4D00]/30"
      }`}
      onClick={onToggle}
    >
      {/* Top: Monogram + Name */}
      <div className="flex items-start gap-5 mb-4">
        {/* Initials monogram */}
        <div
          className={`shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center ${
            isFounder
              ? "bg-[#FF4D00] text-white"
              : "bg-[#111111] text-white/70 group-hover:bg-[#111111]/80 transition-colors"
          }`}
        >
          <span className="text-[18px] md:text-[22px] font-display font-medium tracking-tight leading-none">
            {initials}
          </span>
        </div>

        {/* Name + Role */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[18px] md:text-[22px] font-display font-medium tracking-tight leading-[1.2] mb-1">
              {member.name}
            </h3>
            {isFounder && (
              <Crown className="w-4 h-4 text-[#FF4D00] shrink-0" strokeWidth={1.5} />
            )}
          </div>
          <p className={`text-[13px] md:text-[14px] font-medium leading-[1.4] ${
            isFounder ? "text-[#FF4D00]" : "text-[#FF4D00]/70"
          }`}>
            {member.role}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 mb-4">
        <MapPin className="w-3.5 h-3.5 text-[#111111]/30" />
        <span className="text-[12px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
          {member.location}
        </span>
      </div>

      {/* Category tag */}
      <div className="mb-4">
        <span className="inline-block px-2.5 py-1 bg-[#FAFAFA] text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
          {member.category}
        </span>
      </div>

      {/* Bio (expandable) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="pt-4 border-t border-[#111111]/10">
              <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">
                {member.bio}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand hint */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#111111]/5">
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/20 group-hover:text-[#FF4D00]/60 transition-colors">
          {isExpanded ? "Close" : "Read bio"}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#111111]/20 group-hover:text-[#FF4D00]/60 transition-all duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
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
    <section ref={ref}>
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6">
            Want to work with
            <br />
            this team?
          </h2>
          <p className="text-[15px] md:text-[17px] text-white/50 font-medium leading-[1.6] max-w-md mb-10">
            We are always looking for operators, engineers, and builders who
            want to turn critical technology into operating companies. See open
            roles across the Route.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/careers"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FF4D00] text-white text-[12px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-colors"
            >
              View Open Roles
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-10 py-5 border border-white/20 text-white text-[12px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-colors"
            >
              Join the Network
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="border border-white/10 p-8 md:p-12 bg-white/5"
        >
          <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-8">
            Now Hiring
          </div>
          <div className="text-3xl md:text-4xl font-display font-medium mb-4 tracking-tight">
            12 Open Positions
          </div>
          <p className="text-white/40 font-medium leading-relaxed mb-6 text-[15px]">
            Across Nairobi, Lagos, Accra, and Addis Ababa. Engineering,
            operations, investment, and program roles available.
          </p>
          <div className="pt-6 border-t border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/30">
              Locations
            </span>
            <span className="text-xl md:text-2xl font-display font-medium">
              4 Cities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
