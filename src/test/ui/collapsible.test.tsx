import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/registry/crashoverride/ui/collapsible"

function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Show details</CollapsibleTrigger>
      <CollapsibleContent>3 services beaconing from prod.</CollapsibleContent>
    </Collapsible>
  )
}

describe("Collapsible", () => {
  it("renders the trigger with the region closed", () => {
    render(<Example />)
    const trigger = screen.getByRole("button", { name: "Show details" })
    expect(trigger).toHaveAttribute("data-state", "closed")
    expect(
      screen.queryByText("3 services beaconing from prod."),
    ).not.toBeInTheDocument()
  })

  it("reveals the content when the trigger is clicked", () => {
    render(<Example />)
    const trigger = screen.getByRole("button", { name: "Show details" })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("data-state", "open")
    expect(
      screen.getByText("3 services beaconing from prod."),
    ).toBeInTheDocument()
  })
})
