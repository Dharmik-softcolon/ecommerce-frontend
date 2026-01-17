// components/ui/badge.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border border-border/50 bg-background text-foreground px-3 py-1.5 rounded-full text-[11px] tracking-wide shadow-sm",
                secondary:
                    "border-0 bg-muted text-muted-foreground px-3 py-1.5 rounded-full text-[11px] tracking-wide",
                destructive:
                    "border-0 bg-gradient-to-r from-rose-600 to-red-500 text-white px-3 py-1.5 rounded-full text-[11px] tracking-wide shadow-md shadow-rose-500/20",
                outline: 
                    "border border-border text-foreground px-3 py-1.5 rounded-full text-[11px] tracking-wide bg-transparent hover:bg-muted/50",
                success:
                    "border-0 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-3 py-1.5 rounded-full text-[11px] tracking-wide shadow-md shadow-emerald-500/20",
                warning:
                    "border-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1.5 rounded-full text-[11px] tracking-wide shadow-md shadow-orange-500/20",
                gold:
                    "border-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-amber-950 px-3 py-1.5 rounded-full text-[11px] tracking-wide shadow-md shadow-amber-500/20 font-bold",
                new:
                    "border-0 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-md shadow-emerald-500/25 font-bold",
                sale:
                    "border-0 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white px-3 py-1.5 rounded-full text-[11px] tracking-wide shadow-md shadow-rose-500/25 font-bold",
                bestseller:
                    "border-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-amber-950 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-md shadow-amber-500/25 font-bold",
                premium:
                    "border border-amber-500/30 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 px-3 py-1.5 rounded-full text-[11px] tracking-wide shadow-sm dark:from-amber-950/50 dark:to-yellow-950/50 dark:text-amber-300 dark:border-amber-500/20",
                subtle:
                    "border-0 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[11px] tracking-wide font-medium",
            },
            size: {
                default: "px-3 py-1.5",
                sm: "px-2 py-0.5 text-[9px]",
                lg: "px-4 py-2 text-xs",
                xl: "px-5 py-2.5 text-sm",
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
        VariantProps<typeof badgeVariants> {
    icon?: React.ReactNode;
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
            {icon && <span className="mr-1.5 -ml-0.5">{icon}</span>}
            {children}
        </div>
    );
}

export { Badge, badgeVariants };
