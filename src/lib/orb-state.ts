import type { OrbState, SmartEvent } from "@/types/orb";

export type OrbStateTransition = {
  state: OrbState;
  isThinking: boolean;
  isBubbleVisible: boolean;
  isChatOpen: boolean;
  lastEvent?: SmartEvent;
};

export function createInitialOrbState(): OrbStateTransition {
  return {
    state: "idle",
    isThinking: false,
    isBubbleVisible: false,
    isChatOpen: false,
  };
}

export function transitionOrbState(
  current: OrbStateTransition,
  action: "idle" | "thinking" | "bubble_show" | "bubble_hide" | "chat_open" | "chat_close"
): OrbStateTransition {
  switch (action) {
    case "thinking":
      return {
        ...current,
        state: "thinking",
        isThinking: true,
      };

    case "bubble_show":
      return {
        ...current,
        state: "bubble_visible",
        isBubbleVisible: true,
      };

    case "bubble_hide":
      return {
        ...current,
        state: "idle",
        isBubbleVisible: false,
        isThinking: false,
      };

    case "chat_open":
      return {
        ...current,
        state: "chat_open",
        isChatOpen: true,
        isBubbleVisible: false,
        isThinking: false,
      };

    case "chat_close":
      return {
        ...current,
        state: "idle",
        isChatOpen: false,
      };

    case "idle":
    default:
      return {
        ...current,
        state: "idle",
        isThinking: false,
        isBubbleVisible: false,
      };
  }
}
