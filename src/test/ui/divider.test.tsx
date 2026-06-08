import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Divider } from "@/registry/crashoverride/ui/divider"
import { Separator } from "@/registry/crashoverride/ui/separator"

describe("Divider", () => {
  it("is an alias for Separator", () => {
    expect(Divider).toBe(Separator)
  })

  it("renders a hairline rule on the --border token, horizontal by default", () => {
    const { container } = render(<Divider />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toMatch(/bg-border/)
    expect(el.className).toMatch(/h-px/)
    expect(el.className).toMatch(/w-full/)
  })

  it("supports a vertical orientation", () => {
    const { container } = render(<Divider orientation="vertical" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute("data-orientation", "vertical")
    expect(el.className).toMatch(/w-px/)
  })
})
