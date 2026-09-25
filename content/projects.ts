export type Project = {
  slug: string;
  title: string;
  pitch: string;
  stack: string[];
  context: string;
  role: string;
  challenges: string;
  result: string;
  repoUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "drop-sim",
    title: "DROP_SIM",
    pitch:
      "Jeu d'ouverture de caisses façon CS2, refactorisé en Next.js 15 + SQLite.",
    stack: ["Next.js", "TypeScript", "SQLite", "Tailwind CSS"],
    context:
      "Un jeu de type « case opening » inspiré de CS2 : ouverture de caisses virtuelles avec système de drop et de rareté. Développé initialement comme projet personnel, puis repris pour ce portfolio avec une stack moderne.",
    role: "Développement solo — conception du système de drop, de la base de données et de l'interface.",
    challenges:
      "À compléter : génération aléatoire pondérée par rareté, gestion de la persistance des inventaires, animations d'ouverture.",
    result: "À compléter : captures d'écran, métriques, retours utilisateurs.",
  },
  {
    slug: "infra-hetzner",
    title: "Infra Hetzner / Homelab",
    pitch:
      "Serveur auto-géré, stack Docker complète, et un incident réseau réel diagnostiqué et résolu.",
    stack: [
      "Docker",
      "Grafana",
      "Prometheus",
      "n8n",
      "WireGuard",
      "Nginx Proxy Manager",
    ],
    context:
      "Serveur Hetzner CPX32 auto-géré, hébergeant une stack Docker complète (Grafana, Prometheus, n8n, Portainer, Nginx Proxy Manager, WireGuard, Fail2Ban) pour le monitoring et l'automatisation de projets personnels, avec le domaine adambellanger.pro en SSL.",
    role: "Administration système et réseau en solo — configuration, sécurisation et maintenance de l'ensemble de l'infrastructure.",
    challenges:
      "Un incident de blocage réseau côté Hetzner a nécessité un diagnostic complet de la chaîne réseau (DNS, pare-feu, routage) avant résolution. À détailler : symptômes précis, étapes de diagnostic, cause racine.",
    result:
      "À compléter : temps de résolution, leçons apprises, changements mis en place pour éviter la récidive.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
