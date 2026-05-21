"use client";

import React from "react";
import { motion } from "motion/react";

import type { StrategicTrust as StrategicTrustType } from "@/payload-types";
import Eyebrow from "../layout/eyebrow";
import { GridPattern } from "@/components/ui/grid-pattern";
import { GradientText } from "@/components/ui/gradient-text";
import { SectionDescription } from "@/components/ui/section-description";
import { BrandText } from "../layout/brand-formatter";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionReveal } from "@/components/ui/section-reveal";

interface MetricCardProps {
  value: string;
  label: string;
  description?: string | null;
}

// Animation variants
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

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
    },
  },
};

const MetricCard: React.FC<MetricCardProps> = ({ value, label, description }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-tasto-black/4 bg-tasto-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-tasto-blue/20 hover:bg-linear-to-br hover:from-tasto-white hover:to-tasto-blue/3 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10"
    >
      {/* Top Edge Indicator */}
      <div className="absolute inset-x-0 top-0 h-1.5 w-full bg-tasto-black/2 transition-colors duration-500 group-hover:bg-tasto-blue" />

      {/* Metric Value */}
      <div className="mb-6">
        <GradientText
          as="h4"
          variant="blue"
          className="text-5xl font-black tracking-tight transition-all duration-500 group-hover:scale-105 group-hover:origin-left sm:text-6xl"
        >
          {value}
        </GradientText>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto">
        <div className="mb-4 h-px w-12 bg-tasto-black/10 transition-all duration-500 group-hover:w-full group-hover:bg-tasto-blue/20" />

        <h3 className="text-xl font-bold tracking-tight text-tasto-black transition-colors duration-300">
          {label}
        </h3>

        {description && (
          <p className="mt-3 text-base leading-relaxed text-tasto-black/60">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export const StrategicTrustBlock: React.FC<StrategicTrustType> = ({
  eyebrow,
  heading,
  description,
  metrics,
}) => {
  return (
    <section className="relative overflow-hidden bg-tasto-white py-24">
      {/* Light-mode Architectural Grid */}
      <GridPattern variant="light" />
      <SectionReveal className="container relative z-10 mx-auto px-4">
        {/* Section Intro */}
        <motion.div
          variants={introVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-5xl text-center flex flex-col items-center justify-center"
        >
          {eyebrow && (
            <Eyebrow variant="blue" className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}

          <SectionHeading as="h2" variant="light">
            {heading}
          </SectionHeading>

          <SectionDescription variant="light" className="mx-auto mt-6 max-w-2xl">
            <BrandText text={description} logoClassName="mr-1" />
          </SectionDescription>
        </motion.div>

        {/* Metrics Grid (2x2 for premium spacing) */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-2"
        >
          {metrics?.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              label={metric.label}
              description={metric.description}
            />
          ))}
        </motion.div>
      </SectionReveal>
    </section>
  );
};
