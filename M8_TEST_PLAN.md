# M8 — PipeFlow Integration — Plano de Testes E2E

## Configuração Pré-Teste

### 1. Preparar `.env.local`

```env
# Copiar da configuração PipeFlow
PIPEFLOW_API_URL=https://[seu-pipeflow-url].com
PIPEFLOW_INGEST_TOKEN=[seu-bearer-token]

# Manter para futuro (M9)
ANTHROPIC_API_KEY=[sua-chave-claude]
OPENAI_API_KEY=[sua-chave-openai]
```

### 2. Dev Server

```bash
npm run dev
# Server rodará em http://localhost:3000 (ou porta livre)
```

---

## Testes E2E

### ✅ Teste 1: Formulário Básico → Sucesso

**Cenário:** Visitante preenche formulário CTASection com dados válidos

1. Abrir landing page (`/`)
2. Scroll até seção "Pronto para transformar sua operação?"
3. Preencher:
   - Nome: "João Silva"
   - Email: "joao@empresa.com"
   - Empresa: "Acme Corp"
4. Clicar "Iniciar Conversa"

**Esperado:**
- ✓ Feedback: "Mensagem enviada com sucesso! Entraremos em contato em breve."
- ✓ Formulário limpa
- ✓ Em PipeFlow CRM: Lead aparece com name, email, company
- ✓ Console (servidor): Log de sucesso

**Log esperado:**
```
[PipeFlow] Lead enviado: { name: "João Silva", email: "joao@empresa.com", ... }
```

---

### ✅ Teste 2: Email Inválido

**Cenário:** Visitante tenta enviar email inválido

1. Preencher formulário com:
   - Nome: "João"
   - Email: "email-invalido"
   - Empresa: "Test"
2. Submit

**Esperado:**
- ✓ Feedback: "E-mail inválido"
- ✓ Status HTTP: 400
- ✓ Lead NÃO chega ao PipeFlow

---

### ✅ Teste 3: Campo Obrigatório Ausente

**Cenário:** Visitante deixa campo obrigatório em branco

1. Preencher apenas email
2. Submit

**Esperado:**
- ✓ Feedback: "Nome e e-mail são obrigatórios"
- ✓ Status HTTP: 400
- ✓ Lead NÃO chega ao PipeFlow

---

### ✅ Teste 4: Token Inválido (Autenticação)

**Cenário:** Token PipeFlow está expirado ou inválido

1. Modificar `PIPEFLOW_INGEST_TOKEN` para valor errado
2. Preencher e submeter formulário
3. Observar resposta

**Esperado:**
- ✓ Feedback visitante: "Erro ao processar requisição"
- ✓ Status HTTP: 502
- ✓ Console servidor: Log de erro "PIPEFLOW_AUTH_FAILED"
- ✓ Lead NÃO chega ao PipeFlow

---

### ✅ Teste 5: Env Vars Ausentes

**Cenário:** `PIPEFLOW_API_URL` ou `PIPEFLOW_INGEST_TOKEN` não estão setados

1. Remover/comentar vars em `.env.local`
2. Restart dev server
3. Submeter formulário

**Esperado:**
- ✓ Feedback visitante: "Serviço temporariamente indisponível"
- ✓ Status HTTP: 503
- ✓ Console servidor: Log "PIPEFLOW_ENV_MISSING"

---

### ✅ Teste 6: Servidor PipeFlow Indisponível

**Cenário:** PipeFlow está offline ou retorna erro 5xx

1. Alterar `PIPEFLOW_API_URL` para URL não-existente
2. Submeter formulário

**Esperado:**
- ✓ Feedback visitante: "Serviço temporariamente indisponível"
- ✓ Status HTTP: 503
- ✓ Lead NÃO chega ao PipeFlow

---

### ✅ Teste 7: Limite de Plano (Erro 402)

**Cenário:** Plano PipeFlow atingiu limite de leads

1. Continuar submetendo formulários até PipeFlow retornar 402

**Esperado:**
- ✓ Feedback visitante: "Serviço temporariamente indisponível"
- ✓ Status HTTP: 503 (detalhes técnicos NUNCA expostos)
- ✓ Console servidor: Log "PIPEFLOW_BILLING_LIMIT"

---

### ✅ Teste 8: Payload Enriquecido (M9 Preview)

**Cenário:** Simular envio de ChatWidget com dados de LLM

Use cURL ou Postman para enviar:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@empresa.com",
    "company": "TechCorp",
    "source": "chat",
    "conversationSummary": "Cliente quer automatizar processos de vendas",
    "identifiedPain": "Falta de automação em follow-up",
    "suggestedSolution": "Implementar N8N com PipeFlow CRM",
    "interestLevel": "alto"
  }'
```

**Esperado:**
- ✓ Status: 200
- ✓ Resposta: `{ success: true, message: "...", leadId: "..." }`
- ✓ Em PipeFlow: Lead com todos os campos enriquecidos
- ✓ `metadata.timestamp`, `metadata.userAgent`, `metadata.origin` preenchidos

---

## Verificação no PipeFlow CRM

Após cada teste bem-sucedido:

1. Acessar PipeFlow CRM
2. Navegue até "Leads" ou "Contatos"
3. Procure pelo email testado
4. Verifique campos:
   - name ✓
   - email ✓
   - company ✓
   - source (form/chat) ✓ [se enriquecido]
   - conversationSummary ✓ [se enriquecido]
   - identifiedPain ✓ [se enriquecido]
   - suggestedSolution ✓ [se enriquecido]
   - interestLevel ✓ [se enriquecido]
   - metadata (timestamp, userAgent, origin) ✓

---

## Monitoramento de Logs

### Terminal (Dev Server)

```bash
# Sucesso
[PipeFlow] Lead enviado com sucesso

# Erro
[PipeFlow] Env vars ausentes
[PipeFlow] Token inválido
[PipeFlow] Servidor indisponível
```

### Browser Console (DevTools)

- Network tab: Inspecionar `POST /api/contact`
  - Status: 200 | 400 | 502 | 503 | 500
  - Response: JSON com `{ success, message, leadId? }` ou `{ error }`

---

## Critério de Conclusão

✅ **M8 aprovado para merge quando:**

- [x] Teste 1 (sucesso) → Lead em PipeFlow ✓
- [x] Teste 2 (email inválido) → 400 ✓
- [x] Teste 3 (campo obrigatório) → 400 ✓
- [x] Teste 4 (token inválido) → 502 ✓
- [x] Teste 5 (env vars ausentes) → 503 ✓
- [x] Teste 6 (servidor indisponível) → 503 ✓
- [x] Teste 7 (erro 402) → 503 (sem exposição) ✓
- [x] Teste 8 (payload enriquecido) → Todos os campos em PipeFlow ✓

---

## Pronto para M9?

Após M8 aprovado:

✅ Route handler `/api/contact` aceita:
   - `source: "chat"`
   - `conversationSummary`, `identifiedPain`, `suggestedSolution`
   - `interestLevel`

✅ ChatWidget (M9) pode enviar leads enriquecidos diretamente

✅ PipeFlow recebe todos os dados contextuais da conversa LLM

---

> M8 — Plano de Testes E2E — Nexus Labs AI Systems

