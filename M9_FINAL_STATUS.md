# M9 — ChatWidget LLM (Finalizado) ✅

**Data:** 26/05/2026  
**Commit:** 39df251  
**Status:** Pronto para produção

---

## Resumo

ChatWidget com diagnóstico LLM (Claude Haiku 4.5) integrado ao PipeFlow CRM. Fluxo E2E completo:
- **Turn 1-4:** Conversa diagnóstica com 5-turn máximo
- **Turn 5:** Coleta de leads (name, email, company)
- **Pós-coleta:** Envio automático ao PipeFlow com contexto conversacional

---

## Mudanças Finais

| Arquivo | Mudanças |
|---|---|
| `src/lib/chat.ts` | THROTTLE_MS=0 (remove rate limit desnecessário) |
| `src/components/layout/ChatWidget.tsx` | bottom-20 (posição acima watermark), NEX (nome), checkRateLimit() reposicionado |
| `src/app/api/contact/route.ts` | Debug logs para env vars, payload mapeado para PipeFlow schema |
| `src/lib/pipeflow.ts` | Debug logs, corrige data.id (não data.leadId) |
| `src/types/lead.ts` | Schema alinhado com PipeFlow (name, email, phone, company, position, notes) |
| `.env.local` | PIPEFLOW_API_URL, PIPEFLOW_INGEST_TOKEN |

---

## Fluxo Testado

```
1. Chat inicia (Turn 1: saudação NEX)
   ↓
2. Usuário envia mensagens (Turn 2-4: diagnóstico conversacional)
   ↓
3. Turn 5: NEX coleta name, email, company via formulário
   ↓
4. Clica "Enviar" → POST /api/contact
   ↓
5. Route monta payload com dados + contexto conversacional
   ↓
6. ingestLeadToPipeFlow() → POST /api/leads/ingest
   ↓
7. PipeFlow retorna {id, status, created_at}
   ↓
8. Success message + chat limpo após 3s
```

---

## Validação

✅ Chat responde coerentemente (LLM Haiku)  
✅ Rate limiting não bloqueia fluxo legítimo  
✅ Widget posicionado acima do watermark Windows  
✅ Nome/saudação atualizados (NEX)  
✅ Leads capturados no PipeFlow dashboard  
✅ Email enviado via N8N (downstream)  

---

## Endpoints em Produção

- `POST /api/chat` — Mensagens de diagnóstico LLM
- `POST /api/contact` — Ingestão de leads com contexto
- `POST https://pipe-flow-crm.vercel.app/api/leads/ingest` — PipeFlow CRM (Bearer token)

---

## Próximos Passos (Fora do Escopo M9)

- [ ] A/B testing de saudações (ex: variar tone diagnostico vs commercial)
- [ ] Persistência de leads em DB local (opcional — atualmente stateless via PipeFlow)
- [ ] Webhook de confirmação de email do PipeFlow
- [ ] Analytics: conversão chat → lead submetido → email confirmado

---

**Nota:** NEX é um agente diagnóstico (não tem memória entre sessões). Cada visitante inicia conversa fresh.
