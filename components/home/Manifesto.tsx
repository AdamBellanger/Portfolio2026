import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/content/i18n/ui";
import type { Locale } from "@/lib/i18n";

export function Manifesto({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home;
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-32 sm:flex-row sm:gap-16 sm:px-10">
      <Reveal className="flex-[1.4]">
        <p className="font-display text-3xl leading-tight sm:text-4xl">
          {t.manifesto}
        </p>
      </Reveal>
      <Reveal delay={0.15} className="flex-1">
        <p className="text-muted">
          {t.manifestoAside}
        </p>
      </Reveal>
    </section>
  );
}
