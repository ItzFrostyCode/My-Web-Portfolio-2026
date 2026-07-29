"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, SquareCode } from "lucide-react";
import { projects } from "@/content/projects";
import type { ProjectCategory } from "@/types";

const categoryStyles: Record<ProjectCategory, string> = {
  "Platform Project": "border-amber-400/50 text-amber-400",
  "Client Project": "border-emerald-glow/40 text-emerald-glow",
  "Own Project": "border-line text-cream",
  "School Project": "border-line text-cream-dim",
  "Ongoing Thesis": "border-sky-400/50 text-sky-400",
};

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-32 sm:py-44">
      <motion.p
        className="eyebrow mb-6"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7 }}
      >
        Featured projects
      </motion.p>
      <motion.h2
        className="display mb-20 text-6xl text-cream sm:text-8xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        What I&apos;ve built
      </motion.h2>

      <div className="divide-y divide-line border-y border-line">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={projects[i]} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const hasLinks = project.github || project.website;

  return (
    <motion.div
      className="group relative grid gap-6 py-12 transition-colors duration-500 hover:bg-ink-soft/60 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-10 sm:px-6"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-mono text-sm text-emerald-glow">{project.index}</span>

      <div>
        {project.category && (
          <span
            className={`inline-block rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest ${categoryStyles[project.category]}`}
          >
            {project.category}
          </span>
        )}
        <h3
          className={`display text-4xl text-cream transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl ${project.category ? "mt-3" : ""}`}
        >
          {project.title}
        </h3>
        <p className="mt-4 max-w-xl text-cream-dim">{project.description}</p>
        {project.stack.length > 0 && (
          <p className="mt-4 flex flex-wrap gap-1.5 text-xs text-cream" aria-label="Tech stack">
            {project.stack.map((tech, i) => (
              <span key={tech}>
                {tech}
                {i < project.stack.length - 1 ? " ·" : ""}
              </span>
            ))}
          </p>
        )}
      </div>

      {hasLinks && (
        <div className="mt-6 flex items-center gap-3 sm:mt-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:bg-emerald-glow hover:text-ink sm:h-12 sm:w-12"
            >
              <SquareCode className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live site`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:bg-emerald-glow hover:text-ink sm:h-12 sm:w-12"
            >
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
