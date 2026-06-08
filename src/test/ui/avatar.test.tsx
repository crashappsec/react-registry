import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Avatar,
  AvatarFallback,
  initials,
} from "@/registry/crashoverride/ui/avatar"

describe("Avatar", () => {
  it("shows initials in the mono fallback when no image resolves", () => {
    render(
      <Avatar>
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>,
    )
    const fallback = screen.getByText("SN")
    expect(fallback.className).toMatch(/font-mono/)
    expect(fallback.className).toMatch(/bg-muted/)
  })

  it("applies the requested size", () => {
    const { container } = render(
      <Avatar size="lg">
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>,
    )
    expect((container.firstChild as HTMLElement).className).toMatch(/size-11/)
  })

  it("adds an accent ring when ring is set", () => {
    const { container } = render(
      <Avatar ring>
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>,
    )
    expect((container.firstChild as HTMLElement).className).toMatch(
      /ring-primary/,
    )
  })

  it("derives up-to-two uppercase initials from a name", () => {
    expect(initials("Savannah Nguyen")).toBe("SN")
    expect(initials("floyd")).toBe("F")
    expect(initials("")).toBe("")
  })
})
