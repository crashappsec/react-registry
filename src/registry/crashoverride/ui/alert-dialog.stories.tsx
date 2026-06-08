import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog"
import { Button } from "./button"

/**
 * AlertDialog — a confirm/destructive modal. Unlike Dialog it has no quiet
 * dismiss: the user must choose Cancel or the Action. Click the trigger in any
 * story below to open it; the Action / Cancel buttons close it live.
 */
const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix AlertDialog. Compose `AlertDialogTrigger` + `AlertDialogContent` with a header (Title + Description) and a footer of `AlertDialogCancel` + `AlertDialogAction`. The Action takes `variant=\"destructive\"` for irreversible operations.",
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
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — a destructive confirm. */
export const Playground: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Delete service</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this service?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes prod-bandwidth-system and its scan history.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete service
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/** A non-destructive confirm — the Action uses the default neon fill. */
export const Confirm: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Publish report</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish this report?</AlertDialogTitle>
          <AlertDialogDescription>
            The portfolio health report will be visible to everyone in your org.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not yet</AlertDialogCancel>
          <AlertDialogAction>Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/** Controlled — open state lives in the story and is echoed below. */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col items-start gap-2">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">Revoke token</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Revoke token?</AlertDialogTitle>
              <AlertDialogDescription>
                Any integration using this token will stop working immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep token</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Revoke</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="font-mono text-[11px] text-muted-foreground">
          open: {String(open)}
        </p>
      </div>
    )
  },
}
