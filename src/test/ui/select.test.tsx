import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/crashoverride/ui/select"

function Example() {
  return (
    <Select>
      <SelectTrigger aria-label="Region">
        <SelectValue placeholder="Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us-east-1">us-east-1</SelectItem>
        <SelectItem value="eu-west-1">eu-west-1</SelectItem>
      </SelectContent>
    </Select>
  )
}

describe("Select", () => {
  it("renders the trigger with the Input voice (hairline border, sharp radius)", () => {
    render(<Example />)
    const trigger = screen.getByRole("combobox", { name: "Region" })
    expect(trigger.className).toMatch(/border-input/)
    expect(trigger.className).toMatch(/rounded-md/)
  })

  it("shows the placeholder in the muted voice when nothing is selected", () => {
    render(<Example />)
    expect(screen.getByText("Region")).toBeInTheDocument()
    const trigger = screen.getByRole("combobox", { name: "Region" })
    expect(trigger.className).toMatch(/data-\[placeholder\]:text-muted-foreground/)
  })

  it("uses the neon focus ring on the trigger", () => {
    render(<Example />)
    const trigger = screen.getByRole("combobox", { name: "Region" })
    expect(trigger.className).toMatch(/focus-visible:ring-ring/)
  })
})
