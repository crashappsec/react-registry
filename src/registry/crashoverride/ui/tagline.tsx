import * as React from "react"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Tagline
 * The brand liturgy — "Tag. Track. Trust." — as the signature traffic-light
 * device: three words on a black plate, lit red → amber → green. The words
 * carry the `.t-tag` / `.t-track` / `.t-trust` semantic hooks from the design
 * system's `.co-tagline` utility so consumers can re-theme each word, while the
 * built-in colours (the brand traffic-light tokens) keep it on-brand with zero
 * extra CSS. Set in the display face.
 *
 *   <Tagline />
 */
export const Tagline = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="tagline"
    className={cn(
      "co-tagline inline-flex items-baseline gap-2 rounded-md bg-black px-4 py-2",
      "font-display text-lg font-bold tracking-tight",
      className,
    )}
    {...props}
  >
    {/* Colors set inline so the traffic-light hues always win over any
        cascading `.co-tagline .t-*` rule — red -> amber -> green, everywhere. */}
    <span className="t-tag" style={{ color: "var(--color-traffic-red)" }}>Tag.</span>{" "}
    <span className="t-track" style={{ color: "var(--color-traffic-yellow)" }}>Track.</span>{" "}
    <span className="t-trust" style={{ color: "var(--color-traffic-green)" }}>Trust.</span>
  </span>
))
Tagline.displayName = "Tagline"
