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

  // Focus input when modal opens, and control body scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset query when search result is clicked
  const handleResultClick = () => {
    setQuery("");
    onClose();
  };

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

    const matchedPages = staticPages.filter(p => 
      p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    );

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
          className="fixed inset-0 z-[100] bg-[#FAFAFA]/95 backdrop-blur-xl flex flex-col"
        >
          <div className="w-full flex justify-end p-6 md:p-8">
            <button onClick={onClose} className="p-3 bg-[#111111] text-white hover:bg-[#FF4D00] transition-colors group">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 w-full max-w-4xl mx-auto px-6 flex flex-col">
            <div className="relative mb-8 border-b-2 border-[#111111] group">
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-[#111111]/40 group-focus-within:text-[#FF4D00] transition-colors" />
              <input 
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ventures, insights, pages..."
                className="w-full bg-transparent text-3xl md:text-5xl font-display font-medium tracking-tight placeholder:text-[#111111]/20 outline-none py-8 pl-16 text-[#111111]"
              />
            </div>
            
            <div className="flex-1 overflow-y-auto pb-24">
              {query.trim() && currentResults.length === 0 && (
                <div className="text-[#111111]/50 font-medium text-lg">
                  No results found for &quot;{query}&quot;.
                </div>
              )}
              
              {currentResults.length > 0 && (
                <div className="flex flex-col">
                  {currentResults.map((result) => (
                    <Link
                      key={result.id} 
                      to={result.path}
                      onClick={handleResultClick}
                      className="group py-6 border-b border-[#111111]/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#111111]/[0.02] transition-colors -mx-6 px-6"
                    >
                      <div>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-[#FF4D00] mb-2">
                          {result.type}
                        </div>
                        <h3 className="text-2xl font-display font-medium text-[#111111] group-hover:text-[#FF4D00] transition-colors mb-2">
                          {result.title}
                        </h3>
                        <p className="text-[#111111]/60 font-medium line-clamp-1 max-w-2xl text-sm">
                          {result.desc}
                        </p>
                      </div>
                      <div className="w-10 h-10 border border-[#111111]/10 flex items-center justify-center bg-white group-hover:bg-[#111111] group-hover:border-[#111111] group-hover:text-white transition-colors shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
