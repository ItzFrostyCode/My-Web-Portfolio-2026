"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, SquareCode, Laptop, Layers } from "lucide-react";
import type { Project } from "@/types";
import { lenisInstance } from "@/components/providers/SmoothScroll";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      if (lenisInstance) lenisInstance.stop();
    } else {
      document.body.style.overflow = "auto";
      if (lenisInstance) lenisInstance.start();
    }

    return () => {
      document.body.style.overflow = "auto";
      if (lenisInstance) lenisInstance.start();
    };
  }, [project]);

  if (!project) return null;

  const displayImage = project.demoImage || project.image;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-ink w-full h-full p-6 sm:p-12 lg:p-16 overscroll-contain"
        data-lenis-prevent="true"
      >
        <div className="flex flex-col space-y-8 min-h-full">
          {/* Top Floating Close Bar */}
          <div className="flex items-center justify-between border-b border-line pb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-emerald-glow">
                UI PREVIEW #{project.index}
              </span>
              {project.category && (
                <span className="rounded-full border border-emerald-glow/30 bg-emerald-deep/20 px-3 py-0.5 font-mono text-xs uppercase tracking-wider text-emerald-glow">
                  {project.category}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="flex h-11 px-5 items-center gap-2 rounded-full border border-emerald-glow bg-emerald-glow text-ink font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
              aria-label="Close project preview modal"
            >
              <span>Close Preview</span>
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Modal Main Content Container */}
          <div className="mx-auto max-w-6xl w-full space-y-8 pb-16">
            <div className="space-y-3">
              <h2 className="display text-4xl sm:text-6xl text-cream">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-cream-dim leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Full-Bleed UI Screenshot / Mockup Display */}
            <div className="relative rounded-none border border-line bg-ink-soft p-4 sm:p-8 overflow-hidden shadow-2xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cream-dim border-b border-line pb-3">
                <Laptop className="h-4 w-4 text-emerald-glow" />
                <span>Full UI Desktop Interface Preview</span>
              </div>

              {/* Laptop Screen Frame Mockup */}
              <div className="relative mx-auto rounded-none border border-line bg-ink p-4 space-y-4">
                <div className="flex items-center gap-1.5 border-b border-line pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 font-mono text-[0.65rem] text-cream-dim">
                    https://{project.id}.app/preview
                  </span>
                </div>

                {/* Graphical Image Showcase (Scrollable Frame for Full Web Screenshot) */}
                <div
                  className="relative max-h-[70vh] w-full rounded-none bg-ink flex flex-col items-center overflow-y-auto border border-line p-2 sm:p-4 overscroll-contain custom-scrollbar"
                  data-lenis-prevent="true"
                >
                  <img
                    src={displayImage}
                    alt={project.title}
                    className="max-w-full w-full h-auto object-contain object-top mx-auto"
                  />
                </div>
              </div>
            </div>

          {/* Problem & Solution Breakdown */}
          {(project.problem || project.solution) && (
            <div className="grid gap-6 sm:grid-cols-2 pt-4">
              {project.problem && (
                <div className="rounded-none border border-amber-500/30 bg-amber-500/5 p-6 space-y-2">
                  <span className="font-mono text-xs font-bold uppercase text-amber-400">
                    🎯 Problem Addressed:
                  </span>
                  <p className="text-sm text-cream/90 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-none border border-emerald-glow/30 bg-emerald-deep/20 p-6 space-y-2">
                  <span className="font-mono text-xs font-bold uppercase text-emerald-glow">
                    ⚡ Solution Delivered:
                  </span>
                  <p className="text-sm text-cream/90 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack & External Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim mb-3">
                Technologies Used
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-none bg-ink border border-line px-3 py-1 font-mono text-xs text-cream">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs text-cream hover:border-emerald-glow hover:text-emerald-glow transition-colors"
                >
                  <SquareCode className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-emerald-glow px-6 py-2.5 font-mono text-xs font-bold text-ink hover:opacity-90 transition-opacity"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  );
}
