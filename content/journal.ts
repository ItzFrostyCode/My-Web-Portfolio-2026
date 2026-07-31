export interface JournalArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: "Architecture" | "Lessons Learned" | "Performance";
  summary: string;
  keyTakeaway: string;
  tags: string[];
}

export const journalArticles: JournalArticle[] = [
  {
    id: "sutura-saas-architecture",
    title: "Building SUTURA: Designing a Multi-Tenant SaaS for Local Tailoring Shops",
    date: "July 2026",
    readTime: "4 min read",
    category: "Architecture",
    summary:
      "How we structured Next.js 15 App Router with Laravel APIs to handle encrypted customer body measurements, tiered subscriptions, and SMS order updates for Davao tailoring businesses.",
    keyTakeaway:
      "Separating frontend state from measurement vault APIs ensured 100% data privacy while allowing real-time order tracking.",
    tags: ["Next.js", "Laravel", "MySQL", "SaaS"],
  },
  {
    id: "qr-code-optimization-vccc",
    title: "Sub-Second QR Scanning: Managing 500+ Conference Delegates Offline",
    date: "June 2026",
    readTime: "3 min read",
    category: "Performance",
    summary:
      "Lessons learned building the VCCC Ministry Management system using Vue 3 and Supabase real-time subscriptions to process peak meal check-in queues without bottlenecks.",
    keyTakeaway:
      "Optimizing camera canvas stream resolution and local caching reduced scan latency from 1.2s to under 150ms.",
    tags: ["Vue 3", "Supabase", "QR Scanner", "UX"],
  },
  {
    id: "winforms-to-modern-web",
    title: "From C# WinForms to Next.js: Lessons in Desktop vs Web Architecture",
    date: "May 2026",
    readTime: "5 min read",
    category: "Lessons Learned",
    summary:
      "Transitioning from desktop OOP state patterns (LibraTrack & Gym Systems) to reactive, server-rendered web applications with TypeScript and Tailwind CSS.",
    keyTakeaway:
      "Understanding double-entry ledger logic in desktop C# made managing complex web state and database transactions infinitely simpler.",
    tags: ["C#", "TypeScript", "Architecture", "OOP"],
  },
];
