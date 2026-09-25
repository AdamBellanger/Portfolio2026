# Portfolio — Adam Bellanger

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.
Direction et contraintes du projet : voir `CLAUDE.md` et `DESIGN-REFERENCE.md`.

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
```

## Contenu

| Quoi | Où |
|---|---|
| Email, socials, localisation, statut Uptime Kuma | `content/site.ts` |
| Projets (études de cas) | `content/projects.ts` — `featured: true` = affiché sur l'accueil |
| Compétences | `content/skills.ts` |
| CV | déposer `public/cv/CV-Adam-Bellanger.pdf` → le bouton apparaît au prochain build |

## Déploiement (Hetzner + Nginx Proxy Manager)

Le site tourne dans un conteneur Next.js `standalone`, sur le réseau Docker
`services_default` partagé avec Nginx Proxy Manager (aucun port publié).

```bash
# sur le serveur
git clone https://github.com/AdamBellanger/Portfolio2026.git portfolio
cd portfolio
cp .env.example .env          # renseigner CONTACT_WEBHOOK_URL (webhook n8n)
docker compose up -d --build
```

Puis dans Nginx Proxy Manager → **Proxy Hosts → Add Proxy Host** :

- Domain Names : `adambellanger.pro`, `www.adambellanger.pro`
- Scheme `http` · Forward Hostname `portfolio` · Forward Port `3000`
- Cocher *Block Common Exploits* et *Websockets Support*
- Onglet SSL : certificat Let's Encrypt, *Force SSL*, *HTTP/2*

Mise à jour (pull, rebuild, redémarrage, nettoyage des anciennes images, vérification du healthcheck) :

```bash
./deploy.sh
```

### SSL

Dans Nginx Proxy Manager, le certificat Let's Encrypt doit couvrir
`adambellanger.pro` **et** `www.adambellanger.pro`, avec le renouvellement
automatique actif (SSL Certificates → vérifier la date d'expiration).

### Formulaire de contact

`POST /api/contact` relaie le message en JSON (`name`, `email`, `company`,
`subject`, `message`, `sentAt`) vers `CONTACT_WEBHOOK_URL`. Côté n8n : un nœud
**Webhook** (POST) suivi d'un envoi d'email ou d'une notification Ntfy.
Sans webhook configuré, le formulaire ouvre le client mail du visiteur.

### Statut de l'infra (footer)

Créer une page de statut publique dans Uptime Kuma (**Status Pages → New**),
puis renseigner son slug dans `content/site.ts` (`statusSlug`). L'indicateur
« Services en ligne » apparaît alors dans le footer.
