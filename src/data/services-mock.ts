import { ServiceType } from "@/types/services";

export const servicesMock: ServiceType[] = [
  {
    id: "1",
    name: "IA & Agentes Inteligentes",
    category: "ia",
    description:
      "Automação conversacional, classificação de leads, agentes operacionais e fluxos inteligentes com IA.",
    icon: "brain",
  },
  {
    id: "2",
    name: "Automação Empresarial",
    category: "automacao",
    description:
      "Integrações, redução de tarefas manuais e operações automatizadas via N8N e fluxos customizados.",
    icon: "zap",
  },
  {
    id: "3",
    name: "CRM & Operações Comerciais",
    category: "crm",
    description:
      "Estruturação de pipelines, inteligência comercial e organização operacional com PipeFlow.",
    icon: "layout",
  },
  {
    id: "4",
    name: "SaaS & MicroSaaS",
    category: "saas",
    description:
      "Desenvolvimento de plataformas escaláveis, produtos digitais modernos e infraestrutura multi-tenant.",
    icon: "layers",
  },
  {
    id: "5",
    name: "Dashboards Operacionais",
    category: "dashboards",
    description:
      "Visualização estratégica de métricas, KPIs e operações em tempo real com painéis inteligentes.",
    icon: "gauge",
  },
  {
    id: "6",
    name: "Integrações & APIs",
    category: "integracao",
    description:
      "Conexão entre sistemas, WhatsApp, CRMs, automações e infraestrutura digital distribuída.",
    icon: "link",
  },
];
