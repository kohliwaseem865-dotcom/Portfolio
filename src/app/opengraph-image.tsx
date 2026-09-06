import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#050507",
          backgroundImage:
            "linear-gradient(135deg, #1c1547 0%, #070810 46%, #08313b 100%)",
          color: "#e7e7ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #7c5cff, #38e6ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#05060a",
            }}
          >
            W
          </div>
          <div style={{ fontSize: 26, letterSpacing: 2, color: "#a1a1b3" }}>
            {site.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            Building digital experiences with code &amp; AI
          </div>
          <div style={{ fontSize: 30, color: "#9c82ff" }}>{site.shortTagline}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#6c6c80",
          }}
        >
          <span>{site.role}</span>
          <span>{site.seo.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
