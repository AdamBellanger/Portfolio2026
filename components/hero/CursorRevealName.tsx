"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const NAME_CLASSES =
  "font-display text-[13vw] font-medium leading-[0.95] tracking-tight sm:text-[9vw]";

export function CursorRevealName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const springX = useSpring(x, { stiffness: 200, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 30, mass: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const handlePointerLeave = () => {
      x.set(-9999);
      y.set(-9999);
    };

    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion, x, y]);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const unsubX = springX.on("change", (v) => el.style.setProperty("--reveal-x", `${v}px`));
    const unsubY = springY.on("change", (v) => el.style.setProperty("--reveal-y", `${v}px`));
    return () => {
      unsubX();
      unsubY();
    };
  }, [springX, springY]);

  return (
    <div ref={containerRef} className="relative inline-block select-none">
      <h1 className={`${NAME_CLASSES} text-foreground`}>Adam Bellanger</h1>
      <div
        ref={revealRef}
        aria-hidden="true"
        className={`${NAME_CLASSES} pointer-events-none absolute inset-0 bg-[image:var(--portrait-image)] bg-cover bg-center bg-clip-text text-transparent`}
        style={{
          ["--reveal-x" as string]: "-9999px",
          ["--reveal-y" as string]: "-9999px",
          WebkitMaskImage:
            "radial-gradient(circle 130px at var(--reveal-x) var(--reveal-y), black 0%, black 55%, transparent 100%)",
          maskImage:
            "radial-gradient(circle 130px at var(--reveal-x) var(--reveal-y), black 0%, black 55%, transparent 100%)",
        }}
      >
        Adam Bellanger
      </div>
    </div>
  );
}
