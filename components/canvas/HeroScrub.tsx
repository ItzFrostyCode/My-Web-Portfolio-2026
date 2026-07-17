"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const PROBE_TIMEOUT_MS = 4000;
// Real mobile networks can make 96 sequential seeks slow — bail out to plain
// autoplay instead of leaving the hero on the ambient-only "loading" state
// forever if extraction hasn't finished by this point.
const EXTRACT_TIMEOUT_MS = 12000;

interface HeroScrubProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Scroll-scrubbed hero — same on every device (phone, tablet, desktop).
 * Extracts 96 ImageBitmap frames from the video and paints them to a canvas
 * driven by ScrollTrigger progress (0–300vh → frame 0–95), so scrolling
 * always drives the 360° orbit, regardless of screen size or input type.
 *
 * Degrades gracefully by *capability*, not by device-sniffing:
 *   frames   — canvas scrub (the real experience)
 *   autoplay — frame extraction failed/timed out (CORS taint, slow network,
 *              codec issue) → falls back to a plain looping <video>. This
 *              video must be fully visible from the very first frame — iOS
 *              Safari silently refuses to autoplay a video that starts at
 *              opacity: 0 or display: none. (Learned the hard way; do not
 *              add a fade-in to this element.)
 *   fallback — no source reachable at all → ambient CSS background only.
 */
export function HeroScrub({ triggerRef }: HeroScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const progress = useRef({ value: 0, smoothed: 0 });
  const [mode, setMode] = useState<"loading" | "frames" | "autoplay" | "fallback">("loading");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const sources = [media.heroOrbit.local, media.heroOrbit.remote].filter(Boolean);

    const probe = (src: string) =>
      new Promise<HTMLVideoElement>((resolve, reject) => {
        const v = document.createElement("video");
        if (src.startsWith("http")) v.crossOrigin = "anonymous";
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        v.onloadedmetadata = () => resolve(v);
        v.onerror = () => reject(new Error("error"));
        setTimeout(() => reject(new Error("timeout")), PROBE_TIMEOUT_MS);
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
        frames.push(await createImageBitmap(off));
      }
      return frames;
    };

    (async () => {
      for (const src of sources) {
        try {
          const video = await probe(src);
          try {
            const frames = await Promise.race([
              extract(video),
              new Promise<null>((_, reject) =>
                setTimeout(() => reject(new Error("extract timeout")), EXTRACT_TIMEOUT_MS)
              ),
            ]);
            if (frames && !cancelled) {
              framesRef.current = frames;
              setMode("frames");
              return;
            }
          } catch {
            // Canvas taint / CORS / too slow on this network — fall through to autoplay.
          }
          if (!cancelled) {
            setVideoSrc(src);
            setMode("autoplay");
            return;
          }
        } catch {
          // Source unreachable / timed out — try next.
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

  useEffect(() => {
    if (mode !== "frames") return;
    const trigger = triggerRef.current;
    if (!trigger) return;
    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { progress.current.value = self.progress; },
    });
    return () => st.kill();
  }, [mode, triggerRef]);

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
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, [mode]);

  // Canvas-only: the "frames" path has no autoplay restriction to worry about,
  // so it gets the nice opacity fade-in. The "autoplay" <video> path is
  // rendered fully visible immediately instead — see the note above.
  useEffect(() => {
    if (mode !== "frames") return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [mode]);

  // Belt-and-suspenders: some browsers need `muted` set via JS (not just the
  // attribute) plus an explicit play() call before they'll honor autoplay.
  useEffect(() => {
    if (mode !== "autoplay") return;
    const v = videoElRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {/* silently ignore if blocked */});
  }, [mode]);

  return (
    <div className="absolute inset-0">
      <div className="hero-ambient absolute inset-0" />
      {mode === "autoplay" && videoSrc ? (
        <video
          ref={videoElRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          // Fully visible from the first frame — iOS Safari silently refuses
          // to autoplay a video that starts at opacity: 0.
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
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
