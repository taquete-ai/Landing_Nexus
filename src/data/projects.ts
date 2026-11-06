/**
 * Nexus Labs AI Systems — Portfólio real
 * Só entram projetos concluídos. Não inventar métricas: se não for número medido, não coloque em `metrics`.
 */

import { ProjectType } from "@/types/project";

export const projects: ProjectType[] = [
  {
    id: "pipeflow",
    title: "PipeFlow Pro",
    description: "CRM SaaS completo, desenvolvido e mantido pela Nexus",
    longDescription:
      "CRM SaaS completo e funcional: captura de leads, pipeline de vendas e automações com WhatsApp e N8N. É a infraestrutura que a própria Nexus usa para atender seus contatos. Solução proprietária desenvolvida e mantida pela Nexus Labs.",
    category: "crm",
    featured: true,
    stack: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
    gradient: { from: "#141416", to: "#0C0C0E" },
    status: "live",
  },
  {
    id: "nexus-dashboard",
    title: "Nexus Dashboard",
    description: "Painel de gestão do PipeFlow, desenvolvido pela Nexus",
    longDescription:
      "Dashboard de gestão e acompanhamento ligado ao PipeFlow, desenvolvido e mantido pela Nexus Labs.",
    category: "dashboard",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    gradient: { from: "#1A1A1E", to: "#0C0C0E" },
    status: "completed",
  },
];

const allCategories = [
  { id: "crm", label: "CRM" },
  { id: "automacao", label: "Automação" },
  { id: "agentes-ia", label: "Agentes IA" },
  { id: "saas", label: "SaaS" },
  { id: "dashboard", label: "Dashboard" },
  { id: "integracao", label: "Integração" },
] as const;

/** Só categorias que têm ao menos um projeto — evita filtro que leva a lista vazia. */
export const projectCategories = [
  { id: "todas", label: "Todos os Projetos" },
  ...allCategories.filter((c) => projects.some((p) => p.category === c.id)),
] as const;
