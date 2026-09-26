import type { Locale } from "@/lib/i18n";
import type { ProjectKind } from "@/content/projects";

// Interface strings for both languages. Long-form content (projects, diagrams,
// about page) lives in its own files; this is everything around it.

const fr = {
  meta: {
    siteTitle: "Adam Bellanger — Systèmes, réseaux & développement",
    description:
      "Portfolio d'Adam Bellanger : alternant administrateur systèmes & réseaux (BTS SIO SISR) et développeur full-stack. Téléphonie d'entreprise, infra réseau, React / Next.js et auto-hébergement.",
    ogLocale: "fr_FR",
    ogTagline: "Systèmes & réseaux · Développement full-stack",
    projects: "Projets",
    about: "À propos",
    contact: "Contact",
    notFound: "Page introuvable",
    caseStudy: "Étude de cas",
  },
  nav: {
    home: "Accueil",
    projects: "Projets",
    about: "À propos",
    contact: "Contact",
    main: "Navigation principale",
    heading: "Navigation",
    socials: "Socials",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
  },
  hero: {
    role: ["Développeur", "full-stack & réseau"],
    based: ["Basé", "en France"],
    portraitAlt: "Portrait d'Adam Bellanger",
  },
  home: {
    manifesto:
      "Connecter le réseau et le code. Construire ce que la plupart des développeurs ne comprennent pas, et faire tourner ce que la plupart des techniciens ne codent pas.",
    manifestoAside:
      "Ce croisement entre infrastructure réseau/télécom et développement full-stack me place à un endroit rare : je conçois autant que je maintiens ce qui tourne derrière.",
    recent: "Projets récents",
    allProjects: "Tous les projets",
  },
  skills: { title: "Stack & compétences" },
  projects: {
    title: "Projets",
    filterLabel: "Filtrer les projets",
    all: "Tous",
    live: "En ligne",
    view: "Voir",
    kinds: { Pro: "Pro", Perso: "Perso", Lab: "Lab", École: "École" } as Record<ProjectKind, string>,
  },
  caseStudy: {
    back: "← Projets",
    visit: "Voir le site ↗",
    code: "Voir le code sur GitHub ↗",
    preview: "Aperçu",
    stack: "Stack",
    context: "Contexte",
    role: "Rôle",
    architecture: "Architecture",
    challenges: "Défis",
    result: "Résultat",
    highlights: "Points clés",
    next: "Projet suivant",
    nextCursor: "Suivant",
    labNotice:
      "Maquette conçue et documentée de bout en bout, sur le modèle des installations que je réalise en alternance. Ce n'est pas une intervention client.",
    categories: {
      Langages: "Langages",
      "Front-end": "Front-end",
      "Back-end": "Back-end",
      Données: "Données",
      Téléphonie: "Téléphonie",
      Réseau: "Réseau",
      Infra: "Infra",
      "Outils & API": "Outils & API",
    } as Record<string, string>,
    /** Stack items whose name changes with the language (display only). */
    techNames: {} as Record<string, string>,
  },
  footer: {
    cta: "Travaillons ensemble",
    contact: "Me contacter",
    version: "Version",
    edition: "Édition 2026",
    localTime: "Heure locale",
    visits: "Visites",
    infra: "Infra",
    socials: "Socials",
    language: "Langue",
  },
  status: { up: "Services en ligne", degraded: "Incident en cours" },
  contact: {
    title: "Travaillons ensemble",
    intro:
      "Une alternance, un stage, un projet web ou une question d'infra ? Remplissez le formulaire ou écrivez-moi directement.",
    writeDirectly: "Écrire directement",
    socials: "Réseaux",
    location: "Localisation",
    localTime: "Heure locale",
    infraStatus: "Statut de l'infra",
    availability: "Disponibilité",
    availabilityText:
      "Fin de BTS SIO en septembre 2027, avec l'objectif d'une licence puis d'un master en cybersécurité (bac+5). D'ici là, ouvert aux stages, à l'alternance et aux projets web ou infra.",
    copy: "Copier l'adresse",
    copied: "Copié ✓",
  },
  form: {
    fields: {
      name: { label: "Quel est votre nom ?", placeholder: "Jean Dupont *" },
      email: { label: "Votre adresse e-mail ?", placeholder: "jean@dupont.fr *" },
      company: {
        label: "Votre entreprise ou organisation ?",
        placeholder: "Entreprise, école, association…",
      },
    },
    topicsLabel: "Qu'est-ce qui vous amène ?",
    topics: ["Alternance", "Stage", "Emploi", "Projet web", "Infra / réseau", "Autre"],
    message: "Votre message",
    messagePlaceholder: "Bonjour Adam, j'aimerais échanger à propos de… *",
    send: "Envoyer !",
    sending: "Envoi…",
    sent: "Message envoyé, merci ! Je vous réponds vite.",
    error: "L'envoi a échoué. Écrivez-moi directement à",
    mailSubject: "Contact de",
  },
  cv: {
    download: "Télécharger mon CV (PDF)",
    devHint: "[dev] Bouton CV : déposer le PDF dans",
  },
  errors: {
    label: "Erreur",
    home: "Retour à l'accueil",
    projects: "Voir les projets",
    retry: "Réessayer",
    notFoundTitle: "Hôte injoignable.",
    notFoundMessage:
      "Cette page n'existe pas, ou plus. Le lien est peut-être erroné, ou la page a été déplacée.",
    notFoundTerminal: [
      "$ ping adambellanger.pro/cette-page",
      "PING cette-page: 56 data bytes",
      "Request timeout for icmp_seq 0",
      "Request timeout for icmp_seq 1",
      "Request timeout for icmp_seq 2",
      "",
      "--- cette-page ping statistics ---",
      "3 packets transmitted, 0 received, 100% packet loss",
      "",
      "$ cd /  # retour à l'accueil conseillé",
    ],
    serverTitle: "Le serveur a trébuché.",
    serverMessage:
      "Une erreur inattendue s'est produite de mon côté. Réessayez dans un instant ; si ça persiste, écrivez-moi.",
    serverTerminalLast: "$ docker compose restart portfolio  # je m'en occupe",
  },
  numberLocale: "fr-FR",
};

