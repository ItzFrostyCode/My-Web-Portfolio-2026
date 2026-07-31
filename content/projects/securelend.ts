import type { Project } from "@/types";

export const securelend: Project = {
  id: "securelend",
  index: "06",
  title: "SecureLend",
  subtitle: "Personal Lending & Double-Entry Accounting Engine",
  category: "Own Project",
  role: "Financial Systems Engineer & Java Developer",
  status: "Completed Desktop Application",
  description:
    "Desktop personal lending and microfinance management system built around a strict double-entry ledger — featuring borrower KYC verification, automated loan origination with BSP compliance caps, multi-channel payment waterfall allocation, and audit-ready financial reporting.",
  problem:
    "Micro-lenders and independent creditors often struggle with tracking complex partial payments, late penalties, and multi-wallet funds across cash and e-money channels, leading to accounting errors and unrecoverable bad debt.",
  solution:
    "Engineered a full-featured Java Swing application powered by a double-entry ledger (Debit == Credit), automated amortization schedules (1–12 month fixed tiers, DTI caps, processing fees, DST), waterfall repayment allocation (Penalty → Interest → Principal), and atomic thread-safe CSV data persistence.",
  funFact:
    "Includes a dynamic credit limit growth engine: every full loan repayment automatically increases a borrower's credit limit for future loans, while late penalties feature an automatic cap so overdue amounts can never exceed 100% of the principal balance!",
  stack: ["Java (JDK 17)", "Java Swing", "Double-Entry Ledger", "Flat-File CSV", "Maven", "FlatLaf", "OpenPDF"],
  image: "/media/projects/securelend.jpg",
  demoImage: "/media/projects/securelend.jpg",
  screenshots: ["/media/projects/securelend.jpg"],
  contributions: [
    "Architected a double-entry accounting engine (LedgerEngine) enforcing strict SUM(DEBIT) == SUM(CREDIT) balance equality across 12 chart-of-accounts.",
    "Implemented automated loan origination with DTI limit checks, BSP Document Stamp Tax (DST), processing fee calculation, and multi-tier interest scheduling.",
    "Designed waterfall repayment allocation engine prioritizing outstanding penalties → accrued interest → principal balance.",
    "Built multi-channel fund tracking supporting separate cash drawers and e-wallets (GCash, Maya, GoTyme, CIMB) with manual fund adjustment logs.",
    "Engineered thread-safe, atomic CSV persistence repository layer with file locking (FileLock) and UTF-8 encoding.",
    "Integrated OpenPDF financial reporting generator producing downloadable balance sheets, profit & loss statements, and borrower loan schedules.",
    "Built administrative penalty waiver management and write-off (loan forgiveness) capabilities with self-balancing memo ledger entries."
  ],
  metrics: [
    { value: "100%", label: "BALANCE ACCURACY", subtext: "Double-entry atomic ledger rules" },
    { value: "5 Accounts", label: "MULTI-CHANNEL", subtext: "Physical cash & e-wallet balances" },
    { value: "0 DBMS", label: "ZERO DEPENDENCY", subtext: "Thread-safe atomic CSV repository" }
  ]
};

