import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Skills } from "@/components/home/Skills";
import { CvButton } from "@/components/ui/CvButton";

export const metadata: Metadata = {
  title: "À propos — Adam Bellanger",
};

// What a typical week at Socacom looks like, by type of mission.
const missions = [
  {
    title: "Téléphonie d'entreprise",
    text: "Installation et paramétrage d'IPBX Alcatel-Lucent OXO Connect : postes, groupements, SVI, messageries, horaires jour/nuit.",
  },
  {
    title: "Centrex & trunks SIP",
    text: "Mise en service de lignes Centrex UnyCX et de trunks SIP, portabilité des numéros, diagnostic des appels.",
  },
  {
    title: "Réseau & sécurité",
    text: "Configuration de switches Huawei et de pare-feu FortiGate : VLAN, PoE, règles de filtrage, accès distants.",
  },
  {
    title: "Baies & câblage",
    text: "Brassage, repérage et mise en baie des équipements, tests et remise en service des liens.",
  },
  {
    title: "Vidéosurveillance",
    text: "Installation d'enregistreurs et de caméras IP, paramétrage des accès distants.",
  },
  {
    title: "SAV & support client",
    text: "Diagnostic à distance ou sur site, suivi des interventions dans la GMAO, échanges directs avec les clients.",
  },
];

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
            <Reveal
              key={item.place}
              as="li"
              delay={i * 0.05}
              className="grid gap-3 border-t border-foreground/10 py-8 sm:grid-cols-[1fr_2fr] sm:gap-10"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {item.role}
                </p>
                <h3 className="mt-2 font-display text-xl">{item.place}</h3>
              </div>
              <p className="text-foreground/80">{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-32 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Socacom · depuis 2025
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            En alternance, au quotidien
          </h2>
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission, i) => (
            <Reveal
              key={mission.title}
              as="li"
              delay={i * 0.04}
              className="flex flex-col gap-3 bg-background p-6"
            >
              <span className="font-mono text-[11px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl">{mission.title}</h3>
              <p className="text-sm text-foreground/75">{mission.text}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="text-muted">
            Et quand un outil manque, je le développe :{" "}
            <Link
              href="/projets/teledesk"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:text-accent"
            >
              TéléDesk
            </Link>{" "}
            et{" "}
            <Link
              href="/projets/docsdesk"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:text-accent"
            >
              DocsDesk
            </Link>{" "}
            sont nés sur le terrain. Pour la partie réseau et téléphonie, deux
            maquettes documentées :{" "}
            <Link
              href="/projets/lab-telephonie-pme"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:text-accent"
            >
              téléphonie PME
            </Link>{" "}
            et{" "}
            <Link
              href="/projets/lab-reseau-pme"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:text-accent"
            >
              réseau segmenté
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <Skills />
    </div>
  );
}
