import React from "react";
import { cn } from "@/lib/utils";

interface AmbientGlowsProps {
  className?: string;
  withAccents?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: {
    glowSize: 400,
    accentSizes: [300, 200],
  },
  md: {
    glowSize: 600,
    accentSizes: [500, 400],
  },
  lg: {
    glowSize: 800,
    accentSizes: [700, 600],
  },
};

export function AmbientGlows({ className, withAccents = false, size = "md" }: AmbientGlowsProps) {
  const { glowSize, accentSizes } = sizes[size];
  return (
    <>
      {/* Background Accents */}
      {withAccents && (
        <div className={cn("pointer-events-none absolute inset-0", className)}>
          <div
            className={`absolute left-1/4 top-0 h-[${accentSizes[0]}px] w-[${accentSizes[0]}px] rounded-full bg-tasto-blue/5 blur-3xl`}
          />
          <div
            className={`absolute bottom-0 right-0 h-[${accentSizes[1]}px] w-[${accentSizes[1]}px] rounded-full bg-tasto-cyan/5 blur-3xl`}
          />
        </div>
      )}

      {/* Ambient Glows */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          className,
        )}
      >
        <div
          className={`absolute left-0 top-0 h-[${glowSize}px] w-[${glowSize}px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-tasto-blue/10 blur-3xl`}
        />
        <div
          className={`absolute bottom-0 right-0 h-[${glowSize}px] w-[${glowSize}px] translate-x-1/3 translate-y-1/4 rounded-full bg-tasto-cyan/10 blur-3xl`}
        />
      </div>
    </>
  );
}
