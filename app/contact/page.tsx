import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact — Adam Bellanger",
};

const LINKS = [
  { label: "Email", href: "mailto:contact@adambellanger.pro" },
  { label: "GitHub", href: "https://github.com/AdamBellanger" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-32 sm:px-10">
      <Reveal>
        <h1 className="font-display text-5xl sm:text-6xl">Contact</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <ul className="flex flex-col gap-3">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-display text-2xl text-foreground transition-colors hover:text-accent"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
