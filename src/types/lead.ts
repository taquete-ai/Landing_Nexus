/**
 * Nexus Labs AI Systems — Lead Types
 * Estrutura de dados para captura e envio de leads ao PipeFlow
 * Suporta enriquecimento por LLM (M9) com contexto conversacional
 */

/** Lead básico do formulário de contato */
export interface BasicLead {
  name: string;
  email: string;
  company?: string;
}

/** Lead enriquecido pelo Chat Widget (M9) */
export interface EnrichedLead extends BasicLead {
  source: "form" | "chat";
  conversationSummary?: string;      // Resumo da conversa LLM
  identifiedPain?: string;           // Dor principal identificada
  suggestedSolution?: string;        // Possível solução recomendada
  interestLevel?: "baixo" | "médio" | "alto";
  metadata?: Record<string, unknown>; // Dados adicionais (timestamps, origem URL, etc.)
}

/** Payload enviado para PipeFlow API (alinhado com schema PipeFlow) */
export interface PipeFlowLeadPayload {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  notes?: string;
}

/** Resposta da API PipeFlow */
export interface PipeFlowResponse {
  success: boolean;
  leadId?: string;
  message?: string;
  error?: string;
}
