import { Fragment } from "react";
import type { Architecture } from "@/content/architectures";

function Arrow() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center py-1 text-muted lg:px-1.5 lg:py-0"
    >
      <svg
        viewBox="0 0 24 12"
        className="h-3 w-6 rotate-90 lg:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M0 6h21M16 1l5 5-5 5" />
      </svg>
    </div>
  );
}

/**
 * Left-to-right system diagram (top-to-bottom on small screens), drawn with
 * HTML so it stays crisp, themable and readable by screen readers.
 */
export function ArchitectureDiagram({
  architecture,
}: {
  architecture: Architecture;
}) {
  const { columns, note } = architecture;
  const last = columns.length - 1;

  return (
    <figure className="rounded-3xl border border-foreground/10 bg-[radial-gradient(circle,color-mix(in_srgb,var(--foreground)_12%,transparent)_1px,transparent_1px)] bg-[length:18px_18px] p-4 sm:p-6">
      <ol className="flex flex-col items-stretch lg:flex-row lg:items-center">
        {columns.map((column, i) => (
          <Fragment key={i}>
            {i > 0 && <Arrow />}
            <li className="flex min-w-0 flex-1 flex-col gap-2">
              {column.map((node) => (
                <div
                  key={node.label}
                  className={`rounded-xl border bg-background px-3.5 py-3 shadow-sm ${
                    i === 0 || i === last
                      ? "border-accent/50"
                      : "border-foreground/15"
                  }`}
                >
                  <p className="font-display text-sm leading-tight">
                    {node.label}
                  </p>
                  {node.detail && (
                    <p className="mt-1 text-xs leading-snug text-muted">
                      {node.detail}
                    </p>
                  )}
                </div>
              ))}
            </li>
          </Fragment>
        ))}
      </ol>
      {note && (
        <figcaption className="mt-5 border-t border-foreground/10 pt-4 text-sm text-muted">
          {note}
        </figcaption>
      )}
    </figure>
  );
}
