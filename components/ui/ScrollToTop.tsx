"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { lenisInstance } from "@/components/providers/SmoothScroll";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 rounded-none border border-line bg-ink/90 px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-cream shadow-2xl backdrop-blur-md transition-all hover:border-emerald-glow hover:text-emerald-glow active:scale-95"
      aria-label="Scroll back to top"
    >
      <ArrowUp className="h-3.5 w-3.5 text-emerald-glow" />
      <span>TOP</span>
    </button>
  );
}
