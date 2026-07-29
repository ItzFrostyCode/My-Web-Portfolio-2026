"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CinematicImageProps {
  src: string;
  label: string;
  className?: string;
}

/**
 * Full-bleed cinematic photo reveal — same clip-path treatment as
 * CinematicVideo, for cards backed by a static shot instead of a loop.
 * Falls back to an emerald-lit placeholder if the image is missing.
 */
export function CinematicImage({ src, label, className }: CinematicImageProps) {
  const [missing, setMissing] = useState(false);

  return (
    <motion.div
      initial={{ clipPath: "inset(12% 6% 12% 6% round 12px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "will-transform relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-ink-soft",
        className
      )}
    >
      {!missing ? (
        <img
          src={src}
          alt={label}
          onError={() => setMissing(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),rgba(5,5,5,1)_70%)]">
          <span className="eyebrow">{label} — coming soon</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
    </motion.div>
  );
}
