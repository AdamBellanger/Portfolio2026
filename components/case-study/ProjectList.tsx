"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/case-study/ProjectCard";
import type { Project, ProjectKind } from "@/content/projects";

const FILTERS: ("Tous" | ProjectKind)[] = ["Tous", "Pro", "Perso", "École"];

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tous");
  const reducedMotion = useReducedMotion();
  const visible =
    filter === "Tous" ? projects : projects.filter((p) => p.kind === filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filtrer les projets"
        className="mt-4 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const count =
            f === "Tous"
              ? projects.length
              : projects.filter((p) => p.kind === f).length;
          if (count === 0) return null;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-colors ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 hover:border-foreground/40"
              }`}
            >
              {f}
              <sup className="ml-1 font-mono text-[10px] opacity-60">
                {count}
              </sup>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col border-b border-foreground/10">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              layout={!reducedMotion}
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                reducedMotion
                  ? undefined
                  : { opacity: 0, transition: { duration: 0.15 } }
              }
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(i, 6) * 0.05,
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
