import type { Preview } from "@storybook/react-vite"
import { withThemeByDataAttribute } from "@storybook/addon-themes"

// Load the brand theme so every story is styled exactly like a consuming app.
// globals.css carries the oklch light+dark token bridge, the @theme inline
// color/font mapping, and the @font-face rules. It keys off both `.dark`/`.light`
// and `[data-theme=dark|light]`, so the toolbar toggle below switches it live.
import "@/registry/crashoverride/theme/globals.css"

const preview: Preview = {
  // Apply the brand fonts + foreground/background to the docs canvas too, so
  // MDX foundation pages render on-brand (not just the story iframe).
  tags: ["autodocs"],
  parameters: {
    // The theme owns the background (via `body { background: var(--background) }`).
    // Storybook's own backgrounds toolbar would fight it, so turn it off.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Introduction", "Colors", "Typography", "Spacing & Radius", "Theming"],
          "Components",
          "Blocks",
        ],
      },
    },
    a11y: { test: "todo" },
  },
  decorators: [
    // Paint the brand surface behind every story so components render themed in
    // BOTH the canvas AND the autodocs doc-blocks. Without this, Storybook's docs
    // blocks default to a white background and the dark-first variants (secondary,
    // ghost, outline) become invisible — making the design system look "unthemed".
    (Story) => (
      <div
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          padding: "1.75rem",
          borderRadius: "var(--radius)",
        }}
      >
        <Story />
      </div>
    ),
    // Light/dark toggle in the toolbar. globals.css keys off [data-theme],
    // so flipping this attribute on <html> re-resolves every token live.
    withThemeByDataAttribute({
      themes: { dark: "dark", light: "light" },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
  ],
}

export default preview
