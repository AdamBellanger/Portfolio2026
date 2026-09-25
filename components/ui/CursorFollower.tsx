"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CursorFollower() {
  const reducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    dotRef.current?.style.setProperty("opacity", "1");
    ringRef.current?.style.setProperty("opacity", "1");
    document.documentElement.classList.add("cursor-none");

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button"));
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [reducedMotion, x, y]);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const update = () => {
      dot.style.transform = `translate(${x.get()}px, ${y.get()}px) translate(-50%, -50%)`;
    };
    const unsubX = x.on("change", update);
    const unsubY = y.on("change", update);
    return () => {
      unsubX();
      unsubY();
    };
  }, [x, y]);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const scale = hovering ? 1.8 : 1;
    const update = () => {
      ring.style.transform = `translate(${ringX.get()}px, ${ringY.get()}px) translate(-50%, -50%) scale(${scale})`;
    };
    const unsubX = ringX.on("change", update);
    const unsubY = ringY.on("change", update);
    update();
    return () => {
      unsubX();
      unsubY();
    };
  }, [ringX, ringY, hovering]);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-accent opacity-0 transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-foreground/60 opacity-0 mix-blend-difference transition-[opacity,border-color] duration-200"
      />
    </>
  );
}
