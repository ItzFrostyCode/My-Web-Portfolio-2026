"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Cpu } from "lucide-react";

const usps = [
  {
    index: "01 / VELOCITY",
    title: "Rapid Execution & Delivery",
    description:
      "Proven ability to build, iterate, and deploy production-ready web platforms under tight deadlines without sacrificing code quality.",
    highlight: "Sub-48h rapid deployment capability",
  },
  {
    index: "02 / ARCHITECTURE",
    title: "Pragmatic Full-Stack Engineering",
    description:
      "Building seamless bridges between reactive frontends (Next.js/Vue 3) and secure, transactional backends (Laravel, MySQL, C#).",
    highlight: "Zero data leakage & audit-ready DB design",
  },
  {
    index: "03 / CRAFTSMANSHIP",
    title: "User-Centric UI/UX Precision",
    description:
      "Crafting visually stunning, accessible, and responsive interfaces equipped with micro-animations and intuitive navigation.",
    highlight: "Designed for high conversion & zero friction",
  },
];

export function USP() {
  return (
    <section id="usp" className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 border-y border-line">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="eyebrow mb-3">Why Work With Me</p>
          <h2 className="display text-4xl text-cream sm:text-6xl lg:text-7xl">
            Unique Value &amp; Standards
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-cream-dim leading-relaxed">
          What sets my development approach apart for clients, businesses, and engineering teams.
        </p>
      </div>

      {/* 3-Column Clean Editorial Grid with Line Dividers */}
      <div className="grid divide-y md:divide-y-0 md:divide-x divide-line border-y border-line md:grid-cols-3">
        {usps.map((u, i) => (
          <motion.div
            key={u.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col justify-between py-8 md:p-8 space-y-8 group"
          >
            <div className="space-y-4">
              <span className="font-mono text-xs text-emerald-glow font-bold tracking-widest block">
                {u.index}
              </span>

              <h3 className="display text-2xl text-cream sm:text-3xl group-hover:text-emerald-glow transition-colors">
                {u.title}
              </h3>

              <p className="text-xs sm:text-sm text-cream-dim leading-relaxed font-light">
                {u.description}
              </p>
            </div>

            <div className="pt-4 border-t border-line font-mono text-[0.65rem] uppercase tracking-wider text-emerald-glow font-semibold flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow animate-pulse" />
              <span>{u.highlight}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
