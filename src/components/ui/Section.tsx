import * as React from "react";

import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "@/components/ui/Container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "light" | "dark";
  padding?: "default" | "tight" | "loose";
  containerSize?: ContainerProps["size"];
  withContainer?: boolean;
}

const paddingClasses: Record<NonNullable<SectionProps["padding"]>, string> = {
  tight: "py-14 md:py-16",
  default: "py-20 md:py-24",
  loose: "py-24 md:py-32",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      tone = "light",
      padding = "default",
      containerSize = "default",
      withContainer = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const content = withContainer ? (
      <Container size={containerSize}>{children}</Container>
    ) : (
      children
    );

    return (
      <section
        ref={ref}
        data-nav-theme={tone}
        className={cn(
          paddingClasses[padding],
          "bg-background text-foreground",
          tone === "dark" && "theme-dark",
          className
        )}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = "Section";
