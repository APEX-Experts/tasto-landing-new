import { Block } from "payload";

/**
 * Payload CMS Block configuration for the Features section.
 * Defines a list of features, each with a selectable icon, title, and description.
 */
export const Features: Block = {
  slug: "features",
  labels: {
    singular: "Features",
    plural: "Features",
  },
  fields: [
    {
      name: "features",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "icon",
          type: "select",
          options: [
            { label: "Zap", value: "zap" },
            { label: "Shield", value: "shield" },
            { label: "Rocket", value: "rocket" },
            { label: "Star", value: "star" },
            { label: "Heart", value: "heart" },
            { label: "Settings", value: "settings" },
            { label: "Check", value: "check" },
            { label: "Users", value: "users" },
            { label: "Globe", value: "globe" },
            { label: "Code", value: "code" },
            { label: "Bar Chart", value: "bar-chart" },
            { label: "Layers", value: "layers" },
            { label: "Layout", value: "layout" },
            { label: "Message Square", value: "message-square" },
            { label: "Mouse Pointer", value: "mouse-pointer" },
            { label: "Phone", value: "phone" },
            { label: "Search", value: "search" },
            { label: "Send", value: "send" },
            { label: "Share", value: "share" },
            { label: "Shopping Cart", value: "shopping-cart" },
            { label: "Smile", value: "smile" },
            { label: "Target", value: "target" },
            { label: "Thumbs Up", value: "thumbs-up" },
            { label: "Trending Up", value: "trending-up" },
            { label: "Video", value: "video" },
          ],
          defaultValue: "zap",
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
