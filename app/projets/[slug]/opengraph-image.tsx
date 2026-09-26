import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { techIcons } from "@/content/tech-icons";
import { luminance } from "@/lib/color";
import { projectAccent } from "@/lib/previews";

// One link preview per case study (LinkedIn, Discord…), built at build time
// from the project data: kind, title, pitch and stack logos.
export const alt = "Étude de cas — Adam Bellanger";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const MAX_TECHS = 5;

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const clash = await readFile(path.join(process.cwd(), "assets/fonts/ClashDisplay-Medium.ttf"));
  if (!project) return new Response("Not found", { status: 404 });

  const accent = projectAccent(project);
  const techs = project.stack.slice(0, MAX_TECHS);
  const more = project.stack.length - techs.length;
  // Cut the pitch on a word boundary so it fits on two lines.
  const pitch =
    project.pitch.length > 120
      ? `${project.pitch.slice(0, project.pitch.lastIndexOf(" ", 115)).replace(/[,;:]$/, "")}…`
      : project.pitch;
  // Clash Display averages ~0.55em per character: shrink long titles to fit.
  const titleSize = Math.min(120, Math.floor(1050 / (project.title.length * 0.56)));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `radial-gradient(ellipse 60% 70% at 85% 10%, ${accent}40, transparent 70%), #121214`,
          color: "#edede8",
          fontFamily: "Clash",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8c8c90" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#7c93b0" }} />
            adambellanger.pro
          </div>
          <div style={{ display: "flex" }}>Projet {project.kind}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: titleSize, lineHeight: 1, letterSpacing: -3 }}>
            {project.title}
          </div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.3, color: "#a4a4a8", maxWidth: 980 }}>
            {pitch}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {techs.map((name) => {
            const icon = techIcons[name];
            const lum = icon ? luminance(icon.hex) : 0;
            return (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "8px 20px 8px 8px",
                  borderRadius: 999,
                  border: "1px solid rgba(237,237,232,0.14)",
                  background: "rgba(237,237,232,0.04)",
                  fontSize: 22,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    background: icon && lum > 0.45 ? "#161618" : "#ffffff",
                    color: "#6b6b6b",
                    fontSize: 14,
                  }}
                >
                  {icon ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={lum < 0.03 ? "#161618" : `#${icon.hex}`}>
                      <path d={icon.path} />
                    </svg>
                  ) : (
                    name.slice(0, 2).toUpperCase()
                  )}
                </div>
                {name}
              </div>
            );
          })}
          {more > 0 && <div style={{ display: "flex", fontSize: 22, color: "#8c8c90" }}>+{more}</div>}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Clash", data: clash, weight: 500, style: "normal" }] },
  );
}
