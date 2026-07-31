import type { Project } from "@/types";

export const vcccManagementSystem: Project = {
  id: "vccc-management-system",
  index: "04",
  title: "VCCC Management System",
  subtitle: "Church Ministry & QR Delegate Platform",
  category: "Client Project",
  role: "Full-Stack Web Developer",
  status: "Production / Live",
  description:
    "Web-based ministry records and QR delegate management platform engineered for Victory Chapel Christian Center Davao — digitizing bi-annual multi-day church conferences (500+ delegates from 300+ churches). Features dynamic 1–5 day schedule engines, automated QR badge generation, sub-second meal ticket redemption scanning, multi-tier district hierarchy management, and one-click Excel reporting.",
  problem:
    "Bi-annual church conferences gather 500+ delegates from 300+ churches — each church sending a pastor, a pastor's wife, and multiple disciples. For years, the preparation phase consumed days of manual labor: assistants copy-pasted 500+ names (including long formal titles) into rigid 5-day ID templates, printed and hand-cut 5,000+ meal stubs, then distributed them to pastors who handed them off to wives and disciples. The friction wasn't at the meal line — food assistants knew the pastors and could hand out stubs in 1 second. The real pain was structural: static templates assumed full 5-day attendance, yet some conferences ran only 3 days and many delegates arrived on the last night or left early — leaving hundreds of pre-cut stubs unused and wasted. Tracking who received what relied on ballpen lists. Every 6 months, the entire process reset: new background, same manual labor, same errors, zero data reusability.",
  solution:
    "Architected a production Vue 3 + Supabase platform with a reusable delegate registry linking pastors, wives, and disciples per church. Replaced rigid templates with a dynamic conference-length engine (1–5 days) so admins configure exact attendance days per delegate — no more wasted stubs. Automated QR badge generation eliminated 5,000+ paper stubs and the scissors used to cut them. Camera-based QR scanning delivered instant meal redemption with automatic duplicate prevention. One-click Excel exports replaced handwritten ballpen tallies.",
  funFact:
    "Replaced over 5,000+ physical paper meal stubs and the manual ID preparation process that took days — now generated in minutes with zero scissors involved.",
  stack: ["Vue 3", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "HTML5 QR Scanner", "ExcelJS"],
  image: "/media/projects/vccc-management-system.jpg",
  features: [
    "Dual-Purpose QR Badge Engine: Generates a single dynamic QR badge per delegate serving as both a physical ID and scannable meal attendance ticket.",
    "Dynamic Multi-Day Event Scheduler: Configurable 1 to 5-day conference timeline with automatic Morning, Afternoon, and Evening meal slot check-in rules.",
    "Sub-Second Camera QR Scanner: Client-side camera scanner built with html5-qrcode for instant delegate verification and real-time meal ticket redemption.",
    "Automated Meal Ticket Validation: Prevents duplicate food redemptions by enforcing single-redemption locks per delegate per session.",
    "Ministry Hierarchy & Lineage Records: Centralized tracking of districts, local churches, pastors, spouses, and disciples with full assignment history.",
    "Automated Badge Design & Bulk ZIP Packaging: Auto-populates names, photos, and QR codes into card templates with one-click bulk image rendering and ZIP export.",
    "Customizable Excel & PDF Exporters: Generates real-time attendance logs, meal distribution audits, and delegate rosters with user-selectable columns.",
    "Supabase RLS & Role-Based Access: Secures confidential ministry records with multi-role access controls (Admin management vs. Staff scanning)."
  ],
  contributions: [
    "Engineered real-time Vue 3 SPA backed by Supabase PostgreSQL for high-concurrency conference registration and delegate tracking.",
    "Designed dynamic multi-day conference length engine allowing admins to configure 1 to 5-day event schedules per delegate without manual template redesigns.",
    "Built camera-based QR code scanner module delivering sub-second delegate badge verification and instant meal redemption checks.",
    "Developed automated single-redemption meal ticket validation engine that eliminated 5,000+ paper stubs and prevented double redemptions.",
    "Implemented multi-tier church hierarchy management connecting districts, local churches, pastors, pastor wives, and disciples in a unified database.",
    "Created one-click Excel reporting engine exporting comprehensive attendance logs, meal distribution audits, and delegate rosters.",
    "Configured Supabase Row-Level Security (RLS) policies to safeguard sensitive ministry leadership and church member data."
  ],
  metrics: [
    { value: "300+", label: "CHURCHES", subtext: "Pastors, wives & disciples registered" },
    { value: "500+", label: "DELEGATES", subtext: "Managed per conference cycle" },
    { value: "5,000+", label: "STUBS ELIMINATED", subtext: "Replaced physical meal tickets" },
    { value: "Days → Minutes", label: "ID PREP TIME", subtext: "From manual copy-paste/cut to auto-generated" },
    { value: "0", label: "DUPLICATE MEALS", subtext: "Automated redemption validation" }
  ],
  credentials: {
    isPrivate: true,
    note: "Private Production Platform — Live system restricted to authorized church administrators."
  }
};