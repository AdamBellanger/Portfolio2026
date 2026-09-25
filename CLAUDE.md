# CLAUDE.md — Portfolio Adam Bellanger (refonte from scratch)

> Ce fichier est lu automatiquement par Claude Code à chaque session sur ce repo.
> Aucune reprise de l'ancienne version ("spatial-hub", WebGL/React Three Fiber) : nouveau repo, nouvelle stack, nouvelle direction artistique.

## 🎯 Contexte

Adam Bellanger :
- Apprenti BTS SIO (option SISR) à l'IRIS Rouen
- Apprenti technicien chez Socacom (Saint-Martin-du-Vivier) : téléphonie d'entreprise (Alcatel OXO Connect, Centrex UnyCX, SIP/VoIP, trunks SIP), infra réseau (switches Huawei, firewalls FortiGate, VLAN), support SAV client
- Développeur full-stack en parallèle : React, TypeScript, Next.js, Node.js, PHP/MySQL, Tailwind, Docker
- Auto-héberge sa propre infra : serveur Hetzner CPX32, stack Docker complète (Grafana, Prometheus, n8n, Portainer, Nginx Proxy Manager, WireGuard, Fail2Ban...), domaine `adambellanger.pro` déjà en SSL

**Positionnement du site** : ne pas vendre "un dev de plus". Le profil hybride réseau/télécom + dev est rare et c'est l'angle différenciant. Le portfolio doit assumer les deux facettes, pas les cacher derrière une esthétique purement "creative dev".

## 🎨 Direction artistique — inspirée de Dennis Snellenberg, pas clonée

Ce qu'on reprend de son approche (la structure et les interactions, pas son identité visuelle) :
- Minimalisme radical : beaucoup d'espace, une seule grosse typographie qui porte le design
- **Photo d'Adam intégrée au hero, centrée dans le viewport**, comme chez Snellenberg : le portrait fait partie de la composition typographique (texte qui passe devant/derrière, ou encadre la photo), pas une simple photo de profil à côté du texte. Traitement cohérent avec la palette choisie (noir & blanc, duotone, ou légère teinte de l'accent — à trancher avec la direction artistique)
- Interaction curseur sur le nom/hero en page d'accueil — élément signature, à réinterpréter avec une touche perso
- Navigation fullscreen en overlay plutôt qu'un header classique
- Transitions de page fluides (pas de rechargement brutal, entrée/sortie animées)
- Études de cas structurées projet par projet plutôt qu'une simple grille statique

