import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { site } from "@/content/site";
import avatar from "@/public/images/avatar.webp";

export const metadata: Metadata = {
  title: "Contact — Adam Bellanger",
};

const label = "font-mono text-[11px] uppercase tracking-widest text-muted";

export default function ContactPage() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-x-20 px-6 pb-32 pt-40 sm:px-10 sm:pt-48 lg:grid-cols-[1fr_16rem]">
      <SplitText
        text="Travaillons ensemble"
        className="max-w-3xl font-display text-6xl leading-[0.95] sm:text-8xl"
      />

      <Reveal delay={0.5} className="mt-10 flex items-end justify-between lg:mt-0 lg:flex-col lg:items-start lg:justify-end lg:gap-16">
        <Image
          src={avatar}
          alt="Adam Bellanger"
          sizes="128px"
          priority
          className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
        />
        <span aria-hidden="true" className="font-display text-3xl text-accent">
          ↘
        </span>
      </Reveal>

      <Reveal delay={0.6} className="mt-16 sm:mt-24">
        <ContactForm />
      </Reveal>

      <Reveal delay={0.7} className="mt-16 flex flex-col gap-10 sm:mt-24">
        <div>
          <p className={label}>Coordonnées</p>
          <a href={`mailto:${site.email}`} className="mt-3 block break-all transition-colors hover:text-accent">
            {site.email}
          </a>
        </div>
        <div>
          <p className={label}>Localisation</p>
          <p className="mt-3">{site.location}</p>
        </div>
        <div>
          <p className={label}>Socials</p>
          <ul className="mt-3 flex flex-col gap-1">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={label}>Disponibilité</p>
          <p className="mt-3 text-foreground/80">
            En alternance BTS SIO. Ouvert aux projets web, infra et aux opportunités après le diplôme.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
