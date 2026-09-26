import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Avatar } from "@/components/ui/Avatar";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { CvButton } from "@/components/ui/CvButton";
import { LocalTime } from "@/components/ui/LocalTime";
import { ServerStatus } from "@/components/ui/ServerStatus";
import { site } from "@/content/site";
import { getDictionary } from "@/content/i18n/ui";
import { alternates, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  return {
    title: `${getDictionary(locale).meta.contact} — Adam Bellanger`,
    alternates: alternates(locale, "contact"),
  };
}

const label = "font-mono text-[11px] uppercase tracking-widest text-muted";

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const locale = (await params).lang as Locale;
  const t = getDictionary(locale).contact;
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-x-20 px-6 pb-32 pt-40 sm:px-10 sm:pt-48 lg:grid-cols-[1fr_19rem]">
      <div>
        <Reveal>
          <Avatar className="mb-8 h-20 w-20 sm:h-24 sm:w-24" />
        </Reveal>
        <SplitText
          text={t.title}
          className="max-w-3xl font-display text-6xl leading-[0.95] sm:text-8xl"
        />
        <Reveal delay={0.45}>
          <p className="mt-8 max-w-xl text-lg text-muted">
            {t.intro}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.5} className="mt-10 hidden items-end lg:mt-0 lg:flex">
        <span aria-hidden="true" className="font-display text-3xl text-accent">
          ↘
        </span>
      </Reveal>

      <Reveal delay={0.6} className="mt-16 sm:mt-24">
        <ContactForm />
      </Reveal>

      <Reveal delay={0.7} className="mt-16 sm:mt-24">
        <aside className="flex flex-col gap-10 lg:sticky lg:top-28">
          <div>
            <p className={label}>{t.writeDirectly}</p>
            <CopyEmail email={site.email} copyLabel={t.copy} copiedLabel={t.copied} />
          </div>

          <div>
            <p className={label}>{t.socials}</p>
            <ul className="mt-3 flex flex-col border-b border-foreground/10">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-t border-foreground/10 py-3 transition-colors hover:text-accent"
                  >
                    {social.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-10">
            <div>
              <p className={label}>{t.location}</p>
              <p className="mt-3">{site.location}</p>
            </div>
            <div>
              <p className={label}>{t.localTime}</p>
              <p className="mt-3">
                <LocalTime />
              </p>
            </div>
          </div>

          <ServerStatus title={t.infraStatus} titleClassName={label} />

          <div>
            <p className={label}>{t.availability}</p>
            <p className="mt-3 text-foreground/80">
              {t.availabilityText}
            </p>
          </div>

          <CvButton locale={locale} />
        </aside>
      </Reveal>
    </section>
  );
}
