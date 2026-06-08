import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/registry/crashoverride/ui/navigation-menu"

function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#">Compass</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

describe("NavigationMenu", () => {
  it("renders triggers and plain links", () => {
    render(<Example />)
    expect(
      screen.getByRole("button", { name: /Product/ }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument()
  })

  it("styles the trigger in the brand display voice", () => {
    render(<Example />)
    const trigger = screen.getByRole("button", { name: /Product/ })
    expect(trigger.className).toMatch(/font-display/)
    expect(trigger.className).toMatch(/data-\[state=open\]:bg-accent/)
  })

  it("opens the dropdown content onto the popover surface", () => {
    render(<Example />)
    const trigger = screen.getByRole("button", { name: /Product/ })
    fireEvent.pointerMove(trigger, { pointerType: "mouse" })
    fireEvent.pointerEnter(trigger, { pointerType: "mouse" })
    fireEvent.click(trigger)
    expect(screen.getByRole("link", { name: "Compass" })).toBeInTheDocument()
  })
})
