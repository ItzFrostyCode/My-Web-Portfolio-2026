"use client";

import { motion } from "framer-motion";
import { media } from "@/content/media";

export function About() {
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS"],
    backend: ["Java", "C#", "MySQL", "Supabase", "Laravel"],
  };

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Left: Photo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="h-fit"
        >
          <img
            src={media.closer.poster}
            alt="Joshua Wayman A. Arabejo"
            className="block h-auto w-full"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="space-y-6"
        >
          <div>
            <p className="eyebrow mb-2">BIOGRAPHY</p>
            <h2 className="text-2xl font-bold text-cream sm:text-3xl">
              Joshua Wayman A. <span className="italic text-emerald-glow">Arabejo</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-cream-dim">
            Aspiring Full-Stack Dev & UI UX Designer from Davao City. Currently a 4th year
            IT student, learning by building real projects. Code is a way of
            life.
          </p>

          {/* Info Grid - Compact */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-4 sm:grid-cols-4 sm:gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Based In
              </p>
              <p className="mt-1 text-xs text-cream">Davao City, PH</p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Timezone
              </p>
              <p className="mt-1 text-xs text-cream">UTC+8</p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Languages
              </p>
              <p className="mt-1 text-xs text-cream">EN, FIL</p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Status
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-cream">
                <span className="inline-block h-1 w-1 rounded-full bg-emerald-glow" />
                Open to work
              </p>
            </div>
          </div>

          {/* Toolkit - Inline */}
          <div className="space-y-3 text-xs">
            <div>
              <p className="font-mono uppercase tracking-widest text-cream-dim">
                Frontend
              </p>
              <p className="mt-1 flex flex-wrap gap-1.5 text-cream">
                {skills.frontend.map((skill, i) => (
                  <span key={skill}>
                    {skill}
                    {i < skills.frontend.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </p>
            </div>

            <div>
              <p className="font-mono uppercase tracking-widest text-cream-dim">
                Backend
              </p>
              <p className="mt-1 flex flex-wrap gap-1.5 text-cream">
                {skills.backend.map((skill, i) => (
                  <span key={skill}>
                    {skill}
                    {i < skills.backend.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </p>
            </div>

            <div>
              <p className="font-mono uppercase tracking-widest text-cream-dim">
                Currently
              </p>
              <p className="mt-1 italic text-cream">
                Learning full-stack dev & building real projects
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
