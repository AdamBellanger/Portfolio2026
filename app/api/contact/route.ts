const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 120, email: 200, company: 160, subject: 200, message: 5000 } as const;
type Field = keyof typeof LIMITS;

/**
 * Forwards contact-form submissions to CONTACT_WEBHOOK_URL when it is set.
 * Returns 503 when it isn't configured so the
 * client can fall back to a mailto: link.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "invalid_body" }, { status: 400 });

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

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return Response.json({ error: "not_configured" }, { status: 503 });

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...data, sentAt: new Date().toISOString() }),
  }).catch(() => null);

  if (!res?.ok) return Response.json({ error: "delivery_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
