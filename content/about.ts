import type { Locale } from "@/lib/i18n";

type TimelineItem = { place: string; role: string; text: string };
type Mission = { title: string; text: string };
/** Plain text, or a link to a case study. */
type Segment = string | { slug: string; label: string };

type About = {
  title: string;
  lead: string;
  aside: string;
  journey: string;
  timeline: TimelineItem[];
  missionsKicker: string;
  missionsTitle: string;
  missions: Mission[];
  outro: Segment[];
};

const fr: About = {
  title: "À propos",
  lead: "En apprentissage chez Socacom (BTS SIO), je fais de la téléphonie d'entreprise et de l'administration réseau. À côté, je développe des applications web. Les deux métiers se croisent plus souvent qu'on ne le croit.",
  aside:
    "Configurer un VLAN, dépanner un trunk SIP, écrire une API : je fais les trois. Mes projets partent presque toujours d'un besoin réel, rencontré au travail ou chez moi.",
  journey: "Parcours",
  timeline: [
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
  ],
  missionsKicker: "Socacom · depuis 2025",
  missionsTitle: "En alternance, au quotidien",
  missions: [
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
  ],
  outro: [
    "Et quand un outil manque, je le développe : ",
    { slug: "teledesk", label: "TéléDesk" },
    " et ",
    { slug: "docsdesk", label: "DocsDesk" },
    " sont nés sur le terrain. Pour la partie réseau et téléphonie, deux maquettes documentées : ",
    { slug: "lab-telephonie-pme", label: "téléphonie PME" },
    " et ",
    { slug: "lab-reseau-pme", label: "réseau segmenté" },
    ".",
  ],
};

const en: About = {
  title: "About",
  lead: "I'm a network & telecom apprentice at Socacom (BTS SIO), and I build web applications on the side. The two jobs overlap more than you'd expect.",
  aside:
    "Configuring a VLAN, troubleshooting a SIP trunk, writing an API: I do all three. My projects almost always start from a real need, usually one I ran into at work or at home.",
  journey: "Background",
  timeline: [
    {
      place: "Socacom — Saint-Martin-du-Vivier",
      role: "Apprentice network & telecom technician",
      text: "Business telephony (Alcatel OXO Connect, UnyCX Centrex, SIP/VoIP, SIP trunks), network infrastructure (Huawei switches, FortiGate, VLANs) and customer support. I also built TéléDesk and DocsDesk there, two internal tools that automate data entry in the maintenance software.",
    },
    {
      place: "IRIS — Rouen",
      role: "BTS SIO, SISR track (apprenticeship)",
      text: "A two-year French higher national diploma in IT services: systems and network administration, security and infrastructure services, alongside web development modules (PHP/MySQL).",
    },
    {
      place: "Lycée Campus La Châtaigneraie",
      role: "Vocational baccalaureate, Digital Systems — 2025",
      text: "Seven work placements during the diploma, five of them at Socacom (workshop telephony, patch panels, switches and routers, CCTV, Centrex), plus AJ Phone (fixed and DECT telephony) and Micro-Technique (on-site IT repairs).",
    },
    {
      place: "Homelab — adambellanger.pro",
      role: "Self-hosting & self-teaching",
      text: "A Hetzner server managed end to end: Docker, reverse proxy, monitoring, automation. It's where I deploy and run all my projects.",
    },
  ],
  missionsKicker: "Socacom · since 2025",
  missionsTitle: "My apprenticeship, day to day",
  missions: [
    {
      title: "Business telephony",
      text: "Installing and configuring Alcatel-Lucent OXO Connect IP-PBXs: phones, hunt groups, auto attendants, voicemail, day/night schedules.",
    },
    {
      title: "Centrex & SIP trunks",
      text: "Commissioning UnyCX Centrex lines and SIP trunks, number porting, call troubleshooting.",
    },
    {
      title: "Networking & security",
      text: "Configuring Huawei switches and FortiGate firewalls: VLANs, PoE, filtering rules, remote access.",
    },
    {
      title: "Racks & cabling",
      text: "Patching, labelling and racking equipment, testing and restoring links.",
    },
    {
      title: "CCTV",
      text: "Installing recorders and IP cameras, setting up remote access.",
    },
    {
      title: "Customer support",
      text: "Remote or on-site troubleshooting, tracking jobs in the maintenance software, working directly with customers.",
    },
  ],
  outro: [
    "And when a tool is missing, I build it: ",
    { slug: "teledesk", label: "TéléDesk" },
    " and ",
    { slug: "docsdesk", label: "DocsDesk" },
    " were born in the field. For networking and telephony, two documented labs: ",
    { slug: "lab-telephonie-pme", label: "SMB telephony" },
    " and ",
    { slug: "lab-reseau-pme", label: "segmented network" },
    ".",
  ],
};

export const about: Record<Locale, About> = { fr, en };
