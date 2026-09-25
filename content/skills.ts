export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Réseau & Télécom",
    description: "Le quotidien chez Socacom : installer, configurer, dépanner.",
    items: [
      "Alcatel OXO Connect",
      "Centrex UnyCX / Metaswitch",
      "SIP / VoIP",
      "Trunks SIP",
      "DECT",
      "Switches Huawei & Aruba",
      "Routeurs Huawei",
      "FortiGate",
      "VLAN",
      "Baies de brassage",
      "Vidéosurveillance Hikvision",
      "Fibre FTTH / FTTO",
      "Support SAV",
    ],
  },
  {
    title: "Infra & DevOps",
    description: "Mon serveur de production, géré de A à Z.",
    items: [
      "Linux (Ubuntu)",
      "Docker & Compose",
      "Nginx Proxy Manager",
      "WireGuard",
      "Fail2Ban",
      "Prometheus",
      "Grafana",
      "Uptime Kuma",
      "Portainer",
      "n8n",
      "PM2",
    ],
  },
  {
    title: "Front-end",
    description: "Des interfaces soignées, rapides et accessibles.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "GSAP",
      "Zustand",
    ],
  },
  {
    title: "Back-end & Données",
    description: "APIs, bases de données et outils métier.",
    items: [
      "Node.js / Express",
      "PHP",
      "Python / Flask",
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "Drizzle ORM",
      "Stripe",
    ],
  },
  {
    title: "Outils",
    description: "Ce qui tourne autour du code.",
    items: ["Git / GitHub", "Playwright", "PyInstaller", "Chart.js", "XAMPP"],
  },
];
