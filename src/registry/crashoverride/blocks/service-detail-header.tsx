import * as React from "react"
import { Button } from "@/registry/crashoverride/ui/button"
import { StatusBadge, type Status } from "@/registry/crashoverride/ui/status-badge"
import { Tag } from "@/registry/crashoverride/ui/tag"
import { Group, Stack } from "@/registry/crashoverride/ui/layout"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — ServiceDetailHeader (block)
 * The header for a console resource page: a square media tile, the service name
 * with a health StatusBadge, a mono identifier line, a row of meta Tags, and a
 * primary action on the right. Recreated from the console ServiceDetail header.
 * Composes Button, StatusBadge, Tag, and the layout primitives.
 *
 *   <ServiceDetailHeader
 *     name="prod-bandwidth-system"
 *     status="healthy"
 *     identifier="224111541501"
 *     media={<CloudIcon />}
 *     meta={[{ label: "us-east-1" }, { label: "SLSA", value: "Level 2" }]}
 *     action={<Button>Redeploy</Button>}
 *   />
 */
export interface ServiceMeta {
  label: React.ReactNode
  value?: React.ReactNode
  icon?: React.ReactNode
}

export interface ServiceDetailHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Service / resource name (rendered in the display face). */
  name: React.ReactNode
  /** Health status pill alongside the name. */
  status?: Status
  /** Mono sub-line — account id, ARN, external id, etc. */
  identifier?: React.ReactNode
  /** Optional leading media tile (icon, logo). */
  media?: React.ReactNode
  /** Meta facts rendered as Tags under the title. */
  meta?: ServiceMeta[]
  /** Primary action(s) pinned to the right (a Button or Group of them). */
  action?: React.ReactNode
}

export function ServiceDetailHeader({
  name,
  status,
  identifier,
  media,
  meta,
  action,
  className,
  ...props
}: ServiceDetailHeaderProps) {
  return (
    <Stack
      data-slot="service-detail-header"
      className={cn("gap-4", className)}
      {...props}
    >
      <Group className="items-start gap-4">
        {media && (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground [&_svg]:size-5">
            {media}
          </div>
        )}
        <Stack className="min-w-0 flex-1 gap-1">
          <Group className="flex-wrap gap-2.5">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
              {name}
            </h1>
            {status && <StatusBadge status={status} />}
          </Group>
          {identifier != null && (
            <div className="font-mono text-xs text-muted-foreground">
              {identifier}
            </div>
          )}
        </Stack>
        {action && <Group className="ml-auto shrink-0 gap-2">{action}</Group>}
      </Group>

      {meta && meta.length > 0 && (
        <Group className="flex-wrap gap-3">
          {meta.map((m, i) => (
            <Tag key={i} icon={m.icon} label={m.label} value={m.value} />
          ))}
        </Group>
      )}
    </Stack>
  )
}

// Re-export so consumers can pin an action without a second import.
export { Button }
