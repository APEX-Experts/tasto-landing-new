"use client";
import { AmbientGlows } from "@/components/ui/ambient-glows";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { AboutHero as AboutHeroType } from "@/payload-types";
import { motion } from "motion/react";
import React from "react";
import { BrandText } from "../layout/brand-formatter";
import Eyebrow from "../layout/eyebrow";

// Easing transition
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const AboutHeroBlock: React.FC<AboutHeroType> = ({
  eyebrow = "Operational Philosophy",
  heading = "Modern technology companies require a different operational foundation.",
  description = "TASTO was built around a simple observation: software companies, SaaS organizations, and modern technology businesses do not operate like traditional enterprises. Yet most operational systems were designed for a completely different era.\n\nAs organizations scale across products, teams, financial structures, and delivery operations, visibility becomes fragmented and governance becomes increasingly difficult to maintain. TASTO exists to provide operational clarity, executive visibility, and unified business infrastructure for modern technology-driven companies.",
}) => {
  return (
    <section className="relative overflow-hidden bg-tasto-bg text-tasto-white py-28 md:py-36 min-h-[70vh] flex items-center justify-center">
      <GridPattern variant="dark" className="opacity-60" />
      <AmbientGlows withAccents size="lg" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select  -none overflow-hidden"></div>
      <SectionReveal className="container relative z-10 mx-auto px-4">
        <div className="container mx-auto text-center flex flex-col items-center justify-center">
          {/* CENTERED CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-5xl"
          >
            {eyebrow && (
              <motion.div variants={itemVariants} className="mb-6">
                <Eyebrow variant="cyan">{eyebrow}</Eyebrow>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <SectionHeading
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
              >
                <BrandText text={heading} />
              </SectionHeading>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <SectionDescription className="text-base md:text-lg leading-relaxed text-tasto-white/70 whitespace-pre-line mx-auto">
                <BrandText text={description} logoClassName="md:mr-1" />
              </SectionDescription>
            </motion.div>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default AboutHeroBlock;
