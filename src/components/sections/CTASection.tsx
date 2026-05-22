"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTASection() {
  const { ref, isVisible } = useScrollReveal();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        });
        setFormState({ name: "", email: "", company: "" });
      } else {
        setFeedback({
          type: "error",
          message: "Erro ao enviar mensagem. Tente novamente.",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erro de conexão. Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contato"
      className={`relative py-24 transition-all duration-600 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-4"
      }`}
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-label="Seção CTA — Fale com a Nexus"
    >
      <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Headline */}
        <h2
          className={`mb-4 text-center font-display text-4xl sm:text-5xl font-bold transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "0.1s",
            letterSpacing: "-0.04em",
            color: "var(--color-text)",
          }}
        >
          Pronto para transformar sua operação?
        </h2>

        {/* Descrição */}
        <p
          className={`mb-10 text-center font-body transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "0.2s",
            color: "var(--color-text-secondary)",
          }}
        >
          Deixe seus dados e iniciaremos uma conversa sobre como a IA pode
          potencializar seus processos.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-5 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          {/* Nome */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md transition-all duration-200 font-body focus:outline-none"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                borderWidth: "1px",
                color: "var(--color-text)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md transition-all duration-200 font-body focus:outline-none"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                borderWidth: "1px",
                color: "var(--color-text)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            />
          </div>

          {/* Empresa */}
          <div>
            <input
              type="text"
              name="company"
              placeholder="Empresa"
              value={formState.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md transition-all duration-200 font-body focus:outline-none"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                borderWidth: "1px",
                color: "var(--color-text)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            />
          </div>

          {/* Botão CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-body font-semibold rounded-md hover:opacity-90 disabled:opacity-60 transition-opacity duration-200"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
          >
            {isLoading ? "Enviando..." : "Iniciar Conversa"}
          </button>

          {/* Feedback */}
          {feedback.type && (
            <div
              className="p-4 rounded-md text-sm font-body"
              style={{
                backgroundColor:
                  feedback.type === "success"
                    ? "rgba(46, 213, 115, 0.1)"
                    : "rgba(255, 71, 87, 0.1)",
                color:
                  feedback.type === "success"
                    ? "var(--color-positive)"
                    : "var(--color-negative)",
                borderColor:
                  feedback.type === "success"
                    ? "rgba(46, 213, 115, 0.3)"
                    : "rgba(255, 71, 87, 0.3)",
                borderWidth: "1px",
              }}
            >
              {feedback.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
