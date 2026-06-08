import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "@/registry/crashoverride/ui/menubar"

function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New<MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

describe("Menubar", () => {
  it("renders a bar with brand-voiced triggers", () => {
    render(<Example />)
    const file = screen.getByText("File")
    expect(file).toBeInTheDocument()
    expect(file.className).toMatch(/font-display/)
    expect(screen.getByText("Edit")).toBeInTheDocument()
  })

  it("opens a menu onto the popover surface on click", () => {
    render(<Example />)
    fireEvent.pointerDown(screen.getByText("File"), {
      button: 0,
      ctrlKey: false,
      pointerType: "mouse",
    })
    fireEvent.click(screen.getByText("File"))
    const menu = screen.getByRole("menu")
    expect(menu.className).toMatch(/bg-popover/)
    expect(menu.className).toMatch(/border-border/)
    const del = screen.getByText("Delete")
    expect(del.getAttribute("data-variant")).toBe("destructive")
  })
})
