import { ICON_NAMES, kebabToPascalCase } from "@/constants/icon-names";

// 1. Map them all to PascalCase
const pascalIcons = ICON_NAMES.map((icon) => kebabToPascalCase(icon));

// 2. Remove duplicates using a Set, then convert back to an array
const uniquePascalIcons = Array.from(new Set(pascalIcons));

// 3. Export the options for Payload
export const lucideIconOptions = uniquePascalIcons.map((icon) => ({
  label: icon,
  value: icon,
}));
