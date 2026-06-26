"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { insightsData } from "../data/insights";
import { companiesData } from "../data/companies";
import { programsData } from "../data/programs";
import { motion, AnimatePresence } from "framer-motion";

const staticPages = [
  { id: "manifesto", title: "The Manifesto", path: "/manifesto", type: "Page", desc: "Systematic maximalists building the architecture for the next wave." },
  { id: "approach", title: "Approach", path: "/approach", type: "Page", desc: "We back founders who go unreasonably deep to get their beginnings right." },
  { id: "infrastructure", title: "Infrastructure", path: "/infrastructure", type: "Page", desc: "Production-method architecture — the shared infrastructure layer for 5,000 ventures." },
  { id: "routes", title: "The Routes", path: "/routes", type: "Page", desc: "A covenant to restore flow globally across 19 cities." },
  { id: "programs", title: "Programs", path: "/programs", type: "Page", desc: "High-intensity pathways for civilizational architects and founders." },
  { id: "insights", title: "Insights", path: "/insights", type: "Page", desc: "News, dispatches, and perspectives from the frontier of civilizational technology." },
  { id: "ventures", title: "Our Ventures", path: "/ventures", type: "Page", desc: "We back builders tackling civilization-level challenges." },
  { id: "careers", title: "Careers", path: "/careers", type: "Page", desc: "Join the ventures shaping Africa's infrastructure. Open roles across portfolio companies." },
  { id: "join", title: "Join xCelero Labs", path: "/join", type: "Page", desc: "Apply to join the xCelero network as a founder, investor, partner, or talent." },
];

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleResultClick = () => { setQuery(""); onClose(); };

  const results = () => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matchedInsights = insightsData.filter(i =>
      i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    ).map(i => ({ id: `insight-${i.id}`, type: "Insight", path: `/insights/${i.id}`, title: i.title, desc: i.summary }));
    const matchedVentures = companiesData.filter(c =>
      c.name.toLowerCase().includes(q) || c.focus.toLowerCase().includes(q) || c.field.toLowerCase().includes(q)
    ).map(c => ({ id: `venture-${c.id}`, type: "Venture", path: `/ventures/${c.id}`, title: c.name, desc: c.focus }));
    const matchedPrograms = programsData.filter(p =>
      p.title.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    ).map(p => ({ id: `program-${p.id}`, type: "Program", path: `/programs/${p.id}`, title: p.title, desc: p.tagline }));
    const matchedPages = staticPages.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    return [...matchedPages, ...matchedPrograms, ...matchedVentures, ...matchedInsights];
  };

  const currentResults = results();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-xl flex items-start justify-center pt-[10vh] md:pt-[15vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors z-10"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Search card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl mx-4 bg-[#111111] rounded-2xl overflow-hidden shadow-2xl border border-white/8"
          >
            {/* Search input */}
            <div className="relative border-b border-white/8">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ventures, insights, pages..."
                className="w-full bg-transparent text-[20px] md:text-[24px] font-display font-medium placeholder:text-white/20 outline-none py-5 pl-14 pr-4 text-white"
              />
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto scrollbar-thin [scrollbar-color:rgba(255,77,0,0.3)_transparent]">
              {query.trim() && currentResults.length === 0 && (
                <div className="text-white/30 font-medium text-[15px] py-12 text-center">
                  No results for &quot;{query}&quot;
                </div>
              )}

              {currentResults.length > 0 && (
                <div className="py-2">
                  {currentResults.map((result) => (
                    <Link
                      key={result.id}
                      to={result.path}
                      onClick={handleResultClick}
                      className="group flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] uppercase font-mono tracking-[0.15em] text-[#FF4D00] mb-1">
                          {result.type}
                        </div>
                        <h3 className="text-[15px] font-display font-medium text-white/90 group-hover:text-white transition-colors mb-0.5 truncate">
                          {result.title}
                        </h3>
                        <p className="text-white/40 text-[12px] line-clamp-1">
                          {result.desc}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {!query.trim() && (
                <div className="py-8 px-5">
                  <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/20 mb-3">Try searching for</p>
                  <div className="flex flex-wrap gap-2">
                    {["ventures", "energy", "capital", "programs", "routes"].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 text-[11px] font-medium text-white/50 border border-white/10 rounded-full hover:border-white/25 hover:text-white/80 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
