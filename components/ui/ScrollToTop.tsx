"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { lenisInstance } from "@/components/providers/SmoothScroll";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Hide ScrollToTop button whenever a preview modal or dialog is active
      const isModalOpen =
        document.body.style.overflow === "hidden" ||
        document.querySelector('[role="dialog"]') !== null ||
        document.querySelector('[data-lenis-prevent="true"]') !== null;

      if (isModalOpen) {
        setVisible(false);
        return;
      }

      const currentPath = pathnameRef.current;
      if (currentPath === "/") {
        const projectsEl = document.getElementById("projects");
        if (projectsEl) {
          const top = projectsEl.getBoundingClientRect().top + window.scrollY;
          setVisible(window.scrollY >= top - 200);
        } else {
          setVisible(window.scrollY > 1200);
        }
      } else {
        setVisible(window.scrollY > 300);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Observe body style changes to hide/show button instantly on modal toggle
    const observer = new MutationObserver(() => {
      handleScroll();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style", "class"] });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-1.5 rounded-none border border-line bg-ink/90 px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-cream shadow-2xl backdrop-blur-md transition-all hover:border-emerald-glow hover:text-emerald-glow active:scale-95"
      aria-label="Scroll back to top"
    >
      <ArrowUp className="h-3.5 w-3.5 text-emerald-glow" />
      <span>TOP</span>
    </button>
  );
}
