"use client";

import { motion } from "framer-motion";
import { Download, Sparkles, CheckCircle2 } from "lucide-react";
import { media } from "@/content/media";
import { GitHubContributions } from "@/components/ui/GitHubContributions";

export function About() {
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS"],
    backend: ["Java", "C#", "MySQL", "Supabase", "Laravel"],
  };

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
      {/* Main Grid */}
      <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
        {/* Left: Photo & Resume CTA */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="space-y-4 h-fit"
        >
          <div className="overflow-hidden bg-ink-soft">
            <img
              src={media.closer.poster}
              alt="Joshua Wayman A. Arabejo"
              className="block h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Resume Download CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            download
            className="group flex w-full items-center justify-center gap-2.5 rounded-full border border-emerald-glow/40 bg-emerald-deep/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-emerald-glow transition-all duration-300 hover:border-emerald-glow hover:bg-emerald-glow hover:text-ink shadow-lg"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="font-bold">Download Resume / CV</span>
          </a>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="space-y-8"
        >
          <div>
            <p className="eyebrow mb-2">BIOGRAPHY &amp; CAPABILITIES</p>
            <h2 className="text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              Joshua Wayman A. <span className="italic text-emerald-glow">Arabejo</span>
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-cream-dim sm:text-base font-light">
            Aspiring Full-Stack Developer &amp; UI/UX Designer from Davao City, Philippines. Currently a 4th-year Information Technology student dedicated to crafting clean, efficient code and intuitive user interfaces for web applications.
          </p>

          {/* Info Grid - Compact */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 sm:grid-cols-4 sm:gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Based In
              </p>
              <p className="mt-1 text-xs font-semibold text-cream">Davao City, PH</p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Timezone
              </p>
              <p className="mt-1 text-xs font-semibold text-cream">UTC+8 (PST)</p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Languages
              </p>
              <p className="mt-1 text-xs font-semibold text-cream">English, Filipino</p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Status
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-glow">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-glow" />
                Open for Projects &amp; Work
              </p>
            </div>
          </div>

          {/* Toolkit - Inline */}
          <div className="space-y-4 text-xs">
            <div>
              <p className="font-mono uppercase tracking-widest text-cream-dim mb-2">
                Frontend &amp; UI/UX Technologies
              </p>
              <p className="flex flex-wrap gap-1.5 text-cream">
                {skills.frontend.map((skill) => (
                  <span key={skill} className="rounded bg-ink-soft border border-line px-2.5 py-1 font-mono">
                    {skill}
                  </span>
                ))}
              </p>
            </div>

            <div>
              <p className="font-mono uppercase tracking-widest text-cream-dim mb-2">
                Backend &amp; Databases
              </p>
              <p className="flex flex-wrap gap-1.5 text-cream">
                {skills.backend.map((skill) => (
                  <span key={skill} className="rounded bg-ink-soft border border-line px-2.5 py-1 font-mono">
                    {skill}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Student-Friendly Collaboration & UI/UX Building Section */}
          <div className="border-t border-line pt-6 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-glow">
              <Sparkles className="h-4 w-4" />
              <span>Ready to Collaborate &amp; Build</span>
            </div>
            <p className="text-xs sm:text-sm text-cream-dim leading-relaxed font-light">
              Passionate BSIT student ready to bring UI/UX designs to life and build responsive, user-friendly web applications. Eager to collaborate on client projects, web design prototypes, or join innovative tech teams!
            </p>
            <div className="flex flex-wrap gap-4 pt-2 font-mono text-[0.7rem] text-cream">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-glow" /> UI/UX Design &amp; Prototyping
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-glow" /> Full-Stack Web Applications
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-glow" /> Custom Web &amp; Student Projects
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* GitHub Contributions Interactive Heatmap Card */}
      <div className="mt-16">
        <GitHubContributions />
      </div>

      {/* Beyond Code Section - 2 Column Grid */}
      <div className="mt-16 border-t border-line pt-16 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Column: Beyond Code Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">PERSONAL LIFE &amp; HOBBIES</p>
            <h3 className="display text-3xl text-cream sm:text-5xl">BEYOND CODE</h3>
          </div>

          <div className="flex flex-wrap gap-2.5 font-mono text-xs uppercase tracking-wider text-cream">
            <span className="rounded-full border border-line bg-ink-soft px-4 py-2 flex items-center gap-2">
              <span>🎮</span> <span>GAMING</span>
            </span>
            <span className="rounded-full border border-line bg-ink-soft px-4 py-2 flex items-center gap-2">
              <span>🥁</span> <span>DRUMS</span>
            </span>
            <span className="rounded-full border border-line bg-ink-soft px-4 py-2 flex items-center gap-2">
              <span>🎤</span> <span>SINGING</span>
            </span>
            <span className="rounded-full border border-line bg-ink-soft px-4 py-2 flex items-center gap-2">
              <span>💪🏼</span> <span>WORKOUT</span>
            </span>
            <span className="rounded-full border border-line bg-ink-soft px-4 py-2 flex items-center gap-2">
              <span>☕</span> <span>COFFEE</span>
            </span>
            <span className="rounded-full border border-line bg-ink-soft px-4 py-2 flex items-center gap-2">
              <span>🎬</span> <span>MOVIES</span>
            </span>
          </div>

          <p className="text-sm sm:text-base text-cream-dim font-light leading-relaxed max-w-xl">
            Gaming, music, singing, workout, coffee, movies — usually a drum nearby.
          </p>
        </div>

        {/* Right Column: Flat Setup Photo */}
        <div className="overflow-hidden bg-ink-soft">
          <img
            src="/images/setup.jpg"
            alt="Joshua's Workspace Setup"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
