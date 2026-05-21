// src/payload/blocks/AboutHero.ts

import { Block } from "payload";

/**
 * Strategic about page hero.
 * Establishes TASTO positioning and operational philosophy.
 */
export const AboutHero: Block = {
  slug: "about-hero",

  labels: {
    singular: "About Hero",
    plural: "About Heroes",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Operational Philosophy",
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
  ],
};
