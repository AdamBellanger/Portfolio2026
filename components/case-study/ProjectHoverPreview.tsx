"use client";

import Image from "next/image";
import { useState, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { ProjectPreview } from "@/lib/previews";

const SPRING = { stiffness: 250, damping: 28, mass: 0.5 };

function Cover({ preview }: { preview: ProjectPreview }) {
  if (preview.image) {
    return (
      <Image
        src={preview.image}
        alt=""
        fill
        sizes="360px"
        className="object-cover object-top"
      />
    );
  }
  return (
    <div
      className="flex h-full w-full flex-col justify-between p-5 text-[#edede8]"
      style={{
        background: `radial-gradient(circle at 80% 20%, ${preview.accent}55, transparent 60%), radial-gradient(circle at 10% 110%, ${preview.accent}33, transparent 55%), #161618`,
      }}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
        {preview.kind}
      </span>
      <div>
        <p className="font-display text-3xl leading-none">{preview.title}</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/60">
          {preview.stack.join(" · ")}
        </p>
      </div>
    </div>
  );
}

/**
 * Wraps a project list: hovering a row ([data-slug]) shows a floating cover
 * that follows the mouse (screenshot when the project has one, typographic
 * cover otherwise). Mouse only; disabled for reduced motion.
 */
export function ProjectHoverPreview({
  previews,
  children,
}: {
  previews: ProjectPreview[];
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType !== "mouse") return;
    x.set(e.clientX);
    y.set(e.clientY);
    const row = (e.target as Element).closest<HTMLElement>("[data-slug]");
    setActive(row?.dataset.slug ?? null);
  };

  const preview = previews.find((p) => p.slug === active);

  return (
    <div onPointerMove={handleMove} onPointerLeave={() => setActive(null)}>
      {children}
      <motion.div
        aria-hidden="true"
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
      >
        <AnimatePresence>
          {preview && (
            <motion.div
              key="preview"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative -ml-[180px] -mt-[112px] h-[225px] w-[360px] overflow-hidden rounded-2xl bg-[#161618] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={preview.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Cover preview={preview} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
