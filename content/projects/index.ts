import type { Project } from "@/types";
import { sscStiCollegeDavao } from "./ssc-sti-college-davao";
import { gymSubscriptionMembershipSystem } from "./gym-subscription-membership-system";
import { libratrack } from "./libratrack";
import { vcccManagementSystem } from "./vccc-management-system";
import { schoolLibraryManagementSystem } from "./school-library-management-system";
import { securelend } from "./securelend";
import { basicLibratrack } from "./basic-libratrack";
import { sutura } from "./sutura";

export const allProjects: Project[] = [
  sscStiCollegeDavao,
  gymSubscriptionMembershipSystem,
  libratrack,
  vcccManagementSystem,
  schoolLibraryManagementSystem,
  securelend,
  basicLibratrack,
  sutura,
];

export function getProjectById(id: string): Project | undefined {
  return allProjects.find((p) => p.id === id);
}

export {
  sscStiCollegeDavao,
  gymSubscriptionMembershipSystem,
  libratrack,
  vcccManagementSystem,
  schoolLibraryManagementSystem,
  securelend,
  basicLibratrack,
  sutura,
};
