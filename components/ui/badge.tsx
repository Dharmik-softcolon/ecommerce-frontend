// components/ui/badge.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center justify-center border text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-black text-white px-3 py-1.5 rounded-sm",
                secondary:
                    "border-transparent bg-neutral-100 text-neutral-800 px-3 py-1.5 rounded-sm",
                destructive:
                    "border-transparent bg-red-600 text-white px-3 py-1.5 rounded-sm",
                outline: 
                    "border-neutral-300 text-neutral-700 px-3 py-1.5 rounded-sm bg-transparent",
                success:
                    "border-transparent bg-emerald-600 text-white px-3 py-1.5 rounded-sm",
                warning:
                    "border-transparent bg-orange-500 text-white px-3 py-1.5 rounded-sm",
                gold:
                    "border-transparent bg-amber-500 text-black px-3 py-1.5 rounded-sm",
                new:
                    "border-transparent bg-black text-white px-3 py-1.5 rounded-sm",
                sale:
                    "border-transparent bg-red-600 text-white px-3 py-1.5 rounded-sm",
                bestseller:
                    "border-transparent bg-amber-500 text-black px-3 py-1.5 rounded-sm",
            },
            size: {
                default: "px-3 py-1.5",
                sm: "px-2 py-1 text-[9px]",
                lg: "px-4 py-2 text-xs",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
    );
}

export { Badge, badgeVariants };