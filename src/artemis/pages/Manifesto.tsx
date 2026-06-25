"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ReviewSection } from "@/artemis/components/ReviewSection";

/* ── Animated paragraph wrapper ── */
function AnimatedParagraph({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Reading progress bar ── */
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-[#FF4D00] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function Manifesto() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <div className="bg-[#FAFAFA] text-[#111111]">
      <ReadingProgressBar />

      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
        <div ref={heroRef} className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-[36px] sm:text-[60px] md:text-[90px] leading-[0.9] font-display font-medium tracking-tight mb-12 uppercase">
              The<br />Manifesto.
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-[#111111]/60 font-medium max-w-xl text-balance">
              We are not incrementalists. We are systematic maximalists. We build the architecture for the next wave of human progress.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="h-[40vh] md:h-[60vh] w-full overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80" 
              alt="Systematic Architecture" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="w-full max-w-3xl mx-auto space-y-32">
          
          <div className="border-t border-[#111111]/10 pt-8">
            <AnimatedParagraph delay={0}>
              <div className="text-[11px] font-mono tracking-widest uppercase mb-8 text-[#FF4D00]">01. The Model is Broken</div>
            </AnimatedParagraph>
            <AnimatedParagraph delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-tight mb-8">Centralized, extractive, myopic.</h2>
            </AnimatedParagraph>
            <div className="text-[#111111]/70 font-medium leading-[1.8] space-y-6 text-lg">
              <AnimatedParagraph delay={0.15}>
                <p>
                  The dominant model of global innovation is broken. For decades, &quot;critical technologies&quot; have been defined by narrow geopolitical interests, focused on supremacy in defense, aerospace, and computing. 
                </p>
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.2}>
                <p>
                  These models hoard genius in a handful of elite cities, while treating the rest of the world, particularly the Global South, as a market for consumption or an arena for extraction.
                </p>
              </AnimatedParagraph>
            </div>
          </div>

          <div className="border-t border-[#111111]/10 pt-8">
            <AnimatedParagraph delay={0}>
              <div className="text-[11px] font-mono tracking-widest uppercase mb-8 text-[#FF4D00]">02. The Self-Reliance Mandate</div>
            </AnimatedParagraph>
            <AnimatedParagraph delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-tight mb-8">True self-reliance is technological.</h2>
            </AnimatedParagraph>
            <div className="text-[#111111]/70 font-medium leading-[1.8] space-y-6 text-lg">
              <AnimatedParagraph delay={0.15}>
                <p>
                  We reject the centralized, elitist models that hoard opportunity. We champion a world where a coder in Niamey can spark a startup with a financier in Tokyo. Where a biotech breakthrough in São Paulo scales faster than an app in Silicon Valley.
                </p>
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.2}>
                <p>
                  Under xHansa, we recognize that true self-reliance is not just political; it is technological. It is the ability to generate electricity, secure food, purify water, and defend networks on one's own terms. Independent agile manufacturing.
                </p>
              </AnimatedParagraph>
            </div>
          </div>

          <div className="border-t border-[#111111]/10 pt-8">
            <AnimatedParagraph delay={0}>
              <div className="text-[11px] font-mono tracking-widest uppercase mb-8 text-[#FF4D00]">03. Systematic Maximalism</div>
            </AnimatedParagraph>
            <AnimatedParagraph delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-tight mb-8">Deep-tech architecture.</h2>
            </AnimatedParagraph>
            <div className="text-[#111111]/70 font-medium leading-[1.8] space-y-6 text-lg">
              <AnimatedParagraph delay={0.15}>
                <p>
                  xCelero represents a systemic rewrite of how critical innovation is funded, built, and deployed. We do not do &quot;apps for convenience.&quot; We do deep-tech infrastructure. We do Civilizational Flow.
                </p>
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.2}>
                <p>
                  This is not a manifesto of hope; it is a declaration of intent. Welcome to the engine of the next civilization.
                </p>
              </AnimatedParagraph>
            </div>
          </div>

        </div>
      </section>
      <ReviewSection />
    </div>
  );
}
