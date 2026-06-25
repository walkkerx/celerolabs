"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "../router";
import { ArrowRight } from "lucide-react";
import { insightsData } from "../data/insights";

interface ReviewSectionProps {
  title?: string;
  backgroundColor?: string;
}

const categoryColor: Record<string, string> = {
  Energy: "text-[#FF4D00]",
  "Food Systems": "text-green-500",
  Infrastructure: "text-white/70",
  Capital: "text-amber-400",
};

const categoryDot: Record<string, string> = {
  Energy: "bg-[#FF4D00]",
  "Food Systems": "bg-green-500",
  Infrastructure: "bg-white/40",
  Capital: "bg-amber-400",
};

function getCatColor(category: string): string {
  return categoryColor[category] || "text-white/50";
}

function getCatDot(category: string): string {
  return categoryDot[category] || "bg-white/30";
}

export function ReviewSection({
  title = "Dispatches from the field",
  backgroundColor,
}: ReviewSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const featured = insightsData[0];
  const rest = insightsData.slice(1, 4);

  return (
    <section
      ref={ref}
      className="py-3 md:py-4"
    >
      <div className="w-full max-w-[1400px] mx-auto bg-[#0A0A0A] text-white rounded-sm overflow-hidden">
        {/* ── Header row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-10 md:pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-4 block">
              Field Notes
            </span>
            <h2 className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.02em] leading-[0.95]">
              {title}
            </h2>
          </div>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-white/40 hover:text-[#FF4D00] transition-colors group flex-shrink-0"
          >
            All dispatches
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── Featured: cinematic hero image with overlay ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="px-6 md:px-12 lg:px-20"
        >
          <Link
            to={`/insights/${featured.id}`}
            className="group block relative overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-[16/7] md:aspect-[16/6] lg:aspect-[21/7]">
              <img
                src={
                  featured.imageCover ||
                  featured.image ||
                  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80"
                }
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-transparent" />
            </div>

            {/* Text overlay, pinned to bottom-left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${getCatDot(featured.category)}`} />
                <span className={`text-[10px] font-mono font-bold tracking-[0.15em] uppercase ${getCatColor(featured.category)}`}>
                  {featured.category}
                </span>
                <span className="text-white/20 mx-2">|</span>
                <span className="text-[10px] font-mono tracking-[0.08em] text-white/30">
                  {featured.author}
                </span>
              </div>
              <h3 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-display font-medium tracking-tight leading-[1.1] mb-4 max-w-3xl group-hover:text-[#FF4D00] transition-colors">
                {featured.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-white/50 font-medium leading-[1.6] max-w-xl line-clamp-2">
                {featured.summary}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* ── Secondary: clean text rows ── */}
        <div className="px-6 md:px-12 lg:px-20 mt-2">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: "easeOut" }}
            >
              <Link
                to={`/insights/${post.id}`}
                className="group block py-6 md:py-8 border-t border-white/8 hover:border-white/15 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  {/* Thumbnail */}
                  <div className="w-full md:w-[200px] lg:w-[260px] shrink-0 aspect-[16/9] md:aspect-[3/2] overflow-hidden bg-white/5">
                    <img
                      src={
                        post.image ||
                        post.imageCover ||
                        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${getCatDot(post.category)}`} />
                      <span className={`text-[9px] font-mono font-bold tracking-[0.15em] uppercase ${getCatColor(post.category)}`}>
                        {post.category}
                      </span>
                      <span className="text-white/15 mx-1">|</span>
                      <span className="text-[9px] font-mono tracking-[0.08em] text-white/25">
                        {post.author} &middot; {post.date}
                      </span>
                    </div>
                    <h3 className="text-[18px] md:text-[22px] lg:text-[26px] font-display font-medium tracking-tight leading-[1.2] mb-3 group-hover:text-[#FF4D00] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-white/40 font-medium leading-[1.6] line-clamp-2 max-w-xl">
                      {post.summary}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 shrink-0 border border-white/10 text-white/20 group-hover:border-[#FF4D00] group-hover:text-[#FF4D00] transition-colors mt-1">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom padding */}
        <div className="h-16 md:h-24" />
      </div>
    </section>
  );
}
