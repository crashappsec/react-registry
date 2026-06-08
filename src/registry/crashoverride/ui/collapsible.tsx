import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Collapsible
 * A single expandable region driven by your own trigger. Content slides/fades
 * in on open. Canonical shadcn/Radix Collapsible.
 *
 *   <Collapsible>
 *     <CollapsibleTrigger asChild>
 *       <Button variant="ghost">Show details</Button>
 *     </CollapsibleTrigger>
 *     <CollapsibleContent>Expanded content…</CollapsibleContent>
 *   </Collapsible>
 */
const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    data-slot="collapsible-content"
    className={cn(
      "overflow-hidden",
      "data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
      className,
    )}
    {...props}
  />
))
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
