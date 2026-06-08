import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip"
import { Button } from "./button"

/**
 * Tooltip — a hover/focus bubble in the brand's compact mono voice. Usage must
 * sit inside a `TooltipProvider` (one near the app root). Hover or keyboard-focus
 * the trigger in any story below to see it open live.
 */
const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Tooltip. Compose `TooltipTrigger` (use `asChild` for a Button) + `TooltipContent`, all under a single `TooltipProvider`. Tune `side` on the content and `delayDuration` on the provider.",
      },
    },
  },
  argTypes: {
    open: {
      control: false,
      description: "Controlled open state (pair with `onOpenChange`).",
    },
    defaultOpen: {
      control: "boolean",
      description: "Uncontrolled initial open state.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    defaultOpen: false,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — hover or focus the button. */
export const Playground: Story = {
  render: (args) => (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="ghost">Copy SBOM</Button>
        </TooltipTrigger>
        <TooltipContent>Copy the deterministic SBOM hash</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

/** Placement — one tooltip per side, all under one provider. */
export const Sides: Story = {
  render: () => (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-wrap gap-4">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="secondary">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>From the {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
}

/** Open by default — useful for documenting the bubble styling. */
export const DefaultOpen: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="ghost">Re-scan</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Last scan: 6 min ago</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
