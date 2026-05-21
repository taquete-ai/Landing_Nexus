# PLAN.md — Nexus Labs AI Systems
## Plano de Execução — Setup ao Deploy

> Filosofia: interface primeiro, backend depois. Cada milestone é um incremento entregável e testável.

---

## M1 — Setup & Foundation

**Branch:** `setup/foundation`

**Objetivo:** Inicializar o projeto com toda a configuração base — stack, design tokens, estrutura de pastas e ambiente de desenvolvimento funcional.

### Entregas

- [ ] Criar projeto Next.js 15 com App Router e TypeScript strict
- [ ] Configurar Tailwind CSS v4 com design tokens da Nexus
- [ ] Instalar e configurar shadcn/ui (tema customizado dark)
- [ ] Criar `src/styles/globals.css` com variáveis CSS (cores, tipografia, espaçamento)
- [ ] Criar `src/styles/design-tokens.ts` com tokens como constantes TypeScript
- [ ] Configurar fontes: Space Grotesk + Inter + JetBrains Mono (via next/font)
- [ ] Criar estrutura de pastas completa conforme CLAUDE.md
- [ ] Criar `.env.example` com todas as variáveis necessárias
- [ ] Configurar `tsconfig.json` com path aliases (`@/components`, `@/lib`, etc.)
- [ ] Configurar ESLint + Prettier
- [ ] Criar `src/lib/utils.ts` com função `cn()`

**Commit final:** `feat: project setup — Next.js 15, Tailwind v4, shadcn/ui, design tokens`

---

## M2 — Layout Base

**Branch:** `feat/layout-base`

**Objetivo:** Construir a estrutura visual permanente da aplicação — Navbar, Footer e identidade visual aplicada globalmente.

### Entregas

- [ ] Criar `src/components/layout/Navbar.tsx` — logo Nexus, links de navegação, CTA button
- [ ] Criar `src/components/layout/Footer.tsx` — links, copyright, tagline
- [ ] Aplicar noise texture sutil no background via CSS
- [ ] Configurar `src/app/layout.tsx` com metadata base (title, description, OG)
- [ ] Criar `src/app/page.tsx` com estrutura de seções (scaffolding vazio)
- [ ] Implementar scroll indicator no Navbar (border-bottom on scroll)
- [ ] Responsividade: Navbar mobile com menu hamburguer
- [ ] Testar hierarquia tipográfica e paleta de cores em todos os breakpoints

**Commit final:** `feat: layout base — Navbar, Footer, identidade visual aplicada`

---

## M3 — Hero + CTA

**Branch:** `feat/hero-cta`

**Objetivo:** Construir a primeira dobra da landing — seção de entrada com impacto máximo e call-to-action estratégico.

### Entregas

- [ ] Criar `src/components/sections/Hero.tsx`
  - [ ] Headline principal com hierarquia tipográfica dominante
  - [ ] Subheadline descritivo da proposta de valor
  - [ ] Badge/tag de posicionamento (ex: "AI Systems Laboratory")
  - [ ] CTA primário ("Conheça os Projetos") e secundário ("Fale com a Nexus")
  - [ ] Métricas/stats institucionais (projetos entregues, clientes, tecnologias)
  - [ ] Indicador de scroll animado
- [ ] Criar `src/components/sections/CTASection.tsx`
  - [ ] Headline de conversão
  - [ ] Formulário de captura de lead (nome, email, empresa)
  - [ ] CTA final com acento chartreuse
- [ ] Criar `src/hooks/useScrollReveal.ts` — Intersection Observer para reveal on scroll
- [ ] Aplicar animações de entrada suaves (CSS transitions, sem libs)
- [ ] Responsividade completa Hero + CTA em mobile/tablet/desktop

**Commit final:** `feat: hero section e CTA — primeira dobra com conversão`

---

## M4 — Dashboard Demo

**Branch:** `feat/dashboard-demo`

**Objetivo:** Criar o componente demonstrativo mais impactante da landing — dashboard visual que transmite autoridade técnica através de dados simulados.

### Entregas

- [ ] Criar `src/components/sections/DashboardDemo.tsx`
  - [ ] Layout em grid inspirado em SaaS premium
  - [ ] Cards de métricas animadas (ex: "47 automações ativas", "3.2k leads processados")
  - [ ] Barra de progresso de pipeline simulada com animação CSS
  - [ ] Mini gráfico de linha (SVG nativo ou Recharts leve)
  - [ ] Status badges (verde/amarelo) para sistemas ativos
  - [ ] Ticker de atividade em tempo real (simulado com interval)
  - [ ] Label "Live Demo" com indicador pulsante
- [ ] Criar `src/types/dashboard.ts` — tipos para métricas e dados do dashboard
- [ ] Criar `src/data/dashboard-mock.ts` — dados simulados estáticos
- [ ] Efeito de entrada da seção com reveal on scroll
- [ ] Responsividade: layout adaptado para mobile sem perder impacto

**Commit final:** `feat: dashboard demo — showcase visual de autoridade técnica`

---

## M5 — Project Showcase

