// src/payload/blocks/FinalCTA.ts

import { Block } from "payload";

/**
 * Final CTA Section
 * Closing enterprise call-to-action.
 */
export const CTA: Block = {
  slug: "cta",

  labels: {
    singular: "CTA",
    plural: "CTAs",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Transform Operations",
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
      name: "primaryButtonLabel",
      type: "text",
      required: true,
      defaultValue: "Request a Demo",
    },

    {
      name: "primaryButtonLink",
      type: "text",
      required: true,
      defaultValue: "/contact",
    },

    {
      name: "secondaryButtonLabel",
      type: "text",
      required: false,
      defaultValue: "Explore the Platform",
    },

    {
      name: "secondaryButtonLink",
      type: "text",
      required: false,
      defaultValue: "/platform",
    },
  ],
};
