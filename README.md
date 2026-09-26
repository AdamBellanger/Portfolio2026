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
| Projets (études de cas) | `content/projects.ts` — `featured: true` = affiché sur l'accueil ; version anglaise dans `content/projects.en.ts` |
| Schémas d'architecture | `content/architectures.ts` + `content/architectures.en.ts` |
| Page À propos (parcours, missions) | `content/about.ts` (fr + en) |
| Textes de l'interface (menu, footer, formulaire…) | `content/i18n/ui.ts` (fr + en) |
| Compétences | `content/skills.ts` (fr + en) |
| CV | déposer `public/cv/CV-Adam-Bellanger.pdf` → le bouton apparaît au prochain build |

### Langues

Français à la racine (`/projets`), anglais sous `/en` (`/en/projects`). `proxy.ts`
redirige vers `/en` à la première visite si le navigateur n'est pas en français ;
le choix FR / EN du footer est mémorisé dans le cookie `lang` et passe avant la
détection. Chaque page déclare ses versions (`hreflang`) et le sitemap liste les deux.

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

### Déploiement automatique (GitHub Actions)

À chaque push sur `main`, `.github/workflows/deploy.yml` vérifie que le site
compile (`npm ci`, lint, build) puis se connecte en SSH au serveur pour lancer
`./deploy.sh`. Si le build échoue, rien n'est déployé.

**1. Sur le serveur** (avec l'utilisateur qui lance d'habitude `./deploy.sh`) :

```bash
ssh-keygen -t ed25519 -N "" -C "github-deploy" -f ~/.ssh/github_deploy
# Clé verrouillée : elle ne peut QUE lancer deploy.sh (pas de shell, pas de tunnel)
echo "command=\"/var/www/portfolio/deploy.sh\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty $(cat ~/.ssh/github_deploy.pub)" >> ~/.ssh/authorized_keys
cat ~/.ssh/github_deploy          # clé privée -> secret DEPLOY_SSH_KEY
ssh-keyscan -p 22 adambellanger.pro   # -> secret DEPLOY_KNOWN_HOSTS
```

**2. Sur GitHub** → repo → *Settings → Secrets and variables → Actions* :

| Secret | Valeur |
| --- | --- |
| `DEPLOY_SSH_KEY` | contenu de `~/.ssh/github_deploy` (BEGIN…END inclus) |
| `DEPLOY_KNOWN_HOSTS` | sortie de `ssh-keyscan` |
| `DEPLOY_HOST` | IP du serveur (ou `adambellanger.pro`) |
| `DEPLOY_USER` | utilisateur SSH (celui de l'étape 1) |
| `DEPLOY_PORT` | *(optionnel)* port SSH s'il n'est pas 22 |

**3. Tester** : onglet *Actions* → *Build & deploy* → *Run workflow*. Ensuite,
chaque `git push` déploie tout seul.

Si SSH n'est joignable que via WireGuard, GitHub ne pourra pas s'y connecter :
il faudra alors un autre déclencheur (webhook n8n, par exemple).

Une fois validé : `rm ~/.ssh/github_deploy` sur le serveur (la clé privée
n'est plus utile qu'à GitHub).

### SSL

Dans Nginx Proxy Manager, le certificat Let's Encrypt doit couvrir
`adambellanger.pro` **et** `www.adambellanger.pro`, avec le renouvellement
automatique actif (SSL Certificates → vérifier la date d'expiration).

### Formulaire de contact

`POST /api/contact` relaie le message en JSON (`name`, `email`, `company`,
`subject`, `message`, `sentAt`) vers `CONTACT_WEBHOOK_URL`. Sans webhook
configuré, le formulaire ouvre le client mail du visiteur.

Côté n8n, le workflow prêt à importer (`ops/n8n-contact-workflow.local.json`)
n'est pas versionné : le chemin du webhook fait office de secret.

1. n8n → **Workflows → Import from File** → choisir le fichier.
2. Nœud **Notification Ntfy** : vérifier l'URL du serveur Ntfy et le topic
   (`portfolio-contact`), s'abonner à ce topic dans l'app Ntfy. Si le serveur
   Ntfy exige un token, ajouter un header `Authorization: Bearer <token>`.
3. *(Optionnel)* nœud **Discord** : coller l'URL d'un webhook Discord, puis
   le réactiver (clic droit → Activate).
4. **Activer** le workflow, copier la *Production URL* du nœud Webhook.
5. Sur le serveur, dans `.env` : `CONTACT_WEBHOOK_URL=<production URL>`.
   Si n8n est sur le réseau `services_default`, l'adresse interne
   `http://n8n:5678/webhook/<chemin>` évite de repasser par Internet.
6. `docker compose up -d` pour recharger la variable, puis envoyer un
   message de test depuis /contact.

### Statut de l'infra (footer)

Créer une page de statut publique dans Uptime Kuma (**Status Pages → New**),
puis renseigner son slug dans `content/site.ts` (`statusSlug`). L'indicateur
« Services en ligne » apparaît alors dans le footer.
