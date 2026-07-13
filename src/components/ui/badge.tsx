import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Whitespace-nowrap: Badges should never wrap.
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover-elevate " ,
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-xs",
        // Soft tonal variants — use for status / state indicators (not strong CTAs).
        critical:
          "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive-foreground",
        // PNGcheckr palette: gold, used for pending / warning states.
        warning:
          "border-transparent bg-[#c9962e]/15 text-[#8a6820] dark:text-[#e8bd6a]",
        // PNGcheckr palette: teal, used for verified / success states.
        success:
          "border-transparent bg-[#0e7c7b]/15 text-[#0e7c7b] dark:text-[#4fd1cf]",
        info:
          "border-transparent bg-sky-500/15 text-sky-700 dark:text-sky-300",

        outline: " border [border-color:var(--badge-outline)] shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }
