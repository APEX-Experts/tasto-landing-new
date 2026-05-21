"use client";

import React from "react";
import { motion } from "motion/react";
import type { AboutProblem as AboutProblemType } from "@/payload-types";
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

const problemItemVariants = {
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

export const AboutProblemBlock: React.FC<AboutProblemType> = ({
  eyebrow = "The Operational Gap",
  heading = "Traditional enterprise systems were not designed for modern software operations.",
  description = "Modern technology organizations operate across rapidly evolving products, distributed teams, recurring revenue models, implementation cycles, and continuous operational change. Most legacy enterprise systems were never designed for this level of operational complexity.\n\nAs businesses scale, leadership teams often lose unified visibility across execution, financial governance, commercial performance, and delivery operations.",
  problems = [
    {
      title: "Fragmented Operational Visibility",
      description:
        "Critical operational data becomes distributed across disconnected tools, spreadsheets, departments, and reporting layers, making executive decision-making slower and less reliable.",
    },
    {
      title: "ERP Workflows Built for Traditional Enterprises",
      description:
        "Many enterprise systems were designed around static organizational structures and legacy workflows that do not reflect how SaaS and technology businesses actually operate.",
    },
    {
      title: "Governance Complexity at Scale",
      description:
        "As organizations grow across markets, teams, and operational functions, maintaining financial control, accountability, and executive oversight becomes increasingly difficult.",
    },
    {
      title: "Operational Misalignment Across Teams",
      description:
        "Commercial operations, delivery execution, and financial governance often evolve independently, creating organizational silos and inconsistent operational visibility.",
    },
  ],
}) => {
  return (
    <section className="relative bg-tasto-white text-tasto-black py-24 md:py-32">
      {/* Light-theme Architectural Grid Background */}
      <GridPattern variant="light" />

      <SectionReveal className="container relative z-10 mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* LEFT COLUMN - Sticky Intro */}
          <motion.div
            variants={introVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-lg:text-center lg:sticky lg:top-32 lg:self-start"
          >
            {eyebrow && (
              <Eyebrow variant="blue" className="mb-6">
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
              className="mt-8 mx-auto lg:mx-0 max-w-xl text-base md:text-lg leading-relaxed text-tasto-black/70"
            >
              <BrandText text={description} />
            </SectionDescription>
          </motion.div>

          {/* RIGHT COLUMN - Clean Typographic List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col"
          >
            {/* Top Border line */}
            <div className="h-px w-full bg-tasto-black/10" />

            {problems?.map((problem, index) => (
              <motion.div
                key={problem.id || index}
                variants={problemItemVariants}
                className="group relative py-8 md:py-10 border-b border-tasto-black/10 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start transition-colors duration-500"
              >
                {/* Custom glowing border indicator on hover */}
                <div className="absolute left-0 bottom-0 h-px w-0 bg-tasto-blue transition-all duration-500 group-hover:w-full" />

                {/* Elegant Number Outline */}
                <div className="text-center md:text-start font-display text-4xl md:text-5xl font-bold select-none text-transparent bg-clip-text [-webkit-text-stroke:1px_rgba(0,102,255,0.3)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(0,102,255,0.8)] group-hover:scale-105">
                  0{index + 1}
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-start">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-tasto-black transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-tasto-black/65 max-w-xl transition-colors duration-300 group-hover:text-tasto-black/80">
                    <BrandText text={problem.description} />
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default AboutProblemBlock;
