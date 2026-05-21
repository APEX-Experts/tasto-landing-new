import React from "react";
import { GradientText } from "./gradient-text";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "dark" | "light";
}

export function SectionHeading({
  children,
  as = "h2",
  variant = "dark",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <GradientText
      as={as}
      variant={variant}
      className={cn(
        "font-bold tracking-tight",
        as === "h1"
          ? "text-5xl leading-[1.05] font-black md:text-6xl lg:text-7xl"
          : "text-4xl leading-tight sm:text-5xl lg:text-6xl",
        className,
      )}
      {...props}
    >
      {children}
    </GradientText>
  );
}
