import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

/**
 * Sheet — an edge-anchored side panel that slides in over a scrim. `side`
 * chooses the anchored edge (right by default). Click the trigger in any story
 * below to open it; the close affordance, Esc, or the scrim dismiss it.
 */
const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Sheet (built on Radix Dialog). Compose `SheetTrigger` + `SheetContent` (set `side` on the content) with a `SheetHeader`, body, and optional `SheetFooter`. Drive open state with `open` + `onOpenChange`.",
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
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

const SIDES = ["right", "left", "top", "bottom"] as const

/** Fully interactive — a filter panel on the right edge. */
export const Playground: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="secondary">Filters</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow the result set.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="filter-team">Team</Label>
            <Input id="filter-team" placeholder="platform" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="filter-status">Status</Label>
            <Input id="filter-status" placeholder="at risk" />
          </div>
        </div>
        <SheetFooter>
          <Button>Apply filters</Button>
          <SheetClose asChild>
            <Button variant="secondary">Reset</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/** One trigger per side — open from any edge. */
export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="secondary">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Anchored {side}</SheetTitle>
              <SheetDescription>
                This panel slides in from the {side} edge.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
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
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary">Open panel</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Controlled sheet</SheetTitle>
              <SheetDescription>
                Open state is owned by the story via useState.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <p className="font-mono text-[11px] text-muted-foreground">
          open: {String(open)}
        </p>
      </div>
    )
  },
}
