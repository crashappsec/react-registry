import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Accordion
 * Stacked disclosure panels inside a hairline-bordered, sharp-radius container.
 * Trigger rows run in the brand mono voice with a chevron that rotates on open;
 * body copy runs muted. Single-open by default (`type="single"`); pass
 * `type="multiple"` to allow many. Canonical shadcn/Radix Accordion.
 *
 *   <Accordion type="single" collapsible defaultValue="chalk">
 *     <AccordionItem value="chalk">
 *       <AccordionTrigger>What does Chalk record?</AccordionTrigger>
 *       <AccordionContent>A deterministic SBOM + provenance.</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 */
const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    data-slot="accordion"
    className={cn(
      "overflow-hidden rounded-md border border-border",
      className,
    )}
    {...props}
  />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-t border-border first:border-t-0", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "flex flex-1 items-center justify-between gap-3 px-4 py-3.5 text-left font-mono text-sm font-medium text-foreground outline-none transition-all",
        "hover:text-foreground/90 focus-visible:ring-[3px] focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className={cn(
      "overflow-hidden text-sm leading-relaxed text-muted-foreground",
      "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
    )}
    {...props}
  >
    <div className={cn("px-4 pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
