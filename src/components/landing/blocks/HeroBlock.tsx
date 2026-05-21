// src/components/landing/blocks/HeroBlock.tsx

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Hero as HeroType } from "@/payload-types";

import { FullLogo } from "../layout/full-logo";
import { PageContainer } from "@/components/layout/PageContainer";

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
    <section className="relative overflow-hidden text-white bg-tasto-blue">
      <PageContainer className="relative lg:py-16">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="max-w-2xl text-center md:text-start">
            {/* Eyebrow */}
            {eyebrow && (
              <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-tasto-cyan backdrop-blur-sm">
                {eyebrow}
              </div>
            )}

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl flex flex-col items-center md:items-start">
              {formatHeading(heading)}
            </h1>

            {/* Subtext */}
            {subtext && (
              <p className="mt-8 md:max-w-xl text-lg leading-relaxed text-white/70 lg:text-xl text-center md:text-start">
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
                      className={`group h-12 rounded-xl px-8 text-sm font-medium transition-all ${
                        isPrimary
                          ? "border border-tasto-cyan bg-tasto-cyan/10 text-tasto-cyan hover:bg-tasto-cyan/80"
                          : "border border-white/10 bg-white/3 text-white hover:bg-white/5"
                      }`}
                    >
                      <Link href={button.link || "#"}>
                        {button.label}

                        {isPrimary && (
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative pointer-events-none select-none">
            {/* Main Dashboard Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl backdrop-blur-xl">
              {/* Top Bar */}
              <div className="mb-6 flex flex-col md:flex-row text-center md:text-start gap-2 items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-white/50">Governance Overview</p>

                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Operational Control Center
                  </h3>
                </div>

                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  System Healthy
                </div>
              </div>

              {/* Metrics */}
              <div className="grid gap-4 md:grid-cols-2">
                <DashboardMetric title="Active Projects" value="148" change="+12%" />

                <DashboardMetric title="Monthly Revenue" value="$284K" change="+18%" />

                <DashboardMetric title="Client Retention" value="96%" change="+4%" />

                <DashboardMetric title="Governance Score" value="92/100" change="+8%" />
              </div>

              {/* Module Flow */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-tasto-blue/2 p-5">
                <div className="mb-4 flex flex-col md:flex-row text-center md:text-start gap-2 items-center justify-between">
                  <h4 className="text-sm font-medium text-white">Connected Business Flow</h4>

                  <div className="text-xs text-tasto-cyan">Live Synchronization</div>
                </div>

                <div className="flex flex-col md:flex-row flex-wrap items-center gap-2 text-xs">
                  {["Contracts", "Projects", "Billing", "Finance", "Analytics"].map((item) => (
                    <React.Fragment key={item}>
                      <div className="rounded-lg border border-white/10 bg-white/3 px-3 py-2 text-white/80">
                        {item}
                      </div>

                      {item !== "Analytics" && (
                        <ArrowRight className="h-3 w-3 text-white/30 max-md:rotate-90" />
                      )}
                    </React.Fragment>
                  ))}
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
    <div className="rounded-2xl border border-white/10 bg-tasto-blue/2 p-5 text-center md:text-start">
      <p className="text-sm text-white/50">{title}</p>

      <div className="mt-3 flex flex-col items-center gap-2 md:items-end md:flex-row justify-between">
        <h4 className="text-2xl font-bold text-white">{value}</h4>

        <span className="text-sm font-medium text-emerald-400">{change}</span>
      </div>
    </div>
  );
};
