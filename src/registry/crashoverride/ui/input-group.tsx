import * as React from "react"
import { Input } from "@/registry/crashoverride/ui/input"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — InputGroup
 * An Input joined with leading/trailing addons (text, icon, or a node) into one
 * bordered control. The wrapper carries the hairline `--input` border and the
 * neon focus ring (via `focus-within`); the inner Input goes borderless so the
 * group reads as a single field. Addons sit on the `--secondary` surface in the
 * mono voice.
 *
 *   <InputGroup prefix="https://" suffix=".crashoverride.com" placeholder="my-org" />
 */
function InputGroupAddon({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="input-group-addon"
      className={cn(
        "inline-flex select-none items-center whitespace-nowrap bg-secondary px-3",
        "font-mono text-[13px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

export interface InputGroupProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  /** Leading addon — text, icon, or any node. */
  prefix?: React.ReactNode
  /** Trailing addon — text, icon, or any node. */
  suffix?: React.ReactNode
  /** className for the outer group wrapper (the bordered control). */
  groupClassName?: string
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ prefix, suffix, groupClassName, className, ...props }, ref) => (
    <div
      data-slot="input-group"
      className={cn(
        "flex h-10 w-full items-stretch overflow-hidden rounded-md border border-input bg-transparent",
        "transition-[border-color,box-shadow]",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/40",
        "has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-destructive/30",
        groupClassName,
      )}
    >
      {prefix != null && <InputGroupAddon>{prefix}</InputGroupAddon>}
      <Input
        ref={ref}
        className={cn(
          "h-full flex-1 rounded-none border-0 bg-transparent",
          "focus-visible:border-0 focus-visible:ring-0",
          className,
        )}
        {...props}
      />
      {suffix != null && <InputGroupAddon>{suffix}</InputGroupAddon>}
    </div>
  ),
)
InputGroup.displayName = "InputGroup"

export { InputGroup, InputGroupAddon }
