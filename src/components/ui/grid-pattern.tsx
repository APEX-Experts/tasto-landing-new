import React from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps {
  className?: string;
  variant?: "dark" | "light";
}

export function GridPattern({ className, variant = "light" }: GridPatternProps) {
  const isLight = variant === "light";
  return (
    <div
      className={cn(
        "bg-size-[4rem_4rem] pointer-events-none absolute inset-0",
        isLight
          ? "bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]"
          : "bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]",
        className,
      )}
    />
  );
}
