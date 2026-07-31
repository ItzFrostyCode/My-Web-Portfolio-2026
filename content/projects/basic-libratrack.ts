import type { Project } from "@/types";

export const basicLibratrack: Project = {
  id: "basic-libratrack",
  index: "07",
  title: "Basic LibraTrack",
  subtitle: "C# WinForms & MySQL Desktop Library Database System",
  category: "School Project",
  role: "Database Architect & Full-Stack C# Developer",
  status: "Completed Academic Work",
  description:
    "2nd-year academic desktop library application built with C# WinForms and MySQL — featuring SHA-256 admin auth, catalog & borrower management, 7-day loan tracking with auto-calculated overdue fines, and payment management.",
  problem:
    "Manual paper-based library tracking led to unrecorded loans, lost books, inaccurate hand-calculated overdue fines, and no centralized record of library activity.",
  solution:
    "Engineered a 3-tier Windows desktop application utilizing C# WinForms, ADO.NET Repositories, and a normalized MySQL database (`libsysman`) featuring SHA-256 hashed authentication, automated fine calculations (5%/day overdue rate or full-price lost book), and dynamic dashboard metrics.",
  funFact:
    "Features automated fine calculation that charges a 5% per-day penalty based on the book's price for late returns, or full item valuation for lost inventory!",
  stack: [
    "C# (.NET Framework 4.7.2)",
    "Windows Forms (WinForms)",
    "MySQL",
    "MySqlConnector",
    "ADO.NET",
    "SHA-256 Cryptography"
  ],
  image: "/media/projects/basic-libratrack.jpg",
  demoImage: "/media/projects/basic-libratrack.jpg",
  screenshots: [
    "/media/projects/basic-libratrack.jpg"
  ],
  contributions: [
    "Architected a 3-tier C# solution using Repository and Service layer patterns for clean separation of UI components, business logic, and MySQL data access.",
    "Designed and deployed a normalized relational MySQL schema (`libsysman`) with foreign key constraints, cascading deletes, and strict column typing.",
    "Built an interactive WinForms admin dashboard with sidebar navigation, summary metric cards, and live system counters.",
    "Developed catalog and borrower management views featuring multi-field search and filters (Title, Author, ISBN, Genre, Publisher, User Type, Date ranges).",
    "Engineered complete loan lifecycle management (Borrow, Return, Waive, Lost) with automated 7-day due date calculation and inventory copy count synchronization.",
    "Implemented automated overdue fine logic dynamically calculating 5% per day late penalties and full-price lost book charges with payment tracking.",
    "Secured administrative authentication with SHA-256 password hashing and fully parameterized ADO.NET queries to prevent SQL injection vulnerabilities."
  ],
  metrics: [
    { value: "3-Tier", label: "ARCHITECTURE", subtext: "WinForms UI, Services, & ADO.NET Repositories" },
    { value: "5% / Day", label: "LATE FINE RATE", subtext: "Automated daily overdue fine calculation" },
    { value: "100%", label: "PARAMETRIZED", subtext: "Fully sanitized SQL preventing injection" }
  ]
};

