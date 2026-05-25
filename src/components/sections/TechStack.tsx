"use client";

import React, { useState, useEffect, useRef } from "react";
import { techStackMock, techCategories } from "@/data/tech-stack";
import { TechCategory } from "@/types/tech-stack";
import { colors, fontFamily, radius, transitions, spacing } from "@/styles/design-tokens";

const TechIcon = ({ id }: { id: string }) => {
  const icons: Record<string, React.ReactNode> = {
    nextjs: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fontWeight="800" fill="currentColor">
          ▲
        </text>
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(0)" />
        <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(60)" />
        <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(120)" />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 48 48" fill="#3178C6" className="w-12 h-12">
        <rect x="0" y="0" width="48" height="48" fill="#3178C6" />
        <text x="24" y="32" dominantBaseline="middle" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">
          TS
        </text>
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 54 33" className="w-12 h-12" fill="none">
        <path d="M27 0C12.09 0 0 5.373 0 12c0 4.373 5.406 8.17 13.5 10.371-1.688-2.496-2.703-5.41-2.703-8.371 0-8.284 6.716-15 15-15" fill="#06B6D4" />
        <path d="M27 33C41.91 33 54 27.627 54 21c0-4.373-5.406-8.17-13.5-10.371 1.688 2.496 2.703 5.41 2.703 8.371 0 8.284-6.716 15-15 15" fill="#06B6D4" />
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 40 24" className="w-12 h-12" fill="#339933">
        <path d="M10 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm24 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-12-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
      </svg>
    ),
    postgresql: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="#336791">
        <circle cx="24" cy="24" r="20" fill="#336791" />
        <text x="24" y="30" dominantBaseline="middle" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">
          PG
        </text>
      </svg>
    ),
    supabase: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#3ECF8E">
        <path d="M12 2l9 5.5v9L12 22l-9-5.5v-9L12 2z" />
      </svg>
    ),
    stripe: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="#5469D4">
        <rect width="48" height="48" fill="#5469D4" />
        <text x="24" y="32" dominantBaseline="middle" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">
          S
        </text>
      </svg>
    ),
    claude: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#CAFF33">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="12" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">
          AI
        </text>
      </svg>
    ),
    openai: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#00A67E">
        <circle cx="12" cy="12" r="10" fill="#00A67E" />
        <text x="12" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
          GP
        </text>
      </svg>
    ),
    perplexity: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#20808D">
        <circle cx="12" cy="12" r="10" fill="#20808D" />
        <text x="12" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
          PX
        </text>
      </svg>
    ),
    canva: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#00C4CC">
        <rect width="24" height="24" fill="#00C4CC" rx="4" />
        <text x="12" y="17" dominantBaseline="middle" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">
          Ca
        </text>
      </svg>
    ),
    openclaw: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#FF4500">
        <rect width="24" height="24" fill="#FF4500" rx="4" />
        <text x="12" y="17" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
          OC
        </text>
      </svg>
    ),
    cursor: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" fill="#1C1C1E" rx="4" />
        <path d="M12 7v10M7 12h10" stroke="#CAFF33" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    n8n: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#FF6B35">
        <rect width="24" height="24" fill="#FF6B35" rx="4" />
        <text x="12" y="17" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
          n8
        </text>
      </svg>
    ),
    vercel: (
      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
        <path d="M12 2l9 15H3l9-15z" fill="currentColor" />
      </svg>
    ),
  };

  return icons[id] || null;
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | "todas">("todas");
  const [filteredTechs, setFilteredTechs] = useState(techStackMock);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Animação de revelação ao scroll */
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

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  /* Filtro de tecnologias */
  useEffect(() => {
    if (activeCategory === "todas") {
      setFilteredTechs(techStackMock);
    } else {
      setFilteredTechs(techStackMock.filter((t) => t.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      style={{
        paddingTop: spacing.unit(12),
        paddingBottom: spacing.unit(12),
        backgroundColor: colors.bg,
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: `0 ${spacing.unit(2)}` }}>
        {/* Header */}
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
              Stack Tecnológico
            </span>
          </div>
          <h2
            style={{
              fontFamily: fontFamily.display,
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "700",
              color: colors.text,
              letterSpacing: "-1.5px",
              marginBottom: spacing.unit(3),
            }}
          >
            Ferramentas de Laboratório
          </h2>
          <p
            style={{
              fontFamily: fontFamily.body,
              fontSize: "16px",
              fontWeight: "400",
              color: colors.textSecondary,
              lineHeight: "1.65",
              maxWidth: "640px",
            }}
          >
            Domínio operacional em tecnologias enterprise. Cada ferramenta foi selecionada por capacidade técnica real, escalabilidade comprovada e integração estratégica no ecossistema da Nexus.
          </p>
        </div>

        {/* Filtro por categoria */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: spacing.unit(1.5),
            marginBottom: spacing.unit(10),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `all ${transitions.reveal}`,
            transitionDelay: "100ms",
          }}
        >
          <button
            onClick={() => setActiveCategory("todas")}
            style={{
              padding: "10px 16px",
              backgroundColor: activeCategory === "todas" ? colors.accent : "transparent",
              border: `1px solid ${activeCategory === "todas" ? colors.accent : colors.border}`,
              borderRadius: radius.md,
              fontFamily: fontFamily.body,
              fontSize: "13px",
              fontWeight: "500",
              color: activeCategory === "todas" ? colors.bg : colors.textSecondary,
              cursor: "pointer",
              transition: `all ${transitions.normal}`,
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== "todas") {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.borderColor = colors.accent;
                target.style.color = colors.accent;
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== "todas") {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.borderColor = colors.border;
                target.style.color = colors.textSecondary;
              }
            }}
          >
            Todas
          </button>

          {techCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "10px 16px",
                backgroundColor: activeCategory === cat.id ? colors.accent : "transparent",
                border: `1px solid ${activeCategory === cat.id ? colors.accent : colors.border}`,
                borderRadius: radius.md,
                fontFamily: fontFamily.body,
                fontSize: "13px",
                fontWeight: "500",
                color: activeCategory === cat.id ? colors.bg : colors.textSecondary,
                cursor: "pointer",
                transition: `all ${transitions.normal}`,
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.borderColor = colors.accent;
                  target.style.color = colors.accent;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id) {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.borderColor = colors.border;
                  target.style.color = colors.textSecondary;
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de tecnologias */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: spacing.unit(3),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `all ${transitions.reveal}`,
            transitionDelay: "200ms",
          }}
        >
          {filteredTechs.map((tech, idx) => (
            <div
              key={tech.id}
              style={{
                position: "relative",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition: `all ${transitions.reveal}`,
                transitionDelay: `${300 + idx * 50}ms`,
              }}
            >
              <TechCard tech={tech} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCard({ tech }: { tech: (typeof techStackMock)[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        padding: spacing.unit(3),
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.unit(2),
        cursor: "pointer",
        transition: `all ${transitions.normal}`,
        boxShadow: isHovered ? `0 0 24px rgba(202, 255, 51, 0.12)` : "none",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Accent line — topo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "3px",
          width: isHovered ? "100%" : "0",
          backgroundColor: colors.accent,
          borderRadius: `${radius.md}px ${radius.md}px 0 0`,
          transition: `width ${transitions.accentLine}`,
          zIndex: 10,
        }}
      />

      {/* Ícone */}
      <div
        style={{
          color: isHovered ? colors.accent : colors.text,
          transition: `color ${transitions.normal}`,
        }}
      >
        <TechIcon id={tech.id} />
      </div>

      {/* Nome da tecnologia */}
      <h3
        style={{
          fontFamily: fontFamily.mono,
          fontSize: "11px",
          fontWeight: "600",
          color: isHovered ? colors.accent : colors.text,
          letterSpacing: "0.05em",
          textAlign: "center",
          transition: `color ${transitions.normal}`,
          textTransform: "uppercase",
        }}
      >
        {tech.name}
      </h3>

      {/* Descrição — visível ao hover */}
      {isHovered && (
        <p
          style={{
            fontFamily: fontFamily.body,
            fontSize: "12px",
            fontWeight: "400",
            color: colors.textSecondary,
            lineHeight: "1.5",
            textAlign: "center",
            marginTop: spacing.unit(1),
            opacity: 0.9,
          }}
        >
          {tech.description}
        </p>
      )}
    </div>
  );
}
