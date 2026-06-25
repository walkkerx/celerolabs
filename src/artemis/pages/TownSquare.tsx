"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/artemis/router";
import {
  ArrowUp,
  ArrowDown,
  Heart,
  MessageSquare,
  Share2,
  Search,
  Plus,
  Home,
  TrendingUp,
  Compass,
  Users as UsersIcon,
  X,
  ArrowLeft,
  ChevronDown,
  LogOut,
  ArrowRight,
  Check,
  User,
  MapPin,
  Send,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   TOWN SQUARE — Rebuilt for scale
   - Public auto-seed (no admin gate) → forum is never empty
   - Infinite scroll via IntersectionObserver
   - Live debounced search (title + content)
   - Optimistic vote/heart WITHOUT refetching the whole feed
   - Working comment voting endpoint
   - Modular components (Onboarding, Feed, PostDetail, Network)
   ══════════════════════════════════════════════════════════════════════════ */

/* ── Types ── */
interface ForumUser {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  role: string;
  location: string | null;
  communities: string;
  avatarColor: string;
  avatarUrl?: string;
  company: string | null;
  title: string | null;
  lastActiveAt: string;
  createdAt: string;
}

interface ForumPost {
  id: string;
  authorId: string;
  community: string;
  title: string;
  content: string | null;
  upvotes: number;
  hearts: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  author: ForumUser;
  commentCount: number;
  userVote: "up" | "down" | null;
  userHearted: boolean;
}

interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  content: string;
  likes: number;
  createdAt: string;
  author: { id: string; name: string; avatarColor: string; avatarUrl?: string; role: string };
  userVote?: "up" | "down" | null;
  replies: ForumComment[];
}

type Category = "home" | "popular" | "explore" | "network";

/* ── Constants ── */
const ROLE_COLORS: Record<string, string> = {
  Founder: "#FF4D00",
  Operator: "#111111",
  Investor: "#059669",
  Mentor: "#7c3aed",
  Other: "#6b7280",
};
const ROLES = ["Founder", "Operator", "Investor", "Mentor", "Other"];

const COMMUNITIES = [
  { name: "Energy & Infrastructure", color: "#FF4D00" },
  { name: "Life Sciences", color: "#059669" },
  { name: "Digital Finance", color: "#d97706" },
  { name: "Route Operations", color: "#0284c7" },
  { name: "Capital & Deals", color: "#e11d48" },
  { name: "Founders Corner", color: "#7c3aed" },
];

const PAGE_SIZE = 15;
const STORAGE_KEY = "xcelero_townsquare_user_id";

/* ── Helpers ── */
function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay === 1) return "1d ago";
    if (diffDay < 30) return `${diffDay}d ago`;
    return date.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function parseCommunities(communities: string): string[] {
  if (!communities) return [];
  return communities.split(",").map((c) => c.trim()).filter(Boolean);
}

function getCommunityColor(name: string): string {
  return COMMUNITIES.find((c) => c.name === name)?.color || "#6b7280";
}

/* ══════════════════════════════════════════════════════════════════════════
   ENTRY POINT
   ══════════════════════════════════════════════════════════════════════════ */
