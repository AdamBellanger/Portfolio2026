// Groups each stack label by role so a case study's stack reads like a spec
// sheet. Order of TECH_CATEGORIES is the display order; unknown labels fall
// back to "Outils & API".

export const TECH_CATEGORIES = [
  "Langages",
  "Front-end",
  "Back-end",
  "Données",
  "Téléphonie",
  "Réseau",
  "Infra",
  "Outils & API",
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

const CATEGORY_OF: Record<string, TechCategory> = {
  Python: "Langages",
  PHP: "Langages",
  JavaScript: "Langages",
  TypeScript: "Langages",
  HTML5: "Langages",
  CSS3: "Langages",

  React: "Front-end",
  "Next.js": "Front-end",
  "Tailwind CSS": "Front-end",
  Vite: "Front-end",
  "Chart.js": "Front-end",
  GSAP: "Front-end",
  Zustand: "Front-end",
  "Three.js": "Front-end",
  pywebview: "Front-end",

  Flask: "Back-end",
  Express: "Back-end",
  "Node.js": "Back-end",
  "Discord.js": "Back-end",
  Whisper: "Back-end",

  PostgreSQL: "Données",
  MySQL: "Données",
  SQLite: "Données",
  PDO: "Données",
  Drizzle: "Données",

  FortiGate: "Réseau",
  "Huawei VRP": "Réseau",
  "VLAN 802.1Q": "Réseau",
  LACP: "Réseau",
  IPsec: "Réseau",
  "DHCP Snooping": "Réseau",
  SNMP: "Réseau",
  "LLDP-MED": "Réseau",
  "PoE+": "Réseau",
  "QoS DSCP": "Réseau",

  "Alcatel OXO Connect": "Téléphonie",
  OMC: "Téléphonie",
  "Trunk SIP": "Téléphonie",

  Docker: "Infra",
  Nginx: "Infra",
  "Nginx Proxy Manager": "Infra",
  "Ubuntu 24.04": "Infra",
  PM2: "Infra",
  Prometheus: "Infra",
  Grafana: "Infra",
  "Uptime Kuma": "Infra",
  WireGuard: "Infra",
  "Fail2Ban": "Infra",
  n8n: "Infra",
};

/** Stack split into non-empty groups, in display order, keeping item order. */
export function groupStack(stack: string[]) {
  return TECH_CATEGORIES.map((category) => ({
    category,
    items: stack.filter(
      (name) => (CATEGORY_OF[name] ?? "Outils & API") === category,
    ),
  })).filter((group) => group.items.length > 0);
}
