import React from "react";
import * as Lucide from "lucide-react";

interface LucideIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  name: string;
}

export function LucideIcon({ name, className, ...props }: LucideIconProps) {
  const IconComponent =
    (
      Lucide as unknown as Record<
        string,
        React.ComponentType<React.ComponentPropsWithoutRef<"svg">>
      >
    )[name] || Lucide.HelpCircle;
  return <IconComponent className={className} {...props} />;
}
