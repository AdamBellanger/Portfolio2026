import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/case-study/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export const metadata: Metadata = {
  title: "Projets — Adam Bellanger",
};

export default function ProjetsPage() {
  return (
    <div className="theme-light flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pb-32 pt-40 sm:px-10 sm:pt-48">
        <SplitText
          text="Projets"
          className="font-display text-6xl sm:text-8xl"
        />
        <div className="mt-8 flex flex-col border-b border-foreground/10">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
