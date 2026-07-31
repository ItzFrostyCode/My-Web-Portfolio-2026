export type ProjectCategory =
  | "Platform Project"
  | "Client Project"
  | "Own Project"
  | "School Project"
  | "Ongoing Thesis";

export interface ProjectMetric {
  value: string;
  label: string;
  subtext?: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  /** Omit to show no category badge on this card. */
  category?: ProjectCategory;
  description: string;
  stack: string[];
  image: string;
  demoImage?: string;
  screenshots?: string[];
  /** Omit either link when it doesn't apply to this project. */
  github?: string;
  website?: string;
  funFact?: string;
  problem?: string;
  solution?: string;
  role?: string;
  status?: string;
  contributions?: string[];
  features?: string[];
  metrics?: ProjectMetric[];
  credentials?: {
    isPrivate?: boolean;
    note?: string;
    email?: string;
    password?: string;
  };
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface Pillar {
  index: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  /** When set, the label itself is the stat (no counter). */
  literal?: string;
}
