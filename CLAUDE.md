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

> Direção: **Editorial Brutalist × Fintech Premium**
> Referência de estúdio de design — não de template genérico de IA.

### Paleta de Cores

#### Backgrounds
```css
--bg:             #0C0C0E   /* fundo principal — quase preto com tint quente */
--surface:        #141416   /* cards, sidebar, áreas elevadas */
--surface-2:      #1A1A1E   /* hover states, featured cards */
--border:         #2A2A2E   /* bordas visíveis */
--border-subtle:  #1E1E22   /* divisores internos */
```

#### Texto
```css
--text:           #E8E8E8   /* títulos, texto primário */
--text-secondary: #8A8A8F   /* corpo, descrições */
--text-muted:     #555559   /* labels, placeholders, metadata */
```

#### Accent (uma cor só, com convicção)
```css
--accent:         #CAFF33   /* chartreuse ácido — CTAs, destaques, hover states */
```

Chartreuse é inesperado: não é cyan, não é roxo, não é o verde-teal que todo mundo usa. É reconhecível, tech-forward, impossível de ignorar.

#### Semânticas
```css
--positive:       #2ED573   /* sucesso, conversão, ganho */
--negative:       #FF4757   /* erro, perda, alerta */
--warm:           #FF6B35   /* negociação, urgência */
--cool:           #5B7FFF   /* novo, neutro, informativo */
```

### Tipografia

#### Fontes
- **Display**: `Syne` — peso 600–800, letter-spacing negativo em títulos (-1.5px a -2px)
- **Body**: `DM Sans` — peso 300–600, line-height 1.65
- **Mono/Dados**: `IBM Plex Mono` — peso 400–600, uppercase + tracking 0.1–0.2em para labels

#### Hierarquia
| Elemento | Fonte | Tamanho | Peso | Cor |
|---|---|---|---|---|
| H1 hero | Syne | 48–64px | 800 | `--text` |
| H2 seção | Syne | 28–42px | 700 | `--text` |
| H3 card | Syne | 18px | 600 | `--text` |
| Body | DM Sans | 14–17px | 400 | `--text-secondary` |
| Label | IBM Plex Mono | 10–11px | 500 | `--text-muted` — uppercase, tracking 0.15em |
| Métrica valor | Syne | 32px | 700 | `--text` |
| Métrica delta | IBM Plex Mono | 11px | 400 | semântica |
| Botão | DM Sans | 14px | 600 | `--bg` (em primary) |
| Index (01, 02) | IBM Plex Mono | 11px | 400 | `--text-muted` |

### Princípios de Design

1. **Contenção > Espetáculo** — um acento bem posicionado vale mais que 10 efeitos
2. **Dados como interface** — o pipeline é o visual; sem enfeite decorativo
3. **Tipografia com caráter** — fontes com opinião, não genéricas
4. **Brutalidade controlada** — edges afiados, grid modular, sem border-radius exagerado (máx. 12px)
5. **Textura > Brilho** — noise grain no fundo em vez de glow e blur

### Efeitos Permitidos

- **Noise texture** — SVG overlay no body, opacity 0.03
- **Reveal on scroll** — `translateY(16px) + opacity 0 → 0 + 1`, transition 0.6s ease, stagger 0.1s
- **Accent line on hover** — `::before` no topo do card, width `0 → 100%`, transition 0.4s
- **Pipeline bar animation** — width `0% → valor real`, transition 1.5s ease
- **Microinterações** — `transition-all duration-200`

### Proibido

- Glassmorphism / `backdrop-filter: blur()`
- Gradient text colorido
- Partículas flutuantes / `canvas` decorativo
- Neon glow / `text-shadow` colorido
- `border-radius` > 12px em containers
- Múltiplas cores competindo (1 accent basta)
- Animações sem propósito funcional
- `animate-float` / órbitas flutuantes

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

- **Linear** — minimalismo premium, tipografia forte, brutalismo elegante, motion minimalista
- **Stripe** — estrutura institucional, grids organizados, hierarquia visual, composição editorial
- **Vercel** — showcase técnico, cultura de engenharia, estética clean, interfaces orientadas a produto

> Design system versionado em `pipeflow-brand-guide-v2.md` (compartilhado entre projetos Nexus).

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
