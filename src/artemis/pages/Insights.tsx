"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { insightsData } from "@/artemis/data/insights";

const categories = ["All", ...new Set(insightsData.map((i) => i.category))];

/* ── Read time calculator ── */
function getReadTime(content: string[]): number {
  return Math.max(3, Math.ceil(content.join(" ").split(" ").length / 200));
}

/* ── Cover images per category ── */
const categoryImages: Record<string, string> = {
  Energy: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  Water: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=800&q=80",
  "Food Systems": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
  Infrastructure: "https://images.unsplash.com/photo-1565792323902-486ad4b6a110?auto=format&fit=crop&w=800&q=80",
  Capital: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  Ventures: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
  Community: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  Manufacturing: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80",
  Mobility: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
  "AI & Data": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  Space: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
  Policy: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
};

/* ══════════════════════════════════════════════════════════════════════════
   INSIGHTS PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? insightsData
      : insightsData.filter((a) => a.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="bg-white text-[#111111]">
      <CategoryFilter
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {featured && <FeaturedArticle article={featured} />}

      {rest.length > 0 && (
        <ArticleGrid articles={rest} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CATEGORY FILTER
   ══════════════════════════════════════════════════════════════════════════ */
function CategoryFilter({
  activeCategory,
  onChange,
}: {
  activeCategory: string;
  onChange: (cat: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-6 md:py-8 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-[#FAFAFA]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`px-4 py-2.5 text-[11px] font-mono font-bold tracking-[0.12em] uppercase transition-all border min-h-[44px] ${
                activeCategory === cat
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/30 hover:text-[#111111]/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FEATURED ARTICLE, Large hero card
   ══════════════════════════════════════════════════════════════════════════ */
function FeaturedArticle({ article }: { article: typeof insightsData[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const imgSrc =
    article.imageCover ||
    article.image ||
    categoryImages[article.category] ||
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80";

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            to={`/insights/${article.id}`}
            className="group block"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Image */}
              <div className="lg:col-span-7 overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img
                    src={imgSrc}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 border border-[#FF4D00]/30 text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
                    {article.category}
                  </span>
                  <span className="px-3 py-1 border border-[#111111]/10 text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
                    Featured
                  </span>
                  <span className="px-3 py-1 border border-[#111111]/10 text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
                    {getReadTime(article.content)} min read
                  </span>
                </div>

                <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-display font-medium tracking-tight leading-[1.1] mb-6 group-hover:text-[#FF4D00] transition-colors">
                  {article.title}
                </h2>

                <p className="text-[16px] md:text-[18px] text-[#111111]/55 font-medium leading-[1.7] mb-8">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center font-display text-sm">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold tracking-tight">
                        {article.author}
                      </div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/35">
                        {article.date}
                      </div>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-[#111111]/10 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] transition-all text-[#111111]/40">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ARTICLE GRID, 3-col cards
   ══════════════════════════════════════════════════════════════════════════ */
function ArticleGrid({ articles }: { articles: typeof insightsData }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-[#FAFAFA]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: typeof insightsData[0] }) {
  const imgSrc =
    article.image ||
    categoryImages[article.category] ||
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80";

  return (
    <Link to={`/insights/${article.id}`} className="group block">
      <div className="border border-[#111111]/10 bg-white hover:border-[#FF4D00]/30 transition-all overflow-hidden">
        {/* Image */}
        <div className="aspect-[16/10] relative overflow-hidden">
          <img
            src={imgSrc}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
              {article.category}
            </span>
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/50">
              {getReadTime(article.content)} min
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="text-[18px] md:text-[20px] font-display font-medium tracking-tight leading-[1.25] mb-3 group-hover:text-[#FF4D00] transition-colors">
            {article.title}
          </h3>

          <p className="text-[13px] md:text-[14px] text-[#111111]/50 font-medium leading-[1.6] mb-5 line-clamp-3">
            {article.summary}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[#111111]/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#111111] text-white flex items-center justify-center font-display text-[10px]">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-tight">
                  {article.author}
                </div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-[#111111]/30">
                  {article.date}
                </div>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-[#111111]/20 group-hover:text-[#FF4D00] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}
