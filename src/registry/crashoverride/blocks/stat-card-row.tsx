import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/crashoverride/ui/card"
import { Grid } from "@/registry/crashoverride/ui/layout"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — StatCardRow (block)
 * A console-grade metric strip: a responsive row of stat cards, each carrying a
 * capability accent bar, a large display-face value, a label, and a mono trend
 * delta. Recreated from the console Dashboard's metric grid. Composes the
 * registry's Card + Grid; no bespoke CSS, everything rides the theme tokens.
 *
 *   <StatCardRow
 *     stats={[
 *       { label: "Services tracked", value: "1,284", delta: "+12 this week", accent: "neon" },
 *       { label: "Builds today", value: "346", delta: "+8%", accent: "cobalt" },
 *     ]}
 *   />
 */
export interface Stat {
  /** Short metric name shown under the value. */
  label: string
  /** The headline figure (string so "98.2%" / "1,284" render verbatim). */
  value: React.ReactNode
  /** Optional mono trend/footnote line ("+12 this week"). */
  delta?: React.ReactNode
  /** Capability accent bar — a Card palette key or any CSS colour. */
  accent?: "neon" | "cobalt" | "magenta" | "amber" | "teal" | (string & {})
}

export interface StatCardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: Stat[]
  /** Column count at the widest breakpoint (defaults to the number of stats). */
  columns?: number
}

export function StatCardRow({
  stats,
  columns,
  className,
  ...props
}: StatCardRowProps) {
  const cols = columns ?? stats.length
  return (
    <Grid
      data-slot="stat-card-row"
      className={cn(
        "grid-cols-1 sm:grid-cols-2",
        cols >= 4 ? "lg:grid-cols-4" : cols === 3 ? "lg:grid-cols-3" : "",
        className,
      )}
      {...props}
    >
      {stats.map((s, i) => (
        <Card key={i} accent={s.accent} className="gap-3 py-5">
          <CardHeader className="px-5">
            <CardTitle className="font-display text-3xl leading-none tracking-tight">
              {s.value}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5">
            <div className="text-[13px] text-muted-foreground">{s.label}</div>
            {s.delta != null && (
              <div className="mt-1 font-mono text-[11px] text-muted-foreground/80">
                {s.delta}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </Grid>
  )
}
