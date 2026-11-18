import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { DashboardDemo } from "@/components/sections/DashboardDemo";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { TechStack } from "@/components/sections/TechStack";
import { SocialProof } from "@/components/sections/SocialProof";
import { Services } from "@/components/sections/Services";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="pt-16">
      {/* M3 — Hero + CTA */}
      <Hero />

      {/* M4 — Dashboard Demo */}
      <DashboardDemo />

      {/* M5 — Project Showcase */}
      <section id="projetos" aria-label="Projetos">
        <ProjectShowcase projects={projects} />
      </section>

      {/* M6 — Tech Stack + Social Proof */}
      <section id="tecnologias" aria-label="Tecnologias">
        <TechStack />
        <SocialProof />
      </section>

      {/* M7 — Services (TechFeed fora da página até haver conteúdo real) */}
      <section id="solucoes" aria-label="Soluções">
        <Services />
      </section>

      {/* M8 — CTA + Contato */}
      <CTASection />
    </main>
  );
}
