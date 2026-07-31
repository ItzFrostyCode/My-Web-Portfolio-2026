import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUp, ExternalLink, SquareCode } from "lucide-react";
import { projects } from "@/content/projects";
import type { Project } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project: Project = projects[projectIndex];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-ink text-cream selection:bg-emerald-core selection:text-ink pb-0 overflow-x-hidden w-full">
      {/* Top Header Spacing & Back Link Bar */}
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-4">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream-dim hover:text-emerald-glow transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to all work</span>
        </Link>
      </div>

      {/* Hero Header Area */}
      <section className="mx-auto max-w-7xl px-6 py-4">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-widest text-emerald-glow">
            <span>2026</span>
            <span>•</span>
            <span>{project.stack.slice(0, 2).join(" • ")}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow animate-pulse" />
              <span>{project.status || "LIVE"}</span>
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h1 className="display text-4xl text-cream sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight whitespace-pre-line">
                {project.title}.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="font-sans text-xl text-cream-dim sm:text-3xl font-light leading-snug">
                {project.subtitle || project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Bleed Viewport Hero Image Banner Container (100% Width Edge-to-Edge) */}
      <div className="w-full relative my-10 overflow-hidden rounded-none border-y border-line bg-ink-soft shadow-2xl">
        <div className="relative min-h-[360px] sm:min-h-[520px] max-h-[720px] w-full flex items-center justify-center p-0 group overflow-hidden bg-ink">
          {project.image && project.image.trim() !== "" ? (
            /* Clear, Full-Visibility Centered Image Showcase (No Dimming / Dark Overlays or Overlay Text) */
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 min-h-[360px] sm:min-h-[520px]">
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[650px] w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          ) : (
            /* Fallback Background & Text Overlay when No Image is Present */
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ink-soft via-ink to-black" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[length:16px_16px] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

              <div className="relative z-10 text-center max-w-2xl space-y-3 p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald-glow font-bold">
                  {project.title.toUpperCase().replace("\n", " ").replace("\N", " ")} • 2026
                </p>

                <h2 className="font-serif italic text-2xl sm:text-4xl text-cream font-normal">
                  {project.subtitle || project.title.replace("\n", " ")}
                </h2>

                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-cream-dim flex flex-wrap items-center justify-center gap-2">
                  {project.stack.map((s, idx) => (
                    <span key={s}>
                      {s} {idx < project.stack.length - 1 ? "•" : ""}
                    </span>
                  ))}
                </p>
              </div>
            </>
          )}

          {/* Quick Action Links Overlay */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-emerald-glow px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-lg transition-transform hover:scale-105"
              >
                <span>Live Preview</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-line bg-ink/80 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-cream backdrop-blur-md transition-colors hover:border-emerald-glow"
              >
                <SquareCode className="h-4 w-4" />
                <span>Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 4-Column Metadata Grid (Role, Team/Category, Duration/Status, Stack) */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-4">
          <div className="space-y-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald-glow">ROLE</p>
            <p className="font-bold text-sm text-cream sm:text-base">{project.role || "Full-Stack Developer"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald-glow">TEAM / CATEGORY</p>
            <p className="font-bold text-sm text-cream sm:text-base">{project.category || "Software Development"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald-glow">DURATION</p>
            <p className="font-bold text-sm text-cream sm:text-base">{project.status || "Ongoing"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-emerald-glow">STACK</p>
            <p className="font-bold text-sm text-cream sm:text-base">{project.stack.join(" • ")}</p>
          </div>
        </div>
      </section>

      {/* § 01 - OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-12 border-b border-line">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-glow font-bold">
              § 01 - OVERVIEW
            </p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-cream/90 sm:text-2xl font-light">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* § 02 - CONTEXT (Problem & Approach) */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-b border-line">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-glow font-bold">
              § 02 - CONTEXT
            </p>
          </div>
          <div className="lg:col-span-8 space-y-8">
            {project.problem && (
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">THE PROBLEM</p>
                <p className="text-base text-cream-dim leading-relaxed sm:text-lg">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-emerald-glow">THE APPROACH</p>
                <p className="text-base text-cream italic leading-relaxed sm:text-lg">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* § 03 - KEY FEATURES */}
      {project.features && project.features.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 border-b border-line">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-glow font-bold">
                § 03 - KEY SYSTEM FEATURES
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {project.features.map((feature, idx) => {
                  const colonIndex = feature.indexOf(":");
                  const hasTitle = colonIndex !== -1;
                  const title = hasTitle ? feature.slice(0, colonIndex).trim() : `Feature ${idx + 1}`;
                  const body = hasTitle ? feature.slice(colonIndex + 1).trim() : feature;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-line bg-ink-soft p-6 space-y-2 transition-colors hover:border-emerald-glow/40"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-glow" />
                        <h4 className="font-bold text-base text-cream">
                          {title}
                        </h4>
                      </div>
                      <p className="text-sm text-cream-dim leading-relaxed font-light">
                        {body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* § 04 - KEY CONTRIBUTIONS */}
      {project.contributions && project.contributions.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 border-b border-line">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-glow font-bold">
                § 04 - KEY CONTRIBUTIONS
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {project.contributions.map((contribution, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-line bg-ink-soft p-6 space-y-3 transition-colors hover:border-emerald-glow/40"
                  >
                    <span className="font-mono text-xs text-emerald-glow font-bold">
                      0{idx + 1}
                    </span>
                    <p className="text-sm text-cream leading-relaxed font-normal">
                      {contribution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* § 05 - IMPACT & METRICS */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 border-b border-line">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-glow font-bold">
                § 05 - IMPACT &amp; METRICS
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="display text-3xl sm:text-5xl text-emerald-glow leading-tight break-words">
                      {m.value}
                    </p>
                    <p className="font-mono text-xs uppercase text-cream font-bold">{m.label}</p>
                    {m.subtext && <p className="text-xs text-cream-dim">{m.subtext}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* § 06 - SYSTEM INTERFACE & DEMO SHOWCASE */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 border-b border-line">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-glow font-bold">
                § 06 - DEMO UI SHOWCASE
              </p>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div className="grid gap-8 sm:grid-cols-1">
                {project.screenshots.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="group overflow-hidden rounded-2xl border border-line bg-ink-soft p-4 sm:p-6 space-y-4 shadow-xl transition-all hover:border-emerald-glow/40"
                  >
                    <div className="flex items-center justify-between border-b border-line/60 pb-3">
                      <span className="font-mono text-xs text-emerald-glow font-bold">
                        DEMO PREVIEW 0{idx + 1}
                      </span>
                      <span className="font-mono text-[0.65rem] text-cream-dim uppercase tracking-wider">
                        {idx === 0 ? "Multi-Device Hardware Setup" : "Full Web Portal Desktop Interface"}
                      </span>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-line/40 bg-ink">
                      <img
                        src={imgSrc}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="max-w-2xl w-full h-auto object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.01] [image-rendering:-webkit-optimize-contrast]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Previous / Next Project Navigation Full-Bleed Footer Bar */}
      <section className="w-full relative mt-20 border-t border-line bg-ink-soft/40 py-16 px-6 sm:px-12 lg:px-16 overflow-hidden">
        <div className="mx-auto max-w-7xl relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            {/* Previous Project */}
            <Link
              href={`/projects/${prevProject.id}`}
              className="group block space-y-2 transition-colors hover:text-emerald-glow"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-cream-dim group-hover:text-emerald-glow transition-colors">
                ← PREVIOUS
              </p>
              <h4 className="display text-2xl text-cream sm:text-4xl lg:text-5xl group-hover:text-emerald-glow transition-colors whitespace-pre-line">
                {prevProject.title}
              </h4>
            </Link>

            {/* Next Project */}
            <Link
              href={`/projects/${nextProject.id}`}
              className="group block space-y-2 text-left sm:text-right transition-colors hover:text-emerald-glow"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-cream-dim group-hover:text-emerald-glow transition-colors">
                NEXT →
              </p>
              <h4 className="display text-2xl text-cream sm:text-4xl lg:text-5xl group-hover:text-emerald-glow transition-colors whitespace-pre-line">
                {nextProject.title}
              </h4>
            </Link>
          </div>

          {/* Bottom Right TOP Scroll Button */}
          <div className="flex justify-end pt-12 sm:pt-8">
            <a
              href="#top"
              className="flex items-center gap-1.5 rounded-none border border-line bg-ink px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-cream hover:border-emerald-glow hover:text-emerald-glow transition-colors shadow-lg"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>TOP</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
