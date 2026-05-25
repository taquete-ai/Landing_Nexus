"use client";

import { useEffect, useRef, useState } from "react";
import { techFeedMock } from "@/data/tech-feed-mock";
import { colors, fontFamily, radius, transitions, spacing } from "@/styles/design-tokens";

const categoryLabels: Record<string, string> = {
  ia: "IA",
  automacao: "Automação",
  saas: "SaaS",
  crm: "CRM",
  agentes: "Agentes IA",
  infraestrutura: "Infraestrutura",
  engineering: "Engineering",
};

export function TechFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section
      style={{
        paddingTop: spacing.unit(12),
        paddingBottom: spacing.unit(12),
        background: colors.bg,
      }}
      ref={sectionRef}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: `0 ${spacing.unit(3)}px` }}>
        {/* Header com Label NEXUS INTEL */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `all ${transitions.reveal}`,
            marginBottom: spacing.unit(8),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.unit(2),
              marginBottom: spacing.unit(2),
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: colors.accent,
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontFamily: fontFamily.mono,
                fontWeight: 500,
                letterSpacing: "0.15em",
                color: colors.accent,
                textTransform: "uppercase",
              }}
            >
              Nexus Intel
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontFamily: fontFamily.display,
              fontWeight: 700,
              letterSpacing: "-1.5px",
              color: colors.text,
              margin: 0,
              marginBottom: spacing.unit(2),
            }}
          >
            Inteligência Tecnológica
          </h2>

          <p
            style={{
              fontSize: "16px",
              fontFamily: fontFamily.body,
              color: colors.textSecondary,
              maxWidth: "600px",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Atualizações contínuas sobre IA, automação e tecnologias que transformam operações.
            Curado pela Nexus Labs.
          </p>
        </div>

        {/* Grid de Artigos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: spacing.unit(3),
          }}
        >
          {techFeedMock.map((item, idx) => (
            <FeedCard key={item.id} item={item} isVisible={isVisible} index={idx} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}

interface FeedCardProps {
  item: (typeof techFeedMock)[0];
  isVisible: boolean;
  index: number;
}

function FeedCard({ item, isVisible, index }: FeedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIndicatorColor = (indicator?: string) => {
    switch (indicator) {
      case "new":
        return colors.positive;
      case "trending":
        return colors.warm;
      case "featured":
        return colors.accent;
      default:
        return colors.textMuted;
    }
  };

  const getIndicatorLabel = (indicator?: string) => {
    switch (indicator) {
      case "new":
        return "NOVO";
      case "trending":
        return "EM ALTA";
      case "featured":
        return "DESTAQUE";
      default:
        return undefined;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `all ${transitions.reveal}`,
        transitionDelay: `${300 + index * 50}ms`,
      }}
    >
      <div
        style={{
          padding: spacing.unit(4),
          background: isHovered ? colors.surface : colors.bg,
          border: `1px solid ${colors.border}`,
          borderTop: `2px solid ${isHovered ? colors.accent : colors.border}`,
          borderRadius: `${radius.lg}px`,
          transition: `all ${transitions.normal}`,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: spacing.unit(2),
          height: "100%",
        }}
      >
        {/* Category Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: spacing.unit(2),
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontFamily: fontFamily.mono,
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: colors.accent,
              background: colors.surface2,
              padding: `${spacing.unit(0.5)}px ${spacing.unit(1.5)}px`,
              borderRadius: `${radius.md}px`,
              textTransform: "uppercase",
            }}
          >
            {categoryLabels[item.category] || item.category}
          </span>

          {item.indicator && (
            <span
              style={{
                fontSize: "9px",
                fontFamily: fontFamily.mono,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: getIndicatorColor(item.indicator),
                textTransform: "uppercase",
              }}
            >
              {getIndicatorLabel(item.indicator)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "18px",
            fontFamily: fontFamily.display,
            fontWeight: 600,
            color: colors.text,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontSize: "14px",
            fontFamily: fontFamily.body,
            color: colors.textSecondary,
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.excerpt}
        </p>

        {/* Footer: Date + Link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: spacing.unit(2),
            borderTop: `1px solid ${colors.borderSubtle}`,
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontFamily: fontFamily.body,
              color: colors.textMuted,
            }}
          >
            {item.date}
          </span>

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12px",
              fontFamily: fontFamily.body,
              color: isHovered ? colors.accent : colors.textSecondary,
              textDecoration: isHovered ? "underline" : "none",
              transition: `all ${transitions.normal}`,
              cursor: "pointer",
            }}
          >
            Ler mais →
          </a>
        </div>
      </div>
    </div>
  );
}
