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
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact)
);

export default function Home() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Projects />
      <About />
      <Stats />
      <Contact />
    </main>
  );
}
