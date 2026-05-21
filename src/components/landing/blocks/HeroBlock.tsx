import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Hero as HeroType, Media } from "@/payload-types";

/**
 * Hero component that displays a heading, subtext, and call-to-action buttons
 * against an optional background image.
 *
 * @param props - The Hero component props, matching the Payload Hero block type.
 */
export const HeroBlock: React.FC<HeroType> = ({
  heading,
  subtext,
  backgroundImage,
  ctaButtons,
}) => {
  const image = backgroundImage as Media;

  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      {image?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image.url}
            alt={image.alt || heading}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{heading}</h1>

          {subtext && (
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              {subtext}
            </p>
          )}

          {ctaButtons && ctaButtons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {ctaButtons.map((button) => (
                <Button
                  key={button.id}
                  asChild
                  variant={button.style === "secondary" ? "outline" : "default"}
                  size="lg"
                  className="px-8"
                >
                  <Link href={button.link}>{button.label}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
