"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, Sparkles, X, Check, Heart } from "lucide-react";

export function FeedbackWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  if (pathname.startsWith("/projects/")) return null;

  const handleRating = (stars: number) => {
    setRating(stars);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            className="mb-3 w-72 rounded-2xl border border-emerald-glow/40 bg-ink-soft/95 p-5 shadow-2xl backdrop-blur-lg"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-cream-dim hover:text-cream transition-colors"
              aria-label="Close feedback widget"
            >
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-glow uppercase font-bold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Portfolio Feedback</span>
                </div>
                <p className="text-xs text-cream/90 leading-relaxed">
                  How is your experience browsing my 2026 web portfolio?
                </p>
                <div className="flex items-center justify-around pt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className="group p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      <span className="inline-block transition-transform group-hover:scale-110">
                        {star === 5 ? "🔥" : star === 4 ? "⭐" : star === 3 ? "👍" : star === 2 ? "🙂" : "💭"}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-[0.65rem] font-mono text-cream-dim text-center">
                  1-Click Instant Rating • Helps Me Grow!
                </p>
              </div>
            ) : (
              <div className="py-4 text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-glow/20 text-emerald-glow">
                  <Check className="h-5 w-5" />
                </div>
                <p className="font-bold text-xs text-cream">Thank You for the Feedback!</p>
                <p className="text-[0.7rem] text-cream-dim flex items-center justify-center gap-1">
                  <span>Made with</span> <Heart className="h-3 w-3 text-emerald-glow fill-emerald-glow" /> <span>in Davao</span>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-emerald-glow/50 bg-ink-soft/90 px-4 py-2.5 font-mono text-xs text-emerald-glow shadow-xl backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
        aria-label="Open portfolio feedback survey"
      >
        <MessageSquareHeart className="h-4 w-4" />
        <span className="hidden sm:inline font-semibold">Feedback</span>
      </button>
    </div>
  );
}
