import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/content/skills";

export function Skills({ title = "Stack & compétences" }: { title?: string }) {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-32 sm:px-10">
      <Reveal>
        <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      </Reveal>
      <div className="flex flex-col border-b border-foreground/10">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <div className="grid gap-4 border-t border-foreground/10 py-8 sm:grid-cols-[1fr_2fr] sm:gap-10">
              <div>
                <h3 className="font-display text-xl">{group.title}</h3>
                <p className="mt-1 text-sm text-muted">{group.description}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-foreground/10 px-3 py-1 font-mono text-xs text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
