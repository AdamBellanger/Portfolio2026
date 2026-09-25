import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { CvButton } from "@/components/ui/CvButton";
import { LocalTime } from "@/components/ui/LocalTime";
import { ServerStatus } from "@/components/ui/ServerStatus";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — Adam Bellanger",
};

const label = "font-mono text-[11px] uppercase tracking-widest text-muted";

export default function ContactPage() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-x-20 px-6 pb-32 pt-40 sm:px-10 sm:pt-48 lg:grid-cols-[1fr_19rem]">
      <div>
        <SplitText
          text="Travaillons ensemble"
          className="max-w-3xl font-display text-6xl leading-[0.95] sm:text-8xl"
        />
        <Reveal delay={0.45}>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Une alternance, un stage, un projet web ou une question d&apos;infra ?
            Remplissez le formulaire ou écrivez-moi directement.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.5} className="mt-10 hidden items-end lg:mt-0 lg:flex">
        <span aria-hidden="true" className="font-display text-3xl text-accent">
          ↘
        </span>
      </Reveal>

      <Reveal delay={0.6} className="mt-16 sm:mt-24">
        <ContactForm />
      </Reveal>

      <Reveal delay={0.7} className="mt-16 sm:mt-24">
        <aside className="flex flex-col gap-10 lg:sticky lg:top-28">
          <div>
            <p className={label}>Écrire directement</p>
            <CopyEmail email={site.email} />
          </div>

          <div>
            <p className={label}>Réseaux</p>
            <ul className="mt-3 flex flex-col border-b border-foreground/10">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-t border-foreground/10 py-3 transition-colors hover:text-accent"
                  >
                    {social.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-10">
            <div>
              <p className={label}>Localisation</p>
              <p className="mt-3">{site.location}</p>
            </div>
            <div>
              <p className={label}>Heure locale</p>
              <p className="mt-3">
                <LocalTime />
              </p>
            </div>
          </div>

          <ServerStatus title="Statut de l'infra" titleClassName={label} />

          <div>
            <p className={label}>Disponibilité</p>
            <p className="mt-3 text-foreground/80">
              En alternance BTS SIO. Ouvert aux projets web, infra et aux
              opportunités après le diplôme.
            </p>
          </div>

          <CvButton />
        </aside>
      </Reveal>
    </section>
  );
}
