import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { StatCardRow } from "@/registry/crashoverride/blocks/stat-card-row"

describe("StatCardRow", () => {
  it("renders one card per stat with value, label and delta", () => {
    const { container } = render(
      <StatCardRow
        stats={[
          { label: "Services tracked", value: "1,284", delta: "+12 this week", accent: "neon" },
          { label: "Builds today", value: "346", delta: "+8%", accent: "cobalt" },
        ]}
      />,
    )
    expect(container.querySelectorAll('[data-slot="card"]').length).toBe(2)
    expect(screen.getByText("1,284")).toBeInTheDocument()
    expect(screen.getByText("Services tracked")).toBeInTheDocument()
    expect(screen.getByText("+12 this week")).toBeInTheDocument()
  })

  it("paints the capability accent bar on each card", () => {
    const { container } = render(
      <StatCardRow stats={[{ label: "x", value: "1", accent: "magenta" }]} />,
    )
    const card = container.querySelector('[data-slot="card"]') as HTMLElement
    expect(card.style.borderTopColor).toBe("var(--color-chart-2)")
  })
})
