import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { toggleVariants } from "@/registry/crashoverride/ui/toggle"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — ToggleGroup
 * A segmented set of toggles. `type="single"` (default, radio-like) or
 * `"multiple"`. Items join into one sharp-edged control with hairline `--border`
 * dividers; the pressed segment fills with `--accent`. Built on Toggle (shares
 * its CVA variants). Canonical shadcn/Radix ToggleGroup.
 *
 *   <ToggleGroup type="single" defaultValue="grid">
 *     <ToggleGroupItem value="grid"><GridIcon /></ToggleGroupItem>
 *     <ToggleGroupItem value="list"><ListIcon /></ToggleGroupItem>
 *   </ToggleGroup>
 */
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({ variant: "default", size: "md" })

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    data-slot="toggle-group"
    className={cn(
      "inline-flex items-center rounded-md border border-border",
      "[&>*]:rounded-none [&>*]:border-0 [&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-l-border",
      "[&>*:first-child]:rounded-l-[calc(var(--radius)-1px)] [&>*:last-child]:rounded-r-[calc(var(--radius)-1px)]",
      className,
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))
ToggleGroup.displayName = "ToggleGroup"

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      data-slot="toggle-group-item"
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
