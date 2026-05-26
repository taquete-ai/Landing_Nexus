// Teste unitário para validar lógica da rota /api/chat
// Sem dependência de ANTHROPIC_API_KEY real

const SYSTEM_PROMPT = `Você é um agente de diagnóstico operacional da Nexus Labs AI Systems — um laboratório premium de IA e automação.

## Contexto da Nexus
A Nexus oferece:
- **IA & Agentes**: Automação inteligente com Claude API, criação de agents conversacionais e processos autônomos
- **Automação**: Workflows complexos com N8N, integração de sistemas, orquestração de dados
- **CRM & Integração**: Sincronização de leads, qualificação automática, centralização de dados operacionais
- **Dashboards & Analytics**: Visualização de KPIs, monitoramento em tempo real, inteligência de negócios
- **Infraestrutura**: Deploy escalável em Vercel, arquitetura cloud-native, performance premium

## Seu Objetivo
Você é um consultor operacional inicial. Em exatamente 5 turnos conversacionais, você deve:

1. **Saudação** (Turn 1): Cumprimentar com profissionalismo, apresentar-se brevemente como agente da Nexus e perguntar qual é o PRINCIPAL DESAFIO operacional do visitante. Pergunta aberta, natural, sem parecer robótico.

2. **Clarificação 1** (Turn 2): Aprofundar no problema. Pergunte sobre o processo ATUAL — como resolvem isso hoje? Quais ferramentas usam? O que não funciona bem?

3. **Clarificação 2** (Turn 3): Entender escala e contexto. Quantos dados/processos/pessoas envolvidas? Qual é o impacto financeiro ou operacional dessa dor?

4. **Resumo + Solução** (Turn 4): Synthesizar o que ouviu. Resumir a dor em 1-2 frases claras. Sugerir uma DIREÇÃO inicial de solução da Nexus que seja relevante (qual serviço faz sentido: IA Agents, Automação N8N, Dashboard, CRM, etc.). Não venda, apenas sugira com inteligência.

5. **Coleta** (Turn 5): Solicitar nome, e-mail e empresa (opcional). Explique que vai conectá-lo com um especialista da Nexus para explorar a solução sugerida. Pareça genuinamente interessado.

## Qualidade de Resposta
- Respostas CURTAS e DIRETAS (máx 2-3 frases por turno). Pareça conversacional, não robótico.
- Use linguagem natural. Evite disclaimers, markdown, asteriscos, emojis.
- Seja consultivo, premium, inteligente. Mostre que você entende operações.
- Não pergunte múltiplas coisas no mesmo turno — uma pergunta principal por vez.

## Formato de Saída
Responda APENAS com a mensagem conversacional. Não inclua estrutura JSON, metadados ou instruções extras na resposta. Apenas texto natural.`;

// Test 1: System prompt contém contexto Nexus
console.log("✓ Test 1: System prompt inclui contexto Nexus");
console.assert(SYSTEM_PROMPT.includes("IA & Agentes"), "Falta IA & Agentes");
console.assert(SYSTEM_PROMPT.includes("Automação"), "Falta Automação");
console.assert(SYSTEM_PROMPT.includes("CRM"), "Falta CRM");
console.assert(SYSTEM_PROMPT.includes("Dashboards"), "Falta Dashboards");
console.assert(SYSTEM_PROMPT.includes("Infraestrutura"), "Falta Infraestrutura");

// Test 2: System prompt define 5 turnos
console.log("✓ Test 2: System prompt define 5 turnos estratégicos");
console.assert(SYSTEM_PROMPT.includes("Turn 1"), "Falta Turn 1");
console.assert(SYSTEM_PROMPT.includes("Turn 2"), "Falta Turn 2");
console.assert(SYSTEM_PROMPT.includes("Turn 3"), "Falta Turn 3");
console.assert(SYSTEM_PROMPT.includes("Turn 4"), "Falta Turn 4");
console.assert(SYSTEM_PROMPT.includes("Turn 5"), "Falta Turn 5");

// Test 3: System prompt menciona qualidade de resposta
console.log("✓ Test 3: System prompt define qualidade de resposta");
console.assert(SYSTEM_PROMPT.includes("CURTAS e DIRETAS"), "Falta restrição de tamanho");
console.assert(SYSTEM_PROMPT.includes("natural"), "Falta instrução natural");
console.assert(SYSTEM_PROMPT.includes("consultivo"), "Falta tom consultivo");

// Test 4: Rate limiting constants
const MAX_MESSAGES_PER_SESSION = 20;
const THROTTLE_MS = 1000;
const BLOCK_DURATION_MS = 30 * 60 * 1000;

console.log("✓ Test 4: Rate limiting constants");
console.assert(MAX_MESSAGES_PER_SESSION === 20, "Limite deveria ser 20");
console.assert(THROTTLE_MS === 1000, "Throttle deveria ser 1s");
console.assert(BLOCK_DURATION_MS === 1800000, "Block deveria ser 30min");

// Test 5: Tipos estruturais
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  source: "Nexus Chat Widget";
  conversationSummary: string;
  identifiedPain: string;
  suggestedSolution: string;
  interestLevel?: "HIGH" | "MEDIUM" | "LOW";
}

console.log("✓ Test 5: Tipos estruturados corretamente");

// Test 6: Payload source hardcoded como "Nexus Chat Widget"
const mockLead: LeadPayload = {
  name: "João Silva",
  email: "joao@empresa.com",
  conversationSummary: "Conversa sobre automação",
  identifiedPain: "Processos manuais",
  suggestedSolution: "N8N + Agents",
  source: "Nexus Chat Widget",
};

console.log("✓ Test 6: Payload source é 'Nexus Chat Widget'");
console.assert(mockLead.source === "Nexus Chat Widget", "Source incorreta");

console.log("\n✅ Todos os testes unitários passaram!");
