# CLAUDE.md — Nexus Labs AI Systems

Projeto: Landing page institucional premium da Nexus Labs AI Systems.
Referência completa: [docs/PRD.md](docs/PRD.md)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript (strict) |
| Estilização | Tailwind CSS v4 |
| Componentes | shadcn/ui (customizado) |
| Backend/DB | Supabase (PostgreSQL) |
| ORM | Prisma |
| E-mail | Resend |
| Deploy | Vercel |
| Automações | N8N |
| IA | Claude API / OpenAI |

---

## Estrutura de Pastas

```
c:\dev\Landing_Nexus\
├── src/
│   ├── app/                  # Next.js App Router (pages, layouts, API routes)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/              # Route handlers
│   ├── components/
│   │   ├── ui/               # shadcn/ui base components
│   │   ├── sections/         # Seções da landing (Hero, Showcase, etc.)
│   │   └── layout/           # Navbar, Footer, ChatWidget
│   ├── lib/
│   │   ├── supabase/         # Client e server clients Supabase
│   │   ├── resend/           # Email templates e helpers
│   │   └── utils.ts          # cn(), formatters, helpers gerais
│   ├── types/                # TypeScript interfaces e types globais
│   └── styles/
│       ├── globals.css       # Tokens CSS (variáveis de cor, fonte)
│       └── design-tokens.ts  # Design tokens como constantes TS
├── docs/
│   └── PRD.md
├── prisma/
│   └── schema.prisma
└── public/
    └── assets/
```

---

## Identidade Visual

### Paleta de Cores

```css
--background:   #0A0A0A   /* preto profundo */
--surface:      #111111   /* superfícies de cards */
--border:       #1E1E1E   /* bordas sutis */
--text-primary: #F5F5F5   /* texto principal */
--text-muted:   #6B6B6B   /* texto secundário */
--accent:       #CAFF33   /* chartreuse ácido — acento único */
--accent-dim:   #A8D400   /* acento hover/pressed */
```

### Tipografia

- **Display / Headlines**: `Inter` ou `Space Grotesk` — peso 700–900, tracking tight
- **Body**: `Inter` — peso 400–500
- **Mono / Dados**: `JetBrains Mono` ou `Geist Mono` — para métricas e código

### Princípios Visuais

**Permitido:**
- noise texture sutil no background
- reveal on scroll (Intersection Observer, sem libs pesadas)
- hover com linha accent (`border-accent`) ou cor chartreuse
- microinterações em `transition-all duration-200`
- grids modulares com espaçamento 8px base
- dashboards demonstrativos com dados simulados

**Proibido:**
- glassmorphism exagerado (sem `backdrop-blur` visível excessivo)
- neon glow / `text-shadow` colorido
- partículas flutuantes (sem `canvas` decorativo)
- gradient text colorido
- bordas excessivamente arredondadas (`rounded-3xl` em containers)
- animações sem propósito funcional

---

## Seções da Landing Page

| Seção | Componente | Prioridade |
|---|---|---|
| Navbar | `components/layout/Navbar.tsx` | P0 |
| Hero | `components/sections/Hero.tsx` | P0 |
| Dashboard Demo | `components/sections/DashboardDemo.tsx` | P0 |
| Showcase de Projetos | `components/sections/ProjectShowcase.tsx` | P0 |
| Tech Stack | `components/sections/TechStack.tsx` | P1 |
| Feed Tecnológico | `components/sections/TechFeed.tsx` | P1 |
| Logos / Clientes | `components/sections/SocialProof.tsx` | P1 |
| Serviços / Soluções | `components/sections/Services.tsx` | P1 |
| CTA Principal | `components/sections/CTASection.tsx` | P0 |
| Chatbot Widget | `components/layout/ChatWidget.tsx` | P2 |
| Footer | `components/layout/Footer.tsx` | P0 |

---

## Convenções de Código

- Componentes: `PascalCase` — `ProjectCard.tsx`, `HeroSection.tsx`
- Hooks: `camelCase` com prefixo `use` — `useScrollReveal.ts`
- Utilitários: `camelCase` — `formatMetric.ts`
- Types: sufixo `Props` ou `Type` — `ProjectCardProps`, `ProjectType`
- Server Components por padrão; `"use client"` apenas quando necessário
- Sem comentários óbvios; sem abstrações prematuras
- Sem `any` — tipagem estrita em todo o projeto

---

## Referências de Design

- **Linear** — minimalismo, tipografia forte, brutalismo elegante
- **Stripe** — estrutura editorial, hierarquia visual, autoridade corporativa
- **Vercel** — showcase técnico, cultura de engenharia, estética clean

---

## Variáveis de Ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=

# IA (futuro)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

---

## Milestones de Desenvolvimento

1. **Setup** — Next.js + Tailwind + shadcn/ui + design tokens + estrutura de pastas
2. **Layout Base** — Navbar, Footer, globals.css com identidade visual
3. **Hero + CTA** — seção principal com call-to-action
4. **Dashboard Demo** — componente visual com métricas simuladas
5. **Project Showcase** — grid de projetos com mockups
6. **Tech Stack + Social Proof** — logos e tecnologias
7. **Feed Tecnológico** — cards dinâmicos (estático primeiro, dinâmico depois)
8. **Formulário de Contato** — integrado ao Resend
9. **Chatbot Widget** — UI funcional (IA integrada depois)
10. **SEO + Performance** — metadata, OG tags, otimização de imagens
11. **Deploy Vercel** — CI/CD, variáveis de ambiente, domínio

---

> Nexus Labs AI Systems — desenvolvido com Claude Code
