import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Stack, Group, Center, Box, Grid } from "@/registry/crashoverride/ui/layout"

describe("layout primitives", () => {
  it("Stack is a flex column and merges className", () => {
    const { container } = render(<Stack className="gap-4" />)
    const el = container.firstElementChild as HTMLElement
    expect(el.className).toMatch(/flex/)
    expect(el.className).toMatch(/flex-col/)
    expect(el.className).toMatch(/gap-4/)
  })
  it("Group is a flex row", () => {
    const { container } = render(<Group />)
    expect((container.firstElementChild as HTMLElement).className).toMatch(/flex-row/)
  })
  it("Center centers both axes", () => {
    const { container } = render(<Center />)
    const c = (container.firstElementChild as HTMLElement).className
    expect(c).toMatch(/items-center/)
    expect(c).toMatch(/justify-center/)
  })
  it("Grid is a grid", () => {
    const { container } = render(<Grid />)
    expect((container.firstElementChild as HTMLElement).className).toMatch(/grid/)
  })
  it("Box passes className through", () => {
    const { container } = render(<Box className="p-2" />)
    expect((container.firstElementChild as HTMLElement).className).toMatch(/p-2/)
  })
})
