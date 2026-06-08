import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Switch } from "@/registry/crashoverride/ui/switch"

describe("Switch", () => {
  it("renders the --input track when off", () => {
    render(<Switch aria-label="enabled" />)
    const el = screen.getByRole("switch", { name: "enabled" })
    expect(el.className).toMatch(/data-\[state=unchecked\]:bg-input/)
    expect(el.getAttribute("data-state")).toBe("unchecked")
  })

  it("fills with the neon --primary when on", () => {
    render(<Switch defaultChecked aria-label="enabled" />)
    const el = screen.getByRole("switch", { name: "enabled" })
    expect(el.getAttribute("data-state")).toBe("checked")
    expect(el.className).toMatch(/data-\[state=checked\]:bg-primary/)
  })

  it("uses the neon focus ring", () => {
    render(<Switch aria-label="enabled" />)
    const el = screen.getByRole("switch", { name: "enabled" })
    expect(el.className).toMatch(/focus-visible:ring-ring/)
  })
})
