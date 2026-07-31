"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { KineticText } from "@/components/ui/KineticText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const HeroScrub = dynamic(
  () => import("@/components/canvas/HeroScrub").then((m) => m.HeroScrub),
  { ssr: false }
);

/**
 * Pinned, scroll-scrubbed hero:
 * 300vh scroll distance drives one full 360° orbit of the hero video.
 * Massive kinetic typography reveals letter-by-letter on load.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Title remains steady on scroll (no drift or transparency fade)

  return (
    <section ref={sectionRef} id="top" className="relative h-[300vh]">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <HeroScrub triggerRef={sectionRef} />

        {/* Emerald edge vignette — dims the backlight across the whole frame, not just edges */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.35)_0%,rgba(5,5,5,0.45)_45%,rgba(5,5,5,0.9)_100%)]" />

        <div
          ref={titleRef}
          className="will-transform relative z-10 flex h-full flex-col items-center justify-end sm:justify-center px-4 sm:px-6 pt-16 sm:pt-0 pb-16 sm:pb-8 text-center mt-[50px] sm:mt-[200px]"
        >
          <motion.p
            className="eyebrow mb-3 sm:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Portfolio — 2026
          </motion.p>

          <KineticText
            text="JOSHUA WAYMAN A. ARABEJO"
            className="display justify-center text-[9.5vw] leading-[0.88] text-cream sm:text-[8vw] lg:text-[6.5vw]"
          />

          <motion.p
            className="mt-6 max-w-xl text-balance text-sm text-cream [text-shadow:0_2px_10px_rgba(0,0,0,0.85)] sm:text-base font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            BSIT Student &amp; UI/UX Web Developer passionate about bringing modern web applications, interactive interfaces, and custom digital tools to life.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            <span className="rounded-full border border-line bg-ink-soft/90 backdrop-blur-md px-3.5 py-1.5 text-cream-dim transition-colors hover:border-emerald-glow/40 hover:text-cream">
              UI/UX &amp; Prototyping
            </span>
            <span className="rounded-full border border-line bg-ink-soft/90 backdrop-blur-md px-3.5 py-1.5 text-cream-dim transition-colors hover:border-emerald-glow/40 hover:text-cream">
              Web Application Development
            </span>
            <span className="rounded-full border border-line bg-ink-soft/90 backdrop-blur-md px-3.5 py-1.5 text-cream-dim transition-colors hover:border-emerald-glow/40 hover:text-cream">
              Custom Systems &amp; Portals
            </span>
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            aria-hidden
          >
            <span className="eyebrow text-[0.55rem]">Scroll</span>
            <span className="block h-10 w-px overflow-hidden bg-line">
              <motion.span
                className="block h-4 w-px bg-emerald-glow"
                animate={{ y: [0, 40] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
