"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Tag, ArrowUpRight, X } from "lucide-react";
import { journalArticles, type JournalArticle } from "@/content/journal";

export function Journal() {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      {/* Header */}
      <div className="mb-16">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-emerald-glow/30 bg-emerald-deep/20 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-emerald-glow mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Developer Journal</span>
        </motion.div>

        <motion.h2
          className="display text-4xl text-cream sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Tech Insights &amp; Dev Logs
        </motion.h2>

        <motion.p
          className="mt-4 max-w-2xl text-sm text-cream-dim sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Behind-the-scenes architectural breakdowns, lessons learned from real projects, and engineering experiences.
        </motion.p>
      </div>

      {/* Articles Cards Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {journalArticles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="group relative flex flex-col justify-between rounded-2xl border border-line bg-ink-soft/80 p-8 transition-all duration-500 hover:border-emerald-glow/40 hover:bg-ink-soft"
          >
            <div>
              <div className="flex items-center justify-between gap-2 font-mono text-xs text-cream-dim mb-4">
                <span className="rounded bg-emerald-glow/10 px-2.5 py-1 text-emerald-glow uppercase font-semibold">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {article.readTime}
                </span>
              </div>

              <h3 className="font-bold text-cream text-lg group-hover:text-emerald-glow transition-colors duration-300 mb-3">
                {article.title}
              </h3>

              <p className="text-xs sm:text-sm text-cream-dim leading-relaxed mb-6">
                {article.summary}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 font-mono text-[0.65rem] text-cream-dim border border-line rounded px-2 py-0.5"
                  >
                    <Tag className="h-2.5 w-2.5" /> {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedArticle(article)}
                className="inline-flex w-full items-center justify-between border-t border-line pt-4 font-mono text-xs text-cream transition-colors group-hover:text-emerald-glow"
              >
                <span>Read Full Case Insight</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl border border-emerald-glow bg-ink p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 text-cream-dim hover:text-cream transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 font-mono text-xs text-emerald-glow">
                <span className="rounded bg-emerald-glow/20 px-2.5 py-1 uppercase font-bold">
                  {selectedArticle.category}
                </span>
                <span>• {selectedArticle.date}</span>
                <span>• {selectedArticle.readTime}</span>
              </div>

              <h3 className="display text-2xl sm:text-3xl text-cream">
                {selectedArticle.title}
              </h3>

              <div className="space-y-4 text-sm text-cream-dim leading-relaxed border-y border-line py-6">
                <p className="font-semibold text-cream">Executive Summary &amp; Background:</p>
                <p>{selectedArticle.summary}</p>

                <div className="rounded-xl bg-emerald-deep/20 border border-emerald-glow/30 p-4 space-y-1">
                  <p className="font-mono text-xs uppercase font-bold text-emerald-glow">
                    💡 Key Engineering Takeaway:
                  </p>
                  <p className="text-cream text-xs sm:text-sm italic">
                    &ldquo;{selectedArticle.keyTakeaway}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="rounded-full bg-emerald-glow px-6 py-2.5 font-mono text-xs font-bold text-ink uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
