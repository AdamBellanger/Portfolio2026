"use client";

import { useState, type FormEvent } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/content/site";

const FIELDS = [
  { name: "name", label: "Quel est votre nom ?", placeholder: "Jean Dupont *", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Votre adresse e-mail ?", placeholder: "jean@dupont.fr *", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Votre entreprise ou organisation ?", placeholder: "Entreprise, école, association…", type: "text", required: false, autoComplete: "organization" },
] as const;

const TOPICS = ["Alternance", "Stage", "Emploi", "Projet web", "Infra / réseau", "Autre"];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [topics, setTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) =>
    setTopics((current) =>
      current.includes(topic) ? current.filter((t) => t !== topic) : [...current, topic],
    );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);

    if (res?.ok) {
      form.reset();
      setTopics([]);
      setStatus("sent");
      return;
    }

    // No webhook configured yet: hand over to the visitor's mail client.
    if (res?.status === 503) {
      const subject = data.subject || `Contact de ${data.name}`;
      const body = `${data.message}\n\n${data.name}${data.company ? ` — ${data.company}` : ""}\n${data.email}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("idle");
      return;
    }

    setStatus("error");
  }

  const row = "grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-foreground/15 py-10 transition-colors focus-within:border-accent sm:grid-cols-[4rem_1fr]";
  const input =
    "col-start-2 mt-4 w-full bg-transparent font-display text-xl text-foreground placeholder:text-muted/60 focus:outline-none sm:text-2xl";

  return (
    <form onSubmit={handleSubmit} className="relative">
      {FIELDS.map((field, i) => (
        <div key={field.name} className={row}>
          <span className="pt-1 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
          <label htmlFor={`contact-${field.name}`} className="text-lg sm:text-xl">
            {field.label}
          </label>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type}
            required={field.required}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            className={input}
          />
        </div>
      ))}

      <div className={row}>
        <span className="pt-1 font-mono text-xs text-muted">04</span>
        <p id="contact-topics-label" className="text-lg sm:text-xl">
          Qu&apos;est-ce qui vous amène ?
        </p>
        <div role="group" aria-labelledby="contact-topics-label" className="col-start-2 mt-5 flex flex-wrap gap-2">
          {TOPICS.map((topic) => {
            const active = topics.includes(topic);
            return (
              <button
                key={topic}
                type="button"
                aria-pressed={active}
                onClick={() => toggleTopic(topic)}
                className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent text-background"
                    : "border-foreground/15 text-foreground/80 hover:border-foreground/40"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="subject" value={topics.join(", ")} />
      </div>

      <div className={`${row} border-b pb-24`}>
        <span className="pt-1 font-mono text-xs text-muted">05</span>
        <label htmlFor="contact-message" className="text-lg sm:text-xl">
          Votre message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Bonjour Adam, j'aimerais échanger à propos de… *"
          className={`${input} resize-none`}
        />
      </div>

      {/* Honeypot, hidden from humans and assistive tech */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex justify-end pr-2 sm:pr-16">
        <Magnetic className="-mt-20 sm:-mt-24">
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-accent text-lg font-medium text-background transition-transform duration-300 hover:scale-105 disabled:opacity-60 sm:h-48 sm:w-48"
          >
            {status === "sending" ? "Envoi…" : "Envoyer !"}
          </button>
        </Magnetic>
      </div>

      <p aria-live="polite" className="mt-6 min-h-6 text-right text-sm">
        {status === "sent" && <span className="text-accent">Message envoyé, merci ! Je vous réponds vite.</span>}
        {status === "error" && (
          <span className="text-red-300">
            L&apos;envoi a échoué. Écrivez-moi directement à{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
}
