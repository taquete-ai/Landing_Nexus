/**
 * Nexus Labs AI Systems — Projects Mock Data
 * Portfolio de 8 projetos com narrativa técnica premium
 */

import { ProjectType } from "@/types/project";

export const projectsMock: ProjectType[] = [
  {
    id: "1",
    title: "Nexus Analytics Engine",
    description: "Plataforma de BI em tempo real com análise preditiva",
    longDescription:
      "Engine analítico proprietário que processa 480+ eventos/dia com latência sub-segundo. Machine learning integrado para forecast de métricas críticas. Pipeline modular com Kafka, ClickHouse e Redis.",
    category: "dashboard",
    featured: true,
    stack: ["Next.js", "Python", "ClickHouse", "Kafka", "TensorFlow"],
    metrics: [
      { label: "Eventos/dia", value: "480+" },
      { label: "Latência", value: "<100ms" },
      { label: "Uptime", value: "99.99%" },
    ],
    imageUrl: "/projects/analytics-engine.png",
    gradient: { from: "#1A1A1E", to: "#0C0C0E" },
    status: "live",
  },
  {
    id: "2",
    title: "PipeFlow CRM",
    description: "Infraestrutura operacional proprietária de Nexus Labs AI Systems",
    longDescription:
      "PipeFlow é a infraestrutura CRM propriedade de Nexus Labs AI Systems — sistema multicanal com orquestração de workflows inteligentes, integrações nativas e dashboard operacional em tempo real. Suporta multi-channel (email, WhatsApp, SMS, webhooks) com roteamento automático baseado em IA para maximizar conversão. Núcleo da operação: captura de leads, automações de vendas, integração com N8N e Claude API para diagnósticos conversacionais. Disclaimer: PipeFlow é uma solução proprietária desenvolvida e mantida por Nexus Labs — não é um produto open-source ou SaaS terceiro.",
    category: "crm",
    featured: false,
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "N8N", "Claude API"],
    metrics: [
      { label: "Contatos", value: "980+" },
      { label: "Automações", value: "8" },
      { label: "Taxa conversão", value: "27.8%" },
    ],
    imageUrl: "/projects/pipeflow-crm.png",
    gradient: { from: "#141416", to: "#0C0C0E" },
    status: "live",
  },
  {
    id: "3",
    title: "Automação Inteligente N8N",
    description: "Orquestrador de workflows com 200+ integrações",
    longDescription:
      "Plataforma de automação visual com suporte nativo a APIs, webhooks e lógica condicional avançada. Integração profunda com Claude API para workflows cognitivos.",
    category: "automacao",
    stack: ["N8N", "Node.js", "PostgreSQL", "Claude API"],
    metrics: [
      { label: "Workflows ativos", value: "9" },
      { label: "Tempo economia", value: "18h/mês" },
      { label: "Taxa sucesso", value: "99.8%" },
    ],
    imageUrl: "/projects/n8n-automation.png",
    gradient: { from: "#1A1A1E", to: "#0C0C0E" },
    status: "live",
  },
  {
    id: "4",
    title: "Agentes IA Autônomos",
    description: "Agentes Claude com memória e contexto persistente",
    longDescription:
      "Framework proprietário de agentes IA com capacidades de raciocínio, planejamento e execução. Memória persistente, integração com ferramentas externas e monitoring avançado.",
    category: "agentes-ia",
    featured: true,
    stack: ["Claude API", "TypeScript", "Supabase", "Redis"],
    metrics: [
      { label: "Agentes em produção", value: "9" },
      { label: "Taxa acerto", value: "94.2%" },
      { label: "Tempo resposta", value: "2.3s" },
    ],
    imageUrl: "/projects/ai-agents.png",
    gradient: { from: "#141416", to: "#0C0C0E" },
    status: "live",
  },
  {
    id: "5",
    title: "SaaS Platform Builder",
    description: "Scaffolding empresarial para aplicações B2B",
    longDescription:
      "Framework completo para lançar SaaS: auth multi-tenant, billing integrado, RLS em database, observability nativa. Reduz tempo go-to-market de 6 meses para 4 semanas.",
    category: "saas",
    stack: ["Next.js", "Supabase", "Stripe", "Vercel", "TypeScript"],
    metrics: [
      { label: "Aplicações built", value: "12+" },
      { label: "Time-to-market", value: "-75%" },
      { label: "Clientes SaaS", value: "8" },
    ],
    imageUrl: "/projects/saas-builder.png",
    gradient: { from: "#1A1A1E", to: "#0C0C0E" },
    status: "beta",
  },
  {
    id: "6",
    title: "Dashboard Operacional Nexus",
    description: "Visualização em tempo real de métricas e KPIs",
    longDescription:
      "Dashboard institucional com 12 widgets, alertas inteligentes e customização por user. Suporta drill-down, comparações históricas e predições com ML.",
    category: "dashboard",
    stack: ["React", "D3.js", "Recharts", "Supabase", "Real-time subscriptions"],
    metrics: [
      { label: "Dados/segundo", value: "480+" },
      { label: "Widgets", value: "12" },
      { label: "Refresh time", value: "200ms" },
    ],
    imageUrl: "/projects/dashboard-nexus.png",
    gradient: { from: "#141416", to: "#0C0C0E" },
    status: "live",
  },
  {
    id: "7",
    title: "API Gateway Premium",
    description: "Middleware de rate limiting, caching e autenticação",
    longDescription:
      "Gateway arquiteturado para escala com suporte a load balancing, circuit breaking e observability completa. Proteção contra abuse com ML e análise comportamental.",
    category: "integracao",
    stack: ["Node.js", "Express", "Redis", "PostgreSQL", "Prometheus"],
    metrics: [
      { label: "Requests/dia", value: "28.8K" },
      { label: "P99 latência", value: "45ms" },
      { label: "Uptime", value: "99.99%" },
    ],
    imageUrl: "/projects/api-gateway.png",
    gradient: { from: "#1A1A1E", to: "#0C0C0E" },
    status: "live",
  },
  {
    id: "8",
    title: "Sistema de Recomendação IA",
    description: "Engine de recomendação com collaborative filtering",
    longDescription:
      "Algoritmo proprietário com Matrix Factorization e Graph Neural Networks. Otimizado para latência baixa em produção com A/B testing integrado.",
    category: "agentes-ia",
    stack: ["Python", "TensorFlow", "Kafka", "Redis", "PostgreSQL"],
    metrics: [
      { label: "Acurácia", value: "91.7%" },
      { label: "CTR lift", value: "+34%" },
      { label: "Latência", value: "<50ms" },
    ],
    imageUrl: "/projects/recommendation-engine.png",
    gradient: { from: "#141416", to: "#0C0C0E" },
    status: "live",
  },
];

export const projectCategories = [
  { id: "todas", label: "Todos os Projetos" },
  { id: "crm", label: "CRM" },
  { id: "automacao", label: "Automação" },
  { id: "agentes-ia", label: "Agentes IA" },
  { id: "saas", label: "SaaS" },
  { id: "dashboard", label: "Dashboard" },
  { id: "integracao", label: "Integração" },
] as const;
