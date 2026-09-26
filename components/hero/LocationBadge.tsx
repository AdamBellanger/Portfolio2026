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
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="16" cy="16" r="12" />
      <path d="M4 16h24M6 10h20M6 22h20" />
      <motion.ellipse cx="16" cy="16" ry="12" {...sweep(11)} />
      <motion.ellipse cx="16" cy="16" ry="12" {...sweep(5)} />
    </svg>
  );
}

export function LocationBadge({ lines }: { lines: readonly string[] }) {
  return (
    <div className="inline-flex items-center gap-4 rounded-r-full bg-anthracite py-1.5 pl-6 pr-1.5 sm:gap-5 sm:pl-10">
      <p className="text-xs leading-snug">
        {lines[0]}
        <br />
        {lines[1]}
      </p>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 text-foreground">
        <Globe />
      </span>
    </div>
  );
}
