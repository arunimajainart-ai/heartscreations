import * as React from "react";

import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, blur = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius)] border border-border bg-card text-card-foreground",
          "shadow-[0_18px_55px_rgba(0,0,0,0.10)]",
          blur && "backdrop-blur-xl",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";
