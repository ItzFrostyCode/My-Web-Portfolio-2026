"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, Type, Layers, Check } from "lucide-react";

interface StyleGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colorTokens = [
  { name: "Ink Black", hex: "#050505", var: "--color-ink", usage: "Main Background" },
  { name: "Ink Soft", hex: "#0b0d0c", var: "--color-ink-soft", usage: "Cards & Modals" },
  { name: "Emerald Glow", hex: "#34d399", var: "--color-emerald-glow", usage: "Accents & CTAs" },
  { name: "Emerald Deep", hex: "#064e3b", var: "--color-emerald-deep", usage: "Glow Wash" },
  { name: "Cream White", hex: "#f5f0e6", var: "--color-cream", usage: "Headlines & Text" },
  { name: "Cream Dim", hex: "#b8b2a4", var: "--color-cream-dim", usage: "Subtext & Captions" },
];

export function StyleGuideModal({ isOpen, onClose }: StyleGuideModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/85 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full rounded-3xl border border-emerald-glow/40 bg-ink-soft p-6 sm:p-10 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink text-cream-dim transition-colors hover:border-emerald-glow hover:text-cream"
            aria-label="Close style guide modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-glow/30 bg-emerald-deep/20 px-3 py-1 font-mono text-xs uppercase tracking-wider text-emerald-glow">
              <Palette className="h-3.5 w-3.5" />
              <span>Design System &amp; Brand Token Specification</span>
            </div>
            <h3 className="display text-3xl sm:text-4xl text-cream">
              Brand Style Guide
            </h3>
            <p className="text-xs sm:text-sm text-cream-dim leading-relaxed">
              Curated color palette, typography hierarchy, and glassmorphism standards governing Portfolio 2026.
            </p>
          </div>

          {/* Color Tokens Palette */}
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase text-emerald-glow font-bold flex items-center gap-2">
              <Palette className="h-4 w-4" /> Color Tokens Palette
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {colorTokens.map((c) => (
                <div
                  key={c.name}
                  className="rounded-xl border border-line bg-ink p-3 space-y-2"
                >
                  <div
                    className="h-10 w-full rounded-lg border border-line"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div>
                    <p className="font-bold text-xs text-cream">{c.name}</p>
                    <p className="font-mono text-[0.65rem] text-emerald-glow">{c.hex}</p>
                    <p className="text-[0.65rem] text-cream-dim mt-0.5">{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Stack */}
          <div className="space-y-3 border-t border-line pt-6">
            <p className="font-mono text-xs uppercase text-emerald-glow font-bold flex items-center gap-2">
              <Type className="h-4 w-4" /> Typography Stack
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-ink p-4 space-y-1">
                <span className="font-mono text-[0.65rem] text-emerald-glow uppercase">Display Headline</span>
                <p className="font-display text-xl text-cream">ANTON LATIN</p>
                <p className="text-[0.65rem] text-cream-dim">Oversized Bold Upper Case</p>
              </div>

              <div className="rounded-xl border border-line bg-ink p-4 space-y-1">
                <span className="font-mono text-[0.65rem] text-emerald-glow uppercase">Body &amp; Subtitles</span>
                <p className="font-sans text-sm font-bold text-cream">SPACE GROTESK</p>
                <p className="text-[0.65rem] text-cream-dim">Modern Tech Sans-Serif</p>
              </div>

              <div className="rounded-xl border border-line bg-ink p-4 space-y-1">
                <span className="font-mono text-[0.65rem] text-emerald-glow uppercase">Eyebrows &amp; Code</span>
                <p className="font-mono text-xs font-bold text-cream">JETBRAINS MONO</p>
                <p className="text-[0.65rem] text-cream-dim">Technical Monospace</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-line pt-6">
            <button
              onClick={onClose}
              className="rounded-full bg-emerald-glow px-6 py-2.5 font-mono text-xs font-bold text-ink uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Close Specification
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
