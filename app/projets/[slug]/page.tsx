import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title} — Adam Bellanger` : "Projet" };
}

const SECTIONS: { key: keyof Project; label: string }[] = [
  { key: "context", label: "Contexte" },
  { key: "role", label: "Rôle" },
  { key: "challenges", label: "Défis" },
  { key: "result", label: "Résultat" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-32 sm:px-10">
      <Reveal>
        <Link href="/projets" className="font-mono text-xs uppercase tracking-widest text-muted">
          ← Projets
        </Link>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-lg text-lg text-muted">{project.pitch}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-foreground/10 px-3 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Reveal>

      {SECTIONS.map(({ key, label }, i) => (
        <Reveal key={key} delay={i * 0.05}>
          <h2 className="font-display text-2xl text-accent">{label}</h2>
          <p className="mt-3 text-foreground/90">{project[key] as string}</p>
        </Reveal>
      ))}

      {(project.repoUrl || project.demoUrl) && (
        <Reveal>
          <div className="flex gap-6 border-t border-foreground/10 pt-6 font-mono text-sm">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                Voir le code →
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                Voir la démo →
              </a>
            )}
          </div>
        </Reveal>
      )}
    </article>
  );
}
