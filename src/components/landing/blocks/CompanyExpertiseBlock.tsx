"use client";

import React from "react";
import { motion } from "motion/react";
import type { CompanyExpertise as CompanyExpertiseType } from "@/payload-types";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionReveal } from "@/components/ui/section-reveal";
import { BrandText } from "../layout/brand-formatter";
import Eyebrow from "../layout/eyebrow";

const introVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const capabilityItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const CompanyExpertiseBlock: React.FC<CompanyExpertiseType> = ({
  eyebrow = "Implementation Expertise",
  heading,
  description,
  logoSvg,
  capabilities,
}) => {
  return (
    <section className="relative overflow-hidden bg-tasto-white text-tasto-black py-24">
      {/* Light-theme Architectural Grid Background */}
      <GridPattern variant="light" />

      {/* Animation reveal wrapper (Inner container only to prevent bg flashing) */}
      <SectionReveal className="container relative z-10 mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* LEFT COLUMN - Sticky Intro */}
          <motion.div
            variants={introVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-lg:text-center lg:sticky lg:top-32 lg:self-start flex flex-col"
          >
            {eyebrow && (
              <Eyebrow variant="blue" className="mb-6 self-center lg:self-start">
                {eyebrow}
              </Eyebrow>
            )}

            <SectionHeading
              variant="light"
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
            >
              <BrandText text={heading} />
            </SectionHeading>

            <SectionDescription
              variant="light"
              className="mt-6 mx-auto lg:mx-0 max-w-xl text-base md:text-lg leading-relaxed text-tasto-black/70"
            >
              <BrandText text={description} />
            </SectionDescription>

            {logoSvg && (
              <div className="mt-8 pt-8 border-t border-tasto-black/10 self-center lg:self-start w-full max-w-md max-lg:flex max-lg:justify-center">
                <div
                  className="h-12 flex items-center text-tasto-black/60 hover:text-tasto-black transition-colors duration-300 [&_svg]:h-full [&_svg]:w-auto [&_svg]:max-h-full"
                  dangerouslySetInnerHTML={{ __html: logoSvg }}
                />
              </div>
            )}
          </motion.div>

          {/* RIGHT COLUMN - Clean Typographic List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col justify-center"
          >
            {/* Top Border line */}
            <div className="h-px w-full bg-tasto-black/10" />

            {capabilities?.map((cap, index) => (
              <motion.div
                key={cap.id || index}
                variants={capabilityItemVariants}
                className="group relative py-6 md:py-8 border-b border-tasto-black/10 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:translate-x-1"
              >
                {/* Custom glowing border indicator on hover */}
                <div className="absolute left-0 bottom-0 h-px w-0 bg-tasto-blue transition-all duration-500 group-hover:w-full" />

                {/* Elegant Number Outline */}
                <div className="font-display text-xs text-tasto-blue/50 group-hover:text-tasto-blue transition-colors duration-300">
                  {"// 0"}
                  {index + 1}
                </div>

                {/* Capability Title */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-tasto-black/85 group-hover:text-tasto-black transition-colors duration-300">
                    {cap.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default CompanyExpertiseBlock;
