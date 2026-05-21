import { GlobalConfig } from "payload";
import { revalidateHook } from "@/payload/globals/revalidateHook";

/**
 * Payload CMS Global configuration for general Site Settings.
 * Stores core SEO data like site URL, title, and description.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  hooks: {
    afterChange: [revalidateHook("site-settings")],
  },
  fields: [
    { name: "siteUrl", type: "text", required: true },
    { name: "siteTitle", type: "text", required: true },
    { name: "siteDescription", type: "text", required: true },
  ],
};
