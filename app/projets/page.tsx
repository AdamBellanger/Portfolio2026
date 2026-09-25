import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/case-study/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Projets — Adam Bellanger",
};

export default function ProjetsPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-32 sm:px-10">
      <Reveal>
        <h1 className="font-display text-5xl sm:text-6xl">Projets</h1>
      </Reveal>
      <div className="mt-8 flex flex-col border-b border-foreground/10">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
