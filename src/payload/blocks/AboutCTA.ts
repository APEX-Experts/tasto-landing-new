// src/payload/blocks/AboutCTA.ts

import { Block } from "payload";

/**
 * Final strategic CTA for the about page.
 */
export const AboutCTA: Block = {
  slug: "about-cta",

  labels: {
    singular: "About CTA",
    plural: "About CTAs",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Strategic Discussion",
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
      name: "primaryCTA",
      type: "group",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          defaultValue: "Request a Demo",
        },
        {
          name: "href",
          type: "text",
          required: true,
          defaultValue: "/contact",
        },
      ],
    },

    {
      name: "secondaryCTA",
      type: "group",
      fields: [
        {
          name: "label",
          type: "text",
          required: false,
          defaultValue: "Contact Us",
        },
        {
          name: "href",
          type: "text",
          required: false,
          defaultValue: "/contact",
        },
      ],
    },
  ],
};
