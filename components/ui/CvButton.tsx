import { existsSync } from "node:fs";
import path from "node:path";
import { Magnetic } from "@/components/ui/Magnetic";
import { getDictionary } from "@/content/i18n/ui";
import type { Locale } from "@/lib/i18n";

// Drop the PDF at public/cv/CV-Adam-Bellanger.pdf and the button appears.
const CV_PATH = "/cv/CV-Adam-Bellanger.pdf";

export function CvButton({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale).cv;
  if (!existsSync(path.join(process.cwd(), "public", CV_PATH))) {
    // Dev-only reminder of where the PDF goes; nothing renders in production.
    if (process.env.NODE_ENV === "production") return null;
    return (
      <p className={`rounded-2xl border border-dashed border-foreground/25 px-5 py-3 font-mono text-[11px] text-muted ${className}`}>
        {t.devHint}
        <br />
        public{CV_PATH}
      </p>
    );
  }

  return (
    <Magnetic strength={0.25} className={`inline-block ${className}`}>
      <a
        href={CV_PATH}
        download
        className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3.5 text-sm transition-colors hover:border-accent hover:bg-accent hover:text-background"
      >
        <span aria-hidden="true">↓</span>
        {t.download}
      </a>
    </Magnetic>
  );
}
