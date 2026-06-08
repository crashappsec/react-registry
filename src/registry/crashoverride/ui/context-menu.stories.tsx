import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "./context-menu"

/**
 * ContextMenu — right-click a region to open a menu at the cursor. The trigger
 * is the region itself. Right-click (or long-press) the dashed area in any story
 * below to open the menu and pick an item live.
 */
const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix ContextMenu. Wrap the right-clickable region in `ContextMenuTrigger` and supply a `ContextMenuContent` of items, labels, separators, shortcuts, checkbox/radio items, and submenus. `variant=\"destructive\"` maps an item to the destructive token.",
      },
    },
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

const TriggerArea = ({ children }: { children?: React.ReactNode }) => (
  <ContextMenuTrigger className="flex h-40 w-80 items-center justify-center rounded-md border border-dashed border-border font-mono text-xs text-muted-foreground select-none">
    {children ?? "Right-click here"}
  </ContextMenuTrigger>
)

/** Fully interactive — labels, shortcuts, a separator, and a destructive item. */
export const Playground: Story = {
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>Service</ContextMenuLabel>
        <ContextMenuItem>
          Open
          <ContextMenuShortcut>⏎</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Re-scan
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/** Checkbox + radio rows and a nested submenu. */
export const WithSelections: Story = {
  render: () => {
    const [pinned, setPinned] = React.useState(true)
    const [view, setView] = React.useState("grid")
    return (
      <ContextMenu>
        <TriggerArea>Right-click for options</TriggerArea>
        <ContextMenuContent className="w-56">
          <ContextMenuCheckboxItem
            checked={pinned}
            onCheckedChange={(v) => setPinned(!!v)}
          >
            Pin to top
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
            <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Move to portfolio</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Platform</ContextMenuItem>
              <ContextMenuItem>Data</ContextMenuItem>
              <ContextMenuItem>Security</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}
