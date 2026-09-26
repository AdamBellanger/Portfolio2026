import { mailerConfigured, sendContactMessage } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 120, email: 200, company: 160, subject: 200, message: 5000 } as const;
type Field = keyof typeof LIMITS;

// At most MAX_PER_WINDOW messages per visitor per window, so the form can't be
// used to flood the inbox. In memory only (reset on restart), which is enough
// for a single container.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const sent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (sent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  sent.set(ip, recent);
  if (sent.size > 5000) {
    for (const [key, times] of sent) if (times.every((t) => now - t >= WINDOW_MS)) sent.delete(key);
  }
  return false;
}

// Largest legitimate payload is ~6 KB (field limits above); refuse anything
// much bigger before parsing it.
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Emails contact-form submissions to Adam (see lib/mailer.ts). Returns 503
 * when SMTP isn't configured so the client falls back to a mailto: link.
 */
export async function POST(request: Request) {
  const raw = await request.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) return Response.json({ error: "too_large" }, { status: 413 });
  let body: Record<string, unknown> | null = null;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {}
  if (!body || typeof body !== "object") return Response.json({ error: "invalid_body" }, { status: 400 });

  // Honeypot: bots fill every field, humans never see this one.
  if (typeof body.website === "string" && body.website !== "") {
    return Response.json({ ok: true });
  }

  const data = {} as Record<Field, string>;
  for (const field of Object.keys(LIMITS) as Field[]) {
    const value = typeof body[field] === "string" ? (body[field] as string).trim() : "";
    if (value.length > LIMITS[field]) {
      return Response.json({ error: "too_long", field }, { status: 400 });
    }
    data[field] = value;
  }

  if (!data.name || !data.message || !EMAIL_RE.test(data.email)) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!mailerConfigured()) return Response.json({ error: "not_configured" }, { status: 503 });

  // Nginx Proxy Manager sets X-Real-IP to the connecting address.
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ??
    "local";
  if (rateLimited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  try {
    await sendContactMessage({ ...data, locale: body.locale === "en" ? "en" : "fr" });
  } catch (error) {
    console.error("contact: SMTP delivery failed", error);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