**Branch:** `feat/project-showcase`

**Objetivo:** Exibir o portfólio de projetos da Nexus de forma sofisticada, organizada por categoria.

### Entregas

- [ ] Criar `src/components/sections/ProjectShowcase.tsx`
  - [ ] Grid assimétrico de projetos (layout editorial)
  - [ ] Filtro por categoria (CRM, Automação, Agentes IA, SaaS, Dashboard, etc.)
  - [ ] Card destacado (featured project) com mockup maior
- [ ] Criar `src/components/ui/ProjectCard.tsx`
  - [ ] Mockup placeholder com gradiente neutro
  - [ ] Tag de categoria com acento chartreuse
  - [ ] Nome do projeto, descrição curta, stack utilizada
  - [ ] Hover state: linha accent no topo do card + leve elevação
- [ ] Criar `src/types/project.ts` — interface `ProjectType`
- [ ] Criar `src/data/projects-mock.ts` — 6–8 projetos de demonstração
- [ ] Animação staggered nos cards ao entrar na viewport
- [ ] Responsividade: 3 colunas desktop → 2 tablet → 1 mobile

**Commit final:** `feat: project showcase — portfólio com grid editorial e filtros`

---

## M6 — Tech Stack + Social Proof

**Branch:** `feat/tech-social`

**Objetivo:** Reforçar autoridade técnica exibindo tecnologias dominadas e logos de clientes/parceiros.

### Entregas

- [ ] Criar `src/components/sections/TechStack.tsx`
  - [ ] Grid de ícones/logos de tecnologias (Next.js, Supabase, Claude, N8N, etc.)
  - [ ] Agrupamento por categoria (Frontend, Backend, IA, Automação, Infra)
  - [ ] Hover com nome da tecnologia e tooltip
- [ ] Criar `src/components/sections/SocialProof.tsx`
  - [ ] Marquee horizontal de logos de clientes/parceiros (CSS animation, sem lib)
  - [ ] Versão pausada no hover
  - [ ] Contador institucional (ex: "+20 empresas atendidas")
- [ ] Criar `src/data/tech-stack.ts` — lista de tecnologias com ícone e categoria
- [ ] Criar `src/data/clients.ts` — logos e nomes de clientes
- [ ] Responsividade completa

**Commit final:** `feat: tech stack e social proof — autoridade técnica e clientes`

---

## M7 — Services + Tech Feed

**Branch:** `feat/services-feed`

**Objetivo:** Apresentar os serviços da Nexus e criar a seção de conteúdo tecnológico dinâmico (estático por enquanto).

### Entregas

- [ ] Criar `src/components/sections/Services.tsx`
  - [ ] Cards de serviços: IA & Agentes, Automação, CRM, SaaS, Dashboards, Integrações
  - [ ] Ícone + título + descrição curta por serviço
  - [ ] Hover com accent border-left chartreuse
- [ ] Criar `src/components/sections/TechFeed.tsx`
  - [ ] Grid de cards de notícias/atualizações tecnológicas
  - [ ] Tag de categoria (IA, Automação, SaaS, etc.)
  - [ ] Data, título, excerpt
  - [ ] Link externo (abre em nova aba)
  - [ ] Label "NEXUS INTEL" com indicador de atualização
- [ ] Criar `src/types/feed.ts` — interface `FeedItemType`
- [ ] Criar `src/data/tech-feed-mock.ts` — 6 artigos de demonstração
- [ ] Responsividade: 3 colunas → 1 coluna

**Commit final:** `feat: services e tech feed — serviços e conteúdo tecnológico`

---

## M8 — Formulário de Contato + Resend

**Branch:** `feat/contact-resend`

**Objetivo:** Implementar captação de leads com formulário funcional integrado ao Resend para envio de e-mails.

### Entregas

- [ ] Instalar e configurar `resend` SDK
- [ ] Criar `src/app/api/contact/route.ts` — Route Handler POST
- [ ] Criar `src/lib/resend/email-templates.ts` — template HTML do e-mail de notificação
- [ ] Atualizar `src/components/sections/CTASection.tsx` com formulário funcional
  - [ ] Validação client-side com estado React
  - [ ] Loading state no botão durante envio
  - [ ] Feedback de sucesso/erro inline
- [ ] Configurar variável `RESEND_API_KEY` no `.env.local`
- [ ] Criar `src/types/contact.ts` — interface `ContactFormData`
- [ ] Testar envio de e-mail end-to-end

**Commit final:** `feat: formulário de contato integrado ao Resend`

---

## M9 — Supabase + Dados Dinâmicos

**Branch:** `feat/supabase-integration`

**Objetivo:** Conectar a plataforma ao Supabase para tornar projetos e feed tecnológico administráveis via banco de dados.

### Entregas

