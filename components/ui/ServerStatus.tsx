"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const STATUS_TEXT = {
  up: { label: "Services en ligne", dot: "bg-emerald-400" },
  degraded: { label: "Incident en cours", dot: "bg-amber-400" },
} as const;

/**
 * Subtle live indicator fed by the public Uptime Kuma status page (via
 * /api/status). Renders nothing until site.statusSlug is configured.
 */
export function ServerStatus({ title, titleClassName }: { title: string; titleClassName: string }) {
  const [status, setStatus] = useState<keyof typeof STATUS_TEXT | null>(null);

  useEffect(() => {
    if (!site.statusSlug) return;
    let cancelled = false;
    fetch("/api/status")
      .then((res) => res.json())
      .then((data: { status: string }) => {
        if (!cancelled && (data.status === "up" || data.status === "degraded")) setStatus(data.status);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!status) return null;
  const { label, dot } = STATUS_TEXT[status];

  return (
    <div>
      <p className={titleClassName}>{title}</p>
      <a
        href={`${site.uptimeUrl}/status/${site.statusSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center gap-2 text-sm transition-colors hover:text-accent"
      >
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`} />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
        </span>
        {label}
      </a>
    </div>
  );
}
