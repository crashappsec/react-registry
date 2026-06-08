import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

/**
 * Popover — rich floating content anchored to a trigger. Click to toggle, click
 * away to close. Click the trigger in any story below to open it live.
 */
const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Popover. Compose `PopoverTrigger` (use `asChild` for a Button) + `PopoverContent`. Tune placement on the content via `side` and `align`. Drive open state with `open` + `onOpenChange`.",
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
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — open the panel and edit inline. */
export const Playground: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="secondary">Set threshold</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-3">
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">Health threshold</p>
            <p className="text-xs text-muted-foreground">
              Score below which a service is flagged At Risk.
            </p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="threshold">Score</Label>
            <Input id="threshold" defaultValue="60" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/** Plain informational content, no form. */
export const Info: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Why At Risk?</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-muted-foreground">
          No release in 94 days and 3 open critical advisories. Beaconing from
          prod since 14:02.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

/** Placement — one trigger per side. */
export const Placement: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="secondary">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side} className="w-48">
            <p className="text-sm text-muted-foreground">
              Anchored to the {side}.
            </p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}

/** Controlled — open state lives in the story and is echoed below. */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col items-start gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="secondary">Toggle</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-muted-foreground">
              Open state is owned by the story via useState.
            </p>
          </PopoverContent>
        </Popover>
        <p className="font-mono text-[11px] text-muted-foreground">
          open: {String(open)}
        </p>
      </div>
    )
  },
}