- [ ] Instalar `@supabase/supabase-js` e `@supabase/ssr`
- [ ] Criar `src/lib/supabase/client.ts` — browser client
- [ ] Criar `src/lib/supabase/server.ts` — server client (App Router)
- [ ] Criar migration: tabela `projects` (id, title, description, category, stack, featured, created_at)
- [ ] Criar migration: tabela `tech_feed` (id, title, excerpt, category, url, published_at)
- [ ] Criar migration: tabela `leads` (id, name, email, company, message, created_at)
- [ ] Atualizar `ProjectShowcase` para buscar projetos do Supabase (Server Component)
- [ ] Atualizar `TechFeed` para buscar artigos do Supabase (Server Component)
- [ ] Atualizar `contact/route.ts` para salvar leads na tabela `leads`
- [ ] Configurar variáveis Supabase no `.env.local`
- [ ] Popular tabelas com dados iniciais via Supabase dashboard

**Commit final:** `feat: integração Supabase — projetos, feed e leads dinâmicos`

---

## M10 — Chatbot Widget

**Branch:** `feat/chatbot-widget`

**Objetivo:** Implementar widget de chat institucional com respostas pré-programadas e estrutura pronta para IA.

### Entregas

- [ ] Criar `src/components/layout/ChatWidget.tsx`
  - [ ] Botão flutuante (bottom-right) com ícone e badge de notificação
  - [ ] Janela de chat com header (logo Nexus + status "Online")
  - [ ] Área de mensagens com scroll
  - [ ] Input + botão de envio
  - [ ] Animação de abertura/fechamento suave
- [ ] Criar `src/lib/chatbot/responses.ts` — respostas pré-definidas por intenção
- [ ] Implementar lógica de matching por palavras-chave (client-side)
- [ ] Typing indicator animado antes da resposta
- [ ] Salvar histórico de sessão no `sessionStorage`
- [ ] Estrutura de API pronta em `src/app/api/chat/route.ts` (stub para IA futura)
- [ ] Responsividade: widget adaptado para mobile

**Commit final:** `feat: chatbot widget — UI funcional com respostas institucionais`

---

## M11 — SEO + Performance

**Branch:** `feat/seo-performance`

**Objetivo:** Otimizar a plataforma para motores de busca e garantir performance premium.

### Entregas

- [ ] Configurar `src/app/layout.tsx` com metadata completa (title, description, keywords, authors)
- [ ] Criar `src/app/opengraph-image.tsx` — OG image dinâmica com Next.js
- [ ] Criar `src/app/sitemap.ts` — sitemap dinâmico
- [ ] Criar `src/app/robots.ts` — robots.txt
- [ ] Otimizar todas as imagens com `next/image` (lazy loading, sizes, priority no Hero)
- [ ] Auditar e eliminar Client Components desnecessários
- [ ] Revisar Core Web Vitals: LCP, CLS, FID
- [ ] Adicionar `loading="eager"` no hero image
- [ ] Configurar `next.config.ts` com headers de segurança (CSP, X-Frame-Options)
- [ ] Rodar Lighthouse e atingir score ≥ 90 em Performance e SEO

**Commit final:** `feat: SEO e performance — metadata, OG, sitemap, Lighthouse ≥ 90`

---

## M12 — Deploy Vercel

**Branch:** `feat/deploy`

**Objetivo:** Publicar a plataforma em produção na Vercel com CI/CD configurado e domínio vinculado.

### Entregas

- [ ] Criar projeto na Vercel vinculado ao repositório
- [ ] Configurar todas as variáveis de ambiente no painel Vercel (Production + Preview)
- [ ] Verificar build de produção local com `npm run build`
- [ ] Corrigir eventuais erros de build (tipos, imports, etc.)
- [ ] Deploy inicial para Preview — validar todas as seções
- [ ] Configurar domínio customizado (se disponível)
- [ ] Ativar Vercel Analytics
- [ ] Configurar Vercel Speed Insights
- [ ] Validar formulário de contato em produção (Resend)
- [ ] Validar queries Supabase em produção
- [ ] Deploy final para Production
- [ ] Smoke test completo em produção (todas as seções, formulário, chatbot)

**Commit final:** `feat: deploy production — Nexus Labs AI Systems live`

---

## Resumo de Milestones

| # | Milestone | Branch | Prioridade |
|---|---|---|---|
| M1 | Setup & Foundation | `setup/foundation` | P0 |
| M2 | Layout Base | `feat/layout-base` | P0 |
| M3 | Hero + CTA | `feat/hero-cta` | P0 |
| M4 | Dashboard Demo | `feat/dashboard-demo` | P0 |
| M5 | Project Showcase | `feat/project-showcase` | P0 |
| M6 | Tech Stack + Social Proof | `feat/tech-social` | P1 |
| M7 | Services + Tech Feed | `feat/services-feed` | P1 |
| M8 | Formulário + Resend | `feat/contact-resend` | P1 |
| M9 | Supabase + Dados Dinâmicos | `feat/supabase-integration` | P1 |
| M10 | Chatbot Widget | `feat/chatbot-widget` | P2 |
| M11 | SEO + Performance | `feat/seo-performance` | P1 |
| M12 | Deploy Vercel | `feat/deploy` | P0 |

---

> Nexus Labs AI Systems — PLAN.md gerado com Claude Code
