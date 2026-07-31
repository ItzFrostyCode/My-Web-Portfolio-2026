import type { Project } from "@/types";

export const gymSubscriptionMembershipSystem: Project = {
  id: "gym-subscription-membership-system",
  index: "02",
  title: "Gym Subscription Membership System",
  subtitle: "Desktop Gym Operations & Expiry Portal",
  category: "School Project",
  role: "Lead Desktop Developer",
  status: "Completed School Project",
  description:
    "Offline desktop system for gym operations — centralizing member profiles, subscription plans, attendance logs, trainer appointments, equipment incident tracking, and financial transactions into a single portal.",
  problem:
    "Gyms relying on manual paper logbooks face lost member records, unmonitored subscription expiries, uncoordinated trainer schedules, and untracked equipment maintenance.",
  solution:
    "Engineered an offline-first C# Avalonia UI desktop application backed by a local MySQL relational database with automated schema initialization and real-time membership expiry flagging.",
  funFact:
    "Features an automated startup routine that scans member records and instantly marks subscriptions as expired, plus smart plan renewal that stacks seamlessly onto existing active durations!",
  stack: ["C#", "Avalonia UI", ".NET 8", "MySQL"],
  image: "/media/projects/gym-subscription-membership-system.png",
  demoImage: "/media/projects/gym-subscription-membership-system.png",
  contributions: [
    "Architected a normalized 10-table MySQL relational database schema covering members, subscriptions, trainers, appointments, equipment incidents, maintenance, and payments.",
    "Built a clean desktop UI using Avalonia UI (.NET 8) with Fluent styling optimized for 1366x768 display resolution.",
    "Engineered an automated background subscription service that detects and flags expired member statuses on application startup.",
    "Designed an N-tier architecture (Views, ViewModels/Controllers, Services, Repositories) powered by Dependency Injection and MySqlConnector.",
    "Implemented member check-in/out attendance logging, equipment incident reporting with severity levels, and multi-channel payment tracking (Cash, GCash, Bank Transfer).",
    "Integrated database transactions with atomic commit/rollback protections during plan assignments and status updates."
  ],
  metrics: [
    { value: "100%", label: "OFFLINE RELIABILITY", subtext: "Zero cloud dependency required" },
    { value: "3x", label: "FASTER CHECK-INS", subtext: "Sub-second member record retrieval" },
    { value: "0", label: "EXPIRED REVENUE LEAKS", subtext: "Automated expiry flagging" }
  ]
};
