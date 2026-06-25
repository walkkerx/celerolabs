"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Rocket,
  Coins,
  Handshake,
  UserPlus,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ── Data ── */

const heroMetrics = [
  { value: "190", label: "Hub Locations on the Route" },
  { value: "1,000+", label: "Open Seats Cohort 2026" },
  { value: "63", label: "Countries in the Network" },
];

const pathways = [
  {
    id: "founders",
    icon: Rocket,
    label: "Founders",
    title: "For Founders",
    description:
      "Apply to our commercialization programs and gain access to infrastructure, capital, and a peer network across 190 hubs on the Route. Whether you're at prototype stage or post-revenue, there's a pathway built for where you are.",
    detail:
      "Quest Fellowship · xCelero Accelerator · M1 Core Residency · XEmbassy Drop-in",
  },
  {
    id: "investors",
    icon: Coins,
    label: "Investors",
    title: "For Investors",
    description:
      "Join the LP network or participate in SPV syndicates alongside institutional partners. Our capital vehicles are structured for the realities of building in the Global South: patient, aligned, and route-connected.",
    detail:
      "SPV Syndicates · Dedicated Funds · Continuous Capital Flow · Non-Dilutive Desk",
  },
  {
    id: "partners",
    icon: Handshake,
    label: "Partners",
    title: "For Partners",
    description:
      "Co-design commercialization programs with industry and government partners. Host an XEmbassy node. Provide market access, pilot opportunities, and first-customer contracts to ventures on the Route.",
    detail:
      "Government Programs · Industry Partnerships · XEmbassy Node Hosting · Living Labs",
  },
  {
    id: "talent",
    icon: UserPlus,
    label: "Talent",
    title: "For Talent",
    description:
      "Join the operator network across the Route. Fellowship positions, venture-in-residence roles, and specialized positions in deep tech, climate, and critical infrastructure across 63 countries.",
    detail:
      "Quest Fellowship · Operator Network · Venture-in-Residence · Route Deployments",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Express Interest",
    desc: "A brief application or referral from someone within the XEmbassy network. No decks required at this stage, just tell us what you're building and why it matters.",
  },
  {
    step: "02",
    title: "Deep Conversation",
    desc: "We spend three to five hours in real dialogue about your core technical insight, the bottleneck you're addressing, and the architecture you've chosen. Not a pitch, a conversation.",
  },
  {
    step: "03",
    title: "Onboarding",
    desc: "Join the Route. Access M1 Core campuses, XEmbassy nodes, and distributed living labs. Deploy into programs, connect with peers, and start building at the frontier.",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   JOIN PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function JoinPage() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <PathwaysSection />
      <ProcessSection />
      <ApplicationSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, Light bg, 7+5 grid (NEWLAB style, matching Programs page)
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#FAFAFA] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: label + heading + para */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-6 block">
            Join xCelero
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-6">
            Build where it
            <br />
            <span className="text-[#111111]/40">
              matters most
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#111111]/60 font-medium max-w-lg">
            The xCelero ecosystem is not a directory, it&apos;s a living
            infrastructure for people building at the frontier of critical
            technology. Whether you&apos;re a founder, investor, partner, or
            operator, there&apos;s a place on the Route for you.
          </p>
        </motion.div>

        {/* Right: metric cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col"
        >
          {heroMetrics.map((metric, i) => (
            <div
              key={i}
              className={`py-6 ${
                i > 0 ? "border-t border-[#111111]/10" : ""
              }`}
            >
              <div className="text-[40px] sm:text-[48px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-[1] mb-2">
                {metric.value}
              </div>
              <div className="text-[13px] md:text-[15px] text-[#111111]/50 font-medium leading-[1.5]">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PATHWAYS, "How to Join", centered label + heading, expandable accordion
   ══════════════════════════════════════════════════════════════════════════ */
function PathwaysSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6">
            How to Join
          </div>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-6">
            Four pathways,{" "}
            <span className="text-[#111111]/40">
              one Route
            </span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Every role in the ecosystem is connected. Founders need capital,
            capital needs deal flow, deal flow needs infrastructure, and
            infrastructure needs operators.
          </p>
        </motion.div>

        {/* Accordion rows */}
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-[#111111]/10">
            {pathways.map((pathway, idx) => (
              <PathwayRow key={pathway.id} pathway={pathway} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Single Pathway Row (expandable accordion) ── */
function PathwayRow({
  pathway,
  index,
}: {
  pathway: (typeof pathways)[number];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = pathway.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="border-b border-[#111111]/10"
    >
      {/* Toggle header */}
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
      >
        <div className="flex items-center gap-4 md:gap-6">
          {/* Index number */}
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-[#FF4D00] flex items-center justify-center text-white shrink-0">
            <Icon className="w-4 h-4" />
          </div>

          {/* Title + label */}
          <div>
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-display font-medium tracking-tight group-hover:text-[#FF4D00] transition-colors">
              {pathway.title}
            </h3>
            <p className="text-[13px] md:text-[15px] text-[#111111]/40 hidden sm:block">
              {pathway.label}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <div className="text-[#111111]/30 group-hover:text-[#111111]/60 transition-colors shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Expandable content */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-8 md:pb-12 pl-0 md:pl-[72px]">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Description */}
            <div className="md:col-span-7 space-y-6">
              <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7]">
                {pathway.description}
              </p>

              <Link
                to="/programs"
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group/link"
              >
                Explore {pathway.label} Programs
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Detail */}
            <div className="md:col-span-5">
              <div className="border-t border-[#111111]/10 pt-6">
                <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 mb-3">
                  Included Pathways
                </div>
                <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7]">
                  {pathway.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PROCESS, "The Process", centered 3-step grid (like Approach HowWeWork)
   ══════════════════════════════════════════════════════════════════════════ */
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-b border-[#111111]/10"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6">
            The Process
          </div>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Three steps to the{" "}
            <span className="text-[#111111]/40">
              Route
            </span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Our onboarding is deliberately rigorous, because the people who
            belong here don&apos;t need convincing, they need a path.
          </p>
        </motion.div>

        {/* 3-step grid */}
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-0">
            {processSteps.map((step, i) => (
              <ProcessCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-16 md:mt-24"
        >
          <Link
            to="/programs"
            className="group inline-flex items-center gap-6 px-10 py-5 bg-[#111111] text-white text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-[#FF4D00] transition-all"
          >
            Start an Application{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`border-t border-[#111111]/10 pt-10 pb-10 ${
        index > 0 ? "md:border-l md:pl-8" : ""
      }`}
    >
      <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FF4D00] mb-6">
        STEP {step.step}
      </div>
      <h3 className="text-[24px] md:text-[28px] font-display font-medium tracking-tight leading-[1.15] mb-6">
        {step.title}
      </h3>
      <p className="text-[15px] md:text-[16px] text-[#111111]/55 font-medium leading-[1.7]">
        {step.desc}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   APPLICATION SECTION, Newlab-style application form
   ══════════════════════════════════════════════════════════════════════════ */

type FormMode = "founder" | "partner";

const LOCATION_OPTIONS = [
  "Lagos",
  "Nairobi",
  "Cape Town",
  "Cairo",
  "Kigali",
  "Accra",
  "Kinshasa",
  "Casablanca",
  "Dubai",
  "London",
  "Unsure / Remote",
];

const FOUNDER_ROLE_OPTIONS = [
  "CEO",
  "CTO",
  "COO",
  "CFO",
  "VP Engineering",
  "VP Product",
  "Head of Operations",
  "Head of Partnerships",
  "Other",
];

const PARTNER_ROLE_OPTIONS = [
  "Investor",
  "Corporate Partner",
  "Government Agency",
  "Foundation",
  "Academic Institution",
  "Other",
];

const INTEREST_OPTIONS = [
  "Co-investing in portfolio ventures",
  "Hosting an XEmbassy node",
  "Sponsoring a program cohort",
  "Providing market access/pilots",
  "Grant/non-dilutive capital",
  "Other",
];

const REFERRAL_OPTIONS = [
  "LinkedIn",
  "X/Twitter",
  "Word of Mouth",
  "Newsletter",
  "Event",
  "Search Engine",
  "Other",
];

/* ── Reusable styled components ── */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/40 mb-2 block">
      {children}
    </label>
  );
}

function RequiredStar() {
  return <span className="text-[#FF4D00]"> *</span>;
}

const inputClasses =
  "w-full border-b border-white/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-white/20 text-white";

const selectClasses =
  "w-full border-b border-white/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors text-white appearance-none cursor-pointer";

const textareaClasses =
  "w-full border-b border-white/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-white/20 text-white min-h-[120px] resize-none";

function CustomSelect({
  options,
  placeholder,
  required,
  value,
  onChange,
  ...props
}: {
  options: string[];
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange">) {
  return (
    <div className="relative">
      <select
        {...props}
        required={required}
        className={selectClasses}
        suppressHydrationWarning
        value={value || ""}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled className="text-[#111111]">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-[#111111]">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
    </div>
  );
}

/* ── Founder Form State & Type ── */
interface FounderFields {
  firstName: string;
  lastName: string;
  email: string;
  linkedinUrl: string;
  companyName: string;
  companyWebsite: string;
  location: string;
  role: string;
  pitchDeckUrl: string;
  motivation: string;
  referral: string;
}

const initialFounderFields: FounderFields = {
  firstName: "",
  lastName: "",
  email: "",
  linkedinUrl: "",
  companyName: "",
  companyWebsite: "",
  location: "",
  role: "",
  pitchDeckUrl: "",
  motivation: "",
  referral: "",
};

/* ── Partner Form State & Type ── */
interface PartnerFields {
  firstName: string;
  lastName: string;
  email: string;
  orgName: string;
  orgWebsite: string;
  partnerRole: string;
  interest: string;
  referral: string;
  description: string;
}

const initialPartnerFields: PartnerFields = {
  firstName: "",
  lastName: "",
  email: "",
  orgName: "",
  orgWebsite: "",
  partnerRole: "",
  interest: "",
  referral: "",
  description: "",
};

/* ── Founder Form ── */
function FounderForm({
  fields,
  setField,
}: {
  fields: FounderFields;
  setField: <K extends keyof FounderFields>(key: K, value: FounderFields[K]) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8"
    >
      <p className="text-[15px] md:text-[17px] text-white/50 font-medium leading-[1.7] max-w-2xl">
        Apply for startup membership at xCelero, unlocking access to office
        space, community, and potential pilots, capital, and customers via our
        network.
      </p>
      <p className="text-[13px] font-mono tracking-[0.1em] uppercase text-white/30">
        Tell us what you&apos;re working on.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>
            FIRST NAME <RequiredStar />
          </FieldLabel>
          <input
            type="text"
            required
            className={inputClasses}
            placeholder=""
            suppressHydrationWarning
            value={fields.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>
            LAST NAME <RequiredStar />
          </FieldLabel>
          <input
            type="text"
            required
            className={inputClasses}
            placeholder=""
            suppressHydrationWarning
            value={fields.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
          />
        </div>
      </div>

      <div>
        <FieldLabel>
          FOUNDER(S) LINKEDIN URL <RequiredStar />
        </FieldLabel>
        <input
          type="url"
          required
          className={inputClasses}
          placeholder="www.linkedin.com/in/"
          suppressHydrationWarning
          value={fields.linkedinUrl}
          onChange={(e) => setField("linkedinUrl", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>
            COMPANY NAME <RequiredStar />
          </FieldLabel>
          <input
            type="text"
            required
            className={inputClasses}
            placeholder=""
            suppressHydrationWarning
            value={fields.companyName}
            onChange={(e) => setField("companyName", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>COMPANY WEBSITE URL</FieldLabel>
          <input
            type="url"
            className={inputClasses}
            placeholder=""
            suppressHydrationWarning
            value={fields.companyWebsite}
            onChange={(e) => setField("companyWebsite", e.target.value)}
          />
        </div>
      </div>

      <div>
        <FieldLabel>
          EMAIL <RequiredStar />
        </FieldLabel>
        <input
          type="email"
          required
          className={inputClasses}
          placeholder=""
          suppressHydrationWarning
          value={fields.email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>
            MEMBERSHIP LOCATION <RequiredStar />
          </FieldLabel>
          <CustomSelect
            options={LOCATION_OPTIONS}
            placeholder="Select location"
            required
            value={fields.location}
            onChange={(e) => setField("location", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>
            YOUR ROLE <RequiredStar />
          </FieldLabel>
          <CustomSelect
            options={FOUNDER_ROLE_OPTIONS}
            placeholder="Select role"
            required
            value={fields.role}
            onChange={(e) => setField("role", e.target.value)}
          />
        </div>
      </div>

      <div>
        <FieldLabel>
          COMPANY PITCH DECK URL (PLEASE ENSURE OPEN ACCESS) <RequiredStar />
        </FieldLabel>
        <input
          type="url"
          required
          className={inputClasses}
          placeholder=""
          suppressHydrationWarning
          value={fields.pitchDeckUrl}
          onChange={(e) => setField("pitchDeckUrl", e.target.value)}
        />
      </div>

      <div>
        <FieldLabel>
          WHY DOES YOUR COMPANY WANT TO JOIN XCELERO? <RequiredStar />
        </FieldLabel>
        <textarea
          required
          className={textareaClasses}
          placeholder=""
          suppressHydrationWarning
          value={fields.motivation}
          onChange={(e) => setField("motivation", e.target.value)}
        />
      </div>

      <div>
        <FieldLabel>
          HOW DID YOU HEAR ABOUT XCELERO? <RequiredStar />
        </FieldLabel>
        <CustomSelect
          options={REFERRAL_OPTIONS}
          placeholder="Select source"
          required
          value={fields.referral}
          onChange={(e) => setField("referral", e.target.value)}
        />
      </div>
    </motion.div>
  );
}

/* ── Partner Form ── */
function PartnerForm({
  fields,
  setField,
}: {
  fields: PartnerFields;
  setField: <K extends keyof PartnerFields>(key: K, value: PartnerFields[K]) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>
            FIRST NAME <RequiredStar />
          </FieldLabel>
          <input
            type="text"
            required
            className={inputClasses}
            placeholder=""
            suppressHydrationWarning
            value={fields.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>
            LAST NAME <RequiredStar />
          </FieldLabel>
          <input
            type="text"
            required
            className={inputClasses}
            placeholder=""
            suppressHydrationWarning
            value={fields.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>
            ORGANIZATION NAME <RequiredStar />
          </FieldLabel>
          <input
            type="text"
            required
            className={inputClasses}
            placeholder=""
            suppressHydrationWarning
            value={fields.orgName}
            onChange={(e) => setField("orgName", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>ORGANIZATION WEBSITE URL</FieldLabel>
          <input
            type="url"
            className={inputClasses}
            placeholder=""
            suppressHydrationWarning
            value={fields.orgWebsite}
            onChange={(e) => setField("orgWebsite", e.target.value)}
          />
        </div>
      </div>

      <div>
        <FieldLabel>
          EMAIL <RequiredStar />
        </FieldLabel>
        <input
          type="email"
          required
          className={inputClasses}
          placeholder=""
          suppressHydrationWarning
          value={fields.email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>
            YOUR ROLE <RequiredStar />
          </FieldLabel>
          <CustomSelect
            options={PARTNER_ROLE_OPTIONS}
            placeholder="Select role"
            required
            value={fields.partnerRole}
            onChange={(e) => setField("partnerRole", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>
            INTEREST <RequiredStar />
          </FieldLabel>
          <CustomSelect
            options={INTEREST_OPTIONS}
            placeholder="Select interest"
            required
            value={fields.interest}
            onChange={(e) => setField("interest", e.target.value)}
          />
        </div>
      </div>

      <div>
        <FieldLabel>
          HOW DID YOU HEAR ABOUT XCELERO? <RequiredStar />
        </FieldLabel>
        <CustomSelect
          options={REFERRAL_OPTIONS}
          placeholder="Select source"
          required
          value={fields.referral}
          onChange={(e) => setField("referral", e.target.value)}
        />
      </div>

      <div>
        <FieldLabel>
          TELL US ABOUT YOUR INTEREST <RequiredStar />
        </FieldLabel>
        <textarea
          required
          className={textareaClasses}
          placeholder=""
          suppressHydrationWarning
          value={fields.description}
          onChange={(e) => setField("description", e.target.value)}
        />
      </div>
    </motion.div>
  );
}

/* ── Main Application Section ── */
function ApplicationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [mode, setMode] = useState<FormMode>("founder");

  // Founder form state
  const [founderFields, setFounderFields] = useState<FounderFields>(initialFounderFields);
  // Partner form state
  const [partnerFields, setPartnerFields] = useState<PartnerFields>(initialPartnerFields);

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setFounderField = <K extends keyof FounderFields>(key: K, value: FounderFields[K]) => {
    setFounderFields((prev) => ({ ...prev, [key]: value }));
  };

  const setPartnerField = <K extends keyof PartnerFields>(key: K, value: PartnerFields[K]) => {
    setPartnerFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      let payload: Record<string, string | undefined>;

      if (mode === "founder") {
        payload = {
          type: "founder",
          firstName: founderFields.firstName,
          lastName: founderFields.lastName,
          email: founderFields.email,
          linkedinUrl: founderFields.linkedinUrl,
          companyName: founderFields.companyName,
          companyWebsite: founderFields.companyWebsite || undefined,
          location: founderFields.location,
          role: founderFields.role,
          pitchDeckUrl: founderFields.pitchDeckUrl,
          motivation: founderFields.motivation,
          referral: founderFields.referral || undefined,
        };
      } else {
        payload = {
          type: "partner",
          firstName: partnerFields.firstName,
          lastName: partnerFields.lastName,
          email: partnerFields.email,
          orgName: partnerFields.orgName,
          orgWebsite: partnerFields.orgWebsite || undefined,
          partnerRole: partnerFields.partnerRole,
          interest: partnerFields.interest,
          referral: partnerFields.referral || undefined,
          description: partnerFields.description,
        };
      }

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || `Submission failed (${res.status})`
        );
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref}>
      <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-16 md:py-24 rounded-sm">
        <div className="w-full max-w-5xl mx-auto">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-10">
              APPLY
            </h2>

            {/* I AM toggle */}
            <div className="flex flex-wrap gap-3">
              <button
                suppressHydrationWarning
                onClick={() => {
                  setMode("founder");
                  setSubmitError(null);
                }}
                className={`px-6 py-3 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors duration-300 ${
                  mode === "founder"
                    ? "bg-[#FF4D00] text-white"
                    : "bg-transparent text-white border border-white/20 hover:border-white/40"
                }`}
              >
                A STARTUP FOUNDER Looking to join xCelero.
              </button>
              <button
                suppressHydrationWarning
                onClick={() => {
                  setMode("partner");
                  setSubmitError(null);
                }}
                className={`px-6 py-3 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors duration-300 ${
                  mode === "partner"
                    ? "bg-[#FF4D00] text-white"
                    : "bg-transparent text-white border border-white/20 hover:border-white/40"
                }`}
              >
                Looking to partner or invest with xCelero.
              </button>
            </div>
          </motion.div>

          {/* Form or Success */}
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center py-16 md:py-24"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-[#FF4D00] flex items-center justify-center mb-8"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-[28px] md:text-[40px] font-display font-medium tracking-[-0.02em] leading-[1.1] mb-4">
                  Application Received
                </h3>

                <p className="text-[15px] md:text-[17px] text-white/50 font-medium leading-[1.7] max-w-lg mb-3">
                  Thank you for applying to join the xCelero ecosystem. Our team
                  will review your application and reach out within 5–7 business
                  days.
                </p>

                <p className="text-[13px] font-mono tracking-[0.1em] uppercase text-white/30 mb-10">
                  The Route is assembling.
                </p>

                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFounderFields(initialFounderFields);
                    setPartnerFields(initialPartnerFields);
                    setSubmitError(null);
                  }}
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-[11px] font-bold tracking-[0.12em] uppercase hover:bg-white hover:text-[#111111] transition-colors duration-300"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <form onSubmit={handleSubmit} suppressHydrationWarning>
                  {mode === "founder" ? (
                    <FounderForm fields={founderFields} setField={setFounderField} />
                  ) : (
                    <PartnerForm fields={partnerFields} setField={setPartnerField} />
                  )}

                  {/* Error message */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 flex items-start gap-3 p-4 border border-[#FF4D00]/30 bg-[#FF4D00]/10"
                    >
                      <AlertCircle className="w-5 h-5 text-[#FF4D00] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] font-bold text-[#FF4D00]">
                          Submission failed
                        </p>
                        <p className="text-[13px] text-white/60 mt-1">
                          {submitError}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Privacy disclaimer */}
                  <p className="text-[12px] text-white/30 leading-[1.7] mt-10 max-w-3xl">
                    xCelero needs the contact information you provide to us to contact
                    you about our products and services. You may unsubscribe from these
                    communications at any time. For information on how to unsubscribe,
                    as well as our privacy practices and commitment to protecting your
                    privacy, check out our Privacy Policy.
                  </p>

                  {/* Submit button */}
                  <div className="mt-10">
                    <button
                      type="submit"
                      suppressHydrationWarning
                      disabled={isSubmitting}
                      className={`inline-flex items-center gap-3 px-10 py-5 text-[12px] uppercase tracking-[0.12em] font-bold transition-colors duration-300 ${
                        isSubmitting
                          ? "bg-white/20 text-white/50 cursor-not-allowed"
                          : "bg-[#FF4D00] text-white hover:bg-white hover:text-[#111111]"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
