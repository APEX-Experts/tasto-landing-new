interface LogoProps {
  className?: string;
}

export function FullLogo({ className = "" }: LogoProps) {
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
      <span className="pointer-events-none absolute top-[-0.3em] right-[0.2em] w-[0.06em] h-[0.3em] rounded-3xl bg-current" />
      <span className="pointer-events-none absolute top-[-0.05em] right-[-0.15em] w-[0.06em] h-[0.3em] rounded-3xl bg-current rotate-90" />
      <span className="pointer-events-none absolute top-[-0.25em] right-[-0.03em] w-[0.06em] h-[0.3em] rounded-3xl bg-current rotate-45" />
    </span>
  );
}
