import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Toggle
 * Two-state button (on/off — e.g. a formatting control). Quiet by default in
 * the muted voice; when pressed it lifts to `--accent` with bright text. Mono
 * label, sharp brand radius, neon focus ring. Canonical shadcn/Radix Toggle —
 * drive with `pressed`+`onPressedChange` or `defaultPressed`.
 *
 * Variants: default (fills `--accent` on) · outline (hairline border, the
 * segmented look). Sizes sm/md/lg → 30/36/42px.
 */
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md font-mono font-medium text-muted-foreground transition-[background-color,color] duration-150 ease-out outline-none cursor-pointer hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-transparent data-[state=on]:border-border",
        outline:
          "border border-input bg-transparent hover:border-border data-[state=on]:border-border",
      },
      size: {
        sm: "h-[30px] min-w-[30px] px-2 text-[13px]",
        md: "h-9 min-w-9 px-2.5 text-sm",
        lg: "h-[42px] min-w-[42px] px-3.5 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    data-slot="toggle"
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
