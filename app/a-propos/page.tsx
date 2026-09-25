import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Skills } from "@/components/home/Skills";
import { CvButton } from "@/components/ui/CvButton";

export const metadata: Metadata = {
  title: "À propos — Adam Bellanger",
};

const timeline = [
  {
    place: "Socacom — Saint-Martin-du-Vivier",
    role: "Apprenti technicien réseau & télécom",
    text: "Téléphonie d'entreprise (Alcatel OXO Connect, Centrex UnyCX, SIP/VoIP, trunks SIP), infra réseau (switches Huawei, FortiGate, VLAN) et support SAV client. J'y ai aussi développé TéléDesk et DocsDesk, deux outils internes qui automatisent la saisie dans la GMAO.",
  },
  {
    place: "IRIS — Rouen",
    role: "BTS SIO, option SISR (alternance)",
    text: "Administration systèmes et réseaux, sécurité, services d'infrastructure, avec des modules de développement web (PHP/MySQL) en parallèle.",
  },
  {
    place: "Lycée Campus La Châtaigneraie",
    role: "Bac Pro Systèmes Numériques — 2025",
    text: "Sept stages en entreprise pendant le bac, dont cinq chez Socacom (téléphonie en atelier, baies de brassage, switchs et routeurs, vidéosurveillance, Centrex), plus AJ Phone (téléphonie fixe et DECT) et Micro-Technique (dépannage informatique chez les clients).",
  },
  {
    place: "Homelab — adambellanger.pro",
    role: "Auto-hébergement & auto-formation",
    text: "Un serveur Hetzner géré de A à Z : Docker, reverse proxy, monitoring, automatisation. C'est là que je déploie et fais tourner tous mes projets.",
  },
];

export default function AProposPage() {
  return (
    <div className="theme-light flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pb-24 pt-40 sm:px-10">
        <SplitText
          text="À propos"
          className="font-display text-6xl sm:text-8xl"
        />
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr]">
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              Technicien réseau & télécom le jour, développeur full-stack le
              reste du temps. Je ne choisis pas entre les deux : c&apos;est
              justement ce croisement qui me rend utile.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted">
              Je comprends ce qui se passe sous le code (VLAN, SIP, pare-feu,
              DNS) et je sais construire l&apos;outil qui manque au-dessus. Mes
              projets partent souvent d&apos;un vrai problème de terrain.
            </p>
            <CvButton className="mt-6" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-32 sm:px-10">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl">Parcours</h2>
        </Reveal>
        <ol className="flex flex-col border-b border-foreground/10">
          {timeline.map((item, i) => (
            <Reveal key={item.place} delay={i * 0.05}>
              <li className="grid gap-3 border-t border-foreground/10 py-8 sm:grid-cols-[1fr_2fr] sm:gap-10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    {item.role}
                  </p>
                  <h3 className="mt-2 font-display text-xl">{item.place}</h3>
                </div>
                <p className="text-foreground/80">{item.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <Skills />
    </div>
  );
}
