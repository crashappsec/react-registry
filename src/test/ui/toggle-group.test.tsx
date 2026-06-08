import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/crashoverride/ui/toggle-group"

describe("ToggleGroup", () => {
  it("renders a joined segmented group of items", () => {
    render(
      <ToggleGroup type="single" defaultValue="grid">
        <ToggleGroupItem value="grid" aria-label="Grid" />
        <ToggleGroupItem value="list" aria-label="List" />
      </ToggleGroup>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
    expect(screen.getAllByRole("radio")).toHaveLength(2)
  })

  it("marks the default single value as pressed", () => {
    render(
      <ToggleGroup type="single" defaultValue="grid">
        <ToggleGroupItem value="grid" aria-label="Grid" />
        <ToggleGroupItem value="list" aria-label="List" />
      </ToggleGroup>,
    )
    const grid = screen.getByRole("radio", { name: "Grid" })
    expect(grid.getAttribute("data-state")).toBe("on")
    expect(grid.className).toMatch(/data-\[state=on\]:bg-accent/)
  })

  it("inherits the shared variant/size from the group context", () => {
    render(
      <ToggleGroup type="multiple" size="sm">
        <ToggleGroupItem value="bold" aria-label="Bold" />
      </ToggleGroup>,
    )
    const el = screen.getByRole("button", { name: "Bold" })
    expect(el.className).toMatch(/h-\[30px\]/)
  })
})
