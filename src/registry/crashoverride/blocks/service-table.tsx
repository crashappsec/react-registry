import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/crashoverride/ui/table"
import { StatusBadge, type Status } from "@/registry/crashoverride/ui/status-badge"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — ServiceTable (block)
 * A catalog table with a health status column: mono service name, environment,
 * a StatusBadge, and a right-aligned numeric column. Recreated from the console
 * deployments/related-services lists. Composes the registry Table set with
 * StatusBadge; rows lift to `--accent` on hover (Table default).
 *
 *   <ServiceTable
 *     rows={[
 *       { name: "chalk", env: "prod", status: "healthy", builds: "1,204" },
 *       { name: "compass", env: "staging", status: "needs_attention", builds: "318" },
 *     ]}
 *   />
 */
export interface ServiceRow {
  name: React.ReactNode
  env?: React.ReactNode
  status: Status
  /** Right-aligned mono metric (build count, etc.). */
  builds?: React.ReactNode
}

export interface ServiceTableProps
  extends React.HTMLAttributes<HTMLTableElement> {
  rows: ServiceRow[]
  /** Optional caption rendered under the table. */
  caption?: React.ReactNode
}

export function ServiceTable({
  rows,
  caption,
  className,
  ...props
}: ServiceTableProps) {
  return (
    <div
      data-slot="service-table"
      className="w-full overflow-hidden rounded-md border border-border"
    >
      <Table className={cn(className)} {...props}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Env</TableHead>
            <TableHead>Health</TableHead>
            <TableHead className="text-right font-mono tabular-nums">
              Builds
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <TableCell className="font-mono font-medium text-foreground">
                {r.name}
              </TableCell>
              <TableCell className="font-mono text-muted-foreground">
                {r.env}
              </TableCell>
              <TableCell>
                <StatusBadge status={r.status} />
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {r.builds}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
