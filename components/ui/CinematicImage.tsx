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
 * Full-bleed cinematic photo reveal for cards backed by a static shot.
 */
export function CinematicImage({ src, label, className }: CinematicImageProps) {
  const [missing, setMissing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "100px 0px 100px 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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

