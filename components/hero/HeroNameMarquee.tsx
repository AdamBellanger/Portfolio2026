"use client";

import { useReducedMotion } from "framer-motion";
import { CursorRevealName } from "@/components/hero/CursorRevealName";

const SEPARATOR = (
  <span aria-hidden="true" className="font-display text-[13vw] leading-[0.95] text-muted sm:text-[9vw]">
    &nbsp;—&nbsp;
  </span>
);

export function HeroNameMarquee() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden">
      <h1 className="sr-only">Adam Bellanger</h1>
      {reducedMotion ? (
        <CursorRevealName />
      ) : (
        <div aria-hidden="true" className="animate-marquee flex w-max items-center">
          <CursorRevealName />
          {SEPARATOR}
          <CursorRevealName />
          {SEPARATOR}
        </div>
      )}
    </div>
  );
}
