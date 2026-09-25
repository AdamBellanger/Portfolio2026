"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitText } from "@/components/ui/SplitText";
import { site } from "@/content/site";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Paris",
        timeZoneName: "short",
      }).format(new Date());
    const tick = () => setTime(format());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return <span suppressHydrationWarning>{time ?? "--:--"}</span>;
}

const pill =
  "rounded-full border border-foreground/15 px-6 py-4 text-sm transition-colors hover:border-accent hover:text-accent sm:px-8 sm:py-5 sm:text-base";

export function Footer() {
  const pathname = usePathname();
  const showCta = pathname !== "/contact";

  return (
    <footer className="mt-auto bg-anthracite">
      {showCta && (
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 sm:px-10 sm:pt-36">
          <SplitText
            as="h2"
            inView
            delay={0}
            text="Travaillons ensemble"
            className="font-display text-5xl leading-none sm:text-8xl"
          />

          <div className="relative mt-20 border-t border-foreground/15 sm:mt-24">
            <Magnetic className="absolute right-6 top-0 -translate-y-1/2 sm:right-[12%]">
              <Link
                href="/contact"
                className="flex h-36 w-36 items-center justify-center rounded-full bg-accent text-center text-base font-medium text-background transition-transform duration-300 hover:scale-105 sm:h-48 sm:w-48 sm:text-lg"
              >
                Me contacter
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
        <div className="flex gap-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Version</p>
            <p className="mt-2 text-sm">Édition 2026</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Heure locale</p>
            <p className="mt-2 text-sm">
              <LocalTime />
            </p>
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Socials</p>
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
