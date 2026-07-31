import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";

export const metadata = {
  title: "About & Biography — Joshua Arabejo",
  description: "Learn more about Joshua Arabejo's background, full-stack tech stack, UI/UX workflow, and development standards.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ink text-cream selection:bg-emerald-core selection:text-ink pb-20">
      {/* Top Header Spacing & Back Link Bar */}
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream-dim hover:text-emerald-glow transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      <About />
      <Skills />
    </main>
  );
}
