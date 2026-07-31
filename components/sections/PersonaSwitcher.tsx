"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Building2, Code2, ArrowRight, CheckCircle2 } from "lucide-react";
import { lenisInstance } from "@/components/providers/SmoothScroll";

type PersonaKey = "client" | "business" | "recruiter";

interface PersonaConfig {
  id: PersonaKey;
  label: string;
  badge: string;
  icon: typeof UserCheck;
  headline: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaTarget: string;
  recommendedProjects: string[];
}

const personas: Record<PersonaKey, PersonaConfig> = {
  client: {
    id: "client",
    label: "For Clients & Individuals",
    badge: "Custom Web Solutions",
    icon: UserCheck,
    headline: "Need a high-impact website or custom app for your project?",
    description:
      "I transform your ideas into fast, responsive, and beautifully engineered web applications designed to convert visitors and deliver flawless user experiences.",
    benefits: [
      "Custom responsive design tailored to your brand identity",
      "Fast turnaround time with clean, maintainable code",
      "Integrated booking, contact, or management portals",
    ],
    ctaText: "Discuss Your Project",
    ctaTarget: "contact",
    recommendedProjects: ["SSC STI College Davao", "SUTURA", "VCCC Management System"],
  },
  business: {
    id: "business",
    label: "For Businesses & Organizations",
    badge: "Operational Efficiency & ROI",
    icon: Building2,
    headline: "Looking to digitize manual workflows or internal operations?",
    description:
      "I specialize in building custom management systems, inventory trackers, and operational portals that automate manual paper trails, cut costs, and boost productivity.",
    benefits: [
      "Digitized record-keeping & audit-ready database logging",
      "QR code scanning, attendance, and inventory automation",
      "Custom analytics dashboards with automated Excel export",
    ],
    ctaText: "Schedule Operations Consultation",
    ctaTarget: "contact",
    recommendedProjects: ["Gym Membership System", "LibraTrack", "SecureLend"],
  },
  recruiter: {
    id: "recruiter",
    label: "For Recruiters & Tech Leads",
    badge: "Full-Stack Skills & Code Quality",
    icon: Code2,
    headline: "Hiring a proactive Full-Stack Developer or IT Associate?",
    description:
      "4th-year IT student with proven hands-on experience in Next.js, TypeScript, C#, Java, Laravel, and MySQL. Strong problem-solver dedicated to clean architecture and continuous learning.",
    benefits: [
      "Proven track record delivering 8+ real-world projects",
      "Solid understanding of OOP, MVC, REST APIs, & SaaS architecture",
      "Ready for immediate hire (remote, hybrid, or local Davao City)",
    ],
    ctaText: "Download Resume / Contact",
    ctaTarget: "about",
    recommendedProjects: ["SUTURA Thesis", "SecureLend Java Engine", "SSC STI Portal"],
  },
};

export function PersonaSwitcher() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("client");
  const current = personas[activePersona];

  const handleCtaClick = (targetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    if (lenisInstance) {
      lenisInstance.scrollTo(el, { duration: 1.5 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="solutions" className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 border-y border-line">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="eyebrow mb-3">Tailored Solutions</p>
          <h2 className="display text-4xl text-cream sm:text-6xl lg:text-7xl">
            How Can I Help You Build?
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-cream-dim leading-relaxed">
          Select your role below to view custom solutions, operational benefits, and relevant project highlights.
        </p>
      </div>

      {/* Clean Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-4 mb-12">
        {(Object.keys(personas) as PersonaKey[]).map((key) => {
          const p = personas[key];
          const Icon = p.icon;
          const isActive = activePersona === key;

          return (
            <button
              key={key}
              onClick={() => setActivePersona(key)}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? "border-b-2 border-emerald-glow text-emerald-glow font-bold"
                  : "text-cream-dim hover:text-cream"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Persona Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="grid gap-12 lg:grid-cols-12 lg:items-start"
        >
          {/* Left: Overview & Key Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-emerald-glow font-bold uppercase tracking-widest">
                {current.badge}
              </span>
            </div>

            <h3 className="display text-3xl text-cream sm:text-5xl leading-tight">
              {current.headline}
            </h3>

            <p className="text-base text-cream-dim leading-relaxed sm:text-lg font-light">
              {current.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-line">
              {current.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="font-mono text-xs text-emerald-glow font-bold pt-0.5">
                    0{i + 1}
                  </span>
                  <span className="text-sm text-cream/90 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a
                href={`#${current.ctaTarget}`}
                onClick={handleCtaClick(current.ctaTarget)}
                className="inline-flex items-center gap-2 border-b border-emerald-glow pb-1 font-mono text-xs uppercase tracking-widest text-emerald-glow font-bold transition-all hover:gap-3"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: Recommended Showcase List */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-line lg:pl-12">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-glow font-bold">
              Key Project Highlights
            </p>

            <div className="divide-y divide-line border-y border-line">
              {current.recommendedProjects.map((proj, i) => (
                <button
                  key={i}
                  onClick={handleCtaClick("projects")}
                  className="flex w-full items-center justify-between py-4 text-left group transition-colors hover:text-emerald-glow"
                >
                  <span className="font-sans text-base text-cream font-medium group-hover:text-emerald-glow transition-colors">
                    {proj}
                  </span>
                  <span className="font-mono text-xs text-cream-dim group-hover:text-emerald-glow flex items-center gap-1 transition-colors">
                    <span>View</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
