"use client";

import { ProjectCardProps } from "@/types/project";
import { colors, fontFamily, radius, transitions } from "@/styles/design-tokens";

const categoryLabels: Record<string, string> = {
  crm: "CRM",
  automacao: "Automação",
  "agentes-ia": "Agentes IA",
  saas: "SaaS",
  dashboard: "Dashboard",
  integracao: "Integração",
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  crm: { bg: "#1a1a1e", text: "#caff33" },
  automacao: { bg: "#1a1a1e", text: "#caff33" },
  "agentes-ia": { bg: "#1a1a1e", text: "#caff33" },
  saas: { bg: "#1a1a1e", text: "#caff33" },
  dashboard: { bg: "#1a1a1e", text: "#caff33" },
  integracao: { bg: "#1a1a1e", text: "#caff33" },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  live: { label: "AO VIVO", color: "#2ed573" },
  beta: { label: "BETA", color: "#ff6b35" },
  completed: { label: "CONCLUÍDO", color: "#5b7fff" },
};

export function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  const categoryColor = categoryColors[project.category];
  const status = project.status && statusLabels[project.status];

  return (
    <div
      className={`group relative overflow-hidden transition-all ${transitions.normal}`}
      style={{
        borderRadius: radius.lg,
      }}
    >
      {/* Container principal */}
      <div
        className="relative h-full bg-cover bg-center"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.lg,
          overflow: "hidden",
          transition: `all ${transitions.normal}`,
        }}
      >
        {/* Mockup placeholder com gradiente */}
        <div
          style={{
            background: `linear-gradient(135deg, ${project.gradient?.from || colors.surface2} 0%, ${project.gradient?.to || colors.bg} 100%)`,
            height: featured ? "360px" : "240px",
            position: "relative",
            overflow: "hidden",
          }}
          className="relative"
        >
          {/* Textura subtle de fundo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(202, 255, 51, 0.02) 2px,
                  rgba(202, 255, 51, 0.02) 4px
                )
              `,
              pointerEvents: "none",
            }}
          />

          {/* Accent line on hover (topo) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "3px",
              width: 0,
              backgroundColor: colors.accent,
              transition: `width ${transitions.accentLine}`,
              zIndex: 10,
            }}
            className="group-hover:w-full"
          />

          {/* Status badge (canto superior direito) */}
          {status && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                padding: "4px 10px",
                backgroundColor: `${status.color}20`,
                border: `1px solid ${status.color}`,
                borderRadius: radius.sm,
                zIndex: 5,
              }}
            >
              <span
                style={{
                  fontFamily: fontFamily.mono,
                  fontSize: "10px",
                  fontWeight: "600",
                  color: status.color,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {status.label}
              </span>
            </div>
          )}

          {/* Metrics overlay (desktop featured only) */}
          {featured && project.metrics && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                background: `linear-gradient(to top, ${colors.bg} 0%, transparent 100%)`,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {project.metrics.map((metric, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: fontFamily.mono,
                      fontSize: "11px",
                      color: colors.textMuted,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    style={{
                      fontFamily: fontFamily.display,
                      fontSize: "18px",
                      fontWeight: "700",
                      color: colors.accent,
                    }}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content section */}
        <div
          style={{
            padding: featured ? "28px 24px 24px" : "20px 18px 18px",
          }}
        >
          {/* Category badge */}
          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              backgroundColor: categoryColor.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.sm,
              marginBottom: featured ? "12px" : "8px",
            }}
          >
            <span
              style={{
                fontFamily: fontFamily.mono,
                fontSize: "10px",
                fontWeight: "600",
                color: categoryColor.text,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {categoryLabels[project.category]}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: fontFamily.display,
              fontSize: featured ? "22px" : "16px",
              fontWeight: "600",
              color: colors.text,
              marginBottom: featured ? "12px" : "8px",
              lineHeight: "1.3",
              transition: `color ${transitions.normal}`,
            }}
            className="group-hover:text-accent"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: fontFamily.body,
              fontSize: featured ? "14px" : "13px",
              fontWeight: "400",
              color: colors.textSecondary,
              lineHeight: "1.6",
              marginBottom: featured ? "16px" : "12px",
            }}
          >
            {featured ? project.longDescription : project.description}
          </p>

          {/* Stack tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {project.stack.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  padding: "4px 10px",
                  backgroundColor: `${colors.accent}10`,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.sm,
                  fontFamily: fontFamily.mono,
                  fontSize: "10px",
                  fontWeight: "500",
                  color: colors.textSecondary,
                  letterSpacing: "0.05em",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics inline (mobile/tablet) */}
          {project.metrics && !featured && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gap: "12px",
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: `1px solid ${colors.borderSubtle}`,
              }}
            >
              {project.metrics.map((metric, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      fontFamily: fontFamily.mono,
                      fontSize: "9px",
                      color: colors.textMuted,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "3px",
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    style={{
                      fontFamily: fontFamily.display,
                      fontSize: "14px",
                      fontWeight: "700",
                      color: colors.accent,
                    }}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover elevation effect */}
      <style>{`
        .group:hover {
          box-shadow: 0 20px 40px rgba(202, 255, 51, 0.08);
        }
      `}</style>
    </div>
  );
}
