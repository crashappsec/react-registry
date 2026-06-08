import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — NativeSelect
 * A lightly-styled native `<select>` for simple, accessible cases (no custom
 * popover). Matches the Input voice — hairline `--input` border, neon focus
 * ring, sharp brand radius — with a brand chevron pinned to the trailing edge.
 * For a searchable / richly-styled list reach for Select or Combobox instead.
 *
 *   <NativeSelect options={["Low", "Medium", "High"]} />
 *   <NativeSelect options={[{ value: "1", label: "One" }]} />
 *   <NativeSelect><option>…</option></NativeSelect>
 */
type Option = string | { value: string; label: string; disabled?: boolean }

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Convenience options — strings or {value,label}. Omit to pass <option> children. */
  options?: Option[]
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, options, children, ...props }, ref) => {
    const opts = options?.map((o) =>
      typeof o === "string" ? { value: o, label: o } : o,
    )
    return (
      <div data-slot="native-select" className="relative inline-flex w-full">
        <select
          ref={ref}
          className={cn(
            "h-10 w-full appearance-none rounded-md border border-input bg-transparent py-1 pl-3 pr-9 text-sm text-foreground outline-none",
            "transition-[color,border-color,box-shadow]",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
            "[&>option]:bg-popover [&>option]:text-popover-foreground",
            className,
          )}
          {...props}
        >
          {opts
            ? opts.map((o) => (
                <option key={o.value} value={o.value} disabled={o.disabled}>
                  {o.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    )
  },
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
