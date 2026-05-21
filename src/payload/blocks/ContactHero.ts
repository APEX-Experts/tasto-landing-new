// src/payload/blocks/ContactHero.ts

import { Block } from "payload";

/**
 * Contact page hero section.
 * Introduces enterprise inquiries and platform conversations.
 */
export const ContactHero: Block = {
  slug: "contact-hero",

  labels: {
    singular: "Contact Hero",
    plural: "Contact Heroes",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Enterprise Inquiries",
      admin: {
        description: "Small label displayed above the main heading.",
      },
    },

    {
      name: "heading",
      type: "text",
      required: true,
      admin: {
        description: "Primary contact page heading.",
      },
    },

    {
      name: "description",
      type: "textarea",
      required: true,
      admin: {
        description: "Short supporting description introducing the contact experience.",
      },
    },
  ],
};
