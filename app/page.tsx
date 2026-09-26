import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ProjectCard } from "@/components/case-study/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Skills } from "@/components/home/Skills";
import { featuredProjects } from "@/content/projects";
import { ProjectHoverPreview } from "@/components/case-study/ProjectHoverPreview";
import { buildPreviews } from "@/lib/previews";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="theme-light pb-8">
        <Manifesto />
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-32 sm:px-10">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Projets récents
            </p>
          </Reveal>
          <ProjectHoverPreview previews={buildPreviews(featuredProjects)}>
            <div className="flex flex-col border-b border-foreground/10">
              {featuredProjects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.1}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </ProjectHoverPreview>
          <Reveal className="mt-10 flex justify-center">
            <Magnetic strength={0.3}>
              <Link
                href="/projets"
                className="inline-block rounded-full border border-foreground/20 px-10 py-5 transition-colors hover:border-accent hover:bg-accent hover:text-background"
              >
                Tous les projets
              </Link>
            </Magnetic>
          </Reveal>
        </section>
        <Skills />
      </div>
    </>
  );
}
