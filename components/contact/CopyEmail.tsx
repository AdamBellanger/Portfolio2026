"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [user, domain] = email.split("@");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="mt-3 flex flex-col items-start gap-3">
      <a href={`mailto:${email}`} className="text-lg transition-colors hover:text-accent">
        {user}
        <wbr />@{domain}
      </a>
      <button
        type="button"
        onClick={copy}
        className="cursor-pointer rounded-full border border-foreground/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <span aria-live="polite">{copied ? "Copié ✓" : "Copier l'adresse"}</span>
      </button>
    </div>
  );
}
