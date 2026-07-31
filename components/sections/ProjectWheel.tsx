"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Dices, Sparkles, ExternalLink, RefreshCw, X, ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import type { Project } from "@/types";

export function ProjectWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const wheelProjects = projects.slice(0, 8); // 8 slices
  const sliceAngle = 360 / wheelProjects.length;

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedProject(null);

    const randomIndex = Math.floor(Math.random() * wheelProjects.length);
    const extraSpins = (5 + Math.floor(Math.random() * 4)) * 360;
    const currentMod = rotation % 360;
    const targetOffset = (360 - randomIndex * sliceAngle - sliceAngle / 2) - currentMod;
    const nextRotation = rotation + extraSpins + (targetOffset < 0 ? targetOffset + 360 : targetOffset);
    
    setRotation(nextRotation);

    setTimeout(() => {
      setSpinning(false);
      setSelectedProject(wheelProjects[randomIndex]);
    }, 3200);
  };

  return (
    <section id="project-wheel" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="rounded-3xl border border-emerald-glow/20 bg-ink-soft/90 p-8 sm:p-12 lg:p-16 overflow-hidden relative">
        {/* Background glow radial */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-glow/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-core/10 blur-3xl" />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text & Spin CTA */}
          <div className="space-y-6">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-emerald-glow/30 bg-emerald-deep/30 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-emerald-glow"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Showcase</span>
            </motion.div>

            <h2 className="display text-4xl text-cream sm:text-6xl">
              Spin the <span className="text-emerald-glow italic">Project Wheel</span>
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-cream-dim sm:text-base">
              Can’t decide which project to explore first? Give the wheel a spin to reveal secret fun facts, technical highlights, and behind-the-scenes stories!
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={spinWheel}
                disabled={spinning}
                className="group relative inline-flex items-center gap-3 rounded-full bg-emerald-glow px-7 py-3.5 font-mono text-xs uppercase tracking-widest font-bold text-ink transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                <Dices className={`h-4 w-4 ${spinning ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
                <span>{spinning ? "Spinning Wheel..." : "Spin The Wheel"}</span>
              </button>

              <span className="font-mono text-xs text-cream-dim">
                8 Slices • Random Discovery
              </span>
            </div>
          </div>

          {/* Wheel Graphic */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Wheel Pointer Arrow */}
            <div className="z-20 -mb-4 h-0 w-0 border-x-8 border-x-transparent border-t-[16px] border-t-emerald-glow drop-shadow-[0_4px_10px_rgba(52,211,153,0.8)]" />

            {/* Wheel Container */}
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-full border-4 border-emerald-glow/40 p-2 bg-ink shadow-[0_0_50px_rgba(16,185,129,0.15)]">
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 3.2, ease: [0.15, 0.85, 0.35, 1.0] }}
                className="relative h-full w-full rounded-full overflow-hidden border border-line"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {wheelProjects.map((p, i) => {
                    const startAngle = i * sliceAngle;
                    const endAngle = (i + 1) * sliceAngle;
                    const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                    const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                    const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                    const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                    const isEven = i % 2 === 0;

                    return (
                      <g key={p.id}>
                        <path
                          d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                          fill={isEven ? "#0b0d0c" : "#131715"}
                          stroke="rgba(245, 240, 230, 0.08)"
                          strokeWidth="0.5"
                        />
                        <text
                          x="70"
                          y="50"
                          fill={isEven ? "#34d399" : "#f5f0e6"}
                          fontSize="3.5"
                          fontWeight="bold"
                          fontFamily="monospace"
                          transform={`rotate(${startAngle + sliceAngle / 2}, 50, 50)`}
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          {p.index}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>

              {/* Center Hub */}
              <div className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-glow bg-ink shadow-inner">
                <span className="font-mono text-xs font-bold text-cream">2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Project Result Card Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mt-12 rounded-2xl border border-emerald-glow bg-ink p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-cream-dim hover:text-cream transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-emerald-glow">
                  WHEEL LANDED ON #{selectedProject.index}
                </span>
                {selectedProject.category && (
                  <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] uppercase text-cream-dim">
                    {selectedProject.category}
                  </span>
                )}
              </div>

              <h3 className="display text-2xl sm:text-3xl text-cream mb-2">
                {selectedProject.title}
              </h3>

              <div className="my-4 rounded-xl bg-emerald-deep/20 border border-emerald-glow/30 p-4">
                <p className="font-mono text-xs font-semibold text-emerald-glow mb-1 uppercase tracking-wider">
                  💡 Fun Fact & Highlight:
                </p>
                <p className="text-xs sm:text-sm text-cream/90 italic leading-relaxed">
                  &ldquo;{selectedProject.funFact || selectedProject.description}&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-1.5 font-mono text-[0.7rem] text-cream-dim">
                  {selectedProject.stack.map((s) => (
                    <span key={s} className="rounded bg-ink-soft px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={spinWheel}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-cream-dim hover:text-cream transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Spin Again</span>
                  </button>

                  <Link
                    href={`/projects/${selectedProject.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-glow px-4 py-2 font-mono text-xs font-bold text-ink uppercase tracking-wider transition-transform hover:scale-105"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
