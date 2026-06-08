import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Progress
 * A determinate progress bar — a neon `--primary` fill riding a muted track,
 * with a rounded cap and a smooth width transition. `value` is a 0–100
 * percentage. Canonical shadcn/Radix Progress.
 *
 *   <Progress value={72} />
 *   <Progress value={3 / 4 * 100} className="[&>div]:bg-chart-3" />
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    data-slot="progress"
    value={value}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-muted",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className="h-full w-full flex-1 rounded-full bg-primary transition-transform duration-500 ease-out"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = "Progress"

export { Progress }
