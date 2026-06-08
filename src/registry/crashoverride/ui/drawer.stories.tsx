import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer"
import { Button } from "./button"

/**
 * Drawer — a bottom drawer with a grab handle that slides up over a scrim
 * (mobile-first). Built on `vaul`. Click the trigger in any story below to open
 * it; drag the handle down, press Esc, or tap the scrim to dismiss.
 */
const meta = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn Drawer over `vaul`. Compose `DrawerTrigger` + `DrawerContent` with a `DrawerHeader` (Title + Description), body, and `DrawerFooter`. Drive open state with `open` + `onOpenChange`; `shouldScaleBackground` scales the page behind it.",
      },
    },
  },
  argTypes: {
    open: {
      control: false,
      description: "Controlled open state (pair with `onOpenChange`).",
    },
    shouldScaleBackground: {
      control: "boolean",
      description: "Scale the page behind the drawer as it opens.",
      table: { defaultValue: { summary: "true" } },
    },
  },
  args: {
    shouldScaleBackground: true,
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — quick actions for a service. */
export const Playground: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="secondary">Quick actions</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick actions</DrawerTitle>
          <DrawerDescription>
            Run a task on prod-bandwidth-system.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Re-scan now</Button>
          <Button variant="secondary">Generate report</Button>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

/** A drawer carrying a short body block. */
export const WithContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">View summary</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>This week</DrawerTitle>
          <DrawerDescription>Activity across the portfolio.</DrawerDescription>
        </DrawerHeader>
        <div className="px-6 pb-2 text-sm text-muted-foreground">
          12 deployments · 0 failed builds · 3 services moved to Healthy ·
          1 flagged At Risk.
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

/** Controlled — open state lives in the story and is echoed below. */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col items-start gap-2">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="secondary">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled drawer</DrawerTitle>
              <DrawerDescription>
                Open state is owned by the story via useState.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <p className="font-mono text-[11px] text-muted-foreground">
          open: {String(open)}
        </p>
      </div>
    )
  },
}
