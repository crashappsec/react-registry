import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Slider
 * Range slider on the one dark surface. The track is the hairline `--input`;
 * the filled range glows in the neon `--primary` (Atomic lime). Thumbs are
 * round `--background` knobs with a primary ring on focus. Canonical
 * shadcn/Radix Slider — supports single or multi-thumb via `value`/`defaultValue`.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, defaultValue, value, min = 0, max = 100, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, ...props }, ref) => {
  const thumbs = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  )

  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        "data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-input",
          "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-primary",
            "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {thumbs.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-slot="slider-thumb"
          // The accessible name lives on the thumb (role="slider"), not the
          // root, so forward aria-label/aria-labelledby here. With multiple
          // thumbs, suffix the position so each is distinguishable (axe:
          // aria-input-field-name).
          aria-label={
            ariaLabel
              ? thumbs.length > 1
                ? `${ariaLabel} (${i + 1} of ${thumbs.length})`
                : ariaLabel
              : undefined
          }
          aria-labelledby={ariaLabelledby}
          className={cn(
            "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm transition-[color,box-shadow] outline-none",
            "hover:ring-4 hover:ring-ring/30 focus-visible:ring-4 focus-visible:ring-ring/40",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = "Slider"

export { Slider }
