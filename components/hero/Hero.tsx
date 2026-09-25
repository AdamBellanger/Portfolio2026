import Image from "next/image";
import { HeroNameMarquee } from "@/components/hero/HeroNameMarquee";
import portrait from "@/public/images/portrait.webp";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <div className="relative h-[180vh]">
      <section className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]" />
        <Image
          src={portrait}
          alt="Portrait d'Adam Bellanger"
          priority
          sizes="(min-width: 640px) 60vw, 120vw"
          className="absolute bottom-0 left-1/2 h-[72vh] w-auto max-w-none -translate-x-1/2 select-none sm:h-[88vh] sm:max-h-[892px]"
        />
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
          <Reveal delay={0.2} className="mb-4 px-6 sm:mb-2 sm:px-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-background/70 py-2 pl-4 pr-2 backdrop-blur">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Basé à Rouen, France
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-anthracite text-xs">
                ✦
              </span>
            </div>
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
