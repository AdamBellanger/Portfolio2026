import { CursorRevealName } from "@/components/hero/CursorRevealName";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Stand-in for Adam's portrait until public/images/portrait.jpg exists */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--portrait-image)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />

      <Reveal delay={0.2} className="absolute bottom-44 left-6 z-10 sm:left-10">
        <div className="flex items-center gap-3 rounded-full border border-foreground/15 bg-background/70 py-2 pl-4 pr-2 backdrop-blur">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Basé à Rouen, France
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-anthracite text-xs">
            ✦
          </span>
        </div>
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

      <div className="relative z-10 mt-auto px-6 pb-6 sm:px-10">
        <CursorRevealName />
        <Reveal delay={0.5}>
          <p className="mt-2 max-w-md font-mono text-sm text-muted">
            Technicien réseau &amp; télécom — Alternant BTS SIO
          </p>
        </Reveal>
      </div>
    </section>
  );
}
