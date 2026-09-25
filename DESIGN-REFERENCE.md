# DESIGN-REFERENCE.md — Comment donner à Claude Code une vraie référence visuelle

> À lire par Claude Code en complément de `CLAUDE.md`, une fois les images placées dans `/reference/`.

## Pourquoi ce fichier existe

Claude Code ne peut pas ouvrir `dennissnellenberg.nl` lui-même (pas d'accès web live dans la plupart des configs), et je n'ai pas pu en extraire le DOM/CSS (le site bloque le scraping automatisé). Résultat : sans image réelle sous les yeux, Claude Code invente une interprétation à partir de descriptions textuelles — ce qui explique l'écart que tu vois. La correction ne passe pas par un meilleur prompt, mais par de vraies captures.

## Ce qu'il te faut capturer (toi, manuellement, dans ton navigateur)

Va sur https://www.dennissnellenberg.nl/, et fais des **captures d'écran statiques** :

1. **Hero desktop** — état de repos
2. **Hero desktop, curseur en haut à gauche** puis **curseur en bas à droite** — 2 captures pour que Claude Code déduise le comportement de l'interaction (ce qui bouge, de combien, dans quel sens)
3. **Navigation** : fermée, puis en cours d'ouverture (si tu arrives à la choper à mi-animation), puis complètement ouverte — 2 à 3 captures
4. **Une page étude de cas** ouverte
5. **Transition entre deux pages** — capture prise pendant la transition si possible (sinon, ignore, c'est le plus dur à choper en statique)
6. **Version mobile** — hero + menu ouvert (DevTools en mode responsive, ou ton téléphone)
7. **Footer / section contact**

Si tu peux en plus faire un **enregistrement écran de 10-15 secondes** (Loom, OBS, ou l'enregistreur natif Mac/Windows) montrant : mouvement de souris sur le hero → ouverture du menu → clic sur un projet → transition → fermeture du menu, c'est ce qui aide le plus Claude Code à comprendre le *timing* et les *courbes d'animation*, qu'aucune image statique ne montre.

## Où les mettre

Crée un dossier à la racine du repo :

```
/reference/dennis-snellenberg/
  01-hero-repos.png
  02-hero-curseur-haut-gauche.png
  03-hero-curseur-bas-droite.png
  04-nav-fermee.png
  05-nav-ouverte.png
  06-case-study.png
  07-mobile-hero.png
  08-mobile-nav.png
  demo-interactions.mp4  (optionnel)
```

Ajoute `/reference/` à `.gitignore` si tu ne veux pas commit ces images (elles ne sont pas à toi, uniquement un outil de travail interne).

## Ce qu'on sait avec certitude sur le site original (sourcé, pas inventé)

- Fiche Awwwards officielle : palette noir `#000` / brun-beige `#987654` / blanc `#fff`, tags **Minimal, Clean, Transitions, CSS3, HTML5** — pas de WebGL, pas de framework 3D. C'est du CSS/JS bien exécuté, pas une prouesse technique lourde.
- Designer freelance basé à Rotterdam (UI/UX, web design, branding), ancien juré Awwwards 2019.
- Structure connue par recoupement : nom en hero qui réagit au mouvement de la souris, portrait intégré à la composition, navigation fullscreen en overlay, études de cas en pages dédiées.

Tout le reste (durées d'animation exactes, courbes d'easing, grille en pixels, police précise) doit venir de tes captures — je ne les invente pas pour éviter de te donner de fausses certitudes que Claude Code prendrait pour argent comptant.

## ⚠️ Où s'arrête l'inspiration

Objectif : **s'inspirer du mécanisme d'interaction**, pas reproduire le site à l'identique. Copier le HTML/CSS trouvé dans DevTools mot pour mot serait de la reproduction du travail d'un designer tiers — mauvais professionnellement (un juré Awwwards ou un recruteur qui connaît le site le repère instantanément) et pas défendable si quelqu'un te le fait remarquer. Les captures servent à comprendre *comment* l'interaction fonctionne (quel élément bouge, selon quelle logique), pas à copier ses valeurs de couleur, sa typo ou son texte. La palette et la typo d'Adam restent celles définies dans `CLAUDE.md`.

## Prompt à donner à Claude Code une fois les images en place

> Regarde les images dans `/reference/dennis-snellenberg/` avant de continuer. Pour chaque image, décris-moi ce que tu observes (disposition, proportions, comportement déduit de la comparaison entre les captures curseur-haut-gauche et curseur-bas-droite). Ensuite, propose comment reproduire ce *mécanisme d'interaction* avec Framer Motion, en gardant la palette et la typo déjà définies dans CLAUDE.md — pas celles de la référence. On valide ta lecture des images avant que tu touches au code.
