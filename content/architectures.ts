// Architecture diagrams for each case study, drawn from each repo's README and
// structure. A diagram is a left-to-right flow of columns; every column holds
// one or more nodes, and arrows connect consecutive columns.

export type ArchNode = { label: string; detail?: string };
export type Architecture = { columns: ArchNode[][]; note?: string };

export const architectures: Record<string, Architecture> = {
  teledesk: {
    columns: [
      [
        {
          label: "Exports Excel",
          detail: "Alcatel EDN · Unyc · fibre · vidéo",
        },
      ],
      [
        {
          label: "Interface React",
          detail: "Vite + Tailwind, fenêtre pywebview",
        },
      ],
      [
        {
          label: "API Flask locale",
          detail: "Détection du type, mapping YAML, anti-doublon",
        },
      ],
      [
        { label: "API Bob! Desk", detail: "Auth, retry, pagination" },
        { label: "Rapports", detail: "CSV + JSON par client" },
      ],
    ],
    note: "Le tout est empaqueté dans un seul .exe Windows (PyInstaller), sans installation.",
  },
  "infra-hetzner": {
    columns: [
      [{ label: "Internet", detail: "DNS wildcard *.adambellanger.pro" }],
      [
        {
          label: "Nginx Proxy Manager",
          detail: ":80 / :443, SSL Let's Encrypt",
        },
      ],
      [
        { label: "Applications", detail: "Portfolio, OpenWhisper, PolyTrack…" },
        { label: "Supervision", detail: "Grafana, Uptime Kuma, Portainer" },
        { label: "Automatisation", detail: "n8n, Ntfy" },
      ],
      [
        { label: "PostgreSQL", detail: "Données applicatives" },
        { label: "Prometheus", detail: "Métriques pour Grafana" },
        { label: "Watchtower", detail: "Mises à jour des conteneurs" },
      ],
    ],
    note: "Ubuntu 24.04 sur un Hetzner CPX32. Accès admin par clé SSH et WireGuard, protégé par Fail2Ban.",
  },
  floatsniper: {
    columns: [
      [
        {
          label: "7 marketplaces",
          detail: "CSFloat, Skinport, DMarket, Steam…",
        },
      ],
      [
        {
          label: "Scanner PHP",
          detail: "Rotation de clés API, cache global 20 min",
        },
      ],
      [{ label: "MySQL", detail: "Prix, historique, watchlists, comptes" }],
      [
        {
          label: "Dashboard web",
          detail: "Graphiques Chart.js, portfolio Steam",
        },
        { label: "Alertes", detail: "In-app, navigateur, e-mail, Discord" },
        { label: "Stripe", detail: "Abonnements, webhooks signés" },
      ],
    ],
    note: "Authentification : bcrypt, Google OAuth, Steam OpenID et 2FA TOTP.",
  },
  openwhisper: {
    columns: [
      [{ label: "Navigateur", detail: "Dépôt du fichier audio" }],
      [{ label: "Nginx Proxy Manager", detail: "HTTPS, seul point d'entrée" }],
      [{ label: "Frontend nginx", detail: "React compilé + proxy /api" }],
      [{ label: "Passerelle Express", detail: ":3001, upload multer" }],
      [{ label: "whisper-service", detail: "Flask :5000, Whisper + ffmpeg" }],
    ],
    note: "Seul le frontend est exposé : la passerelle et le moteur de transcription restent sur le réseau Docker interne.",
  },
  polytrack: {
    columns: [
      [{ label: "Polymarket", detail: "Wallets des top traders, API CLOB" }],
      [{ label: "Bot Node.js", detail: "Surveillance continue, sous PM2" }],
      [
        { label: "PostgreSQL", detail: "Historique des trades" },
        { label: "Discord", detail: "Alerte à chaque trade" },
      ],
      [{ label: "API Node.js", detail: ":4000, sous PM2" }],
      [{ label: "Dashboard web", detail: "Conteneur Docker derrière NPM" }],
    ],
  },
  docsdesk: {
    columns: [
      [{ label: "Fichiers déposés", detail: ".docx, .xlsx, .pdf, images" }],
      [{ label: "Interface React", detail: "Fenêtre pywebview" }],
      [{ label: "API Flask locale", detail: ":7422, worker + journal" }],
      [{ label: "Conversion PDF", detail: "LibreOffice, Pillow" }],
      [{ label: "API Bob! Desk", detail: "Documents de la fiche client" }],
    ],
    note: "Même base technique que TéléDesk, livrée elle aussi en .exe autonome.",
  },
  "album-photo": {
    columns: [
      [
        { label: "Visiteur", detail: "Lien à token, rendu full-scroll" },
        { label: "Admin", detail: "Éditeur visuel libre" },
      ],
      [{ label: "Next.js", detail: "App Router, TypeScript" }],
      [{ label: "Drizzle ORM", detail: "Schéma et migrations" }],
      [{ label: "PostgreSQL", detail: "Albums, pages, éléments" }],
    ],
    note: "Tests de bout en bout Playwright qui pilotent un vrai Chromium.",
  },
  "studio-landing-pages": {
    columns: [
      [{ label: "Builder React", detail: "Drag & drop, état Zustand, GSAP" }],
      [{ label: "API REST PHP", detail: "Authentification, sauvegarde" }],
      [{ label: "MySQL", detail: "Utilisateurs et pages" }],
    ],
    note: "Projet en cours : templates, export HTML/CSS et statistiques prévus.",
  },
  qrcode: {
    columns: [
      [{ label: "Navigateur", detail: "Fichier ou URL" }],
      [{ label: "Reverse proxy", detail: "HTTPS, limite d'upload 110 Mo" }],
      [
        {
          label: "Express + TypeScript",
          detail: "API, génération QR, front statique",
        },
      ],
      [{ label: "Volume /data", detail: "Fichiers nommés par UUID" }],
    ],
    note: "Scanner le QR code ouvre GET /i/:uuid, qui sert directement le fichier.",
  },
  "big-five": {
    columns: [
      [{ label: "60 questions", detail: "Interface FR / EN" }],
      [{ label: "app.js", detail: "Logique du quiz, scoring, i18n" }],
      [{ label: "Résultats", detail: "5 traits, barres animées" }],
    ],
    note: "100 % navigateur : aucun backend, aucune dépendance.",
  },
  "portfolio-v1": {
    columns: [
      [{ label: "index.php", detail: "Structure one-page" }],
      [
        { label: "ui.js", detail: "Navigation, modales, splash screen" },
        { label: "threescene.js", detail: "Scène Three.js en arrière-plan" },
      ],
      [{ label: "Three.js", detail: "Chargé par import map (CDN)" }],
    ],
  },
  "mancity-univers": {
    columns: [
      [{ label: "3 rôles", detail: "Staff, joueur, supporter" }],
      [{ label: "PHP + sessions", detail: "Contrôle d'accès par rôle" }],
      [{ label: "PDO", detail: "Requêtes préparées" }],
      [{ label: "MySQL", detail: "Joueurs, matchs, statistiques" }],
    ],
    note: "Tableaux de bord Chart.js, recherche en temps réel et pagination.",
  },
};
