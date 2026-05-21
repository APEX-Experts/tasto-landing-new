"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import Eyebrow from "../layout/eyebrow";
import { Cta } from "@/payload-types";
import { BrandText } from "../layout/brand-formatter";
import { SectionReveal } from "@/components/ui/section-reveal";

export const CTABlock: React.FC<Cta> = ({
  eyebrow,
  heading,
  description,
  primaryButtonLabel,
  primaryButtonLink,
  secondaryButtonLabel,
  secondaryButtonLink,
}) => {
  return (
    <section className="relative overflow-hidden bg-tasto-bg py-24 lg:py-32">
      {/* Background Accents - Deep, cinematic focus */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute top-1/2 h-[500px] w-[800px] -translate-y-1/2 rounded-[100%] bg-tasto-cyan/10 blur-[150px]" />
      </div>

      <SectionReveal className="container relative z-10 mx-auto px-4">
        {/* Massive Glass Panel Wrapper */}

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center text-center">
          {eyebrow && (
            <Eyebrow variant="cyan" className="mb-8">
              {eyebrow}
            </Eyebrow>
          )}

          <GradientText
            as="h2"
            className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {heading}
          </GradientText>

          <div className="mt-8 mx-auto max-w-2xl">
            <BrandText
              className="text-lg leading-relaxed text-tasto-white/60 sm:text-xl"
              text={description || ""}
              logoClassName="text-white md:mr-1"
            />
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary CTA */}
            <Button
              asChild
              size="xxl"
              variant="cyan"
              className="group relative overflow-hidden px-10"
            >
              <Link href={primaryButtonLink}>
                <span className="relative z-10 flex items-center">
                  {primaryButtonLabel}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>

            {/* Secondary CTA (if provided) */}
            {secondaryButtonLabel && secondaryButtonLink && (
              <Button asChild size="xxl" variant="dark-outline" className="px-8">
                <Link href={secondaryButtonLink}>{secondaryButtonLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
