import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/registry/crashoverride/ui/command"

function Example() {
  return (
    <Command>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            Search services
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>Re-scan org</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

describe("Command", () => {
  it("renders the search input and grouped items with the uppercase mono heading", () => {
    render(<Example />)
    expect(
      screen.getByPlaceholderText("Type a command or search…"),
    ).toBeInTheDocument()
    expect(screen.getByText("Search services")).toBeInTheDocument()
    // cmdk styles group headings via descendant selectors on the group wrapper.
    const heading = screen.getByText("Actions")
    expect(heading.hasAttribute("cmdk-group-heading")).toBe(true)
    const group = heading.parentElement!
    expect(group.className).toMatch(/cmdk-group-heading\]\]:uppercase/)
    expect(group.className).toMatch(/cmdk-group-heading\]\]:font-mono/)
  })

  it("filters items as you type and shows the empty state on no match", () => {
    render(<Example />)
    const input = screen.getByPlaceholderText("Type a command or search…")
    fireEvent.change(input, { target: { value: "scan" } })
    expect(screen.getByText("Re-scan org")).toBeInTheDocument()
    expect(screen.queryByText("Search services")).not.toBeInTheDocument()

    fireEvent.change(input, { target: { value: "zzzzz" } })
    expect(screen.getByText("No results.")).toBeInTheDocument()
  })
})
