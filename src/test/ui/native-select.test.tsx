import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { NativeSelect } from "@/registry/crashoverride/ui/native-select"

describe("NativeSelect", () => {
  it("renders string options as <option>s", () => {
    render(<NativeSelect aria-label="severity" options={["Low", "Medium", "High"]} />)
    const select = screen.getByRole("combobox", { name: "severity" })
    expect(select.querySelectorAll("option").length).toBe(3)
    expect(screen.getByRole("option", { name: "Medium" })).toBeInTheDocument()
  })

  it("supports {value,label} option objects and fires onChange", () => {
    const onChange = vi.fn()
    render(
      <NativeSelect
        aria-label="region"
        defaultValue="us"
        onChange={onChange}
        options={[
          { value: "us", label: "us-east-1" },
          { value: "eu", label: "eu-west-1" },
        ]}
      />,
    )
    fireEvent.change(screen.getByRole("combobox", { name: "region" }), {
      target: { value: "eu" },
    })
    expect(onChange).toHaveBeenCalledOnce()
  })

  it("renders <option> children when options prop is omitted", () => {
    render(
      <NativeSelect aria-label="env">
        <option value="prod">prod</option>
        <option value="dev">dev</option>
      </NativeSelect>,
    )
    expect(
      screen.getByRole("combobox", { name: "env" }).querySelectorAll("option")
        .length,
    ).toBe(2)
  })
})
