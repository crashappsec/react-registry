import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AspectRatio } from "@/registry/crashoverride/ui/aspect-ratio"

describe("AspectRatio", () => {
  it("renders its child inside the ratio box", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="/x.png" alt="cover" />
      </AspectRatio>,
    )
    expect(screen.getByAltText("cover")).toBeInTheDocument()
  })

  it("carries the aspect-ratio slot", () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>square</div>
      </AspectRatio>,
    )
    expect(
      container.querySelector('[data-slot="aspect-ratio"]'),
    ).not.toBeNull()
  })
})
