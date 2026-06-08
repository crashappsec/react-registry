/**
 * Divider — the brand name for a hairline rule (keeps migration ergonomics:
 * `import { Divider }`). Now that the `separator` item exists, Divider is a
 * thin alias over Separator so both names resolve to one implementation.
 *
 *   <Divider />
 *   <Divider orientation="vertical" className="mx-2 h-4" />
 */
export { Separator as Divider } from "@/registry/crashoverride/ui/separator"
