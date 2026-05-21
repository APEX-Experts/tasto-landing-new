import React from "react";
import { FullLogo } from "./full-logo";

interface BrandTextProps {
  text?: string | null;
  className?: string;
  logoClassName?: string;
}

export function BrandText({
  text,
  className = "font-display",
  logoClassName = "",
}: BrandTextProps) {
  if (!text) return null;

  const parts = text.split(/(TASTO)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part === "TASTO") {
          return <FullLogo key={index} className={`inline-flex items-center ${logoClassName}`} />;
        }

        return (
          <span key={index} className={className}>
            {part}
          </span>
        );
      })}
    </>
  );
}
