# Dashboard Demo — Manual Test Checklist

## Status Geral
- ✓ Servidor rodando: `http://localhost:3001`
- ✓ Todos arquivos criados (8/8)
- ✓ Todas features implementadas (12/12)
- ✓ Integração no page.tsx OK
- ⚠ Testes visuais pendentes

---

## 4 Testes Manuais Principais

### TEST 1: Renderização & Layout (Desktop 1280px)
**O que testar:**
1. Abra `http://localhost:3001#dashboard` no navegador
2. Role até seção Dashboard Demo
3. Verifique:
   - [ ] Cabeçalho visível: "DEMONSTRAÇÃO LIVE" + pulsing dot verde
   - [ ] Título: "Ecossistema em Tempo Real" em Syne 700
   - [ ] 3 Metric Cards aparecem lado a lado (grid automático)
   - [ ] Pipeline card abaixo das métricas com barra animada
   - [ ] System Status card (direita superior) com 3 indicadores
   - [ ] Mini Chart card (direita inferior) com gráfico semanal
   - [ ] Activity Feed abaixo (full width) com 5 eventos
   - [ ] Layout responsivo (não quebrado, sem overflow)

**Esperado:** Layout 2×2 no desktop, perfeito alinhamento

---

### TEST 2: Animações & Interações (Mobile 375px)
**O que testar:**
1. Abra DevTools (F12) → Toggle device toolbar (mobile 375px)
2. Role até Dashboard Demo
3. Verifique:
   - [ ] Metric Cards aparecem em coluna única
   - [ ] Cards fazem reveal animation ao entrar (fade-in + slideUp 16px)
   - [ ] Passe mouse sobre card (desktop) / toque (mobile) → borda muda para chartreuse
   - [ ] Números se tornam visíveis com animação de entrada
   - [ ] Pipeline bar anima de 0% → 68% suavemente
   - [ ] Dots do System Status pulsam (online = verde pulsing)
   - [ ] Activity Feed items aparecem com delay (staggered)
   - [ ] Mini Chart barras crescem de 0 → altura (animadas)

**Esperado:** Todas as animações suaves, sem travos, responsividade perfeita

---

### TEST 3: Design System Compliance
**O que testar:**
1. Inspecione elementos (DevTools F12)
2. Verifique cores:
   - [ ] Barra de progress: `#CAFF33` (chartreuse)
   - [ ] Backgrounds: `#0C0C0E` (bg) ou `#141416` (surface)
   - [ ] Texto: `#E8E8E8` (primário) ou `#8A8A8F` (secundário)
   - [ ] Status verde (online): `#2ED573`
   - [ ] Status vermelho (offline): `#FF4757`
3. Verifique tipografia:
   - [ ] Título em font-family contendo "Syne"
   - [ ] Body em font-family contendo "DM Sans"
   - [ ] Labels em font-family contendo "IBM Plex Mono" + uppercase
4. Verifique spacing:
   - [ ] Cards padding consistente (16px ou múltiplo de 8px)
   - [ ] Borders max 8px radius
   - [ ] Noise texture sutil no background

**Esperado:** Todas as cores, fontes e spacing seguem design tokens

---

### TEST 4: Dados & Labels Corretos
**O que testar:**
1. Verifique dados renderizados:
   - [ ] Métrica 1: "Automações Ativas" + "5" + trend "↑2"
   - [ ] Métrica 2: "Leads Capturados" + "342" + trend "↑8"
   - [ ] Métrica 3: "Integrações Ativas" + "12" + trend "↓1"
   - [ ] Pipeline: "342 / 500" + "68.4%" + "12 dias até meta"
   - [ ] Status: 3 sistemas listados (CRM online, Pipeline online, IA idle)
   - [ ] Chart: 7 barras (Seg-Dom) com valores 45-61
   - [ ] Activity: 5 eventos com timestamps ("há 2m", "há 5m", "há 12m", etc.)
   - [ ] Badge "AO VIVO" com pulsing dot no feed
2. Verifique labels em português:
   - [ ] "DEMONSTRAÇÃO LIVE" no topo
   - [ ] "Pipeline de Leads", "Taxa de Conversão", "Dias até Meta"
   - [ ] "Status de Sistemas"
   - [ ] "Atividades da Semana"
   - [ ] "Feed de Atividades"

**Esperado:** Todos dados corretos, labels em português, sem typos

---

## Checklist Rápido (5 min)
- [ ] Página carrega sem erros (console clean)
- [ ] Dashboard demo aparece após Hero/CTA
- [ ] Layout responsivo (desktop, tablet, mobile)
- [ ] Cores chartreuse, bg, surface corretas
- [ ] Animações suaves (sem lag)
- [ ] Dados corretos (5, 342, 12, 68.4%, etc.)
- [ ] Labels em português
- [ ] Pulsing dots animando (status online)

---

**Status:** Aguardando testes manuais
**Próximo passo:** Após validação, fazer commit final

