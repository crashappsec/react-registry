import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Slider } from "@/registry/crashoverride/ui/slider"

describe("Slider", () => {
  it("renders a single thumb for a single-value default", () => {
    render(<Slider defaultValue={[40]} aria-label="threshold" />)
    expect(screen.getAllByRole("slider")).toHaveLength(1)
  })

  it("renders one thumb per value for a multi-value slider", () => {
    render(<Slider defaultValue={[20, 80]} />)
    expect(screen.getAllByRole("slider")).toHaveLength(2)
  })

  it("fills the range track with the neon --primary", () => {
    const { container } = render(<Slider defaultValue={[40]} />)
    const range = container.querySelector('[data-slot="slider-range"]')
    expect(range?.className).toMatch(/bg-primary/)
  })
})
