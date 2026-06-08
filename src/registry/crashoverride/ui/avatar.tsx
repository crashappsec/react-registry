import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/registry/crashoverride/lib/utils"

/**
 * Crash Override — Avatar
 * A circular user mark. Renders an image, falling back to up-to-two initials on
 * a muted surface in the brand mono voice. Sizes `xs | sm | md | lg`; `ring`
 * adds an accent (neon `--primary`) border offset from the background.
 * Canonical shadcn/Radix Avatar.
 *
 *   <Avatar>
 *     <AvatarImage src="/team/floyd.jpg" alt="Floyd Miles" />
 *     <AvatarFallback>{initials("Floyd Miles")}</AvatarFallback>
 *   </Avatar>
 *   <Avatar size="lg" ring><AvatarFallback>SN</AvatarFallback></Avatar>
 */
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "size-5",
        sm: "size-7",
        md: "size-9",
        lg: "size-11",
      },
      ring: {
        true: "ring-2 ring-primary ring-offset-2 ring-offset-background",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      ring: false,
    },
  },
)

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
    VariantProps<typeof avatarVariants>
>(({ className, size, ring, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    className={cn(avatarVariants({ size, ring }), className)}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn("aspect-square size-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      "flex size-full items-center justify-center rounded-full bg-muted font-mono text-[0.7em] font-semibold uppercase text-muted-foreground",
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

/** Derive up-to-two uppercase initials from a display name. */
function initials(name = ""): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

export { Avatar, AvatarImage, AvatarFallback, initials }
