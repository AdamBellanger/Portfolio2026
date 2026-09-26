import { techIcons } from "@/content/tech-icons";
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

/** Grid of technology cards with brand logos (Simple Icons), monogram fallback. */
export function TechStack({ stack }: { stack: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stack.map((name) => {
        const icon = techIcons[name];
        const lum = icon ? luminance(icon.hex) : 0;
        // Pale logos (JavaScript, React…) sit on a dark chip, near-black ones
        // (Next.js, Express…) follow the text colour, the rest keep their colour.
        const chip = icon && lum > 0.45 ? "bg-[#161618]" : "bg-white";
        const fill = icon
          ? lum < 0.03
            ? "#161618"
            : `#${icon.hex}`
          : undefined;

        return (
          <li
            key={name}
            className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-2.5 pr-4 transition-colors hover:border-foreground/25"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-foreground/5 ${chip}`}
            >
              {icon ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill={fill}
                  aria-hidden="true"
                >
                  <path d={icon.path} />
                </svg>
              ) : (
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] font-semibold text-muted"
                >
                  {initials(name)}
                </span>
              )}
            </span>
            <span className="text-sm leading-tight">{name}</span>
          </li>
        );
      })}
    </ul>
  );
}
