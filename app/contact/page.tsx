import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";

export const metadata = {
  title: "Contact & Project Inquiries — Joshua Arabejo",
  description: "Get in touch with Joshua Arabejo for freelance web development, UI/UX design, or full-stack software inquiries.",
};

export default function ContactPage() {
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

      <Contact />
      <FAQ />
    </main>
  );
}
