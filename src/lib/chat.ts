import type { ChatMessage, LeadPayload, RateLimitState } from "@/types/chat";

const RATE_LIMIT_KEY = "nexus_chat_rate_limit";
const MAX_MESSAGES_PER_SESSION = 20;
const THROTTLE_MS = 300; // reduzido de 1000 — botão já fica disabled durante loading
const BLOCK_DURATION_MS = 30 * 60 * 1000; // 30 minutos

export function checkRateLimit(): {
  allowed: boolean;
  message?: string;
  timeUntilUnblock?: number;
} {
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  let state: RateLimitState = {
    messageCount: 0,
    lastMessageTime: now,
  };

  if (stored) {
    try {
      state = JSON.parse(stored);
    } catch {
      // Reset se corrupted
      localStorage.removeItem(RATE_LIMIT_KEY);
    }
  }

  // Se está bloqueado
  if (state.blockedUntil && now < state.blockedUntil) {
    const timeUntilUnblock = state.blockedUntil - now;
    return {
      allowed: false,
      message: `Muitas requisições. Tente novamente em ${Math.ceil(timeUntilUnblock / 1000)}s.`,
      timeUntilUnblock,
    };
  }

  // Limpar bloqueio expirado
  if (state.blockedUntil && now >= state.blockedUntil) {
    state.blockedUntil = undefined;
    state.messageCount = 0;
  }

  // Verificar throttle (1s entre mensagens)
  if (now - state.lastMessageTime < THROTTLE_MS) {
    return {
      allowed: false,
      message: "Aguarde um momento antes de enviar outra mensagem.",
    };
  }

  // Verificar limite de mensagens por sessão
  if (state.messageCount >= MAX_MESSAGES_PER_SESSION) {
    state.blockedUntil = now + BLOCK_DURATION_MS;
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
    return {
      allowed: false,
      message: `Limite de mensagens atingido. Tente novamente em 30 minutos.`,
      timeUntilUnblock: BLOCK_DURATION_MS,
    };
  }

  // Atualizar estado
  state.messageCount += 1;
  state.lastMessageTime = now;
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));

  return { allowed: true };
}

export async function sendChatMessage(
  messages: ChatMessage[]
): Promise<{ message: string; error?: string }> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { message: "", error: error.error || "Erro ao enviar mensagem" };
    }

    const data = await response.json();
    return { message: data.message };
  } catch (error) {
    return {
      message: "",
      error:
        error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export function extractLeadData(
  messages: ChatMessage[]
): Partial<LeadPayload> | null {
  // Extrair informações de uma sequência de mensagens
  const userMessages = messages.filter((m) => m.role === "user");
  const assistantMessages = messages.filter((m) => m.role === "assistant");

  if (userMessages.length < 2) return null;

  // Simplificado: último user message (Turn 5) contém nome e email
  // Em produção, parsearia de forma mais sofisticada
  const lastUserMessage = userMessages[userMessages.length - 1].content;

  // Extrair padrão "Nome: X, E-mail: Y" ou similar
  const nameMatch = lastUserMessage.match(
    /(?:nome|name)[\s:]*([^\n,]+)/i
  );
  const emailMatch = lastUserMessage.match(
    /(?:e-mail|email)[\s:]*([^\s,]+@[^\s,]+)/i
  );
  const companyMatch = lastUserMessage.match(
    /(?:empresa|company)[\s:]*([^\n,]+)/i
  );

  if (!nameMatch || !emailMatch) {
    return null;
  }

  // Construir resumo da conversa (Turn 1-4)
  const conversationSummary = assistantMessages
    .slice(0, -1)
    .map((m, i) => `${i + 1}. ${m.content}`)
    .join("\n");

  // Extrair dor principal (geralmente mencionada no Turn 2-3)
  const painMatch = messages
    .filter((m) => m.role === "assistant")
    .reverse()[1]?.content.match(/(?:dor|problema|desafio|issue)[\s:]*([^.]+)/i);

  // Extrair solução sugerida (última resposta do assistente antes da coleta)
  const solutionMatch = messages
    .filter((m) => m.role === "assistant")
    .reverse()[1]?.content.match(
      /(?:solução|solution|sugerir|suggest)[\s:]*([^.]+)/i
    );

  return {
    name: nameMatch[1].trim(),
    email: emailMatch[1].trim().toLowerCase(),
    company: companyMatch ? companyMatch[1].trim() : undefined,
    conversationSummary,
    identifiedPain: painMatch ? painMatch[1].trim() : "Desafio operacional não especificado",
    suggestedSolution: solutionMatch ? solutionMatch[1].trim() : "Explorar soluções Nexus",
    source: "Nexus Chat Widget",
  };
}

export async function submitLeadToPipeFlow(
  leadData: Partial<LeadPayload>
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  if (!leadData.name || !leadData.email) {
    return { success: false, error: "Nome e e-mail são obrigatórios" };
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || "Erro ao enviar lead" };
    }

    const data = await response.json();
    return {
      success: true,
      leadId: data.leadId,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
