"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import portrait from "@/public/images/portrait.webp";

export function HeroPortrait() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // While the hero is pinned, the portrait drifts up and dims slightly.
  const y = useTransform(scrollY, [0, 900], ["0%", "-8%"]);
  const scale = useTransform(scrollY, [0, 900], [1, 1.06]);
  const opacity = useTransform(scrollY, [0, 900], [1, 0.55]);

  return (
    <motion.div
      style={reducedMotion ? undefined : { y, scale, opacity }}
      className="absolute bottom-0 left-1/2 h-[72vh] -translate-x-1/2 origin-bottom sm:h-[88vh] sm:max-h-[892px]"
    >
      <Image
        src={portrait}
        alt="Portrait d'Adam Bellanger"
        priority
        sizes="(min-width: 640px) 60vw, 120vw"
        className="h-full w-auto max-w-none select-none"
      />
    </motion.div>
  );
}
