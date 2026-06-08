import * as React from "react"
import { ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Chart
 * A thin wrapper over Recharts that wires the brand's *capability palette* into
 * every chart. `ChartContainer` injects the five capability accents as
 * `--chart-1..5` CSS vars so Recharts series can reference `var(--chart-N)` and
 * stay on-brand in light/dark. `ChartTooltip` is the branded Recharts tooltip
 * (slate popover surface, hairline border, mono labels).
 *
 * Capability spine (the product narrative):
 *   --chart-1 Monitor · --chart-2 Inspect · --chart-3 Tag · --chart-4 Track ·
 *   --chart-5 AI
 *
 *   <ChartContainer className="h-64">
 *     <BarChart data={data}>
 *       <Bar dataKey="value" fill="var(--chart-1)" radius={2} />
 *       <ChartTooltip />
 *     </BarChart>
 *   </ChartContainer>
 */

/** The five capability slots, in spine order, resolved from the theme bridge. */
export const CHART_PALETTE = {
  "--chart-1": "var(--color-chart-1)", // Monitor — Fandango
  "--chart-2": "var(--color-chart-2)", // Inspect — Jazzberry
  "--chart-3": "var(--color-chart-3)", // Tag — Amber
  "--chart-4": "var(--color-chart-4)", // Track — Atomic lime
  "--chart-5": "var(--color-chart-5)", // AI — Teal
} as const

export type ChartPalette = Partial<Record<keyof typeof CHART_PALETTE, string>>

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** A single Recharts chart element (BarChart, LineChart, …). */
  children: React.ReactElement
  /** Override individual capability slots (merged over the brand palette). */
  palette?: ChartPalette
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ className, children, palette, style, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="chart"
    className={cn(
      "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50",
      className,
    )}
    style={{ ...CHART_PALETTE, ...palette, ...style } as React.CSSProperties}
    {...props}
  >
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </div>
))
ChartContainer.displayName = "ChartContainer"

/**
 * Branded Recharts tooltip. Drop inside a chart element; it themes the cursor
 * and content wrapper to the slate popover surface with a hairline border.
 */
export function ChartTooltip(
  props: React.ComponentProps<typeof RechartsTooltip>,
) {
  return (
    <RechartsTooltip
      cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
      contentStyle={{
        background: "var(--popover)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        color: "var(--popover-foreground)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
      }}
      labelStyle={{ color: "var(--muted-foreground)" }}
      {...props}
    />
  )
}
