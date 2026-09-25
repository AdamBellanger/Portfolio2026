import { HeroNameMarquee } from "@/components/hero/HeroNameMarquee";
import { HeroPortrait } from "@/components/hero/HeroPortrait";
import { LocationBadge } from "@/components/hero/LocationBadge";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <div className="relative h-[180vh]">
      <section className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]" />
        <HeroPortrait />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/70 to-transparent" />

        <Reveal delay={0.35} className="absolute right-6 top-32 z-10 sm:right-10">
          <div className="flex flex-col items-end gap-4 text-right">
            <span aria-hidden className="font-display text-2xl text-accent">
              ↘
            </span>
            <p className="font-display text-xl leading-tight text-foreground sm:text-2xl">
              Développeur
              <br />
              full-stack &amp; réseau
            </p>
          </div>
        </Reveal>

        <div className="relative z-10 mt-auto pb-6">
          <Reveal delay={0.2} className="mb-6 sm:mb-4">
            <LocationBadge />
          </Reveal>
          <HeroNameMarquee />
          <Reveal delay={0.5} className="px-6 sm:px-10">
            <p className="mt-2 max-w-md font-mono text-sm text-muted">
              Technicien réseau &amp; télécom — Alternant BTS SIO
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
