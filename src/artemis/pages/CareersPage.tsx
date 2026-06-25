"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building2,
  X,
  Filter,
  Remote,
  GraduationCap,
  Globe,
  Zap,
  Users,
  ChevronRight,
  Scale,
  Building,
  Network,
  TrendingUp,
  Loader2,
  Send,
  CheckCircle,
  User,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { Link } from "@/artemis/router";
import {
  careersData,
  allRoles,
  allSkills,
  allLocations,
  allIndustries,
  allStages,
  type CompanyJobs,
  type Job,
} from "@/artemis/data/careers";

// ─── Filter Dropdown ──────────────────────────────────────────────
function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
  onClear,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes("")
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 border text-[12px] font-medium tracking-wide transition-all whitespace-nowrap ${
          selected.length > 0
            ? "border-[#FF4D00] bg-[#FF4D00]/5 text-[#FF4D00]"
            : "border-[#111111]/15 text-[#111111]/60 hover:border-[#111111]/40"
        }`}
      >
        <span>{label}</span>
        {selected.length > 0 && (
          <span className="w-5 h-5 rounded-full bg-[#FF4D00] text-white text-[10px] font-bold flex items-center justify-center">
            {selected.length}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 z-50 bg-white border border-[#111111]/15 shadow-lg min-w-[200px] sm:min-w-[220px] max-h-[320px] overflow-y-auto scrollbar-thin"
          >
            {selected.length > 0 && (
              <button
                onClick={onClear}
                className="w-full text-left px-4 py-2.5 text-[11px] font-medium text-[#FF4D00] hover:bg-[#FF4D00]/5 border-b border-[#111111]/10"
              >
                Clear all
              </button>
            )}
            {filtered.map((option) => (
              <button
                key={option}
                onClick={() => onToggle(option)}
                className={`w-full text-left px-4 py-2.5 text-[12px] font-medium flex items-center gap-3 hover:bg-[#FAFAFA] transition-colors ${
                  selected.includes(option) ? "text-[#FF4D00]" : "text-[#111111]/80"
                }`}
              >
                <span
                  className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 ${
                    selected.includes(option)
                      ? "bg-[#FF4D00] border-[#FF4D00]"
                      : "border-[#111111]/25"
                  }`}
                >
                  {selected.includes(option) && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Salary Badge ──────────────────────────────────────────────────
function SalaryBadge({ job }: { job: Job }) {
  if (!job.salaryMin && !job.salaryMax) return null;

  const fmt = (n: number) => {
    if (n >= 1000) {
      return `${Math.round(n / 1000)}K`;
    }
    return n.toLocaleString();
  };

  const periodLabel = job.salaryPeriod === "hour" ? "/hr" : job.salaryPeriod === "month" ? "/mo" : "/yr";
  const currencySymbol = job.salaryCurrency === "USD" ? "$" : job.salaryCurrency;

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
      <DollarSign className="w-3 h-3" />
      {currencySymbol}{fmt(job.salaryMin)}{job.salaryMax ? ` – ${currencySymbol}${fmt(job.salaryMax)}` : ""}{periodLabel}
    </span>
  );
}

