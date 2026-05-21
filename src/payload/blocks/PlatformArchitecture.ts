// src/payload/blocks/PlatformArchitecture.ts

import { Block } from "payload";

/**
 * Platform Architecture Section
 * Showcases the operational pillars and connected module ecosystem of TASTO.
 */
export const PlatformArchitecture: Block = {
  slug: "platform-architecture",

  labels: {
    singular: "Platform Architecture",
    plural: "Platform Architectures",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "One Unified Platform",
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
      name: "pillars",
      type: "array",
      minRows: 3,
      maxRows: 3,
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

        {
          name: "modules",
          type: "array",
          minRows: 1,
          required: true,

          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
