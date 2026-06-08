import * as React from "react"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Divider — the brand name for a hairline rule (keeps migration ergonomics:
 * `import { Divider }`). Self-contained until the `separator` item lands, at
 * which point this becomes `export { Separator as Divider }`.
 *
 * className-first: orientation/spacing via utilities.
 */
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical"
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <hr
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 border-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  ),
)
Divider.displayName = "Divider"
