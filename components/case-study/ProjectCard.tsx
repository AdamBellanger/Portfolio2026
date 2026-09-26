import Link from "next/link";
import type { Project } from "@/content/projects";
import { getDictionary } from "@/content/i18n/ui";
import { href, type Locale } from "@/lib/i18n";

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const t = getDictionary(locale).projects;
  return (
    <Link
      href={href(locale, "projects", project.slug)}
      data-cursor={t.view}
      data-slug={project.slug}
      className="group flex flex-col gap-3 border-t border-foreground/10 py-8 transition-colors hover:border-accent/40 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
    >
      <div>
        <h2 className="font-display text-3xl transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-2 max-w-lg text-muted">{project.pitch}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-1 font-mono text-xs uppercase tracking-widest text-muted sm:items-end sm:text-right">
        <span className="flex items-center gap-3 sm:justify-end">
          {project.demoUrl && (
            <span className="flex items-center gap-1.5 text-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t.live}
            </span>
          )}
          <span className="text-accent">{t.kinds[project.kind]}</span>
        </span>
        <span>{project.stack.slice(0, 2).join(" · ")}</span>
      </div>
    </Link>
  );
}
