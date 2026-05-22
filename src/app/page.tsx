import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { DashboardDemo } from "@/components/sections/DashboardDemo";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { projectsMock } from "@/data/projects-mock";

export default function Home() {
  return (
    <main className="pt-16">
      {/* M3 — Hero + CTA */}
      <Hero />

      {/* M4 — Dashboard Demo */}
      <DashboardDemo />

      {/* M5 — Project Showcase */}
      <section id="projetos" aria-label="Projetos">
        <ProjectShowcase projects={projectsMock} />
      </section>

      {/* M6 — Tech Stack + Social Proof */}
      <section id="tecnologias" aria-label="Tecnologias"></section>

      {/* M7 — Services + Tech Feed */}
      <section id="solucoes" aria-label="Soluções"></section>

      {/* M8 — CTA + Contato */}
      <CTASection />
    </main>
  );
}
