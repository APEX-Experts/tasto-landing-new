import React from "react";
import { cn } from "@/lib/utils";

interface AmbientGlowsProps {
  className?: string;
  withAccents?: boolean;
}

export function AmbientGlows({ className, withAccents = false }: AmbientGlowsProps) {
  return (
    <>
      {/* Background Accents */}
      {withAccents && (
        <div className={cn("pointer-events-none absolute inset-0", className)}>
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-tasto-blue/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-tasto-cyan/5 blur-3xl" />
        </div>
      )}

      {/* Ambient Glows */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          className,
        )}
      >
        <div className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-tasto-blue/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/4 rounded-full bg-tasto-cyan/10 blur-3xl" />
      </div>
    </>
  );
}
