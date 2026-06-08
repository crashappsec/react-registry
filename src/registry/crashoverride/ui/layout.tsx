import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/registry/crashoverride/lib/utils"

type DivProps = React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }

function make(base: string, name: string) {
  const C = React.forwardRef<HTMLDivElement, DivProps>(
    ({ className, asChild, ...props }, ref) => {
      const Comp = asChild ? Slot : "div"
      return <Comp ref={ref} className={cn(base, className)} {...props} />
    },
  )
  C.displayName = name
  return C
}

/** Vertical flex. Spacing/alignment via utilities (gap-4, items-start, …). */
export const Stack = make("flex flex-col gap-2", "Stack")
/** Horizontal flex, vertically centered. */
export const Group = make("flex flex-row items-center gap-2", "Group")
/** Centers children on both axes. */
export const Center = make("flex items-center justify-center", "Center")
/** Polymorphic box (plain div passthrough). */
export const Box = make("", "Box")
/** CSS grid; columns via utilities (grid-cols-3, …). */
export const Grid = make("grid gap-4", "Grid")
