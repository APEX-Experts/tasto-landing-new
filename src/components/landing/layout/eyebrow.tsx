import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  className?: string;
  variant?: "cyan" | "blue";
};

export const Eyebrow: React.FC<Props> = ({ children, className, variant = "cyan" }) => {
  const isCyan = variant === "cyan";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full backdrop-blur-md text-[8px] md:text-xs uppercase tracking-widest font-semibold px-4 py-2",
        isCyan
          ? "border border-tasto-cyan/20 bg-tasto-cyan/5 text-tasto-cyan"
          : "border border-tasto-blue/20 bg-tasto-blue/5 text-tasto-blue",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            isCyan ? "bg-tasto-cyan" : "bg-tasto-blue",
          )}
        ></span>
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            isCyan ? "bg-tasto-cyan" : "bg-tasto-blue",
          )}
        ></span>
      </span>
      {children}
    </div>
  );
};

export default Eyebrow;
