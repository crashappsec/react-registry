import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { IconButton } from "@/registry/crashoverride/ui/icon-button"

function Glyph() {
  return <svg data-testid="glyph" viewBox="0 0 24 24" />
}

describe("IconButton", () => {
  it("uses label as the accessible name and the tooltip", () => {
    render(
      <IconButton label="Settings">
        <Glyph />
      </IconButton>,
    )
    const el = screen.getByRole("button", { name: "Settings" })
    expect(el.getAttribute("title")).toBe("Settings")
    expect(el.className).toMatch(/size-9/)
  })

  it("fires onClick", () => {
    const onClick = vi.fn()
    render(
      <IconButton label="Next" onClick={onClick}>
        <Glyph />
      </IconButton>,
    )
    fireEvent.click(screen.getByRole("button", { name: "Next" }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("applies the solid variant and sm size", () => {
    render(
      <IconButton label="Close" variant="solid" size="sm">
        <Glyph />
      </IconButton>,
    )
    const el = screen.getByRole("button", { name: "Close" })
    expect(el.className).toMatch(/bg-secondary/)
    expect(el.className).toMatch(/size-7/)
  })
})
