import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Checkbox } from "@/registry/crashoverride/ui/checkbox"

describe("Checkbox", () => {
  it("renders a hairline --input box with the sharp brand radius", () => {
    render(<Checkbox aria-label="agree" />)
    const el = screen.getByRole("checkbox", { name: "agree" })
    expect(el.className).toMatch(/border-input/)
    expect(el.className).toMatch(/rounded-/)
  })

  it("fills with the neon --primary when checked", () => {
    render(<Checkbox defaultChecked aria-label="agree" />)
    const el = screen.getByRole("checkbox", { name: "agree" })
    expect(el.getAttribute("data-state")).toBe("checked")
    expect(el.className).toMatch(/data-\[state=checked\]:bg-primary/)
  })

  it("uses the neon focus ring", () => {
    render(<Checkbox aria-label="agree" />)
    const el = screen.getByRole("checkbox", { name: "agree" })
    expect(el.className).toMatch(/focus-visible:ring-ring/)
  })
})
