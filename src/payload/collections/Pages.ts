import { CollectionConfig } from "payload";
import { Hero } from "../blocks/Hero";
import { OperationalGovernance } from "../blocks/OperationalGovernance";
import { PlatformArchitecture } from "../blocks/PlatformArchitecture";
import { ProblemSection } from "../blocks/ProblemSection";
import { StrategicTrust } from "../blocks/StrategicTrust";
import { CTA } from "../blocks/CTA";
import { ContactHero } from "../blocks/ContactHero";
import { ContactInquiry } from "../blocks/ContactInquiry";
import { AboutHero } from "../blocks/AboutHero";
import { AboutProblem } from "../blocks/AboutProblem";
import { AboutPhilosophy } from "../blocks/AboutPhilosophy";
import { AboutCTA } from "../blocks/AboutCTA";
import { CompanyExpertise } from "../blocks/CompanyExpertise";
import { revalidatePageHook } from "../globals/revalidateHook";

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
  hooks: {
    afterChange: [revalidatePageHook],
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
      blocks: [
        Hero,
        CTA,
        ProblemSection,
        PlatformArchitecture,
        OperationalGovernance,
        StrategicTrust,
        ContactHero,
        ContactInquiry,
        AboutHero,
        AboutProblem,
        AboutPhilosophy,
        AboutCTA,
        CompanyExpertise,
      ],
      required: true,
    },
  ],
};
