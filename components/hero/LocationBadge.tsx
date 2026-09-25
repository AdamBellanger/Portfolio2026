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
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 sm:h-10 sm:w-10">
      <circle cx="16" cy="16" r="12" />
      <path d="M4 16h24M6 10h20M6 22h20" />
      <motion.ellipse cx="16" cy="16" ry="12" {...sweep(11)} />
      <motion.ellipse cx="16" cy="16" ry="12" {...sweep(5)} />
    </svg>
  );
}

export function LocationBadge() {
  return (
    <div className="inline-flex items-center gap-8 rounded-r-full bg-anthracite py-3 pl-6 pr-3 sm:gap-12 sm:pl-10">
      <p className="text-base leading-snug sm:text-lg">
        Basé
        <br />à Rouen,
        <br />
        France
      </p>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/60 text-foreground sm:h-20 sm:w-20">
        <Globe />
      </span>
    </div>
  );
}
