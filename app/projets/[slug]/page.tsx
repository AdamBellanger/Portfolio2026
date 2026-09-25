import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";

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
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <div className="theme-light flex flex-1 flex-col">
      <article className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 pb-32 pt-40 sm:px-10">
        <Reveal>
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
            <Link href="/projets" className="hover:text-accent">
              ← Projets
            </Link>
            <span className="text-accent">{project.kind}</span>
          </div>
          <SplitText
            text={project.title}
            className="mt-4 font-display text-5xl sm:text-7xl"
          />
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

        {(project.repoUrl || project.demoUrl) && (
          <Reveal>
            <div className="flex flex-wrap gap-4">
              {project.demoUrl && (
                <Magnetic strength={0.25}>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-background transition-transform duration-300 hover:scale-105"
                  >
                    <span className="h-2 w-2 rounded-full bg-background" />
                    Voir le site ↗
                  </a>
                </Magnetic>
              )}
              {project.repoUrl && (
                <Magnetic strength={0.25}>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-foreground/20 px-8 py-4 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    Voir le code sur GitHub ↗
                  </a>
                </Magnetic>
              )}
            </div>
          </Reveal>
        )}

        {SECTIONS.map(({ key, label }, i) => (
          <Reveal key={key} delay={i * 0.05}>
            <h2 className="font-display text-2xl text-accent">{label}</h2>
            <p className="mt-3 text-foreground/90">{project[key] as string}</p>
          </Reveal>
        ))}

        <Reveal>
          <h2 className="font-display text-2xl text-accent">Points clés</h2>
          <ul className="mt-3 flex flex-col border-b border-foreground/10">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-t border-foreground/10 py-3 text-foreground/90"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <Link
            href={`/projets/${next.slug}`}
            className="group mt-8 flex flex-col gap-2 border-t border-foreground/10 pt-10"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Projet suivant
            </span>
            <span className="font-display text-4xl transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent sm:text-6xl">
              {next.title} →
            </span>
          </Link>
        </Reveal>
      </article>
    </div>
  );
}
