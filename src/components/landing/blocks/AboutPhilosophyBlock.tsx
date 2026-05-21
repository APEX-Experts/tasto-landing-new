"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import type { AboutPhilosophy as AboutPhilosophyType } from "@/payload-types";
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

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const AboutPhilosophyBlock: React.FC<AboutPhilosophyType> = ({
  eyebrow = "Our Perspective",
  heading = "Operational governance should function as connected business infrastructure.",
  description = "TASTO was designed around the idea that operational clarity is not simply a reporting layer — it is foundational infrastructure for modern organizations.\n\nCommercial growth, execution delivery, financial governance, and organizational visibility should not operate as isolated systems. They should function together as part of a unified operational framework that enables leadership teams to make decisions with confidence.",
  principles = [
    {
      title: "Visibility Enables Better Decisions",
      description:
        "Leadership teams require real-time operational visibility across the organization in order to scale effectively and maintain strategic clarity.",
    },
    {
      title: "Governance Must Scale With Growth",
      description:
        "Operational governance should evolve alongside the organization without introducing unnecessary complexity or fragmented reporting structures.",
    },
    {
      title: "Operational Systems Should Be Connected",
      description:
        "Commercial operations, execution workflows, and financial oversight should function together within a unified operational environment.",
    },
    {
      title: "Infrastructure Matters More Than Tool Count",
      description:
        "Organizations do not need more disconnected systems. They need operational infrastructure capable of supporting long-term scale and executive oversight.",
    },
  ],
}) => {
  return (
    <section className="relative overflow-hidden bg-tasto-bg text-tasto-white py-24">
      {/* Background patterns */}
      <GridPattern />

      {/* Restrained glow background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
        <div className="absolute left-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-tasto-cyan/5 blur-[120px]" />
      </div>

      <SectionReveal className="container relative z-10 mx-auto px-4">
        {/* Intro Section */}
        <motion.div
          variants={introVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-5xl text-center flex flex-col items-center mb-20"
        >
          {eyebrow && (
            <Eyebrow variant="cyan" className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}

          <SectionHeading className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            <BrandText text={heading} />
          </SectionHeading>

          <SectionDescription className="mx-auto mt-6 max-w-4xl text-base md:text-lg leading-relaxed text-tasto-white/70">
            <BrandText text={description} logoClassName="md:mr-1" />
          </SectionDescription>
        </motion.div>

        {/* Minimal Grid Line Interlocking Panes */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 border border-tasto-white/10 rounded-[2rem] overflow-hidden bg-tasto-white/[0.01] backdrop-blur-xs"
        >
          {principles?.map((principle, index) => (
            <PhilosophyPane
              key={principle.id || index}
              title={principle.title}
              description={principle.description}
              index={index}
            />
          ))}
        </motion.div>
      </SectionReveal>
    </section>
  );
};

interface PhilosophyPaneProps {
  title: string;
  description: string;
  index: number;
}

const PhilosophyPane: React.FC<PhilosophyPaneProps> = ({ title, description, index }) => {
  const paneRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!paneRef.current) return;
    const { left, top } = paneRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    paneRef.current.style.setProperty("--x", `${x}px`);
    paneRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <motion.div
      ref={paneRef}
      onMouseMove={handleMouseMove}
      variants={gridItemVariants}
      className={`relative p-8 md:p-12 overflow-hidden group/cell border-tasto-white/10 transition-colors duration-500 border-b last:border-b-0 md:[&:nth-child(odd)]:border-r md:[&:nth-child(1)]:border-b md:[&:nth-child(2)]:border-b md:[&:nth-child(3)]:border-b-0 md:[&:nth-child(4)]:border-b-0 text-center md:text-start`}
    >
      {/* Dynamic Hover Glow Overlay (Tracks Mouse) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/cell:opacity-100 transition-opacity duration-700 z-0 bg-[radial-gradient(350px_circle_at_var(--x,50%)_var(--y,50%),rgba(0,255,255,0.06),transparent_80%)]" />

      {/* Decorative corner indicator */}
      <div className="absolute top-4 right-4 text-[10px] font-display tracking-widest text-tasto-white/10 group-hover/cell:text-tasto-cyan/30 transition-colors duration-500 select-none">
        {"0"}
        {index + 1}
      </div>

      <div className="relative z-10">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-tasto-white transition-colors duration-300 ">
          {title}
        </h3>

        {/* Separator line */}
        <div className="my-6 h-px w-8 bg-tasto-white/10 transition-all duration-500 group-hover/cell:w-16 group-hover/cell:bg-tasto-cyan/30" />

        {/* Description */}
        <p className="text-base leading-relaxed text-tasto-white/60 transition-colors duration-300 group-hover/cell:text-tasto-white/80">
          <BrandText text={description} />
        </p>
      </div>
    </motion.div>
  );
};

export default AboutPhilosophyBlock;
