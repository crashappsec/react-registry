import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * Crash Override — AspectRatio
 * Constrains children to a fixed width:height ratio. Pass `ratio` (e.g. 16 / 9);
 * the child fills the box — set `object-cover` on media so it crops cleanly.
 * Canonical shadcn/Radix AspectRatio (no brand surface of its own — it's a
 * layout constraint).
 *
 *   <AspectRatio ratio={16 / 9}>
 *     <img src="…" className="size-full object-cover" />
 *   </AspectRatio>
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
