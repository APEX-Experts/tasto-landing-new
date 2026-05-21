// src/payload/blocks/OperationalGovernance.ts

import { Block } from "payload";
import { lucideIconOptions } from "./icons";

/**
 * Operational Governance Section
 * Highlights executive visibility, governance,
 * operational clarity, and centralized oversight.
 */
export const OperationalGovernance: Block = {
  slug: "operational-governance",

  labels: {
    singular: "Operational Governance",
    plural: "Operational Governance Sections",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Executive Visibility",
      admin: {
        description: "Small label displayed above the section heading.",
      },
    },

    {
      name: "heading",
      type: "text",
      required: true,
      admin: {
        description: "Main section heading.",
      },
    },

    {
      name: "description",
      type: "textarea",
      required: true,
      admin: {
        description: "Supporting introduction text for the section.",
      },
    },

    {
      name: "capabilities",
      type: "array",
      minRows: 3,
      maxRows: 6,
      required: true,
      admin: {
        description: "Operational governance capabilities displayed in the section.",
      },

      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },

        {
          name: "description",
          type: "textarea",
          required: true,
        },

        {
          name: "metric",
          type: "text",
          required: true,
          admin: {
            description: "Short supporting label or operational outcome.",
          },
        },
      ],
    },

    {
      name: "sideQuote",
      type: "textarea",
      required: true,
      admin: {
        description: "Large highlighted strategic quote displayed in the side panel.",
      },
    },

    {
      name: "networkStatusIcon",
      type: "select",
      options: lucideIconOptions,
      defaultValue: "Shield",
    },

    {
      name: "networkStatusLabel",
      type: "text",
      defaultValue: "Network Status",
    },

    {
      name: "networkStatusText",
      type: "text",
      defaultValue: "Centralized & Encrypted",
    },

    {
      name: "liveBadgeText",
      type: "text",
      defaultValue: "Live",
    },

    {
      name: "metrics",
      type: "array",
      minRows: 3,
      maxRows: 3,
      defaultValue: [
        { title: "Audit Log", value: "Immutable", icon: "LockKeyhole" },
        { title: "Uptime", value: "99.99%", icon: "Activity" },
        { title: "Access Control", value: "Enforced", icon: "Fingerprint" },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "icon", type: "select", options: lucideIconOptions, defaultValue: "Activity" },
      ],
    },
  ],
};
