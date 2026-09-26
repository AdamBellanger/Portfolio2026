import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

// Tiny self-hosted visit counter: a single number in a JSON file on a Docker
// volume. No cookies, no third party, nothing personal is stored on disk.
const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "visits.json");

const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|lighthouse|headless|curl|wget|python|monitor|uptime/i;
const THROTTLE_MS = 30 * 60 * 1000; // same visitor counted at most once per 30 min

let total: number | null = null;
let writing = Promise.resolve();
// In-memory only (lost on restart): hashed IP -> last counted timestamp.
const recent = new Map<string, number>();

export const dynamic = "force-dynamic";

async function load() {
  if (total !== null) return total;
  try {
    total = (JSON.parse(await readFile(FILE, "utf8")) as { total: number }).total ?? 0;
  } catch {
    total = 0;
  }
  return total;
}

function persist(value: number) {
  // Serialise writes and swap atomically so a crash never leaves a half-written file.
  writing = writing.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const tmp = `${FILE}.tmp`;
    await writeFile(tmp, JSON.stringify({ total: value }));
    await rename(tmp, FILE);
  }).catch(() => {});
}

export async function GET() {
  return Response.json({ total: await load() });
}

export async function POST(request: Request) {
  const count = await load();
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_RE.test(ua)) return Response.json({ total: count });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
  const key = createHash("sha256").update(ip + ua).digest("hex").slice(0, 16);
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < THROTTLE_MS) return Response.json({ total: count });

  recent.set(key, now);
  if (recent.size > 5000) {
    for (const [k, t] of recent) if (now - t > THROTTLE_MS) recent.delete(k);
  }

  total = count + 1;
  persist(total);
  return Response.json({ total });
}
