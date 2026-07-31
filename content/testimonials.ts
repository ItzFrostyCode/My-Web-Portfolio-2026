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
      "The SSC Website for AY 2025–2026 is extremely helpful, organized, and easily accessible. From its first version to its final release, the navigation became smoother, information easier to find, and the overall design looks truly professional and engaging.",
    author: "Supreme Student Council President",
    role: "AY 2025–2026 Student Leader",
    organization: "STI College Davao",
    metric: "930+ Students Served",
    initials: "CP",
  },

];
