import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarRadioGroup,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "./menubar"

/**
 * Menubar — a desktop-style persistent menu bar. Each `MenubarMenu` has a
 * trigger that drops a menu onto the popover surface. Click any trigger in the
 * stories below to open its menu live; moving across triggers switches menus.
 */
const meta = {
  title: "Components/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Menubar. Compose `Menubar` of `MenubarMenu`s, each with a `MenubarTrigger` + `MenubarContent` of items, separators, shortcuts, checkbox/radio items, and submenus.",
      },
    },
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — a File / Edit / View bar. */
export const Playground: Story = {
  render: () => {
    const [grid, setGrid] = React.useState(true)
    const [density, setDensity] = React.useState("comfortable")
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New service
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New report
              <MenubarShortcut>⇧⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Export</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>llms.txt</MenubarItem>
                <MenubarItem>SBOM (JSON)</MenubarItem>
                <MenubarItem>PDF report</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">Delete selection</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={grid}
              onCheckedChange={(v) => setGrid(!!v)}
            >
              Grid layout
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value={density} onValueChange={setDensity}>
              <MenubarRadioItem value="comfortable">
                Comfortable
              </MenubarRadioItem>
              <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },
}

/** A single menu — the minimal shape. */
export const SingleMenu: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Service</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Re-scan
            <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Generate report</MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
