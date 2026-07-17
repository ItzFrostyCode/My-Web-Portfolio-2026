"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/content/media";

gsap.registerPlugin(ScrollTrigger);

// If nothing is ready to show by this point, give up and show the ambient
// fallback rather than leaving the loading screen up forever.
const READY_TIMEOUT_MS = 8000;

interface HeroScrubProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Fires once, the moment we've settled on "ready" or "fallback". */
  onReady?: () => void;
  /** Real download progress (0–1), from the video element's own buffered range. */
  onProgress?: (pct: number) => void;
}

/**
 * Scroll-scrubbed hero — identical technique on every device.
 *
 * Previous version pre-extracted 96 ImageBitmap frames via repeated seeks
 * before showing anything. That's expensive (CPU + memory) and, on a real
 * phone over a real network, seeking 96 times before first paint could
 * take 10+ seconds — the loading screen this replaces existed because of
 * that wait.
 *
 * This version just loads the video once and drives `currentTime` directly
 * from smoothed scroll progress on a normal <video> element. The browser
 * decodes only the frame it needs, on demand — no upfront extraction pass,
 * no canvas, no ImageBitmap, no CORS/taint concerns. It's also never
 * autoplaying (we only ever seek a paused video), so iOS Safari's
 * autoplay-must-be-visible restriction doesn't apply here at all.
 */
export function HeroScrub({ triggerRef, onReady, onProgress }: HeroScrubProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useRef({ value: 0, smoothed: 0 });
  const [mode, setMode] = useState<"loading" | "ready" | "fallback">("loading");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let settled = false;
    const sources = [media.heroOrbit.local, media.heroOrbit.remote].filter(Boolean);

    const finish = (nextMode: "ready" | "fallback", src?: string) => {
      if (cancelled || settled) return;
      settled = true;
      clearTimeout(timeoutId);
      if (src) setVideoSrc(src);
      setMode(nextMode);
    };

    const timeoutId = setTimeout(() => finish("fallback"), READY_TIMEOUT_MS);

    const tryLoad = (index: number) => {
      if (index >= sources.length) {
        finish("fallback");
        return;
      }
      const src = sources[index];
      const v = document.createElement("video");
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.onloadeddata = () => finish("ready", src);
      v.onerror = () => tryLoad(index + 1);
      v.onprogress = () => {
        if (!v.duration || !Number.isFinite(v.duration) || v.buffered.length === 0) return;
        onProgress?.(Math.min(1, v.buffered.end(v.buffered.length - 1) / v.duration));
      };
      v.src = src;
    };
    tryLoad(0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [onProgress]);

  useEffect(() => {
    if (mode !== "loading") onReady?.();
  }, [mode, onReady]);

  useEffect(() => {
    if (mode !== "ready") return;
    const trigger = triggerRef.current;
    if (!trigger) return;
    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current.value = self.progress;
      },
    });
    return () => st.kill();
  }, [mode, triggerRef]);

  useEffect(() => {
    if (mode !== "ready") return;
    const v = videoRef.current;
    if (!v) return;
    let rafId = 0;
    const tick = () => {
      progress.current.smoothed +=
        (progress.current.value - progress.current.smoothed) * 0.14;
      if (v.duration && Number.isFinite(v.duration)) {
        const t = progress.current.smoothed * Math.max(v.duration - 0.05, 0);
        if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mode]);

  return (
    <div className="absolute inset-0">
      <div className="hero-ambient absolute inset-0" />
      {mode === "ready" && videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
