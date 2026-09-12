/** Design tokens — keep hex values here and in `tailwind.config.ts` / `@theme`, not in components. */
export const colors = {
  cream: "#f5f3ee",
  paper: "#fbfaf6",
  ink: "#1a3d2e",
  forestDeep: "#10261c",
  accent: "#2d6b4f",
  sage: "#8fa88a",
  sageMuted: "#c4d1be",
} as const;

export const fonts = {
  display: "var(--font-fraunces), Georgia, serif",
  mono: "var(--font-ibm-plex-mono), ui-monospace, monospace",
  body: "var(--font-source-serif), Georgia, serif",
} as const;
