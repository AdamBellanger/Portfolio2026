import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      className="group flex flex-col gap-3 border-t border-foreground/10 py-8 transition-colors hover:border-accent/40 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
    >
      <div>
        <h3 className="font-display text-3xl transition-colors group-hover:text-accent sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-lg text-muted">{project.pitch}</p>
      </div>
      <p className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted sm:text-right">
        {project.stack.slice(0, 2).join(" · ")}
      </p>
    </Link>
  );
}
