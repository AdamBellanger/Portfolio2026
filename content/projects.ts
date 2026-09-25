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
      "Faire cohabiter une dizaine de services derrière un seul point d'entrée (Nginx Proxy Manager, DNS wildcard, SSL par sous-domaine) en n'exposant que le strict nécessaire. Plusieurs incidents réels, tous documentés : un crash mémoire au premier démarrage qui a imposé un rebuild complet depuis la console Hetzner (corrigé en ajoutant du swap) ; une console VNC en clavier QWERTZ qui empêchait de taper certaines commandes ; un VPN qui reroutait tout le trafic et coupait la session SSH (whitelist du port 22, OpenVPN --route-nopull, proxychains et Cloudflare Warp testés) ; un conflit de ports 80/443 entre Nginx système et Nginx Proxy Manager.",
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
    demoUrl: "https://whisper.adambellanger.pro",
  },
  {
    slug: "polytrack",
    title: "PolyTrack",
    kind: "Perso",
    pitch:
      "Bot de suivi des meilleurs traders Polymarket, avec un dashboard web et des alertes Discord en temps réel.",
    stack: ["Node.js", "PM2", "PostgreSQL", "Discord.js", "Polymarket CLOB API", "Docker"],
    context:
      "Sur Polymarket, quelques traders affichent des gains de plusieurs millions de dollars. PolyTrack surveille leurs wallets, enregistre chacun de leurs trades et les rend consultables dans un dashboard, avec une alerte Discord à chaque nouvelle position.",
    role:
      "Conception et développement complet : bot de surveillance, API, base de données, dashboard et déploiement sur mon serveur.",
    challenges:
      "Polymarket bloque le trading automatisé depuis l'Europe : j'ai testé plusieurs architectures réseau (OpenVPN, proxy SOCKS5, proxychains, Cloudflare Warp) avant de conclure que l'exécution automatique exige un serveur hébergé aux États-Unis. Côté données : une contrainte UNIQUE manquante sur le hash de transaction qui cassait les upserts, des identifiants UUID mal typés, et une erreur CORS lors du changement de domaine.",
    result:
      "Un service en ligne : le bot tourne en continu sous PM2, les trades sont stockés dans PostgreSQL, et le dashboard est accessible sur son propre sous-domaine en HTTPS.",
    highlights: [
      "Surveillance continue des wallets des top traders",
      "Alertes Discord à chaque nouveau trade",
      "Bot + API sous PM2, frontend en conteneur Docker",
    ],
    demoUrl: "https://polytrack.adambellanger.pro",
  },
  {
    slug: "docsdesk",
    title: "DocsDesk",
    kind: "Pro",
    pitch:
      "Application de bureau qui convertit n'importe quel document en PDF et le dépose dans la fiche client de la GMAO Bob! Desk.",
    stack: ["Python", "Flask", "React", "Tailwind CSS", "LibreOffice", "PyInstaller"],
    context:
      "Suite logique de TéléDesk chez Socacom : les techniciens doivent joindre des documents (Word, Excel, photos, PDF) aux fiches clients de Bob! Desk, un par un et au bon format.",
    role:
      "Conception et développement solo, sur la même base technique et la même charte que TéléDesk.",
    challenges:
      "Convertir des formats hétérogènes en PDF sans installation lourde (LibreOffice piloté en ligne de commande avec un profil isolé, Pillow pour les images), gérer les identifiants hors du dépôt Git dans le dossier utilisateur, et suivre la progression des envois en temps réel.",
    result:
      "Un .exe Windows autonome : on glisse les fichiers, on choisit le client, et tout est converti puis téléversé, avec un mode test qui simule l'envoi sans rien écrire.",
    highlights: [
      "Glisser-déposer : .docx, .xlsx, .pdf, images",
      "Conversion PDF via LibreOffice et Pillow",
      "Mode test (dry-run) et journal en temps réel",
    ],
    repoUrl: "https://github.com/AdamBellanger/DocsDesk",
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
      "Une app en un seul conteneur (front React compilé servi par Express), images persistées sur volume, déployée en production sur son propre domaine, qrdrop.online.",
    highlights: ["Front + API TypeScript", "Un conteneur, un volume", "Health check intégré"],
    repoUrl: "https://github.com/AdamBellanger/Qrcode",
    demoUrl: "https://qrdrop.online",
  },
  {
    slug: "studio-landing-pages",
    title: "StudioLandingPages",
    kind: "Perso",
    pitch:
      "Plateforme de création de landing pages en glisser-déposer, avec personnalisation en temps réel et publication en un clic. En cours de développement.",
    stack: ["React", "Vite", "Tailwind CSS", "GSAP", "Zustand", "PHP", "MySQL"],
    context:
      "Permettre de créer une landing page professionnelle sans écrire de code : on assemble des composants, on ajuste styles et contenus, puis on publie.",
    role: "Conception et développement full-stack : builder React, API REST PHP et base MySQL.",
    challenges:
      "Concevoir un builder drag-and-drop dont l'état reste cohérent (Zustand), un rendu responsive fidèle sur desktop, tablette et mobile, et une API REST en PHP pour l'authentification et la sauvegarde des pages.",
    result:
      "Projet en cours : builder et gestion des utilisateurs en place ; templates prédéfinis, export HTML/CSS et statistiques de visites prévus.",
    highlights: ["Builder drag-and-drop", "State management Zustand", "Animations GSAP"],
    repoUrl: "https://github.com/AdamBellanger/StudioLandingPages",
  },
  {
    slug: "big-five",
    title: "Big Five",
    kind: "Perso",
    pitch:
      "Test de personnalité Big Five (OCEAN) bilingue, avec interface futuriste et résultats animés, sans aucune dépendance.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    context:
      "Un test de personnalité complet en 60 questions couvrant les 5 grandes dimensions (ouverture, conscienciosité, extraversion, agréabilité, névrosisme), utilisable directement dans le navigateur.",
    role: "Conception et développement front-end.",
    challenges:
      "Tout faire en JavaScript vanilla : logique du quiz, calcul des scores, internationalisation français/anglais à la volée, et une interface glassmorphism responsive sans framework.",
    result:
      "Une application 100 % navigateur, bilingue, avec barres de progression animées et descriptions personnalisées pour chaque trait.",
    highlights: ["60 questions, 5 dimensions", "FR / EN à tout moment", "Zéro dépendance"],
    repoUrl: "https://github.com/AdamBellanger/OutoffServiceBigFive",
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1 (3D)",
    kind: "Perso",
    pitch:
      "Mon premier portfolio, commencé en première année de BTS SIO : une scène 3D interactive Three.js en arrière-plan.",
    stack: ["PHP", "JavaScript", "Three.js", "CSS3"],
    context:
      "Première version de mon portfolio, construite et enrichie au fil de ma première année de BTS SIO, avant la refonte actuelle.",
    role: "Conception et développement solo.",
    challenges:
      "Intégrer une scène Three.js en arrière-plan sans framework ni bundler (import map via CDN), avec écran de démarrage, navigation en pilule animée, modales de projets et effets glassmorphism.",
    result:
      "Un site one-page complet et responsive. Il m'a surtout appris ce que je voulais changer : le site actuel repart de zéro, plus rapide et plus lisible.",
    highlights: ["Scène 3D Three.js", "JavaScript vanilla", "L'ancêtre de ce site"],
    repoUrl: "https://github.com/AdamBellanger/Portfolio",
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
