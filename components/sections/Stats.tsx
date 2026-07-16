"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";

const stats = [
  { kind: "counter" as const, value: 4, suffix: "th", label: "Year IT Student" },
  { kind: "counter" as const, value: 9,  label: "Personal & Academic Projects" },
  { kind: "literal" as const, literal: "Aspiring", label: "Full-Stack Dev & UI UX Designer" },
  { kind: "literal" as const, literal: "Continuous", label: "Learner" },
];

export function Stats() {
  return (
    <section
      id="stats"
      aria-label="Statistics"
      className="border-y border-line bg-ink-soft/60"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex flex-col items-center gap-2 px-4 py-14 text-center sm:py-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <span className="display text-5xl text-cream sm:text-6xl">
              {s.kind === "counter" ? (
                <Counter value={s.value} suffix={s.suffix} />
              ) : (
                <span className="text-white">{s.literal}</span>
              )}
            </span>
            <span className="eyebrow text-cream-dim">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
