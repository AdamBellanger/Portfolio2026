import type { Project } from "@/content/projects";

// English text for each case study, merged over the French entries in
// content/projects.ts (slug, stack, links and screenshots come from there).

export type ProjectTranslation = Pick<
  Project,
  "pitch" | "context" | "role" | "challenges" | "result" | "highlights" | "table"
> & {
  title?: string;
  /** Alt texts in the same order as the French screenshots. */
  screenshotAlts?: string[];
};

export const projectsEn: Record<string, ProjectTranslation> = {
  teledesk: {
    pitch:
      "Internal tool that automatically imports customers' telephony, fibre and CCTV equipment into the Bob! Desk maintenance software.",
    context:
      "At Socacom, every new customer meant typing their whole installed base (Alcatel-Lucent phones, Unyc Centrex lines, fibre links, cameras) into Bob! Desk, the company's maintenance management software, by hand. A slow, repetitive, error-prone job, working from Excel exports that differ by manufacturer and carrier.",
    role:
      "Solo design and development, from the field need to the executable handed to colleagues: reading the exports, mapping them to the Bob! Desk data model, API client, interface and packaging.",
    challenges:
      "Normalising very different sources (Alcatel EDN export, Unyc users, FTTH/FTTO links per carrier, NVR/DVR and cameras) into a single model; avoiding duplicates for customers already entered; making imports safe to replay with a Replace mode and a dry-run mode that writes nothing. On the distribution side, packaging a React interface and a Flask backend into a single Windows .exe that needs no installation.",
    result:
      "A standalone executable used in-house, with automatic file-type detection, duplicate protection, equipment photo upload and per-customer CSV/JSON reports. It led to DocsDesk, a second tool on the same foundation that converts documents to PDF and files them in the customer record.",
    highlights: [
      "4 import types: Alcatel-Lucent, Unyc/Centrex, fibre links, CCTV",
      "Dry-run and Replace modes for replayable imports",
      "Bob! Desk HTTP client with auth, retries and pagination",
      "Shipped as a standalone Windows .exe (PyInstaller + pywebview)",
    ],
  },
  "infra-hetzner": {
    title: "Hetzner infra / Homelab",
    pitch:
      "Self-managed production server built from scratch: reverse proxy, monitoring, automation and a dozen services running in Docker.",
    context:
      "A Hetzner CPX32 VPS (4 AMD vCPUs, 8 GB RAM, 160 GB SSD, Ubuntu 24.04) hosting all my projects under adambellanger.pro: dashboards, automations, APIs and web apps, each on its own HTTPS subdomain.",
    role:
      "Solo system and network administration: installation, hardening, DNS and certificates, service deployment, monitoring and maintenance. The whole setup is documented in a dedicated repository.",
    challenges:
      "Running a dozen services behind a single entry point (Nginx Proxy Manager, wildcard DNS, SSL per subdomain) while exposing only what is strictly necessary. Several real incidents, all documented: an out-of-memory crash on first boot that forced a full rebuild from the Hetzner console (fixed by adding swap); a VNC console with a QWERTZ keyboard layout that made some commands impossible to type; a VPN rerouting all traffic and killing the SSH session (port 22 whitelisting, OpenVPN --route-nopull, proxychains and Cloudflare Warp all tested); a port 80/443 conflict between the system Nginx and Nginx Proxy Manager.",
    result:
      "A stable platform underpinning all my projects: Prometheus/Grafana monitoring, uptime tracked by Uptime Kuma, Ntfy notifications, automatic container updates with Watchtower, and Node services managed by PM2.",
    highlights: [
      "Grafana, Prometheus, Uptime Kuma, n8n, Portainer, IT-Tools, Ntfy, PostgreSQL",
      "Reverse proxy + per-subdomain SSL with Nginx Proxy Manager",
      "Hardened access: SSH keys, WireGuard, Fail2Ban",
      "Scripted, documented setup that can be reproduced",
    ],
  },
  floatsniper: {
    pitch:
      "SaaS that monitors CS2 skin marketplaces in real time, spots listings below market price and sends instant alerts.",
    context:
      "The same CS2 skin can sell at very different prices from one marketplace to the next. The idea: aggregate CSFloat, Skinport, DMarket, Waxpeer, Steam Market, SkinBaron and BitSkins to catch good deals before anyone else.",
    role:
      "Full design and development: multi-source scanning, price history, Steam-linked portfolio, alerts, subscriptions and an admin dashboard.",
    challenges:
      "Staying within API limits (CSFloat key rotation, a 20-minute global cache shared between users, scan intervals by plan) and securing an application that handles accounts and payments: CSRF, TOTP 2FA, Google and Steam OAuth, prepared statements, Stripe webhook signature checks, per-action rate limiting.",
    result:
      "A complete platform with 3 deal-detection tiers, 7 to 180-day price history charts, Steam inventory sync, alerts (in-app, browser, email, Discord) and Free/Pro/Premium plans.",
    highlights: [
      "7 marketplaces scanned, -10% / -20% / -30% deal detection",
      "Auth: bcrypt, Google OAuth, Steam OpenID, TOTP 2FA",
      "Stripe payments with signed webhooks",
      "Autocomplete over 1,700+ cached skins",
    ],
  },
  "lab-telephonie-pme": {
    title: "SMB telephony — 40 phones",
    pitch:
      "A complete telephony migration lab: Alcatel-Lucent OXO Connect IP-PBX, carrier SIP trunk, voice VLAN and 40 IP phones.",
    context:
      "Scenario: a 40-employee company on two floors, with an ageing PBX at end of life and ISDN lines set to disappear as France shuts down its copper network. Goal: move to IP telephony without changing numbers, with a reception desk, departments reachable directly and no visible outage for callers.",
    role:
      "Lab project: sizing, numbering plan, voice network design and cutover procedure, documented as for a real commissioning. It is the kind of installation I work on as an apprentice; this file formalises it end to end.",
    challenges:
      "Sizing the OXO Connect (chassis, boards, IP licences and a SIP trunk for 8 simultaneous calls); isolating voice in a dedicated VLAN pushed automatically to the phones via LLDP-MED; protecting call quality with DSCP EF marking on RTP and CS3 on signalling, honoured end to end; disabling the firewall's SIP ALG, a classic cause of one-way audio; and planning an out-of-hours cutover with number porting and a rollback plan.",
    result:
      "A full commissioning file: architecture diagram, numbering plan, voice addressing, OXO configuration (auto attendant, hunt groups, day/night schedules, voicemail) and cutover procedure. Ready to reuse as the basis for a real installation.",
    highlights: [
      "40 PoE+ IP phones, voice VLAN assigned automatically (LLDP-MED)",
      "8-channel SIP trunk, direct numbers kept through porting",
      "Reception: greeting, 3-option auto attendant, overflow to a hunt group",
      "Out-of-hours cutover with a documented rollback",
    ],
    table: {
      title: "Numbering plan",
      columns: ["Number", "Assignment", "Behaviour"],
      rows: [
        ["Main line", "Main direct number", "Greeting, then auto attendant: 1 Sales · 2 Support · 3 Accounts"],
        ["201 – 222", "First-floor phones (22)", "Individual direct number per phone"],
        ["301 – 318", "Second-floor phones (18)", "Individual direct number per phone"],
        ["500", "Reception hunt group", "Rings all phones, overflows to 510 after 20 s"],
        ["510", "Sales hunt group", "Round robin, voicemail after 30 s"],
        ["0", "Outside line", "Out through the SIP trunk"],
      ],
    },
  },
  "lab-reseau-pme": {
    title: "Segmented SMB network",
    pitch:
      "A secure business network lab: FortiGate, Huawei switches, five isolated VLANs, IPsec VPN and monitoring.",
    context:
      "Same fictional company: 40 employees, IP telephony, guest Wi-Fi, cameras and travelling sales staff. The starting point is a flat network behind the ISP router: one infected laptop or one curious guest can see every camera and the file server.",
    role:
      "Lab project: addressing plan, VLAN design, filtering policy, device configuration and operations documentation. These are the devices and settings I work with as an apprentice.",
    challenges:
      "Isolating without getting in the way: inter-VLAN routing on the FortiGate with explicit rules (guests only reach the Internet, cameras only talk to the recorder, management is only reachable from its own VLAN); making the core-to-firewall link resilient with LACP; hardening access ports (DHCP snooping, BPDU protection, unused ports shut down); and giving remote staff clean access over IKEv2 IPsec with FortiClient rather than SSL VPN, which Fortinet is phasing out.",
    result:
      "A segmented, documented network: addressing plan, allowed-flows matrix, backed-up configurations and SNMP monitoring of every device in Grafana (throughput, port status, uptime). Every rule has a written reason, which makes operations and support much simpler.",
    highlights: [
      "5 isolated VLANs, inter-VLAN routing filtered by the FortiGate",
      "Core ↔ firewall link in LACP (2 × 1 Gb/s)",
      "Hardened access ports: DHCP snooping, BPDU protection, unused ports shut",
      "IKEv2 IPsec VPN for remote staff, SNMP monitoring in Grafana",
    ],
    table: {
      title: "Addressing plan",
      columns: ["VLAN", "Name", "Network", "Allowed access"],
      rows: [
        ["10", "Data", "10.10.10.0/24", "Internet, file server, printers"],
        ["20", "Voice", "10.10.20.0/24", "IP-PBX and carrier SIP trunk only"],
        ["30", "Guests", "10.10.30.0/24", "Internet only, Wi-Fi client isolation"],
        ["40", "Video", "10.10.40.0/24", "Recorder (NVR) only, no Internet"],
        ["99", "Admin", "10.10.99.0/24", "Device management interfaces"],
      ],
    },
  },
  openwhisper: {
    pitch:
      "Audio transcription web app powered by Whisper, fully containerised and self-hosted.",
    context:
      "Transcribing audio files without sending them to a third party: a simple interface to drop a file, pick the language and model, and get the text back.",
    role:
      "End-to-end architecture and development, through to deployment on my server behind Nginx Proxy Manager.",
    challenges:
      "Splitting the app into three services (nginx frontend, Express gateway, Flask API + Whisper + ffmpeg) and exposing only the frontend: the backend and the transcription engine are never reachable from outside. The model is baked into the image at build time to remove cold starts.",
    result:
      "An app deployed with a single command (docker compose up), with model choice (small, medium, large), automatic language detection, progress tracking and a local history of recent transcriptions.",
    highlights: [
      "3 isolated services, only one exposed",
      "Whisper model baked into the image, no cold start",
      "WAV, MP3, M4A, OGG and FLAC support",
    ],
    screenshotAlts: [
      "OpenWhisper home page: file upload, language and model selection",
      "OpenWhisper language picker open",
      "OpenWhisper on mobile",
    ],
  },
  polytrack: {
    pitch:
      "Bot tracking Polymarket's top traders, with a web dashboard and real-time Discord alerts.",
    context:
      "On Polymarket, a handful of traders show gains of several million dollars. PolyTrack watches their wallets, records every trade and makes them searchable in a dashboard, with a Discord alert for each new position.",
    role:
      "Full design and development: monitoring bot, API, database, dashboard and deployment on my server.",
    challenges:
      "Polymarket blocks automated trading from Europe: I tested several network setups (OpenVPN, SOCKS5 proxy, proxychains, Cloudflare Warp) before concluding that automatic execution requires a US-hosted server. On the data side: a missing UNIQUE constraint on the transaction hash that broke upserts, wrongly typed UUIDs, and a CORS error when the domain changed.",
    result:
      "A live service: the bot runs continuously under PM2, trades are stored in PostgreSQL, and the dashboard is served on its own HTTPS subdomain.",
    highlights: [
      "Continuous monitoring of top traders' wallets",
      "Discord alert for every new trade",
      "Bot + API under PM2, frontend in a Docker container",
    ],
    screenshotAlts: ["PolyTrack sign-in page", "PolyTrack on mobile"],
  },
  docsdesk: {
    pitch:
      "Desktop app that converts any document to PDF and files it in the customer record of the Bob! Desk maintenance software.",
    context:
      "The natural follow-up to TéléDesk at Socacom: technicians have to attach documents (Word, Excel, photos, PDFs) to customer records in Bob! Desk, one at a time and in the right format.",
    role: "Solo design and development, on the same technical foundation and design as TéléDesk.",
    challenges:
      "Converting mixed formats to PDF without a heavy install (LibreOffice driven from the command line with an isolated profile, Pillow for images), keeping credentials out of the Git repository in the user folder, and tracking upload progress in real time.",
    result:
      "A standalone Windows .exe: drop the files, pick the customer, and everything is converted then uploaded, with a test mode that simulates the upload without writing anything.",
    highlights: [
      "Drag and drop: .docx, .xlsx, .pdf, images",
      "PDF conversion with LibreOffice and Pillow",
      "Dry-run mode and live log",
    ],
  },
  "album-photo": {
    title: "Photo album",
    pitch:
      "Private photo album with an animated full-scroll public view and a free-form visual editor to lay out each page by hand.",
    context:
      "A digital album for two, designed as an object: every page is composed freely, with photos and text placed anywhere, no imposed grid.",
    role:
      "Full design and development: public view, admin editor, database, tests and deployment.",
    challenges:
      "Building a free-form editor (drag and drop, resize, rotation, font choice) and a scroll view that stays faithful on desktop and in portrait. The Playwright end-to-end tests taught two rules: measure the rendered result rather than the document, and look at the pixels when appearance is at stake.",
    result:
      "An application with token-protected access, multiple albums, Drizzle migrations and a test suite that drives a real browser.",
    highlights: [
      "Free-form visual editor: drag and drop, resize, rotation",
      "Playwright E2E tests on the real rendering",
      "PostgreSQL + Drizzle ORM",
    ],
  },
  qrcode: {
    pitch:
      "Upload an image and get a QR code pointing to a public URL that serves it.",
    context:
      "Sharing an image through a simple QR code without a third-party service: the image is stored on my server and served directly.",
    role: "Full-stack development and containerisation.",
    challenges:
      "Handling uploads of up to 100 MB behind a reverse proxy (size limits on the nginx/Caddy side), honouring X-Forwarded-* headers and exposing a health check endpoint for Docker.",
    result:
      "A single-container app (compiled React front end served by Express), images persisted on a volume, running in production on its own domain, qrdrop.online.",
    highlights: ["TypeScript front end + API", "One container, one volume", "Built-in health check"],
    screenshotAlts: [
      "QR Drop: QR code generated for a URL, with download and A4 print",
      "QR Drop: uploading a file to share",
      "QR Drop on mobile",
    ],
  },
  "studio-landing-pages": {
    pitch:
      "Drag-and-drop landing page builder with real-time customisation and one-click publishing. Work in progress.",
    context:
      "Letting anyone build a professional landing page without writing code: assemble components, adjust styles and content, then publish.",
    role: "Full-stack design and development: React builder, PHP REST API and MySQL database.",
    challenges:
      "Designing a drag-and-drop builder whose state stays consistent (Zustand), a responsive preview that stays faithful on desktop, tablet and mobile, and a PHP REST API for authentication and saving pages.",
    result:
      "Work in progress: the builder and user management are in place; predefined templates, HTML/CSS export and visit analytics are planned.",
    highlights: ["Drag-and-drop builder", "Zustand state management", "GSAP animations"],
  },
  "big-five": {
    pitch:
      "Bilingual Big Five (OCEAN) personality test with a futuristic interface and animated results, with zero dependencies.",
    context:
      "A complete 60-question personality test covering the five major dimensions (openness, conscientiousness, extraversion, agreeableness, neuroticism), usable straight in the browser.",
    role: "Front-end design and development.",
    challenges:
      "Doing everything in vanilla JavaScript: quiz logic, scoring, on-the-fly French/English switching, and a responsive glassmorphism interface without any framework.",
    result:
      "A 100% in-browser, bilingual app with animated progress bars and tailored descriptions for each trait.",
    highlights: ["60 questions, 5 dimensions", "Switch FR / EN at any time", "Zero dependencies"],
  },
  "portfolio-v1": {
    pitch:
      "My first portfolio, started in my first year of BTS SIO: an interactive Three.js 3D scene in the background.",
    context:
      "The first version of my portfolio, built and extended throughout my first year of BTS SIO, before the current redesign.",
    role: "Solo design and development.",
    challenges:
      "Integrating a Three.js background scene without a framework or bundler (import map via CDN), with a splash screen, an animated pill navigation, project modals and glassmorphism effects.",
    result:
      "A complete, responsive one-page site. Above all, it taught me what I wanted to change: the current site starts from scratch, faster and easier to read.",
    highlights: ["Three.js 3D scene", "Vanilla JavaScript", "The ancestor of this site"],
  },
  "mancity-univers": {
    pitch:
      "PHP app for managing a football club: players, matches and statistics, with three distinct roles.",
    context:
      "Project for the back-end web development module of the BTS SIO, built in a pair with Wassim El Goz around Manchester City.",
    role: "Co-development: data model, authentication and roles, CRUD and dashboards.",
    challenges:
      "Three very different views over the same data: staff manage players, matches and stats, players only see their own performance, supporters follow the season. Real-time search, filters and pagination on the lists.",
    result:
      "A complete application with Chart.js dashboards, photo upload, dark/light mode and a fan area, with every bonus feature of the brief implemented.",
    highlights: ["3 roles: Staff / Player / Supporter", "Full CRUD + per-match stats", "Pair project"],
  },
};
