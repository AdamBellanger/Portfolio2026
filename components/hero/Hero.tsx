import Image from "next/image";
import { HeroNameMarquee } from "@/components/hero/HeroNameMarquee";
import { LocationBadge } from "@/components/hero/LocationBadge";
import { Reveal } from "@/components/ui/Reveal";
import portrait from "@/public/images/portrait.webp";

export function Hero() {
  return (
    <div className="relative h-[180vh]">
      <section className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]" />
        <Image
          src={portrait}
          alt="Portrait d'Adam Bellanger"
          priority
          sizes="(min-width: 640px) 900px, 130vw"
          className="absolute bottom-0 left-1/2 h-[68vh] w-auto max-w-none -translate-x-1/2 select-none sm:h-[86vh] sm:max-h-[837px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/70 to-transparent" />

        <Reveal delay={0.2} className="absolute left-0 top-[66%] z-10 -translate-y-1/2 sm:top-1/2">
          <LocationBadge />
        </Reveal>

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
          <HeroNameMarquee />
        </div>
      </section>
    </div>
  );
}
