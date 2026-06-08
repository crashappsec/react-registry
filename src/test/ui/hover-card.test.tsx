import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/registry/crashoverride/ui/hover-card"

function Example({ open }: { open?: boolean }) {
  return (
    <HoverCard open={open}>
      <HoverCardTrigger>@savannah</HoverCardTrigger>
      <HoverCardContent>Savannah Nguyen</HoverCardContent>
    </HoverCard>
  )
}

describe("HoverCard", () => {
  it("renders the trigger and keeps the card closed by default", () => {
    render(<Example />)
    expect(screen.getByText("@savannah")).toBeInTheDocument()
    expect(screen.queryByText("Savannah Nguyen")).not.toBeInTheDocument()
  })

  it("reveals the preview on the popover surface when open", () => {
    render(<Example open />)
    const content = screen.getByText("Savannah Nguyen")
    expect(content.className).toMatch(/bg-popover/)
    expect(content.className).toMatch(/border-border/)
  })
})
