"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { lenisInstance } from "@/components/providers/SmoothScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Real biography photo — always valid, so first paint never shows a broken image. */
const FALLBACK_AVATAR = "/media/closer-still.jpg";
/** Preferred avatar — drop me.jpg or me.png into /public/media to use it here instead. */
const PREFERRED_AVATARS = ["/media/me.jpg", "/media/me.png"];

const NAV_ITEMS = [
  {  label: "Home", id: "top" },
  {  label: "Work", id: "projects" },
  {  label: "About", id: "about" },
  {  label: "Contact", id: "contact" },
];

/** Non-sticky top bar — scrolls away with the page, never pins. */
export function Header() {
  const [avatarSrc, setAvatarSrc] = useState(FALLBACK_AVATAR);
  const [active, setActive] = useState(NAV_ITEMS[0].id);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Preload candidates off-DOM so a missing me.jpg/me.png never flashes a
    // broken <img> — SSR would otherwise request it before React hydrates
    // and attaches onError, losing the failure event entirely.
    let cancelled = false;
    (async () => {
      for (const candidate of PREFERRED_AVATARS) {
        const found = await new Promise<boolean>((resolve) => {
          const probe = new Image();
          probe.onload = () => resolve(true);
          probe.onerror = () => resolve(false);
          probe.src = candidate;
        });
        if (cancelled) return;
        if (found) {
          setAvatarSrc(candidate);
          return;
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const targets = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(topMost.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisInstance) {
      lenisInstance.scrollTo(el, { duration: 1.5 });
    } else {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <header>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <a href="#top" onClick={handleNavClick("top")} aria-label="Back to top">
          <img
            src={avatarSrc}
            alt="Joshua Wayman A. Arabejo"
            className="h-10 w-10 rounded-full border border-line object-cover sm:h-11 sm:w-11"
          />
        </a>

        <nav
          aria-label="Primary"
          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest sm:gap-8 sm:text-xs"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick(item.id)}
                className="relative flex items-center gap-1.5 pb-1"
              >
                
                <span
                  className={
                    isActive
                      ? "text-cream"
                      : "text-cream-dim transition-colors duration-300 hover:text-cream"
                  }
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="header-nav-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-cream"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cream-dim sm:text-xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-glow" />
          </span>
          <span className="hidden sm:inline">Available</span>
        </div>
      </div>
    </header>
  );
}
