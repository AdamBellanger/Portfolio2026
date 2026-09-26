import type { Architecture } from "@/content/architectures";

// English versions of the architecture diagrams (same shape as the French
// ones in content/architectures.ts).

export const architecturesEn: Record<string, Architecture> = {
  teledesk: {
    columns: [
      [{ label: "Excel exports", detail: "Alcatel EDN · Unyc · fibre · CCTV" }],
      [{ label: "React interface", detail: "Vite + Tailwind, pywebview window" }],
      [{ label: "Local Flask API", detail: "Type detection, YAML mapping, de-duplication" }],
      [
        { label: "Bob! Desk API", detail: "Auth, retries, pagination" },
        { label: "Reports", detail: "CSV + JSON per customer" },
      ],
    ],
    note: "Everything ships as a single Windows .exe (PyInstaller), no installation needed.",
  },
  "infra-hetzner": {
    columns: [
      [{ label: "Internet", detail: "Wildcard DNS *.adambellanger.pro" }],
      [{ label: "Nginx Proxy Manager", detail: ":80 / :443, Let's Encrypt SSL" }],
      [
        { label: "Applications", detail: "Portfolio, OpenWhisper, PolyTrack…" },
        { label: "Monitoring", detail: "Grafana, Uptime Kuma, Portainer" },
        { label: "Automation", detail: "n8n, Ntfy" },
      ],
      [
        { label: "PostgreSQL", detail: "Application data" },
        { label: "Prometheus", detail: "Metrics for Grafana" },
        { label: "Watchtower", detail: "Container updates" },
      ],
    ],
    note: "Ubuntu 24.04 on a Hetzner CPX32. Admin access via SSH keys and WireGuard, protected by Fail2Ban.",
  },
  floatsniper: {
    columns: [
      [{ label: "7 marketplaces", detail: "CSFloat, Skinport, DMarket, Steam…" }],
      [{ label: "PHP scanner", detail: "API key rotation, 20-min global cache" }],
      [{ label: "MySQL", detail: "Prices, history, watchlists, accounts" }],
      [
        { label: "Web dashboard", detail: "Chart.js charts, Steam portfolio" },
        { label: "Alerts", detail: "In-app, browser, email, Discord" },
        { label: "Stripe", detail: "Subscriptions, signed webhooks" },
      ],
    ],
    note: "Authentication: bcrypt, Google OAuth, Steam OpenID and TOTP 2FA.",
  },
  "lab-telephonie-pme": {
    columns: [
      [{ label: "Carrier", detail: "8-channel SIP trunk, ported numbers" }],
      [{ label: "FortiGate", detail: "SIP ALG disabled, rules towards the carrier" }],
      [{ label: "Huawei PoE+ switches", detail: "Voice VLAN 20 via LLDP-MED, DSCP EF / CS3" }],
      [
        { label: "OXO Connect", detail: "IP licences, auto attendant, hunt groups, voicemail" },
        { label: "40 IP phones", detail: "Offices + operator phone at reception" },
        { label: "Analogue ports", detail: "Fax and alarm" },
      ],
    ],
    note: "Phones and IP-PBX share the voice VLAN; PCs stay on the data VLAN, plugged in behind each phone's built-in switch.",
  },
  "lab-reseau-pme": {
    columns: [
      [{ label: "Internet", detail: "FTTO fibre + 4G backup" }],
      [{ label: "FortiGate", detail: "Inter-VLAN routing, filtering, IPsec VPN" }],
      [{ label: "Huawei core switch", detail: "LACP bundle to the FortiGate" }],
      [{ label: "PoE access switches", detail: "One per floor, 802.1Q trunks" }],
      [
        { label: "VLAN 10 · Data", detail: "Workstations and file server" },
        { label: "VLAN 20 · Voice", detail: "IP-PBX and phones" },
        { label: "VLAN 30 · Guests", detail: "Wi-Fi, Internet only" },
        { label: "VLAN 40 · Video", detail: "Cameras and NVR, isolated" },
        { label: "VLAN 99 · Admin", detail: "Device management" },
      ],
    ],
    note: "Remote work: FortiClient over IKEv2 IPsec. Monitoring: SNMPv3 from the switches and FortiGate, fed into Grafana through Prometheus.",
  },
  openwhisper: {
    columns: [
      [{ label: "Browser", detail: "Audio file upload" }],
      [{ label: "Nginx Proxy Manager", detail: "HTTPS, single entry point" }],
      [{ label: "nginx frontend", detail: "Compiled React + /api proxy" }],
      [{ label: "Express gateway", detail: ":3001, multer upload" }],
      [{ label: "whisper-service", detail: "Flask :5000, Whisper + ffmpeg" }],
    ],
    note: "Only the frontend is exposed: the gateway and the transcription engine stay on the internal Docker network.",
  },
  polytrack: {
    columns: [
      [{ label: "Polymarket", detail: "Top traders' wallets, CLOB API" }],
      [{ label: "Node.js bot", detail: "Continuous monitoring, under PM2" }],
      [
        { label: "PostgreSQL", detail: "Trade history" },
        { label: "Discord", detail: "Alert on every trade" },
      ],
      [{ label: "Node.js API", detail: ":4000, under PM2" }],
      [{ label: "Web dashboard", detail: "Docker container behind NPM" }],
    ],
  },
  docsdesk: {
    columns: [
      [{ label: "Dropped files", detail: ".docx, .xlsx, .pdf, images" }],
      [{ label: "React interface", detail: "pywebview window" }],
      [{ label: "Local Flask API", detail: ":7422, worker + log" }],
      [{ label: "PDF conversion", detail: "LibreOffice, Pillow" }],
      [{ label: "Bob! Desk API", detail: "Documents in the customer record" }],
    ],
    note: "Same technical foundation as TéléDesk, also shipped as a standalone .exe.",
  },
  "album-photo": {
    columns: [
      [
        { label: "Visitor", detail: "Token link, full-scroll view" },
        { label: "Admin", detail: "Free-form visual editor" },
      ],
      [{ label: "Next.js", detail: "App Router, TypeScript" }],
      [{ label: "Drizzle ORM", detail: "Schema and migrations" }],
      [{ label: "PostgreSQL", detail: "Albums, pages, elements" }],
    ],
    note: "Playwright end-to-end tests driving a real Chromium.",
  },
  "studio-landing-pages": {
    columns: [
      [{ label: "React builder", detail: "Drag & drop, Zustand state, GSAP" }],
      [{ label: "PHP REST API", detail: "Authentication, saving" }],
      [{ label: "MySQL", detail: "Users and pages" }],
    ],
    note: "Work in progress: templates, HTML/CSS export and analytics planned.",
  },
  qrcode: {
    columns: [
      [{ label: "Browser", detail: "File or URL" }],
      [{ label: "Reverse proxy", detail: "HTTPS, 110 MB upload limit" }],
      [{ label: "Express + TypeScript", detail: "API, QR generation, static front end" }],
      [{ label: "/data volume", detail: "Files named by UUID" }],
    ],
    note: "Scanning the QR code opens GET /i/:uuid, which serves the file directly.",
  },
  "big-five": {
    columns: [
      [{ label: "60 questions", detail: "FR / EN interface" }],
      [{ label: "app.js", detail: "Quiz logic, scoring, i18n" }],
      [{ label: "Results", detail: "5 traits, animated bars" }],
    ],
    note: "100% in the browser: no backend, no dependencies.",
  },
  "portfolio-v1": {
    columns: [
      [{ label: "index.php", detail: "One-page structure" }],
      [
        { label: "ui.js", detail: "Navigation, modals, splash screen" },
        { label: "threescene.js", detail: "Three.js background scene" },
      ],
      [{ label: "Three.js", detail: "Loaded via import map (CDN)" }],
    ],
  },
  "mancity-univers": {
    columns: [
      [{ label: "3 roles", detail: "Staff, player, supporter" }],
      [{ label: "PHP + sessions", detail: "Role-based access control" }],
      [{ label: "PDO", detail: "Prepared statements" }],
      [{ label: "MySQL", detail: "Players, matches, statistics" }],
    ],
    note: "Chart.js dashboards, real-time search and pagination.",
  },
};
