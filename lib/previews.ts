import type { Project } from "@/content/projects";
import { techIcons } from "@/content/tech-icons";
import { luminance } from "@/lib/color";
import { getDictionary } from "@/content/i18n/ui";
import type { Locale } from "@/lib/i18n";

export type ProjectPreview = {
  slug: string;
  title: string;
  kind: string;
  stack: string[];
  image?: string;
  accent: string;
};

const FALLBACK_ACCENT = "#7c93b0";

/** Colour of the project's first branded technology, used for glows. */
export function projectAccent(project: Project) {
  const hex = project.stack.map((tech) => techIcons[tech]?.hex).find(Boolean);
  // Near-black or near-white brand colours make a dull glow: use the site accent.
  const lum = hex ? luminance(hex) : 0;
  return hex && lum > 0.04 && lum < 0.85 ? `#${hex}` : FALLBACK_ACCENT;
}

/** Hover-preview data for project lists, computed server-side so the brand
 *  icon table never ships to the browser. */
export function buildPreviews(projects: Project[], locale: Locale): ProjectPreview[] {
  const kinds = getDictionary(locale).projects.kinds;
  return projects.map((project) => {
    return {
      slug: project.slug,
      title: project.title,
      kind: kinds[project.kind],
      stack: project.stack.slice(0, 3),
      image: project.screenshots?.find((shot) => shot.device === "desktop")
        ?.src,
      accent: projectAccent(project),
    };
  });
}
