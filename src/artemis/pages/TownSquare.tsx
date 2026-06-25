"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/artemis/router";
import {
  MessageSquare,
  Share2,
  Search,
  MoreHorizontal,
  Plus,
  Home,
  TrendingUp,
  Newspaper,
  Compass,
  ArrowUp,
  ArrowDown,
  Bell,
  PlusCircle,
  X,
  ArrowLeft,
  Heart,
  Menu,
  LogOut,
  ArrowRight,
  Check,
  User,
  MapPin,
  Mail,
  Users,
  Briefcase,
  ExternalLink,
  Loader2,
  Camera,
  Pencil,
  Save,
} from "lucide-react";

/* ── Types (matching API responses) ── */
interface ForumUser {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  role: string;
  location: string | null;
  communities: string; // comma-separated from DB
  avatarColor: string;
  avatarUrl?: string;
  company: string | null;
  title: string | null;
  lastActiveAt: string;
  createdAt: string;
  updatedAt: string;
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
  updatedAt: string;
  author: { id: string; name: string; avatarColor: string; avatarUrl?: string; role: string };
  replies: ForumComment[];
}

/* ── Role Colors ── */
const ROLE_COLORS: Record<string, string> = {
  Founder: "#FF4D00",
  Operator: "#111111",
  Investor: "#059669",
  Mentor: "#7c3aed",
  Other: "#6b7280",
};

const ROLES = ["Founder", "Operator", "Investor", "Mentor", "Other"];

/* ── xCelero Communities ── */
const COMMUNITIES = [
  { name: "Energy & Infrastructure", color: "bg-[#FF4D00]" },
  { name: "Life Sciences", color: "bg-emerald-600" },
  { name: "Digital Finance", color: "bg-amber-600" },
  { name: "Route Operations", color: "bg-sky-600" },
  { name: "Capital & Deals", color: "bg-rose-600" },
  { name: "Founders Corner", color: "bg-violet-600" },
];

