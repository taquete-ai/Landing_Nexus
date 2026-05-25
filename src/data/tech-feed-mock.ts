import { FeedItemType } from "@/types/services";

export const techFeedMock: FeedItemType[] = [
  {
    id: "1",
    category: "ia",
    title: "Claude 3.7 Surpassa Expectativas em Processamento Completo",
    excerpt:
      "Nova versão da Claude demonstra capacidades avançadas em raciocínio multi-etapas e análise técnica profunda.",
    date: "25 de mai",
    link: "https://anthropic.com/news",
    indicator: "new",
  },
  {
    id: "2",
    category: "automacao",
    title: "Automação 10x: Nova Geração de Workflows Intelligentes",
    excerpt:
      "Workflows construídos com lógica visual e IA reduzem tempo de execução em até 10x versus processos manuais.",
    date: "24 de mai",
    link: "https://n8n.io/blog",
    indicator: "trending",
  },
  {
    id: "3",
    category: "saas",
    title: "SaaS Escalável: Arquitetura para Milhões de Usuários",
    excerpt:
      "Padrões comprovados de infraestrutura, caching distribuído e data pipelines para crescimento exponencial.",
    date: "23 de mai",
    link: "https://vercel.com/blog",
  },
  {
    id: "4",
    category: "crm",
    title: "CRM AI-First: O Futuro da Inteligência Comercial",
    excerpt:
      "Sistemas de CRM evoluem para decisões automáticas, previsão de churn e otimização de pipelines em tempo real.",
    date: "22 de mai",
    link: "https://www.salesforce.com/blog",
  },
  {
    id: "5",
    category: "agentes",
    title: "Agentes Autônomos Multiétapas Ganham Produção",
    excerpt:
      "Agentes LLM multi-step atingem maturidade, automatizando processos complexos sem supervisão humana contínua.",
    date: "21 de mai",
    link: "https://openai.com/blog",
    indicator: "featured",
  },
  {
    id: "6",
    category: "infraestrutura",
    title: "Edge Computing: Infraestrutura Distribuída de Alta Performance",
    excerpt:
      "Processamento descentralizado reduz latência, melhora privacidade e distribui carga em zonas geográficas.",
    date: "20 de mai",
    link: "https://cloudflare.com/learning",
  },
];
