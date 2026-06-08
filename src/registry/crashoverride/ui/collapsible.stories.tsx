import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible"
import { Button } from "./button"
import { ChevronsUpDown } from "lucide-react"

/**
 * Collapsible — a single expandable region driven by your own trigger. Content
 * slides/fades in on open. Click the trigger in any story below to toggle the
 * region live.
 */
const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Collapsible. Compose a `CollapsibleTrigger` (use `asChild` for a Button) + `CollapsibleContent`. Drive open state with `open` + `onOpenChange`, or leave it uncontrolled with `defaultOpen`.",
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
    disabled: {
      control: "boolean",
      description: "Disable the trigger.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    defaultOpen: false,
    disabled: false,
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — click the row to reveal the advisories. */
export const Playground: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-80">
      <div className="flex items-center justify-between gap-3 rounded-md border border-border px-4 py-2.5">
        <span className="font-mono text-sm">3 open advisories</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="Toggle advisories">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-1.5 space-y-1.5">
        {["CVE-2024-1001 · critical", "CVE-2024-2087 · high", "CVE-2024-3120 · moderate"].map(
          (cve) => (
            <div
              key={cve}
              className="rounded-md border border-border px-4 py-2 font-mono text-[13px] text-muted-foreground"
            >
              {cve}
            </div>
          ),
        )}
      </CollapsibleContent>
    </Collapsible>
  ),
}

/** A plain text trigger + body. */
export const TextTrigger: Story = {
  render: () => (
    <Collapsible className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="secondary">Show scan details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Last scan ran 6 minutes ago against the default branch. 18 checks
        passed, 2 flagged, 0 errored.
      </CollapsibleContent>
    </Collapsible>
  ),
}

/** Controlled — open state lives in the story and is echoed below. */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex w-80 flex-col gap-2">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="secondary">
              {open ? "Hide" : "Show"} details
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
            Open state is owned by the story via useState.
          </CollapsibleContent>
        </Collapsible>
        <p className="font-mono text-[11px] text-muted-foreground">
          open: {String(open)}
        </p>
      </div>
    )
  },
}
