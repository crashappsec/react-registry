import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/registry/crashoverride/ui/table"

function Example() {
  return (
    <Table>
      <TableCaption>Service builds this week</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead className="text-right font-mono tabular-nums">
            Builds
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>chalk</TableCell>
          <TableCell className="text-right font-mono tabular-nums">
            1,204
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

describe("Table", () => {
  it("renders a semantic table with header and body content", () => {
    render(<Example />)
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(
      screen.getByRole("columnheader", { name: "Service" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "chalk" })).toBeInTheDocument()
  })

  it("gives column headers the uppercase mono voice", () => {
    render(<Example />)
    const head = screen.getByRole("columnheader", { name: "Service" })
    expect(head.className).toMatch(/font-mono/)
    expect(head.className).toMatch(/uppercase/)
  })

  it("lifts rows to --accent on hover with hairline borders", () => {
    render(<Example />)
    const row = screen
      .getByRole("cell", { name: "chalk" })
      .closest("tr") as HTMLElement
    expect(row.className).toMatch(/hover:bg-accent/)
    expect(row.className).toMatch(/border-border/)
  })

  it("supports right-aligned mono numerics via className", () => {
    render(<Example />)
    const cell = screen.getByRole("cell", { name: "1,204" })
    expect(cell.className).toMatch(/text-right/)
    expect(cell.className).toMatch(/tabular-nums/)
  })

  it("renders a caption in the muted mono voice", () => {
    render(<Example />)
    const caption = screen.getByText("Service builds this week")
    expect(caption.tagName).toBe("CAPTION")
    expect(caption.className).toMatch(/text-muted-foreground/)
  })
})
