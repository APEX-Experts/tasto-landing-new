// src/components/landing/blocks/PlatformArchitectureBlock.tsx

import React from "react";
import { ArrowRight } from "lucide-react";

import type { PlatformArchitecture as PlatformArchitectureType } from "@/payload-types";
import Eyebrow from "../layout/eyebrow";
import { AmbientGlows } from "@/components/ui/ambient-glows";
import { GridPattern } from "@/components/ui/grid-pattern";
import { GradientText } from "@/components/ui/gradient-text";

interface PillarCardProps {
  title: string;
  description: string;
  modules?: {
    id?: string | null;
    label: string;
  }[];
  index: number;
}

/**
 * Individual operational pillar card.
 */
const PillarCard: React.FC<PillarCardProps> = ({ title, description, modules, index }) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-tasto-white/10 bg-linear-to-b from-tasto-white/4 to-transparent p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-tasto-cyan/30 hover:shadow-[0_0_40px_-15px_rgba(var(--tasto-cyan-rgb,0,255,255),0.15)]">
      {/* Top Edge Highlight */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-linear-to-r from-transparent via-tasto-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Massive Watermark Number */}
      <span className="absolute font-display -right-6 -top-5 z-0 select-none text-[12rem] font-bold leading-none text-tasto-white/2 transition-transform duration-700 group-hover:scale-105">
        {index + 1}
      </span>

      <div className="relative z-10 flex-1">
        {/* Header Section */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-tasto-cyan/20 bg-tasto-cyan/10 font-display text-sm font-medium text-tasto-cyan">
            0{index + 1}
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-tasto-cyan/30 to-transparent" />
        </div>

        {/* Title & Description */}
        <h3 className="mb-4 text-2xl font-semibold tracking-tight text-tasto-white transition-colors duration-300 ">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-tasto-white/60">{description}</p>
      </div>

      {/* Modules List */}
      <div className="relative z-10 mt-10 space-y-3">
        {modules?.map((module) => (
          <div
            key={module.id}
            className="group/module relative flex items-center justify-between rounded-2xl border border-transparent bg-tasto-white/2 px-5 py-4 transition-all duration-300 hover:border-tasto-cyan/20 hover:bg-tasto-cyan/3"
          >
            <div className="flex items-center gap-3">
              {/* Glowing Dot Indicator */}
              <div className="h-1.5 w-1.5 rounded-full bg-tasto-white/20 transition-all duration-300 group-hover/module:bg-tasto-cyan group-hover/module:shadow-[0_0_8px_var(--tasto-cyan)]" />
              <span className="text-sm font-medium text-tasto-white/70 transition-colors group-hover/module:text-tasto-white">
                {module.label}
              </span>
            </div>

            <ArrowRight className="h-4 w-4 text-tasto-white/10 transition-all duration-300 group-hover/module:translate-x-1 group-hover/module:text-tasto-cyan" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Platform Architecture Section
 */
export const PlatformArchitectureBlock: React.FC<PlatformArchitectureType> = ({
  eyebrow,
  heading,
  description,
  pillars,
}) => {
  return (
    <section className="relative overflow-hidden bg-tasto-bg py-24 lg:py-32">
      {/* Architectural Grid Background */}
      <GridPattern />

      {/* Ambient Glows */}
      <AmbientGlows />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Intro */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          {eyebrow && <Eyebrow className="mb-8">{eyebrow}</Eyebrow>}

          {/* Heading */}
          <GradientText
            as="h2"
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            {heading}
          </GradientText>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-tasto-white/60">
            {description}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars?.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              title={pillar.title}
              description={pillar.description}
              modules={pillar.modules}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
