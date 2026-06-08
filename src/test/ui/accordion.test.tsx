import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/crashoverride/ui/accordion"

function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="chalk">
        <AccordionTrigger>What does Chalk record?</AccordionTrigger>
        <AccordionContent>A deterministic SBOM + provenance.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="oss">
        <AccordionTrigger>Is it open source?</AccordionTrigger>
        <AccordionContent>Yes — GPL-licensed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe("Accordion", () => {
  it("renders mono triggers inside a hairline-bordered container, collapsed", () => {
    const { container } = render(<Example />)
    const trigger = screen.getByRole("button", {
      name: "What does Chalk record?",
    })
    expect(trigger.className).toMatch(/font-mono/)
    expect(trigger).toHaveAttribute("data-state", "closed")
    expect(container.firstChild).toHaveClass("border-border")
  })

  it("expands a panel when its trigger is clicked", () => {
    render(<Example />)
    const trigger = screen.getByRole("button", {
      name: "What does Chalk record?",
    })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("data-state", "open")
    expect(
      screen.getByText("A deterministic SBOM + provenance."),
    ).toBeInTheDocument()
  })
})
