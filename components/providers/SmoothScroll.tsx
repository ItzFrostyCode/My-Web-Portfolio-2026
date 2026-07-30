"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export let lenisInstance: Lenis | null = null;

/**
 * Single source of truth for scrolling:
 * Lenis handles smooth wheel scrolling on desktop while preserving
 * native 60/120Hz touch scrolling on mobile without touch-fighting glitches.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // On mobile touch devices, let native smooth touch momentum scroll run cleanly
      ...(isTouch ? { touchMultiplier: 0 } : {}),
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Standard GSAP lag smoothing to gracefully handle frame dips without snapping
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}

