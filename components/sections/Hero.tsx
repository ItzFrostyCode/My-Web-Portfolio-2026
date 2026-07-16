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

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Title drifts up and fades as the orbit plays out.
      gsap.to(titleRef.current, {
        yPercent: -28,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="top" className="relative h-[300vh]">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <HeroScrub triggerRef={sectionRef} />

        {/* Emerald edge vignette — dims the backlight across the whole frame, not just edges */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.35)_0%,rgba(5,5,5,0.45)_45%,rgba(5,5,5,0.9)_100%)]" />

        <div
          ref={titleRef}
          className="will-transform relative z-10 flex h-full flex-col items-center justify-center px-6 pt-[32vh] text-center"
        >
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Portfolio — 2026
          </motion.p>

          <KineticText
            text="JOSHUA WAYMAN A. ARABEJO"
            className="display justify-center text-[11vw] leading-[0.86] text-cream sm:text-[8vw] lg:text-[6.5vw]"
          />

          <motion.p
            className="pointer-events-none mt-8 max-w-xl text-balance text-sm text-cream [text-shadow:0_2px_10px_rgba(0,0,0,0.85)] sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            Aspiring Full-Stack Dev & UI UX Designer crafting modern, scalable, and
            user-focused digital experiences.
          </motion.p>

          <motion.div
            className="pointer-events-none absolute bottom-10 z-20 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            aria-hidden
          >
            <span className="eyebrow text-[0.55rem]">Scroll</span>
            <span className="relative block h-[clamp(28px,6vh,48px)] w-px overflow-hidden bg-line">
              <motion.span
                className="absolute left-0 top-0 h-4 w-px bg-emerald-glow"
                animate={{ top: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
