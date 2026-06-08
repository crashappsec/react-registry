import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ServiceDetailHeader } from "@/registry/crashoverride/blocks/service-detail-header"
import { Button } from "@/registry/crashoverride/ui/button"

describe("ServiceDetailHeader", () => {
  it("renders the name, identifier, status pill and meta tags", () => {
    const { container } = render(
      <ServiceDetailHeader
        name="prod-bandwidth-system"
        status="healthy"
        identifier="224111541501"
        meta={[{ label: "us-east-1" }, { label: "SLSA", value: "Level 2" }]}
        action={<Button>Redeploy</Button>}
      />,
    )
    expect(
      screen.getByRole("heading", { name: "prod-bandwidth-system" }),
    ).toBeInTheDocument()
    expect(screen.getByText("224111541501")).toBeInTheDocument()
    expect(screen.getByText("healthy")).toBeInTheDocument()
    expect(screen.getByText("us-east-1")).toBeInTheDocument()
    expect(screen.getByText("Level 2")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Redeploy" }),
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-slot="service-detail-header"]'),
    ).not.toBeNull()
  })

  it("renders without optional props", () => {
    render(<ServiceDetailHeader name="bare-service" />)
    expect(
      screen.getByRole("heading", { name: "bare-service" }),
    ).toBeInTheDocument()
  })
})
