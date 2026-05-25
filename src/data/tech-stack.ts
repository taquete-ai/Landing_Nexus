import { TechItemType, TechCategory } from "@/types/tech-stack";

export const techStackMock: TechItemType[] = [
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    description: "React framework para produção com SSR e App Router",
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    description: "Biblioteca JavaScript para UI componentes",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    description: "JavaScript com tipagem estática e segura",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    description: "Framework CSS utility-first para estilização rápida",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    description: "Runtime JavaScript para servidor e APIs",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    description: "Banco de dados relacional robusto e escalável",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "backend",
    description: "Backend open-source com Postgres e APIs em tempo real",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "backend",
    description: "Plataforma de pagamentos e fintech integrada",
  },
  {
    id: "claude",
    name: "Claude API",
    category: "ia",
    description: "Modelo de IA avançado da Anthropic para automação inteligente",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "ia",
    description: "Modelos GPT para processamento de linguagem natural",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    category: "ia",
    description: "Motor de busca com IA para pesquisa e síntese de informações",
  },
  {
    id: "canva",
    name: "Canva",
    category: "ia",
    description: "Plataforma criativa com IA integrada para design automatizado",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    category: "ia",
    description: "Ferramenta de IA para análise e processamento de dados",
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "ia",
    description: "Editor de código com IA integrada para desenvolvimento acelerado",
  },
  {
    id: "n8n",
    name: "N8N",
    category: "automacao",
    description: "Plataforma de automação workflow sem código",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "infra",
    description: "Plataforma de deploy para Next.js e edge computing",
  },
];

export const techCategories: Array<{ id: TechCategory; label: string }> = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ia", label: "IA" },
  { id: "automacao", label: "Automação" },
  { id: "infra", label: "Infraestrutura" },
];
