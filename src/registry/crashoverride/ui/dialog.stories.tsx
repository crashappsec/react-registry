import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

/**
 * Dialog — centered modal over a dimmed, lightly blurred scrim. Compose
 * `DialogTrigger` + `DialogContent`; the content portals over the page and the
 * trigger toggles it. Click the trigger in any story below to open it live.
 */
const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Dialog. Wrap a `DialogTrigger` (use `asChild` to render a Button) and a `DialogContent` with a `DialogHeader` (Title + Description) and `DialogFooter` of actions. Drive open state with `open` + `onOpenChange`, or leave it uncontrolled.",
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
    modal: {
      control: "boolean",
      description: "Trap focus and block the page behind the scrim.",
      table: { defaultValue: { summary: "true" } },
    },
  },
  args: {
    defaultOpen: false,
    modal: true,
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — click to open, Esc / scrim / close to dismiss. */
export const Playground: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Rotate key</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rotate API key</DialogTitle>
          <DialogDescription>
            Your current key stops working immediately. Update any integrations
            before you continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Rotate key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/** A form inside the dialog — fields plus a save/cancel row. */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit service</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit service</DialogTitle>
          <DialogDescription>
            Update the display name and owning team for this service.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="svc-name">Name</Label>
            <Input id="svc-name" defaultValue="prod-bandwidth-system" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="svc-team">Owning team</Label>
            <Input id="svc-team" defaultValue="platform" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/** Controlled — open state lives in the story and is echoed below. */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col items-start gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled dialog</DialogTitle>
              <DialogDescription>
                Open state is owned by the story via useState.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Got it</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="font-mono text-[11px] text-muted-foreground">
          open: {String(open)}
        </p>
      </div>
    )
  },
}
