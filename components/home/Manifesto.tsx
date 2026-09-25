import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-32 sm:flex-row sm:gap-16 sm:px-10">
      <Reveal className="flex-[1.4]">
        <p className="font-display text-3xl leading-tight sm:text-4xl">
          Connecter le réseau et le code. Construire ce que la plupart des
          développeurs ne comprennent pas, et faire tourner ce que la plupart
          des techniciens ne codent pas.
        </p>
      </Reveal>
      <Reveal delay={0.15} className="flex-1">
        <p className="text-muted">
          Ce croisement entre infrastructure réseau/télécom et développement
          full-stack me place à un endroit rare : je conçois autant que je
          maintiens ce qui tourne derrière.
        </p>
      </Reveal>
    </section>
  );
}
