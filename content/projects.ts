import type { Project } from "@/types";

/**
 * Featured projects.
 * Edit, remove, or add entries here — the UI updates automatically.
 * Replace `image` with a real screenshot path in /public when ready.
 */
export const projects: Project[] = [
  {
    id: "ssc-sti-college-davao",
    index: "01",
    title: "SSC STI College Davao",
    category: "Platform Project",
    description:
      "Centralized web portal for STI College Davao's Supreme Student Council (A.Y. 2025-2026) — with Home, Announcements, Events, Intramurals, and Officers sections for campus-wide communication.",
    stack: ["HTML", "CSS", "JavaScript", "JSON"],
    image: "/media/projects/ssc-sti-college-davao.jpg", // placeholder — replace with a real screenshot
    website: "https://ssc-sti-college-davao.vercel.app/",
  },
  {
    id: "gym-subscription-membership-system",
    index: "02",
    title: "Gym Subscription Membership System",
    category: "Client Project",
    description:
      "Offline desktop system for gym operations — member records, subscription plans, trainer appointments, equipment tracking, and transactions in one place.",
    stack: ["C#", "WinForms", ".NET", "MySQL"],
    image: "/media/projects/gym-subscription-membership-system.jpg", // placeholder — replace with a real screenshot
    // code link intentionally not shown
  },
  {
    id: "libratrack",
    index: "03",
    title: "LibraTrack",
    category: "Client Project",
    description:
      "Desktop library system replacing paper logbooks — book catalog, borrower records, borrow/return workflow, and automatic overdue fine computation.",
    stack: ["Java", "Swing", "OOP"],
    image: "/media/projects/libratrack.jpg", // placeholder — replace with a real screenshot
    // code link intentionally not shown
  },
  {
    id: "vccc-management-system",
    index: "04",
    title: "VCCC Management System",
    category: "Client Project",
    description:
      "Web-based ministry records system for Victory Chapel Christian Center Davao — manages and assigns pastors, churches, and districts with full profile views, QR-coded delegate IDs, conference attendance/meal tracking, and Excel reporting.",
    stack: ["Vue 3", "Vite", "Tailwind CSS", "Supabase"],
    image: "/media/projects/vccc-management-system.jpg", // placeholder — replace with a real screenshot
    // church/client project — no public link
  },
  {
    id: "school-library-management-system",
    index: "05",
    title: "School Library Management System",
    category: "Own Project",
    description:
      "Java Swing desktop app that digitizes school library operations — book inventory, student borrowing, overdue fines, and reporting.",
    stack: ["Java", "Swing", "NetBeans", "MVC"],
    image: "/media/projects/school-library-management-system.jpg", // placeholder — replace with a real screenshot
    // personal rebuild of LibraTrack for a real-world practicum scenario — code link intentionally not shown
  },
  {
    id: "securelend",
    index: "06",
    title: "SecureLend",
    category: "Own Project",
    description:
      "Desktop lending management system built around a real double-entry ledger — borrower KYC, loan origination, multi-channel repayments, and audit-ready reports.",
    stack: ["Java", "Swing", "Maven", "CSV"],
    image: "/media/projects/securelend.jpg", // placeholder — replace with a real screenshot
    // code link intentionally not shown
  },
  {
    id: "basic-libratrack",
    index: "07",
    title: "Basic LibraTrack",
    category: "School Project",
    description:
      "Earlier WinForms take on a school library system, backed by MySQL — book catalog, user records, loans, and fine tracking with an admin dashboard.",
    stack: ["C#", "WinForms", "MySQL", "Figma"],
    image: "/media/projects/basic-libratrack.jpg", // placeholder — replace with a real screenshot
    // final group activity, 2nd year 2nd sem, 2025 — no public repo
  },
  {
    id: "sutura",
    index: "08",
    title: "SUTURA",
    category: "Ongoing Thesis",
    description:
      "Web-based tracker for tailoring shops in Davao City — tiered shop subscriptions, secure digital measurement storage, real-time order tracking, and business analytics for admins, shop owners, and customers.",
    stack: [
      "Next.js",
      "Laravel",
      "Supabase",
      "Cloudflare R2",
    ],
    image: "/media/projects/sutura.jpg", // placeholder — replace with a real screenshot
    // thesis in progress — no public link yet
  },
];
