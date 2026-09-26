// Single source for contact details and socials, used by the nav drawer,
// the footer and the contact page. Translatable text lives in content/i18n/ui.ts.
export const site = {
  name: "Adam Bellanger",
  url: "https://adambellanger.pro",
  email: "compteproadam.bellanger@gmail.com",
  location: "France",
  // Public Uptime Kuma status page. Leave statusSlug null until a status page
  // exists (Uptime Kuma → Status Pages → New); the footer indicator stays hidden.
  uptimeUrl: "https://uptime.adambellanger.pro",
  statusSlug: null as string | null,
  socials: [
    { label: "GitHub", href: "https://github.com/AdamBellanger" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adam-bellanger-652919386/" },
  ],
};
