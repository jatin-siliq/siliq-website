import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "SILIQ — Silver 925 Fine Jewellery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 72, color: "#FFFFFF", letterSpacing: "0.2em", fontWeight: 300 }}>
          SILIQ
        </div>
        <div style={{ fontSize: 20, color: "#8B8680", marginTop: 16, letterSpacing: "0.15em" }}>
          SILVER 925 FINE JEWELLERY
        </div>
        <div style={{ fontSize: 16, color: "#6B6560", marginTop: 32, maxWidth: 600, textAlign: "center" }}>
          Crafted with intention. Worn with meaning.
        </div>
      </div>
    ),
    { ...size }
  );
}
