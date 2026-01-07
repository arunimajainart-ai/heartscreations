import * as React from "react";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SectionHeaderAction {
  href: string;
  label: string;
}

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: SectionHeaderAction;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className
      )}
      {...props}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-[11px] tracking-[0.34em] uppercase text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h2
          style={{ fontFamily: "var(--font-cormorant), serif" }}
          className="mt-3 text-[clamp(1.75rem,2.4vw,2.6rem)] font-light leading-[1.06]"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-sm leading-[1.85] text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
        >
          <span className="text-[12px] tracking-[0.22em] uppercase">
            {action.label}
          </span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      ) : null}
    </div>
  );
}
