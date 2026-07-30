"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";

const stats = [
  { kind: "counter" as const, value: 4, suffix: "th", label: "Year IT Student" },
  { kind: "counter" as const, value: 10, suffix: "+", label: "Personal & Academic Projects" },
  { kind: "literal" as const, literal: "Aspiring", label: "Full-Stack Developer" },
  { kind: "literal" as const, literal: "Continuous", label: "Learner" },
];

export function Stats() {
  return (
    <section
      id="stats"
      aria-label="Statistics"
      className="border-y border-line bg-ink-soft/60"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`flex flex-col items-center justify-center gap-2 px-3 py-10 text-center min-w-0 sm:px-4 sm:py-16 md:py-20 ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            } ${
              i % 2 === 1 ? "border-l border-line" : ""
            } ${
              i > 0 ? "lg:border-l lg:border-line" : ""
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <span className="display max-w-full text-center">
              {s.kind === "counter" ? (
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="text-3xl text-cream sm:text-5xl lg:text-6xl"
                />
              ) : (
                <span className="block max-w-full truncate text-lg font-bold tracking-tight text-emerald-glow xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl">
                  {s.literal}
                </span>
              )}
            </span>
            <span className="eyebrow text-center text-cream-dim leading-tight">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

