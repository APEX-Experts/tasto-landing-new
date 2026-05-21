// src/payload/blocks/StrategicTrust.ts

import { Block } from "payload";

/**
 * Strategic Trust / Scale Section
 * Reinforces enterprise positioning,
 * operational scale, and platform maturity.
 */
export const StrategicTrust: Block = {
  slug: "strategic-trust",

  labels: {
    singular: "Strategic Trust",
    plural: "Strategic Trust Sections",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Built for Scale",
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
      name: "metrics",
      type: "array",
      minRows: 3,
      maxRows: 6,
      required: true,

      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },

        {
          name: "label",
          type: "text",
          required: true,
        },

        {
          name: "description",
          type: "textarea",
          required: false,
        },
      ],
    },
  ],
};
