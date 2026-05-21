// src/payload/blocks/AboutPhilosophy.ts

import { Block } from "payload";

/**
 * Core operational philosophy behind TASTO.
 */
export const AboutPhilosophy: Block = {
  slug: "about-philosophy",

  labels: {
    singular: "About Philosophy",
    plural: "About Philosophies",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Our Perspective",
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
      name: "principles",
      type: "array",
      minRows: 3,
      maxRows: 5,
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
