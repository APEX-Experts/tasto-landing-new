import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  variant?: "dark" | "light" | "blue";
}

export function GradientText({
  children,
  className,
  as: Component = "span",
  variant = "dark",
  ...props
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        "bg-clip-text text-transparent bg-linear-to-br",
        variant === "light"
          ? "from-black to-black/80"
          : variant === "dark"
            ? "from-white to-white/80"
            : "from-tasto-blue to-tasto-blue/60",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
