import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectList } from "@/components/case-study/ProjectList";
import { SplitText } from "@/components/ui/SplitText";

export const metadata: Metadata = {
  title: "Projets — Adam Bellanger",
};

export default function ProjetsPage() {
  return (
    <div className="theme-light flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pb-32 pt-40 sm:px-10 sm:pt-48">
        <SplitText text="Projets" className="font-display text-6xl sm:text-8xl" />
        <ProjectList projects={projects} />
      </section>
    </div>
  );
}
