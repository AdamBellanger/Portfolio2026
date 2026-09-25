"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const topLinks = links.slice(1);

const socials = [
  { label: "GitHub", href: "https://github.com/AdamBellanger" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:contact@adambellanger.pro" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setCompact(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) toggleRef.current?.focus();
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 ${
          compact || open ? "pointer-events-none" : ""
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`font-display text-sm tracking-wide transition-opacity duration-300 ${
            compact || open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          © Made by Adam Bellanger
        </Link>
        <nav
          aria-label="Navigation principale"
          className={`flex items-center gap-8 transition-opacity duration-300 ${
            compact || open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {topLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <motion.button
          ref={toggleRef}
          type="button"
          layout
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-nav-overlay"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto fixed right-6 top-5 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full sm:right-10 ${
            open
              ? "bg-accent text-background"
              : "border border-foreground/20 bg-background/80 text-foreground backdrop-blur"
          } ${compact || open ? "" : "hidden"}`}
        >
          {open ? (
            <span aria-hidden className="text-base leading-none">
              ✕
            </span>
          ) : (
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
          )}
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
        </motion.button>
      </header>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 cursor-default"
            />
            <motion.div
              id="site-nav-overlay"
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation principale"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col justify-between border-l border-foreground/10 bg-anthracite px-8 py-10 sm:px-10"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  Navigation
                </p>
                <div className="mt-3 border-t border-foreground/10" />
                <ul className="mt-8 flex flex-col gap-3">
                  {links.map((link, i) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href} className="flex items-center gap-3">
                        {active && (
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                        )}
                        <Link
                          href={link.href}
                          ref={i === 0 ? firstLinkRef : undefined}
                          onClick={() => setOpen(false)}
                          className="font-display text-4xl text-foreground transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  Socials
                </p>
                <div className="mt-3 border-t border-foreground/10" />
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-foreground transition-colors hover:text-accent"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
