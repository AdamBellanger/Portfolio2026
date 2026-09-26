import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Skills } from "@/components/home/Skills";
import { CvButton } from "@/components/ui/CvButton";
import { about } from "@/content/about";
import { getDictionary } from "@/content/i18n/ui";
import { alternates, href, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/a-propos">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  return {
    title: `${getDictionary(locale).meta.about} — Adam Bellanger`,
    alternates: alternates(locale, "about"),
  };
}

const inlineLink =
  "text-foreground underline decoration-foreground/30 underline-offset-4 hover:text-accent";

export default async function AProposPage({ params }: PageProps<"/[lang]/a-propos">) {
  const locale = (await params).lang as Locale;
  const c = about[locale];

  return (
    <div className="theme-light flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pb-24 pt-40 sm:px-10">
        <SplitText text={c.title} className="font-display text-6xl sm:text-8xl" />
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr]">
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-snug sm:text-3xl">{c.lead}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted">{c.aside}</p>
            <CvButton locale={locale} className="mt-6" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-32 sm:px-10">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl">{c.journey}</h2>
        </Reveal>
        <ol className="flex flex-col border-b border-foreground/10">
          {c.timeline.map((item, i) => (
            <Reveal
              key={item.place}
              as="li"
              delay={i * 0.05}
              className="grid gap-3 border-t border-foreground/10 py-8 sm:grid-cols-[1fr_2fr] sm:gap-10"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {item.role}
                </p>
                <h3 className="mt-2 font-display text-xl">{item.place}</h3>
              </div>
              <p className="text-foreground/80">{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-32 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {c.missionsKicker}
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">{c.missionsTitle}</h2>
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {c.missions.map((mission, i) => (
            <Reveal
              key={mission.title}
              as="li"
              delay={i * 0.04}
              className="flex flex-col gap-3 bg-background p-6"
            >
              <span className="font-mono text-[11px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl">{mission.title}</h3>
              <p className="text-sm text-foreground/75">{mission.text}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="text-muted">
            {c.outro.map((segment, i) =>
              typeof segment === "string" ? (
                segment
              ) : (
                <Link key={i} href={href(locale, "projects", segment.slug)} className={inlineLink}>
                  {segment.label}
                </Link>
              ),
            )}
          </p>
        </Reveal>
      </section>

      <Skills locale={locale} />
    </div>
  );
}
