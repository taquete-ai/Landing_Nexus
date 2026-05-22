"use client";

import { useState, useEffect, useRef } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectShowcaseProps, ProjectCategory } from "@/types/project";
import { projectCategories } from "@/data/projects-mock";
import { colors, fontFamily, radius, transitions, spacing } from "@/styles/design-tokens";

export function ProjectShowcase({
  projects,
  defaultCategory = "todas",
}: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "todas">(
    defaultCategory
  );
  const [filteredProjects, setFilteredProjects] = useState(projects);
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

  /* Filtro de projetos */
  useEffect(() => {
    if (activeCategory === "todas") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      );
    }
  }, [activeCategory, projects]);

  /* Featured project (primeiro com featured=true) */
  const featuredProject = filteredProjects.find((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

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
            marginBottom: spacing.unit(8),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `all ${transitions.reveal}`,
          }}
        >
          <h2
            style={{
              fontFamily: fontFamily.display,
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "700",
              color: colors.text,
              letterSpacing: "-1.5px",
              marginBottom: spacing.unit(2),
            }}
          >
            Portfólio de Projetos
          </h2>
          <p
            style={{
              fontFamily: fontFamily.body,
              fontSize: "16px",
              fontWeight: "400",
              color: colors.textSecondary,
              lineHeight: "1.65",
              maxWidth: "600px",
            }}
          >
            Soluções operacionais em produção. Cada projeto representa capacidade técnica real,
            escalabilidade empresarial e expertise profunda em engenharia de sistemas.
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
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as ProjectCategory | "todas")}
              style={{
                padding: "10px 16px",
                backgroundColor:
                  activeCategory === cat.id ? colors.accent : "transparent",
                border: `1px solid ${
                  activeCategory === cat.id ? colors.accent : colors.border
                }`,
                borderRadius: radius.md,
                fontFamily: fontFamily.body,
                fontSize: "13px",
                fontWeight: "500",
                color:
                  activeCategory === cat.id ? colors.bg : colors.textSecondary,
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

        {/* Grid editorial — Featured project em destaque */}
        {featuredProject && (
          <div
            style={{
              marginBottom: spacing.unit(10),
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: `all ${transitions.reveal}`,
              transitionDelay: "200ms",
            }}
          >
            <div
              style={{
                marginBottom: spacing.unit(3),
              }}
            >
              <span
                style={{
                  fontFamily: fontFamily.mono,
                  fontSize: "11px",
                  fontWeight: "600",
                  color: colors.accent,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Projeto Em Destaque
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: spacing.unit(3),
              }}
              className="max-lg:grid-cols-1"
            >
              <ProjectCard project={featuredProject} featured={true} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: spacing.unit(2),
                }}
              >
                <h3
                  style={{
                    fontFamily: fontFamily.display,
                    fontSize: "32px",
                    fontWeight: "700",
                    color: colors.text,
                    letterSpacing: "-1px",
                    lineHeight: "1.3",
                  }}
                >
                  {featuredProject.title}
                </h3>
                <p
                  style={{
                    fontFamily: fontFamily.body,
                    fontSize: "16px",
                    fontWeight: "400",
                    color: colors.textSecondary,
                    lineHeight: "1.65",
                  }}
                >
                  {featuredProject.longDescription}
                </p>

                {/* Metrics detalhadas no featured */}
                {featuredProject.metrics && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: spacing.unit(2),
                      marginTop: spacing.unit(3),
                      paddingTop: spacing.unit(3),
                      borderTop: `1px solid ${colors.borderSubtle}`,
                    }}
                  >
                    {featuredProject.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <div
                          style={{
                            fontFamily: fontFamily.mono,
                            fontSize: "11px",
                            fontWeight: "600",
                            color: colors.textMuted,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                          }}
                        >
                          {metric.label}
                        </div>
                        <div
                          style={{
                            fontFamily: fontFamily.display,
                            fontSize: "24px",
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

                {/* Stack tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: spacing.unit(1),
                    marginTop: spacing.unit(2),
                  }}
                >
                  {featuredProject.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: `${colors.accent}15`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: radius.sm,
                        fontFamily: fontFamily.mono,
                        fontSize: "11px",
                        fontWeight: "500",
                        color: colors.textSecondary,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid assimétrico — Projetos regulares */}
        {regularProjects.length > 0 && (
          <div>
            {regularProjects.length > 0 && (
              <div
                style={{
                  marginBottom: spacing.unit(3),
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
                  Outros Projetos
                </span>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: spacing.unit(3),
              }}
            >
              {regularProjects.map((project, idx) => (
                <div
                  key={project.id}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(16px)",
                    transition: `all ${transitions.reveal}`,
                    transitionDelay: `${300 + idx * 50}ms`,
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div
            style={{
              padding: spacing.unit(8),
              textAlign: "center",
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.lg,
            }}
          >
            <p
              style={{
                fontFamily: fontFamily.body,
                fontSize: "16px",
                color: colors.textSecondary,
              }}
            >
              Nenhum projeto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
