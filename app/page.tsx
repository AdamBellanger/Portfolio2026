import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ProjectCard } from "@/components/case-study/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-32 sm:px-10">
        <Reveal className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl sm:text-4xl">Projets récents</h2>
          <Link href="/projets" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent">
            Tout voir →
          </Link>
        </Reveal>
        <div className="flex flex-col border-b border-foreground/10">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
