"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Globe whose meridians sweep continuously, giving a slow "spinning" feel. */
function Globe() {
  const reducedMotion = useReducedMotion();
  const sweep = (from: number) => ({
    initial: { rx: from },
    ...(reducedMotion
      ? {}
      : {
          animate: { rx: [from, 0.5, 11, from] },
          transition: { duration: 4, ease: "easeInOut" as const, repeat: Infinity },
        }),
  });

  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
      <circle cx="16" cy="16" r="12" />
      <path d="M4 16h24M6 10h20M6 22h20" />
      <motion.ellipse cx="16" cy="16" ry="12" {...sweep(11)} />
      <motion.ellipse cx="16" cy="16" ry="12" {...sweep(5)} />
    </svg>
  );
}

export function LocationBadge() {
  return (
    <div className="inline-flex items-center gap-5 rounded-r-full bg-anthracite py-2 pl-6 pr-2 sm:gap-7 sm:pl-10">
      <p className="text-sm leading-snug">
        Basé
        <br />à Rouen,
        <br />
        France
      </p>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-foreground">
        <Globe />
      </span>
    </div>
  );
}
