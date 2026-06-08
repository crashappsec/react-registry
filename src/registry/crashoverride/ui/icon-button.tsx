import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — IconButton
 * Square, icon-only action for dense chrome — toolbars, panel headers, table
 * rows. Reuses the Button surface vocabulary but locks to a square footprint so
 * a single lucide glyph sits dead-centre. `label` is mandatory: it sets the
 * accessible name (`aria-label`) AND the native tooltip (`title`).
 *
 * Variants (brand): ghost (default, quiet) · outline (hairline) · solid (the
 * raised invert surface). Sizes sm/md/lg → 28/36/44px.
 */
const iconButtonVariants = cva(
  "inline-flex items-center justify-center shrink-0 rounded-md transition-[background-color,border-color,filter] duration-150 ease-out cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ghost:
          "border border-transparent bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-input bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        solid:
          "border border-border bg-secondary text-foreground hover:brightness-110",
      },
      size: {
        sm: "size-7 [&_svg]:size-4",
        md: "size-9 [&_svg]:size-[18px]",
        lg: "size-11 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
)

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">,
    VariantProps<typeof iconButtonVariants> {
  /** Accessible name + tooltip. Required — an icon alone is not a label. */
  label: string
  asChild?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, label, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        aria-label={label}
        title={label}
        data-slot="icon-button"
        className={cn(iconButtonVariants({ variant, size, className }))}
        {...props}
      />
    )
  },
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
