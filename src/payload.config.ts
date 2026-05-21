import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Hero } from "./payload/blocks/Hero.ts";
import { OperationalGovernance } from "./payload/blocks/OperationalGovernance.ts";
import { PlatformArchitecture } from "./payload/blocks/PlatformArchitecture.ts";
import { ProblemSection } from "./payload/blocks/ProblemSection.ts";
import { StrategicTrust } from "./payload/blocks/StrategicTrust.ts";
import { Media } from "./payload/collections/Media.ts";
import { Pages } from "./payload/collections/Pages.ts";
import { Posts } from "./payload/collections/Posts.ts";
import { Users } from "./payload/collections/Users.ts";
import { Footer } from "./payload/globals/Footer.ts";
import { Header } from "./payload/globals/Header.ts";
import { SiteSettings } from "./payload/globals/SiteSettings.ts";
import { CTA } from "./payload/blocks/CTA.ts";
import { ContactHero } from "./payload/blocks/ContactHero.ts";
import { ContactInquiry } from "./payload/blocks/ContactInquiry.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Main Payload CMS configuration file.
 * Defines collections, globals, database adapter, editor, and plugins.
 * Sets up S3 storage if enabled via environment variables.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Pages, Posts],
  globals: [SiteSettings, Header, Footer],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "fallback-dev-secret-do-not-use-in-prod",
  typescript: {
    // 4. Use the relative dirname instead of process.cwd()
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    ...(process.env.USE_CLOUD_STORAGE === "true"
      ? [
          s3Storage({
            collections: {
              // Map the plugin to your specific media collection slug
              media: true,
            },
            bucket: process.env.S3_BUCKET as string,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
              },
              region: process.env.S3_REGION,
              endpoint: process.env.S3_ENDPOINT,
            },
          }),
        ]
      : []),
  ],
  blocks: [
    Hero,
    CTA,
    ProblemSection,
    PlatformArchitecture,
    OperationalGovernance,
    StrategicTrust,
    ContactHero,
    ContactInquiry,
  ],
});
