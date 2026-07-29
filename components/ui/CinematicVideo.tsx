"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MediaSource } from "@/content/media";

interface CinematicVideoProps {
  source: MediaSource;
  label: string;
  className?: string;
}

/**
 * Full-bleed cinematic media card.
 * Priority: local video → hosted video → poster still (slow Ken Burns
 * drift) → nothing (the card collapses so the layout never shows an
 * empty placeholder).
 */
export function CinematicVideo({ source, label, className }: CinematicVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrapRef, { margin: "-15%" });
  const sources = [source.local, source.remote].filter(Boolean);
  const [srcIndex, setSrcIndex] = useState(0);
  const videoMissing = srcIndex >= sources.length;
  const hasPoster = Boolean(source.poster);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || videoMissing) return;
    if (inView) {
      v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  }, [inView, videoMissing, srcIndex]);

  // Nothing to show at all — collapse the card entirely.
  if (videoMissing && !hasPoster) return null;

  return (
    <motion.div
      ref={wrapRef}
      initial={{ clipPath: "inset(12% 6% 12% 6% round 12px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "will-transform relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-ink-soft",
        className
      )}
    >
      {!videoMissing ? (
        <video
          key={sources[srcIndex]}
          ref={videoRef}
          src={sources[srcIndex]}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setSrcIndex((i) => i + 1)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          {/* Cinematic emerald duotone grade over the real photo */}
          <motion.img
            src={source.poster}
            alt={label}
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1.18 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 16, ease: "linear" }}
            className="will-transform h-full w-full object-cover object-[center_22%] [filter:grayscale(1)_sepia(0.45)_hue-rotate(105deg)_saturate(1.3)_brightness(0.72)_contrast(1.18)]"
          />
          {/* Emerald glow wash */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14),transparent_65%)] mix-blend-screen" />
          {/* Vignette melting into ink */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.9)_100%)]" />
        </>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />
    </motion.div>
  );
}
