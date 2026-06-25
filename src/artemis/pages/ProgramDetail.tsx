"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "@/artemis/router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Plus, Minus, Users, Zap, Shield, Workflow, Activity, Globe, Target, Search as SearchIcon, Calendar, Clock, ChevronRight, MapPin, ArrowRight, X, Loader2 } from "lucide-react";
import { Link } from "@/artemis/router";
import { programsData } from "@/artemis/data/programs";
import { venturesData } from "@/artemis/data/ventures";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Zap, Users, Activity, Workflow, Globe, Target, Search: SearchIcon, Calendar, Clock,
};

/* ── Auto-play carousel images per program ── */
const carouselImages: Record<string, string[]> = {
  "xhansa-fellowship": [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  ],
  "xcelero-accelerator": [
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  ],
  "inception-studios": [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  ],
  "quest-fellowship": [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  ],
};

/* ── Venture IDs per program for "From Idea to Company" section ── */
const programVentureIds: Record<string, string[]> = {
  "xhansa-fellowship": ["helios", "vulcan", "refract", "noma"],
  "xcelero-accelerator": ["joule", "denari", "sankofa", "smelter"],
  "inception-studios": ["civitas", "aegis", "atomica", "verdant"],
  "quest-fellowship": ["allele", "ampere", "phylaxis", "azimuth"],
};

/* ── Journey step colors ── */
const stepColors = [
  "bg-[#FF4D00]", "bg-[#E5432F]", "bg-[#9333EA]", "bg-[#2563EB]", "bg-[#059669]",
];

