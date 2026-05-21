interface LogoProps {
  className?: string;
}
export function MarkLogo({ className = "" }: LogoProps) {
  return (
    <div
      className={`flex items-center group relative pointer-events-none select-none w-fit ${className}`}
    >
      {/* O text in Neuroxa font */}
      <span className="font-display tracking-wide leading-none pr-[0.1em]">O</span>
      {/* The clock-like lines */}
      <span className="pointer-events-none absolute top-[-0.45em] right-[0.2em] w-[0.06em] h-[0.4em] rounded-3xl bg-current" />
      <span className="pointer-events-none absolute top-[-0.05em] right-[-0.2em] w-[0.06em] h-[0.4em] rounded-3xl bg-current rotate-90" />
      <span className="pointer-events-none absolute top-[-0.35em] right-[-0.1em] w-[0.06em] h-[0.4em] rounded-3xl bg-current rotate-45" />
    </div>
  );
}
