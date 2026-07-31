import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";

const Pillars = dynamic(() =>
  import("@/components/sections/Pillars").then((m) => m.Pillars)
);
const Projects = dynamic(() =>
  import("@/components/sections/Projects").then((m) => m.Projects)
);
const ProjectWheel = dynamic(() =>
  import("@/components/sections/ProjectWheel").then((m) => m.ProjectWheel)
);
const PersonaSwitcher = dynamic(() =>
  import("@/components/sections/PersonaSwitcher").then((m) => m.PersonaSwitcher)
);
const CodeSandbox = dynamic(() =>
  import("@/components/sections/CodeSandbox").then((m) => m.CodeSandbox)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials)
);
const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((m) => m.FAQ)
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact)
);

export default function Home() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Projects />
      <ProjectWheel />
      <PersonaSwitcher />
      <CodeSandbox />
      <Testimonials />
      <About />
      <Stats />
      <FAQ />
      <Contact />
    </main>
  );
}
