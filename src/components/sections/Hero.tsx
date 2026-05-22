"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const metrics = [
  { value: "12", label: "Projetos Entregues" },
  { value: "8", label: "Empresas Atendidas" },
  { value: "8", label: "Tecnologias Premium" },
];

export function Hero() {
  const { ref, isVisible } = useScrollReveal();
  const router = useRouter();

  const handleScrollToProjetos = () => {
    const projetosSection = document.getElementById("projetos");
    if (projetosSection) {
      projetosSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactForm = () => {
    const ctaSection = document.getElementById("contato");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className={`relative min-h-[100vh] flex items-center justify-center pt-20 pb-16 transition-all duration-600 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-4"
      }`}
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-label="Seção Hero — Nexus Labs AI Systems"
    >
      <div className="relative w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Badge de Posicionamento */}
        <div
          className={`mb-8 inline-block transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div
            className="px-3 py-1.5 rounded-md"
            style={{
              borderColor: "var(--color-border)",
              borderWidth: "1px",
            }}
          >
            <span
              className="text-xs font-mono font-medium uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              AI Systems Laboratory
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`mb-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "0.2s",
            letterSpacing: "-0.04em",
            color: "var(--color-text)",
          }}
        >
          Engenharia de <br />
          <span style={{ color: "var(--color-accent)" }}>Sistemas de IA</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`mb-8 max-w-2xl text-lg sm:text-xl font-body leading-relaxed transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "0.3s",
            color: "var(--color-text-secondary)",
          }}
        >
          Nexus Labs constrói soluções de IA em escala institucional. Automação
          inteligente, agentes autônomos e dashboards operacionais para empresas
          que competem em tempo real.
        </p>

        {/* CTAs */}
        <div
          className={`mb-16 flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <button
            onClick={handleScrollToProjetos}
            className="px-8 py-3 font-body font-semibold rounded-md hover:opacity-90 transition-opacity duration-200"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
            aria-label="Conheça os Projetos"
          >
            Conheça os Projetos
          </button>
          <button
            onClick={handleContactForm}
            className="px-8 py-3 font-body font-semibold rounded-md transition-all duration-200"
            style={{
              borderColor: "var(--color-border)",
              borderWidth: "1px",
              color: "var(--color-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
            aria-label="Fale com a Nexus"
          >
            Fale com a Nexus
          </button>
        </div>

        {/* Métricas Institucionais */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span
                className="text-3xl sm:text-4xl font-display font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {metric.value}
              </span>
              <span
                className="mt-2 text-xs font-mono uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <div className="animate-pulse">
            <ChevronDown
              className="w-6 h-6"
              style={{ color: "var(--color-accent)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
