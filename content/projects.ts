export type ProjectKind = "Pro" | "Perso" | "École";

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  pitch: string;
  stack: string[];
  context: string;
  role: string;
  challenges: string;
  result: string;
  highlights: string[];
  featured?: boolean;
  repoUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "teledesk",
    title: "TéléDesk",
    kind: "Pro",
    featured: true,
    pitch:
      "Outil interne qui importe automatiquement les parcs téléphonie, fibre et vidéosurveillance des clients dans la GMAO Bob! Desk.",
    stack: ["Python", "Flask", "React", "Tailwind CSS", "Vite", "pywebview", "PyInstaller"],
    context:
      "Chez Socacom, chaque nouveau client implique de saisir à la main tout son parc (postes Alcatel-Lucent, lignes Centrex Unyc, liens fibre, caméras) dans Bob! Desk, la GMAO de l'entreprise. Une tâche longue, répétitive et source d'erreurs, à partir d'exports Excel hétérogènes selon le constructeur ou l'opérateur.",
    role:
      "Conception et développement solo, du besoin terrain jusqu'à l'exécutable livré aux collègues : lecture des exports, mapping vers le référentiel Bob! Desk, client API, interface et packaging.",
    challenges:
      "Normaliser des sources très différentes (export EDN Alcatel, utilisateurs Unyc, liens FTTH/FTTO par opérateur, NVR/DVR et caméras) vers un même modèle ; éviter les doublons sur des clients déjà saisis ; pouvoir rejouer un import sans risque grâce à un mode Remplacer et un mode test (dry-run) qui n'écrit rien. Côté distribution, empaqueter une interface React et un backend Flask dans un seul .exe Windows sans installation.",
    result:
      "Un exécutable autonome utilisé en interne, avec détection automatique du type de fichier, anti-doublon, upload des photos d'équipements et rapports CSV/JSON par client. Il a donné naissance à DocsDesk, un second outil sur la même base qui convertit des documents en PDF et les dépose dans la fiche client.",
    highlights: [
      "4 types d'import : Alcatel-Lucent, Unyc/Centrex, liens fibre, vidéosurveillance",
      "Mode test (dry-run) + mode Remplacer pour des imports rejouables",
      "Client HTTP Bob! Desk avec auth, retry et pagination",
      "Livré en .exe Windows autonome (PyInstaller + pywebview)",
    ],
    repoUrl: "https://github.com/AdamBellanger/TeleDesk",
  },
  {
    slug: "infra-hetzner",
    title: "Infra Hetzner / Homelab",
    kind: "Perso",
    featured: true,
    pitch:
      "Serveur de production auto-géré, construit de A à Z : reverse proxy, monitoring, automatisation et une dizaine de services en Docker.",
    stack: ["Ubuntu 24.04", "Docker", "Nginx Proxy Manager", "Prometheus", "Grafana", "Uptime Kuma", "n8n", "PostgreSQL", "WireGuard", "Fail2Ban"],
    context:
      "Un VPS Hetzner CPX32 (4 vCPU AMD, 8 Go RAM, 160 Go SSD, Ubuntu 24.04) qui héberge tous mes projets sous adambellanger.pro : dashboards, automatisations, API et applications web, chacun sur son sous-domaine en HTTPS.",
    role:
      "Administration système et réseau en solo : installation, durcissement, DNS et certificats, déploiement des services, supervision et maintenance. Toute la mise en place est documentée dans un repo dédié.",
    challenges:
      "Faire cohabiter une dizaine de services derrière un seul point d'entrée (Nginx Proxy Manager, DNS wildcard, SSL par sous-domaine) en n'exposant que le strict nécessaire. Un incident de blocage réseau côté Hetzner a aussi demandé un diagnostic complet de la chaîne (DNS, pare-feu, routage) avant résolution.",
    result:
      "Une infra stable qui sert de socle à tous mes projets : monitoring Prometheus/Grafana, disponibilité suivie par Uptime Kuma, notifications Ntfy, mises à jour automatiques des conteneurs avec Watchtower, et des services Node gérés par PM2.",
    highlights: [
      "Grafana, Prometheus, Uptime Kuma, n8n, Portainer, IT-Tools, Ntfy, PostgreSQL",
      "Reverse proxy + SSL par sous-domaine via Nginx Proxy Manager",
      "Accès sécurisé : clé SSH, WireGuard, Fail2Ban",
      "Setup scripté et documenté pour être reproductible",
    ],
    repoUrl: "https://github.com/AdamBellanger/Serveur-Production",
  },
  {
    slug: "floatsniper",
    title: "FloatSniper",
    kind: "Perso",
    featured: true,
    pitch:
      "SaaS qui surveille en temps réel les marketplaces de skins CS2, détecte les offres sous le prix du marché et alerte instantanément.",
    stack: ["PHP", "MySQL", "JavaScript", "Chart.js", "Stripe", "OAuth"],
    context:
      "Les prix d'un même skin CS2 varient fortement d'une marketplace à l'autre. L'idée : agréger CSFloat, Skinport, DMarket, Waxpeer, Steam Market, SkinBaron et BitSkins pour repérer les bonnes affaires avant les autres.",
    role:
      "Conception et développement complet : scan multi-sources, historique de prix, portfolio lié à Steam, alertes, abonnements et dashboard d'administration.",
    challenges:
      "Tenir les limites d'API (rotation de clés CSFloat, cache global de 20 minutes partagé entre utilisateurs, intervalles de scan selon l'offre) et sécuriser une application qui gère des comptes et des paiements : CSRF, 2FA TOTP, OAuth Google et Steam, requêtes préparées, vérification de signature des webhooks Stripe, rate limiting par action.",
    result:
      "Une plateforme complète avec 3 niveaux de détection d'affaires, graphiques d'historique sur 7 à 180 jours, synchronisation d'inventaire Steam, alertes (in-app, navigateur, e-mail, Discord) et formules Free/Pro/Premium.",
    highlights: [
      "7 marketplaces scannées, détection -10 % / -20 % / -30 %",
      "Auth : bcrypt, Google OAuth, Steam OpenID, 2FA TOTP",
      "Paiements Stripe avec webhooks signés",
      "Autocomplétion sur 1 700+ skins en cache",
    ],
    repoUrl: "https://github.com/AdamBellanger/FloatSniper",
  },
  {
    slug: "openwhisper",
    title: "OpenWhisper",
    kind: "Perso",
    pitch:
      "Application web de transcription audio propulsée par Whisper, 100 % dockerisée et auto-hébergée.",
    stack: ["React", "TypeScript", "Express", "Flask", "Whisper", "Docker", "Nginx"],
    context:
      "Transcrire des fichiers audio sans les envoyer à un service tiers : une interface simple pour déposer un fichier, choisir la langue et le modèle, et récupérer le texte.",
    role:
      "Architecture et développement de bout en bout, jusqu'au déploiement sur mon serveur derrière Nginx Proxy Manager.",
    challenges:
      "Découper l'application en trois services (frontend nginx, passerelle Express, API Flask + Whisper + ffmpeg) et n'exposer que le frontend : le backend et le moteur de transcription ne sont jamais accessibles depuis l'extérieur. Le modèle est intégré à l'image au build pour supprimer le démarrage à froid.",
    result:
      "Une app déployée en une commande (docker compose up), avec choix du modèle (small, medium, large), détection auto de la langue, progression et historique local des dernières transcriptions.",
    highlights: [
      "3 services isolés, un seul exposé",
      "Modèle Whisper intégré à l'image, pas de cold start",
      "Formats WAV, MP3, M4A, OGG, FLAC",
    ],
    repoUrl: "https://github.com/AdamBellanger/OpenWhisper",
  },
  {
    slug: "album-photo",
    title: "Album photo",
    kind: "Perso",
    pitch:
      "Album photo privé avec un rendu public en full-scroll animé et un éditeur visuel libre pour composer chaque page à la main.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Playwright", "Docker"],
    context:
      "Un album numérique à deux, pensé comme un objet : chaque page est composée librement, photos et textes posés où l'on veut, sans grille imposée.",
    role:
      "Conception et développement complet : rendu public, éditeur d'administration, base de données, tests et déploiement.",
    challenges:
      "Construire un éditeur libre (glisser-déposer, redimensionnement, rotation, choix de police) et un rendu scroll fidèle sur desktop comme en portrait. Les tests end-to-end Playwright ont appris deux règles : mesurer le rendu plutôt que le document, et regarder les pixels quand l'apparence est en jeu.",
    result:
      "Une application avec accès protégé par token, plusieurs albums, migrations Drizzle et une suite de tests qui pilote un vrai navigateur.",
    highlights: [
      "Éditeur visuel libre : drag & drop, resize, rotation",
      "Tests E2E Playwright sur le rendu réel",
      "PostgreSQL + Drizzle ORM",
    ],
    repoUrl: "https://github.com/AdamBellanger/Album-photo",
  },
  {
    slug: "drop-sim",
    title: "DROP_SIM",
    kind: "Perso",
    pitch:
      "Jeu d'ouverture de caisses façon CS2, refactorisé en Next.js 15 + SQLite.",
    stack: ["Next.js", "TypeScript", "SQLite", "Tailwind CSS"],
    context:
      "Un jeu de type « case opening » inspiré de CS2 : ouverture de caisses virtuelles avec système de drop et de rareté. Développé initialement comme projet personnel, puis repris avec une stack moderne.",
    role: "Développement solo : conception du système de drop, de la base de données et de l'interface.",
    challenges:
      "À compléter : génération aléatoire pondérée par rareté, persistance des inventaires, animations d'ouverture.",
    result: "À compléter : captures d'écran, lien de démo.",
    highlights: ["Tirage pondéré par rareté", "Persistance SQLite", "Refonte Next.js 15"],
  },
  {
    slug: "qrcode",
    title: "QR Code Generator",
    kind: "Perso",
    pitch:
      "Uploadez une image, récupérez un QR code qui pointe vers une URL publique servant cette image.",
    stack: ["React", "TypeScript", "Express", "Node.js", "Docker"],
    context:
      "Partager une image via un simple QR code, sans passer par un service tiers : l'image est stockée sur mon serveur et servie directement.",
    role: "Développement full-stack et conteneurisation.",
    challenges:
      "Gérer des uploads jusqu'à 100 Mo derrière un reverse proxy (limites de taille côté nginx/Caddy), respecter les en-têtes X-Forwarded-* et exposer un endpoint de health check pour Docker.",
    result:
      "Une app en un seul conteneur (front React compilé servi par Express), images persistées sur volume, prête à déployer derrière n'importe quel reverse proxy.",
    highlights: ["Front + API TypeScript", "Un conteneur, un volume", "Health check intégré"],
    repoUrl: "https://github.com/AdamBellanger/Qrcode",
  },
  {
    slug: "mancity-univers",
    title: "Manchester City Universe",
    kind: "École",
    pitch:
      "Application PHP de gestion d'un club de football : joueurs, matchs et statistiques, avec trois rôles distincts.",
    stack: ["PHP", "MySQL", "PDO", "JavaScript", "Chart.js"],
    context:
      "Projet du module Développement Web Backend en BTS SIO, réalisé en binôme avec Wassim El Goz sur le thème de Manchester City.",
    role:
      "Co-développement : modèle de données, authentification et rôles, CRUD et tableaux de bord.",
    challenges:
      "Trois vues très différentes sur les mêmes données : le staff gère joueurs, matchs et stats, le joueur ne voit que ses propres performances, le supporter consulte la saison. Recherche temps réel, filtres et pagination sur les listes.",
    result:
      "Une application complète avec dashboards Chart.js, upload de photos, mode sombre/clair et une zone fan, avec l'ensemble des bonus du sujet implémentés.",
    highlights: ["3 rôles : Staff / Joueur / Supporter", "CRUD complet + stats par match", "Projet en binôme"],
    repoUrl: "https://github.com/AdamBellanger/ProjetUniversManCity",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
