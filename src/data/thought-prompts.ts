import type { SmartEvent, ThoughtPrompt } from "@/types/orb";

const IDLE_PROMPTS: ThoughtPrompt[] = [
  { text: "Quer descobrir onde a IA pode reduzir custos?" },
  { text: "Empresas crescem mais rápido quando automatizam processos críticos." },
];

const SCROLL_DEEP_PROMPTS: ThoughtPrompt[] = [
  { text: "Posso identificar gargalos operacionais em menos de 2 minutos." },
  { text: "Quer descobrir onde a IA pode reduzir custos?" },
];

const PROJECT_HOVER_PROMPTS: ThoughtPrompt[] = [
  { text: "Posso identificar gargalos operacionais em menos de 2 minutos." },
];

const BACK_TO_TOP_PROMPTS: ThoughtPrompt[] = [
  { text: "Ainda avaliando soluções? Posso ajudar." },
];

const SECTION_DWELL_PROMPTS: ThoughtPrompt[] = [
  { text: "Empresas crescem mais rápido quando automatizam processos críticos." },
  { text: "Posso identificar gargalos operacionais em menos de 2 minutos." },
];

function getRandomPrompt(prompts: ThoughtPrompt[]): ThoughtPrompt {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

export function selectPromptByEvent(event: SmartEvent): string {
  switch (event) {
    case "user_idle":
      return getRandomPrompt(IDLE_PROMPTS).text;

    case "scroll_deep":
      return getRandomPrompt(SCROLL_DEEP_PROMPTS).text;

    case "project_hover":
      return getRandomPrompt(PROJECT_HOVER_PROMPTS).text;

    case "back_to_top":
      return getRandomPrompt(BACK_TO_TOP_PROMPTS).text;

    case "section_dwell":
      return getRandomPrompt(SECTION_DWELL_PROMPTS).text;

    default:
      return IDLE_PROMPTS[0].text;
  }
}

export const thoughtPrompts = {
  idle: IDLE_PROMPTS,
  scroll_deep: SCROLL_DEEP_PROMPTS,
  project_hover: PROJECT_HOVER_PROMPTS,
  back_to_top: BACK_TO_TOP_PROMPTS,
  section_dwell: SECTION_DWELL_PROMPTS,
};
