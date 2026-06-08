import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command"
import { Button } from "./button"

/**
 * Command — a keyboard-first command palette in the brand's terminal flavour.
 * The inline variant renders a searchable, grouped list directly; the
 * `CommandDialog` variant floats the same palette in a centered modal. Type in
 * the search field in any story below to filter live.
 */
const meta = {
  title: "Components/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn palette over `cmdk`. Compose `CommandInput` + `CommandList` (with `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`). Use `CommandDialog` to present the same palette as a centered modal — drive its open state with `open` + `onOpenChange`.",
      },
    },
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

const PaletteBody = () => (
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>
        Search services
        <CommandShortcut>⌘K</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Re-scan portfolio
        <CommandShortcut>⌘R</CommandShortcut>
      </CommandItem>
      <CommandItem>Generate llms.txt</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Navigate">
      <CommandItem>Open dashboard</CommandItem>
      <CommandItem>Open reports</CommandItem>
      <CommandItem>Open settings</CommandItem>
    </CommandGroup>
  </CommandList>
)

/** Inline palette — type to filter, arrow keys to move. */
export const Playground: Story = {
  render: () => (
    <Command className="w-80 rounded-md border border-border shadow-md">
      <CommandInput placeholder="Type a command or search…" />
      <PaletteBody />
    </Command>
  ),
}

/** The empty state — search for something that won't match. */
export const EmptyState: Story = {
  render: () => (
    <Command className="w-80 rounded-md border border-border shadow-md">
      <CommandInput placeholder="Search… (try 'xyzzy')" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Search services</CommandItem>
          <CommandItem>Re-scan portfolio</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

/** The modal variant — click the button to open the palette as a centered dialog. */
export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col items-start gap-2">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open command palette
        </Button>
        <p className="font-mono text-[11px] text-muted-foreground">
          press the button — Esc to close
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search…" />
          <PaletteBody />
        </CommandDialog>
      </div>
    )
  },
}
