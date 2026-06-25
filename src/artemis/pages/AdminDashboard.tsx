"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  RefreshCw,
  Users,
  DollarSign,
  FileText,
  Clock,
  Trash2,
  ChevronDown,
  ChevronUp,
  Mail,
  ShieldCheck,
  Building2,
  Globe,
  MapPin,
  Briefcase,
  Link2,
  Heart,
  ExternalLink,
  Download,
  Lock,
  LogOut,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Link } from "@/artemis/router";

/* ══════════════════════════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════════════════════════ */
interface Subscriber {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  consent: boolean;
  source: string;
  createdAt: string;
}

interface InvestmentInquiry {
  id: string;
  name: string;
  email: string;
  amount: number;
  tier: string;
  accredited: boolean;
  consent: boolean;
  status: string;
  createdAt: string;
}

interface Application {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  referral: string | null;
  linkedinUrl: string | null;
  companyName: string | null;
  companyWebsite: string | null;
  location: string | null;
  role: string | null;
  pitchDeckUrl: string | null;
  motivation: string | null;
  orgName: string | null;
  orgWebsite: string | null;
  partnerRole: string | null;
  interest: string | null;
  description: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface JobApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  role: string;
  location: string | null;
  availability: string | null;
  motivation: string | null;
  referral: string | null;
  resumeUrl: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface ProgramApplication {
  id: string;
  programSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  linkedinUrl: string | null;
  location: string | null;
  currentRole: string | null;
  companyName: string | null;
  motivation: string | null;
  referral: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface Stats {
  totalSubscribers: number;
  totalInquiries: number;
  totalApplications: number;
  totalJobApplications: number;
  totalProgramApplications: number;
  pendingInquiries: number;
  pendingApplications: number;
  pendingJobApplications: number;
  pendingProgramApplications: number;
  totalInvestmentAmount: number;
  inquiriesByTier: { tier: string; _count: { tier: number }; _sum: { amount: number | null } }[];
  applicationsByType: { type: string; _count: { type: number } }[];
  inquiriesByStatus: { status: string; _count: { status: number } }[];
  applicationsByStatus: { status: string; _count: { status: number } }[];
  jobApplicationsByRole: { role: string; _count: { role: number } }[];
  jobApplicationsByStatus: { status: string; _count: { status: number } }[];
  programApplicationsByProgram: { programSlug: string; _count: { programSlug: number } }[];
  programApplicationsByStatus: { status: string; _count: { status: number } }[];
  recentSubscribers: Subscriber[];
  recentInquiries: InvestmentInquiry[];
  recentApplications: Application[];
}

type Tab = "subscribers" | "inquiries" | "applications" | "jobApplications" | "programApplications";
type AppFilter = "all" | "founder" | "partner";
type ProgramFilter = "all" | "xhansa-fellowship" | "xcelero-accelerator" | "inception-studios" | "quest-fellowship";

/* ══════════════════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════════════════ */
function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTimestamp(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   BADGES
   ══════════════════════════════════════════════════════════════════════════ */
function StatusBadge({ status, type }: { status: string; type: "inquiry" | "application" }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    reviewing: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    contacted: "bg-green-500/15 text-green-400 border-green-500/30",
    declined: "bg-red-500/15 text-red-400 border-red-500/30",
    invested: "bg-[#FF4D00]/15 text-[#FF4D00] border-[#FF4D00]/30",
    accepted: "bg-[#FF4D00]/15 text-[#FF4D00] border-[#FF4D00]/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-sm ${
        styles[status] || "bg-white/10 text-white/40 border-white/20"
      }`}
    >
      {status}
    </span>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    scout: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    syndicate: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    partner: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    anchor: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-sm ${
        styles[tier] || "bg-white/10 text-white/40 border-white/20"
      }`}
    >
      {tier}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const isFounder = type === "founder";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-sm ${
        isFounder
          ? "bg-[#FF4D00]/15 text-[#FF4D00] border-[#FF4D00]/30"
          : "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
      }`}
    >
      {isFounder ? <Briefcase className="w-2.5 h-2.5" /> : <Heart className="w-2.5 h-2.5" />}
      {type}
    </span>
  );
}

function ConsentBadge({ consent }: { consent: boolean }) {
  return consent ? (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-sm bg-green-500/15 text-green-400 border-green-500/30">
      yes
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-sm bg-white/10 text-white/30 border-white/20">
      no
    </span>
  );
}

function AccreditedBadge({ accredited }: { accredited: boolean }) {
  return accredited ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-sm bg-[#FF4D00]/15 text-[#FF4D00] border-[#FF4D00]/30">
      <ShieldCheck className="w-2.5 h-2.5" />
      accredited
    </span>
  ) : null;
}

function ProgramBadge({ slug }: { slug: string }) {
  const labels: Record<string, string> = {
    "xhansa-fellowship": "Xhansa Fellowship",
    "xcelero-accelerator": "Xcelero Accelerator",
    "inception-studios": "Inception Studios",
    "quest-fellowship": "Quest Fellowship",
  };
  const styles: Record<string, string> = {
    "xhansa-fellowship": "bg-[#FF4D00]/15 text-[#FF4D00] border-[#FF4D00]/30",
    "xcelero-accelerator": "bg-violet-500/15 text-violet-400 border-violet-500/30",
    "inception-studios": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "quest-fellowship": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-sm ${styles[slug] || "bg-white/10 text-white/40 border-white/20"}`}>
      {labels[slug] || slug}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SKELETON
   ══════════════════════════════════════════════════════════════════════════ */
function SkeletonRow({ cols = 4 }: { cols?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-4">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="h-4 bg-white/5 rounded animate-pulse" />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
export function AdminDashboard() {
  /* ── Auth state ── */
  const [token, setToken] = useState<string | null>(null);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const [stats, setStats] = useState<Stats | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [inquiries, setInquiries] = useState<InvestmentInquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [programApplications, setProgramApplications] = useState<ProgramApplication[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("subscribers");
  const [appFilter, setAppFilter] = useState<AppFilter>("all");
  const [programFilter, setProgramFilter] = useState<ProgramFilter>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  /* ── Auth: validate existing token on mount ── */
  useEffect(() => {
    const checkAuth = async () => {
      const stored = localStorage.getItem("admin_token");
      if (!stored) {
        setAuthChecking(false);
        return;
      }
      try {
        const res = await fetch("/api/admin/auth", {
          headers: { Authorization: `Bearer ${stored}` },
        });
        if (res.ok) {
          setToken(stored);
        } else {
          localStorage.removeItem("admin_token");
        }
      } catch {
        localStorage.removeItem("admin_token");
      }
      setAuthChecking(false);
    };
    checkAuth();
  }, []);

  /* ── Auth: login handler ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        setLoginPassword("");
      } else {
        setLoginError(data.message || "Invalid password");
      }
    } catch {
      setLoginError("Connection failed. Please try again.");
    }
    setLoginLoading(false);
  };

  /* ── Auth: logout handler ── */
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setStats(null);
    setSubscribers([]);
    setInquiries([]);
    setApplications([]);
    setJobApplications([]);
    setProgramApplications([]);
  };

  /* ── Auth: helper to clear token on 401 ── */
  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem("admin_token");
    setToken(null);
  }, []);

  /* ── Auth: fetch with auth header + 401 check ── */
  const authFetch = useCallback(
    (url: string, options?: RequestInit) => {
      const headers: Record<string, string> = {
        ...(options?.headers as Record<string, string> || {}),
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      return fetch(url, { ...options, headers }).then((res) => {
        if (res.status === 401) {
          handleUnauthorized();
        }
        return res;
      });
    },
    [token, handleUnauthorized]
  );

  /* ── Data fetching ── */
  const fetchStats = useCallback(async () => {
    try {
      const res = await authFetch("/api/admin?section=stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, [authFetch]);

  const fetchSubscribers = useCallback(async () => {
    try {
      const res = await authFetch("/api/admin?section=subscribers");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    }
  }, [authFetch]);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await authFetch("/api/admin?section=inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    }
  }, [authFetch]);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await authFetch("/api/admin?section=applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  }, [authFetch]);

  const fetchJobApplications = useCallback(async () => {
    try {
      const res = await authFetch("/api/admin?section=jobApplications");
      if (res.ok) {
        const data = await res.json();
        setJobApplications(data.jobApplications || []);
      }
    } catch (err) {
      console.error("Failed to fetch job applications:", err);
    }
  }, [authFetch]);

  const fetchProgramApplications = useCallback(async () => {
    try {
      const res = await authFetch("/api/admin?section=programApplications");
      if (res.ok) {
        const data = await res.json();
        setProgramApplications(data.programApplications || []);
      }
    } catch (err) {
      console.error("Failed to fetch program applications:", err);
    }
  }, [authFetch]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchSubscribers(), fetchInquiries(), fetchApplications(), fetchJobApplications(), fetchProgramApplications()]);
    setLastRefreshed(new Date());
    setRefreshing(false);
  }, [fetchStats, fetchSubscribers, fetchInquiries, fetchApplications, fetchJobApplications, fetchProgramApplications]);

  useEffect(() => {
    if (!token) return;
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchSubscribers(), fetchInquiries(), fetchApplications(), fetchJobApplications(), fetchProgramApplications()]);
      setLastRefreshed(new Date());
      setLoading(false);
    };
    load();
  }, [token, fetchStats, fetchSubscribers, fetchInquiries, fetchApplications, fetchJobApplications, fetchProgramApplications]);

