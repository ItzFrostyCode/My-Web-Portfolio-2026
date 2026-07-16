"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Pillar } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Full-Stack Development",
    description:
      "Learning to design and build complete web applications using modern frontend and backend technologies.",
  },
  {
    index: "02",
    title: "UI/UX Engineering",
    description:
      "Create intuitive, responsive, and visually engaging interfaces focused on user experience.",
  },
  {
    index: "03",
    title: "System Architecture",
    description:
      "Develop scalable, maintainable, and efficient software solutions with clean architecture principles.",
  },
];

/**
 * Pinned section: each pillar reveals one at a time while scrolling
 * through 300vh of scroll distance.
 */
export function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-pillar]");
      items.forEach((item, i) => {
        const inner = item.querySelector("[data-pillar-inner]");
        gsap.fromTo(
          inner,
          { yPercent: 60, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${i * window.innerHeight * 0.9} top`,
              end: () => `top+=${(i + 0.6) * window.innerHeight * 0.9} top`,
              scrub: 0.5,
            },
          }
        );
        if (i > 0) {
          const prev = items[i - 1].querySelector("[data-pillar-inner]");
          gsap.to(prev, {
            yPercent: -40,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${i * window.innerHeight * 0.9} top`,
              end: () => `top+=${(i + 0.5) * window.innerHeight * 0.9} top`,
              scrub: 0.5,
            },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className={reduced ? "relative" : "relative h-[320vh]"}
    >
      <div
        className={
          reduced
            ? "mx-auto max-w-5xl space-y-24 px-6 py-32"
            : "sticky top-0 flex h-screen items-center overflow-hidden"
        }
      >
        {reduced ? (
          pillars.map((p) => <PillarBlock key={p.index} pillar={p} />)
        ) : (
          <div className="relative mx-auto w-full max-w-5xl px-6">
            <p className="eyebrow absolute -top-24 left-6">What I do</p>
            {pillars.map((p, i) => (
              <div
                key={p.index}
                data-pillar
                className={`${i === 0 ? "relative" : "absolute inset-0 flex items-center px-6"}`}
              >
                <div data-pillar-inner className="will-transform w-full">
                  <PillarBlock pillar={p} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PillarBlock({ pillar }: { pillar: Pillar }) {
  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-12">
      <span className="font-mono text-sm text-emerald-glow">{pillar.index}</span>
      <div>
        <h3 className="display text-5xl text-cream sm:text-7xl lg:text-8xl">
          {pillar.title}
        </h3>
        <p className="mt-6 max-w-xl text-lg text-cream-dim">{pillar.description}</p>
      </div>
    </div>
  );
}
