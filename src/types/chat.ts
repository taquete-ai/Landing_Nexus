export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  conversationPhase?: "greeting" | "clarification_1" | "clarification_2" | "summary_solution" | "collection";
  isCollectionPhase?: boolean;
}

export interface LeadCollectionForm {
  name: string;
  email: string;
  company: string;
  whatsapp: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  source: "Nexus Chat Widget";
  conversationSummary: string;
  identifiedPain: string;
  suggestedSolution: string;
  interestLevel?: "HIGH" | "MEDIUM" | "LOW";
}

export interface RateLimitState {
  messageCount: number;
  lastMessageTime: number;
  blockedUntil?: number;
}
