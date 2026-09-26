import type { Locale } from "@/lib/i18n";

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

const fr: SkillGroup[] = [
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
    title: "Systèmes, Cloud & DevOps",
    description: "Serveurs Windows et Linux, cloud, et mon infra de production.",
    items: [
      "Linux (Ubuntu)",
      "Windows Server",
      "Active Directory",
      "Docker & Compose",
      "Scaleway",
      "HAProxy",
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

// Same groups and tools; only titles, descriptions and generic terms change.
const en: SkillGroup[] = [
  {
    title: "Networking & Telecom",
    description: "Day to day at Socacom: installing, configuring, troubleshooting.",
    items: fr[0].items.map(
      (item) =>
        ({
          "Routeurs Huawei": "Huawei routers",
          "Baies de brassage": "Patch panels & racks",
          "Vidéosurveillance Hikvision": "Hikvision CCTV",
          "Fibre FTTH / FTTO": "FTTH / FTTO fibre",
          "Support SAV": "Customer support",
        })[item] ?? item,
    ),
  },
  {
    title: "Systems, Cloud & DevOps",
    description: "Windows and Linux servers, cloud, and my own production infrastructure.",
    items: fr[1].items,
  },
  {
    title: "Front-end",
    description: "Polished, fast and accessible interfaces.",
    items: fr[2].items,
  },
  {
    title: "Back-end & Data",
    description: "APIs, databases and business tools.",
    items: fr[3].items,
  },
  {
    title: "Tools",
    description: "Everything around the code.",
    items: fr[4].items,
  },
];

export const skillGroups: Record<Locale, SkillGroup[]> = { fr, en };
