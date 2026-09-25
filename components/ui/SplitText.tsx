"use client";

import { motion, useReducedMotion } from "framer-motion";

type Tag = "h1" | "h2" | "p";

/** Word-by-word slide-up reveal. Plays on mount, or on first view with `inView`. */
export function SplitText({
  text,
  as: Tag = "h1",
  className,
  delay = 0.3,
  inView = false,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <Tag className={className}>{text}</Tag>;

  const trigger = inView
    ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "-60px" } }
    : { animate: { y: "0%" } };

  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            {...trigger}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.06 }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
