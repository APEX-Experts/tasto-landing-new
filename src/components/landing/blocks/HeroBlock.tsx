import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { AmbientGlows } from "@/components/ui/ambient-glows";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDescription } from "@/components/ui/section-description";
import { LucideIcon } from "@/components/ui/lucide-icon";

import type { Hero as HeroType } from "@/payload-types";

import { PageContainer } from "@/components/layout/PageContainer";
import Eyebrow from "../layout/eyebrow";
import { GridPattern } from "@/components/ui/grid-pattern";
import { BrandText } from "../layout/brand-formatter";

export const HeroBlock: React.FC<HeroType> = ({
  eyebrow,
  heading,
  subtext,
  ctaButtons,
  heroImage,
  dashboardActivityIcon = "Activity",
  dashboardEyebrow = "Governance Overview",
  dashboardTitle = "Operational Control Center",
  dashboardStatusText = "System Healthy",
  dashboardMetrics,
  dashboardFlowTitle = "Connected Business Flow",
  dashboardFlowStatusText = "Live Sync",
  dashboardFlowItems,
}) => {
  const imageUrl = typeof heroImage === "object" && heroImage !== null ? heroImage.url : null;
  const imageAlt =
    typeof heroImage === "object" && heroImage !== null ? heroImage.alt : "Hero Image";

  // Fallbacks for undefined database values
  const metrics =
    dashboardMetrics && dashboardMetrics.length > 0
      ? dashboardMetrics
      : [
          { title: "Active Projects", value: "148", change: "+12%", icon: "Activity" },
          { title: "Monthly Revenue", value: "$284K", change: "+18%", icon: "Activity" },
          { title: "Client Retention", value: "96%", change: "+4%", icon: "Activity" },
          { title: "Governance Score", value: "92/100", change: "+8%", icon: "Activity" },
        ];

  const flowItems =
    dashboardFlowItems && dashboardFlowItems.length > 0
      ? dashboardFlowItems
      : [
          { label: "Contracts" },
          { label: "Projects" },
          { label: "Billing" },
          { label: "Finance" },
          { label: "Analytics" },
        ];

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
            <SectionHeading as="h1" className="flex max-w-3xl flex-col items-center md:items-start">
              <BrandText text={heading} />
            </SectionHeading>

            {/* Subtext */}
            {subtext && (
              <SectionDescription className="mt-8 text-center md:max-w-xl md:text-start lg:text-xl">
                {subtext}
              </SectionDescription>
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

          {/* RIGHT VISUAL - IMAGE OR PREMIUM DASHBOARD */}
          <div className="relative">
            {imageUrl ? (
              <div className="group relative transition-transform duration-700 hover:-translate-y-2">
                {/* Outer Glow on Hover */}
                <div className="absolute -inset-1 rounded-[2.5rem] bg-linear-to-r from-tasto-cyan/0 via-tasto-cyan/10 to-tasto-cyan/0 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[2rem] border border-tasto-white/10 bg-linear-to-b from-tasto-white/[0.06] to-tasto-white/[0.01] p-2 shadow-2xl backdrop-blur-2xl">
                  {/* Top Edge Highlight */}
                  <div className="absolute inset-x-0 top-0 h-px w-full bg-linear-to-r from-transparent via-tasto-white/30 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                  <Image
                    src={imageUrl}
                    alt={imageAlt || "Hero Image"}
                    width={800}
                    height={500}
                    priority
                    unoptimized
                    className="w-full h-auto rounded-[1.8rem] object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="pointer-events-none select-none">
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
                          <LucideIcon
                            name={dashboardActivityIcon || "Activity"}
                            className="h-4 w-4 text-tasto-cyan/70 text-center md:text-start"
                          />
                          {dashboardEyebrow}
                        </div>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-tasto-white">
                          {dashboardTitle}
                        </h3>
                      </div>

                      {/* Premium Status Badge */}
                      <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </span>
                        {dashboardStatusText}
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid gap-4 md:grid-cols-2">
                      {metrics.map((metric, idx) => (
                        <DashboardMetric
                          key={idx}
                          title={metric.title}
                          value={metric.value}
                          change={metric.change}
                          iconName={metric.icon || "Activity"}
                        />
                      ))}
                    </div>

                    {/* Module Flow - Pipeline Style */}
                    <div className="mt-8 rounded-2xl border border-tasto-white/5 bg-tasto-white/2 p-6 shadow-inner">
                      <div className="mb-5 flex flex-col items-center justify-between gap-2 md:flex-row md:text-start">
                        <h4 className="text-sm font-medium text-tasto-white/80">
                          {dashboardFlowTitle}
                        </h4>
                        <div className="flex items-center gap-2 rounded-lg bg-tasto-cyan/10 px-2.5 py-1 text-xs font-medium text-tasto-cyan">
                          <div className="h-1.5 w-1.5 rounded-full bg-tasto-cyan shadow-[0_0_5px_var(--tasto-cyan)]" />
                          {dashboardFlowStatusText}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3 text-xs md:flex-row md:flex-wrap">
                        {flowItems.map((item, idx) => (
                          <React.Fragment key={idx}>
                            <div className="relative overflow-hidden rounded-xl border border-tasto-white/10 bg-linear-to-br from-tasto-white/5 to-transparent px-4 py-2.5 text-tasto-white/70 transition-colors duration-300 group-hover:border-tasto-cyan/20 group-hover:text-tasto-white">
                              {item.label}
                            </div>

                            {idx !== flowItems.length - 1 && (
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
            )}
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
  iconName: string;
}

const DashboardMetric: React.FC<DashboardMetricProps> = ({ title, value, change, iconName }) => {
  return (
    <div className="group/metric rounded-2xl border border-tasto-white/3 bg-tasto-white/2 p-5 text-center transition-colors duration-300 hover:border-tasto-white/8 hover:bg-tasto-white/4 md:text-start">
      <p className="text-sm font-medium text-tasto-white/40">{title}</p>

      <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row md:items-end">
        <h4 className="text-3xl font-bold tracking-tight text-tasto-white drop-shadow-md">
          {value}
        </h4>

        <div className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
          <LucideIcon name={iconName} className="h-3 w-3" />
          {change}
        </div>
      </div>
    </div>
  );
};
