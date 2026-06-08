import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./badge"

/**
 * Badge — small status / label pill keyed to the brand palette. `tone` picks
 * the colour (neutral + the capability hues + danger); `variant` picks the fill
 * (`soft` tinted, `outline` bordered). `dot` adds a leading status dot.
 */
const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Lowercase mono pill with wide tracking and sharp brand corners. `tone` maps to the brand palette (resolved via the theme's chart tokens so light/dark both work); `variant` switches between a tinted `soft` fill and a bordered `outline`.",
      },
    },
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "neon", "cobalt", "magenta", "amber", "teal", "danger"],
      description: "Palette key — neutral, the four capability hues, plus danger.",
      table: { defaultValue: { summary: "neutral" } },
    },
    variant: {
      control: "inline-radio",
      options: ["soft", "outline"],
      description: "`soft` = tinted background + accent text · `outline` = transparent fill + accent border.",
      table: { defaultValue: { summary: "soft" } },
    },
    dot: {
      control: "boolean",
      description: "Leading status dot in the current text colour.",
      table: { defaultValue: { summary: "false" } },
    },
    asChild: {
      control: false,
      description: "Render the child element instead of a <span> (Radix Slot).",
    },
    children: {
      control: "text",
      description: "Badge label.",
    },
  },
  args: {
    children: "healthy",
    tone: "neon",
    variant: "soft",
    dot: false,
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — drive tone, variant and dot from Controls. */
export const Playground: Story = {}

export const Soft: Story = {
  args: { variant: "soft", tone: "neon", children: "soft" },
}

export const Outline: Story = {
  args: { variant: "outline", tone: "cobalt", children: "outline" },
}

export const WithDot: Story = {
  args: { dot: true, tone: "teal", children: "live" },
}

export const Danger: Story = {
  args: { tone: "danger", children: "at risk" },
}

/** Every tone, soft fill. */
export const AllTones: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {(["neutral", "neon", "cobalt", "magenta", "amber", "teal", "danger"] as const).map(
        (tone) => (
          <Badge key={tone} {...args} tone={tone}>
            {tone}
          </Badge>
        ),
      )}
    </div>
  ),
}

/** Soft vs outline, side by side, with a leading dot. */
export const SoftVsOutline: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(["neon", "cobalt", "magenta", "amber", "teal", "danger"] as const).map((tone) => (
        <div key={tone} className="flex items-center gap-2">
          <Badge tone={tone} variant="soft" dot>
            {tone}
          </Badge>
          <Badge tone={tone} variant="outline" dot>
            {tone}
          </Badge>
        </div>
      ))}
    </div>
  ),
}
