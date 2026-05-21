// src/payload/blocks/ProblemSection.ts

import { Block } from "payload";

/**
 * Problem / Strategic Market Shift Section
 * Explains why traditional ERP systems fail
 * modern SaaS and AI companies.
 */
export const ProblemSection: Block = {
  slug: "problem-section",

  labels: {
    singular: "Problem Section",
    plural: "Problem Sections",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "The Problem",
    },

    {
      name: "heading",
      type: "text",
      required: true,
    },

    {
      name: "description",
      type: "textarea",
      required: true,
    },

    {
      name: "problems",
      type: "array",
      minRows: 3,
      maxRows: 6,
      required: true,

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
      ],
    },
  ],
};
