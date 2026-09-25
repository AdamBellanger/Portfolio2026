import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      className="group block rounded-2xl border border-foreground/10 bg-anthracite/40 p-6 transition-colors hover:border-accent/50 sm:p-8"
    >
      <h3 className="font-display text-3xl transition-colors group-hover:text-accent sm:text-4xl">
        {project.title}
      </h3>
      <p className="mt-3 max-w-lg text-muted">{project.pitch}</p>
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
    </Link>
  );
}
