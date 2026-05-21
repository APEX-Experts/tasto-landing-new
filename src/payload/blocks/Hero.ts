// src/payload/blocks/Hero.ts

import { Block } from "payload";

/**
 * Hero Block
 * Enterprise-focused hero section for the TASTO landing page.
 */
export const Hero: Block = {
  slug: "hero",
  labels: {
    singular: "Hero",
    plural: "Heroes",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Business Operating & Governance Platform",
      admin: {
        description: "Small label shown above the main heading.",
      },
    },
    {
      name: "heading",
      type: "text",
      required: true,
      admin: {
        description: "The word 'TASTO' will automatically receive the custom brand styling.",
      },
    },
    {
      name: "subtext",
      type: "textarea",
      required: true,
    },
    {
      name: "ctaButtons",
      type: "array",
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "link",
          type: "text",
          required: true,
        },
        {
          name: "style",
          type: "select",
          defaultValue: "primary",
          options: [
            {
              label: "Primary",
              value: "primary",
            },
            {
              label: "Secondary",
              value: "secondary",
            },
          ],
        },
      ],
    },
  ],
};
