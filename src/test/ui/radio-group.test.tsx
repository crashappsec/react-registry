import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/crashoverride/ui/radio-group"

describe("RadioGroup", () => {
  it("renders each item as a radio", () => {
    render(
      <RadioGroup defaultValue="prod">
        <RadioGroupItem value="prod" aria-label="Production" />
        <RadioGroupItem value="staging" aria-label="Staging" />
      </RadioGroup>,
    )
    expect(screen.getAllByRole("radio")).toHaveLength(2)
  })

  it("marks the default value as checked", () => {
    render(
      <RadioGroup defaultValue="prod">
        <RadioGroupItem value="prod" aria-label="Production" />
        <RadioGroupItem value="staging" aria-label="Staging" />
      </RadioGroup>,
    )
    expect(screen.getByRole("radio", { name: "Production" })).toBeChecked()
  })

  it("draws the selected item border in the neon --primary", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="prod" aria-label="Production" />
      </RadioGroup>,
    )
    const el = screen.getByRole("radio", { name: "Production" })
    expect(el.className).toMatch(/data-\[state=checked\]:border-primary/)
  })
})
