import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nexus Labs AI Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getSyneFont() {
  const response = await fetch(
    "https://fonts.gstatic.com/s/syne/v20/8vIZ7ww_X84D_5vIQ-xH-H9uFe4.ttf"
  );
  return response.arrayBuffer();
}

async function getDMSansFont() {
  const response = await fetch(
    "https://fonts.gstatic.com/s/dmsans/v14/raxh0iAz9eZ--8A3Gq0T4W9uOgXP.ttf"
  );
  return response.arrayBuffer();
}

async function getIBMPlexMonoFont() {
  const response = await fetch(
    "https://fonts.gstatic.com/s/ibmplexmono/v19/-F6ofjtqLzI2JPCgiBYl7nF1P_No.ttf"
  );
  return response.arrayBuffer();
}

export default async function Image() {
  const syneFont = await getSyneFont();
  const dmSansFont = await getDMSansFont();
  const ibmPlexMonoFont = await getIBMPlexMonoFont();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#0c0c0e",
        color: "#e8e8e8",
        padding: "48px",
        gap: "32px",
        fontFamily: '"DM Sans"',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "#caff33",
        }}
      />

      {/* Header — Badge + Logo Mark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "14px",
          fontFamily: '"IBM Plex Mono"',
          letterSpacing: "0.1em",
          color: "#8a8a8f",
          textTransform: "uppercase",
          marginTop: "12px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: "#caff33",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0c0c0e",
            fontSize: "18px",
            fontWeight: "700",
            fontFamily: '"Syne"',
          }}
        >
          N
        </div>
        <span>AI Systems Laboratory</span>
      </div>

      {/* Main Content — Center */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: "800",
            fontFamily: '"Syne"',
            lineHeight: "1.1",
            letterSpacing: "-2px",
            color: "#e8e8e8",
          }}
        >
          Nexus Labs AI Systems
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "18px",
            fontWeight: "400",
            fontFamily: '"DM Sans"',
            color: "#8a8a8f",
            lineHeight: "1.5",
            maxWidth: "600px",
          }}
        >
          Ecossistema premium de IA, automação e desenvolvimento de software.
        </div>
      </div>

      {/* Footer — Metrics */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "24px",
          borderTop: "1px solid #2a2a2e",
          fontSize: "14px",
          fontFamily: '"IBM Plex Mono"',
          color: "#caff33",
          fontWeight: "500",
          letterSpacing: "0.05em",
        }}
      >
        <div style={{ display: "flex", gap: "24px" }}>
          <span>12 Projetos</span>
          <span>8 Empresas</span>
          <span>8 Tecnologias</span>
        </div>
        <span style={{ color: "#555559" }}>nexuslabsai.vercel.app</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Syne",
          data: syneFont,
          weight: 800,
        },
        {
          name: "DM Sans",
          data: dmSansFont,
          weight: 400,
        },
        {
          name: "IBM Plex Mono",
          data: ibmPlexMonoFont,
          weight: 500,
        },
      ],
    }
  );
}
