import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="pt-16">
      {/* M3 — Hero + CTA */}
      <Hero />

      {/* M4 — Dashboard Demo */}
      <section id="dashboard" aria-label="Dashboard Demo"></section>

      {/* M5 — Project Showcase */}
      <section id="projetos" aria-label="Projetos"></section>

      {/* M6 — Tech Stack + Social Proof */}
      <section id="tecnologias" aria-label="Tecnologias"></section>

      {/* M7 — Services + Tech Feed */}
      <section id="solucoes" aria-label="Soluções"></section>

      {/* M8 — CTA + Contato */}
      <CTASection />
    </main>
  );
}
