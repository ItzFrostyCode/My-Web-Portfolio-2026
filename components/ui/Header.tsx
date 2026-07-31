"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const FALLBACK_AVATAR = "/media/closer-still.jpg";
const PREFERRED_AVATARS = ["/media/me.jpg", "/media/me.png"];

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [avatarSrc, setAvatarSrc] = useState(FALLBACK_AVATAR);
  const pathname = usePathname();

  useEffect(() => {
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

  return (
    <>
      {/* Desktop Top Header */}
      <header className="relative z-40 border-b border-line bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" aria-label="Home page">
            <img
              src={avatarSrc}
              alt="Joshua Wayman A. Arabejo"
              className="h-10 w-10 rounded-full border border-line object-cover sm:h-11 sm:w-11 transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Page Route Nav */}
          <nav
            aria-label="Primary Desktop"
            className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center gap-1.5 pb-1"
                >
                  <span
                    className={
                      isActive
                        ? "text-cream font-bold"
                        : "text-cream-dim transition-colors duration-300 hover:text-cream"
                    }
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="header-nav-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-emerald-glow"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cream-dim sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-glow" />
            </span>
            <span>Available</span>
          </div>
        </div>
      </header>

      {/* Floating Mobile Page Dock Navigation */}
      <nav
        aria-label="Primary Mobile Navigation"
        className="md:hidden fixed bottom-4 inset-x-4 z-50 flex items-center justify-around rounded-full border border-emerald-glow/40 bg-ink-soft/95 backdrop-blur-xl px-2 py-1.5 shadow-2xl"
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-11 items-center justify-center rounded-full px-4 font-mono text-[0.7rem] uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-emerald-glow text-ink font-bold shadow-md"
                  : "text-cream-dim hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
