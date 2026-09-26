import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ProjectCard } from "@/components/case-study/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Skills } from "@/components/home/Skills";
import { getFeaturedProjects } from "@/content/projects";
import { getDictionary } from "@/content/i18n/ui";
import { ProjectHoverPreview } from "@/components/case-study/ProjectHoverPreview";
import { buildPreviews } from "@/lib/previews";
import { href, type Locale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const locale = (await params).lang as Locale;
  const t = getDictionary(locale);
  const featured = getFeaturedProjects(locale);

  return (
    <>
      <Hero locale={locale} />
      <div className="theme-light pb-8">
        <Manifesto locale={locale} />
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-32 sm:px-10">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {t.home.recent}
            </p>
          </Reveal>
          <ProjectHoverPreview previews={buildPreviews(featured, locale)}>
            <div className="flex flex-col border-b border-foreground/10">
              {featured.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.1}>
                  <ProjectCard project={project} locale={locale} />
                </Reveal>
              ))}
            </div>
          </ProjectHoverPreview>
          <Reveal className="mt-10 flex justify-center">
            <Magnetic strength={0.3}>
              <Link
                href={href(locale, "projects")}
                className="inline-block rounded-full border border-foreground/20 px-10 py-5 transition-colors hover:border-accent hover:bg-accent hover:text-background"
              >
                {t.home.allProjects}
              </Link>
            </Magnetic>
          </Reveal>
        </section>
        <Skills locale={locale} />
      </div>
    </>
  );
}
