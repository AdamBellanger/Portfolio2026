import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Generated once at build time; used as the link preview on LinkedIn, Discord…
export const alt = "Adam Bellanger — Systèmes, réseaux & développement full-stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Satori can't read woff2, hence a TTF copy of Clash Display outside public/.
  const clash = await readFile(path.join(process.cwd(), "assets/fonts/ClashDisplay-Medium.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(124,147,176,0.22), transparent 70%), #121214",
          color: "#edede8",
          fontFamily: "Clash",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#8c8c90" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#7c93b0" }} />
          adambellanger.pro
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, lineHeight: 0.95, letterSpacing: -4 }}>Adam Bellanger</div>
          <div style={{ marginTop: 36, fontSize: 38, color: "#8c8c90" }}>
            Systèmes &amp; réseaux · Développement full-stack
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Clash", data: clash, weight: 500, style: "normal" }] },
  );
}