// ─── Application Modal ──────────────────────────────────────────────
function ApplicationModal({
  isOpen,
  onClose,
  initialRole,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialRole: string;
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    role: initialRole,
    location: "",
    availability: "",
    motivation: "",
    referral: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm((prev) => ({ ...prev, role: initialRole }));
  }, [initialRole]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const setField = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError("First name, last name, and email are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Submission failed. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setSubmitted(false);
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  const labelClass =
    "text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase mb-1.5 block";
  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white text-[13px] px-4 py-3 focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-white/20";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#111111]/90 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] border border-white/10 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-5 border-b border-white/10 bg-[#1A1A1A]">
            <div>
              <p className="text-[10px] font-mono tracking-[0.4em] text-[#FF4D00] uppercase mb-1">
                Application
              </p>
              <h3 className="text-[20px] md:text-[24px] font-display font-medium text-white tracking-tight">
                {form.role}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            /* Success state */
            <div className="px-6 md:px-8 py-16 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-[#FF4D00]/10 flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-8 h-8 text-[#FF4D00]" />
              </motion.div>
              <h4 className="text-[22px] font-display font-medium text-white mb-3">
                Application received
              </h4>
              <p className="text-[14px] text-white/50 leading-relaxed max-w-sm">
                Thank you for your interest in {form.role}. Our team will review your profile and reach out if there&apos;s a fit.
              </p>
              <button
                onClick={handleClose}
                className="mt-8 px-8 py-3 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF4D00]/90 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="px-6 md:px-8 py-6">
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={labelClass}>
                    First Name <span className="text-[#FF4D00]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={setField("firstName")}
                      placeholder="Jane"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>
                    Last Name <span className="text-[#FF4D00]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={setField("lastName")}
                    placeholder="Doe"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={labelClass}>
                    Email <span className="text-[#FF4D00]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      placeholder="jane@example.com"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={setField("phone")}
                      placeholder="+254 700 000 000"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              {/* LinkedIn + Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={labelClass}>LinkedIn</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="url"
                      value={form.linkedinUrl}
                      onChange={setField("linkedinUrl")}
                      placeholder="linkedin.com/in/janedoe"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Portfolio</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="url"
                      value={form.portfolioUrl}
                      onChange={setField("portfolioUrl")}
                      placeholder="yoursite.com"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              {/* Role (read-only) + Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={labelClass}>Role</label>
                  <input
                    type="text"
                    value={form.role}
                    readOnly
                    className={`${inputClass} bg-white/[0.02] cursor-default text-white/70`}
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="text"
                      value={form.location}
                      onChange={setField("location")}
                      placeholder="Nairobi, Kenya"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-5">
                <label className={labelClass}>Availability</label>
                <select
                  value={form.availability}
                  onChange={setField("availability")}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-[#1A1A1A]">Select availability</option>
                  <option value="Immediate" className="bg-[#1A1A1A]">Immediate</option>
                  <option value="2 Weeks Notice" className="bg-[#1A1A1A]">2 Weeks Notice</option>
                  <option value="1 Month Notice" className="bg-[#1A1A1A]">1 Month Notice</option>
                </select>
              </div>

              {/* Motivation */}
              <div className="mb-5">
                <label className={labelClass}>Motivation</label>
                <textarea
                  value={form.motivation}
                  onChange={setField("motivation")}
                  placeholder="Why this role? Why now? What drives you?"
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Referral */}
              <div className="mb-8">
                <label className={labelClass}>Referral</label>
                <input
                  type="text"
                  value={form.referral}
                  onChange={setField("referral")}
                  placeholder="How did you hear about us?"
                  className={inputClass}
                />
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 text-[12px] font-medium"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF4D00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-[10px] text-white/25 text-center mt-4">
                By submitting, you agree to xCelero&apos;s privacy practices regarding applicant data.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Job Card ──────────────────────────────────────────────────────
function JobCard({ job, onApply }: { job: Job; onApply: (role: string) => void }) {
  const postedLabel =
    job.postedDaysAgo === 0
      ? "Today"
      : job.postedDaysAgo === 1
      ? "Yesterday"
      : `${job.postedDaysAgo}d ago`;

  return (
    <div className="group p-5 border-b border-[#111111]/8 last:border-b-0 hover:bg-[#FAFAFA]/80 transition-colors">
      <div className="flex flex-col gap-3">
        {/* Title + Apply */}
        <div className="flex items-start justify-between gap-4">
          <button
            onClick={() => onApply(job.title)}
            className="text-left text-[15px] font-display font-medium text-[#111111] hover:text-[#FF4D00] transition-colors leading-tight"
          >
            {job.title}
          </button>
          <button
            onClick={() => onApply(job.title)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF4D00] transition-colors"
          >
            Apply <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <SalaryBadge job={job} />
          {job.remote && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-50 text-violet-700 text-[11px] font-semibold">
              <Globe className="w-3 h-3" /> Remote
            </span>
          )}
          {job.hybrid && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-[11px] font-semibold">
              <Users className="w-3 h-3" /> Hybrid
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#111111]/5 text-[#111111]/60 text-[11px] font-medium">
            <MapPin className="w-3 h-3" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#111111]/5 text-[#111111]/60 text-[11px] font-medium">
            <Clock className="w-3 h-3" /> {postedLabel}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#111111]/5 text-[#111111]/60 text-[11px] font-medium">
            <Briefcase className="w-3 h-3" /> {job.department}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {job.skills.slice(0, 8).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-[#111111]/5 text-[#111111]/50 text-[10px] font-medium tracking-wide hover:bg-[#FF4D00]/10 hover:text-[#FF4D00] transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Company Group ─────────────────────────────────────────────────
function CompanyGroup({
  company,
  expanded,
  onToggle,
  visibleJobs,
  showAll,
  onApply,
}: {
  company: CompanyJobs;
  expanded: boolean;
  onToggle: () => void;
  visibleJobs: Job[];
  showAll: boolean;
  onApply: (role: string) => void;
}) {
  const jobsToShow = showAll ? visibleJobs : visibleJobs.slice(0, 3);
  const totalJobs = company.jobs.length;

  const logoBg: Record<string, string> = {
    "⚡": "bg-amber-100",
    "🧠": "bg-violet-100",
    "🏗️": "bg-orange-100",
    "🔋": "bg-green-100",
    "🔬": "bg-cyan-100",
    "💳": "bg-blue-100",
    "📚": "bg-rose-100",
    "🚛": "bg-emerald-100",
    "✕": "bg-[#FF4D00]",
    "⚓": "bg-sky-100",
    "🛡️": "bg-indigo-100",
  };

  return (
    <div className="border border-[#111111]/10 bg-white">
      {/* Company Header */}
      <div className="flex items-start gap-4 p-5 border-b border-[#111111]/8">
        <div
          className={`w-12 h-12 flex items-center justify-center text-xl flex-shrink-0 ${
            logoBg[company.companyLogo] || "bg-gray-100"
          } ${company.companyLogo === "✕" ? "text-white font-bold text-sm" : ""}`}
        >
          {company.companyLogo}
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-[16px] font-display font-medium text-[#111111]">
              {company.companyName}
            </h3>
            <button
              onClick={onToggle}
              className="flex items-center gap-1 text-[11px] font-medium text-[#111111]/40 hover:text-[#FF4D00] transition-colors flex-shrink-0"
            >
              {expanded ? "Collapse" : "Expand"}
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Company Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="px-2 py-0.5 bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-bold uppercase tracking-wide">
              {company.stage}
            </span>
            <span className="px-2 py-0.5 bg-[#111111]/5 text-[#111111]/50 text-[10px] font-medium">
              {company.employees} employees
            </span>
            {company.industries.map((ind) => (
              <span key={ind} className="px-2 py-0.5 bg-[#111111]/5 text-[#111111]/50 text-[10px] font-medium">
                {ind}
              </span>
            ))}
            {company.locations.slice(0, 2).map((loc) => (
              <span key={loc} className="px-2 py-0.5 bg-[#111111]/5 text-[#111111]/50 text-[10px] font-medium">
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pt-3 pb-1">
        <p className="text-[13px] text-[#111111]/60 leading-relaxed line-clamp-2">
          {company.description}
        </p>
      </div>

      {/* Jobs */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              {jobsToShow.map((job) => (
                <JobCard key={job.id} job={job} onApply={onApply} />
              ))}
            </div>

            {/* Footer links */}
            <div className="flex items-center gap-4 p-4 border-t border-[#111111]/8">
              <button
                onClick={() => onApply(`General Application – ${company.companyName}`)}
                className="flex items-center gap-1.5 text-[11px] font-bold text-[#FF4D00] hover:underline uppercase tracking-wide"
              >
                {totalJobs} job{totalJobs !== 1 ? "s" : ""} at {company.companyName}
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Careers Page ─────────────────────────────────────────────
export function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [internshipsOnly, setInternshipsOnly] = useState(false);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(() => {
    // Start with all expanded
    return new Set(careersData.map((c) => c.companyId));
  });
  const [showCount, setShowCount] = useState(5);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyRole, setApplyRole] = useState("General Application");

  const openApplyModal = (role: string) => {
    setApplyRole(role);
    setApplyModalOpen(true);
  };

  const toggleCompany = (id: string) => {
    setExpandedCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFilter = (selected: string[], setter: (v: string[]) => void) => (val: string) => {
    setter(
      selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val]
    );
  };

  const hasActiveFilters =
    selectedRoles.length > 0 ||
    selectedSkills.length > 0 ||
    selectedLocations.length > 0 ||
    selectedStages.length > 0 ||
    selectedIndustries.length > 0 ||
    internshipsOnly ||
    remoteOnly ||
    searchQuery.trim() !== "";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRoles([]);
    setSelectedSkills([]);
    setSelectedLocations([]);
    setSelectedStages([]);
    setSelectedIndustries([]);
    setInternshipsOnly(false);
    setRemoteOnly(false);
  };

  // Filter logic
  const filteredData = useMemo(() => {
    return careersData
      .map((company) => {
        const filteredJobs = company.jobs.filter((job) => {
          // Search query
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchesTitle = job.title.toLowerCase().includes(q);
            const matchesSkill = job.skills.some((s) => s.toLowerCase().includes(q));
            const matchesCompany = company.companyName.toLowerCase().includes(q);
            const matchesDept = job.department.toLowerCase().includes(q);
            if (!matchesTitle && !matchesSkill && !matchesCompany && !matchesDept) return false;
          }

          // Role filter
          if (selectedRoles.length > 0 && !selectedRoles.includes(job.department)) return false;

          // Skills filter
          if (selectedSkills.length > 0 && !selectedSkills.some((s) => job.skills.includes(s)))
            return false;

          // Location filter
          if (selectedLocations.length > 0 && !selectedLocations.includes(job.location) && !job.remote)
            return false;

          // Stage filter
          if (selectedStages.length > 0 && !selectedStages.includes(company.stage)) return false;

          // Industry filter
          if (selectedIndustries.length > 0 && !selectedIndustries.some((i) => company.industries.includes(i)))
            return false;

          // Internships only
          if (internshipsOnly && job.type !== "internship") return false;

          // Remote only
          if (remoteOnly && !job.remote && !job.hybrid) return false;

          return true;
        });

        return { ...company, jobs: filteredJobs };
      })
      .filter((company) => company.jobs.length > 0);
  }, [
    searchQuery,
    selectedRoles,
    selectedSkills,
    selectedLocations,
    selectedStages,
    selectedIndustries,
    internshipsOnly,
    remoteOnly,
  ]);

  const totalJobs = filteredData.reduce((acc, c) => acc + c.jobs.length, 0);

  const visibleData = filteredData.slice(0, showCount);

  return (
    <div className="bg-white text-[#111111]">
      {/* ── Masthead ─────────────────────────────────────────── */}
      <section>
        <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 pt-16 pb-12 rounded-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#FF4D00] mb-4 uppercase">
              xCelero Careers
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[0.95] mb-4">
              A leap in<br />
              <span className="text-[#FF4D00]">human progress.</span>
            </h1>
            <p className="text-white/50 text-[15px] max-w-xl leading-relaxed mt-6">
              For humanity. A new epoch of civilization, built by the ventures redefining energy, housing, AI, space, and every system that matters. Open roles across {careersData.length} portfolio companies.
            </p>

            {/* Nav tabs */}
            <div className="flex gap-6 mt-10 border-b border-white/10">
              <button className="pb-3 text-[13px] font-bold tracking-wide text-white border-b-2 border-[#FF4D00]">
                Jobs
              </button>
              <Link
                to="/ventures"
                className="pb-3 text-[13px] font-medium tracking-wide text-white/40 hover:text-white transition-colors"
              >
                Companies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Editorial Values Section ──────────────────────────── */}
      <section className="bg-white border-b border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16 md:mb-24"
          >
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#FF4D00] mb-6 uppercase font-bold">
              Our Values
            </p>
            <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
              The principles that{" "}
              <em className="italic font-serif text-[#FF4D00]">compound</em>{" "}
              over decades.
            </h2>
            <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-[1.7]">
              Six convictions that shape how we hire, how we work, and how we
              measure success. Not posters on a wall. Operating principles.
            </p>
          </motion.div>

          {/* Values as manifesto-style rows */}
          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "Unreasonable Depth",
                description:
                  "We go deeper than anyone thinks is necessary. Surface insights don't build microgrids. The founder who spends three months on the factory floor before writing a line of code is our kind of founder.",
              },
              {
                num: "02",
                title: "Civilizational Thinking",
                description:
                  "Every decision is measured against a 100-year horizon, not a quarterly cycle. We build infrastructure, not apps. The time horizon changes everything: how you hire, how you invest, how you ship.",
              },
              {
                num: "03",
                title: "The Art of the Pick",
                description:
                  "We take beginnings seriously. The right technology, the right market, the right architecture. A high degree of startup mortality is baked in at the beginning. Being a good picker is vastly underrated.",
              },
              {
                num: "04",
                title: "Solidarity, Not Charity",
                description:
                  "Equal quality of support regardless of geography. Nairobi gets New York caliber. Lagos gets London attention. Not out of generosity, but because the best founders are everywhere.",
              },
              {
                num: "05",
                title: "Hub, Not HQ",
                description:
                  "Distributed by design. Our strength is in 190 hubs, not one headquarters. Every hub is a prototyping lab, a co-working space, and a node in the Route. Your office is wherever the work needs to happen.",
              },
              {
                num: "06",
                title: "Compound Returns",
                description:
                  "Every investment in people, infrastructure, and community compounds over decades. The first cohort mentors the second. The first hub enables the tenth. We play infinite games.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                className="group"
              >
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 py-10 md:py-14 border-t border-[#111111]/10 items-start">
                  {/* Number */}
                  <div className="lg:col-span-2">
                    <span className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium leading-none tracking-tighter text-[#FF4D00]/15 group-hover:text-[#FF4D00]/40 transition-colors duration-500">
                      {value.num}
                    </span>
                  </div>
                  {/* Title */}
                  <div className="lg:col-span-3">
                    <h3 className="text-[22px] md:text-[28px] font-display font-medium tracking-tight leading-[1.15] text-[#111111] group-hover:text-[#FF4D00] transition-colors duration-300">
                      {value.title}
                    </h3>
                  </div>
                  {/* Description */}
                  <div className="lg:col-span-7">
                    <p className="text-[15px] md:text-[17px] text-[#111111]/55 leading-[1.7] font-medium group-hover:text-[#111111]/70 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Closing border */}
            <div className="border-t border-[#111111]/10" />
          </div>
        </div>
      </section>

      {/* ── Dark Culture Section: Stats + Perks ───────────────── */}
      <section>
        <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 rounded-sm">
          {/* Stats Row */}
          <div className="py-12 md:py-16 border-b border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: "75%", label: "Promoted from within" },
                { value: "39", label: "Countries" },
                { value: "4.2 yrs", label: "Avg. tenure" },
                { value: "190", label: "Hubs worldwide" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="text-[36px] md:text-[48px] font-display font-medium tracking-[-0.02em] text-white block leading-none mb-2">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Life at xCelero: Image-backed perk cards */}
          <div className="py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16"
            >
              <p className="text-[10px] font-mono tracking-[0.4em] text-[#FF4D00] mb-4 uppercase font-bold">
                Life at xCelero
              </p>
              <h2 className="text-[28px] md:text-[40px] lg:text-[52px] font-display font-medium tracking-tight leading-[1.05]">
                Build the infrastructure the next century{" "}
                <em className="italic font-serif text-[#FF4D00]">needs</em>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  icon: Scale,
                  title: "Solidarity Pricing",
                  description:
                    "Geography shouldn't determine quality. Nairobi gets New York caliber at a fraction of the cost.",
                  image:
                    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80",
                },
                {
                  icon: Building,
                  title: "Hub-First Work",
                  description:
                    "190 XHansa Hubs across 39 countries. CNC machines, prototyping labs, and co-working spaces are your office.",
                  image:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
                },
                {
                  icon: Network,
                  title: "Route Network",
                  description:
                    "1,000+ operators and a global community of builders. Every hub, every cohort strengthens the connective tissue.",
                  image:
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
                },
                {
                  icon: TrendingUp,
                  title: "Growth Paths",
                  description:
                    "From operator to program director. From analyst to partner. We promote from within and invest in your development.",
                  image:
                    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative overflow-hidden border border-white/10 hover:border-[#FF4D00]/30 transition-all duration-500 aspect-[3/4]"
                >
                  {/* Background image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-[#111111]/70 group-hover:bg-[#111111]/60 transition-colors duration-500" />
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-[#FF4D00] group-hover:bg-[#FF4D00]/10 transition-all duration-300">
                      <card.icon className="w-5 h-5 text-white/60 group-hover:text-[#FF4D00] transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-[18px] md:text-[20px] font-display font-medium tracking-tight mb-3 text-white group-hover:text-[#FF4D00] transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-[13px] text-white/50 leading-[1.65] font-medium group-hover:text-white/70 transition-colors duration-300">
                        {card.description}
                      </p>
                      <div className="mt-4 h-[2px] w-8 bg-white/10 group-hover:w-full group-hover:bg-[#FF4D00]/40 transition-all duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Search & Filters ─────────────────────────────────── */}
      <section className="sticky top-[80px] z-40 bg-white border-b border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Search bar */}
          <div className="flex items-center gap-4 py-4 border-b border-[#111111]/8">
            <div className="flex items-center gap-3 flex-grow bg-[#FAFAFA] border border-[#111111]/10 px-4 py-2.5 focus-within:border-[#FF4D00] transition-colors">
              <Search className="w-4 h-4 text-[#111111]/30 flex-shrink-0" />
              <input
                type="search"
                placeholder="Search by title, skill, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-[13px] w-full placeholder:text-[#111111]/30"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-[#111111]/30 hover:text-[#111111]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            <FilterDropdown
              label="Roles"
              options={allRoles}
              selected={selectedRoles}
              onToggle={toggleFilter(selectedRoles, setSelectedRoles)}
              onClear={() => setSelectedRoles([])}
            />
            <FilterDropdown
              label="Skills"
              options={allSkills}
              selected={selectedSkills}
              onToggle={toggleFilter(selectedSkills, setSelectedSkills)}
              onClear={() => setSelectedSkills([])}
            />
            <FilterDropdown
              label="Location"
              options={allLocations}
              selected={selectedLocations}
              onToggle={toggleFilter(selectedLocations, setSelectedLocations)}
              onClear={() => setSelectedLocations([])}
            />
            <FilterDropdown
              label="Stage"
              options={allStages}
              selected={selectedStages}
              onToggle={toggleFilter(selectedStages, setSelectedStages)}
              onClear={() => setSelectedStages([])}
            />
            <FilterDropdown
              label="Industry"
              options={allIndustries}
              selected={selectedIndustries}
              onToggle={toggleFilter(selectedIndustries, setSelectedIndustries)}
              onClear={() => setSelectedIndustries([])}
            />

            <div className="h-6 w-px bg-[#111111]/10 mx-1 flex-shrink-0" />

            {/* Internships toggle */}
            <button
              onClick={() => setInternshipsOnly(!internshipsOnly)}
              className={`flex items-center gap-2 px-3 py-2 text-[11px] font-medium tracking-wide whitespace-nowrap transition-all ${
                internshipsOnly
                  ? "text-[#FF4D00]"
                  : "text-[#111111]/50 hover:text-[#111111]/80"
              }`}
            >
              <span
                className={`w-8 h-4 rounded-full flex items-center transition-colors ${
                  internshipsOnly ? "bg-[#FF4D00] justify-end" : "bg-[#111111]/15 justify-start"
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white shadow-sm mx-0.5" />
              </span>
              Internships only
            </button>

            {/* Remote toggle */}
            <button
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`flex items-center gap-2 px-3 py-2 text-[11px] font-medium tracking-wide whitespace-nowrap transition-all ${
                remoteOnly
                  ? "text-[#FF4D00]"
                  : "text-[#111111]/50 hover:text-[#111111]/80"
              }`}
            >
              <span
                className={`w-8 h-4 rounded-full flex items-center transition-colors ${
                  remoteOnly ? "bg-[#FF4D00] justify-end" : "bg-[#111111]/15 justify-start"
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white shadow-sm mx-0.5" />
              </span>
              Remote options
            </button>
          </div>
        </div>
      </section>

      {/* ── Active Filter Chips + Count ──────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 flex-wrap">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-3 py-1 bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-bold uppercase tracking-wide hover:bg-[#FF4D00]/20 transition-colors"
              >
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
            {/* Active filter chips */}
            {selectedRoles.map((r) => (
              <FilterChip key={r} label={r} onRemove={() => toggleFilter(selectedRoles, setSelectedRoles)(r)} />
            ))}
            {selectedSkills.map((s) => (
              <FilterChip key={s} label={s} onRemove={() => toggleFilter(selectedSkills, setSelectedSkills)(s)} />
            ))}
            {selectedLocations.map((l) => (
              <FilterChip key={l} label={l} onRemove={() => toggleFilter(selectedLocations, setSelectedLocations)(l)} />
            ))}
            {selectedStages.map((st) => (
              <FilterChip key={st} label={st} onRemove={() => toggleFilter(selectedStages, setSelectedStages)(st)} />
            ))}
            {selectedIndustries.map((i) => (
              <FilterChip key={i} label={i} onRemove={() => toggleFilter(selectedIndustries, setSelectedIndustries)(i)} />
            ))}
          </div>
          <span className="text-[12px] font-medium text-[#111111]/40 flex-shrink-0 ml-4">
            {totalJobs} job{totalJobs !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── Job Listings ─────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-24">
        {filteredData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Building2 className="w-12 h-12 text-[#111111]/15 mx-auto mb-4" />
            <h3 className="text-xl font-display font-medium text-[#111111]/40 mb-2">
              No matching jobs found
            </h3>
            <p className="text-[13px] text-[#111111]/30 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF4D00] transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleData.map((company) => (
              <CompanyGroup
                key={company.companyId}
                company={company}
                expanded={expandedCompanies.has(company.companyId)}
                onToggle={() => toggleCompany(company.companyId)}
                visibleJobs={company.jobs}
                showAll={true}
                onApply={openApplyModal}
              />
            ))}
          </div>
        )}

        {/* Show More */}
        {showCount < filteredData.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowCount((prev) => prev + 5)}
              className="px-8 py-3 border border-[#111111] text-[11px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors"
            >
              Show more companies
            </button>
          </div>
        )}
      </section>

      {/* ── CTA Section ──────────────────────────────────────── */}
      <section>
        <div className="max-w-[1400px] mx-auto bg-[#111111] text-white px-6 md:px-12 lg:px-20 py-20 rounded-sm text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#FF4D00] mb-6 uppercase">
              Don&apos;t see your role?
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
              Forge the next epoch.
            </h2>
            <p className="text-white/40 text-[14px] max-w-lg mx-auto leading-relaxed mb-10">
              xCelero is always looking for extraordinary builders who work for humanity. If you don&apos;t see a fit, submit your profile and we&apos;ll reach out when the right venture launches.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openApplyModal("General Application")}
                className="px-8 py-4 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF4D00]/90 transition-colors"
              >
                Submit your profile
              </button>
              <Link
                to="/ventures"
                className="px-8 py-4 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors"
              >
                View all ventures
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Application Modal ─────────────────────────────────── */}
      <ApplicationModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        initialRole={applyRole}
      />
    </div>
  );
}

// ─── Filter Chip ───────────────────────────────────────────────────
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#111111]/5 text-[#111111]/60 text-[10px] font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-[#FF4D00] transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
