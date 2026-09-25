import { existsSync } from "node:fs";
import path from "node:path";
import { Magnetic } from "@/components/ui/Magnetic";

// Drop the PDF at public/cv/CV-Adam-Bellanger.pdf and the button appears.
const CV_PATH = "/cv/CV-Adam-Bellanger.pdf";
const hasCv = existsSync(path.join(process.cwd(), "public", CV_PATH));

export function CvButton({ className = "" }: { className?: string }) {
  if (!hasCv) return null;

  return (
    <Magnetic strength={0.25} className={`inline-block ${className}`}>
      <a
        href={CV_PATH}
        download
        className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3.5 text-sm transition-colors hover:border-accent hover:bg-accent hover:text-background"
      >
        <span aria-hidden="true">↓</span>
        Télécharger mon CV (PDF)
      </a>
    </Magnetic>
  );
}
