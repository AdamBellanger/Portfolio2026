import { site } from "@/content/site";

type Heartbeat = { status: number };
type HeartbeatResponse = { heartbeatList?: Record<string, Heartbeat[]> };

/**
 * Summarises the public Uptime Kuma status page: "up" when every monitor's
 * latest heartbeat is UP (1), "degraded" otherwise. Cached for a minute.
 */
export async function GET() {
  if (!site.statusSlug) return Response.json({ status: "unconfigured" });

  const res = await fetch(`${site.uptimeUrl}/api/status-page/heartbeat/${site.statusSlug}`, {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(5000),
  }).catch(() => null);
  if (!res?.ok) return Response.json({ status: "unknown" });

  const data = (await res.json().catch(() => null)) as HeartbeatResponse | null;
  const latest = Object.values(data?.heartbeatList ?? {})
    .map((beats) => beats.at(-1)?.status)
    .filter((s): s is number => s !== undefined);
  if (latest.length === 0) return Response.json({ status: "unknown" });

  return Response.json({ status: latest.every((s) => s === 1) ? "up" : "degraded" });
}