Ce qu'on évite délibérément :
- Sa palette exacte et sa typo, quelle que soit la version (noir/brun/blanc selon sa fiche Awwwards officielle, noir/jaune selon une collection "hommage" trouvée ailleurs — dans les deux cas, ne pas reprendre à l'identique) : sinon c'est un clone visible, et un recruteur qui connaît Awwwards le repère en 5 secondes
- Le WebGL/Three.js : c'est justement ce qu'on quitte, pour un site plus rapide à livrer et à maintenir. Confirmé cohérent avec l'original : sa fiche Awwwards liste les tags Minimal/Clean/Transitions/CSS3/HTML5, pas de WebGL ni de framework 3D — la version primée est du CSS/JS bien exécuté, pas une prouesse technique lourde

À définir avant de coder : une couleur d'accent propre à Adam + noir/blanc/gris, une typo display forte + une typo texte sobre. Pistes gratuites : Fontshare (General Sans, Cabinet Grotesk, Clash Display) en display, Inter ou Geist en texte courant.

## 🛠️ Stack technique

- **Next.js 15 (App Router) + TypeScript** — déjà maîtrisé, SSG natif pour bien référencer les études de cas
- **Tailwind CSS v4**
- **Framer Motion** pour les micro-interactions et transitions de page (API React-friendly, suffisante à ce niveau d'effet — pas besoin de GSAP)
- **Lenis** pour le smooth scroll
- **next/font** pour auto-héberger les polices (pas de FOUT, pas de requête externe)
- Contenu des projets en MDX ou JSON typé — pas de CMS pour une v1 solo, inutile

## 🌐 Hébergement

**Décidé** : dev en local (`localhost:3000`, hot reload Next.js classique), puis containerisation Docker et déploiement sur ton Hetzner existant (Nginx Proxy Manager + SSL déjà en place, domaine `adambellanger.pro`). Pas de Vercel.

- Dockerfile Next.js en mode `standalone` (build multi-stage, image finale légère)
- `docker-compose` cohérent avec le reste de ta stack (mêmes conventions que tes autres containers)
- Reverse proxy via NPM, comme pour tes autres services

⚠️ À vérifier de ton côté : si le conteneur "anvil" que tu es en train de déployer est justement prévu pour ce site, dis-le à Claude Code dès le début de session — ça change l'ordre des étapes (on saute direct au Dockerfile).

## 🗺️ Architecture du site

- `/` — hero (photo d'Adam centrée + nom/rôle en typo, interaction curseur), intro courte, aperçu des projets phares, CTA contact
- `/projets` — liste de toutes les études de cas
- `/projets/[slug]` — étude de cas détaillée
- `/a-propos` — le parcours hybride réseau/télécom + dev (BTS SIO, Socacom, auto-formation, homelab)
- Contact — section ou page dédiée (email, LinkedIn, GitHub, CV téléchargeable en option)

## 📁 Études de cas à préparer

1. **DROP_SIM** — jeu d'ouverture de caisses façon CS2, refactorisé en Next.js 15 + SQLite
2. **Infra Hetzner / homelab** — pas un projet "classique" mais une vraie étude de cas devops : serveur CPX32 auto-géré, stack Docker complète, gestion d'un incident réel (blocage réseau côté Hetzner, diagnostic et résolution). Angle parfait pour démontrer le volet SISR à des recruteurs techniques.
3. *(optionnel)* polytrack.cloud et le bot de copy-trading Polymarket, si tu veux aussi montrer un côté produit/business

Pour chaque étude de cas : contexte/problème → rôle → stack → défis rencontrés → résultat, avec liens repo/démo si publics.

## ⚙️ Contraintes non négociables

- `prefers-reduced-motion` respecté partout (désactive les animations curseur/scroll si demandé par l'utilisateur)
- Mobile pensé dès le départ, pas en rattrapage : pas d'effet curseur sur tactile, nav fullscreen adaptée au tap
- Lighthouse : objectif 90+ en perf/a11y/SEO
- Nav fullscreen accessible au clavier (focus trap, échap pour fermer)
- Pas de dépendance lourde superflue
- Photo hero optimisée via `next/image` (formats modernes, tailles responsive) ; prévoir un recadrage mobile dédié, pas juste un `object-fit` par défaut sur l'image desktop

## 🚧 Plan d'exécution

1. Scaffolding : `create-next-app`, config Tailwind, ESLint/Prettier, structure de dossiers (`app/`, `components/`, `content/`)
2. Design tokens (couleurs, typo, espacements) dans la config Tailwind — à valider avant d'aller plus loin
3. Layout de base + navigation fullscreen (structure/interaction, sans contenu final)
4. Page d'accueil : hero + interaction curseur sur le nom
5. Template d'étude de cas générique + première étude de cas réelle (DROP_SIM) pour valider le pattern
6. Génération des autres études de cas à partir du template validé
7. Page à propos + contact
8. Passes perf / a11y / responsive
9. Dockerfile (mode `standalone`) + déploiement sur Hetzner via NPM

## 🚀 Premier prompt à donner à Claude Code

Une fois ce fichier à la racine du nouveau repo, ouvre Claude Code et lance :

> Lis CLAUDE.md en entier. Avant d'écrire une seule ligne de code, propose-moi : 1) l'arborescence de dossiers, 2) 3 pistes de direction artistique (couleur d'accent + paire de typo) cohérentes avec le brief, 3) le détail technique de l'interaction curseur sur le hero (comment tu comptes l'implémenter avec Framer Motion). On valide ensemble avant que tu scaffold le projet.
