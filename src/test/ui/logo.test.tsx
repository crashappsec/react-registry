import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Logo } from "@/registry/crashoverride/ui/logo"

describe("Logo", () => {
  it("renders an SVG labelled for the brand", () => {
    render(<Logo />)
    const el = screen.getByLabelText("Crash Override")
    expect(el).toBeInTheDocument()
    expect(el.querySelector("svg")).not.toBeNull()
  })

  it("renders the wordmark when withWordmark is set", () => {
    render(<Logo withWordmark />)
    expect(screen.getByText("Crash Override")).toBeInTheDocument()
  })

  it("omits the wordmark by default (mark only)", () => {
    render(<Logo />)
    expect(screen.queryByText("Crash Override")).toBeNull()
  })

  it("applies the size to the mark", () => {
    render(<Logo size={48} />)
    const svg = screen.getByLabelText("Crash Override").querySelector("svg")!
    expect(svg.getAttribute("width")).toBe("48")
    expect(svg.getAttribute("height")).toBe("48")
  })

  it("merges a custom className", () => {
    render(<Logo className="opacity-50" />)
    expect(screen.getByLabelText("Crash Override").className).toMatch(
      /opacity-50/,
    )
  })
})
