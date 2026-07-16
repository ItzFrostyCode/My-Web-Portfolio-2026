"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
// How long (ms) to wait for probe metadata before giving up and using autoplay.
const PROBE_TIMEOUT_MS = 4000;

type Mode = "loading" | "frames" | "autoplay" | "fallback";

interface HeroScrubProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

/**
 * True on any touch/mobile/tablet device.
 * iOS Safari never fires onloadedmetadata for off-DOM programmatic videos,
 * so we must detect and skip the probe entirely on mobile.
 */
function isMobile() {
  if (typeof window === "undefined") return false;
  // Covers iPhone, iPad (including iPad that reports MacIntel), Android, etc.
  return (
    /iPad|iPhone|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/** Pick the first non-empty source from the list. */
function firstSource() {
  return (
    [media.heroOrbit.local, media.heroOrbit.remote].find(Boolean) ?? null
  );
}

/**
 * Scroll-scrubbed hero orbit.
 *
 * Render path decision:
 *  • Mobile / tablet / iOS  →  "autoplay"  immediately — no probe, no seek.
 *    iOS Safari never fires onloadedmetadata for off-DOM video elements and
 *    blocks all programmatic seeking. The only reliable path is a native
 *    <video autoPlay loop muted playsInline> rendered straight into the DOM.
 *
 *  • Desktop                →  probe → extract 96 ImageBitmap frames → "frames"
 *                               if that fails → "autoplay" (safe universal fallback)
 *
 *  • No source reachable    →  "fallback" (ambient glow only)
 */
export function HeroScrub({ triggerRef }: HeroScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const progress = useRef({ value: 0, smoothed: 0 });
  const [mode, setMode] = useState<Mode>("loading");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // ─── 1. Source resolution ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    // ── Mobile / iOS: skip probe entirely. ──────────────────────────────────
    // iOS Safari never fires onloadedmetadata for off-DOM programmatic videos.
    // Just hand the src straight to the <video> element in the DOM.
    if (isMobile()) {
      const src = firstSource();
      if (src) {
        setVideoSrc(src);
        setMode("autoplay");
      } else {
        setMode("fallback");
      }
      return;
    }

    // ── Desktop: probe → frame extract → fallback to autoplay ───────────────
    const sources = [media.heroOrbit.local, media.heroOrbit.remote].filter(Boolean);

    const probe = (src: string) =>
      new Promise<HTMLVideoElement>((resolve, reject) => {
        const v = document.createElement("video");
        // No crossOrigin for local paths — Next.js static files have no CORS headers.
        if (src.startsWith("http")) v.crossOrigin = "anonymous";
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        v.onloadedmetadata = () => resolve(v);
        v.onerror = () => reject(new Error("unreachable"));
        v.src = src;
        // Safety timeout — don't hang forever if the browser stalls.
        setTimeout(() => reject(new Error("timeout")), PROBE_TIMEOUT_MS);
      });

    const extract = async (video: HTMLVideoElement) => {
      const duration = video.duration;
      const off = document.createElement("canvas");
      const targetW = Math.min(1600, video.videoWidth || 1600);
      const scale = targetW / (video.videoWidth || targetW);
      off.width = targetW;
      off.height = Math.round((video.videoHeight || 900) * scale);
      const octx = off.getContext("2d")!;
      const frames: ImageBitmap[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) return null;
        const t = (i / (FRAME_COUNT - 1)) * Math.max(duration - 0.05, 0);
        await seek(video, t);
        octx.drawImage(video, 0, 0, off.width, off.height);
        frames.push(await createImageBitmap(off));
      }
      return frames;
    };

    (async () => {
      for (const src of sources) {
        try {
          const video = await probe(src);
          try {
            const frames = await extract(video);
            if (frames && !cancelled) {
              framesRef.current = frames;
              setMode("frames");
              return;
            }
          } catch {
            // Frame extraction failed (canvas taint / CORS) — use autoplay.
          }
          // Autoplay works without CORS on any device.
          if (!cancelled) {
            setVideoSrc(src);
            setMode("autoplay");
            return;
          }
        } catch {
          // Source unreachable or timed-out — try next.
        }
      }
      if (!cancelled) setMode("fallback");
    })();

    return () => {
      cancelled = true;
      framesRef.current.forEach((f) => f.close());
      framesRef.current = [];
    };
  }, []);

  // ─── 2. Scroll progress (desktop frames mode only) ──────────────────────
  useEffect(() => {
    if (mode !== "frames") return;
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

  // ─── 3. Canvas draw loop (frames mode) ──────────────────────────────────
  useEffect(() => {
    if (mode !== "frames") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rafId = 0;
    const draw = () => {
      progress.current.smoothed +=
        (progress.current.value - progress.current.smoothed) * 0.14;
      const frames = framesRef.current;
      const { width: w, height: h } = canvas;
      if (frames.length > 1) {
        const exact = progress.current.smoothed * (frames.length - 1);
        const i = Math.floor(exact);
        const frac = exact - i;
        const a = frames[Math.min(i, frames.length - 1)];
        const b = frames[Math.min(i + 1, frames.length - 1)];
        const scale = Math.max(w / a.width, h / a.height);
        const dw = a.width * scale;
        const dh = a.height * scale;
        const dx = (w - dw) / 2;
        const dy = (h - dh) / 2;
        ctx.clearRect(0, 0, w, h);
        ctx.globalAlpha = 1;
        ctx.drawImage(a, dx, dy, dw, dh);
        if (frac > 0.01 && b !== a) {
          ctx.globalAlpha = frac;
          ctx.drawImage(b, dx, dy, dw, dh);
          ctx.globalAlpha = 1;
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [mode]);

  // ─── 4. Fade in once ready ───────────────────────────────────────────────
  useEffect(() => {
    if (mode !== "frames" && mode !== "autoplay") return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [mode]);

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="absolute inset-0">
      {/* Ambient glow — always visible so there's no "pop" on first paint */}
      <div className="hero-ambient absolute inset-0" />

      {mode === "autoplay" && videoSrc ? (
        /**
         * Mobile / iOS / desktop fallback:
         * autoPlay + loop + muted + playsInline is the only combination that
         * works reliably across all browsers without user gesture.
         * On iOS this MUST be rendered in the real DOM (not created via JS).
         */
        <video
          ref={videoElRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          className={cn(
            "will-transform absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1400ms] ease-out",
            revealed && "opacity-100"
          )}
        />
      ) : (
        /* Desktop: canvas frame scrub */
        <canvas
          ref={canvasRef}
          aria-hidden
          className={cn(
            "will-transform absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1400ms] ease-out",
            revealed && "opacity-100"
          )}
        />
      )}
    </div>
  );
}

function seek(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    const onSeeked = () => {
      video.removeEventListener("seeked", onSeeked);
      resolve();
    };
    video.addEventListener("seeked", onSeeked);
    video.currentTime = time;
  });
}
