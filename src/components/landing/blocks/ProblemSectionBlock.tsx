// src/components/landing/blocks/ProblemSectionBlock.tsx

import React from "react";

import type { ProblemSection as ProblemSectionType } from "@/payload-types";

interface ProblemCardProps {
  title: string;
  description: string;
  index: number;
}

/**
 * Individual strategic problem card.
 */
const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, index }) => {
  return (
    <div className="group relative border-t border-white/10 py-8 transition-all duration-300">
      <div className="absolute left-0 top-0 h-px w-0 bg-tasto-blue transition-all duration-500 group-hover:w-full max-md:w-full" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-tasto-blue/70">0{index + 1}</span>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-tasto-black">{title}</h3>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-tasto-black/60">
            {description}
          </p>
        </div>
      </div>
    </div>
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
    <section className="relative bg-tasto-white py-24 text-tasto-black lg:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-20 max-md:items-center lg:grid-cols-[0.9fr_1.1fr] max-md:text-center">
          {/* LEFT COLUMN - Now Sticky on large screens */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            {/* Eyebrow */}
            {eyebrow && (
              <div className="mb-6 inline-flex items-center rounded-full border border-tasto-black/10 bg-tasto-black/3 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-tasto-blue backdrop-blur-sm">
                {eyebrow}
              </div>
            )}

            {/* Heading */}
            <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-tasto-black sm:text-5xl">
              {heading}
            </h2>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-tasto-black/65">
              {description}
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {problems?.map((problem, index) => (
              <ProblemCard
                key={problem.id}
                title={problem.title}
                description={problem.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