export function TownSquare() {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<ForumUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const r = await fetch(`/api/forum/users/${stored}`);
        const data = r.ok ? await r.json() : null;
        if (cancelled) return;
        if (data) {
          setUserId(stored);
          setUser(data);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        /* network */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#111111]/40">
          <div className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase">Loading Town Square</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <OnboardingFlow onComplete={(u) => { setUser(u); setUserId(u.id); }} />;
  }

  return (
    <ForumContent user={user} userId={user.id} onUserUpdate={setUser} onSignOut={() => { localStorage.removeItem(STORAGE_KEY); setUser(null); setUserId(null); }} />
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ONBOARDING — 4-step gate
   ══════════════════════════════════════════════════════════════════════════ */
function OnboardingFlow({ onComplete }: { onComplete: (u: ForumUser) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Founder");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [avatarColor, setAvatarColor] = useState("#FF4D00");
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleCommunity = (c: string) => {
    setSelectedCommunities((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const handleComplete = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/forum/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, bio, role, location,
          communities: selectedCommunities.join(", "),
          avatarColor,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create profile");
      }
      const user = await res.json();
      localStorage.setItem(STORAGE_KEY, user.id);
      onComplete(user);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed = step === 0 || (step === 1 && name.trim() && email.trim()) || step === 2 || (step === 3 && selectedCommunities.length > 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-[3px] flex-1 transition-colors duration-300 ${i <= step ? "bg-[#FF4D00]" : "bg-white/15"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FF4D00] flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-lg">X</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-3">Welcome to Town Square</h1>
                <p className="text-white/50 text-[15px] leading-[1.6] mb-8 max-w-sm mx-auto">
                  The network where xCelero operators, founders, investors, and mentors build the Route together.
                </p>
                <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-2xl font-display font-medium tracking-tight mb-1">Tell us about you</h2>
              <p className="text-white/40 text-[13px] mb-8">This is how you'll appear across Town Square.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/40 block mb-2">Full Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[15px] text-white outline-none focus:border-[#FF4D00] transition-colors" placeholder="Amara Diallo" />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/40 block mb-2">Email *</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[15px] text-white outline-none focus:border-[#FF4D00] transition-colors" placeholder="amara@hansacapital.com" />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/40 block mb-2">Role</label>
                  <div className="flex flex-wrap gap-2">
                    {ROLES.map((r) => (
                      <button key={r} onClick={() => setRole(r)} className={`px-4 py-2 text-[12px] font-medium border transition-colors ${role === r ? "bg-[#FF4D00] border-[#FF4D00] text-white" : "border-white/15 text-white/50 hover:border-white/40"}`}>{r}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/40 block mb-2">Location</label>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[15px] text-white outline-none focus:border-[#FF4D00] transition-colors" placeholder="Lagos, Nigeria" />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/40 block mb-2">Bio</label>
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[14px] text-white outline-none focus:border-[#FF4D00] transition-colors resize-none" placeholder="Building point-of-care diagnostics for East Africa..." />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="avatar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-2xl font-display font-medium tracking-tight mb-1">Pick your color</h2>
              <p className="text-white/40 text-[13px] mb-8">Your avatar color across Town Square.</p>
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-display font-bold text-white" style={{ backgroundColor: avatarColor }}>
                  {name ? getInitials(name) : "?"}
                </div>
                <div className="flex flex-wrap gap-3 justify-center max-w-xs">
                  {ROLE_COLORS && Object.values(ROLE_COLORS).map((color) => (
                    <button key={color} onClick={() => setAvatarColor(color)} className={`w-10 h-10 rounded-full transition-transform ${avatarColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#0A0A0A] scale-110" : "hover:scale-105"}`} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="communities" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-2xl font-display font-medium tracking-tight mb-1">Your communities</h2>
              <p className="text-white/40 text-[13px] mb-8">Pick at least one. You can change these later.</p>
              <div className="space-y-2">
                {COMMUNITIES.map((c) => {
                  const selected = selectedCommunities.includes(c.name);
                  return (
                    <button key={c.name} onClick={() => toggleCommunity(c.name)} className={`w-full flex items-center gap-3 p-4 border transition-colors text-left ${selected ? "border-[#FF4D00] bg-[#FF4D00]/5" : "border-white/10 hover:border-white/25"}`}>
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="flex-1 text-[14px] font-medium text-white">{c.name}</span>
                      {selected && <Check className="w-4 h-4 text-[#FF4D00]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p className="text-red-400 text-[13px] mt-6 text-center">{error}</p>}

        {/* Nav buttons */}
        {step > 0 && (
          <div className="flex items-center justify-between mt-8">
            <button onClick={() => setStep(step - 1)} className="text-[12px] font-mono uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors">← Back</button>
            {step < 3 ? (
              <button onClick={() => canProceed && setStep(step + 1)} disabled={!canProceed} className="px-6 py-3 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FF6A28] transition-colors">Continue</button>
            ) : (
              <button onClick={handleComplete} disabled={!canProceed || submitting} className="px-6 py-3 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FF6A28] transition-colors">
                {submitting ? "Joining..." : "Enter Town Square"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   AVATAR
   ══════════════════════════════════════════════════════════════════════════ */
function Avatar({ name, color, url, size = 32 }: { name: string; color: string; url?: string; size?: number }) {
  if (url) {
    return <img src={url} alt={name} className="rounded-full object-cover" style={{ width: size, height: size }} />;
  }
  return (
    <div className="rounded-full flex items-center justify-center text-white font-display font-bold shrink-0" style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.36 }}>
      {getInitials(name)}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FORUM CONTENT — main authenticated UI
   ══════════════════════════════════════════════════════════════════════════ */
function ForumContent({ user, userId, onUserUpdate, onSignOut }: { user: ForumUser; userId: string; onUserUpdate: (u: ForumUser) => void; onSignOut: () => void }) {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [activeCommunity, setActiveCommunity] = useState<string>("all");
  const [category, setCategory] = useState<Category>("home");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch posts with pagination
  const fetchPosts = useCallback(async (pageNum: number, replace: boolean) => {
    if (replace) setLoading(true);
    else setLoadingMore(true);
    try {
      const params = new URLSearchParams({
        community: activeCommunity,
        category,
        userId,
        page: String(pageNum),
        limit: String(PAGE_SIZE),
      });
      if (debouncedSearch) params.set("search", debouncedSearch);
      const res = await fetch(`/api/forum/posts?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setPosts((prev) => (replace ? data.posts : [...prev, ...data.posts]));
      setHasMore(data.hasMore ?? false);
      setTotal(data.total ?? 0);
      setPage(pageNum);
    } catch {
      /* network */
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeCommunity, category, userId, debouncedSearch]);

  // Auto-seed on mount (public, idempotent).
  // The filter-change effect below handles the initial fetch.
  useEffect(() => {
    fetch("/api/forum/init").catch(() => {});
  }, []);

  // Fetch on mount + whenever filters/search/category change
  useEffect(() => {
    if (category === "network") return;
    fetchPosts(1, true);
  }, [activeCommunity, category, debouncedSearch, fetchPosts]);

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          fetchPosts(page + 1, false);
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, page, fetchPosts]);

  // ── Optimistic vote (NO full refetch) ──
  const handleVote = async (postId: string, direction: "up" | "down") => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    const prevVote = post.userVote;
    // Compute new vote + delta
    let newVote: "up" | "down" | null = direction;
    let delta = 0;
    if (prevVote === direction) { newVote = null; delta = direction === "up" ? -1 : 1; }
    else if (prevVote === "up" && direction === "down") { delta = -2; }
    else if (prevVote === "down" && direction === "up") { delta = 2; }
    else { delta = direction === "up" ? 1 : -1; }
    // Optimistic update
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, upvotes: p.upvotes + delta, userVote: newVote } : p));
    try {
      await fetch(`/api/forum/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "vote", userId, direction }),
      });
    } catch {
      // Rollback on error
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, upvotes: p.upvotes - delta, userVote: prevVote } : p));
    }
  };

  // ── Optimistic heart (NO full refetch) ──
  const handleHeart = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    const wasHearted = post.userHearted;
    const delta = wasHearted ? -1 : 1;
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, hearts: p.hearts + delta, userHearted: !wasHearted } : p));
    try {
      await fetch(`/api/forum/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "heart", userId }),
      });
    } catch {
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, hearts: p.hearts - delta, userHearted: wasHearted } : p));
    }
  };

  // ── Create post (prepend, no refetch) ──
  const handleCreatePost = async (title: string, content: string, community: string) => {
    try {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId: userId, title, content, community }),
      });
      if (!res.ok) return;
      const newPost = await res.json();
      setPosts((prev) => [{ ...newPost, author: user, commentCount: 0, userVote: null, userHearted: false }, ...prev]);
      setTotal((t) => t + 1);
    } catch { /* */ }
  };

  const categories: { id: Category; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "popular", label: "Popular", icon: TrendingUp },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "network", label: "Network", icon: UsersIcon },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#111111]/10 h-14 flex items-center px-4 md:px-6">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebar(true)} className="lg:hidden p-2 -ml-2 text-[#111111]/60 hover:text-[#111111]">
              <Compass className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FF4D00] flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">X</span>
              </div>
              <span className="text-sm font-bold tracking-tight uppercase text-[#111111] hidden sm:inline">Town Square</span>
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full bg-white border border-[#111111]/10 pl-9 pr-4 py-2 text-[13px] outline-none focus:border-[#FF4D00] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#111111]/30 hover:text-[#111111]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2 group">
              <Avatar name={user.name} color={user.avatarColor} url={user.avatarUrl} size={32} />
              <span className="hidden sm:inline text-[13px] font-medium text-[#111111]">{user.name.split(" ")[0]}</span>
            </button>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#111111]/10 shadow-lg z-20 py-1">
                  <div className="px-4 py-3 border-b border-[#111111]/10">
                    <p className="text-[13px] font-semibold text-[#111111] truncate">{user.name}</p>
                    <p className="text-[11px] text-[#111111]/50 truncate">{user.email}</p>
                  </div>
                  <button onClick={onSignOut} className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#111111]/70 hover:bg-[#FF4D00]/5 hover:text-[#FF4D00] transition-colors">
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex">
        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden lg:block w-56 shrink-0 border-r border-[#111111]/10 min-h-[calc(100vh-3.5rem)] p-4">
          <SidebarContent
            category={category}
            setCategory={(c) => { setCategory(c); setSelectedPostId(null); }}
            activeCommunity={activeCommunity}
            setActiveCommunity={setActiveCommunity}
          />
        </aside>

        {/* ── Mobile sidebar ── */}
        <AnimatePresence>
          {mobileSidebar && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 lg:hidden" onClick={() => setMobileSidebar(false)} />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "tween", duration: 0.25 }} className="fixed left-0 top-0 bottom-0 w-64 bg-[#FAFAFA] z-50 lg:hidden p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold uppercase tracking-tight">Menu</span>
                  <button onClick={() => setMobileSidebar(false)} className="p-1 text-[#111111]/40"><X className="w-5 h-5" /></button>
                </div>
                <SidebarContent category={category} setCategory={(c) => { setCategory(c); setSelectedPostId(null); setMobileSidebar(false); }} activeCommunity={activeCommunity} setActiveCommunity={(c) => { setActiveCommunity(c); setMobileSidebar(false); }} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main ── */}
        <main className="flex-1 min-w-0 border-x border-[#111111]/10 min-h-[calc(100vh-3.5rem)]">
          {selectedPostId ? (
            <PostDetail
              postId={selectedPostId}
              userId={userId}
              currentUser={user}
              onBack={() => setSelectedPostId(null)}
            />
          ) : category === "network" ? (
            <NetworkView userId={userId} />
          ) : (
            <>
              {/* Compose */}
              <ComposeBar user={user} onCreate={handleCreatePost} />

              {/* Feed header */}
              <div className="px-4 md:px-6 py-3 border-b border-[#111111]/10 flex items-center justify-between">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#111111]/60">
                  {debouncedSearch ? `Search: "${debouncedSearch}"` : activeCommunity === "all" ? "All Posts" : activeCommunity}
                  <span className="text-[#111111]/30 font-normal ml-2">· {total}</span>
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#111111]/30 hidden sm:inline">{category}</span>
              </div>

              {/* Feed */}
              {loading ? (
                <div className="p-4 space-y-3">
                  {[...Array(5)].map((_, i) => <PostSkeleton key={i} />)}
                </div>
              ) : posts.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-[15px] text-[#111111]/40 font-medium mb-1">No posts found</p>
                  <p className="text-[13px] text-[#111111]/30">{debouncedSearch ? "Try a different search term." : "Be the first to post in this community."}</p>
                </div>
              ) : (
                <div className="divide-y divide-[#111111]/10">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onVote={handleVote}
                      onHeart={handleHeart}
                      onClick={() => setSelectedPostId(post.id)}
                    />
                  ))}
                  {/* Infinite scroll sentinel */}
                  <div ref={sentinelRef} className="py-8 flex items-center justify-center">
                    {loadingMore ? (
                      <div className="flex items-center gap-2 text-[#111111]/30">
                        <div className="w-3 h-3 border-2 border-[#FF4D00] border-t-transparent rounded-full animate-spin" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.15em]">Loading more</span>
                      </div>
                    ) : hasMore ? (
                      <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#111111]/20">Scroll for more</span>
                    ) : (
                      <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#111111]/20">You're all caught up</span>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* ── Right rail (trending) ── */}
        <aside className="hidden xl:block w-72 shrink-0 p-4">
          <TrendingRail posts={posts} onSelect={setSelectedPostId} />
        </aside>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SIDEBAR CONTENT
   ══════════════════════════════════════════════════════════════════════════ */
function SidebarContent({ category, setCategory, activeCommunity, setActiveCommunity }: { category: Category; setCategory: (c: Category) => void; activeCommunity: string; setActiveCommunity: (c: string) => void; }) {
  const categories: { id: Category; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "popular", label: "Popular", icon: TrendingUp },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "network", label: "Network", icon: UsersIcon },
  ];
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#111111]/30 mb-2 px-2">Feed</p>
        <div className="space-y-0.5">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.id} onClick={() => setCategory(c.id)} className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium transition-colors ${category === c.id ? "bg-[#FF4D00]/10 text-[#FF4D00]" : "text-[#111111]/60 hover:bg-[#111111]/5 hover:text-[#111111]"}`}>
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#111111]/30 mb-2 px-2">Communities</p>
        <div className="space-y-0.5">
          <button onClick={() => setActiveCommunity("all")} className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium transition-colors ${activeCommunity === "all" ? "bg-[#111111] text-white" : "text-[#111111]/60 hover:bg-[#111111]/5 hover:text-[#111111]"}`}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D00]" />
            All Communities
          </button>
          {COMMUNITIES.map((c) => (
            <button key={c.name} onClick={() => setActiveCommunity(c.name)} className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium transition-colors ${activeCommunity === c.name ? "bg-[#111111] text-white" : "text-[#111111]/60 hover:bg-[#111111]/5 hover:text-[#111111]"}`}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="truncate">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   POST SKELETON
   ══════════════════════════════════════════════════════════════════════════ */
function PostSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-[#111111]/10" />
        <div className="h-3 w-28 bg-[#111111]/10 rounded" />
        <div className="h-3 w-16 bg-[#111111]/10 rounded" />
      </div>
      <div className="h-4 w-3/4 bg-[#111111]/10 rounded mb-2" />
      <div className="h-3 w-full bg-[#111111]/10 rounded mb-1" />
      <div className="h-3 w-2/3 bg-[#111111]/10 rounded" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   COMPOSE BAR
   ══════════════════════════════════════════════════════════════════════════ */
function ComposeBar({ user, onCreate }: { user: ForumUser; onCreate: (title: string, content: string, community: string) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [community, setCommunity] = useState(COMMUNITIES[0].name);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    await onCreate(title, content, community);
    setTitle(""); setContent(""); setCommunity(COMMUNITIES[0].name);
    setSubmitting(false);
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-full flex items-center gap-3 p-4 border-b border-[#111111]/10 hover:bg-[#111111]/[0.02] transition-colors text-left">
        <Avatar name={user.name} color={user.avatarColor} url={user.avatarUrl} size={32} />
        <span className="flex-1 text-[14px] text-[#111111]/40">Share something with Town Square...</span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em]">
          <Plus className="w-3.5 h-3.5" /> Post
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-16" onClick={() => setOpen(false)}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg bg-white border border-[#111111]/10 shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-[#111111]/10">
                <h3 className="text-[15px] font-display font-medium">Create a post</h3>
                <button onClick={() => setOpen(false)} className="p-1 text-[#111111]/40 hover:text-[#111111]"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-[#111111]/10">
                  <Avatar name={user.name} color={user.avatarColor} url={user.avatarUrl} size={28} />
                  <select value={community} onChange={(e) => setCommunity(e.target.value)} className="text-[12px] font-medium bg-transparent border border-[#111111]/15 px-3 py-1.5 outline-none focus:border-[#FF4D00]">
                    {COMMUNITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full text-[16px] font-display font-medium outline-none placeholder:text-[#111111]/30" />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} placeholder="What's on your mind? (Markdown supported)" className="w-full text-[14px] outline-none resize-none placeholder:text-[#111111]/30" />
              </div>
              <div className="flex items-center justify-end gap-2 p-4 border-t border-[#111111]/10">
                <button onClick={() => setOpen(false)} className="px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#111111]/50 hover:text-[#111111]">Cancel</button>
                <button onClick={submit} disabled={!title.trim() || submitting} className="px-5 py-2 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-[0.1em] disabled:opacity-30 hover:bg-[#FF6A28] transition-colors">{submitting ? "Posting..." : "Post"}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   POST CARD
   ══════════════════════════════════════════════════════════════════════════ */
function PostCard({ post, onVote, onHeart, onClick }: { post: ForumPost; onVote: (id: string, dir: "up" | "down") => void; onHeart: (id: string) => void; onClick: () => void }) {
  const communityColor = getCommunityColor(post.community);
  return (
    <article className="p-4 hover:bg-[#111111]/[0.02] transition-colors cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-2 mb-2">
        <Avatar name={post.author.name} color={post.author.avatarColor} url={post.author.avatarUrl} size={24} />
        <span className="text-[12px] font-medium text-[#111111]">{post.author.name}</span>
        <span className="text-[11px] text-[#111111]/40">· {formatRelativeTime(post.createdAt)}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider" style={{ color: communityColor }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: communityColor }} />
          {post.community}
        </span>
      </div>

      <h3 className="text-[16px] md:text-[17px] font-display font-medium tracking-tight text-[#111111] mb-1.5 leading-snug">{post.title}</h3>
      {post.content && (
        <p className="text-[13px] text-[#111111]/60 leading-[1.55] line-clamp-3 mb-3">{post.content}</p>
      )}

      <div className="flex items-center gap-1 mt-2" onClick={(e) => e.stopPropagation()}>
        {/* Vote */}
        <div className="flex items-center bg-[#111111]/5 rounded-full">
          <button onClick={() => onVote(post.id, "up")} className={`p-1.5 rounded-full transition-colors ${post.userVote === "up" ? "text-[#FF4D00]" : "text-[#111111]/40 hover:text-[#111111]"}`}>
            <ArrowUp className="w-4 h-4" strokeWidth={2} fill={post.userVote === "up" ? "currentColor" : "none"} />
          </button>
          <span className="text-[12px] font-mono font-bold tabular-nums min-w-[20px] text-center text-[#111111]/70">{post.upvotes}</span>
          <button onClick={() => onVote(post.id, "down")} className={`p-1.5 rounded-full transition-colors ${post.userVote === "down" ? "text-[#0284c7]" : "text-[#111111]/40 hover:text-[#111111]"}`}>
            <ArrowDown className="w-4 h-4" strokeWidth={2} fill={post.userVote === "down" ? "currentColor" : "none"} />
          </button>
        </div>
        {/* Comments */}
        <button onClick={onClick} className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#111111]/50 hover:text-[#111111] hover:bg-[#111111]/5 rounded-full transition-colors">
          <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
          {post.commentCount}
        </button>
        {/* Heart */}
        <button onClick={() => onHeart(post.id)} className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-full transition-colors ${post.userHearted ? "text-[#FF4D00] bg-[#FF4D00]/5" : "text-[#111111]/50 hover:text-[#111111] hover:bg-[#111111]/5"}`}>
          <Heart className="w-4 h-4" strokeWidth={1.75} fill={post.userHearted ? "currentColor" : "none"} />
          {post.hearts}
        </button>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   POST DETAIL — with threaded comments + comment voting
   ══════════════════════════════════════════════════════════════════════════ */
function PostDetail({ postId, userId, currentUser, onBack }: { postId: string; userId: string; currentUser: ForumUser; onBack: () => void }) {
  const [post, setPost] = useState<(ForumPost & { comments: ForumComment[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/forum/posts/${postId}?userId=${userId}`);
        if (cancelled) return;
        if (res.ok) setPost(await res.json());
      } catch { /* */ }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [postId, userId]);

  // Refetch post (used after comment/reply actions)
  const refreshPost = useCallback(async () => {
    try {
      const res = await fetch(`/api/forum/posts/${postId}?userId=${userId}`);
      if (res.ok) setPost(await res.json());
    } catch { /* */ }
  }, [postId, userId]);

  // Vote on post (optimistic)
  const handleVote = (direction: "up" | "down") => {
    if (!post) return;
    const prevVote = post.userVote;
    let newVote: "up" | "down" | null = direction;
    let delta = 0;
    if (prevVote === direction) { newVote = null; delta = direction === "up" ? -1 : 1; }
    else if (prevVote === "up" && direction === "down") delta = -2;
    else if (prevVote === "down" && direction === "up") delta = 2;
    else delta = direction === "up" ? 1 : -1;
    setPost((p) => p ? { ...p, upvotes: p.upvotes + delta, userVote: newVote } : p);
    fetch(`/api/forum/posts/${postId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "vote", userId, direction }) }).catch(() => setPost((p) => p ? { ...p, upvotes: p.upvotes - delta, userVote: prevVote } : p));
  };

  const handleHeart = () => {
    if (!post) return;
    const wasHearted = post.userHearted;
    setPost((p) => p ? { ...p, hearts: p.hearts + (wasHearted ? -1 : 1), userHearted: !wasHearted } : p);
    fetch(`/api/forum/posts/${postId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "heart", userId }) }).catch(() => setPost((p) => p ? { ...p, hearts: p.hearts + (wasHearted ? 1 : -1), userHearted: wasHearted } : p));
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/forum/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId: userId, content: commentText }),
      });
      if (res.ok) {
        setCommentText("");
        refreshPost(); // refresh comments
      }
    } catch { /* */ }
    setSubmitting(false);
  };

  // Vote on comment (calls new PATCH endpoint, optimistic)
  const handleCommentVote = async (commentId: string, direction: "up" | "down") => {
    if (!post) return;
    const updateComments = (comments: ForumComment[]): ForumComment[] =>
      comments.map((c) => {
        if (c.id === commentId) {
          const prev = c.userVote ?? null;
          let newVote: "up" | "down" | null = direction;
          let delta = 0;
          if (prev === direction) { newVote = null; delta = direction === "up" ? -1 : 1; }
          else if (prev === "up" && direction === "down") delta = -2;
          else if (prev === "down" && direction === "up") delta = 2;
          else delta = direction === "up" ? 1 : -1;
          return { ...c, likes: c.likes + delta, userVote: newVote };
        }
        return { ...c, replies: updateComments(c.replies) };
      });
    setPost((p) => p ? { ...p, comments: updateComments(p.comments) } : p);
    try {
      await fetch(`/api/forum/posts/${postId}/comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "vote", userId, commentId, direction }),
      });
    } catch { /* rollback optional */ }
  };

  const handleReply = async (parentId: string, content: string) => {
    try {
      const res = await fetch(`/api/forum/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId: userId, content, parentId }),
      });
      if (res.ok) refreshPost();
    } catch { /* */ }
  };

  if (loading) return <div className="p-8 text-center text-[13px] text-[#111111]/40">Loading...</div>;
  if (!post) return <div className="p-8 text-center text-[13px] text-[#111111]/40">Post not found.</div>;

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 px-4 py-3 border-b border-[#111111]/10 text-[12px] font-medium text-[#111111]/60 hover:text-[#111111] hover:bg-[#111111]/5 transition-colors w-full">
        <ArrowLeft className="w-4 h-4" /> Back to feed
      </button>

      <article className="p-4 md:p-6 border-b border-[#111111]/10">
        <div className="flex items-center gap-2 mb-3">
          <Avatar name={post.author.name} color={post.author.avatarColor} url={post.author.avatarUrl} size={28} />
          <div>
            <p className="text-[13px] font-medium text-[#111111] leading-tight">{post.author.name}</p>
            <p className="text-[11px] text-[#111111]/40">{post.author.title || post.author.role} · {formatRelativeTime(post.createdAt)}</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono uppercase tracking-wider" style={{ color: getCommunityColor(post.community) }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCommunityColor(post.community) }} />
            {post.community}
          </span>
        </div>

        <h1 className="text-[22px] md:text-[26px] font-display font-medium tracking-tight text-[#111111] mb-3 leading-tight">{post.title}</h1>
        {post.content && (
          <div className="prose prose-sm max-w-none text-[14px] text-[#111111]/80 leading-[1.65] mb-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        )}
        {post.imageUrl && <img src={post.imageUrl} alt="" className="w-full max-h-96 object-cover mb-4" />}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#111111]/5 rounded-full">
            <button onClick={() => handleVote("up")} className={`p-2 rounded-full transition-colors ${post.userVote === "up" ? "text-[#FF4D00]" : "text-[#111111]/40 hover:text-[#111111]"}`}>
              <ArrowUp className="w-4 h-4" strokeWidth={2} fill={post.userVote === "up" ? "currentColor" : "none"} />
            </button>
            <span className="text-[13px] font-mono font-bold tabular-nums min-w-[24px] text-center text-[#111111]/70">{post.upvotes}</span>
            <button onClick={() => handleVote("down")} className={`p-2 rounded-full transition-colors ${post.userVote === "down" ? "text-[#0284c7]" : "text-[#111111]/40 hover:text-[#111111]"}`}>
              <ArrowDown className="w-4 h-4" strokeWidth={2} fill={post.userVote === "down" ? "currentColor" : "none"} />
            </button>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-[#111111]/50">
            <MessageSquare className="w-4 h-4" strokeWidth={1.75} /> {post.commentCount} comments
          </span>
          <button onClick={handleHeart} className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium rounded-full transition-colors ${post.userHearted ? "text-[#FF4D00] bg-[#FF4D00]/5" : "text-[#111111]/50 hover:bg-[#111111]/5"}`}>
            <Heart className="w-4 h-4" strokeWidth={1.75} fill={post.userHearted ? "currentColor" : "none"} /> {post.hearts}
          </button>
        </div>
      </article>

      {/* Comment composer */}
      <div className="p-4 border-b border-[#111111]/10 flex gap-3">
        <Avatar name={currentUser.name} color={currentUser.avatarColor} url={currentUser.avatarUrl} size={32} />
        <div className="flex-1">
          <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} rows={3} placeholder="Write a comment..." className="w-full bg-[#111111]/[0.03] border border-[#111111]/10 p-3 text-[14px] outline-none focus:border-[#FF4D00] resize-none transition-colors" />
          <div className="flex justify-end mt-2">
            <button onClick={handleComment} disabled={!commentText.trim() || submitting} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] disabled:opacity-30 hover:bg-[#FF6A28] transition-colors">
              <Send className="w-3.5 h-3.5" /> {submitting ? "Posting..." : "Comment"}
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="p-4">
        <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#111111]/40 mb-4">{post.comments.length} top-level comments</p>
        <div className="space-y-4">
          {post.comments.map((c) => (
            <CommentNode key={c.id} comment={c} postId={postId} onVote={handleCommentVote} onReply={handleReply} />
          ))}
          {post.comments.length === 0 && <p className="text-[13px] text-[#111111]/30 py-4">No comments yet. Start the conversation.</p>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   COMMENT NODE — recursive, with voting + replies
   ══════════════════════════════════════════════════════════════════════════ */
function CommentNode({ comment, postId, onVote, onReply, depth = 0 }: { comment: ForumComment; postId: string; onVote: (commentId: string, dir: "up" | "down") => void; onReply: (parentId: string, content: string) => Promise<void>; depth?: number }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

  const submitReply = async () => {
    if (!replyText.trim()) return;
    setReplying(true);
    await onReply(comment.id, replyText);
    setReplyText("");
    setShowReply(false);
    setReplying(false);
  };

  return (
    <div className="flex gap-3" style={{ marginLeft: depth * 24 }}>
      <Avatar name={comment.author.name} color={comment.author.avatarColor} url={comment.author.avatarUrl} size={28} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-medium text-[#111111]">{comment.author.name}</span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5" style={{ color: ROLE_COLORS[comment.author.role] || "#6b7280" }}>{comment.author.role}</span>
          <span className="text-[11px] text-[#111111]/40">· {formatRelativeTime(comment.createdAt)}</span>
        </div>
        <div className="text-[14px] text-[#111111]/80 leading-[1.6] prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.content}</ReactMarkdown>
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <button onClick={() => onVote(comment.id, "up")} className={`p-1 rounded-full transition-colors ${comment.userVote === "up" ? "text-[#FF4D00]" : "text-[#111111]/30 hover:text-[#111111]"}`}>
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={2} fill={comment.userVote === "up" ? "currentColor" : "none"} />
          </button>
          <span className="text-[11px] font-mono font-bold tabular-nums min-w-[16px] text-center text-[#111111]/60">{comment.likes}</span>
          <button onClick={() => onVote(comment.id, "down")} className={`p-1 rounded-full transition-colors ${comment.userVote === "down" ? "text-[#0284c7]" : "text-[#111111]/30 hover:text-[#111111]"}`}>
            <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} fill={comment.userVote === "down" ? "currentColor" : "none"} />
          </button>
          <button onClick={() => setShowReply(!showReply)} className="ml-2 text-[11px] font-medium text-[#111111]/40 hover:text-[#111111] transition-colors">Reply</button>
        </div>

        {/* Reply box */}
        {showReply && (
          <div className="mt-2 flex gap-2">
            <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="flex-1 bg-[#111111]/[0.03] border border-[#111111]/10 px-3 py-2 text-[13px] outline-none focus:border-[#FF4D00] transition-colors" onKeyDown={(e) => { if (e.key === "Enter") submitReply(); }} />
            <button onClick={submitReply} disabled={!replyText.trim() || replying} className="px-3 py-2 bg-[#111111] text-white text-[11px] font-bold uppercase disabled:opacity-30">Reply</button>
          </div>
        )}

        {/* Nested replies */}
        {comment.replies.length > 0 && (
          <div className="mt-3 space-y-4">
            {comment.replies.map((r) => (
              <CommentNode key={r.id} comment={r} postId={postId} onVote={onVote} onReply={onReply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NETWORK VIEW — member directory
   ══════════════════════════════════════════════════════════════════════════ */
function NetworkView({ userId }: { userId: string }) {
  const [members, setMembers] = useState<ForumUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`/api/forum/users`)
      .then((r) => r.json())
      .then((data) => setMembers(data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search) return members;
    const q = search.toLowerCase();
    return members.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.company || "").toLowerCase().includes(q) ||
      (m.location || "").toLowerCase().includes(q)
    );
  }, [members, search]);

  return (
    <div>
      <div className="p-4 border-b border-[#111111]/10">
        <h2 className="text-[16px] font-display font-medium mb-3">Network</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search members..." className="w-full bg-white border border-[#111111]/10 pl-9 pr-4 py-2 text-[13px] outline-none focus:border-[#FF4D00] transition-colors" />
        </div>
      </div>
      {loading ? (
        <div className="p-4 grid sm:grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-24 bg-[#111111]/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="p-4 grid sm:grid-cols-2 gap-3">
          {filtered.map((m) => (
            <div key={m.id} className="bg-white border border-[#111111]/10 p-4 flex gap-3">
              <Avatar name={m.name} color={m.avatarColor} url={m.avatarUrl} size={40} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-[#111111] truncate">{m.name}</p>
                  {m.id === userId && <span className="text-[9px] font-mono uppercase text-[#FF4D00]">You</span>}
                </div>
                <p className="text-[11px] text-[#111111]/50 truncate">{m.title || m.role}{m.company ? ` · ${m.company}` : ""}</p>
                {m.location && <p className="text-[10px] text-[#111111]/40 flex items-center gap-1 mt-1"><MapPin className="w-2.5 h-2.5" />{m.location}</p>}
                {m.bio && <p className="text-[11px] text-[#111111]/40 mt-1.5 line-clamp-2">{m.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TRENDING RAIL
   ══════════════════════════════════════════════════════════════════════════ */
function TrendingRail({ posts, onSelect }: { posts: ForumPost[]; onSelect: (id: string) => void }) {
  const trending = useMemo(() => [...posts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 5), [posts]);
  if (trending.length === 0) return null;
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#111111]/30 mb-3">Trending</p>
      <div className="space-y-3">
        {trending.map((p, i) => (
          <button key={p.id} onClick={() => onSelect(p.id)} className="block w-full text-left group">
            <div className="flex gap-3">
              <span className="text-[20px] font-display font-medium text-[#111111]/15 leading-none">{i + 1}</span>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-[#111111]/80 group-hover:text-[#FF4D00] transition-colors line-clamp-2 leading-snug">{p.title}</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/30 mt-1">{p.upvotes} upvotes · {p.commentCount} comments</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
