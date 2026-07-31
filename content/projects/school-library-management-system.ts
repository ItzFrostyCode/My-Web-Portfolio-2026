import type { Project } from "@/types";

export const schoolLibraryManagementSystem: Project = {
  id: "school-library-management-system",
  index: "05",
  title: "School Library Management System",
  subtitle: "Automated Overdue Fine & Borrowing System",
  category: "School Project",
  role: "Java Systems Architect",
  status: "Completed School Work",
  description:
    "Desktop library management application replacing paper logbooks — book catalog, student borrower registry, borrow/return workflows, automated overdue fine calculations, and physical shelf location mapping.",
  problem:
    "Librarians struggled to keep track of book inventory, missing copies, and calculated daily overdue fines manually on paper ledgers, causing financial tracking errors and lost books.",
  solution:
    "Architected an OOP-based Java Swing desktop application featuring a zero-dependency flat-file DAO storage engine, Strategy-pattern circulation rules, automated daily fine calculations, and HTML/CSV report exporting.",
  funFact:
    "Designed with a zero-dependency flat-file persistence engine (.txt), allowing the entire system to run seamlessly on pure Java SE without installing MySQL or external database servers!",
  stack: ["Java", "Swing", "OOP", "MVC Architecture", "Flat-File DB"],
  image: "/media/projects/school-library-management-system.jpg",
  demoImage: "/media/projects/school-library-management-system.jpg",
  screenshots: [
    "/media/projects/school-library-management-system.jpg"
  ],
  contributions: [
    "Architected a modular Model-View-Controller (MVC) pattern and manual Dependency Injection container in Java Swing.",
    "Built flat-file persistence layer (.txt database storage) with custom DAO interfaces and thread-safe data access.",
    "Implemented Strategy pattern for borrowing rules (Take-Home vs. Reading Area) and return condition assessments (Good, Minor/Major Damage, Lost).",
    "Engineered an automated daily overdue fine calculation engine (₱20.00/day logic) with a ₱500.00 fine block threshold and automatic lost item transitions.",
    "Created physical library location mapping module organizing Floors, Sections, Shelves, and individual Copy Placements.",
    "Integrated CSV data export engine and printable HTML shelf guide generator alongside Java AWT receipt printing."
  ],
  metrics: [
    { value: "< 3 clicks", label: "CHECKOUT SPEED", subtext: "Streamlined librarian workflow" },
    { value: "100%", label: "ACCURATE FINES", subtext: "Automated ₱20/day rate & threshold checks" },
    { value: "0 DBs", label: "ZERO DEPENDENCIES", subtext: "Lightweight flat-file .txt persistence" }
  ]
};
