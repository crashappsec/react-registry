import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Progress } from "@/registry/crashoverride/ui/progress"

describe("Progress", () => {
  it("renders a progressbar on a muted track", () => {
    render(<Progress value={40} />)
    const bar = screen.getByRole("progressbar")
    expect(bar.className).toMatch(/bg-muted/)
    expect(bar.className).toMatch(/rounded-full/)
  })

  it("fills the indicator with the neon --primary, offset by value", () => {
    const { container } = render(<Progress value={72} />)
    const indicator = container.querySelector(
      '[data-slot="progress-indicator"]',
    ) as HTMLElement
    expect(indicator).not.toBeNull()
    expect(indicator.className).toMatch(/bg-primary/)
    expect(indicator.style.transform).toBe("translateX(-28%)")
  })

  it("reflects the value in the accessible state", () => {
    render(<Progress value={50} />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuenow", "50")
  })
})
