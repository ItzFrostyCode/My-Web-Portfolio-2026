import type { Project } from "@/types";

export const sutura: Project = {
  id: "sutura",
  index: "08",
  title: "SUTURA",
  subtitle: "Tailoring Shop SaaS & Digital Measurement Vault",
  category: "Ongoing Thesis",
  role: "Lead SaaS Architect & Full-Stack Developer",
  status: "Active Thesis / In Development",
  description:
    "Full-stack multi-tenant SaaS platform for tailoring shops in Davao City — integrating Davao map shop discovery, tiered subscriptions, digital body measurement vaults, a 13-stage real-time garment production tracker, and multi-role dashboards.",
  problem:
    "Traditional tailoring businesses in Davao City rely on physical paper logbooks for body measurements, leading to lost records, improper garment sizing, lack of order progress transparency, and communication breakdowns during repair and custom order workflows.",
  solution:
    "Architected a full-stack multi-tenant web platform connecting tailoring shop owners, staff, and customers with interactive Davao City map navigation, 25+ parameter digital measurement vaults, a 13-stage production status pipeline with automated SMS/email alerts, and role-based operational dashboards.",
  funFact:
    "Features a comprehensive 13-stage garment production lifecycle (from Order Received to Fitting and Pickup) and digitizes over 25+ body measurement parameters into encrypted customer profiles!",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "Laravel (PHP)",
    "PostgreSQL (Supabase)",
    "Cloudflare R2",
    "RESTful APIs",
    "Google Maps / Mapbox API",
    "Twilio / SMS Gateway"
  ],
  image: "/media/projects/sutura.jpg",
  demoImage: "/media/projects/sutura.jpg",
  screenshots: [
    "/media/projects/sutura.jpg"
  ],
  contributions: [
    "Architected multi-tenant database schema on PostgreSQL (Supabase) isolating data across registered Davao tailoring shop accounts.",
    "Designed structured digital body measurement vault storing 25+ tailored parameters (Chest, Waist, Hip, Inseam, Shoulder, Sleeve, etc.) to eliminate paper logbooks.",
    "Engineered 13-stage garment production status tracking pipeline (Order Received → Measurement → Cutting → Sewing → Fitting → Pickup) with real-time progress monitoring.",
    "Integrated automated SMS/email notification engine notifying customers instantly as their custom garment transitions through each production stage.",
    "Developed Davao City map-based shop discovery enabling customers to filter verified tailors by location, availability, and garment specialization (Filipiniana, Barong, Gowns, Uniforms, Alterations).",
    "Built dedicated role-based dashboards for System Admins (shop approvals, subscription tiers), Shop Owners (revenue analytics, catalog management), Tailoring Staff (production queues), and Customers (order tracking).",
    "Integrated Cloudflare R2 object storage for high-performance delivery of shop logos, storefront banners, gallery portfolios, and garment progress photos."
  ],
  metrics: [
    { value: "25+", label: "BODY PARAMETERS", subtext: "Structured digital measurement vault" },
    { value: "13 Stages", label: "PRODUCTION PIPELINE", subtext: "Real-time order status tracking" },
    { value: "4 Roles", label: "RBAC ARCHITECTURE", subtext: "Admin, Owner, Staff, & Customer portals" }
  ]
};
