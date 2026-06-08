import type { Meta, StoryObj } from "@storybook/react-vite"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card"
import { Button } from "./button"

/**
 * HoverCard — a preview card that opens after a short hover/focus delay (e.g. a
 * user or repo mention). Hover or keyboard-focus the trigger in any story below
 * to see it open live.
 */
const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix HoverCard. Compose `HoverCardTrigger` (use `asChild` to render a link) + `HoverCardContent`. Tune `openDelay` / `closeDelay` on the root and placement via `side` / `align` on the content.",
      },
    },
  },
  argTypes: {
    openDelay: {
      control: "number",
      description: "Delay in ms before the card opens on hover.",
      table: { defaultValue: { summary: "700" } },
    },
    closeDelay: {
      control: "number",
      description: "Delay in ms before the card closes after leaving.",
      table: { defaultValue: { summary: "300" } },
    },
  },
  args: {
    openDelay: 200,
    closeDelay: 150,
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — hover the link to preview a contributor. */
export const Playground: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <a
          href="#"
          className="font-mono text-sm text-primary underline-offset-4 hover:underline"
        >
          @savannah
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1.5">
          <p className="font-display text-sm font-semibold">Savannah Nguyen</p>
          <p className="text-xs text-muted-foreground">
            Platform team · maintains 12 services · last commit 2h ago.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

/** A repo preview triggered from a Button. */
export const RepoPreview: Story = {
  render: () => (
    <HoverCard openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
        <Button variant="ghost">prod-bandwidth-system</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-1.5">
          <p className="font-display text-sm font-semibold">
            crashappsec/prod-bandwidth-system
          </p>
          <p className="text-xs text-muted-foreground">
            Health: At Risk · 94 days since release · 3 critical advisories.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
