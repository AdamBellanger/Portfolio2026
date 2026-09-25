import { CursorRevealName } from "@/components/hero/CursorRevealName";

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <CursorRevealName />
      <p className="max-w-md font-mono text-sm text-muted">
        Développeur full-stack — Technicien réseau &amp; télécom
      </p>
    </section>
  );
}
