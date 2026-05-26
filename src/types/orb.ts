export type OrbState = "idle" | "thinking" | "bubble_visible" | "chat_open";

export type SmartEvent =
  | "user_idle"
  | "scroll_deep"
  | "project_hover"
  | "back_to_top"
  | "section_dwell";

export interface ThoughtPrompt {
  text: string;
  duration?: number;
}

export interface SmartAttentionEventPayload {
  type: SmartEvent;
  sectionName?: string;
  timestamp: number;
}

export interface OrbContextState {
  state: OrbState;
  lastEvent?: SmartEvent;
  lastPrompt?: string;
  isThinking: boolean;
  isBubbleVisible: boolean;
  isChatOpen: boolean;
}
