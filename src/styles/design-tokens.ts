/**
 * Nexus Labs AI Systems — Design Tokens
 * Direção: Editorial Brutalist × Fintech Premium
 * Fonte de verdade: pipeflow-brand-guide-v2.md
 */

export const colors = {
  bg:           "#0c0c0e",
  surface:      "#141416",
  surface2:     "#1a1a1e",
  border:       "#2a2a2e",
  borderSubtle: "#1e1e22",

  text:          "#e8e8e8",
  textSecondary: "#8a8a8f",
  textMuted:     "#555559",

  accent:   "#caff33",

  positive: "#2ed573",
  negative: "#ff4757",
  warm:     "#ff6b35",
  cool:     "#5b7fff",
} as const;

export const fontFamily = {
  display: 'var(--font-syne), "Syne", sans-serif',
  body:    'var(--font-dm-sans), "DM Sans", sans-serif',
  mono:    'var(--font-ibm-plex-mono), "IBM Plex Mono", monospace',
} as const;

export const fontWeight = {
  light:     "300",
  regular:   "400",
  medium:    "500",
  semibold:  "600",
  bold:      "700",
  extrabold: "800",
} as const;

export const fontSize = {
  heroH1:   { size: "clamp(48px, 6vw, 64px)", weight: "800", tracking: "-2px" },
  sectionH2:{ size: "clamp(28px, 4vw, 42px)", weight: "700", tracking: "-1.5px" },
  cardH3:   { size: "18px",                    weight: "600", tracking: "normal" },
  body:     { size: "16px",                    weight: "400", lineHeight: "1.65" },
  label:    { size: "11px",                    weight: "500", tracking: "0.15em", transform: "uppercase" },
  metric:   { size: "32px",                    weight: "700", tracking: "-1px" },
  delta:    { size: "11px",                    weight: "400" },
  index:    { size: "11px",                    weight: "400" },
} as const;

export const radius = {
  sm:  "4px",
  md:  "8px",   /* máximo permitido em containers */
  lg:  "12px",  /* máximo absoluto — nunca exceder */
} as const;

export const transitions = {
  fast:         "150ms ease",
  normal:       "200ms ease",
  slow:         "300ms ease",
  reveal:       "600ms ease",
  accentLine:   "400ms ease",
  pipelineBar:  "1500ms ease",
} as const;

export const spacing = {
  base: 8,
  unit: (n: number) => `${n * 8}px`,
} as const;

export type Color = keyof typeof colors;
