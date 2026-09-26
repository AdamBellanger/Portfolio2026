import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects, projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { TechStack } from "@/components/case-study/TechStack";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { ScreenshotGallery } from "@/components/case-study/ScreenshotGallery";
import { getArchitecture } from "@/content/architectures";
import { getDictionary } from "@/content/i18n/ui";
import { alternates, href, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projets/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const project = getProject(slug, locale);
  if (!project) return {};
  return {
    title: `${project.title} — Adam Bellanger`,
    description: project.pitch,
    alternates: alternates(locale, "projects", slug),
  };
}

type TextKey = "context" | "role" | "challenges" | "result";

function TextSection({
  project,
  sections,
}: {
  project: Project;
  sections: { key: TextKey; label: string }[];
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
}: PageProps<"/[lang]/projets/[slug]">) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const t = getDictionary(locale);
  const cs = t.caseStudy;
  const all = getProjects(locale);
  const project = getProject(slug, locale);
  if (!project) notFound();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];
  const architecture = getArchitecture(project.slug, locale);

  return (
    <div className="theme-light flex flex-1 flex-col">
      <article className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 pb-32 pt-40 sm:px-10">
        <Reveal>
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
            <Link href={href(locale, "projects")} className="hover:text-accent">
              {cs.back}
            </Link>
            <span className="text-accent">{t.projects.kinds[project.kind]}</span>
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
              {cs.labNotice}
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
                    {cs.visit}
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
                    {cs.code}
                  </a>
                </Magnetic>
              )}
            </div>
          </Reveal>
        )}

        {project.screenshots && (
          <section aria-label={cs.preview} className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {cs.preview}
            </p>
            <ScreenshotGallery
              shots={project.screenshots}
              url={project.demoUrl}
            />
          </section>
        )}

        <Reveal>
          <h2 className="font-display text-2xl text-accent">{cs.stack}</h2>
          <div className="mt-4">
            <TechStack
              stack={project.stack}
              categoryLabels={cs.categories}
              techNames={cs.techNames}
            />
          </div>
        </Reveal>

        <TextSection
          project={project}
          sections={[
            { key: "context", label: cs.context },
            { key: "role", label: cs.role },
          ]}
        />

        {architecture && (
          <Reveal className="lg:-mx-32">
            <h2 className="font-display text-2xl text-accent lg:px-32">
              {cs.architecture}
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

        <TextSection
          project={project}
          sections={[
            { key: "challenges", label: cs.challenges },
            { key: "result", label: cs.result },
          ]}
        />

        <Reveal>
          <h2 className="font-display text-2xl text-accent">{cs.highlights}</h2>
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
            href={href(locale, "projects", next.slug)}
            data-cursor={cs.nextCursor}
            className="group mt-8 flex flex-col gap-2 border-t border-foreground/10 pt-10"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {cs.next}
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
