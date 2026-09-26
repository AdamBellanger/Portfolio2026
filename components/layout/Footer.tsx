"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitText } from "@/components/ui/SplitText";
import { LocalTime } from "@/components/ui/LocalTime";
import { ServerStatus } from "@/components/ui/ServerStatus";
import { VisitCounter } from "@/components/ui/VisitCounter";
import { site } from "@/content/site";
import { href, LOCALE_COOKIE, locales, switchLocalePath, type Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

const LANGUAGE_NAMES: Record<Locale, string> = { fr: "Version française", en: "English version" };

/** Remembers an explicit choice so the proxy stops auto-detecting. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

const pill =
  "rounded-full border border-foreground/15 px-6 py-4 text-sm transition-colors hover:border-accent hover:text-accent sm:px-8 sm:py-5 sm:text-base";

export function Footer() {
  const pathname = usePathname();
  const { locale, t: dict } = useLocale();
  const t = dict.footer;
  const showCta = pathname !== href(locale, "contact");
  const smallTitle = "font-mono text-[10px] uppercase tracking-widest text-muted";

  return (
    <footer className="mt-auto bg-anthracite">
      {showCta && (
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 sm:px-10 sm:pt-36">
          <div className="flex items-center gap-5 sm:gap-8">
            <Avatar className="h-14 w-14 sm:h-24 sm:w-24" />
            <SplitText
              as="h2"
              inView
              delay={0}
              text={t.cta}
              className="font-display text-5xl leading-none sm:text-8xl"
            />
          </div>

          <div className="relative mt-20 border-t border-foreground/15 sm:mt-24">
            <Magnetic className="absolute right-6 top-0 -translate-y-1/2 sm:right-[12%]">
              <Link
                href={href(locale, "contact")}
                className="flex h-36 w-36 items-center justify-center rounded-full bg-accent text-center text-base font-medium text-background transition-transform duration-300 hover:scale-105 sm:h-48 sm:w-48 sm:text-lg"
              >
                {t.contact}
              </Link>
            </Magnetic>
          </div>

          <div className="flex flex-col gap-4 pt-28 sm:flex-row sm:pt-16">
            <Magnetic strength={0.2}>
              <a href={`mailto:${site.email}`} className={`${pill} inline-block`}>
                {site.email}
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <span className={`${pill} inline-block`}>{site.location}</span>
            </Magnetic>
          </div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-10">
        <div className="flex flex-wrap gap-x-10 gap-y-6">
          <div>
            <p className={smallTitle}>{t.version}</p>
            <p className="mt-2 text-sm">{t.edition}</p>
          </div>
          <div>
            <p className={smallTitle}>{t.localTime}</p>
            <p className="mt-2 text-sm">
              <LocalTime />
            </p>
          </div>
          <VisitCounter title={t.visits} numberLocale={dict.numberLocale} titleClassName={smallTitle} />
          <ServerStatus title={t.infra} titleClassName={smallTitle} />
          <div>
            <p className={smallTitle}>{t.language}</p>
            <p className="mt-2 flex gap-2 text-sm">
              {locales.map((l, i) => (
                <span key={l} className="flex gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-muted">/</span>}
                  {l === locale ? (
                    <span aria-current="true">{l.toUpperCase()}</span>
                  ) : (
                    <a
                      href={switchLocalePath(pathname, l)}
                      hrefLang={l}
                      lang={l}
                      aria-label={LANGUAGE_NAMES[l]}
                      onClick={() => rememberLocale(l)}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {l.toUpperCase()}
                    </a>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div>
          <p className={smallTitle}>{t.socials}</p>
          <ul className="mt-2 flex gap-6 text-sm">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
