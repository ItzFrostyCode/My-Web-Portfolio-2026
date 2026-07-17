"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const PROBE_TIMEOUT_MS = 4000;

interface HeroScrubProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Detects mobile/tablet/iOS at render time.
 * Safe to call during render: ssr:false means window is always defined here.
 */
function isMobile(): boolean {
  return (
    /iPad|iPhone|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

// ─── Mobile path ─────────────────────────────────────────────────────────────
/**
 * Mobile scroll-scrub hero.
 *
 * Problem with autoPlay + canplay approach:
 *   iOS sometimes ignores a single pause() call, so the video keeps playing.
 *
 * New strategy:
 *  1. NO autoPlay on the HTML element — prevents uncontrolled playback.
 *  2. call play().then(pause) from JS — muted videos allow programmatic play()
 *     without user gesture on iOS. This unlocks the video for seeking.
 *  3. RAF loop enforces !paused → pause() every tick so iOS can't sneak a play.
 *  4. Video visible immediately — no opacity-0 fade, no loading wait.
 */
function MobileHero({ triggerRef }: HeroScrubProps) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const progress = useRef({ value: 0, smoothed: 0 });

  // Bind scroll progress via ScrollTrigger.
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

  // Unlock video for seeking, then drive currentTime from scroll.
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    let rafId = 0;
    let cancelled = false;

    const startScrub = () => {
      if (cancelled) return;
      const tick = () => {
        // Enforce paused every frame — iOS sometimes resumes after a seek.
        if (!v.paused) v.pause();

        progress.current.smoothed +=
          (progress.current.value - progress.current.smoothed) * 0.1;

        if (v.duration && Number.isFinite(v.duration)) {
          const target =
            progress.current.smoothed * Math.max(v.duration - 0.05, 0);
          if (Math.abs(v.currentTime - target) > 0.02) {
            v.currentTime = target;
          }
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    // play() on a muted video is allowed without user gesture on iOS.
    // play().then(pause) is the canonical way to unlock seeking.
    v.play()
      .then(() => {
        v.pause();
        startScrub();
      })
      .catch(() => {
        // If play() is blocked (unusual for muted), fallback to canplay event.
        v.addEventListener(
          "canplay",
          () => {
            v.pause();
            startScrub();
          },
          { once: true }
        );
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div className="hero-ambient absolute inset-0" />
      {/*
        No autoPlay — we call play() from JS above to control timing.
        Visible immediately so there's no "loading" delay for the user.
      */}
      <video
        ref={vidRef}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={media.heroOrbit.local} type="video/mp4" />
        {media.heroOrbit.remote && (
          <source src={media.heroOrbit.remote} type="video/mp4" />
        )}
      </video>
    </div>
  );
}

// ─── Desktop path ─────────────────────────────────────────────────────────────
function DesktopHeroScrub({ triggerRef }: HeroScrubProps) {
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
            const frames = await extract(video);
            if (frames && !cancelled) {
              framesRef.current = frames;
              setMode("frames");
              return;
            }
          } catch {
            // Canvas taint / CORS — fall through to autoplay.
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

  useEffect(() => {
    if (mode !== "frames" && mode !== "autoplay") return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
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
          className={cn(
            "will-transform absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1400ms] ease-out",
            revealed && "opacity-100"
          )}
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

// ─── Public export ────────────────────────────────────────────────────────────
export function HeroScrub({ triggerRef }: HeroScrubProps) {
  if (isMobile()) {
    return <MobileHero triggerRef={triggerRef} />;
  }
  return <DesktopHeroScrub triggerRef={triggerRef} />;
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
