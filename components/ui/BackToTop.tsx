"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { lenisInstance } from "@/components/providers/SmoothScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Shows once the hero (id="top") has scrolled fully out of view — i.e. the moment the 2nd section takes over. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-line bg-ink-soft px-4 py-3 font-mono text-xs uppercase tracking-widest text-cream shadow-lg shadow-black/40 transition-colors duration-300 hover:border-emerald-glow/50 hover:text-emerald-glow"
        >
          <ArrowUp size={14} />
          Top
        </motion.button>
      )}
    </AnimatePresence>
  );
}
