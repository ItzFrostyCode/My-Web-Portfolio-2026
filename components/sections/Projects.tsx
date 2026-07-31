"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Globe, SquareCode, MessageSquare, ChevronDown, ChevronUp, Eye, Search, FileText, SlidersHorizontal } from "lucide-react";
import { projects } from "@/content/projects";
import type { Project, ProjectCategory } from "@/types";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ConsultationModal } from "@/components/ui/ConsultationModal";

const categoryStyles: Record<ProjectCategory, string> = {
  "Platform Project": "border-amber-400/50 text-amber-400",
  "Client Project": "border-emerald-glow/40 text-emerald-glow",
  "Own Project": "border-line text-cream",
  "School Project": "border-line text-cream-dim",
  "Ongoing Thesis": "border-sky-400/50 text-sky-400",
};

const categories = [
  "All",
  "Platform Project",
  "Client Project",
  "Own Project",
  "School Project",
  "Ongoing Thesis",
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [consultProject, setConsultProject] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section id="projects" className="mx-auto max-w-7xl px-6 py-28 sm:py-36">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7 }}
            >
              Featured Showcase
            </motion.p>
            <motion.h2
              className="display text-5xl text-cream sm:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              What I&apos;ve built
            </motion.h2>
          </div>

          {/* Search Bar (Left) & Category Filter Icon Dropdown (Right) */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input on Left */}
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-cream-dim" />
              <input
                type="text"
                placeholder="Search tech, title, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-line bg-ink-soft pl-9 pr-4 py-2 font-mono text-xs text-cream focus:border-emerald-glow focus:outline-none"
              />
            </div>

            {/* Icon-Only Category Filter Dropdown Toggle on Right */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`flex h-9 items-center gap-2 rounded-full border px-3.5 font-mono text-xs transition-all duration-300 ${
                  activeCategory !== "All"
                    ? "border-emerald-glow bg-emerald-glow text-ink font-bold"
                    : "border-line bg-ink-soft text-cream-dim hover:border-cream hover:text-cream"
                }`}
                aria-label="Filter Projects by Category"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline text-[0.7rem] uppercase tracking-wider">{activeCategory}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Animated Category Dropdown Menu */}
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 z-30 w-52 rounded-2xl border border-line bg-ink-soft/95 p-2 shadow-2xl backdrop-blur-xl space-y-1"
                  >
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setIsCategoryOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-mono text-xs transition-colors ${
                            isActive
                              ? "bg-emerald-glow text-ink font-bold"
                              : "text-cream-dim hover:bg-ink hover:text-cream"
                          }`}
                        >
                          <span>{cat}</span>
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {filteredProjects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onSelect={() => setSelectedProject(project)}
              onConsult={() => setConsultProject(project.title)}
            />
          ))}
        </div>
      </section>

      {/* Project Mockup Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Consultation Quick Booking Modal */}
      <ConsultationModal
        isOpen={Boolean(consultProject)}
        onClose={() => setConsultProject(null)}
        projectName={consultProject || ""}
      />
    </>
  );
}

function ProjectRow({
  project,
  index,
  onSelect,
  onConsult,
}: {
  project: (typeof projects)[number];
  index: number;
  onSelect: () => void;
  onConsult: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasLinks = project.github || project.website;

  return (
    <motion.div
      className="group relative py-10 transition-colors duration-500 hover:bg-ink-soft/40 sm:px-6"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-10">
        <span className="font-mono text-sm text-emerald-glow pt-2">{project.index}</span>

        <div>
          {project.category && (
            <span
              className={`inline-block rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest ${categoryStyles[project.category]}`}
            >
              {project.category}
            </span>
          )}
          <Link href={`/projects/${project.id}`}>
            <h3
              className={`display text-3xl text-cream transition-all duration-500 hover:text-emerald-glow group-hover:translate-x-2 sm:text-5xl ${project.category ? "mt-3" : ""}`}
            >
              {project.title}
            </h3>
          </Link>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream-dim sm:text-base">
            {project.description}
          </p>

          {/* Tech stack pills */}
          {project.stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-cream">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded bg-ink-soft border border-line px-2 py-0.5 font-mono text-[0.7rem]">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Expandable Problem & Solution Accordion */}
          {(project.problem || project.solution) && (
            <div className="mt-5">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-glow hover:underline focus:outline-none"
              >
                <span>{expanded ? "Hide Problem & Solution Details" : "View Problem & Solution Details"}</span>
                {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 grid gap-3 rounded-xl border border-line bg-ink-soft p-4 text-xs sm:grid-cols-2 sm:gap-4">
                      {project.problem && (
                        <div className="space-y-1">
                          <span className="font-mono uppercase font-bold text-amber-400/90 tracking-wider">
                            🎯 The Problem:
                          </span>
                          <p className="text-cream-dim leading-relaxed">{project.problem}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="space-y-1">
                          <span className="font-mono uppercase font-bold text-emerald-glow tracking-wider">
                            ⚡ The Solution:
                          </span>
                          <p className="text-cream-dim leading-relaxed">{project.solution}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Project Direct CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-glow px-4.5 py-1.5 font-mono text-xs uppercase tracking-wider text-ink font-bold transition-all duration-300 hover:scale-105"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Read Full Case Study</span>
            </Link>

            <button
              onClick={onSelect}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-glow/40 bg-emerald-glow/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-emerald-glow transition-all duration-300 hover:bg-emerald-glow hover:text-ink font-bold"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>UI Preview</span>
            </button>

            <button
              onClick={onConsult}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-cream-dim transition-all duration-300 hover:border-cream hover:text-cream"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Discuss Similar Project</span>
            </button>
          </div>
        </div>

        {/* External Links */}
        {hasLinks && (
          <div className="mt-4 flex items-center gap-3 sm:mt-0 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:bg-emerald-glow hover:text-ink sm:h-12 sm:w-12"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:bg-emerald-glow hover:text-ink sm:h-12 sm:w-12"
              >
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
