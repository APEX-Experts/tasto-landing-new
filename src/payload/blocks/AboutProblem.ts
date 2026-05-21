// src/payload/blocks/AboutProblem.ts

import { Block } from "payload";

/**
 * Explains why traditional enterprise systems fail modern software companies.
 */
export const AboutProblem: Block = {
  slug: "about-problem",

  labels: {
    singular: "About Problem",
    plural: "About Problems",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "The Operational Gap",
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
