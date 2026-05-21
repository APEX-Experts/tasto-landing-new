// src/components/landing/blocks/HeroBlock.tsx

import React from "react";
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AmbientGlows } from "@/components/ui/ambient-glows";
import { GradientText } from "@/components/ui/gradient-text";

import type { Hero as HeroType } from "@/payload-types";

import { FullLogo } from "../layout/full-logo";
import { PageContainer } from "@/components/layout/PageContainer";
import Eyebrow from "../layout/eyebrow";
import { GridPattern } from "@/components/ui/grid-pattern";

/**
 * Automatically replaces the word "TASTO"
 * with the custom logo component.
 */
const formatHeading = (text?: string | null) => {
  if (!text) return null;

  const parts = text.split(/(TASTO)/g);

  return parts.map((part, index) => {
    if (part === "TASTO") {
      return <FullLogo key={index} />;
    }

    return (
      <span key={index} className="font-display">
        {part}
      </span>
    );
  });
};

export const HeroBlock: React.FC<HeroType> = ({ eyebrow, heading, subtext, ctaButtons }) => {
  return (
    <section className="relative overflow-hidden bg-tasto-bg text-tasto-white">
      <GridPattern />
      <AmbientGlows withAccents />
      <PageContainer className="relative pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-2xl text-center md:text-start">
            {/* Eyebrow */}
            {eyebrow && <Eyebrow className="mb-8">{eyebrow}</Eyebrow>}

            {/* Heading */}
            <GradientText
              as="h1"
              className="flex max-w-3xl flex-col items-center text-5xl font-black leading-[1.05] tracking-tight md:items-start md:text-6xl lg:text-7xl"
            >
              {formatHeading(heading)}
            </GradientText>

            {/* Subtext */}
            {subtext && (
              <p className="mt-8 text-center text-lg leading-relaxed text-tasto-white/60 md:max-w-xl md:text-start lg:text-xl">
                {subtext}
              </p>
            )}

            {/* CTA Buttons */}
            {ctaButtons && ctaButtons.length > 0 && (
              <div className="mt-10 flex flex-col gap-4 md:flex-row">
                {ctaButtons.map((button) => {
                  const isPrimary = button.style !== "secondary";

                  return (
                    <Button
                      key={button.id}
                      asChild
                      size="lg"
                      variant={isPrimary ? "default" : "outline"}
                      className={`group relative h-12 overflow-hidden rounded-xl px-8 text-sm font-medium transition-all duration-300 ${
                        isPrimary
                          ? "border border-tasto-cyan/50 bg-tasto-cyan/10 text-tasto-cyan shadow-[0_0_20px_-5px_rgba(var(--tasto-cyan-rgb,0,255,255),0.3)] hover:bg-tasto-cyan/20 hover:shadow-[0_0_25px_-2px_rgba(var(--tasto-cyan-rgb,0,255,255),0.5)]"
                          : "border border-tasto-white/10 bg-tasto-white/5 text-tasto-white hover:border-tasto-white/20 hover:bg-tasto-white/10"
                      }`}
                    >
                      <Link href={button.link || "#"}>
                        <span className="relative z-10 flex items-center">
                          {button.label}
                          {isPrimary && (
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          )}
                        </span>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT VISUAL - PREMIUM DASHBOARD */}
          <div className="pointer-events-none relative select-none">
            {/* Dashboard Container Wrapper for Hover Effects */}
            <div className="group relative transition-transform duration-700 hover:-translate-y-2">
              {/* Outer Glow on Hover */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-linear-to-r from-tasto-cyan/0 via-tasto-cyan/10 to-tasto-cyan/0 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

              {/* Main Dashboard Card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-tasto-white/10 bg-linear-to-b from-tasto-white/[0.06] to-tasto-white/[0.01] p-8 shadow-2xl backdrop-blur-2xl">
                {/* Top Edge Highlight */}
                <div className="absolute inset-x-0 top-0 h-px w-full bg-linear-to-r from-transparent via-tasto-white/30 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top Bar */}
                <div className="mb-8 flex flex-col items-center text-center justify-between gap-4 border-b border-tasto-white/5 pb-6 md:flex-row md:items-start md:text-start">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 text-sm text-tasto-white/40">
                      <Activity className="h-4 w-4 text-tasto-cyan/70 text-center md:text-start" />
                      Governance Overview
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-tasto-white">
                      Operational Control Center
                    </h3>
                  </div>

                  {/* Premium Status Badge */}
                  <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    System Healthy
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  <DashboardMetric title="Active Projects" value="148" change="+12%" />
                  <DashboardMetric title="Monthly Revenue" value="$284K" change="+18%" />
                  <DashboardMetric title="Client Retention" value="96%" change="+4%" />
                  <DashboardMetric title="Governance Score" value="92/100" change="+8%" />
                </div>

                {/* Module Flow - Pipeline Style */}
                <div className="mt-8 rounded-2xl border border-tasto-white/5 bg-tasto-white/2 p-6 shadow-inner">
                  <div className="mb-5 flex flex-col items-center justify-between gap-2 md:flex-row md:text-start">
                    <h4 className="text-sm font-medium text-tasto-white/80">
                      Connected Business Flow
                    </h4>
                    <div className="flex items-center gap-2 rounded-lg bg-tasto-cyan/10 px-2.5 py-1 text-xs font-medium text-tasto-cyan">
                      <div className="h-1.5 w-1.5 rounded-full bg-tasto-cyan shadow-[0_0_5px_var(--tasto-cyan)]" />
                      Live Sync
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 text-xs md:flex-row md:flex-wrap">
                    {["Contracts", "Projects", "Billing", "Finance", "Analytics"].map((item) => (
                      <React.Fragment key={item}>
                        <div className="relative overflow-hidden rounded-xl border border-tasto-white/10 bg-linear-to-br from-tasto-white/5 to-transparent px-4 py-2.5 text-tasto-white/70 transition-colors duration-300 group-hover:border-tasto-cyan/20 group-hover:text-tasto-white">
                          {item}
                        </div>

                        {item !== "Analytics" && (
                          <div className="flex items-center text-tasto-white/20 transition-colors duration-300 group-hover:text-tasto-cyan/50 max-md:rotate-90">
                            <div className="h-px w-3 bg-current" />
                            <ArrowRight className="h-3 w-3 -ml-1" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

interface DashboardMetricProps {
  title: string;
  value: string;
  change: string;
}

const DashboardMetric: React.FC<DashboardMetricProps> = ({ title, value, change }) => {
  return (
    <div className="group/metric rounded-2xl border border-tasto-white/3 bg-tasto-white/2 p-5 text-center transition-colors duration-300 hover:border-tasto-white/8 hover:bg-tasto-white/4 md:text-start">
      <p className="text-sm font-medium text-tasto-white/40">{title}</p>

      <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row md:items-end">
        <h4 className="text-3xl font-bold tracking-tight text-tasto-white drop-shadow-md">
          {value}
        </h4>

        <div className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
          <Activity className="h-3 w-3" />
          {change}
        </div>
      </div>
    </div>
  );
};
