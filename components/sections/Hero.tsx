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
      // Fade title out ONLY at the very end of the 300vh hero section exit
      gsap.to(titleRef.current, {
        opacity: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "75% top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="top" className="relative h-[300vh]">
      <div ref={stickyRef} className="sticky top-0 h-[100dvh] overflow-hidden">
        <HeroScrub triggerRef={sectionRef} />

        {/* Ambient background contrast shadow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />

        <div
          ref={titleRef}
          className="will-transform relative z-10 flex h-full flex-col items-center justify-center px-6 pt-[28vh] text-center sm:pt-[32vh]"
        >
          <motion.p
            className="eyebrow mb-4 text-emerald-400 font-semibold tracking-[0.25em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            PORTFOLIO — 2026
          </motion.p>

          <KineticText
            text="JOSHUA WAYMAN A. ARABEJO"
            className="display justify-center text-[10.5vw] font-extrabold leading-[0.86] text-[#FFFDF7] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] sm:text-[8vw] lg:text-[6.5vw]"
          />

          <motion.p
            className="mt-6 max-w-xl text-balance text-sm font-semibold text-[#F0F2F5] drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] sm:mt-8 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            Aspiring Full-Stack Developer crafting modern, scalable, and
            user-focused digital experiences.
          </motion.p>

          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-3 sm:bottom-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            aria-hidden
          >
            <span className="eyebrow text-[0.55rem] text-emerald-400 font-semibold tracking-widest drop-shadow">Scroll</span>
            <span className="block h-12 w-px overflow-hidden bg-line">
              <motion.span
                className="block h-4 w-px bg-emerald-glow"
                animate={{ y: [0, 48] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
