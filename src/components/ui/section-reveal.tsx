"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
}

export function SectionReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 30,
  threshold = 0.15,
  once = true,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, disable transitions and offsets
  const actualDistance = shouldReduceMotion ? 0 : distance;
  const actualDuration = shouldReduceMotion ? 0.05 : duration;

  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: actualDistance, x: 0 };
      case "down":
        return { y: -actualDistance, x: 0 };
      case "left":
        return { y: 0, x: actualDistance };
      case "right":
        return { y: 0, x: -actualDistance };
      default:
        return { y: 0, x: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount: threshold,
      }}
      transition={{
        duration: actualDuration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const, // premium smooth custom bezier curve (easeOutExpo)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
