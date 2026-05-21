import React from "react";
import { cn } from "@/lib/utils";

interface SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: "dark" | "light";
}

export function SectionDescription({
  children,
  variant = "dark",
  className,
  ...props
}: SectionDescriptionProps) {
  const isLight = variant === "light";
  return (
    <p
      className={cn(
        "text-lg leading-relaxed",
        isLight ? "text-tasto-black/65" : "text-tasto-white/60",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
