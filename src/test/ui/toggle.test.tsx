import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Toggle } from "@/registry/crashoverride/ui/toggle"

describe("Toggle", () => {
  it("renders the label in the quiet muted voice by default", () => {
    render(<Toggle aria-label="bold">B</Toggle>)
    const el = screen.getByRole("button", { name: "bold" })
    expect(el.className).toMatch(/text-muted-foreground/)
    expect(el.getAttribute("data-state")).toBe("off")
  })

  it("lifts to --accent when pressed", () => {
    render(
      <Toggle defaultPressed aria-label="bold">
        B
      </Toggle>,
    )
    const el = screen.getByRole("button", { name: "bold" })
    expect(el.getAttribute("data-state")).toBe("on")
    expect(el.className).toMatch(/data-\[state=on\]:bg-accent/)
  })

  it("applies the outline variant", () => {
    render(
      <Toggle variant="outline" aria-label="bold">
        B
      </Toggle>,
    )
    const el = screen.getByRole("button", { name: "bold" })
    expect(el.className).toMatch(/border-input/)
  })
})
