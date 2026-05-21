// src/payload/blocks/Hero.ts

import { Block } from "payload";
import { lucideIconOptions } from "./icons";

/**
 * Hero Block
 * Enterprise-focused hero section for the TASTO landing page.
 */
export const Hero: Block = {
  slug: "hero",
  labels: {
    singular: "Hero",
    plural: "Heroes",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Business Operating & Governance Platform",
      admin: {
        description: "Small label shown above the main heading.",
      },
    },
    {
      name: "heading",
      type: "text",
      required: true,
      admin: {
        description: "The word 'TASTO' will automatically receive the custom brand styling.",
      },
    },
    {
      name: "subtext",
      type: "textarea",
      required: true,
    },
    {
      name: "ctaButtons",
      type: "array",
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "link",
          type: "text",
          required: true,
        },
        {
          name: "style",
          type: "select",
          defaultValue: "primary",
          options: [
            {
              label: "Primary",
              value: "primary",
            },
            {
              label: "Secondary",
              value: "secondary",
            },
          ],
        },
      ],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional image that replaces the dashboard mockup column if uploaded.",
      },
    },
    {
      name: "dashboardActivityIcon",
      type: "select",
      options: lucideIconOptions,
      defaultValue: "Activity",
    },
    {
      name: "dashboardEyebrow",
      type: "text",
      defaultValue: "Governance Overview",
    },
    {
      name: "dashboardTitle",
      type: "text",
      defaultValue: "Operational Control Center",
    },
    {
      name: "dashboardStatusText",
      type: "text",
      defaultValue: "System Healthy",
    },
    {
      name: "dashboardMetrics",
      type: "array",
      defaultValue: [
        { title: "Active Projects", value: "148", change: "+12%", icon: "Activity" },
        { title: "Monthly Revenue", value: "$284K", change: "+18%", icon: "Activity" },
        { title: "Client Retention", value: "96%", change: "+4%", icon: "Activity" },
        { title: "Governance Score", value: "92/100", change: "+8%", icon: "Activity" },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "change", type: "text", required: true },
        { name: "icon", type: "select", options: lucideIconOptions, defaultValue: "Activity" },
      ],
    },
    {
      name: "dashboardFlowTitle",
      type: "text",
      defaultValue: "Connected Business Flow",
    },
    {
      name: "dashboardFlowStatusText",
      type: "text",
      defaultValue: "Live Sync",
    },
    {
      name: "dashboardFlowItems",
      type: "array",
      defaultValue: [
        { label: "Contracts" },
        { label: "Projects" },
        { label: "Billing" },
        { label: "Finance" },
        { label: "Analytics" },
      ],
      fields: [{ name: "label", type: "text", required: true }],
    },
  ],
};
