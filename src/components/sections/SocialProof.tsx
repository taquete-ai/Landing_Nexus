"use client";

import Link from "next/link";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { partners } from "@/data/partners";
import { PartnerCard } from "@/components/ui/PartnerCard";
import type { PartnerType } from "@/types/partner";
import { colors, fontFamily, radius, transitions, spacing } from "@/styles/design-tokens";

/** Abaixo disso o marquee ficaria repetitivo — mostramos uma fileira estática. */
const MARQUEE_MIN = 6;

export function SocialProof() {
  const { ref, isVisible } = useScrollReveal();

  // Nunca mostrar seção vazia nem inventada.
  if (partners.length === 0) return null;

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
        <div
          style={{
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
              Parceiros e Clientes
            </span>
          </div>
          <h2
            style={{
              fontFamily: fontFamily.display,
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "700",
              color: colors.text,
              letterSpacing: "-1.5px",
              marginBottom: spacing.unit(6),
            }}
          >
            Quem já trabalha com a Nexus
          </h2>

          {partners.length >= MARQUEE_MIN ? (
            <MarqueePartners partners={partners} />
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                padding: `${spacing.unit(2)} ${spacing.unit(1)}`,
              }}
            >
              {partners.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          )}

          <div style={{ marginTop: spacing.unit(3) }}>
            <Link
              href="/parceiros"
              style={{
                fontFamily: fontFamily.mono,
                fontSize: "11px",
                fontWeight: "600",
                color: colors.accent,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Ver todos →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueePartners({ partners }: { partners: PartnerType[] }) {
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
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: ${spacing.unit(3)};
          width: 200%;
          animation: marquee 30s linear infinite;
          animation-play-state: ${isHovered ? "paused" : "running"};
        }
      `}</style>

      <div className="marquee-track">
        {partners.map((p) => (
          <PartnerCard key={`original-${p.id}`} partner={p} />
        ))}
        {partners.map((p) => (
          <PartnerCard key={`duplicate-${p.id}`} partner={p} />
        ))}
      </div>
    </div>
  );
}
