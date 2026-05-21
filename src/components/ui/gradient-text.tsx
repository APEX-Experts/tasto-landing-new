import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  variant?: "dark" | "light";
}

export function GradientText({
  children,
  className,
  as: Component = "span",
  variant = "dark",
  ...props
}: GradientTextProps) {
  const isLight = variant === "light";
  return (
    <Component
      className={cn(
        "bg-clip-text text-transparent",
        isLight
          ? "bg-linear-to-br from-black to-black/80"
          : "bg-linear-to-br from-white to-white/80",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
