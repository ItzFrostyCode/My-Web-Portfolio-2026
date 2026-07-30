"use client";

import { motion } from "framer-motion";

const skills = [
  "Laravel",
  "PHP",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "MySQL",
  "PostgreSQL",
  "Git",
  "GitHub",
  "REST API",
  "Docker",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-line bg-ink-soft/40 py-32 sm:py-44"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7 }}
        >
          Technologies
        </motion.p>
        <motion.h2
          className="display mb-20 text-6xl text-cream sm:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Toolbox
        </motion.h2>

        <ul className="flex flex-wrap gap-4" aria-label="Technology skills">
          {skills.map((skill, i) => (
            <motion.li
              key={skill}
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              animate={{ y: [0, -6, 0] }}
              // Gentle idle float, staggered per chip
               
              className="will-transform"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <motion.span
                animate={{ y: [0, -7, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + (i % 4),
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.08, borderColor: "#34d399", color: "#34d399" }}
                className="block cursor-default rounded-full border border-line px-6 py-3 font-mono text-sm uppercase tracking-widest text-cream-dim transition-colors"
              >
                {skill}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
