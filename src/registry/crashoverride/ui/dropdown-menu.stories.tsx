import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu"
import { Button } from "./button"

/**
 * DropdownMenu — a click-triggered menu. The panel portals over the page with
 * the highlighted row lifting to `--accent` and labels in the uppercase mono
 * voice. Click the trigger in any story below to open it and pick an item live.
 */
const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix DropdownMenu. Compose `DropdownMenuTrigger` (use `asChild` for a Button) + `DropdownMenuContent` of `DropdownMenuItem`s, with optional labels, separators, shortcuts, checkbox/radio items, and submenus. `variant=\"destructive\"` maps an item to the destructive token.",
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
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — labels, shortcuts, a separator, and a destructive item. */
export const Playground: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Service</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Rename
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Re-scan
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Generate report</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          Delete service
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/** Checkbox items — toggle which columns are visible. */
export const CheckboxItems: Story = {
  render: () => {
    const [cols, setCols] = React.useState({
      health: true,
      release: true,
      advisories: false,
    })
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Columns</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={cols.health}
            onCheckedChange={(v) => setCols((c) => ({ ...c, health: !!v }))}
          >
            Health
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={cols.release}
            onCheckedChange={(v) => setCols((c) => ({ ...c, release: !!v }))}
          >
            Last release
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={cols.advisories}
            onCheckedChange={(v) => setCols((c) => ({ ...c, advisories: !!v }))}
          >
            Advisories
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/** Radio group — pick one sort order. */
export const RadioItems: Story = {
  render: () => {
    const [sort, setSort] = React.useState("health")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Sort</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="health">Health</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="release">
              Last release
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/** A nested submenu. */
export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem>Open</DropdownMenuItem>
        <DropdownMenuItem>Re-scan</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Move to portfolio</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Platform</DropdownMenuItem>
            <DropdownMenuItem>Data</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
