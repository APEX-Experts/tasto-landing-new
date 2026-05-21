import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  spanClassName?: string;
}

export function FullLogo({ className = "", spanClassName }: LogoProps) {
  const hasDisplayClass = /\b(flex|inline-flex|block|inline-block|grid|inline-grid|hidden)\b/.test(
    className,
  );

  return (
    <span
      className={`${
        hasDisplayClass ? "" : "flex"
      } items-center group relative pointer-events-none select-none w-fit ${className}`}
    >
      {/* TASTO text in Neuroxa font */}
      <span className="font-display tracking-wide leading-none">TASTO</span>
      {/* The clock-like lines */}
      <span
        className={cn(
          "pointer-events-none absolute top-[-0.3em] right-[0.2em] w-[0.06em] h-[0.3em] rounded-3xl",
          spanClassName ?? "bg-current",
        )}
      />
      <span
        className={cn(
          "pointer-events-none absolute top-[-0.05em] right-[-0.15em] w-[0.06em] h-[0.3em] rounded-3xl rotate-90",
          spanClassName ?? "bg-current",
        )}
      />
      <span
        className={cn(
          "pointer-events-none absolute top-[-0.25em] right-[-0.03em] w-[0.06em] h-[0.3em] rounded-3xl rotate-45",
          spanClassName ?? "bg-current",
        )}
      />
    </span>
  );
}
