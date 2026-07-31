"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Hiring" | "Services" | "Process";
}

const faqs: FAQItem[] = [
  {
    question: "Are you available for full-time hire or freelance contracts?",
    answer:
      "Yes! As a 4th-year IT student graduating soon, I am actively open for Junior/Associate Full-Stack Developer roles, software contracts, and freelance projects. I can work remotely or locally in Davao City, PH.",
    category: "Hiring",
  },
  {
    question: "What is your typical turnaround time for a custom web application?",
    answer:
      "Depending on scope, small-to-medium web portals (like campaign sites or landing pages) take 3 to 7 days. Full-stack management platforms (like VCCC or SUTURA) are typically delivered in 2 to 4 weeks with iterative client reviews.",
    category: "Services",
  },
  {
    question: "Can you build both Web and Desktop applications?",
    answer:
      "Absolutely. I build reactive modern web applications using Next.js/React/Laravel and offline desktop management applications using C# WinForms or Java Swing backed by MySQL databases.",
    category: "Services",
  },
  {
    question: "How do we get started on a project collaboration?",
    answer:
      "Simply click 'Schedule Consultation' or email me at itzjoshuawayman@gmail.com with your project idea. We'll discuss requirements, outline tech architecture, set a clear timeline, and start building!",
    category: "Process",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="rounded-3xl border border-line bg-ink-soft/80 p-8 sm:p-12 lg:p-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-glow/30 bg-emerald-deep/20 px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-emerald-glow mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="display text-3xl text-cream sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-cream-dim sm:text-base">
            Clear answers to common questions from potential clients, employers, and team leaders.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-line bg-ink transition-colors duration-300 hover:border-emerald-glow/40"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-cream text-base sm:text-lg pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-emerald-glow" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-cream-dim" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-line/50 px-6 pb-6 pt-2 text-xs sm:text-sm text-cream-dim leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
