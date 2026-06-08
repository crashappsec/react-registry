import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Separator } from "@/registry/crashoverride/ui/separator"

describe("Separator", () => {
  it("renders a hairline rule on the --border token, horizontal by default", () => {
    const { container } = render(<Separator />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toMatch(/bg-border/)
    expect(el.className).toMatch(/h-px/)
    expect(el.className).toMatch(/w-full/)
  })

  it("switches to a vertical rule when orientation is vertical", () => {
    const { container } = render(<Separator orientation="vertical" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute("data-orientation", "vertical")
    expect(el.className).toMatch(/w-px/)
    expect(el.className).toMatch(/h-full/)
  })

  it("is decorative (no separator role) by default", () => {
    render(<Separator />)
    expect(screen.queryByRole("separator")).toBeNull()
  })

  it("announces a separator role when decorative is false", () => {
    render(<Separator decorative={false} />)
    expect(screen.getByRole("separator")).toBeInTheDocument()
  })
})
