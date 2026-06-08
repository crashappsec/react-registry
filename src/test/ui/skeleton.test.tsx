import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Skeleton } from "@/registry/crashoverride/ui/skeleton"

describe("Skeleton", () => {
  it("renders a muted placeholder with a pulse", () => {
    const { container } = render(<Skeleton className="h-5 w-44" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toMatch(/animate-pulse/)
    expect(el.className).toMatch(/bg-muted/)
    expect(el.className).toMatch(/rounded-md/)
  })

  it("merges sizing utilities passed via className", () => {
    const { container } = render(<Skeleton className="h-3 w-full" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toMatch(/h-3/)
    expect(el.className).toMatch(/w-full/)
  })
})
