import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination"

/**
 * Pagination — page navigation with prev/next plus numbered pages. The active
 * page lifts to the neon `--primary` fill; the rest stay quiet ghost cells. The
 * Controlled story below wires it to real state — click a page to switch live.
 */
const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Pagination. Compose `PaginationContent` of `PaginationItem`s wrapping `PaginationPrevious`, `PaginationLink` (set `isActive` on the current page), `PaginationEllipsis`, and `PaginationNext`. Wire `isActive` / `href` / `onClick` to your router state.",
      },
    },
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/** Static — page 2 of a short range, with prev/next. */
export const Playground: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/** A long range collapsed with an ellipsis. */
export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">7</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">24</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/** Controlled — clicking a page updates real state; prev/next clamp at the ends. */
export const Controlled: Story = {
  render: () => {
    const total = 5
    const [page, setPage] = React.useState(1)
    const go = (p: number) => (e: React.MouseEvent) => {
      e.preventDefault()
      setPage(Math.min(total, Math.max(1, p)))
    }
    return (
      <div className="flex flex-col items-center gap-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={go(page - 1)} />
            </PaginationItem>
            {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={go(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={go(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <p className="font-mono text-[11px] text-muted-foreground">
          page {page} of {total}
        </p>
      </div>
    )
  },
}
