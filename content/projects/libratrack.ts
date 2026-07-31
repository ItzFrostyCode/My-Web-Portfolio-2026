import type { Project } from "@/types";

export const libratrack: Project = {
  id: "libratrack",
  index: "03",
  title: "LibraTrack",
  subtitle: "Automated Overdue Fine & Borrowing Portal",
  category: "School Project",
  role: "Lead Java Swing Developer",
  status: "Completed Academic Work",
  description:
    "Desktop library system replacing paper logbooks — book cataloging, student records, 5-book cart borrowing workflow, automated fine computation, and audit trails.",
  problem:
    "Librarians struggled to manually track borrowed books on paper logbooks, calculate daily overdue fines by hand, and track unreturned or lost inventory accurately.",
  solution:
    "Engineered an OOP Java Swing desktop application featuring flat-file data persistence, a cart-based checkout workflow, dynamic modal lookups, price-proportional overdue fine math, and an automated audit trail.",
  funFact:
    "Operates with zero external database dependencies by utilizing a custom pipe-delimited flat-file engine auto-generated at runtime!",
  stack: ["Java (JDK 24)", "Java Swing", "AWT", "Flat-File I/O", "OOP", "Apache Ant"],
  image: "/media/projects/libratrack.jpg",
  demoImage: "/media/projects/libratrack.jpg",
  screenshots: [
    "/media/projects/libratrack.jpg"
  ],
  contributions: [
    "Engineered modular Java Swing UI architecture with CardLayout navigation and reusable form panels.",
    "Implemented core OOP principles with abstract base classes (`Person`), inheritance (`Student`), and polymorphic file serialization.",
    "Built a custom flat-file database helper (`FileIOHelper`) persisting student, book, loan, transaction, and log records in pipe-delimited text files.",
    "Developed a cart-based borrowing flow enforcing a 5-active-loan limit per borrower and 7-day loan terms.",
    "Implemented automated overdue fine logic dynamically scaling fine amounts based on book valuation and days overdue.",
    "Designed an event-driven `DataChangeListener` observer pattern to keep live dashboard counters synchronized across views.",
    "Created dedicated transaction history and timestamped audit logging services to maintain operational accountability."
  ],
  metrics: [
    { value: "5 Books", label: "MAX CART LOAN", subtext: "Enforced borrowing limit per student" },
    { value: "0 DBMS", label: "ZERO DEPENDENCY", subtext: "Custom flat-file data persistence" },
    { value: "100%", label: "FINE ACCURACY", subtext: "Automated value & date calculations" }
  ]
};
