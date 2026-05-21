"use client";

import React from "react";
import { motion } from "motion/react";

import type { OperationalGovernance as OperationalGovernanceType } from "@/payload-types";
import Eyebrow from "../layout/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDescription } from "@/components/ui/section-description";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { BrandText } from "../layout/brand-formatter";
import { AmbientGlows } from "@/components/ui/ambient-glows";
import { SectionReveal } from "@/components/ui/section-reveal";

// Animation Variants
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

const leftStackVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const capabilityVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const rightPanelVariants = {
  hidden: { opacity: 0, x: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const metricsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const metricItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const OperationalGovernanceBlock: React.FC<OperationalGovernanceType> = ({
  eyebrow,
  heading,
  description,
  capabilities,
  sideQuote,
  networkStatusIcon = "Shield",
  networkStatusLabel = "Network Status",
  networkStatusText = "Centralized & Encrypted",
  liveBadgeText = "Live",
  metrics,
}) => {
  // Default values fallback for metrics
  const displayMetrics =
    metrics && metrics.length > 0
      ? metrics
      : [
          { title: "Audit Log", value: "Immutable", icon: "LockKeyhole" },
          { title: "Uptime", value: "99.99%", icon: "Activity" },
          { title: "Access Control", value: "Enforced", icon: "Fingerprint" },
        ];

  return (
    <section className="relative bg-tasto-bg pb-24 overflow-x-clip overflow-y-visible">
      {/* Restrained Ambient Glow - Less flashy, more executive */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
        <div className="absolute right-0 top-1/4 h-[800px] w-[800px] translate-x-1/3 rounded-full bg-tasto-cyan/5 blur-[150px]" />
      </div>

      <AmbientGlows withAccents />

      <SectionReveal className="container relative z-10 mx-auto px-4">
        {/* TOP INTRO */}
        <motion.div
          variants={introVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          {eyebrow && (
            <Eyebrow variant="cyan" className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}

          <SectionHeading>{heading}</SectionHeading>

          <SectionDescription className="mt-6 sm:text-xl">
            <BrandText text={description} logoClassName="mr-1" />
          </SectionDescription>
        </motion.div>

        {/* BOTTOM SPLIT LAYOUT */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* LEFT: Capabilities Stack */}
          <motion.div
            variants={leftStackVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col"
          >
            {/* Top Border for the stack */}
            <div className="h-px w-full bg-tasto-white/10" />

            {capabilities?.map((capability, index) => (
              <motion.div
                key={index}
                variants={capabilityVariants}
                className="group relative flex flex-col justify-center items-center md:items-start text-center md:text-start border-b border-tasto-white/10 py-10 transition-colors duration-500 hover:border-tasto-cyan/30"
              >
                {/* Subtle left-edge active indicator */}
                <div className="absolute -left-4 top-1/2 h-0 w-1 -translate-y-1/2 bg-tasto-cyan transition-all duration-500 group-hover:h-2/3 md:left-0 md:-ml-6" />

                <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-center">
                  <h3 className="text-2xl font-semibold tracking-tight text-tasto-white transition-colors duration-300">
                    {capability.title}
                  </h3>

                  {/* Metric Pill */}
                  <div className="inline-flex items-center rounded-full border border-tasto-white/10 bg-tasto-white/5 px-3 py-1 text-xs font-medium tracking-wide text-tasto-white/70 transition-colors duration-300 group-hover:border-tasto-cyan/20 group-hover:text-tasto-cyan">
                    {capability.metric}
                  </div>
                </div>

                <p className="max-w-md text-base leading-relaxed text-tasto-white/60">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT: Massive Governance Panel */}
          <motion.div
            variants={rightPanelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative flex w-full flex-col justify-between overflow-hidden rounded-[2.5rem] border border-tasto-white/10 bg-linear-to-b from-tasto-white/4 to-tasto-white/1 p-10 shadow-2xl backdrop-blur-xl lg:p-14"
          >
            {/* Panel Top Highlight */}
            <div className="absolute inset-x-0 top-0 h-px w-full bg-linear-to-r from-transparent via-tasto-white/20 to-transparent opacity-50" />

            {/* Header: Executive Status */}
            <div className="mb-16 flex flex-col md:flex-row gap-2 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tasto-cyan/10">
                  <LucideIcon
                    name={networkStatusIcon || "Shield"}
                    className="h-5 w-5 text-tasto-cyan"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-tasto-white/40">
                    {networkStatusLabel}
                  </div>
                  <div className="text-sm font-medium text-tasto-white">{networkStatusText}</div>
                </div>
              </div>

              {/* Pulse Indicator */}
              <div className="flex items-center gap-2 rounded-full bg-tasto-white/5 px-3 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tasto-cyan opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-tasto-cyan"></span>
                </span>
                <span className="text-xs font-medium text-tasto-white/70">{liveBadgeText}</span>
              </div>
            </div>

            {/* Middle: Side Quote */}
            <div className="relative z-10 mb-16">
              {/* Massive decorative quote mark */}
              <span className="absolute -left-6 -top-14 select-none font-serif text-[8rem] leading-none text-tasto-white/3">
                &ldquo;
              </span>
              <blockquote className="relative text-3xl font-medium leading-[1.3] tracking-tight text-tasto-white sm:text-4xl text-center md:text-start">
                <BrandText
                  text={sideQuote}
                  className="ml-2"
                  logoClassName="inline-flex h-[0.9em] translate-y-[-0.05em]"
                />
              </blockquote>
            </div>

            {/* Footer: Operational Status Metrics */}
            <motion.div
              variants={metricsGridVariants}
              className="grid grid-cols-2 gap-4 border-t border-tasto-white/10 pt-8 sm:grid-cols-3"
            >
              {displayMetrics.map((metric, idx) => {
                const isLast = idx === 2;
                return (
                  <motion.div
                    key={idx}
                    variants={metricItemVariants}
                    className={`flex flex-col gap-2 ${isLast ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <LucideIcon
                      name={metric.icon || "Activity"}
                      className="h-4 w-4 text-tasto-white/30"
                    />
                    <span className="text-xs font-medium uppercase tracking-wider text-tasto-white/40">
                      {metric.title}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        metric.value === "Enforced" ? "text-emerald-400" : "text-tasto-white"
                      }`}
                    >
                      {metric.value}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
};
