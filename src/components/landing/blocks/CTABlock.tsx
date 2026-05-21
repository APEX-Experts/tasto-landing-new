import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Cta as CTAType } from "@/payload-types";

/**
 * Call-to-Action (CTA) section with a heading, descriptive text, and a primary action button.
 * Uses a prominent background color and decorative elements to draw attention.
 *
 * @param props - The CTA component props, matching the Payload CTA block type.
 */
export const CTABlock: React.FC<CTAType> = ({ heading, text, buttonLabel, buttonLink }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg bg-primary px-8 py-16 text-center text-primary-foreground">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{heading}</h2>

            {text && (
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed">
                {text}
              </p>
            )}

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="px-10 py-6 text-lg font-semibold"
            >
              <Link href={buttonLink}>{buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
