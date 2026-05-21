import { Block } from "payload";

export const CompanyExpertise: Block = {
  slug: "company-expertise",

  labels: {
    singular: "Company Expertise",
    plural: "Company Expertise",
  },

  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "Implementation Expertise",
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
      name: "logoSvg",
      type: "textarea",
      label: "Logo SVG Code",
      admin: {
        description:
          "Raw SVG code for the company logo. Will be rendered in a small, restrained manner.",
      },
    },

    {
      name: "capabilities",
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
      ],
    },
  ],
};
