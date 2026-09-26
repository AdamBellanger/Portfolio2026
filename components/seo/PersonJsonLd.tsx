import { getDictionary } from "@/content/i18n/ui";
import { site } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";

/**
 * Person structured data (schema.org), so Google can attribute the site to
 * Adam rather than treating it as anonymous content. type="application/ld+json"
 * is inert (never executed), so it needs no CSP nonce.
 */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: `${site.url}${href(locale, "home")}`,
    image: `${site.url}/images/avatar.webp`,
    jobTitle: t.meta.ogTagline,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressCountry: "FR" },
    worksFor: { "@type": "Organization", name: "Socacom" },
    sameAs: site.socials.map((social) => social.href),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
