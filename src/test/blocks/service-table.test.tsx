import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ServiceTable } from "@/registry/crashoverride/blocks/service-table"

describe("ServiceTable", () => {
  it("renders a row per service with a status column", () => {
    const { container } = render(
      <ServiceTable
        caption="Service builds · last 24h"
        rows={[
          { name: "chalk", env: "prod", status: "healthy", builds: "1,204" },
          { name: "compass", env: "staging", status: "needs_attention", builds: "318" },
          { name: "beacon", env: "dev", status: "at_risk", builds: "27" },
        ]}
      />,
    )
    // 3 body rows + 1 header row
    expect(container.querySelectorAll('[data-slot="table-row"]').length).toBe(4)
    expect(screen.getByText("chalk")).toBeInTheDocument()
    expect(screen.getByText("1,204")).toBeInTheDocument()
    expect(screen.getByText("healthy")).toBeInTheDocument()
    expect(screen.getByText("needs attention")).toBeInTheDocument()
    expect(screen.getByText("Service builds · last 24h")).toBeInTheDocument()
    expect(
      container.querySelector('[data-slot="service-table"]'),
    ).not.toBeNull()
  })
})
