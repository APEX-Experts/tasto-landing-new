"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import Eyebrow from "../layout/eyebrow";
import type { AboutCta as AboutCtaType } from "@/payload-types";
import { BrandText } from "../layout/brand-formatter";
import { SectionReveal } from "@/components/ui/section-reveal";

export const AboutCTABlock: React.FC<AboutCtaType> = ({
  eyebrow = "Strategic Discussion",
  heading = "Operational clarity becomes increasingly critical as organizations scale.",
  description = "TASTO helps modern technology organizations establish connected operational infrastructure across governance, execution, and business visibility. Reach out to discuss your operational structure, scaling challenges, and organizational goals.",
  primaryCTA = { label: "Request a Demo", href: "/contact" },
  secondaryCTA = { label: "Contact Us", href: "/contact" },
}) => {
  return (
    <section className="relative overflow-hidden bg-tasto-bg py-24">
      {/* Immersive portal-like radial glow in the center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[600px] w-[900px] rounded-full bg-linear-to-r from-tasto-cyan/10 via-tasto-blue/5 to-transparent blur-[120px]" />
      </div>

      {/* Orbit Graphic behind content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-tasto-white/2 opacity-30 flex items-center justify-center"
        >
          <div className="w-[85%] h-[85%] rounded-full border border-tasto-cyan/5 border-dashed" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-tasto-cyan/40" />
        </motion.div>
      </div>

      <SectionReveal className="container relative z-10 mx-auto px-4">
        <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center">
          {eyebrow && (
            <div className="mb-8">
              <Eyebrow variant="cyan">{eyebrow}</Eyebrow>
            </div>
          )}

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-tasto-white max-w-3xl">
            <BrandText text={heading} />
          </h2>

          <div className="mt-8 mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-tasto-white/60">
            <BrandText text={description} />
          </div>

          {/* Actions - Restrained, clean alignment */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
            {/* Primary CTA */}
            {primaryCTA?.label && primaryCTA?.href && (
              <Button
                asChild
                size="xxl"
                variant="cyan"
                className="group relative overflow-hidden px-10 w-full sm:w-auto text-base font-semibold"
              >
                <Link href={primaryCTA.href}>
                  <span className="relative z-10 flex items-center justify-center">
                    {primaryCTA.label}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            )}

            {/* Secondary CTA */}
            {secondaryCTA?.label && secondaryCTA?.href && (
              <Button
                asChild
                size="xxl"
                variant="dark-outline"
                className="px-8 w-full sm:w-auto text-base font-semibold"
              >
                <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default AboutCTABlock;
