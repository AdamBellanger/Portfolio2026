import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      className="group flex flex-col gap-3 border-t border-foreground/10 py-8 transition-colors hover:border-accent/40 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
    >
      <div>
        <h3 className="font-display text-3xl transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-lg text-muted">{project.pitch}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-1 font-mono text-xs uppercase tracking-widest text-muted sm:items-end sm:text-right">
        <span className="flex items-center gap-3 sm:justify-end">
          {project.demoUrl && (
            <span className="flex items-center gap-1.5 text-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              En ligne
            </span>
          )}
          <span className="text-accent">{project.kind}</span>
        </span>
        <span>{project.stack.slice(0, 2).join(" · ")}</span>
      </div>
    </Link>
  );
}
