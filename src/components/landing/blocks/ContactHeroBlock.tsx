"use client";

import { GridPattern } from "@/components/ui/grid-pattern";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { ContactHero as ContactHeroType } from "@/payload-types";
import { motion } from "motion/react";
import React from "react";
import { BrandText } from "../layout/brand-formatter";
import Eyebrow from "../layout/eyebrow";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const ContactHeroBlock: React.FC<ContactHeroType> = ({ eyebrow, heading, description }) => {
  return (
    <section className="relative overflow-x-clip bg-tasto-bg text-tasto-white pt-24 lg:pt-28 pb-16 lg:pb-24">
      {/* Background Decor */}
      <GridPattern />

      {/* Content Reveal Wrapper */}
      <SectionReveal className="container relative z-10 mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {eyebrow && (
            <Eyebrow variant="cyan" className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}

          <SectionHeading variant="dark" as="h1" className="max-w-5xl">
            <BrandText
              text={heading}
              logoClassName="lg:mr-4 max-sm:mt-4 text-white"
              spanClassName="bg-white/80"
            />
          </SectionHeading>

          <SectionDescription variant="dark" className="mt-6 max-w-2xl text-lg lg:text-xl">
            <BrandText text={description} />
          </SectionDescription>
        </motion.div>
      </SectionReveal>
    </section>
  );
};
