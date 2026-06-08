import * as React from "react"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Skeleton
 * A loading placeholder block — a muted `--muted` surface with a subtle pulse.
 * Size it with utilities and compose several to mimic the layout you're waiting
 * on. Canonical shadcn Skeleton.
 *
 *   <Skeleton className="h-5 w-44" />
 *   <Skeleton className="h-3 w-full" />
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
