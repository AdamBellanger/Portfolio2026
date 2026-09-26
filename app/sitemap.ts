import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { href, locales, type Route } from "@/lib/i18n";

// Every page in both languages, each entry listing its translations
// (hreflang) so search engines serve the right one.
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (route: Route, slug: string | undefined, priority: number, changeFrequency: "monthly" | "yearly") =>
    locales.map((locale) => ({
      url: `${site.url}${href(locale, route, slug)}`,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${href(l, route, slug)}`])),
      },
    }));

  return [
    ...entry("home", undefined, 1, "monthly"),
    ...entry("projects", undefined, 0.8, "monthly"),
    ...entry("about", undefined, 0.8, "monthly"),
    ...entry("contact", undefined, 0.8, "monthly"),
    ...projects.flatMap((project) =>
      entry("projects", project.slug, project.featured ? 0.7 : 0.5, "yearly"),
    ),
  ];
}
