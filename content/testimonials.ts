export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  metric?: string;
  avatar?: string;
  initials?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Joshua delivered our Supreme Student Council portal under an extraordinarily tight campaign timeline. The site was fast, responsive, and handled all student traffic seamlessly.",
    author: "STI College Davao SSC",
    role: "Student Council Executive",
    organization: "STI College Davao",
    metric: "1,000+ Active Student Views",
    initials: "SC",
  },
  {
    id: "2",
    quote:
      "The VCCC management system streamlined our annual conference registrations. QR-code delegate check-ins cut our meal queue waiting time dramatically.",
    author: "Ministry Event Team",
    role: "Conference Coordinator",
    organization: "Victory Chapel Davao",
    metric: "500+ QR Badges Scanned",
    initials: "ME",
  },
  {
    id: "3",
    quote:
      "Joshua's attention to database structure and UI clarity turned complex paper workflows into simple, error-free desktop software.",
    author: "Academic Advisory",
    role: "Capstone & IT Evaluator",
    organization: "STI College Davao",
    metric: "98% System Efficiency Score",
    initials: "AA",
  },
];
