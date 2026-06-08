import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Separator
 * A hairline divider keyed to the `--border` token. Horizontal (default) fills
 * its container width; vertical fills height. Decorative by default (no
 * semantic role); pass `decorative={false}` for an announced separator.
 * Canonical shadcn/Radix Separator.
 *
 *   <Separator />
 *   <div className="flex items-center"><span>A</span><Separator orientation="vertical" className="mx-2 h-4" /><span>B</span></div>
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  ),
)
Separator.displayName = "Separator"

export { Separator }
