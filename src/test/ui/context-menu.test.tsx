import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/registry/crashoverride/ui/context-menu"

function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Service</ContextMenuLabel>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

describe("ContextMenu", () => {
  it("renders the trigger and stays closed until right-click", () => {
    render(<Example />)
    expect(screen.getByText("Right-click me")).toBeInTheDocument()
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("opens at the cursor onto the popover surface with a mono label", () => {
    render(<Example />)
    fireEvent.contextMenu(screen.getByText("Right-click me"))
    const menu = screen.getByRole("menu")
    expect(menu.className).toMatch(/bg-popover/)
    expect(menu.className).toMatch(/border-border/)
    const label = screen.getByText("Service")
    expect(label.className).toMatch(/uppercase/)
    expect(label.className).toMatch(/font-mono/)
  })

  it("maps destructive items to the destructive token", () => {
    render(<Example />)
    fireEvent.contextMenu(screen.getByText("Right-click me"))
    const del = screen.getByText("Delete")
    expect(del.getAttribute("data-variant")).toBe("destructive")
    expect(del.className).toMatch(/data-\[variant=destructive\]:text-destructive/)
  })
})
