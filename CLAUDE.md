# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Projeto

Landing page institucional premium da **Nexus Labs AI Systems**.
Referência completa: [docs/PRD.md](docs/PRD.md) · Milestones: [docs/PLAN.md](docs/PLAN.md)

---

## Comandos

```bash
npm run dev        # dev server com Turbopack (porta padrão 3000)
npm run build      # build de produção
npm run lint       # ESLint
npm run format     # Prettier (formata todos os arquivos)
```

Não há testes automatizados no projeto atualmente.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript strict |
| Estilização | Tailwind CSS v4 |
| Componentes | shadcn/ui customizado |
| Backend CRM | PipeFlow CRM (via API — sem DB local) |
| IA | Claude API `claude-haiku-4-5-20251001` / OpenAI |
| Deploy | Vercel |
| Automações | N8N (downstream no PipeFlow) |

**Nexus é stateless — sem banco de dados próprio, sem Prisma, sem Supabase.**

---

## Arquitetura

### Fluxo de leads

```
CTASection (form) → POST /api/contact → PipeFlow /api/leads/ingest (Bearer token)
ChatWidget (M9)   → POST /api/chat (Claude Haiku) → coleta nome/email → POST /api/contact → PipeFlow
```

`/api/contact` lê `PIPEFLOW_API_URL` e `PIPEFLOW_INGEST_TOKEN` do ambiente. Se ausentes, retorna 503. Erros de billing do PipeFlow (402) são mapeados para 503 para não expor detalhes ao visitante.

### Componentes e responsabilidades

- **`src/app/page.tsx`** — orquestra as seções na ordem da página
- **`src/app/layout.tsx`** — fontes Google (Syne, DM Sans, IBM Plex Mono via CSS vars), Navbar + Footer globais, metadata/OG
- **`src/components/sections/`** — uma seção por arquivo; cada uma usa `useScrollReveal` para animação de entrada
- **`src/components/layout/`** — Navbar (scroll-aware, menu mobile), Footer, ChatWidget (M9 — ainda não implementado)
- **`src/components/sections/dashboard/`** — sub-componentes do DashboardDemo: MetricCard, PipelineBar, SystemStatus, MiniChart, ActivityFeed — todos alimentados por `src/data/dashboard-mock.ts`
- **`src/data/projects-mock.ts`** — fonte de dados do ProjectShowcase; PipeFlow está no id `"2"` com disclaimer oficial
- **`src/styles/design-tokens.ts`** — constantes TS espelhando os tokens CSS; use para referências em lógica, não em Tailwind

### Tokens de design no Tailwind v4

Os tokens estão declarados em `src/app/globals.css` via `@theme`. No Tailwind v4 o prefixo muda:

```tsx
// CSS var:        --color-bg  →  Tailwind class: bg-bg
// CSS var:  --color-surface  →  Tailwind class: bg-surface
// CSS var:   --color-accent  →  Tailwind class: text-accent, bg-accent
// CSS var:    --font-display  →  Tailwind class: font-display
// CSS var:       --font-mono  →  Tailwind class: font-mono
```

O `--color-accent` é mapeado via `@theme inline` do shadcn — a classe Tailwind é `accent`, não `accent-[#caff33]`.

### `useScrollReveal`

Hook de animação de entrada (IntersectionObserver). Uso padrão em seções:

```tsx
const { ref, isVisible } = useScrollReveal();
<section ref={ref as React.RefObject<HTMLElement>}
  className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
```

Fires once (unobserves após primeira intersecção). Stagger manual com `transition-delay`.

---

## Identidade Visual

**Direção: Editorial Brutalist × Fintech Premium** (ref: Linear, Stripe, Vercel — não template genérico de IA)

### Paleta

```css
--color-bg:            #0c0c0e   /* fundo principal */
--color-surface:       #141416   /* cards, áreas elevadas */
--color-surface-2:     #1a1a1e   /* hover states, featured cards */
--color-border:        #2a2a2e
--color-text:          #e8e8e8
--color-text-secondary:#8a8a8f
--color-text-muted:    #555559
--color-accent:        #caff33   /* chartreuse — único accent, usado com convicção */
--color-positive:      #2ed573
--color-negative:      #ff4757
--color-warm:          #ff6b35
--color-cool:          #5b7fff
```

### Tipografia

| Elemento | Fonte | Tamanho | Peso |
|---|---|---|---|
| H1 hero | Syne (`font-display`) | clamp(48px,6vw,64px) | 800, tracking -2px |
| H2 seção | Syne | clamp(28px,4vw,42px) | 700, tracking -1.5px |
| H3 card | Syne | 18px | 600 |
| Body | DM Sans (`font-body`) | 14–17px | 400, line-height 1.65 |
| Label/Index | IBM Plex Mono (`font-mono`) | 10–11px | 500, uppercase, tracking 0.15em |
| Métrica | Syne | 32px | 700, tracking -1px |
| Botão primário | DM Sans | 14px | 600, cor `--color-bg` |

### Efeitos permitidos

- Noise texture — SVG overlay, `opacity: 0.03`
- Reveal on scroll — `translateY(16px) + opacity 0 → 0 + 1`, 600ms ease
- Accent line on hover — `::before` topo do card, `width: 0 → 100%`, 400ms
- Pipeline bar — `width: 0% → valor`, 1500ms ease
- Microinterações — `transition-all duration-200`

### Proibido

`backdrop-filter: blur()` · gradient text colorido · partículas/canvas decorativo · `text-shadow` colorido · `border-radius > 12px` em containers · múltiplas cores accent · `animate-float`

---

## Seções da Landing

| Seção | Componente | Status |
|---|---|---|
| Navbar | `components/layout/Navbar.tsx` | ✅ |
| Hero | `components/sections/Hero.tsx` | ✅ |
| Dashboard Demo | `components/sections/DashboardDemo.tsx` | ✅ |
| Project Showcase | `components/sections/ProjectShowcase.tsx` | ✅ |
| CTA Principal | `components/sections/CTASection.tsx` | ✅ |
| Tech Stack + Social Proof | `components/sections/TechStack.tsx` / `SocialProof.tsx` | M6 |
| Serviços + Feed Tecnológico | `components/sections/Services.tsx` / `TechFeed.tsx` | M7 |
| Chat Widget LLM | `components/layout/ChatWidget.tsx` | ✅ (M9) |
| Footer | `components/layout/Footer.tsx` | ✅ |

---

## Convenções de Código

- Server Components por padrão; `"use client"` apenas quando necessário (estado, eventos, hooks)
- Componentes: `PascalCase` · Hooks: `use` prefix · Types: sufixo `Props` ou `Type`
- Sem `any` — tipagem estrita

---

## Variáveis de Ambiente

```env
# PipeFlow CRM (ingestão de leads — obrigatório)
PIPEFLOW_API_URL=           # URL base sem barra final
PIPEFLOW_INGEST_TOKEN=      # Bearer token de PipeFlow > Configurações > API Tokens

# IA — Chat Widget (M9)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

`PIPEFLOW_API_URL` e `PIPEFLOW_INGEST_TOKEN` são server-only (sem prefixo `NEXT_PUBLIC_`).

---

> Nexus Labs AI Systems — desenvolvido com Claude Code
