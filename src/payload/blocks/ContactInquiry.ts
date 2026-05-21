// src/payload/blocks/ContactInquiry.ts

import { Block } from "payload";
import { lucideIconOptions } from "./icons";

/**
 * Contact inquiry section.
 * Displays enterprise contact methods and inquiry channels.
 */
export const ContactInquiry: Block = {
  slug: "contact-inquiry",

  labels: {
    singular: "Contact Inquiry",
    plural: "Contact Inquiries",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Contact Channels",
      admin: {
        description: "Small label displayed above the inquiry section.",
      },
    },

    {
      name: "heading",
      type: "text",
      required: true,
      admin: {
        description: "Main inquiry section heading.",
      },
    },

    {
      name: "description",
      type: "textarea",
      required: true,
      admin: {
        description: "Supporting text describing how organizations can reach out.",
      },
    },

    {
      name: "contactMethods",
      type: "array",
      minRows: 2,
      maxRows: 4,
      required: true,
      admin: {
        description: "Enterprise contact methods displayed beside the inquiry form.",
      },

      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "Contact method title.",
          },
        },

        {
          name: "value",
          type: "text",
          required: true,
          admin: {
            description: "Displayed contact information such as email or phone.",
          },
        },

        {
          name: "description",
          type: "textarea",
          required: false,
          admin: {
            description: "Optional supporting description for this contact method.",
          },
        },

        {
          name: "icon",
          type: "select",
          options: lucideIconOptions,
          required: true,
          defaultValue: "Mail",
          admin: {
            description: "Lucide icon displayed for this contact method.",
          },
        },
      ],
    },

    {
      name: "formHeading",
      type: "text",
      required: true,
      defaultValue: "Request a Demo",
      admin: {
        description: "Heading displayed above the inquiry form.",
      },
    },

    {
      name: "formDescription",
      type: "textarea",
      required: true,
      admin: {
        description: "Supporting description displayed above the form.",
      },
    },
  ],
};
