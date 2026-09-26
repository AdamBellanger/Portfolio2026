import { techIcons } from "@/content/tech-icons";
import { groupStack } from "@/content/tech-categories";
import { luminance } from "@/lib/color";

function initials(name: string) {
  const words = name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  return (
    words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)
  ).toUpperCase();
}

function TechPill({ name, label }: { name: string; label: string }) {
  const icon = techIcons[name];
  const lum = icon ? luminance(icon.hex) : 0;
  // Pale logos (JavaScript, React…) sit on a dark chip, near-black ones
  // (Next.js, Express…) get a dark fill, the rest keep their brand colour.
  const chip = icon && lum > 0.45 ? "bg-[#161618]" : "bg-white";
  const fill = icon ? (lum < 0.03 ? "#161618" : `#${icon.hex}`) : undefined;

  return (
    <li className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-foreground/10 bg-foreground/[0.03] py-1.5 pl-1.5 pr-4 transition-colors hover:border-foreground/30">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ring-1 ring-foreground/5 ${chip}`}
      >
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={fill}
            aria-hidden="true"
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span
            aria-hidden="true"
            className="font-mono text-[10px] font-semibold text-[#6b6b6b]"
          >
            {initials(name)}
          </span>
        )}
      </span>
      <span className="text-sm">{label}</span>
    </li>
  );
}

/**
 * Stack as a spec sheet: one row per role (languages, front-end, infra…),
 * each holding content-sized pills with the brand logo (Simple Icons) or a
 * monogram fallback.
 */
export function TechStack({
  stack,
  categoryLabels,
  techNames = {},
}: {
  stack: string[];
  /** Display names for the (French) category keys. */
  categoryLabels: Record<string, string>;
  /** Translated display names for some stack items. */
  techNames?: Record<string, string>;
}) {
  return (
    <dl className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
      {groupStack(stack).map(({ category, items }) => (
        <div
          key={category}
          className="grid gap-3 py-4 sm:grid-cols-[9rem_1fr] sm:items-start"
        >
          <dt className="font-mono text-[11px] uppercase tracking-widest text-muted sm:pt-3.5">
            {categoryLabels[category] ?? category}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {items.map((name) => (
                <TechPill key={name} name={name} label={techNames[name] ?? name} />
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
