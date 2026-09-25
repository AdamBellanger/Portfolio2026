import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "À propos — Adam Bellanger",
};

export default function AProposPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-32 sm:px-10">
      <Reveal>
        <h1 className="font-display text-5xl sm:text-6xl">À propos</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-lg text-foreground/90">
          Apprenti BTS SIO (option SISR) à l&apos;IRIS Rouen et technicien
          télécom/réseau chez Socacom — téléphonie d&apos;entreprise, infra
          réseau, support client. En parallèle, développeur full-stack
          autodidacte et auto-hébergeur de ma propre infrastructure.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="text-muted">
          À compléter : parcours détaillé, homelab, formation.
        </p>
      </Reveal>
    </section>
  );
}
