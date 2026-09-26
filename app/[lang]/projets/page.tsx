import type { Metadata } from "next";
import { getProjects } from "@/content/projects";
import { getDictionary } from "@/content/i18n/ui";
import { ProjectList } from "@/components/case-study/ProjectList";
import { ProjectHoverPreview } from "@/components/case-study/ProjectHoverPreview";
import { buildPreviews } from "@/lib/previews";
import { SplitText } from "@/components/ui/SplitText";
import { alternates, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/projets">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  return {
    title: `${getDictionary(locale).meta.projects} — Adam Bellanger`,
    alternates: alternates(locale, "projects"),
  };
}

export default async function ProjetsPage({ params }: PageProps<"/[lang]/projets">) {
  const locale = (await params).lang as Locale;
  const projects = getProjects(locale);

  return (
    <div className="theme-light flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pb-32 pt-40 sm:px-10 sm:pt-48">
        <SplitText
          text={getDictionary(locale).projects.title}
          className="font-display text-6xl sm:text-8xl"
        />
        <ProjectHoverPreview previews={buildPreviews(projects, locale)}>
          <ProjectList projects={projects} locale={locale} />
        </ProjectHoverPreview>
      </section>
    </div>
  );
}
