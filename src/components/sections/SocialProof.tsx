"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { clientsMock } from "@/data/clients";
import { colors, fontFamily, radius, transitions, spacing } from "@/styles/design-tokens";

export function SocialProof() {
  const { ref, isVisible } = useScrollReveal();

  const metrics = [
    { value: "+20", label: "Empresas Atendidas" },
    { value: "+50", label: "Automações Ativas" },
    { value: "+300", label: "Leads Processados" },
    { value: "24/7", label: "Infraestrutura" },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        paddingTop: spacing.unit(12),
        paddingBottom: spacing.unit(12),
        backgroundColor: colors.bg,
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: `0 ${spacing.unit(2)}` }}>
        {/* Header com métricas */}
        <div
          style={{
            marginBottom: spacing.unit(10),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `all ${transitions.reveal}`,
          }}
        >
          <div style={{ marginBottom: spacing.unit(2) }}>
            <span
              style={{
                fontFamily: fontFamily.mono,
                fontSize: "11px",
                fontWeight: "600",
                color: colors.textMuted,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Validação Social
            </span>
          </div>
          <h2
            style={{
              fontFamily: fontFamily.display,
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "700",
              color: colors.text,
              letterSpacing: "-1.5px",
              marginBottom: spacing.unit(8),
            }}
          >
            Infraestrutura Operacional Real
          </h2>

          {/* Métricas grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: spacing.unit(3),
            }}
            className="max-lg:grid-cols-2 max-sm:grid-cols-1"
          >
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  padding: spacing.unit(3),
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `all ${transitions.reveal}`,
                  transitionDelay: `${100 + idx * 50}ms`,
                }}
              >
                <div
                  style={{
                    fontFamily: fontFamily.display,
                    fontSize: "32px",
                    fontWeight: "700",
                    color: colors.accent,
                    letterSpacing: "-1px",
                    marginBottom: spacing.unit(1),
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontFamily: fontFamily.mono,
                    fontSize: "11px",
                    fontWeight: "600",
                    color: colors.textMuted,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div
          style={{
            height: "1px",
            backgroundColor: colors.borderSubtle,
            marginBottom: spacing.unit(10),
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${transitions.reveal}`,
            transitionDelay: "300ms",
          }}
        />

        {/* Marquee de clientes */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `all ${transitions.reveal}`,
            transitionDelay: "400ms",
          }}
        >
          <div
            style={{
              marginBottom: spacing.unit(4),
            }}
          >
            <span
              style={{
                fontFamily: fontFamily.mono,
                fontSize: "11px",
                fontWeight: "600",
                color: colors.textMuted,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Parceiros e Clientes
            </span>
          </div>

          <MarqueeClients clients={clientsMock} />
        </div>
      </div>
    </section>
  );
}

function MarqueeClients({ clients }: { clients: (typeof clientsMock) }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        padding: `${spacing.unit(2)} 0`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          display: flex;
          gap: ${spacing.unit(3)};
          width: 200%;
          animation: marquee 30s linear infinite;
          animation-play-state: ${isHovered ? "paused" : "running"};
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {/* Primeira volta */}
        {clients.map((client) => (
          <ClientCard key={`original-${client.id}`} client={client} />
        ))}
        {/* Segunda volta — para seamless loop */}
        {clients.map((client) => (
          <ClientCard key={`duplicate-${client.id}`} client={client} />
        ))}
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: (typeof clientsMock)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.unit(2),
        padding: `${spacing.unit(1.5)} ${spacing.unit(2)}`,
        flexShrink: 0,
        minWidth: "200px",
        cursor: "pointer",
        transition: `all ${transitions.normal}`,
      }}
    >
      {/* Avatar com iniciais */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: radius.md,
          backgroundColor: isHovered ? colors.accent : colors.surface,
          border: `1px solid ${colors.border}`,
          fontFamily: fontFamily.mono,
          fontSize: "12px",
          fontWeight: "600",
          color: isHovered ? colors.bg : colors.text,
          transition: `all ${transitions.normal}`,
          filter: isHovered ? "grayscale(0%)" : "grayscale(60%)",
        }}
      >
        {client.initials}
      </div>

      {/* Informações */}
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: fontFamily.body,
            fontSize: "13px",
            fontWeight: "600",
            color: isHovered ? colors.accent : colors.text,
            transition: `color ${transitions.normal}`,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {client.name}
        </div>
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: "10px",
            fontWeight: "500",
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {client.sector}
        </div>
      </div>
    </div>
  );
}
