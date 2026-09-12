import type { Config } from "tailwindcss";
import { colors } from "./lib/theme";

/**
 * Named palette + type families for the Akisok editorial system.
 * Tailwind v4 also registers these in `app/globals.css` via `@theme`
 * so utilities like `bg-cream` / `font-display` resolve in the App Router.
 */
const config: Config = {
  theme: {
    extend: {
      colors: {
        cream: colors.cream,
        paper: colors.paper,
        ink: colors.ink,
        "forest-deep": colors.forestDeep,
        accent: colors.accent,
        sage: colors.sage,
        "sage-muted": colors.sageMuted,
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
        body: ["var(--font-source-serif)", "Georgia", "serif"],
      },
    },
  },
};

export default config;
