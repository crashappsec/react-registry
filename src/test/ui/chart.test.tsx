import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeAll } from "vitest"
import { BarChart, Bar } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  CHART_PALETTE,
} from "@/registry/crashoverride/ui/chart"

// recharts' ResponsiveContainer measures its parent; jsdom reports 0×0, so give
// it a fixed size the way recharts itself recommends for tests.
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    value: 480,
  })
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    value: 320,
  })
})

const DATA = [
  { label: "Mon", value: 8 },
  { label: "Tue", value: 12 },
]

describe("Chart", () => {
  it("renders its Recharts children (wraps them in a responsive container)", () => {
    // jsdom can't measure, so Recharts' ResponsiveContainer renders only its
    // wrapper (no SVG) — its presence proves the chart element was passed
    // through. The same chart draws fully in a real browser / the specimen.
    const { container } = render(
      <ChartContainer>
        <BarChart data={DATA}>
          <Bar dataKey="value" fill="var(--chart-1)" />
          <ChartTooltip />
        </BarChart>
      </ChartContainer>,
    )
    expect(
      container.querySelector(".recharts-responsive-container"),
    ).not.toBeNull()
  })

  it("exposes the capability palette as --chart-1..5 CSS vars", () => {
    render(
      <ChartContainer data-testid="chart">
        <div>content</div>
      </ChartContainer>,
    )
    const el = screen.getByTestId("chart")
    expect(el.style.getPropertyValue("--chart-1")).not.toBe("")
    expect(el.style.getPropertyValue("--chart-2")).not.toBe("")
    expect(el.style.getPropertyValue("--chart-3")).not.toBe("")
    expect(el.style.getPropertyValue("--chart-4")).not.toBe("")
    expect(el.style.getPropertyValue("--chart-5")).not.toBe("")
  })

  it("lets callers override individual palette slots", () => {
    render(
      <ChartContainer
        data-testid="chart"
        palette={{ "--chart-1": "var(--primary)" }}
      >
        <div>content</div>
      </ChartContainer>,
    )
    expect(
      screen.getByTestId("chart").style.getPropertyValue("--chart-1"),
    ).toBe("var(--primary)")
  })

  it("names the five capability slots in CHART_PALETTE", () => {
    expect(Object.keys(CHART_PALETTE)).toEqual([
      "--chart-1",
      "--chart-2",
      "--chart-3",
      "--chart-4",
      "--chart-5",
    ])
  })
})
