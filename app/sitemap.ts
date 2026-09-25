import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projets", "/a-propos", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const caseStudies = projects.map((project) => ({
    url: `${site.url}/projets/${project.slug}`,
    changeFrequency: "yearly" as const,
    priority: project.featured ? 0.7 : 0.5,
  }));
  return [...pages, ...caseStudies];
}
