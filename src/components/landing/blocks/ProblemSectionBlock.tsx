"use client";

import React from "react";
import { motion } from "motion/react";

import type { ProblemSection as ProblemSectionType } from "@/payload-types";
import Eyebrow from "../layout/eyebrow";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDescription } from "@/components/ui/section-description";

import { SectionReveal } from "@/components/ui/section-reveal";

interface ProblemCardProps {
  title: string;
  description: string;
  index: number;
}

// Parent container staggers the children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Subtle slide-up-and-in for cards
const cardVariants = {
  hidden: { opacity: 0, y: 30, x: 15 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
    },
  },
};

// Fade & slide up for left intro text
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

/**
 * Individual strategic problem card.
 */
const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-[2rem] border border-tasto-black/4 bg-tasto-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-tasto-blue/20 hover:bg-linear-to-b hover:from-tasto-white hover:to-tasto-blue/2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10"
    >
      {/* Dynamic Left Edge Indicator */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-tasto-black/3 transition-colors duration-500 group-hover:bg-tasto-blue" />

      {/* Massive Watermark Number */}
      <span className="font-display absolute -right-4 -top-4 z-0 select-none text-[10rem] font-bold leading-none text-tasto-black/2 transition-transform duration-700 group-hover:scale-105">
        {index + 1}
      </span>

      <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:gap-8">
        {/* Number Badge */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-tasto-blue/10 bg-tasto-blue/5 font-display text-sm font-medium text-tasto-blue transition-all duration-500 group-hover:scale-110 group-hover:border-tasto-blue/30 group-hover:bg-tasto-blue/10 group-hover:shadow-[0_0_15px_-3px_rgba(var(--tasto-blue-rgb,0,0,255),0.2)]">
          0{index + 1}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-tasto-black transition-colors duration-300 ">
            {title}
          </h3>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-tasto-black/65 transition-colors duration-300 group-hover:text-tasto-black/80">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Strategic Problem / Market Shift Section
 */
export const ProblemSectionBlock: React.FC<ProblemSectionType> = ({
  eyebrow,
  heading,
  description,
  problems,
}) => {
  return (
    <section className="relative bg-tasto-white py-24 lg:py-32">
      {/* Light-mode Architectural Grid */}
      <GridPattern variant="light" />

      <SectionReveal className="container relative z-10 mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* LEFT COLUMN - Sticky Intro */}
          <motion.div
            variants={introVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-md:text-center lg:sticky lg:top-32 lg:self-start"
          >
            {/* Eyebrow */}
            {eyebrow && (
              <Eyebrow variant="blue" className="mb-6">
                {eyebrow}
              </Eyebrow>
            )}

            {/* Heading */}
            <SectionHeading variant="light">{heading}</SectionHeading>

            {/* Description */}
            <SectionDescription variant="light" className="mx-auto mt-8 max-w-xl lg:mx-0">
              {description}
            </SectionDescription>
          </motion.div>

          {/* RIGHT COLUMN - Problem Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-6"
          >
            {problems?.map((problem, index) => (
              <ProblemCard
                key={problem.id}
                title={problem.title}
                description={problem.description}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
};
