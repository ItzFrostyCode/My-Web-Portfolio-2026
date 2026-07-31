"use client";

import { motion } from "framer-motion";

interface TechItem {
  name: string;
  icon: string; // SVG data URI or simple icon path
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    title: "FRONTEND",
    items: [
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Nuxt.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
      },
      {
        name: "HTML",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    title: "BACKEND & DATA",
    items: [
      {
        name: "Laravel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      },
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Supabase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      },
    ],
  },
  {
    title: "MOBILE",
    items: [
      {
        name: "React Native",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Java (Android)",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
      },
    ],
  },
  {
    title: "TOOLS & INTEGRATIONS",
    items: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-line bg-ink-soft/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 space-y-16">
        {/* Header Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-glow">
            <span className="h-2 w-2 rounded-full bg-emerald-glow animate-pulse" />
            <span>TECH STACK</span>
          </div>

          <h2 className="display text-4xl text-cream sm:text-6xl lg:text-7xl">
            Tools I use to <br />
            <span className="text-cream-dim">ship great products.</span>
          </h2>
        </div>

        {/* Categories List */}
        <div className="space-y-12">
          {techCategories.map((cat) => (
            <div key={cat.title} className="space-y-6">
              {/* Category Header with Horizontal Rule */}
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-cream-dim shrink-0">
                  {cat.title}
                </h3>
                <div className="h-px w-full bg-line" />
              </div>

              {/* Tech Cards Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
                {cat.items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative flex flex-col items-center justify-center rounded-2xl border border-line bg-ink p-5 text-center shadow-lg transition-all duration-300 hover:border-emerald-glow/50 hover:bg-ink-soft"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="h-8 w-8 object-contain transition-transform group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-sans text-xs font-medium text-cream group-hover:text-emerald-glow transition-colors">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
