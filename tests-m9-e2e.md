# M9 — E2E Tests — Chat Widget LLM

**Objetivo:** Validar o fluxo completo de 5 turnos diagnósticos → coleta → PipeFlow

---

## Teste 1: Widget abre/fecha corretamente
**Esperado:** Botão flutuante visível, clique abre painel, clique X fecha

**Status:** ⏳ Pendente — validar manualmente no browser

---

## Teste 2: Primeira mensagem (Turn 1 — Greeting)
**Entrada:** "Olá"
**Esperado:** IA responde com saudação profissional + pergunta sobre desafio operacional
**Critério:** Resposta curta (2-3 frases), sem markdown, natural

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 3: Segunda mensagem (Turn 2 — Clarification 1)
**Entrada:** "Temos processos manuais que levam horas"
**Esperado:** IA pergunta sobre processo atual e ferramentas usadas
**Critério:** Aprofunda na dor, não salta para solução

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 4: Terceira mensagem (Turn 3 — Clarification 2)
**Entrada:** "Usamos Excel e ferramentas legadas, afeta 20 pessoas"
**Esperado:** IA pergunta sobre impacto financeiro/escala
**Critério:** Conversa fluida, consultiva

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 5: Quarta mensagem (Turn 4 — Summary + Solution)
**Entrada:** "Alguns milhares por mês em produtividade perdida"
**Esperado:** IA resume dor ("processos manuais em Excel, 20 pessoas, impacto mensal") + sugere solução ("Automação N8N + IA Agents")
**Critério:** Resumo claro, sugestão relevante, não vende

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 6: Quinta mensagem (Turn 5 — Collection)
**Entrada:** "Faz sentido, como faço contato?"
**Esperado:** Painel muda para formulário inline (nome, email, empresa). Form fica visível.
**Critério:** Transição suave, UX clara

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 7: Coleta de contato (formulário)
**Ação:** Preencher nome="João Silva", email="joao@empresa.com", company="TechCorp"
**Clique:** Botão "Enviar"
**Esperado:** POST /api/contact com payload completo:
```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "company": "TechCorp",
  "source": "Nexus Chat Widget",
  "conversationSummary": "...",
  "identifiedPain": "Processos manuais em Excel",
  "suggestedSolution": "Automação N8N + IA Agents"
}
```
**Critério:** Lead aparece em PipeFlow, mensagem de sucesso aparece

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 8: Rate limiting (localStorage)
**Ação:** Enviar 20 mensagens rapidamente
**Esperado:** Mensagem "Limite de mensagens atingido" após 20ª mensagem
**Critério:** Block 30min ativado, localStorage persistido

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 9: Throttle (1s entre mensagens)
**Ação:** Enviar 2 mensagens em < 1s
**Esperado:** Segunda mensagem nega com "Aguarde um momento"
**Critério:** Proteção contra spam

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 10: sessionStorage persistence
**Ação:** Abrir chat → escrever mensagem → recarregar página (F5)
**Esperado:** Histórico da conversa persiste, chat abre onde parou
**Critério:** Experiência contínua mesmo após refresh

**Status:** ⏳ Pendente — validar manualmente

---

## Teste 11: Design system (visual)
**Validar:**
- [ ] Botão flutuante 56×56px, cor #CAFF33 (accent)
- [ ] Painel escuro (bg-bg #0c0c0e), border subtle
- [ ] Tipografia DM Sans (body), IBM Plex Mono (labels)
- [ ] Sem glassmorphism, radius ≤ 12px
- [ ] Typing indicator (3 pontos pulsantes)
- [ ] Animação de abertura (300ms fade+slide)
- [ ] Responsive: fullwidth mobile (<640px), max-w-sm desktop

**Status:** ⏳ Pendente — validar visualmente

---

## Teste 12: Error handling
**Cenários:**
- [ ] API retorna 500 → mensagem de erro clara
- [ ] Network offline → feedback ao usuário
- [ ] ANTHROPIC_API_KEY ausente → 503
- [ ] Payload inválido → 400

**Status:** ⏳ Pendente — validar manualmente

---

## Resumo de Execução

| # | Teste | Status | Critério |
|---|---|---|---|
| 1 | Widget abrir/fechar | ⏳ | UI responsiva |
| 2 | Turn 1 Greeting | ⏳ | Resposta natural |
| 3 | Turn 2 Clarification 1 | ⏳ | Aprofunda |
| 4 | Turn 3 Clarification 2 | ⏳ | Escala |
| 5 | Turn 4 Summary+Solution | ⏳ | Resumo + sugestão |
| 6 | Turn 5 Collection | ⏳ | Transição para form |
| 7 | Lead submission → PipeFlow | ⏳ | Lead aparece no CRM |
| 8 | Rate limiting (20 msgs) | ⏳ | Block 30min |
| 9 | Throttle (1s) | ⏳ | Anti-spam |
| 10 | sessionStorage persist | ⏳ | Histórico salvo |
| 11 | Design system | ⏳ | Identidade Nexus |
| 12 | Error handling | ⏳ | UX robusta |

**Status Geral:** Implementação completa, **aguardando testes manuais no browser**

