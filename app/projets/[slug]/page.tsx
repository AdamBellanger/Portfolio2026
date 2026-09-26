import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { TechStack } from "@/components/case-study/TechStack";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { ScreenshotGallery } from "@/components/case-study/ScreenshotGallery";
import { architectures } from "@/content/architectures";

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

type TextKey = "context" | "role" | "challenges" | "result";
const BEFORE_DIAGRAM: { key: TextKey; label: string }[] = [
  { key: "context", label: "Contexte" },
  { key: "role", label: "Rôle" },
];
const AFTER_DIAGRAM: { key: TextKey; label: string }[] = [
  { key: "challenges", label: "Défis" },
  { key: "result", label: "Résultat" },
];

function TextSection({
  project,
  sections,
}: {
  project: Project;
  sections: typeof BEFORE_DIAGRAM;
}) {
  return sections.map(({ key, label }, i) => (
    <Reveal key={key} delay={i * 0.05}>
      <h2 className="font-display text-2xl text-accent">{label}</h2>
      <p className="mt-3 text-foreground/90">{project[key]}</p>
    </Reveal>
  ));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const architecture = architectures[project.slug];

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
          {project.kind === "Lab" && (
            <p className="mt-6 inline-flex max-w-lg items-start gap-3 rounded-2xl border border-dashed border-foreground/25 px-4 py-3 text-sm text-muted">
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                Lab
              </span>
              Maquette conçue et documentée de bout en bout, sur le modèle des
              installations que je réalise en alternance. Ce n&apos;est pas une
              intervention client.
            </p>
          )}
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

        {project.screenshots && (
          <section aria-label="Aperçu" className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Aperçu
            </p>
            <ScreenshotGallery
              shots={project.screenshots}
              url={project.demoUrl}
            />
          </section>
        )}

        <Reveal>
          <h2 className="font-display text-2xl text-accent">Stack</h2>
          <div className="mt-4">
            <TechStack stack={project.stack} />
          </div>
        </Reveal>

        <TextSection project={project} sections={BEFORE_DIAGRAM} />

        {architecture && (
          <Reveal className="lg:-mx-32">
            <h2 className="font-display text-2xl text-accent lg:px-32">
              Architecture
            </h2>
            <div className="mt-4">
              <ArchitectureDiagram architecture={architecture} />
            </div>
          </Reveal>
        )}

        {project.table && (
          <Reveal>
            <h2 className="font-display text-2xl text-accent">
              {project.table.title}
            </h2>
            <div
              role="region"
              aria-label={project.table.title}
              tabIndex={0}
              className="mt-4 overflow-x-auto rounded-2xl border border-foreground/10"
            >
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-foreground/[0.04] font-mono text-[11px] uppercase tracking-widest text-muted">
                  <tr>
                    {project.table.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-4 py-3 font-normal"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/10">
                  {project.table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) =>
                        i === 0 ? (
                          <th
                            key={i}
                            scope="row"
                            className="whitespace-nowrap px-4 py-3 font-mono font-normal text-accent"
                          >
                            {cell}
                          </th>
                        ) : (
                          <td key={i} className="px-4 py-3 text-foreground/85">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        )}

        <TextSection project={project} sections={AFTER_DIAGRAM} />

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
            data-cursor="Suivant"
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
