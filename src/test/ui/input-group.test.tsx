import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { InputGroup } from "@/registry/crashoverride/ui/input-group"

describe("InputGroup", () => {
  it("renders leading and trailing addons around the input", () => {
    render(
      <InputGroup
        prefix="https://"
        suffix=".crashoverride.com"
        placeholder="my-org"
      />,
    )
    expect(screen.getByText("https://")).toBeInTheDocument()
    expect(screen.getByText(".crashoverride.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("my-org")).toBeInTheDocument()
  })

  it("forwards typing to the inner input", () => {
    const onChange = vi.fn()
    render(<InputGroup prefix="@" placeholder="handle" onChange={onChange} />)
    fireEvent.change(screen.getByPlaceholderText("handle"), {
      target: { value: "savannah" },
    })
    expect(onChange).toHaveBeenCalledOnce()
  })

  it("renders without addons (bare grouped input)", () => {
    const { container } = render(<InputGroup placeholder="search" />)
    expect(
      container.querySelector('[data-slot="input-group"]'),
    ).not.toBeNull()
    expect(
      container.querySelectorAll('[data-slot="input-group-addon"]').length,
    ).toBe(0)
  })
})
