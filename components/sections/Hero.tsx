"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { KineticText } from "@/components/ui/KineticText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsPhoneClass } from "@/hooks/useIsPhoneClass";

gsap.registerPlugin(ScrollTrigger);

const HeroScrub = dynamic(
  () => import("@/components/canvas/HeroScrub").then((m) => m.HeroScrub),
  { ssr: false }
);

/**
 * Hero section.
 *
 * Desktop + tablet (iPad and similar): 300vh pinned scroll-scrub — the
 *          video orbits as you scroll. iPad reports as "MacIntel" with
 *          multi-touch under iPadOS, so it's detected via touch points
 *          rather than user-agent string alone (see useIsPhoneClass).
 * Phone:   100vh normal section — video autoplays as ambient background.
 *          620vh of dead-zone scrolling (hero 300vh + pillars 320vh) is
 *          terrible on small touch screens — swipes blow through it in
 *          seconds, and there's no room to see the orbit progress anyway.
 *
 * Both this component and HeroScrub must agree on phone-vs-not, or the
 * section height (300vh vs 100vh) and the video mode (scrub vs autoplay)
 * fall out of sync — so the classification is computed once here and
 * passed down, instead of each component detecting it independently.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const phone = useIsPhoneClass();

  // Desktop/tablet only: title drifts up/fades during the 300vh scrub.
  useEffect(() => {
    if (reduced || phone) return;
    const ctx = gsap.context(() => {
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
  }, [reduced, phone]);

  return (
    <section
      ref={sectionRef}
      id="top"
      // Desktop/tablet: 300vh for scroll-scrub. Phone: 100vh normal section.
      className={phone ? "relative h-screen" : "relative h-[300vh]"}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroScrub triggerRef={sectionRef} phone={phone} />

        {/* Emerald edge vignette */}
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
            Aspiring Full-Stack Dev &amp; UI UX Designer crafting modern, scalable, and
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
