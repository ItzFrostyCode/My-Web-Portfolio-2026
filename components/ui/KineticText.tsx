"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.25 },
  },
};

const letter: Variants = {
  hidden: { y: "110%", rotate: 4, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

interface KineticTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
}

/** Animates a headline letter-by-letter with a cinematic mask-reveal. */
export function KineticText({ text, className, as = "h1" }: KineticTextProps) {
  const MotionTag =
    as === "h1" ? motion.h1 : as === "h2" ? motion.h2 : motion.p;

  return (
    <MotionTag
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="mr-[0.28em] flex overflow-hidden pb-[0.06em]">
          {word.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              variants={letter}
              className="will-transform inline-block"
              aria-hidden
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