/* ── Relative Time Formatter ── */
function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin} min. ago`;
    if (diffHr < 24) return `${diffHr} hr. ago`;
    if (diffDay === 1) return "1 day ago";
    if (diffDay < 30) return `${diffDay} days ago`;
    return date.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

/* ── Recently Active Helper ── */
function isRecentlyActive(dateStr: string): boolean {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHr = diffMs / (1000 * 60 * 60);
    return diffHr <= 12;
  } catch {
    return false;
  }
}

/* ── Helper: parse communities string ── */
function parseCommunities(communities: string): string[] {
  if (!communities) return [];
  return communities.split(",").map((c) => c.trim()).filter(Boolean);
}

/* ── Helper: get initials from name ── */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

/* ── Skeleton Components ── */
function PostSkeleton() {
  return (
    <div className="bg-white border border-[#111111]/10 p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-[#111111]/10" />
        <div className="h-3 w-32 bg-[#111111]/10 rounded" />
        <div className="h-3 w-20 bg-[#111111]/10 rounded" />
      </div>
      <div className="h-4 w-3/4 bg-[#111111]/10 rounded mb-2" />
      <div className="h-3 w-full bg-[#111111]/10 rounded mb-1" />
      <div className="h-3 w-2/3 bg-[#111111]/10 rounded" />
      <div className="flex items-center gap-2 mt-4">
        <div className="h-8 w-20 bg-[#111111]/10 rounded" />
        <div className="h-8 w-16 bg-[#111111]/10 rounded" />
        <div className="h-8 w-16 bg-[#111111]/10 rounded" />
      </div>
    </div>
  );
}

function MemberCardSkeleton() {
  return (
    <div className="bg-white border border-[#111111]/10 overflow-hidden animate-pulse">
      <div className="h-10 bg-[#111111]/5" />
      <div className="pt-7 px-4 pb-4">
        <div className="h-3 w-24 bg-[#111111]/10 rounded mb-2" />
        <div className="h-2.5 w-32 bg-[#111111]/10 rounded mb-2" />
        <div className="h-2.5 w-full bg-[#111111]/10 rounded" />
      </div>
    </div>
  );
}

/* ── Comment Node ── */
function CommentNode({
  comment,
  postId,
  replyingToCommentId,
  setReplyingToCommentId,
  replyContent,
  setReplyContent,
  handleAddReply,
}: {
  comment: ForumComment;
  postId: string;
  replyingToCommentId: string | null;
  setReplyingToCommentId: (id: string | null) => void;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleAddReply: (postId: string, commentId: string) => void;
}) {
  return (
    <div className="group mt-1 pt-2">
      <div className="flex">
        <div className="flex flex-col items-center mr-2 relative group/line cursor-pointer shrink-0">
          <div
            className="w-[28px] h-[28px] rounded-full overflow-hidden flex items-center justify-center font-bold text-white text-[10px] z-10"
            style={{ backgroundColor: comment.author.avatarColor }}
          >
            {comment.author.avatarUrl ? (
              <img src={comment.author.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              comment.author.name[0]
            )}
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="w-[2px] bg-[#111111]/10 group-hover/line:bg-[#111111]/20 transition-colors absolute top-8 bottom-[-8px] sm:bottom-[-16px]" />
          )}
        </div>

        <div className="flex-1 min-w-0 pb-1 sm:pb-3">
          <div className="flex items-center gap-2 text-[12px] mb-1">
            <span className="font-bold text-[#111111]">{comment.author.name}</span>
            <span className="text-[#111111]/40">• {formatRelativeTime(comment.createdAt)}</span>
          </div>
          <div className="text-[14px] text-[#111111]/70 leading-relaxed prose prose-slate max-w-none mb-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.content}</ReactMarkdown>
          </div>

          <div className="flex flex-wrap items-center gap-0.5 sm:gap-1.5 mt-1 -ml-2">
            <div className="flex items-center">
              <button className="flex items-center justify-center p-1.5 hover:bg-[#111111]/5 rounded text-[#111111]/40 hover:text-[#FF4D00] transition-colors">
                <ArrowUp className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-[#111111]/40 px-0.5">
                {comment.likes || "Vote"}
              </span>
              <button className="flex items-center justify-center p-1.5 hover:bg-[#111111]/5 rounded text-[#111111]/40 hover:text-[#111111]/60 transition-colors">
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() =>
                setReplyingToCommentId(replyingToCommentId === comment.id ? null : comment.id)
              }
              className="flex items-center gap-1.5 px-2 py-1.5 text-[#111111]/40 hover:bg-[#111111]/5 rounded-full transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs font-bold leading-none">Reply</span>
            </button>
            <button className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 text-[#111111]/40 hover:bg-[#111111]/5 rounded transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-xs font-bold leading-none">Share</span>
            </button>
          </div>

          {replyingToCommentId === comment.id && (
            <div className="mt-3 flex gap-2 items-start mb-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="What are your thoughts?"
                rows={3}
                className="flex-1 bg-[#FAFAFA] border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-3 py-2 text-sm text-[#111111] outline-none transition resize-y"
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAddReply(postId, comment.id)}
                  disabled={!replyContent.trim()}
                  className="px-4 py-1.5 bg-[#FF4D00] text-white font-bold rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 transition"
                >
                  Reply
                </button>
                <button
                  onClick={() => setReplyingToCommentId(null)}
                  className="px-4 py-1.5 bg-transparent text-[#111111]/50 hover:bg-[#111111]/5 font-bold rounded text-xs transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-0">
              {comment.replies.map((reply) => (
                <CommentNode
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  replyingToCommentId={replyingToCommentId}
                  setReplyingToCommentId={setReplyingToCommentId}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  handleAddReply={handleAddReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ONBOARDING FLOW
   ══════════════════════════════════════════════════════════════════════════ */
function OnboardingFlow({ onComplete }: { onComplete: (user: ForumUser) => void }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const goNext = () => { setDirection(1); setStep((s) => s + 1); };
  const goBack = () => { setDirection(-1); setStep((s) => s - 1); };

  const toggleCommunity = (name: string) => {
    setSelectedCommunities((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const avatarColor = ROLE_COLORS[role] || "#6b7280";
      let finalAvatarUrl = avatarUrl;

      // Upload avatar file if selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalAvatarUrl = uploadData.url;
        }
      }

      // Create user via API
      const res = await fetch("/api/forum/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName,
          email,
          bio: bio || undefined,
          role,
          location: location || undefined,
          communities: selectedCommunities,
          avatarColor,
          avatarUrl: finalAvatarUrl || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Failed to create user:", err);
        setIsSubmitting(false);
        return;
      }

      const user: ForumUser = await res.json();

      // Store user ID in localStorage
      localStorage.setItem("xcelero_townsquare_user_id", user.id);

      // Seed the database with sample data
      await fetch("/api/forum/seed", { method: "POST" }).catch(() => {});

      onComplete(user);
    } catch (err) {
      console.error("Onboarding error:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] font-sans">
      {/* Header bar */}
      <header className="h-[56px] bg-white border-b border-[#111111]/10 px-4 md:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-display font-medium tracking-tight text-[#111111]">
            Town<span className="text-[#111111]/30 font-normal"> Square</span>
          </span>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-[#FF4D00]" : i < step ? "w-4 bg-[#FF4D00]/40" : "w-4 bg-[#111111]/10"
              }`}
            />
          ))}
        </div>
        <div className="w-[100px]" />
      </header>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[520px]">
            {step === 0 && (
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#FF4D00] flex items-center justify-center mb-8">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-[#111111] mb-4">
                  Welcome to Town Square
                </h1>
                <p className="text-[15px] text-[#111111]/50 leading-relaxed max-w-[400px] mb-10">
                  The XCitizen forum. Real-time discussions on deals, infrastructure, regulations,
                  hiring, and hard-won lessons from the Route.
                </p>
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 px-8 py-3 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00]/90 transition-colors"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col">
                <h2 className="text-2xl font-display font-medium tracking-tight text-[#111111] mb-2">
                  Your Details
                </h2>
                <p className="text-[14px] text-[#111111]/40 mb-8">
                  Tell the community who you are.
                </p>

                <div className="space-y-5">
                  {/* Display Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                      <User className="w-3.5 h-3.5" />
                      Display Name *
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111] placeholder-[#111111]/30 outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                      <Mail className="w-3.5 h-3.5" />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111] placeholder-[#111111]/30 outline-none transition"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-3 block">
                      Role *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ROLES.map((r) => (
                        <button
                          key={r}
                          onClick={() => setRole(r)}
                          className={`flex items-center gap-2 px-4 py-2.5 border text-[12px] font-bold uppercase tracking-[0.05em] transition-all ${
                            role === r
                              ? "border-[#FF4D00] bg-[#FF4D00]/5 text-[#FF4D00]"
                              : "border-[#111111]/10 text-[#111111]/40 hover:border-[#111111]/20 hover:text-[#111111]/60"
                          }`}
                        >
                          {role === r && <Check className="w-3.5 h-3.5" />}
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-2 block">
                      Bio (optional)
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="A short bio about yourself"
                      rows={3}
                      className="w-full bg-white border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111] placeholder-[#111111]/30 outline-none transition resize-y"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      Location (optional)
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Lagos, Nairobi, Accra..."
                      className="w-full bg-white border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111] placeholder-[#111111]/30 outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={goBack}
                    className="px-5 py-2 text-sm font-bold text-[#111111]/50 hover:bg-[#111111]/5 rounded transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!displayName.trim() || !email.trim() || !role}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 transition-colors"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-display font-medium tracking-tight text-[#111111] mb-2">
                  Profile Picture
                </h2>
                <p className="text-[14px] text-[#111111]/40 mb-8">
                  Add a photo so others can recognize you.
                </p>

                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload-onboarding"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAvatarFile(file);
                      setAvatarUrl(URL.createObjectURL(file));
                    }
                  }}
                />

                <button
                  onClick={() => document.getElementById("avatar-upload-onboarding")?.click()}
                  className="relative group mb-6"
                >
                  <div
                    className="w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center border-2 border-dashed border-[#111111]/20 group-hover:border-[#FF4D00]/40 transition-colors"
                    style={avatarUrl ? {} : { backgroundColor: ROLE_COLORS[role] || "#6b7280" }}
                  >
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-10 h-10 text-white/70" />
                    )}
                  </div>
                  {avatarUrl && (
                    <div className="absolute inset-0 rounded-full bg-[#111111]/0 group-hover:bg-[#111111]/30 flex items-center justify-center transition-colors">
                      <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </button>

                {avatarUrl && (
                  <button
                    onClick={() => {
                      setAvatarUrl("");
                      setAvatarFile(null);
                    }}
                    className="text-[11px] font-mono font-bold tracking-[0.1em] uppercase text-[#111111]/30 hover:text-[#FF4D00] transition-colors mb-4"
                  >
                    Remove photo
                  </button>
                )}

                <div className="flex items-center justify-between w-full mt-4">
                  <button
                    onClick={goBack}
                    className="px-5 py-2 text-sm font-bold text-[#111111]/50 hover:bg-[#111111]/5 rounded transition"
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={goNext}
                      className="px-5 py-2 text-sm font-bold text-[#111111]/30 hover:text-[#111111]/50 transition"
                    >
                      Skip
                    </button>
                    <button
                      onClick={goNext}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00]/90 transition-colors"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col">
                <h2 className="text-2xl font-display font-medium tracking-tight text-[#111111] mb-2">
                  Choose Your Communities
                </h2>
                <p className="text-[14px] text-[#111111]/40 mb-8">
                  Select at least one community to join. You can always change these later.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {COMMUNITIES.map((c) => {
                    const isSelected = selectedCommunities.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        onClick={() => toggleCommunity(c.name)}
                        className={`flex items-center gap-3 p-4 border text-left transition-all ${
                          isSelected
                            ? "border-[#FF4D00] bg-[#FF4D00]/5"
                            : "border-[#111111]/10 hover:border-[#111111]/20"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${c.color} relative`}
                        >
                          <span className="text-[10px] font-bold text-white uppercase">
                            {c.name[0]}
                          </span>
                          {isSelected && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4D00] rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-[13px] font-medium block truncate ${
                              isSelected ? "text-[#111111]" : "text-[#111111]/60"
                            }`}
                          >
                            {c.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={goBack}
                    className="px-5 py-2 text-sm font-bold text-[#111111]/50 hover:bg-[#111111]/5 rounded transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={selectedCommunities.length === 0 || isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 transition-colors"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    {isSubmitting ? "Creating..." : "Enter Town Square"}
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   EDIT PROFILE MODAL
   ══════════════════════════════════════════════════════════════════════════ */
function EditProfileModal({
  user,
  onClose,
  onSave,
}: {
  user: ForumUser;
  onClose: () => void;
  onSave: (updatedUser: ForumUser) => void;
}) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [role, setRole] = useState(user.role);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>(
    parseCommunities(user.communities)
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const toggleCommunity = (c: string) => {
    setSelectedCommunities((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let finalAvatarUrl = avatarUrl;

      // Upload new avatar if a file was selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalAvatarUrl = uploadData.url;
        }
      }

      const res = await fetch("/api/forum/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name,
          bio: bio || null,
          role,
          location: location || null,
          avatarUrl: finalAvatarUrl || null,
          communities: selectedCommunities,
        }),
      });

      if (res.ok) {
        const updatedUser: ForumUser = await res.json();
        onSave(updatedUser);
        onClose();
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111]/50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-[520px] max-h-[90vh] overflow-y-auto mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#111111]/10">
          <h2 className="text-lg font-display font-medium tracking-tight text-[#111111]">
            Edit Profile
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-[#111111]/5 rounded transition-colors">
            <X className="w-5 h-5 text-[#111111]/40" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              id="avatar-upload-edit"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatarFile(file);
                  setAvatarUrl(URL.createObjectURL(file));
                }
              }}
            />
            <button
              onClick={() => document.getElementById("avatar-upload-edit")?.click()}
              className="relative group mb-3"
            >
              <div
                className="w-[80px] h-[80px] rounded-full overflow-hidden flex items-center justify-center border-2 border-dashed border-[#111111]/20 group-hover:border-[#FF4D00]/40 transition-colors"
                style={avatarUrl ? {} : { backgroundColor: user.avatarColor }}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-7 h-7 text-white/70" />
                )}
              </div>
              {avatarUrl && (
                <div className="absolute inset-0 rounded-full bg-[#111111]/0 group-hover:bg-[#111111]/30 flex items-center justify-center transition-colors">
                  <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </button>
            <span className="text-[11px] text-[#111111]/30">Click to change photo</span>
          </div>

          {/* Name */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
              <User className="w-3.5 h-3.5" />
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111] outline-none transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-3 block">
              Role
            </label>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-[12px] font-bold uppercase tracking-[0.05em] transition-all ${
                    role === r
                      ? "border-[#FF4D00] bg-[#FF4D00]/5 text-[#FF4D00]"
                      : "border-[#111111]/10 text-[#111111]/40 hover:border-[#111111]/20 hover:text-[#111111]/60"
                  }`}
                >
                  {role === r && <Check className="w-3.5 h-3.5" />}
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-2 block">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short bio about yourself"
              rows={3}
              className="w-full bg-white border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111] placeholder-[#111111]/30 outline-none transition resize-y"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Lagos, Nairobi, Accra..."
              className="w-full bg-white border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111] placeholder-[#111111]/30 outline-none transition"
            />
          </div>

          {/* Communities */}
          <div>
            <label className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/40 mb-3 block">
              Communities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COMMUNITIES.map((c) => {
                const isSelected = selectedCommunities.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => toggleCommunity(c.name)}
                    className={`flex items-center gap-2 p-3 border text-left transition-all ${
                      isSelected
                        ? "border-[#FF4D00] bg-[#FF4D00]/5"
                        : "border-[#111111]/10 hover:border-[#111111]/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${c.color} relative`}
                    >
                      <span className="text-[8px] font-bold text-white uppercase">
                        {c.name[0]}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-medium block truncate ${
                        isSelected ? "text-[#111111]" : "text-[#111111]/60"
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#111111]/10">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold text-[#111111]/50 hover:bg-[#111111]/5 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 transition-colors"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FORUM CONTENT (separated to avoid hooks-after-return issues)
   ══════════════════════════════════════════════════════════════════════════ */
function ForumContent({ user: initialUser }: { user: ForumUser }) {
  const { navigate } = useRouter();
  const [user, setUser] = useState<ForumUser>(initialUser);
  const userId = user.id;
  const userName = user.name;
  const userAvatarColor = user.avatarColor;

  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [activeCommunity, setActiveCommunity] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("home");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<(ForumPost & { comments: ForumComment[] }) | null>(null);
  const [postDetailLoading, setPostDetailLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [submittingPost, setSubmittingPost] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<(ForumUser & { posts: ForumPost[]; commentCount: number }) | null>(null);
  const [memberDetailLoading, setMemberDetailLoading] = useState(false);
  const [networkMembers, setNetworkMembers] = useState<ForumUser[]>([]);
  const [networkLoading, setNetworkLoading] = useState(false);
  const [networkSearch, setNetworkSearch] = useState("");
  const [newCommunity, setNewCommunity] = useState<string>(
    COMMUNITIES[0].name
  );
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Fetch posts from API
  const fetchPosts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (activeCommunity !== "all") params.set("community", activeCommunity);
      if (activeCategory !== "network") params.set("category", activeCategory);
      params.set("userId", userId);
      params.set("limit", "50");

      const res = await fetch(`/api/forum/posts?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setPostsLoading(false);
    }
  }, [activeCommunity, activeCategory, userId]);

  // Initial seed + fetch
  useEffect(() => {
    const init = async () => {
      // Seed on first load
      await fetch("/api/forum/seed", { method: "POST" }).catch(() => {});
      await fetchPosts();
    };
    init();
  }, []);

  // Re-fetch when filters change
  useEffect(() => {
    if (activeCategory !== "network") {
      setPostsLoading(true);
      fetchPosts();
    }
  }, [activeCommunity, activeCategory, fetchPosts]);

  // Fetch network members when category is network
  useEffect(() => {
    if (activeCategory === "network") {
      const fetchMembers = async () => {
        setNetworkLoading(true);
        try {
          const res = await fetch("/api/forum/users");
          if (res.ok) {
            const data = await res.json();
            setNetworkMembers(data.users || []);
          }
        } catch (err) {
          console.error("Failed to fetch members:", err);
        } finally {
          setNetworkLoading(false);
        }
      };
      fetchMembers();
    }
  }, [activeCategory]);

  // Fetch selected post detail when selectedPostId changes
  useEffect(() => {
    if (!selectedPostId) {
      setSelectedPost(null);
      return;
    }
    const fetchPostDetail = async () => {
      setPostDetailLoading(true);
      try {
        const res = await fetch(`/api/forum/posts/${selectedPostId}?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setSelectedPost(data);
        }
      } catch (err) {
        console.error("Failed to fetch post detail:", err);
      } finally {
        setPostDetailLoading(false);
      }
    };
    fetchPostDetail();
  }, [selectedPostId, userId]);

  // Fetch selected member detail
  useEffect(() => {
    if (!selectedMemberId) {
      setSelectedMember(null);
      return;
    }
    const fetchMemberDetail = async () => {
      setMemberDetailLoading(true);
      try {
        const res = await fetch(`/api/forum/users/${selectedMemberId}`);
        if (res.ok) {
          const data = await res.json();
          setSelectedMember(data);
        }
      } catch (err) {
        console.error("Failed to fetch member detail:", err);
      } finally {
        setMemberDetailLoading(false);
      }
    };
    fetchMemberDetail();
  }, [selectedMemberId]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (!showProfile) return;
    const handleClickOutside = () => setShowProfile(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProfile]);

  // Create post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || submittingPost) return;
    setSubmittingPost(true);
    try {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: userId,
          community: newCommunity,
          title: newTitle,
          content: newContent || undefined,
        }),
      });
      if (res.ok) {
        setNewTitle("");
        setNewContent("");
        setIsComposing(false);
        await fetchPosts();
      }
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setSubmittingPost(false);
    }
  };

  // Vote
  const handleVote = async (id: string, dir: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    if (actionLoading[`vote-${id}`]) return;
    setActionLoading((prev) => ({ ...prev, [`vote-${id}`]: true }));

    // Optimistic update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        let diff = 0;
        let nextVote: "up" | "down" | null = dir;
        if (p.userVote === dir) {
          diff = dir === "up" ? -1 : 1;
          nextVote = null;
        } else if (p.userVote === null) {
          diff = dir === "up" ? 1 : -1;
        } else {
          diff = dir === "up" ? 2 : -2;
        }
        return { ...p, userVote: nextVote, upvotes: p.upvotes + diff };
      })
    );

    try {
      await fetch(`/api/forum/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "vote", userId, direction: dir }),
      });
      // Refetch to get accurate counts
      await fetchPosts();
      // Also refresh detail view if this is the selected post
      if (selectedPostId === id) {
        const res = await fetch(`/api/forum/posts/${id}?userId=${userId}`);
        if (res.ok) setSelectedPost(await res.json());
      }
    } catch (err) {
      console.error("Failed to vote:", err);
      await fetchPosts();
    } finally {
      setActionLoading((prev) => ({ ...prev, [`vote-${id}`]: false }));
    }
  };

  // Heart
  const handleHeart = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (actionLoading[`heart-${id}`]) return;
    setActionLoading((prev) => ({ ...prev, [`heart-${id}`]: true }));

    // Optimistic update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return { ...p, userHearted: !p.userHearted, hearts: p.hearts + (p.userHearted ? -1 : 1) };
      })
    );

    try {
      await fetch(`/api/forum/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "heart", userId }),
      });
      await fetchPosts();
      if (selectedPostId === id) {
        const res = await fetch(`/api/forum/posts/${id}?userId=${userId}`);
        if (res.ok) setSelectedPost(await res.json());
      }
    } catch (err) {
      console.error("Failed to heart:", err);
      await fetchPosts();
    } finally {
      setActionLoading((prev) => ({ ...prev, [`heart-${id}`]: false }));
    }
  };

  // Add comment
  const handleAddComment = async (postId: string) => {
    if (!commentText.trim()) return;
    try {
      const res = await fetch(`/api/forum/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId: userId, content: commentText }),
      });
      if (res.ok) {
        setCommentText("");
        // Refresh post detail
        const detailRes = await fetch(`/api/forum/posts/${postId}?userId=${userId}`);
        if (detailRes.ok) setSelectedPost(await detailRes.json());
        await fetchPosts();
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  // Add reply
  const handleAddReply = async (postId: string, commentId: string) => {
    if (!replyContent.trim()) return;
    try {
      const res = await fetch(`/api/forum/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId: userId, content: replyContent, parentId: commentId }),
      });
      if (res.ok) {
        setReplyContent("");
        setReplyingToCommentId(null);
        // Refresh post detail
        const detailRes = await fetch(`/api/forum/posts/${postId}?userId=${userId}`);
        if (detailRes.ok) setSelectedPost(await detailRes.json());
        await fetchPosts();
      }
    } catch (err) {
      console.error("Failed to add reply:", err);
    }
  };

  const filteredPosts = useMemo(() => {
    let result = posts;
    // The API already filters by community and category, but for client-side "all" we need the full set
    return result;
  }, [posts]);

  const userCommunities = parseCommunities(user.communities);

  // Edit Profile Modal
  const editProfileModal = showEditProfile && (
    <EditProfileModal
      user={user}
      onClose={() => setShowEditProfile(false)}
      onSave={(updatedUser) => setUser(updatedUser)}
    />
  );

  return (
    <>
    {editProfileModal}
    <div className="flex flex-col h-screen bg-white text-[#111111] font-sans text-sm">
      {/* ── TOP HEADER ── */}
      <header className="h-[56px] bg-white border-b border-[#111111]/10 px-4 md:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={() => navigate("/")}
            className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:text-[#FF4D00] transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
          <button
            className="xl:hidden p-2 hover:bg-[#111111]/5 rounded text-[#111111]/60"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-display font-medium tracking-tight text-[#111111]">
                Town<span className="text-[#111111]/30 font-normal"> Square</span>
              </span>
              <span className="hidden md:inline text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#FF4D00] ml-3">
                XCitizen Forum
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-[500px] px-4 md:px-8 relative hidden sm:block">
          <div className="relative flex items-center bg-[#FAFAFA] hover:bg-[#F5F5F5] focus-within:bg-white focus-within:border-[#FF4D00]/30 focus-within:ring-1 focus-within:ring-[#FF4D00]/20 border border-[#111111]/10 rounded px-3 py-1.5 transition-colors">
            <Search className="w-4 h-4 text-[#111111]/30 shrink-0" />
            <input
              type="text"
              placeholder="Search discussions"
              className="flex-1 bg-transparent border-none text-sm text-[#111111] placeholder-[#111111]/30 outline-none ml-2 min-w-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => {
              setNewCommunity(activeCommunity === "all" ? COMMUNITIES[0].name : activeCommunity);
              setIsComposing(true);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00]/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden md:inline">New Post</span>
          </button>
          <button className="p-2 hover:bg-[#111111]/5 rounded text-[#111111]/40">
            <Bell className="w-5 h-5" />
          </button>
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); }}
              className="w-8 h-8 flex items-center justify-center font-bold text-white text-xs ml-1 hover:ring-2 hover:ring-[#FF4D00]/30 transition-all overflow-hidden"
              style={{ backgroundColor: userAvatarColor }}
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                userName[0]
              )}
            </button>

            {/* Profile dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-[44px] w-[280px] bg-white border border-[#111111]/10 shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Profile header */}
                  <div className="p-4 border-b border-[#111111]/10">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center font-bold text-white text-sm overflow-hidden"
                        style={{ backgroundColor: userAvatarColor }}
                      >
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          userName[0]
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-display font-medium text-[#111111] truncate">
                          {userName}
                        </div>
                        <div className="text-[11px] text-[#111111]/40 font-medium truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile details */}
                  <div className="p-4 space-y-3">
                    {user.role && (
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-0.5 text-white"
                          style={{
                            backgroundColor: ROLE_COLORS[user.role] || "#6b7280",
                          }}
                        >
                          {user.role}
                        </span>
                      </div>
                    )}

                    {user.location && (
                      <div className="flex items-center gap-2 text-[12px] text-[#111111]/50">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{user.location}</span>
                      </div>
                    )}

                    {user.bio && (
                      <p className="text-[12px] text-[#111111]/50 leading-relaxed">
                        {user.bio}
                      </p>
                    )}

                    {userCommunities.length > 0 && (
                      <div>
                        <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mb-1.5">
                          Communities
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {userCommunities.map((c) => {
                            return (
                              <span
                                key={c}
                                className="text-[9px] font-mono font-bold tracking-[0.05em] uppercase px-2 py-0.5 bg-[#111111]/5 text-[#111111]/50"
                              >
                                {c}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="border-t border-[#111111]/10">
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        setShowEditProfile(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:bg-[#111111]/5 hover:text-[#FF4D00] transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("xcelero_townsquare_user_id");
                        window.location.reload();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:bg-[#111111]/5 hover:text-[#FF4D00] transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT SIDEBAR */}
        {(!selectedPostId || typeof window !== "undefined") && (
          <aside
            className={`w-[260px] shrink-0 border-r border-[#111111]/10 overflow-y-auto hidden xl:block p-4 h-[calc(100vh-56px)] ${
              mobileSidebarOpen ? "!block absolute z-40 bg-white h-[calc(100vh-56px)] shadow-lg" : ""
            }`}
          >
            <nav className="space-y-0.5 mb-6 pb-6 border-b border-[#111111]/10">
              {[
                { key: "home", icon: Home, label: "Home" },
                { key: "popular", icon: TrendingUp, label: "Popular" },
                { key: "news", icon: Newspaper, label: "Latest" },
                { key: "explore", icon: Compass, label: "Explore" },
                { key: "network", icon: Users, label: "My Network" },
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    setActiveCommunity("all");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    activeCategory === key && activeCommunity === "all"
                      ? "bg-[#111111]/5 text-[#111111]"
                      : "hover:bg-[#111111]/5 text-[#111111]/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-[13px]">{label}</span>
                </button>
              ))}
            </nav>

            <div className="mb-6">
              <h3 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30 mb-3 px-3">
                Communities
              </h3>
              <div className="space-y-0.5">
                {COMMUNITIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setActiveCommunity(c.name);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      activeCommunity === c.name
                        ? "bg-[#111111]/5 text-[#111111]"
                        : "hover:bg-[#111111]/5 text-[#111111]/60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.color}`}
                    >
                      <span className="text-[8px] font-bold text-white uppercase">
                        {c.name[0]}
                      </span>
                    </div>
                    <span className="text-[13px] font-medium truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* My Network */}
            <div className="mb-6">
              <button
                onClick={() => setActiveCategory("network")}
                className="w-full flex items-center justify-between px-3 mb-3 group"
              >
                <h3 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">
                  My Network
                </h3>
                <span className="text-[10px] font-mono text-[#FF4D00]/60 group-hover:text-[#FF4D00] transition-colors flex items-center gap-0.5">
                  View all
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </button>
              <div className="space-y-1 px-1">
                {networkMembers.length > 0
                  ? networkMembers.slice(0, 5).map((member) => (
                      <button
                        key={member.id}
                        onClick={() => { setActiveCategory("network"); setSelectedMemberId(member.id); }}
                        className="w-full flex items-center gap-2.5 px-2 py-2 rounded hover:bg-[#111111]/5 transition-colors text-left"
                      >
                        <div className="relative shrink-0">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-[10px] overflow-hidden"
                            style={{ backgroundColor: member.avatarColor }}
                          >
                            {member.avatarUrl ? (
                              <img src={member.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              getInitials(member.name)
                            )}
                          </div>
                          {isRecentlyActive(member.lastActiveAt) && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-medium text-[#111111] truncate">{member.name}</div>
                          <div className="text-[10px] text-[#111111]/40 truncate">{member.title || ""}{member.company ? ` at ${member.company}` : ""}</div>
                        </div>
                      </button>
                    ))
                  : // Placeholder skeletons for sidebar network
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2.5 px-2 py-2">
                        <div className="w-8 h-8 rounded-full bg-[#111111]/10 animate-pulse" />
                        <div className="flex-1">
                          <div className="h-2.5 w-20 bg-[#111111]/10 rounded animate-pulse mb-1" />
                          <div className="h-2 w-28 bg-[#111111]/10 rounded animate-pulse" />
                        </div>
                      </div>
                    ))
                }
              </div>
            </div>
          </aside>
        )}

        {/* CENTER FEED */}
        <div className="flex-1 overflow-y-auto w-full flex justify-center pt-6 px-0 sm:px-4 md:px-6 pb-12">
          <div className="flex max-w-[1040px] w-full gap-6 items-start justify-center">
            <main className="flex-1 min-w-0 max-w-[700px] w-full flex flex-col gap-4">
              {activeCategory === "network" ? (
                /* ── MY NETWORK VIEW ── */
                <div className="flex flex-col gap-4">
                  {/* Network Header */}
                  <div className="bg-white border border-[#111111]/10 p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-display font-medium tracking-tight text-[#111111] flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#FF4D00]" />
                          My Network
                        </h2>
                        <p className="text-[13px] text-[#111111]/40 mt-1">
                          {networkMembers.length} XCitizens in your network
                        </p>
                      </div>
                      <button
                        onClick={() => { setActiveCategory("home"); setSelectedMemberId(null); }}
                        className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:text-[#FF4D00] transition-colors flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>
                    </div>

                    {/* Search */}
                    <div className="relative flex items-center bg-[#FAFAFA] hover:bg-[#F5F5F5] focus-within:bg-white focus-within:border-[#FF4D00]/30 focus-within:ring-1 focus-within:ring-[#FF4D00]/20 border border-[#111111]/10 rounded px-3 py-2 transition-colors">
                      <Search className="w-4 h-4 text-[#111111]/30 shrink-0" />
                      <input
                        type="text"
                        placeholder="Search members by name, role, or company"
                        value={networkSearch}
                        onChange={(e) => setNetworkSearch(e.target.value)}
                        className="flex-1 bg-transparent border-none text-sm text-[#111111] placeholder-[#111111]/30 outline-none ml-2 min-w-0"
                      />
                    </div>
                  </div>

                  {/* Selected Member Profile Card */}
                  {selectedMemberId && selectedMember && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-[#111111]/10 overflow-hidden"
                    >
                      <div className="h-16 bg-[#111111] relative">
                        <div className="absolute -bottom-6 left-6">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg border-4 border-white overflow-hidden"
                            style={{ backgroundColor: selectedMember.avatarColor }}
                          >
                            {selectedMember.avatarUrl ? (
                              <img src={selectedMember.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              getInitials(selectedMember.name)
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="pt-10 px-6 pb-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-display font-medium text-[#111111]">{selectedMember.name}</h3>
                            <p className="text-[13px] text-[#111111]/50 mt-0.5">
                              {selectedMember.title || ""}{selectedMember.company ? ` at ${selectedMember.company}` : ""}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span
                                className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-0.5 text-white"
                                style={{ backgroundColor: ROLE_COLORS[selectedMember.role] || "#6b7280" }}
                              >
                                {selectedMember.role}
                              </span>
                              {selectedMember.location && (
                                <span className="flex items-center gap-1 text-[11px] text-[#111111]/40">
                                  <MapPin className="w-3 h-3" />
                                  {selectedMember.location}
                                </span>
                              )}
                              {isRecentlyActive(selectedMember.lastActiveAt) && (
                                <span className="flex items-center gap-1 text-[11px] text-green-600">
                                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                  Online
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedMemberId(null)}
                            className="text-[#111111]/30 hover:text-[#111111] transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {selectedMember.bio && (
                          <p className="text-[13px] text-[#111111]/60 leading-relaxed mt-4">
                            {selectedMember.bio}
                          </p>
                        )}

                        {parseCommunities(selectedMember.communities).length > 0 && (
                          <div className="mt-4">
                            <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mb-2">
                              Communities
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {parseCommunities(selectedMember.communities).map((c) => {
                                const comm = COMMUNITIES.find((x) => x.name === c);
                                return (
                                  <span
                                    key={c}
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold tracking-[0.05em] uppercase text-white ${comm?.color || "bg-[#FF4D00]"}`}
                                  >
                                    {c}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {selectedMember.posts && selectedMember.posts.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-[#111111]/5">
                            <div className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mb-2">
                              Recent Posts ({selectedMember.posts.length})
                            </div>
                            <div className="space-y-2">
                              {selectedMember.posts.slice(0, 3).map((post) => (
                                <button
                                  key={post.id}
                                  onClick={() => { setSelectedPostId(post.id); setActiveCategory("home"); }}
                                  className="w-full text-left p-3 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors"
                                >
                                  <div className="text-[12px] font-medium text-[#111111]">{post.title}</div>
                                  <div className="text-[10px] text-[#111111]/40 mt-0.5">{post.upvotes} upvotes · {formatRelativeTime(post.createdAt)}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 mt-5">
                          <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00]/90 transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                            Message
                          </button>
                          <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-[#111111]/10 text-[#111111]/50 text-[11px] font-bold uppercase tracking-[0.1em] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors">
                            <User className="w-3.5 h-3.5" />
                            Connect
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Members Grid */}
                  {networkLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <MemberCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {networkMembers
                        .filter((m) => {
                          if (!networkSearch.trim()) return true;
                          const q = networkSearch.toLowerCase();
                          return (
                            m.name.toLowerCase().includes(q) ||
                            m.role.toLowerCase().includes(q) ||
                            (m.company || "").toLowerCase().includes(q) ||
                            (m.title || "").toLowerCase().includes(q) ||
                            (m.location || "").toLowerCase().includes(q)
                          );
                        })
                        .map((member) => {
                          const memberCommunities = parseCommunities(member.communities);
                          return (
                            <button
                              key={member.id}
                              onClick={() => setSelectedMemberId(member.id === selectedMemberId ? null : member.id)}
                              className={`bg-white border text-left overflow-hidden transition-all ${
                                selectedMemberId === member.id
                                  ? "border-[#FF4D00] ring-1 ring-[#FF4D00]/20"
                                  : "border-[#111111]/10 hover:border-[#FF4D00]/30"
                              }`}
                            >
                              <div className="h-10 bg-[#111111]/5 relative">
                                <div className="absolute -bottom-4 left-4">
                                  <div className="relative">
                                    <div
                                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-[12px] border-2 border-white overflow-hidden"
                                      style={{ backgroundColor: member.avatarColor }}
                                    >
                                      {member.avatarUrl ? (
                                        <img src={member.avatarUrl} alt="" className="w-full h-full object-cover" />
                                      ) : (
                                        getInitials(member.name)
                                      )}
                                    </div>
                                    {isRecentlyActive(member.lastActiveAt) && (
                                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="pt-7 px-4 pb-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-[13px] font-display font-medium text-[#111111] truncate">{member.name}</h4>
                                    <p className="text-[11px] text-[#111111]/40 truncate mt-0.5">
                                      {member.title || ""}{member.company ? ` at ${member.company}` : ""}
                                    </p>
                                  </div>
                                  <span
                                    className="text-[8px] font-mono font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 text-white shrink-0 ml-2"
                                    style={{ backgroundColor: ROLE_COLORS[member.role] || "#6b7280" }}
                                  >
                                    {member.role}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  {member.location && (
                                    <span className="flex items-center gap-1 text-[10px] text-[#111111]/40">
                                      <MapPin className="w-3 h-3" />
                                      {member.location}
                                    </span>
                                  )}
                                </div>
                                {member.bio && (
                                  <p className="text-[11px] text-[#111111]/40 mt-2 line-clamp-2 leading-relaxed">
                                    {member.bio}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {memberCommunities.slice(0, 2).map((c) => (
                                    <span
                                      key={c}
                                      className="text-[8px] font-mono font-bold tracking-[0.05em] uppercase px-1.5 py-0.5 bg-[#111111]/5 text-[#111111]/40"
                                    >
                                      {c.split("&")[0].trim()}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  )}
                </div>
              ) : selectedPostId ? (
                /* ── POST DETAIL VIEW ── */
                <div className="bg-white border border-[#111111]/10 overflow-hidden">
                  {postDetailLoading ? (
                    <div className="p-8 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-[#FF4D00]" />
                    </div>
                  ) : selectedPost ? (
                    <>
                      <div className="p-4 md:p-6 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-[#111111]/40">
                            <button
                              onClick={() => setSelectedPostId(null)}
                              className="p-1 hover:bg-[#111111]/5 rounded transition-colors mr-1"
                            >
                              <ArrowLeft className="w-[18px] h-[18px] text-[#111111]/60" />
                            </button>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                COMMUNITIES.find((c) => c.name === selectedPost.community)?.color ||
                                "bg-[#FF4D00]"
                              }`}
                            >
                              <span className="text-[8px] font-bold text-white uppercase">
                                {selectedPost.community[0]}
                              </span>
                            </div>
                            <span className="font-bold text-[#111111]/60">{selectedPost.community}</span>
                            <span>•</span>
                            <span>{formatRelativeTime(selectedPost.createdAt)}</span>
                            <span>•</span>
                            <span className="text-[#111111]/60 flex items-center gap-1">
                              {selectedPost.author.name}
                              {isRecentlyActive(selectedPost.createdAt) && (
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                              )}
                            </span>
                          </div>
                          <button className="p-1 hover:bg-[#111111]/5 rounded transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-[#111111]/30" />
                          </button>
                        </div>

                        <h1 className="text-xl font-display font-medium tracking-tight text-[#111111] leading-snug mt-1">
                          {selectedPost.title}
                        </h1>

                        {selectedPost.content && (
                          <div className="text-[14px] text-[#111111]/60 leading-relaxed prose prose-slate max-w-none py-1">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {selectedPost.content}
                            </ReactMarkdown>
                          </div>
                        )}

                        {selectedPost.imageUrl && (
                          <div className="mt-3 w-full overflow-hidden border border-[#111111]/10">
                            <img
                              src={selectedPost.imageUrl}
                              alt=""
                              className="w-full h-auto max-h-[500px] object-cover"
                            />
                          </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center gap-2 py-2 mt-2 border-t border-b border-[#111111]/5">
                          <div className="flex items-center bg-[#FAFAFA] rounded border border-[#111111]/5">
                            <button
                              onClick={(e) => handleVote(selectedPost.id, "up", e)}
                              className={`p-1.5 hover:bg-[#111111]/5 rounded-l transition-colors ${
                                selectedPost.userVote === "up" ? "text-[#FF4D00]" : "text-[#111111]/30"
                              }`}
                            >
                              <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                            <span
                              className={`text-[13px] font-bold px-1.5 ${
                                selectedPost.userVote === "up"
                                  ? "text-[#FF4D00]"
                                  : selectedPost.userVote === "down"
                                  ? "text-[#111111]/40"
                                  : "text-[#111111]/50"
                              }`}
                            >
                              {selectedPost.upvotes}
                            </span>
                            <button
                              onClick={(e) => handleVote(selectedPost.id, "down", e)}
                              className={`p-1.5 hover:bg-[#111111]/5 rounded-r transition-colors ${
                                selectedPost.userVote === "down" ? "text-[#111111]/60" : "text-[#111111]/30"
                              }`}
                            >
                              <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                          </div>
                          <button
                            onClick={(e) => handleHeart(selectedPost.id, e)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                selectedPost.userHearted
                                  ? "text-[#FF4D00] fill-[#FF4D00]"
                                  : "text-[#111111]/30"
                              }`}
                            />
                            <span className="text-[13px] font-bold text-[#111111]/50">
                              {selectedPost.hearts || ""}
                            </span>
                          </button>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors">
                            <MessageSquare className="w-4 h-4 text-[#111111]/30" />
                            <span className="text-[13px] font-bold text-[#111111]/50">
                              {selectedPost.comments?.length || 0}
                            </span>
                          </button>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors">
                            <Share2 className="w-4 h-4 text-[#111111]/30" />
                            <span className="text-[13px] font-bold text-[#111111]/50 hidden sm:inline">
                              Share
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Add Comment */}
                      <div className="px-4 md:px-6 py-3 border-t border-[#111111]/5">
                        <div className="flex gap-3 items-start">
                          <div
                            className="w-8 h-8 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden"
                            style={{ backgroundColor: userAvatarColor }}
                          >
                            {user.avatarUrl ? (
                              <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              userName[0]
                            )}
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Add a comment"
                              rows={2}
                              className="w-full bg-[#FAFAFA] border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-3 py-2 text-sm text-[#111111] outline-none transition resize-y"
                            />
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleAddComment(selectedPost.id)}
                                disabled={!commentText.trim()}
                                className="px-4 py-1.5 bg-[#FF4D00] text-white font-bold rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 transition"
                              >
                                Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="px-4 md:px-6 pb-6 border-t border-[#111111]/5">
                        <div className="py-3">
                          <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30">
                            {selectedPost.comments?.length || 0} Comments
                          </span>
                        </div>
                        {!selectedPost.comments || selectedPost.comments.length === 0 ? (
                          <div className="py-8 text-center text-[#111111]/30 text-sm">
                            No comments yet. Start the discussion.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {selectedPost.comments.map((comment) => (
                              <CommentNode
                                key={comment.id}
                                comment={comment}
                                postId={selectedPost.id}
                                replyingToCommentId={replyingToCommentId}
                                setReplyingToCommentId={setReplyingToCommentId}
                                replyContent={replyContent}
                                setReplyContent={setReplyContent}
                                handleAddReply={handleAddReply}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center text-[#111111]/30 text-sm">
                      Post not found.
                    </div>
                  )}
                </div>
              ) : (
                /* ── FEED VIEW ── */
                <>
                  {/* Compact Create Post */}
                  <div className="bg-white border border-[#111111]/10 p-3 flex gap-3 items-center sticky top-0 z-40">
                    <div
                      className="w-9 h-9 flex items-center justify-center font-bold text-white text-sm shrink-0 overflow-hidden"
                      style={{ backgroundColor: userAvatarColor }}
                    >
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        userName[0]
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Start a discussion"
                      readOnly
                      onClick={() => {
                        setNewCommunity(activeCommunity === "all" ? COMMUNITIES[0].name : activeCommunity);
                        setIsComposing(true);
                      }}
                      className="flex-1 bg-[#FAFAFA] hover:bg-[#F5F5F5] cursor-text border border-[#111111]/10 px-4 py-2 text-[#111111]/40 outline-none transition-colors text-sm"
                    />
                    <button
                      onClick={() => {
                        setNewCommunity(activeCommunity === "all" ? COMMUNITIES[0].name : activeCommunity);
                        setIsComposing(true);
                      }}
                      className="p-2 hover:bg-[#111111]/5 rounded text-[#111111]/30 hover:text-[#FF4D00] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Community filter bar (mobile) */}
                  <div className="xl:hidden flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <button
                      onClick={() => setActiveCommunity("all")}
                      className={`shrink-0 px-3 py-1.5 text-[11px] font-mono font-bold tracking-[0.1em] uppercase border transition-colors ${
                        activeCommunity === "all"
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/20"
                      }`}
                    >
                      All
                    </button>
                    {COMMUNITIES.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setActiveCommunity(c.name)}
                        className={`shrink-0 px-3 py-1.5 text-[11px] font-mono font-bold tracking-[0.1em] uppercase border transition-colors ${
                          activeCommunity === c.name
                            ? "bg-[#111111] text-white border-[#111111]"
                            : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/20"
                        }`}
                      >
                        {c.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  {/* Feed items */}
                  {postsLoading ? (
                    <>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <PostSkeleton key={i} />
                      ))}
                    </>
                  ) : filteredPosts.length === 0 ? (
                    <div className="bg-white border border-[#111111]/10 p-8 text-center text-[#111111]/30 text-sm">
                      No posts yet. Be the first to start a discussion!
                    </div>
                  ) : (
                    filteredPosts.map((post) => {
                      const isUpvoted = post.userVote === "up";
                      const isDownvoted = post.userVote === "down";
                      const communityDetails = COMMUNITIES.find((c) => c.name === post.community);

                      return (
                        <article
                          key={post.id}
                          className="bg-white border border-[#111111]/10 hover:border-[#FF4D00]/20 transition-colors overflow-hidden group"
                        >
                          <div
                            className="p-4 flex flex-col gap-2 cursor-pointer"
                            onClick={() => setSelectedPostId(post.id)}
                          >
                            {/* Header */}
                            <div className="flex items-center gap-1.5 text-xs text-[#111111]/40">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                  communityDetails?.color || "bg-[#FF4D00]"
                                }`}
                              >
                                <span className="text-[8px] font-bold text-white uppercase">
                                  {post.community[0]}
                                </span>
                              </div>
                              <span
                                className="font-bold text-[#111111]/60 hover:underline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveCommunity(post.community);
                                }}
                              >
                                {post.community}
                              </span>
                              <span>•</span>
                              <span>{formatRelativeTime(post.createdAt)}</span>
                              <span>•</span>
                              <span className="text-[#111111]/40 flex items-center gap-1">
                                {post.author.name}
                                {isRecentlyActive(post.createdAt) && (
                                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                )}
                              </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-base font-display font-medium tracking-tight text-[#111111] leading-snug pr-4">
                              {post.title}
                            </h3>
                            {post.content && (
                              <div className="text-[13px] text-[#111111]/50 leading-relaxed line-clamp-3">
                                {post.content}
                              </div>
                            )}
                            {post.imageUrl && (
                              <div className="mt-2 w-full max-h-[300px] overflow-hidden border border-[#111111]/10">
                                <img
                                  src={post.imageUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>

                          {/* Actions bar */}
                          <div className="flex items-center gap-2 px-4 pb-3">
                            <div className="flex items-center bg-[#FAFAFA] border border-[#111111]/5 rounded">
                              <button
                                onClick={(e) => handleVote(post.id, "up", e)}
                                className={`p-1.5 hover:bg-[#111111]/5 rounded-l transition-colors ${
                                  isUpvoted ? "text-[#FF4D00]" : "text-[#111111]/30 hover:text-[#FF4D00]"
                                }`}
                              >
                                <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
                              </button>
                              <span
                                className={`text-[13px] font-bold px-1 ${
                                  isUpvoted
                                    ? "text-[#FF4D00]"
                                    : isDownvoted
                                    ? "text-[#111111]/40"
                                    : "text-[#111111]/40"
                                }`}
                              >
                                {post.upvotes}
                              </span>
                              <button
                                onClick={(e) => handleVote(post.id, "down", e)}
                                className={`p-1.5 hover:bg-[#111111]/5 rounded-r transition-colors ${
                                  isDownvoted
                                    ? "text-[#111111]/60"
                                    : "text-[#111111]/30 hover:text-[#111111]/60"
                                }`}
                              >
                                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
                              </button>
                            </div>
                            <button
                              onClick={(e) => handleHeart(post.id, e)}
                              className="flex items-center gap-1 px-2 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors"
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  post.userHearted
                                    ? "text-[#FF4D00] fill-[#FF4D00]"
                                    : "text-[#111111]/30"
                                }`}
                              />
                              <span className="text-[13px] font-bold text-[#111111]/40">
                                {post.hearts || ""}
                              </span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPostId(post.id);
                              }}
                              className="flex items-center gap-1 px-2 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors"
                            >
                              <MessageSquare className="w-4 h-4 text-[#111111]/30" />
                              <span className="text-[13px] font-bold text-[#111111]/40">
                                {post.commentCount}
                              </span>
                            </button>
                            <button className="flex items-center gap-1 px-2 py-1.5 bg-[#FAFAFA] hover:bg-[#111111]/5 border border-[#111111]/5 rounded transition-colors ml-auto">
                              <Share2 className="w-4 h-4 text-[#111111]/30" />
                            </button>
                          </div>
                        </article>
                      );
                    })
                  )}
                </>
              )}
            </main>

            {/* RIGHT SIDEBAR: Trending */}
            <aside className="w-[300px] shrink-0 hidden lg:block self-stretch">
              <div className="border border-[#111111]/10 overflow-hidden sticky top-0">
                <div className="p-4 border-b border-[#111111]/10 bg-[#111111] text-white">
                  <h2 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                    Town Square
                  </h2>
                  <p className="text-[12px] text-white/50 mt-1 leading-relaxed">
                    The XCitizen forum. Where builders share what they&apos;re
                    learning, what they&apos;re building, and what they need.
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mb-3">
                    Trending Discussions
                  </h3>
                  {postsLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="py-3 border-b border-[#111111]/5 last:border-b-0">
                        <div className="h-3 w-3/4 bg-[#111111]/10 rounded animate-pulse mb-2" />
                        <div className="h-2.5 w-1/2 bg-[#111111]/10 rounded animate-pulse" />
                      </div>
                    ))
                  ) : (
                    posts.slice(0, 5).map((post) => {
                      const postCommunity = COMMUNITIES.find((c) => c.name === post.community);
                      return (
                        <div
                          key={`trending-${post.id}`}
                          onClick={() => setSelectedPostId(post.id)}
                          className="py-3 border-b border-[#111111]/5 last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] -mx-2 px-2 transition-colors"
                        >
                          <div className="flex items-center gap-1.5 text-[11px] text-[#111111]/30 mb-1">
                            <div
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                                postCommunity?.color || "bg-[#FF4D00]"
                              }`}
                            >
                              <span className="text-[6px] font-bold text-white uppercase">
                                {post.community[0]}
                              </span>
                            </div>
                            <span className="font-medium text-[#111111]/50 truncate">
                              {post.community}
                            </span>
                            <span>•</span>
                            <span>{formatRelativeTime(post.createdAt)}</span>
                          </div>
                          <h4 className="text-[13px] font-medium text-[#111111]/70 leading-snug line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="text-[10px] text-[#111111]/30 mt-1 flex items-center gap-2">
                            <span>{post.upvotes} upvotes</span>
                            <span>•</span>
                            <span>{post.commentCount} comments</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="px-4 py-3 border-t border-[#111111]/5 text-[10px] text-[#111111]/20 font-mono">
                  xCelero Town Square © 2026
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ── COMPOSE MODAL ── */}
      <AnimatePresence>
        {isComposing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsComposing(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-[600px] bg-white border border-[#111111]/10 shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#111111]/10">
                <h2 className="text-lg font-display font-medium tracking-tight text-[#111111]">
                  New discussion
                </h2>
                <button
                  onClick={() => setIsComposing(false)}
                  className="text-[#111111]/40 hover:text-[#111111] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="p-4 flex flex-col gap-4">
                {/* Community Selector Buttons */}
                <div>
                  <label className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 mb-2 block">
                    Post in
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COMMUNITIES.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setNewCommunity(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.05em] border transition-all ${
                          newCommunity === c.name
                            ? "border-[#FF4D00] bg-[#FF4D00]/5 text-[#111111]"
                            : "border-[#111111]/10 text-[#111111]/40 hover:border-[#111111]/20 hover:text-[#111111]/60"
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${c.color} shrink-0`} />
                        <span className="truncate max-w-[120px]">{c.name.split("&")[0].trim()}</span>
                        {newCommunity === c.name && (
                          <Check className="w-3 h-3 text-[#FF4D00] shrink-0" strokeWidth={3} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <input
                  autoFocus
                  type="text"
                  placeholder="Title*"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  maxLength={300}
                  className="w-full bg-transparent border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[15px] font-medium text-[#111111] placeholder-[#111111]/30 outline-none transition"
                />

                {/* Content */}
                <textarea
                  placeholder="Body text (optional)"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={6}
                  className="w-full bg-transparent border border-[#111111]/10 focus:border-[#FF4D00]/30 focus:ring-1 focus:ring-[#FF4D00]/20 rounded px-4 py-3 text-[14px] text-[#111111]/70 placeholder-[#111111]/30 outline-none transition resize-y min-h-[120px]"
                />

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="px-5 py-2 text-sm font-bold text-[#111111]/50 hover:bg-[#111111]/5 rounded transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newTitle.trim() || submittingPost}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-bold bg-[#FF4D00] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF4D00]/90 rounded transition"
                  >
                    {submittingPost && <Loader2 className="w-4 h-4 animate-spin" />}
                    Post
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TOWN SQUARE PAGE (entry point: handles onboarding gate)
   ══════════════════════════════════════════════════════════════════════════ */
export function TownSquare() {
  const [currentUser, setCurrentUser] = useState<ForumUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedId = localStorage.getItem("xcelero_townsquare_user_id");
      if (!storedId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/forum/users/${storedId}`);
        if (res.ok) {
          const user = await res.json();
          setCurrentUser(user);
        } else {
          // User ID invalid, clear it
          localStorage.removeItem("xcelero_townsquare_user_id");
        }
      } catch {
        localStorage.removeItem("xcelero_townsquare_user_id");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleOnboardingComplete = (user: ForumUser) => {
    setCurrentUser(user);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF4D00]" />
        <span className="mt-3 text-sm text-[#111111]/40">Loading Town Square...</span>
      </div>
    );
  }

  // Show onboarding if no user
  if (!currentUser) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // Show the forum
  return (
    <ForumContent
      user={currentUser}
    />
  );
}