  /* ── Actions ── */
  const updateStatus = async (model: "inquiry" | "application" | "jobApplication" | "programApplication", id: string, status: string) => {
    setUpdatingStatus(id);
    try {
      const res = await authFetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, id, status }),
      });
      if (res.ok) {
        if (model === "inquiry") {
          setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
        } else if (model === "application") {
          setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
        } else if (model === "jobApplication") {
          setJobApplications((prev) => prev.map((ja) => (ja.id === id ? { ...ja, status } : ja)));
        } else if (model === "programApplication") {
          setProgramApplications((prev) => prev.map((pa) => (pa.id === id ? { ...pa, status } : pa)));
        }
        await fetchStats();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
    setUpdatingStatus(null);
  };

  const deleteRecord = async (model: "subscriber" | "inquiry" | "application" | "jobApplication" | "programApplication", id: string) => {
    if (!window.confirm("Are you sure you want to delete this record? This cannot be undone.")) return;
    try {
      const res = await authFetch(`/api/admin?model=${model}&id=${id}`, { method: "DELETE" });
      if (res.ok) {
        if (model === "subscriber") setSubscribers((prev) => prev.filter((s) => s.id !== id));
        if (model === "inquiry") setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (model === "application") {
          setApplications((prev) => prev.filter((a) => a.id !== id));
          if (expandedAppId === id) setExpandedAppId(null);
        }
        if (model === "jobApplication") setJobApplications((prev) => prev.filter((ja) => ja.id !== id));
        if (model === "programApplication") setProgramApplications((prev) => prev.filter((pa) => pa.id !== id));
        await fetchStats();
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  /* ── CSV Export ── */
  const handleExport = async (section: string) => {
    try {
      const res = await authFetch(`/api/admin/export?section=${section}`);
      if (!res.ok) {
        console.error("Export failed:", res.status);
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${section}-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  /* ── Computed ── */
  const pendingTotal = (stats?.pendingInquiries || 0) + (stats?.pendingApplications || 0) + (stats?.pendingJobApplications || 0) + (stats?.pendingProgramApplications || 0);
  const filteredApps = applications.filter((a) => appFilter === "all" || a.type === appFilter);
  const founderCount = stats?.applicationsByType?.find((t) => t.type === "founder")?._count.type || 0;
  const partnerCount = stats?.applicationsByType?.find((t) => t.type === "partner")?._count.type || 0;

  const inquiryTotalAmount = inquiries.reduce((sum, i) => sum + i.amount, 0);

  const jobAppRoleCount = stats?.jobApplicationsByRole?.length || 0;
  const programAppBreakdown = stats?.programApplicationsByProgram?.map((p) => {
    const labels: Record<string, string> = {
      "xhansa-fellowship": "Xhansa",
      "xcelero-accelerator": "Xcel",
      "inception-studios": "Studio",
      "quest-fellowship": "Quest",
    };
    return `${labels[p.programSlug] || p.programSlug}: ${p._count.programSlug}`;
  }).join(" · ") || "";

  const filteredProgramApps = programApplications.filter((pa) => programFilter === "all" || pa.programSlug === programFilter);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "subscribers", label: "Subscribers", count: stats?.totalSubscribers || 0 },
    { key: "inquiries", label: "Investment Inquiries", count: stats?.totalInquiries || 0 },
    { key: "applications", label: "Join Applications", count: stats?.totalApplications || 0 },
    { key: "jobApplications", label: "Job Applications", count: stats?.totalJobApplications || 0 },
    { key: "programApplications", label: "Program Applications", count: stats?.totalProgramApplications || 0 },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     AUTH CHECKING SPINNER
     ══════════════════════════════════════════════════════════════════════════ */
  if (authChecking) {
    return (
      <div className="bg-[#111111] text-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF4D00]" />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════
     LOGIN SCREEN
     ══════════════════════════════════════════════════════════════════════════ */
  if (!token) {
    return (
      <div className="bg-[#111111] text-white min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="border border-white/10 bg-white/[0.02] p-8 md:p-12">
            {/* Branding */}
            <div className="mb-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-4 block">
                xCelero Labs
              </span>
              <h1 className="text-[28px] sm:text-[36px] font-display font-medium tracking-[-0.02em] mb-2">
                Admin Access
              </h1>
              <p className="text-sm text-white/40 font-medium">
                Enter the admin password to continue.
              </p>
            </div>

            {/* Error */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 text-[12px] font-medium"
              >
                {loginError}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    autoFocus
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF4D00]/50 transition-colors pr-12"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading || !loginPassword}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="text-[10px] font-mono text-white/15 mt-6 text-center">
              Access restricted to authorized personnel only.
            </p>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white/30 hover:text-[#FF4D00] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Site
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════
     DASHBOARD RENDER
     ══════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="bg-[#111111] text-white min-h-screen">
      {/* ── Header ── */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 block">
              Admin
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-4">
              Operations Hub
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-[1.6] text-white/50 font-medium max-w-2xl mb-8">
              All signups, applications, and investment interests in one place.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={refreshAll}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-[#111111] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <span className="text-[11px] font-mono text-white/30">
                Last refreshed: {formatTimestamp(lastRefreshed.toISOString())}
              </span>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white/40 text-[11px] font-bold uppercase tracking-[0.1em] hover:border-white/30 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Site
              </Link>
              <div className="flex-1" />
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white/40 text-[11px] font-bold uppercase tracking-[0.1em] hover:border-red-500/30 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <StatCard
              icon={<Users className="w-4 h-4" />}
              label="Total Subscribers"
              value={stats?.totalSubscribers ?? "N/A"}
              loading={loading}
              delay={0}
            />
            <StatCard
              icon={<DollarSign className="w-4 h-4" />}
              label="Investment Inquiries"
              value={stats?.totalInquiries ?? "N/A"}
              sub={stats ? formatCurrency(stats.totalInvestmentAmount) : undefined}
              loading={loading}
              delay={0.1}
            />
            <StatCard
              icon={<FileText className="w-4 h-4" />}
              label="Join Applications"
              value={stats?.totalApplications ?? "N/A"}
              sub={stats ? `${founderCount} founder · ${partnerCount} partner` : undefined}
              loading={loading}
              delay={0.15}
            />
            <StatCard
              icon={<Briefcase className="w-4 h-4" />}
              label="Job Applications"
              value={stats?.totalJobApplications ?? "N/A"}
              sub={stats ? `${jobAppRoleCount} role${jobAppRoleCount !== 1 ? "s" : ""}` : undefined}
              loading={loading}
              delay={0.2}
            />
            <StatCard
              icon={<Globe className="w-4 h-4" />}
              label="Program Applications"
              value={stats?.totalProgramApplications ?? "N/A"}
              sub={stats && programAppBreakdown ? programAppBreakdown : undefined}
              loading={loading}
              delay={0.25}
            />
            <StatCard
              icon={<Clock className="w-4 h-4" />}
              label="Pending Items"
              value={pendingTotal || "N/A"}
              sub={stats ? `${stats.pendingInquiries} inq · ${stats.pendingApplications} app · ${stats.pendingJobApplications} job · ${stats.pendingProgramApplications} prog` : undefined}
              loading={loading}
              delay={0.3}
              accent
            />
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-0 border-b border-white/10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "text-[#FF4D00]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-[10px] font-mono text-white/20">({tab.count})</span>
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="admin-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4D00]"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Content ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "subscribers" && (
              <motion.div
                key="subscribers"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <SubscribersTab
                  subscribers={subscribers}
                  loading={loading}
                  onDelete={(id) => deleteRecord("subscriber", id)}
                  onExport={() => handleExport("subscribers")}
                />
              </motion.div>
            )}
            {activeTab === "inquiries" && (
              <motion.div
                key="inquiries"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <InquiriesTab
                  inquiries={inquiries}
                  loading={loading}
                  totalAmount={inquiryTotalAmount}
                  updatingStatus={updatingStatus}
                  onUpdateStatus={(id, status) => updateStatus("inquiry", id, status)}
                  onDelete={(id) => deleteRecord("inquiry", id)}
                  onExport={() => handleExport("inquiries")}
                />
              </motion.div>
            )}
            {activeTab === "applications" && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <ApplicationsTab
                  applications={filteredApps}
                  totalCount={applications.length}
                  filter={appFilter}
                  onFilterChange={setAppFilter}
                  loading={loading}
                  expandedId={expandedAppId}
                  onToggleExpand={setExpandedAppId}
                  updatingStatus={updatingStatus}
                  onUpdateStatus={(id, status) => updateStatus("application", id, status)}
                  onDelete={(id) => deleteRecord("application", id)}
                  onExport={() => handleExport("applications")}
                />
              </motion.div>
            )}
            {activeTab === "jobApplications" && (
              <motion.div
                key="jobApplications"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <JobApplicationsTab
                  jobApplications={jobApplications}
                  loading={loading}
                  updatingStatus={updatingStatus}
                  onUpdateStatus={(id, status) => updateStatus("jobApplication", id, status)}
                  onDelete={(id) => deleteRecord("jobApplication", id)}
                  onExport={() => handleExport("jobApplications")}
                />
              </motion.div>
            )}
            {activeTab === "programApplications" && (
              <motion.div
                key="programApplications"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <ProgramApplicationsTab
                  programApplications={filteredProgramApps}
                  totalCount={programApplications.length}
                  filter={programFilter}
                  onFilterChange={setProgramFilter}
                  loading={loading}
                  updatingStatus={updatingStatus}
                  onUpdateStatus={(id, status) => updateStatus("programApplication", id, status)}
                  onDelete={(id) => deleteRecord("programApplication", id)}
                  onExport={() => handleExport("programApplications")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STAT CARD
   ══════════════════════════════════════════════════════════════════════════ */
function StatCard({
  icon,
  label,
  value,
  sub,
  loading: isLoading,
  delay = 0,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  loading: boolean;
  delay?: number;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`border p-6 md:p-8 transition-colors ${
        accent
          ? "border-[#FF4D00]/30 bg-[#FF4D00]/5 hover:border-[#FF4D00]/50"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
            accent
              ? "border-[#FF4D00]/30 text-[#FF4D00]"
              : "border-white/10 text-white/40"
          }`}
        >
          {icon}
        </div>
      </div>
      {isLoading ? (
        <div className="h-10 w-24 bg-white/5 rounded animate-pulse mb-2" />
      ) : (
        <div
          className={`text-[32px] sm:text-[40px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1] mb-2 ${
            accent ? "text-[#FF4D00]" : ""
          }`}
        >
          {value}
        </div>
      )}
      <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40">
        {label}
      </div>
      {sub && (
        <div className="text-[10px] font-mono tracking-[0.15em] text-white/25 mt-1">{sub}</div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SUBSCRIBERS TAB
   ══════════════════════════════════════════════════════════════════════════ */
function SubscribersTab({
  subscribers,
  loading: isLoading,
  onDelete,
  onExport,
}: {
  subscribers: Subscriber[];
  loading: boolean;
  onDelete: (id: string) => void;
  onExport: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-[11px] font-mono text-white/40">
          Showing {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-[10px] font-mono font-bold tracking-wider uppercase text-white/40 hover:text-white hover:border-white/30 transition-colors"
        >
          <Download className="w-3 h-3" />
          Export CSV
        </button>
      </div>

      {/* Table header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 pb-3 border-b border-white/10 mb-0">
        <div className="col-span-3 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Name
        </div>
        <div className="col-span-3 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Email
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Source
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Consent
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Joined
        </div>
        <div className="col-span-1" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
        ) : subscribers.length === 0 ? (
          <div className="py-16 text-center">
            <Mail className="w-8 h-8 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-sm font-medium">No subscribers yet</p>
            <p className="text-white/15 text-[11px] mt-1">Subscribers will appear here when they sign up</p>
          </div>
        ) : (
          subscribers.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="py-4 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-white/[0.02] transition-colors group"
            >
              <div className="col-span-3 mb-1 md:mb-0">
                <span className="text-[13px] md:text-[14px] font-medium text-white/80 group-hover:text-white transition-colors">
                  {sub.firstName && sub.lastName ? `${sub.firstName} ${sub.lastName}` : sub.firstName || "N/A"}
                </span>
              </div>
              <div className="col-span-3 mb-1 md:mb-0">
                <span className="text-[12px] font-mono text-white/50 group-hover:text-white/70 transition-colors">
                  {sub.email}
                </span>
              </div>
              <div className="col-span-2 mb-1 md:mb-0">
                <span className="md:hidden text-[10px] font-mono text-white/20 mr-2">Source </span>
                <span className="text-[11px] font-mono text-white/40">{sub.source}</span>
              </div>
              <div className="col-span-1 mb-1 md:mb-0">
                <span className="md:hidden text-[10px] font-mono text-white/20 mr-2">Consent </span>
                <ConsentBadge consent={sub.consent} />
              </div>
              <div className="col-span-2 mb-1 md:mb-0">
                <span className="md:hidden text-[10px] font-mono text-white/20 mr-2">Joined </span>
                <span className="text-[11px] font-mono text-white/30">{formatDate(sub.createdAt)}</span>
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => onDelete(sub.id)}
                  className="p-1.5 text-white/10 hover:text-red-400 transition-colors"
                  aria-label="Delete subscriber"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INQUIRIES TAB
   ══════════════════════════════════════════════════════════════════════════ */
function InquiriesTab({
  inquiries,
  loading: isLoading,
  totalAmount,
  updatingStatus,
  onUpdateStatus,
  onDelete,
  onExport,
}: {
  inquiries: InvestmentInquiry[];
  loading: boolean;
  totalAmount: number;
  updatingStatus: string | null;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}) {
  const inquiryStatuses = ["pending", "reviewing", "contacted", "declined", "invested"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-[11px] font-mono text-white/40">
          {inquiries.length} inquir{inquiries.length !== 1 ? "ies" : "y"} · Total:{" "}
          <span className="text-[#FF4D00]">{formatCurrency(totalAmount)}</span>
        </span>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-[10px] font-mono font-bold tracking-wider uppercase text-white/40 hover:text-white hover:border-white/30 transition-colors"
        >
          <Download className="w-3 h-3" />
          Export CSV
        </button>
      </div>

      {/* Table header */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 pb-3 border-b border-white/10 mb-0">
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Name
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Email
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Amount
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Tier
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Accr.
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Status
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Date
        </div>
        <div className="col-span-1" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={7} />)
        ) : inquiries.length === 0 ? (
          <div className="py-16 text-center">
            <DollarSign className="w-8 h-8 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-sm font-medium">No investment inquiries yet</p>
            <p className="text-white/15 text-[11px] mt-1">Inquiries will appear here when investors express interest</p>
          </div>
        ) : (
          inquiries.map((inq, i) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="py-4 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center hover:bg-white/[0.02] transition-colors group"
            >
              {/* Name */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="text-[13px] md:text-[14px] font-medium text-white/80 group-hover:text-white transition-colors">
                  {inq.name}
                </span>
              </div>

              {/* Email */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="text-[12px] text-white/40 truncate block">{inq.email}</span>
              </div>

              {/* Amount */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Amount </span>
                <span className="text-[13px] font-medium text-white/70">{formatCurrency(inq.amount)}</span>
              </div>

              {/* Tier */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Tier </span>
                <TierBadge tier={inq.tier} />
              </div>

              {/* Accredited */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <AccreditedBadge accredited={inq.accredited} />
              </div>

              {/* Status dropdown */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Status </span>
                <div className="relative inline-block">
                  <select
                    value={inq.status}
                    onChange={(e) => onUpdateStatus(inq.id, e.target.value)}
                    disabled={updatingStatus === inq.id}
                    className="appearance-none bg-transparent text-[11px] font-mono font-bold tracking-wider uppercase cursor-pointer pr-5 border-none outline-none disabled:opacity-50"
                    style={{ color: getStatusColor(inq.status) }}
                  >
                    {inquiryStatuses.map((s) => (
                      <option key={s} value={s} className="bg-[#111111] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                  {updatingStatus === inq.id && (
                    <RefreshCw className="w-3 h-3 animate-spin inline ml-1 text-[#FF4D00]" />
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Date </span>
                <span className="text-[11px] font-mono text-white/30">{formatDate(inq.createdAt)}</span>
              </div>

              {/* Delete */}
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => onDelete(inq.id)}
                  className="p-1.5 text-white/10 hover:text-red-400 transition-colors"
                  aria-label="Delete inquiry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   APPLICATIONS TAB
   ══════════════════════════════════════════════════════════════════════════ */
function ApplicationsTab({
  applications,
  totalCount,
  filter,
  onFilterChange,
  loading: isLoading,
  expandedId,
  onToggleExpand,
  updatingStatus,
  onUpdateStatus,
  onDelete,
  onExport,
}: {
  applications: Application[];
  totalCount: number;
  filter: AppFilter;
  onFilterChange: (f: AppFilter) => void;
  loading: boolean;
  expandedId: string | null;
  onToggleExpand: (id: string | null) => void;
  updatingStatus: string | null;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}) {
  const appStatuses = ["pending", "reviewing", "contacted", "accepted", "declined"];
  const filters: { key: AppFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "founder", label: "Founders" },
    { key: "partner", label: "Partners" },
  ];

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase transition-colors ${
                filter === f.key
                  ? "bg-[#FF4D00]/15 text-[#FF4D00] border border-[#FF4D00]/30"
                  : "text-white/30 hover:text-white/60 border border-transparent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-white/40">
            Showing {applications.length} of {totalCount}
          </span>
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-[10px] font-mono font-bold tracking-wider uppercase text-white/40 hover:text-white hover:border-white/30 transition-colors"
          >
            <Download className="w-3 h-3" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table header */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 pb-3 border-b border-white/10 mb-0">
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Name
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Email
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Type
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Key Info
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Status
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Date
        </div>
        <div className="col-span-1" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={6} />)
        ) : applications.length === 0 ? (
          <div className="py-16 text-center">
            <FileText className="w-8 h-8 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-sm font-medium">No applications yet</p>
            <p className="text-white/15 text-[11px] mt-1">Applications will appear here when founders or partners apply</p>
          </div>
        ) : (
          applications.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              {/* Main row */}
              <div
                className="py-4 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
                onClick={() => onToggleExpand(expandedId === app.id ? null : app.id)}
              >
                {/* Name */}
                <div className="col-span-2 mb-1 lg:mb-0 flex items-center gap-2">
                  <span className="text-[13px] md:text-[14px] font-medium text-white/80 group-hover:text-white transition-colors">
                    {app.firstName} {app.lastName}
                  </span>
                  {expandedId === app.id ? (
                    <ChevronUp className="w-3.5 h-3.5 text-white/20" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-white/20" />
                  )}
                </div>

                {/* Email */}
                <div className="col-span-2 mb-1 lg:mb-0">
                  <span className="text-[12px] text-white/40 truncate block">{app.email}</span>
                </div>

                {/* Type */}
                <div className="col-span-1 mb-1 lg:mb-0">
                  <TypeBadge type={app.type} />
                </div>

                {/* Key info */}
                <div className="col-span-2 mb-1 lg:mb-0">
                  <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Info </span>
                  <span className="text-[12px] text-white/50">
                    {app.type === "founder" ? app.companyName || "N/A" : app.orgName || "N/A"}
                  </span>
                </div>

                {/* Status dropdown */}
                <div className="col-span-2 mb-1 lg:mb-0" onClick={(e) => e.stopPropagation()}>
                  <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Status </span>
                  <div className="relative inline-block">
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value)}
                      disabled={updatingStatus === app.id}
                      className="appearance-none bg-transparent text-[11px] font-mono font-bold tracking-wider uppercase cursor-pointer pr-5 border-none outline-none disabled:opacity-50"
                      style={{ color: getStatusColor(app.status) }}
                    >
                      {appStatuses.map((s) => (
                        <option key={s} value={s} className="bg-[#111111] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    {updatingStatus === app.id && (
                      <RefreshCw className="w-3 h-3 animate-spin inline ml-1 text-[#FF4D00]" />
                    )}
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2 mb-1 lg:mb-0">
                  <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Date </span>
                  <span className="text-[11px] font-mono text-white/30">{formatDate(app.createdAt)}</span>
                </div>

                {/* Delete */}
                <div className="col-span-1 flex justify-end" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onDelete(app.id)}
                    className="p-1.5 text-white/10 hover:text-red-400 transition-colors"
                    aria-label="Delete application"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {expandedId === app.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 pr-4 pb-6 pt-2 ml-2 border-l-2 border-[#FF4D00]/20">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                        {app.type === "founder" ? (
                          <>
                            <DetailField icon={<Link2 className="w-3 h-3" />} label="LinkedIn" value={app.linkedinUrl} isLink />
                            <DetailField icon={<Building2 className="w-3 h-3" />} label="Company" value={app.companyName} />
                            <DetailField icon={<Globe className="w-3 h-3" />} label="Website" value={app.companyWebsite} isLink />
                            <DetailField icon={<MapPin className="w-3 h-3" />} label="Location" value={app.location} />
                            <DetailField icon={<Briefcase className="w-3 h-3" />} label="Role" value={app.role} />
                            <DetailField icon={<ExternalLink className="w-3 h-3" />} label="Pitch Deck" value={app.pitchDeckUrl} isLink />
                            <DetailField icon={<FileText className="w-3 h-3" />} label="Motivation" value={app.motivation} long />
                          </>
                        ) : (
                          <>
                            <DetailField icon={<Building2 className="w-3 h-3" />} label="Organization" value={app.orgName} />
                            <DetailField icon={<Globe className="w-3 h-3" />} label="Org Website" value={app.orgWebsite} isLink />
                            <DetailField icon={<Briefcase className="w-3 h-3" />} label="Partner Role" value={app.partnerRole} />
                            <DetailField icon={<Heart className="w-3 h-3" />} label="Interest" value={app.interest} />
                            <DetailField icon={<FileText className="w-3 h-3" />} label="Description" value={app.description} long />
                          </>
                        )}
                        {app.referral && (
                          <DetailField icon={<Users className="w-3 h-3" />} label="Referral" value={app.referral} />
                        )}
                        {app.notes && (
                          <DetailField icon={<FileText className="w-3 h-3" />} label="Internal Notes" value={app.notes} long />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   JOB APPLICATIONS TAB
   ══════════════════════════════════════════════════════════════════════════ */
function JobApplicationsTab({
  jobApplications,
  loading: isLoading,
  updatingStatus,
  onUpdateStatus,
  onDelete,
  onExport,
}: {
  jobApplications: JobApplication[];
  loading: boolean;
  updatingStatus: string | null;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}) {
  const jobStatuses = ["pending", "reviewing", "contacted", "accepted", "declined"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-[11px] font-mono text-white/40">
          Showing {jobApplications.length} job application{jobApplications.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-[10px] font-mono font-bold tracking-wider uppercase text-white/40 hover:text-white hover:border-white/30 transition-colors"
        >
          <Download className="w-3 h-3" />
          Export CSV
        </button>
      </div>

      {/* Table header */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 pb-3 border-b border-white/10 mb-0">
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Name
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Email
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Role
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Location
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Avail.
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Status
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Date
        </div>
        <div className="col-span-1" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={8} />)
        ) : jobApplications.length === 0 ? (
          <div className="py-16 text-center">
            <Briefcase className="w-8 h-8 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-sm font-medium">No job applications yet</p>
            <p className="text-white/15 text-[11px] mt-1">Job applications will appear here when candidates apply</p>
          </div>
        ) : (
          jobApplications.map((ja, i) => (
            <motion.div
              key={ja.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="py-4 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center hover:bg-white/[0.02] transition-colors group"
            >
              {/* Name */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="text-[13px] md:text-[14px] font-medium text-white/80 group-hover:text-white transition-colors">
                  {ja.firstName} {ja.lastName}
                </span>
              </div>

              {/* Email */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="text-[12px] text-white/40 truncate block">{ja.email}</span>
              </div>

              {/* Role */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Role </span>
                <span className="text-[12px] text-white/50">{ja.role}</span>
              </div>

              {/* Location */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Location </span>
                <span className="text-[12px] text-white/40">{ja.location || "N/A"}</span>
              </div>

              {/* Availability */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Avail. </span>
                <span className="text-[12px] text-white/40">{ja.availability || "N/A"}</span>
              </div>

              {/* Status dropdown */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Status </span>
                <div className="relative inline-block">
                  <select
                    value={ja.status}
                    onChange={(e) => onUpdateStatus(ja.id, e.target.value)}
                    disabled={updatingStatus === ja.id}
                    className="appearance-none bg-transparent text-[11px] font-mono font-bold tracking-wider uppercase cursor-pointer pr-5 border-none outline-none disabled:opacity-50"
                    style={{ color: getStatusColor(ja.status) }}
                  >
                    {jobStatuses.map((s) => (
                      <option key={s} value={s} className="bg-[#111111] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                  {updatingStatus === ja.id && (
                    <RefreshCw className="w-3 h-3 animate-spin inline ml-1 text-[#FF4D00]" />
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Date </span>
                <span className="text-[11px] font-mono text-white/30">{formatDate(ja.createdAt)}</span>
              </div>

              {/* Delete */}
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => onDelete(ja.id)}
                  className="p-1.5 text-white/10 hover:text-red-400 transition-colors"
                  aria-label="Delete job application"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PROGRAM APPLICATIONS TAB
   ══════════════════════════════════════════════════════════════════════════ */
function ProgramApplicationsTab({
  programApplications,
  totalCount,
  filter,
  onFilterChange,
  loading: isLoading,
  updatingStatus,
  onUpdateStatus,
  onDelete,
  onExport,
}: {
  programApplications: ProgramApplication[];
  totalCount: number;
  filter: ProgramFilter;
  onFilterChange: (f: ProgramFilter) => void;
  loading: boolean;
  updatingStatus: string | null;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}) {
  const progStatuses = ["pending", "reviewing", "contacted", "accepted", "declined"];
  const filters: { key: ProgramFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "xhansa-fellowship", label: "Xhansa Fellowship" },
    { key: "xcelero-accelerator", label: "Xcelero Accelerator" },
    { key: "inception-studios", label: "Inception Studios" },
    { key: "quest-fellowship", label: "Quest Fellowship" },
  ];

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase transition-colors ${
                filter === f.key
                  ? "bg-[#FF4D00]/15 text-[#FF4D00] border border-[#FF4D00]/30"
                  : "text-white/30 hover:text-white/60 border border-transparent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-white/40">
            Showing {programApplications.length} of {totalCount}
          </span>
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-[10px] font-mono font-bold tracking-wider uppercase text-white/40 hover:text-white hover:border-white/30 transition-colors"
          >
            <Download className="w-3 h-3" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table header */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 pb-3 border-b border-white/10 mb-0">
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Name
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Email
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Program
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Role / Company
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Location
        </div>
        <div className="col-span-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Status
        </div>
        <div className="col-span-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">
          Date
        </div>
        <div className="col-span-1" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={8} />)
        ) : programApplications.length === 0 ? (
          <div className="py-16 text-center">
            <Globe className="w-8 h-8 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-sm font-medium">No program applications yet</p>
            <p className="text-white/15 text-[11px] mt-1">Program applications will appear here when people apply</p>
          </div>
        ) : (
          programApplications.map((pa, i) => (
            <motion.div
              key={pa.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="py-4 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center hover:bg-white/[0.02] transition-colors group"
            >
              {/* Name */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="text-[13px] md:text-[14px] font-medium text-white/80 group-hover:text-white transition-colors">
                  {pa.firstName} {pa.lastName}
                </span>
              </div>

              {/* Email */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="text-[12px] text-white/40 truncate block">{pa.email}</span>
              </div>

              {/* Program */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Program </span>
                <ProgramBadge slug={pa.programSlug} />
              </div>

              {/* Role / Company */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Role/Co </span>
                <span className="text-[12px] text-white/50">
                  {pa.currentRole || "N/A"}{pa.currentRole && pa.companyName ? " @ " : ""}{pa.companyName || ""}
                </span>
              </div>

              {/* Location */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Location </span>
                <span className="text-[12px] text-white/40">{pa.location || "N/A"}</span>
              </div>

              {/* Status dropdown */}
              <div className="col-span-2 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Status </span>
                <div className="relative inline-block">
                  <select
                    value={pa.status}
                    onChange={(e) => onUpdateStatus(pa.id, e.target.value)}
                    disabled={updatingStatus === pa.id}
                    className="appearance-none bg-transparent text-[11px] font-mono font-bold tracking-wider uppercase cursor-pointer pr-5 border-none outline-none disabled:opacity-50"
                    style={{ color: getStatusColor(pa.status) }}
                  >
                    {progStatuses.map((s) => (
                      <option key={s} value={s} className="bg-[#111111] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                  {updatingStatus === pa.id && (
                    <RefreshCw className="w-3 h-3 animate-spin inline ml-1 text-[#FF4D00]" />
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="col-span-1 mb-1 lg:mb-0">
                <span className="lg:hidden text-[10px] font-mono text-white/20 mr-2">Date </span>
                <span className="text-[11px] font-mono text-white/30">{formatDate(pa.createdAt)}</span>
              </div>

              {/* Delete */}
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => onDelete(pa.id)}
                  className="p-1.5 text-white/10 hover:text-red-400 transition-colors"
                  aria-label="Delete program application"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DETAIL FIELD
   ══════════════════════════════════════════════════════════════════════════ */
function DetailField({
  icon,
  label,
  value,
  isLink = false,
  long = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  isLink?: boolean;
  long?: boolean;
}) {
  if (!value) return null;

  return (
    <div className={long ? "sm:col-span-2 lg:col-span-3" : ""}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-white/20">{icon}</span>
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-white/25">{label}</span>
      </div>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[#FF4D00] hover:underline break-all"
        >
          {value}
        </a>
      ) : long ? (
        <p className="text-[12px] text-white/50 leading-[1.6] whitespace-pre-wrap">{value}</p>
      ) : (
        <span className="text-[12px] text-white/50">{value}</span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   UTILITY
   ══════════════════════════════════════════════════════════════════════════ */
function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "#EAB308",
    reviewing: "#3B82F6",
    contacted: "#22C55E",
    declined: "#EF4444",
    invested: "#FF4D00",
    accepted: "#FF4D00",
  };
  return colors[status] || "rgba(255,255,255,0.4)";
}