export function ProgramDetail() {
  const { params, navigate } = useRouter();
  const id = params?.id;
  const program = programsData.find((p) => p.id === id);
  const [activeSteps, setActiveSteps] = useState<number[]>([0, 1, 2]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Application modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applySubmitting, setApplySubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applyForm, setApplyForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    location: "",
    currentRole: "",
    companyName: "",
    motivation: "",
    referral: "",
  });

  const openApplyModal = () => {
    setApplySuccess(false);
    setApplyError("");
    setShowApplyModal(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.firstName || !applyForm.lastName || !applyForm.email) return;
    setApplySubmitting(true);
    setApplyError("");
    try {
      const res = await fetch("/api/programs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programSlug: id,
          ...applyForm,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setApplyError(data.error || "Submission failed. Please try again.");
        setApplySubmitting(false);
        return;
      }
      setApplySubmitting(false);
      setApplySuccess(true);
    } catch {
      setApplyError("Network error. Please try again.");
      setApplySubmitting(false);
    }
  };

  // Carousel state
  const images = (id && carouselImages[id]) || [];
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(1);

  const nextSlide = useCallback(() => {
    if (images.length === 0) return;
    setLeftIdx((prev) => (prev + 1) % images.length);
    setRightIdx((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [images.length, nextSlide]);

  // Ventures for this program
  const ventureIds = (id && programVentureIds[id]) || [];
  const programVentures = ventureIds
    .map((vid) => venturesData.find((v) => v.id === vid))
    .filter(Boolean) as typeof venturesData;

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#111111]">
        <div className="text-center px-6">
          <p className="font-mono text-[10px] tracking-[0.4em] text-[#FF4D00] mb-4">404_PAGE_NOT_FOUND</p>
          <h1 className="text-3xl font-display font-medium mb-8 uppercase tracking-tighter">Directive Missing</h1>
          <Link to="/programs" className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#FF4D00] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return Explorer
          </Link>
        </div>
      </div>
    );
  }

  const hasAppCycles = program.applicationCycles && program.applicationCycles.length > 0;
  const hasWhatYouGet = program.whatYouGet && program.whatYouGet.length > 0;
  const hasProcess = program.process && program.process.length > 0;

  return (
    <div className="bg-white text-[#1B1C1E] min-h-screen selection:bg-[#FF9CDF] selection:text-white pb-0 overflow-x-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="pt-32 pb-16 px-6 lg:px-12 w-full max-w-[1400px] mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[100px] font-display font-medium uppercase leading-[0.9] text-[#1B1C1E] tracking-tighter mb-6">
              {program.title}
            </h1>
            <p className="text-lg text-[#1B1C1E]/60 leading-relaxed max-w-xl">
              {program.desc}
            </p>
          </div>
          <div className="flex-shrink-0 self-start md:self-end">
            <button className="inline-flex items-center justify-center gap-2 bg-[#1B1C1E] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-black transition-transform hover:scale-105">
              Start your company <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1"><path d="M11 1L17 7M17 7L11 13M17 7H0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
        
        <div className="w-full relative overflow-hidden aspect-[2.5/1]">
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/70 via-[#111111]/30 to-[#111111]/70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-white font-mono text-sm md:text-base font-bold tracking-[0.3em] mb-4 opacity-70">FROM 0</div>
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto flex items-center justify-center opacity-50">
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M100 0L186.6 50V150L100 200L13.4 150V50L100 0Z" stroke="white" strokeWidth="1.5"/>
                    <path d="M100 100L186.6 50" stroke="white" strokeWidth="1"/>
                    <path d="M100 100V200" stroke="white" strokeWidth="1"/>
                    <path d="M100 100L13.4 50" stroke="white" strokeWidth="1"/>
                  </svg>
                </div>
                <div className="text-white font-mono text-sm md:text-base font-bold tracking-[0.3em] mt-4 opacity-70">TO 1</div>
              </div>
            </div>
        </div>
      </section>

      {/* ── ANCHOR NAV ── */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-wrap justify-center items-center gap-4 mb-24 z-40 bg-white">
          <a href="#our-track-record" className="px-6 py-3 rounded-full bg-[#FAFAFA] text-[#1B1C1E] text-sm font-medium hover:bg-[#F4F4F5] transition-colors border border-transparent hover:border-[#E5E7EB]">Our track record</a>
          <a href="#application-cycles" className="px-6 py-3 rounded-full bg-[#FAFAFA] text-[#1B1C1E] text-sm font-medium hover:bg-[#F4F4F5] transition-colors border border-transparent hover:border-[#E5E7EB]">Apply</a>
          <a href="#what-you-get" className="px-6 py-3 rounded-full bg-[#FAFAFA] text-[#1B1C1E] text-sm font-medium hover:bg-[#F4F4F5] transition-colors border border-transparent hover:border-[#E5E7EB]">What you get</a>
          <a href="#program-journey" className="px-6 py-3 rounded-full bg-[#FAFAFA] text-[#1B1C1E] text-sm font-medium hover:bg-[#F4F4F5] transition-colors border border-transparent hover:border-[#E5E7EB]">The journey</a>
          <a href="#faq" className="px-6 py-3 rounded-full bg-[#FAFAFA] text-[#1B1C1E] text-sm font-medium hover:bg-[#F4F4F5] transition-colors border border-transparent hover:border-[#E5E7EB]">FAQ</a>
      </div>

      {/* ── OUR TRACK RECORD ── */}
      <section id="our-track-record" className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 lg:mb-32">
          <div className="flex items-center mb-6">
             <span className="text-[#FF4D00] text-[10px] mr-2">&#9679;</span>
             <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1B1C1E]/60">Our Track Record</span>
          </div>
          <p className="text-2xl lg:text-3xl max-w-3xl font-medium leading-relaxed text-[#1B1C1E]">
            Founders who build with {program.title} don&apos;t just start companies, they build category leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {(program.trackRecord || []).map((stat, i) => (
             <div key={i} className="border-l border-[#1B1C1E]/10 pl-6 space-y-4">
               <p className="font-mono text-sm tracking-widest text-[#1B1C1E]/60 uppercase">{stat.label}</p>
               <p className="text-3xl sm:text-5xl lg:text-7xl font-display font-medium tracking-tighter">
                 {stat.value}
               </p>
             </div>
           ))}
        </div>
      </section>

      {/* ── APPLICATION CYCLES ── */}
      {hasAppCycles && (
        <section id="application-cycles" className="py-0">
          <div className="max-w-[1400px] mx-auto bg-[#1B1C1E] text-white px-6 md:px-12 lg:px-20 py-24 lg:py-32 rounded-sm relative overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FF4D00] blur-[200px]" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF9CDF] blur-[150px]" />
            </div>

            <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-4 h-4 text-[#FF4D00]" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">Application Cycles</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium uppercase tracking-tighter leading-[0.95]">
                  WHEN TO <br/>APPLY
                </h2>
              </div>
              <div>
                {program.applicationCycles!.some(c => c.status === 'open') && (
                  <button onClick={openApplyModal} className="inline-flex items-center justify-center gap-2 bg-[#FF4D00] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#E54300] transition-colors">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.applicationCycles!.map((cycle, i) => (
                <div 
                  key={i} 
                  className={`relative border rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                    cycle.status === 'open' 
                      ? 'border-[#FF4D00]/40 bg-[#FF4D00]/5 hover:border-[#FF4D00]/60' 
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      cycle.status === 'open' 
                        ? 'bg-[#FF4D00]/20 text-[#FF4D00]' 
                        : cycle.status === 'upcoming'
                        ? 'bg-white/10 text-white/60'
                        : 'bg-white/5 text-white/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        cycle.status === 'open' ? 'bg-[#FF4D00] animate-pulse' : 'bg-white/30'
                      }`} />
                      {cycle.status === 'open' ? 'Applications Open' : cycle.status === 'upcoming' ? 'Upcoming' : 'Closed'}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium mb-6 text-white">{cycle.cycle}</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-white/60" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-0.5">Opens</p>
                        <p className="text-sm font-medium text-white/80">{cycle.opens}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-white/60" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-0.5">Closes</p>
                        <p className="text-sm font-medium text-white/80">{cycle.closes}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-white/60" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-0.5">Cohort Begins</p>
                        <p className="text-sm font-medium text-white/80">{cycle.cohortStart}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  {cycle.status === 'open' && (
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                      <div className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rotate-45 bg-[#FF4D00]/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Countdown / urgency bar */}
            {program.applicationCycles!.some(c => c.status === 'open') && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
                  <p className="text-sm text-white/70">
                    Applications are currently open for <span className="text-white font-medium">{program.applicationCycles!.find(c => c.status === 'open')?.cycle}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <span>Closes</span>
                  <span className="text-white font-medium">{program.applicationCycles!.find(c => c.status === 'open')?.closes}</span>
                </div>
              </div>
            )}
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT YOU GET (replaces "How we help you") ── */}
      {hasWhatYouGet && (
        <section id="what-you-get" className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-20">
            <div className="flex items-center mb-6">
              <span className="text-[#FF4D00] text-[10px] mr-2">&#9679;</span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1B1C1E]/60">What you get</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-medium mb-4">
              {program.howWeHelpIntro || `Everything you need to build with ${program.title}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.whatYouGet!.map((item, i) => {
              const IconComponent = iconMap[item.icon || 'Shield'] || Shield;
              return (
                <div 
                  key={i} 
                  className="group relative bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl p-8 hover:border-[#FF4D00]/30 hover:bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF4D00]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF4D00]/20 transition-colors">
                      <IconComponent className="w-5 h-5 text-[#FF4D00]" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#1B1C1E]/30 mt-2">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-medium text-[#1B1C1E] mb-3">{item.title}</h3>
                  <p className="text-[15px] text-[#1B1C1E]/60 leading-relaxed">{item.desc}</p>
                  
                  {/* Hover arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-[#FF4D00]" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── PROGRAM JOURNEY (visual timeline for process data) ── */}
      {hasProcess && (
        <section id="program-journey" className="py-0">
          <div className="max-w-[1400px] mx-auto bg-[#F9F9F9] px-6 md:px-12 lg:px-20 py-24 lg:py-32 rounded-sm">
            <div className="mb-16 md:mb-20">
              <div className="flex items-center mb-6">
                <span className="text-[#FF4D00] text-[10px] mr-2">&#9679;</span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1B1C1E]/60">The Program Journey</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[64px] lg:text-[80px] font-display font-medium leading-[0.9] text-[#1B1C1E] uppercase tracking-tighter mb-4">
                YOUR PATH
              </h2>
              <p className="text-lg text-[#1B1C1E]/60 max-w-lg font-medium leading-relaxed">
                From entry to exit, every phase of {program.title} is engineered for one outcome: operational ventures that survive and scale.
              </p>
            </div>

            {/* Visual Timeline */}
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="hidden lg:block absolute left-[60px] top-0 bottom-0 w-px bg-gradient-to-b from-[#FF4D00] via-[#9333EA] to-[#059669]" />

              <div className="space-y-6">
                {program.process!.map((step, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveSteps(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])}
                    className="relative group cursor-pointer"
                  >
                    <div className="flex gap-6 lg:gap-10 items-start">
                      {/* Step indicator */}
                      <div className="hidden lg:flex flex-col items-center flex-shrink-0">
                        <div className={`w-[120px] h-[120px] rounded-2xl ${stepColors[idx % stepColors.length]} flex items-center justify-center shadow-lg relative z-10 group-hover:scale-105 transition-transform`}>
                          <span className="text-white font-display text-4xl font-medium">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                      </div>

                      {/* Content card */}
                      <div className={`flex-1 bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        activeSteps.includes(idx) 
                          ? 'border-[#1B1C1E]/10 shadow-lg' 
                          : 'border-[#E5E7EB] hover:border-[#1B1C1E]/10 hover:shadow-md'
                      }`}>
                        <div className="p-8 lg:p-10">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="lg:hidden flex items-center gap-3 mb-3">
                                <div className={`w-8 h-8 rounded-lg ${stepColors[idx % stepColors.length]} flex items-center justify-center`}>
                                  <span className="text-white font-display text-sm font-medium">{idx + 1}</span>
                                </div>
                              </div>
                              <h3 className="text-xl md:text-2xl font-medium text-[#1B1C1E] mb-2">{step.title}</h3>
                              <p className="text-[#1B1C1E]/60 text-[15px] leading-relaxed">{step.desc}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center flex-shrink-0 transition-colors hover:bg-[#E5E7EB]">
                              {activeSteps.includes(idx) ? <Minus className="w-5 h-5 text-[#1B1C1E]" /> : <Plus className="w-5 h-5 text-[#1B1C1E]" />}
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {activeSteps.includes(idx) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-6 pt-6 border-t border-[#1B1C1E]/5">
                                  <p className="text-[#1B1C1E]/70 text-[15px] leading-relaxed">{step.extended || step.desc}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── An Unfair Starting Line, 6 features + auto-play photo collage ── */}
      {(program.features && program.features.length > 0) && (
        <section id="what-you-get" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
           <div className="max-w-[1400px] mx-auto">
              <div className="mb-16 md:mb-20">
                <div className="flex items-center mb-6">
                  <span className="text-[#FF4D00] text-[10px] mr-2">&#9679;</span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1B1C1E]/60">What sets us apart</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-display font-medium">
                  {program.unfairAdvantageTitle || "An unfair starting line"}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mb-20 md:mb-28">
                 {program.features.map((feature, i) => {
                   const IconComponent = iconMap[feature.icon || 'Shield'] || Shield;
                   return (
                     <div key={i} className="space-y-4">
                        <div className="w-8 h-8 flex items-center text-[#FF4D00]">
                           <IconComponent className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-medium">{feature.title}</h4>
                        <p className="text-[#1B1C1E]/70 leading-relaxed text-[15px]">
                           {feature.desc}
                        </p>
                     </div>
                   );
                 })}
              </div>

              {/* Auto-play photo collage */}
              {images.length >= 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Left column: auto-play image + testimonial */}
                  <div className="flex flex-col">
                    <div className="aspect-square overflow-hidden relative">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={leftIdx}
                          src={images[leftIdx]}
                          alt={`${program.title} program in action`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      </AnimatePresence>
                    </div>
                    {program.testimonial && (
                      <div className="bg-[#EFEFEF] p-8 md:p-10 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1B1C1E]/40">What they say</span>
                            <span className="font-mono text-[10px] text-[#1B1C1E]/30">03, 03</span>
                          </div>
                          <p className="text-lg md:text-xl font-medium leading-[1.5] text-[#1B1C1E]/80 mb-8">
                            &ldquo;{program.testimonial.quote}&rdquo;
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-4 border-t border-[#1B1C1E]/10">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                            <img
                              src={program.testimonial.image}
                              alt={program.testimonial.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-[#1B1C1E]">{program.testimonial.author}</div>
                            <div className="text-xs text-[#1B1C1E]/50">{program.testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right column: auto-play image */}
                  <div className="aspect-square md:aspect-auto md:min-h-[600px] overflow-hidden relative">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={rightIdx}
                        src={images[rightIdx]}
                        alt={`${program.title} community`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </AnimatePresence>
                  </div>
                </div>
              )}
           </div>
        </section>
      )}

      {/* ── STARTUP IDEAS, 6 cards ── */}
      {(program.ideas && program.ideas.length > 0) && (
        <section id="startup-ideas" className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto bg-white">
           <div className="mb-16 md:mb-20">
             <div className="flex items-center mb-6">
               <span className="text-[#FF4D00] text-[10px] mr-2">&#9679;</span>
               <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1B1C1E]/60">Opportunity Pipeline</span>
             </div>
             <h2 className="text-3xl sm:text-4xl md:text-[64px] lg:text-[80px] font-display font-medium leading-[0.9] text-[#1B1C1E] uppercase tracking-tighter mb-4">
               STARTUP IDEAS
             </h2>
             <p className="text-lg text-[#1B1C1E]/60 max-w-lg font-medium leading-relaxed">
               Pick a problem worth solving. We&apos;ve done the research, now we&apos;re looking for the right people to build it.
             </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#1B1C1E]/10 bg-[#FAFAFA]">
              {program.ideas.map((idea, i) => (
                 <div key={i} className="p-6 sm:p-8 border-r border-b border-[#1B1C1E]/10 flex flex-col transition-colors duration-300 cursor-pointer group min-h-[280px] sm:min-h-[400px] hover:bg-white hover:shadow-xl relative z-10 bg-[#FAFAFA]">
                    <div className="flex items-center gap-4 mb-24">
                       <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-[#1B1C1E]/10">
                          <img src={idea.partnerImage || `https://i.pravatar.cc/100?img=${i+10}`} alt={idea.partner} className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <div className="font-medium text-[#1B1C1E]">{idea.partner}</div>
                          <div className="text-sm text-[#1B1C1E]/60">Partner</div>
                       </div>
                    </div>
                    <div className="mt-auto">
                       <h3 className="text-2xl font-medium mb-4 text-[#1B1C1E] transition-colors duration-300 group-hover:text-[#FF4D00]">{idea.title}</h3>
                       <div className="text-[#1B1C1E]/60 leading-relaxed transition-colors duration-300 group-hover:text-[#1B1C1E] relative pr-6">
                          {idea.desc}
                          <div className="absolute right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#FF4D00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg>
                          </div>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </section>
      )}

      {/* ── FROM IDEA TO COMPANY, 4 ventures from ventures data ── */}
      {programVentures.length > 0 && (
        <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto bg-white mb-16 relative">
           <div className="mb-16">
             <div className="flex items-center mb-6">
               <span className="text-[#FF4D00] text-[10px] mr-2">&#9679;</span>
               <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1B1C1E]/60">Portfolio</span>
             </div>
              <h2 className="text-3xl sm:text-4xl md:text-[64px] lg:text-[80px] font-display font-medium leading-[0.9] text-[#1B1C1E] uppercase tracking-tighter mb-4">
                 FROM IDEA TO COMPANY
              </h2>
              <p className="text-lg text-[#1B1C1E]/60 max-w-md font-medium leading-relaxed">
                 See the companies that started as just an idea here and grew into category leaders.
              </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {programVentures.map((venture) => venture && (
                 <Link key={venture.id} to={`/ventures/${venture.id}`} className="group block">
                   <div className="relative bg-[#111111] text-white overflow-hidden transition-all duration-200 group-hover:scale-[1.02] group-hover:ring-1 group-hover:ring-[#FF4D00] group-hover:brightness-110">
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
                       <div className="mt-2.5">
                         <span className="inline-block px-2 py-0.5 bg-white/10 text-[9px] font-mono uppercase tracking-widest text-white/70">
                           {venture.vertical}
                         </span>
                       </div>
                     </div>
                     <div className="px-4 pb-3">
                       <p className="text-[11px] text-white/70 leading-relaxed line-clamp-2">
                         {venture.solution}
                       </p>
                     </div>
                     <div className="px-4 pb-4 pt-1">
                       <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block mb-0.5">
                         Anchor Partners
                       </span>
                       <span className="text-[11px] text-white/60 leading-snug line-clamp-1 block">
                         {venture.anchorPartners}
                       </span>
                     </div>
                     <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#FF4D00] flex items-center justify-center font-display font-bold text-sm text-white">
                       {venture.name.charAt(0)}
                     </div>
                   </div>
                 </Link>
              ))}
           </div>
        </section>
      )}

      {/* ── Is for you if ── */}
      {(program.isForYouIf && program.isForYouIf.length > 0) && (
        <section className="py-0">
          <div className="max-w-[1400px] mx-auto bg-[#1B1C1E] text-white px-6 md:px-12 lg:px-20 py-32 lg:py-40 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background Texture" />
            </div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24">
             <div>
                <div className="flex items-center gap-3 mb-10">
                   <div className="tag-polygon text-white/50" />
                   <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">Ideal Candidates</span>
                </div>
                <h2 className="text-4xl lg:text-[60px] leading-[1.1] font-display font-medium">
                  {program.title} is for you if...
                </h2>
             </div>
             
             <div className="space-y-6">
                {program.isForYouIf.map((text, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                     <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-[#FF9CDF]" />
                     </div>
                     <p className="text-lg font-medium">{text}</p>
                  </div>
                ))}
                
                <div className="pt-8">
                   <button className="button relative inline-flex items-center justify-center bg-white text-[#1B1C1E] px-8 py-4 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105 group overflow-hidden border border-white/20 hover:border-transparent">
                     <span className="relative z-10 transition-colors group-hover:text-white">Start your company</span>
                     <div className="button-gradient !opacity-0 group-hover:!opacity-100 transition-opacity" />
                   </button>
                </div>
             </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {(program.faqs && program.faqs.length > 0) && (
        <section id="faq" className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto border-t border-[#1B1C1E]/10">
           <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
                 <div>
                    <div className="flex items-center mb-6">
                      <span className="text-[#FF4D00] text-[10px] mr-2">&#9679;</span>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1B1C1E]/60">FAQ</span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[100px] font-display font-medium uppercase tracking-tighter leading-[0.8] mb-12">ALL YOU NEED<br/>TO KNOW</h2>
                    
                    <button className="inline-flex items-center justify-center bg-[#1B1C1E] text-white px-6 py-4 rounded-full text-sm font-medium hover:bg-black transition-colors">
                       View the full FAQ <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2"><path d="M11 1L17 7M17 7L11 13M17 7H0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                 </div>
              </div>

              <div className="lg:col-span-7 space-y-px bg-[#1B1C1E]/10">
                 {program.faqs.map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="bg-white group cursor-pointer flex flex-col justify-center transition-colors border-b border-transparent"
                    >
                       <div className={`flex justify-between items-center bg-white p-6 transition-colors ${activeFaq === idx ? 'bg-[#FAFAFA]' : 'hover:bg-[#FAFAFA]'}`}>
                          <h3 className="text-[17px] font-medium text-[#1B1C1E]">{item.q}</h3>
                          <div className="w-8 h-8 flex items-center justify-center transition-all">
                             {activeFaq === idx ? <Minus className="w-5 h-5 text-[#1B1C1E]" /> : <Plus className="w-5 h-5 text-[#1B1C1E]/60 group-hover:text-[#1B1C1E]" />}
                          </div>
                       </div>
                       <AnimatePresence>
                          {activeFaq === idx && (
                             <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden bg-[#FAFAFA] px-6"
                             >
                                <div className="text-[#1B1C1E]/70 text-[15px] leading-relaxed pb-6 max-w-2xl">
                                   <p>{item.a}</p>
                                </div>
                             </motion.div>
                          )}
                       </AnimatePresence>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      )}
      
      {/* ── Build the exceptional today Footer Banner ── */}
      <section>
         <div className="max-w-[1400px] mx-auto relative h-[800px] flex items-center justify-center overflow-hidden rounded-sm">
            <div className="absolute inset-0 bg-[#1B1C1E]">
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Build" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
            </div>
            <div className="relative z-10 text-center space-y-12">
               <h2 className="text-3xl sm:text-5xl md:text-[80px] lg:text-[120px] font-display font-medium text-white uppercase leading-[0.9] tracking-tighter">
                  BUILD THE <br /> EXCEPTIONAL <br /> TODAY AND <br /> LAUNCH NOW
               </h2>
               <button onClick={openApplyModal} className="button relative inline-flex items-center justify-center bg-white text-[#1B1C1E] px-12 py-5 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105 group overflow-hidden rounded-md">
                  <span className="relative z-10 transition-colors group-hover:text-white">Apply</span>
                  <div className="button-gradient !opacity-0 group-hover:!opacity-100 transition-opacity" />
               </button>
            </div>
         </div>
      </section>

      {/* ── APPLICATION MODAL ── */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget && !applySubmitting) setShowApplyModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#111111] text-white rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-[#111111] flex items-center justify-between px-8 pt-8 pb-4 border-b border-white/10">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4D00] mb-1">APPLICATION</p>
                  <h2 className="text-2xl font-display font-medium uppercase tracking-tighter">
                    Apply to {program.title}
                  </h2>
                </div>
                <button
                  onClick={() => { if (!applySubmitting) setShowApplyModal(false); }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success state */}
              {applySuccess ? (
                <div className="px-8 py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FF4D00]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#FF4D00]" />
                  </div>
                  <h3 className="text-2xl font-display font-medium mb-3 uppercase tracking-tighter">Application Submitted</h3>
                  <p className="text-white/60 leading-relaxed mb-8">
                    Your application to {program.title} has been received. We&apos;ll review it and get back to you soon.
                  </p>
                  <button
                    onClick={() => { setShowApplyModal(false); setApplySuccess(false); setApplyForm({ firstName: "", lastName: "", email: "", phone: "", linkedinUrl: "", location: "", currentRole: "", companyName: "", motivation: "", referral: "" }); }}
                    className="inline-flex items-center justify-center bg-[#FF4D00] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#E54300] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleApplySubmit} className="px-8 py-6 space-y-5">
                  {/* Error message */}
                  {applyError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
                      {applyError}
                    </div>
                  )}

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={applyForm.firstName}
                        onChange={(e) => setApplyForm({ ...applyForm, firstName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={applyForm.lastName}
                        onChange={(e) => setApplyForm({ ...applyForm, lastName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      value={applyForm.linkedinUrl}
                      onChange={(e) => setApplyForm({ ...applyForm, linkedinUrl: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                      placeholder="https://linkedin.com/in/janedoe"
                    />
                  </div>

                  {/* Location + Current Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Location</label>
                      <input
                        type="text"
                        value={applyForm.location}
                        onChange={(e) => setApplyForm({ ...applyForm, location: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                        placeholder="Lagos, Nigeria"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Current Role</label>
                      <input
                        type="text"
                        value={applyForm.currentRole}
                        onChange={(e) => setApplyForm({ ...applyForm, currentRole: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={applyForm.companyName}
                      onChange={(e) => setApplyForm({ ...applyForm, companyName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>

                  {/* Motivation */}
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Why do you want to join? (Motivation)</label>
                    <textarea
                      rows={4}
                      value={applyForm.motivation}
                      onChange={(e) => setApplyForm({ ...applyForm, motivation: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors resize-none"
                      placeholder="Tell us why you want to join this program..."
                    />
                  </div>

                  {/* Referral */}
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Referral Code</label>
                    <input
                      type="text"
                      value={applyForm.referral}
                      onChange={(e) => setApplyForm({ ...applyForm, referral: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors"
                      placeholder="Optional referral code"
                    />
                  </div>

                  {/* Program slug indicator */}
                  <div className="flex items-center gap-2 text-white/30 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
                    <span>Applying to: <span className="text-[#FF4D00]">{id}</span></span>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={applySubmitting || !applyForm.firstName || !applyForm.lastName || !applyForm.email}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FF4D00] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#E54300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {applySubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
