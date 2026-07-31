"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;

type Mode = "loading" | "frames" | "video" | "fallback";

interface HeroScrubProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Scroll-scrubbed hero orbit.
 * Source priority: local /media/hero-orbit.mp4 → hosted CDN URL.
 * Render priority:
 *  1. "frames"  — extract 96 frames to ImageBitmaps, scrub with cross-fade
 *                 interpolation (requires CORS-readable video).
 *  2. "video"   — seek-scrubbed <video> element (works without CORS).
 *  3. "fallback" — ambient emerald void if no source is reachable.
 */
export function HeroScrub({ triggerRef }: HeroScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const progress = useRef({ value: 0, smoothed: 0 });
  const [mode, setMode] = useState<Mode>("loading");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // 1) Resolve a playable source, then try frame extraction.
  // On mobile / iOS we skip straight to video-seek mode because:
  //  • iOS ignores preload="auto" (needs user gesture)
  //  • crossOrigin on same-origin video taints the canvas
  //  • createImageBitmap is unreliable on older WebKit
  useEffect(() => {
    let cancelled = false;
    const sources = [media.heroOrbit.local, media.heroOrbit.remote].filter(Boolean);

    /** Returns true if we should skip the canvas/frame path and go straight to video. */
    const isMobileOrIOS = () => {
      if (typeof navigator === "undefined") return false;
      return (
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) // iPadOS
      );
    };

    const probe = (src: string, withCors: boolean) =>
      new Promise<HTMLVideoElement>((resolve, reject) => {
        const v = document.createElement("video");
        if (withCors) v.crossOrigin = "anonymous";
        v.muted = true;
        v.playsInline = true;
        v.preload = "metadata"; // "metadata" is respected by iOS; "auto" is not
        // Safety: iOS sometimes never fires loadedmetadata — give it 6 s max.
        const timer = setTimeout(() => reject(new Error("timeout")), 6000);
        v.onloadedmetadata = () => { clearTimeout(timer); resolve(v); };
        v.onerror = () => { clearTimeout(timer); reject(new Error("unreachable")); };
        v.src = src;
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
        frames.push(await createImageBitmap(off)); // throws if canvas is tainted
      }
      return frames;
    };

    (async () => {
      const mobile = isMobileOrIOS();

      for (const src of sources) {
        // On mobile: skip canvas/frame extraction entirely — go straight to video seek.
        if (mobile) {
          try {
            await probe(src, false); // no crossOrigin needed for video element
            if (!cancelled) {
              setVideoSrc(src);
              setMode("video");
              return;
            }
          } catch {
            // try next source
          }
          continue;
        }

        // Desktop: try full frame extraction first.
        try {
          const video = await probe(src, true);
          try {
            const frames = await extract(video);
            if (frames && !cancelled) {
              framesRef.current = frames;
              setMode("frames");
              return;
            }
          } catch {
            // CORS-tainted or bitmap failure → fall back to seek-scrub
            if (!cancelled) {
              setVideoSrc(src);
              setMode("video");
              return;
            }
          }
        } catch {
          // source unreachable — try next
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

  // 2) Scroll progress binding.
  useEffect(() => {
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
  }, [triggerRef]);

  // 3) Draw loop for frames mode. The ambient CSS layer covers loading/fallback,
  // so this only ever needs to paint once real frames exist.
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

  // 3b) Fade the real content in smoothly once it's ready, instead of popping in.
  useEffect(() => {
    if (mode !== "frames" && mode !== "video") return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [mode]);

  // 4) Seek loop for video mode (no CORS needed).
  useEffect(() => {
    if (mode !== "video") return;
    const v = videoElRef.current;
    if (!v) return;
    let rafId = 0;

    const startLoop = () => {
      const tick = () => {
        progress.current.smoothed +=
          (progress.current.value - progress.current.smoothed) * 0.14;
        if (v.duration && Number.isFinite(v.duration)) {
          const t = progress.current.smoothed * Math.max(v.duration - 0.05, 0);
          if (Math.abs(v.currentTime - t) > 0.033) v.currentTime = t;
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    // On iOS the video element may not have metadata yet when this effect runs.
    // Wait for it if needed, otherwise start immediately.
    if (v.readyState >= 1 && Number.isFinite(v.duration)) {
      startLoop();
    } else {
      v.addEventListener("loadedmetadata", startLoop, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      v.removeEventListener("loadedmetadata", startLoop);
    };
  }, [mode]);

  return (
    <div className="absolute inset-0">
      {/* Ambient backdrop — present from first paint so there's nothing to "pop" in from. */}
      <div className="hero-ambient absolute inset-0" />

      {mode === "video" && videoSrc ? (
        <video
          ref={videoElRef}
          src={videoSrc}
          muted
          playsInline
          // webkit-playsinline is needed for older iOS (pre-10) in-browser playback
          {...({ "webkit-playsinline": "true" } as Record<string, string>)}
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          className={cn(
            "will-transform absolute inset-0 h-full w-full object-cover object-[center_20%] sm:object-center opacity-0 transition-opacity duration-[1400ms] ease-out",
            revealed && "opacity-100"
          )}
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden
          tabIndex={-1}
          className={cn(
            "will-transform absolute inset-0 h-full w-full object-cover object-[center_20%] sm:object-center opacity-0 transition-opacity duration-[1400ms] ease-out",
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
