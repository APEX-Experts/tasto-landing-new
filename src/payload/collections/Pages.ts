import { CollectionConfig } from "payload";
import { Hero } from "../blocks/Hero";
import { Features } from "../blocks/Features";
import { CTA } from "../blocks/CTA";
import { ProblemSection } from "../blocks/ProblemSection";
import { PlatformArchitecture } from "../blocks/PlatformArchitecture";

/**
 * Payload CMS Collection configuration for dynamic Pages.
 * Allows creating pages with custom layouts using blocks like Hero, Features, and CTA.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value)
              return value
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            if (data?.title)
              return data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            return value;
          },
        ],
      },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [Hero, Features, CTA, ProblemSection, PlatformArchitecture],
      required: true,
    },
  ],
};