type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    siteTitle: "Adam Bellanger — Systems, networks & development",
    description:
      "Portfolio of Adam Bellanger: apprentice systems & network administrator (French BTS SIO, SISR track) and full-stack developer. Business telephony, network infrastructure, React / Next.js and self-hosting.",
    ogLocale: "en_GB",
    ogTagline: "Systems & networks · Full-stack development",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    notFound: "Page not found",
    caseStudy: "Case study",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    main: "Main navigation",
    heading: "Navigation",
    socials: "Socials",
    open: "Open menu",
    close: "Close menu",
  },
  hero: {
    role: ["Full-stack", "& network developer"],
    based: ["Based", "in France"],
    portraitAlt: "Portrait of Adam Bellanger",
  },
  home: {
    manifesto:
      "Bridging networks and code. Building what most developers don't understand, and running what most technicians don't code.",
    manifestoAside:
      "Sitting between network/telecom infrastructure and full-stack development puts me in a rare spot: I design what runs behind the scenes as much as I keep it running.",
    recent: "Recent projects",
    allProjects: "All projects",
  },
  skills: { title: "Stack & skills" },
  projects: {
    title: "Projects",
    filterLabel: "Filter projects",
    all: "All",
    live: "Live",
    view: "View",
    kinds: { Pro: "Work", Perso: "Personal", Lab: "Lab", École: "School" },
  },
  caseStudy: {
    back: "← Projects",
    visit: "Visit the site ↗",
    code: "View the code on GitHub ↗",
    preview: "Preview",
    stack: "Stack",
    context: "Context",
    role: "Role",
    architecture: "Architecture",
    challenges: "Challenges",
    result: "Outcome",
    highlights: "Highlights",
    next: "Next project",
    nextCursor: "Next",
    labNotice:
      "A lab: designed and documented end to end, modelled on the installations I work on as an apprentice. Not a client engagement.",
    categories: {
      Langages: "Languages",
      "Front-end": "Front-end",
      "Back-end": "Back-end",
      Données: "Data",
      Téléphonie: "Telephony",
      Réseau: "Networking",
      Infra: "Infra",
      "Outils & API": "Tools & APIs",
    },
    techNames: { "Trunk SIP": "SIP trunk" },
  },
  footer: {
    cta: "Let's work together",
    contact: "Get in touch",
    version: "Version",
    edition: "2026 edition",
    localTime: "Local time",
    visits: "Visits",
    infra: "Infra",
    socials: "Socials",
    language: "Language",
  },
  status: { up: "All systems up", degraded: "Ongoing incident" },
  contact: {
    title: "Let's work together",
    intro:
      "An apprenticeship, an internship, a web project or an infrastructure question? Fill in the form or email me directly.",
    writeDirectly: "Email me",
    socials: "Socials",
    location: "Location",
    localTime: "Local time",
    infraStatus: "Infra status",
    availability: "Availability",
    availabilityText:
      "Finishing my BTS SIO (network & systems diploma) in September 2027, then aiming for a Bachelor's and a Master's in cybersecurity. Open to internships, apprenticeships and web or infrastructure projects until then.",
    copy: "Copy address",
    copied: "Copied ✓",
  },
  form: {
    fields: {
      name: { label: "What's your name?", placeholder: "Jane Smith *" },
      email: { label: "Your email address?", placeholder: "jane@smith.com *" },
      company: {
        label: "Your company or organisation?",
        placeholder: "Company, school, non-profit…",
      },
    },
    topicsLabel: "What brings you here?",
    topics: ["Apprenticeship", "Internship", "Job", "Web project", "Infra / network", "Other"],
    message: "Your message",
    messagePlaceholder: "Hi Adam, I'd like to talk about… *",
    send: "Send!",
    sending: "Sending…",
    sent: "Message sent, thank you! I'll get back to you soon.",
    error: "Sending failed. Email me directly at",
    mailSubject: "Contact from",
  },
  cv: {
    download: "Download my résumé (PDF)",
    devHint: "[dev] Résumé button: drop the PDF in",
  },
  errors: {
    label: "Error",
    home: "Back to home",
    projects: "See the projects",
    retry: "Try again",
    notFoundTitle: "Host unreachable.",
    notFoundMessage:
      "This page doesn't exist, or no longer does. The link may be wrong, or the page has moved.",
    notFoundTerminal: [
      "$ ping adambellanger.pro/this-page",
      "PING this-page: 56 data bytes",
      "Request timeout for icmp_seq 0",
      "Request timeout for icmp_seq 1",
      "Request timeout for icmp_seq 2",
      "",
      "--- this-page ping statistics ---",
      "3 packets transmitted, 0 received, 100% packet loss",
      "",
      "$ cd /en  # heading home is recommended",
    ],
    serverTitle: "The server tripped.",
    serverMessage:
      "Something unexpected went wrong on my side. Try again in a moment; if it keeps happening, email me.",
    serverTerminalLast: "$ docker compose restart portfolio  # I'm on it",
  },
  numberLocale: "en-GB",
};

export const dictionaries: Record<Locale, Dictionary> = { fr, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
