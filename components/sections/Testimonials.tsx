"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles, Award } from "lucide-react";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section id="trust" className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 border-y border-line">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-glow mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Trust &amp; Peer Social Proof</span>
          </div>

          <h2 className="display text-4xl text-cream sm:text-6xl lg:text-7xl">
            Testimonials &amp; Endorsements
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-cream-dim leading-relaxed">
          Feedback from student leaders, project coordinators, and academic evaluators on real-world systems delivered.
        </p>
      </div>

      {/* Editorial Testimonials Grid */}
      <div className={`grid divide-y md:divide-y-0 md:divide-x divide-line border-y border-line ${
        testimonials.length === 1
          ? "grid-cols-1 max-w-3xl mx-auto"
          : testimonials.length === 2
          ? "md:grid-cols-2"
          : "md:grid-cols-3"
      }`}>
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col justify-between py-8 md:p-8 space-y-8 group"
          >
            <div className="space-y-4">
              <Quote className="h-6 w-6 text-emerald-glow/50 transition-colors group-hover:text-emerald-glow" />
              <p className="text-sm leading-relaxed text-cream/90 italic font-light">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-6 border-t border-line space-y-4">
              {t.metric && (
                <div className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-emerald-glow">
                  <Award className="h-3 w-3" />
                  <span>{t.metric}</span>
                </div>
              )}

              {/* Author Info with Avatar Thumbnail / Initials Badge */}
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="h-10 w-10 rounded-full border border-emerald-glow/40 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-glow/40 bg-ink-soft font-mono text-xs font-bold text-emerald-glow">
                    {t.initials || t.author.slice(0, 2).toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-cream text-sm group-hover:text-emerald-glow transition-colors">
                    {t.author}
                  </h3>
                  <p className="font-mono text-[0.7rem] text-cream-dim">
                    {t.role} • <span className="text-emerald-glow">{t.organization}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
