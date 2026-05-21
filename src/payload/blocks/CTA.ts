import { Block } from "payload";

/**
 * Payload CMS Block configuration for the Call-to-Action (CTA) section.
 * Includes fields for heading, text, and a primary action button.
 */
export const CTA: Block = {
  slug: "cta",
  labels: {
    singular: "CTA",
    plural: "CTAs",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "text",
      type: "textarea",
    },
    {
      name: "buttonLabel",
      type: "text",
      required: true,
    },
    {
      name: "buttonLink",
      type: "text",
      required: true,
    },
  ],
};
