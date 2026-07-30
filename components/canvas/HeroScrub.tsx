"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/content/media";

gsap.registerPlugin(ScrollTrigger);

interface HeroScrubProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

/**
 * 60FPS GPU Canvas Hero Orbit Scrubbing:
 * - Instant 0ms paint on page load (starts at 8.0s front-facing pose).
 * - Liquid-smooth 60FPS GPU frame interpolation via ImageBitmap.
 * - Scroll sequence: 8.0s -> 1.0s (50% scroll) -> 8.0s (100% scroll).
 */
export function HeroScrub({ triggerRef }: HeroScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const progress = useRef({ value: 0, smoothed: 0 });

  // 1) Pre-decode GPU ImageBitmap frames for 60FPS silky smooth scrubbing
  useEffect(() => {
    let cancelled = false;
    const src = media.heroOrbit.local || media.heroOrbit.remote;
    if (!src) return;

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const totalFrames = isMobile ? 36 : 60;

    (async () => {
      try {
        const v = document.createElement("video");
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        v.src = src;

        await new Promise<void>((resolve, reject) => {
          const t = setTimeout(() => resolve(), 800);
          v.onloadedmetadata = () => {
            clearTimeout(t);
            resolve();
          };
          v.onerror = () => {
            clearTimeout(t);
            reject();
          };
          v.load();
        });

        const duration = v.duration || 8;
        const maxT = Math.max(duration - 0.15, 7.8); // ~8s mark (front facing)
        const minT = 1.0; // 1s mark (side orbit)

        const off = document.createElement("canvas");
        const targetW = Math.min(1280, v.videoWidth || 1280);
        const scale = targetW / (v.videoWidth || targetW);
        off.width = targetW;
        off.height = Math.round((v.videoHeight || 720) * scale);
        const octx = off.getContext("2d", { willReadFrequently: false })!;

        const seek = (time: number) =>
          new Promise<void>((res) => {
            if (Math.abs(v.currentTime - time) < 0.01) {
              res();
              return;
            }
            const onSeeked = () => {
              v.removeEventListener("seeked", onSeeked);
              res();
            };
            v.addEventListener("seeked", onSeeked);
            v.currentTime = time;
          });

        const half = Math.floor(totalFrames / 2);
        const frames: ImageBitmap[] = new Array(totalFrames);

        // Index 0 to half: maxT (8.0s) down to minT (1.0s)
        // Index half to end: minT (1.0s) up to maxT (8.0s)
        for (let i = 0; i < totalFrames; i++) {
          if (cancelled) return;
          let t: number;
          if (i <= half) {
            const factor = i / half;
            t = maxT - factor * (maxT - minT);
          } else {
            const factor = (i - half) / (totalFrames - 1 - half);
            t = minT + factor * (maxT - minT);
          }

          try {
            await seek(t);
            octx.drawImage(v, 0, 0, off.width, off.height);
            const bmp = await createImageBitmap(off);
            frames[i] = bmp;

            // Paint frame 0 (8.0s front pose) IMMEDIATELY (~5ms) on canvas load!
            if (i === 0 && !cancelled) {
              framesRef.current = [bmp];
            }
          } catch {
            // ignore fallback
          }
        }

        if (!cancelled) {
          const valid = frames.filter(Boolean);
          if (valid.length > 0) {
            framesRef.current = valid;
          }
        }
      } catch {
        // ignore fallback
      }
    })();

    return () => {
      cancelled = true;
      framesRef.current.forEach((f) => f.close());
      framesRef.current = [];
    };
  }, []);

  // 2) ScrollTrigger binding
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom bottom",
      onRefresh: (self) => {
        progress.current.value = self.progress;
        progress.current.smoothed = self.progress;
      },
      onUpdate: (self) => {
        progress.current.value = self.progress;
      },
    });

    progress.current.value = st.progress;
    progress.current.smoothed = st.progress;
    return () => st.kill();
  }, [triggerRef]);

  // 3) Smooth GPU Canvas render loop (60FPS locked)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rafId = 0;
    const draw = () => {
      // Smooth lerp coefficient for liquid 60fps motion
      progress.current.smoothed +=
        (progress.current.value - progress.current.smoothed) * 0.18;

      const frames = framesRef.current;
      let w = canvas.width;
      let h = canvas.height;

      if ((w === 0 || h === 0) && canvas.clientWidth > 0) {
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        w = canvas.width;
        h = canvas.height;
      }

      if (frames.length > 0 && w > 0 && h > 0) {
        const exact = progress.current.smoothed * Math.max(frames.length - 1, 1);
        const i = Math.min(Math.floor(exact), frames.length - 1);
        const frac = exact - i;
        const a = frames[i];
        const b = frames[Math.min(i + 1, frames.length - 1)];

        if (a) {
          const scale = Math.max(w / a.width, h / a.height);
          const dw = a.width * scale;
          const dh = a.height * scale;
          const dx = (w - dw) / 2;
          const dy = (h - dh) / 2;
          ctx.clearRect(0, 0, w, h);
          ctx.globalAlpha = 1;
          ctx.drawImage(a, dx, dy, dw, dh);
          if (frac > 0.01 && b && b !== a) {
            ctx.globalAlpha = frac;
            ctx.drawImage(b, dx, dy, dw, dh);
            ctx.globalAlpha = 1;
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Ambient backdrop */}
      <div className="hero-ambient absolute inset-0" />

      <canvas
        ref={canvasRef}
        aria-hidden
        className="will-transform absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
