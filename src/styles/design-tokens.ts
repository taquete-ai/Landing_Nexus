export const colors = {
  background:  "#0a0a0a",
  surface:     "#111111",
  border:      "#1e1e1e",
  textPrimary: "#f5f5f5",
  textMuted:   "#6b6b6b",
  accent:      "#caff33",
  accentDim:   "#a8d400",
} as const;

export const fontFamily = {
  display: "var(--font-space-grotesk), Space Grotesk, sans-serif",
  body:    "var(--font-inter), Inter, sans-serif",
  mono:    "var(--font-jetbrains-mono), JetBrains Mono, monospace",
} as const;

export const fontWeight = {
  regular: "400",
  medium:  "500",
  bold:    "700",
  black:   "900",
} as const;

export const spacing = {
  base: "8px",
} as const;

export const radius = {
  sm:  "0.25rem",
  md:  "0.375rem",
  lg:  "0.5rem",
} as const;

export const transitions = {
  fast:   "150ms ease",
  normal: "200ms ease",
  slow:   "300ms ease",
} as const;

export type Color = keyof typeof colors;
