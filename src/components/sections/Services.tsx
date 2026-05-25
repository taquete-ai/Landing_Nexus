"use client";

import { useEffect, useRef, useState } from "react";
import { servicesMock } from "@/data/services-mock";
import { colors, fontFamily, radius, transitions, spacing } from "@/styles/design-tokens";

const ServiceIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "brain":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 4c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm6 15h-12v2h12v-2z"
            fill="currentColor"
          />
        </svg>
      );
    case "zap":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 2L2 16h7l7 7 7-7h7L16 2z"
            fill="currentColor"
          />
        </svg>
      );
    case "layout":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
          <line x1="2" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="10" x2="12" y2="30" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "layers":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M2 10L16 18L30 10M2 16L16 24L30 16M16 2L2 10L16 18L30 10L16 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "gauge":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="18" r="12" stroke="currentColor" strokeWidth="2" />
          <path d="M16 18L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="18" r="2" fill="currentColor" />
          <path d="M10 18A6 6 0 0 0 22 18" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </svg>
      );
    case "link":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M12 8H6C4.89543 8 4 8.89543 4 10V26C4 27.1046 4.89543 28 6 28H22C23.1046 28 24 27.1046 24 26V20M20 4H28V12M28 4L16 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

export function Services() {
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
      ref={sectionRef}
      style={{
        paddingTop: spacing.unit(12),
        paddingBottom: spacing.unit(12),
        background: colors.bg,
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: `0 ${spacing.unit(3)}px` }}>
        {/* Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `all ${transitions.reveal}`,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontFamily: fontFamily.display,
              fontWeight: 700,
              letterSpacing: "-1.5px",
              color: colors.text,
              marginBottom: spacing.unit(2),
            }}
          >
            Serviços Premium
          </h2>
          <p
            style={{
              fontSize: "16px",
              fontFamily: fontFamily.body,
              color: colors.textSecondary,
              marginBottom: spacing.unit(8),
              maxWidth: "600px",
              lineHeight: 1.65,
            }}
          >
            Soluções integradas que transformam operações em vantagem competitiva. Da IA ao edge,
            engineering puro.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: spacing.unit(3),
            marginTop: spacing.unit(6),
          }}
        >
          {servicesMock.map((service, idx) => (
            <ServiceCard key={service.id} service={service} isVisible={isVisible} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: (typeof servicesMock)[0];
  isVisible: boolean;
  index: number;
}

function ServiceCard({ service, isVisible, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
          padding: spacing.unit(6),
          background: isHovered ? colors.surface2 : colors.surface,
          border: `1px solid ${colors.border}`,
          borderLeft: `${isHovered ? 4 : 0}px solid ${colors.accent}`,
          borderRadius: `${radius.lg}px`,
          transition: `all ${transitions.accentLine}`,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: spacing.unit(3),
        }}
      >
        {/* Icon */}
        <div
          style={{
            color: isHovered ? colors.accent : colors.textSecondary,
            transition: `color ${transitions.accentLine}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <ServiceIcon icon={service.icon} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "18px",
            fontFamily: fontFamily.display,
            fontWeight: 600,
            color: colors.text,
            margin: 0,
          }}
        >
          {service.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            fontFamily: fontFamily.body,
            color: colors.textSecondary,
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
          }}
        >
          {service.description}
        </p>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            padding: `${spacing.unit(0.5)}px ${spacing.unit(1.5)}px`,
            background: colors.surface2,
            border: `1px solid ${colors.border}`,
            borderRadius: `${radius.md}px`,
            fontSize: "10px",
            fontFamily: fontFamily.mono,
            fontWeight: 500,
            color: colors.textSecondary,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            width: "fit-content",
          }}
        >
          {service.category}
        </div>
      </div>
    </div>
  );
}
