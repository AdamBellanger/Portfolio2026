"use client";

import { useReducedMotion } from "framer-motion";

const NAME_CLASSES =
  "whitespace-nowrap font-display text-[19vw] font-medium leading-[0.95] tracking-tight sm:text-[15vw]";

const Name = () => (
  <span aria-hidden="true" className={`${NAME_CLASSES} text-foreground`}>
    Adam Bellanger
  </span>
);

const SEPARATOR = (
  <span aria-hidden="true" className={`${NAME_CLASSES} text-muted`}>
    &nbsp;—&nbsp;
  </span>
);

export function HeroNameMarquee() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full select-none overflow-hidden">
      <h1 className="sr-only">Adam Bellanger</h1>
      {reducedMotion ? (
        <Name />
      ) : (
        <div aria-hidden="true" className="animate-marquee flex w-max items-center">
          <Name />
          {SEPARATOR}
          <Name />
          {SEPARATOR}
        </div>
      )}
    </div>
  );
}
