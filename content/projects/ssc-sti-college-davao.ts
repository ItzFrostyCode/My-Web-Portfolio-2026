import type { Project } from "@/types";

export const sscStiCollegeDavao: Project = {
  id: "ssc-sti-college-davao",
  index: "01",
  title: "SSC STI COLLEGE\nDAVAO",
  subtitle: "Supreme Student Council Centralized Web Portal",
  category: "Platform Project",
  role: "System Developer",
  status: "Production / Live",
  description:
    "Centralized web portal and announcement system for STI College Davao's Supreme Student Council (A.Y. 2025–2026) — featuring Home, Announcements Feed, Interactive Events Calendar, Tigi-Ay Intramurals Leaderboard, and Officers Directory.",
  problem:
    "Campus event updates, council announcements, and intramural standings were scattered across fragmented social media pages, leading to low student engagement and missed academic notices.",
  solution:
    "Engineered an ultra-fast, zero-dependency web portal using HTML5, Vanilla CSS3, modular JavaScript (ES Modules), and a dynamic JSON data pipeline. Integrated real-time client-side search filtering, dark/light theme switching, interactive Tigi-Ay 2025 intramural standings, event countdowns, and Vercel Analytics.",
  funFact:
    "Designed and launched live in under 48 hours to streamline SSC communications for 930+ STI College Davao students, featuring custom sound FX and dynamic confetti celebrations!",
  stack: ["HTML5", "Vanilla CSS3", "JavaScript (ES6+)", "JSON Data Store", "Vercel"],
  image: "/media/projects/ssc-sti-college-davao-setup.jpg",
  demoImage: "/media/projects/ssc-sti-college-davao-setup.jpg",
  screenshots: [
    "/media/projects/ssc-sti-college-davao-setup.jpg"
  ],
  website: "https://sscsticollegedavao.vercel.app/",
  contributions: [
    "Architected modular Vanilla JS (ES Modules) frontend with dynamic page booting and skeleton loaders for instant transitions.",
    "Engineered custom CSS design system featuring dark/light glassmorphic UI, responsive layouts, and zero layout shifts on mobile.",
    "Built client-side caching & data loader pipeline (dataLoader.js) with TTL caching for announcements, events, officers, and intramural standings.",
    "Implemented dynamic client-side search engine (search.js) enabling real-time filtering across announcements and campus activities.",
    "Developed Tigi-Ay 2025 Intramurals feature section with live team rosters (Dragon Vanguard, Pegasus Fury, Phoenix Invictus) across 17 competitive events.",
    "Configured strict Content-Security-Policy (CSP) headers, Vercel CI/CD workflow, and Vercel Speed Insights analytics."
  ],
  metrics: [
    { value: "930+", label: "STUDENTS REACHED", subtext: "STI College Davao Student Body (A.Y. 2025–2026)" },
    { value: "< 48 hrs", label: "LAUNCH TIME", subtext: "Rapid Prototype to Production" },
    { value: "17", label: "INTRAMURAL EVENTS", subtext: "Tigi-Ay 2025 Competition Coverage" }
  ]
};
