import Image from "next/image";
import type { Screenshot } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";

function BrowserFrame({
  shot,
  host,
  priority,
}: {
  shot: Screenshot;
  host: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#1b1b1e] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-md bg-white/[0.06] px-3 py-1 font-mono text-[11px] text-white/55">
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {host}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={1920}
        height={1200}
        priority={priority}
        sizes="(min-width: 1024px) 1000px, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}

/** Desktop software: the capture already has its own window chrome. */
function AppFrame({ shot, priority }: { shot: Screenshot; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#1b1b1e] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width ?? 1600}
        height={shot.height ?? 1000}
        priority={priority}
        sizes="(min-width: 1024px) 1000px, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}

/** Browser frame for websites, plain window for desktop apps. */
function WideFrame({ shot, host, priority }: { shot: Screenshot; host: string; priority?: boolean }) {
  return shot.device === "app" ? (
    <AppFrame shot={shot} priority={priority} />
  ) : (
    <BrowserFrame shot={shot} host={host} priority={priority} />
  );
}

function PhoneFrame({ shot }: { shot: Screenshot }) {
  return (
    <div className="mx-auto w-[220px] overflow-hidden rounded-[2.2rem] border-[7px] border-[#1b1b1e] bg-[#1b1b1e] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={780}
        height={1688}
        sizes="220px"
        className="block h-auto w-full rounded-[1.6rem]"
      />
    </div>
  );
}

/** Browser/phone mockups for live projects: hero shot, then a secondary row. */
export function ScreenshotGallery({
  shots,
  url,
}: {
  shots: Screenshot[];
  url?: string;
}) {
  const host = url ? new URL(url).host : "";
  const desktops = shots.filter((s) => s.device !== "mobile");
  const mobile = shots.find((s) => s.device === "mobile");
  const [hero, ...rest] = desktops;
  const secondary = desktops.length > 1 ? rest[0] : undefined;

  return (
    <div className="flex flex-col gap-6 lg:-mx-32">
      {/* The first shot is usually the LCP: no JS-driven reveal on it. */}
      {hero && (secondary || !mobile) && (
        <div className="animate-rise">
          <WideFrame shot={hero} host={host} priority />
        </div>
      )}
      {mobile && (
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          {secondary ? (
            <Reveal delay={0.1}>
              <WideFrame shot={secondary} host={host} />
            </Reveal>
          ) : (
            hero && (
              <div className="animate-rise">
                <WideFrame shot={hero} host={host} priority />
              </div>
            )
          )}
          <Reveal delay={0.2}>
            <PhoneFrame shot={mobile} />
          </Reveal>
        </div>
      )}
    </div>
  );
}
