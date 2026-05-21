import { getPayload } from "payload";
import config from "../payload.config.ts";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seed script to populate the database with initial content.
 * Generates an admin user, sample media, a home page with blocks, and blog posts.
 */
async function seed() {
  console.log("--- Seeding Database ---");

  const payload = await getPayload({ config });

  // 1. Create Admin User
  console.log("Creating admin user...");
  const adminUser = await payload.create({
    collection: "users",
    data: {
      email: "admin@example.com",
      password: "password",
    },
  });
  console.log("Admin user created.");

  // 2. Upload Sample Media
  console.log("Uploading sample media...");
  const mediaPath = path.resolve(__dirname, "../../public/seed-image.png");
  const media = await payload.create({
    collection: "media",
    data: {
      alt: "Seed Hero Image",
    },
    filePath: mediaPath,
  });
  console.log("Media uploaded.");

  // 3. Create Home Page
  console.log("Creating home page...");
  await payload.create({
    collection: "pages",
    data: {
      title: "Home",
      slug: "home",
      layout: [
        {
          blockType: "hero",
          heading: "Welcome to our Premium Template",
          subtext: "Experience the power of Payload CMS and Next.js combined.",
          backgroundImage: media.id,
          ctaButtons: [
            {
              label: "Get Started",
              link: "/docs",
              style: "primary",
            },
            {
              label: "Learn More",
              link: "/about",
              style: "secondary",
            },
          ],
        },
        {
          blockType: "features",
          features: [
            {
              icon: "zap",
              title: "Lightning Fast",
              description: "Built with Next.js 15 and React 19 for ultimate performance.",
            },
            {
              icon: "shield",
              title: "Secure by Default",
              description: "Payload CMS provides robust security and access control.",
            },
            {
              icon: "rocket",
              title: "Scalable",
              description: "Easily scale your application to millions of users.",
            },
          ],
        },
        {
          blockType: "cta",
          heading: "Ready to build something amazing?",
          text: "Start your journey with our comprehensive starter kit today.",
          buttonLabel: "Contact Us",
          buttonLink: "/contact",
        },
      ],
    },
  });
  console.log("Home page created.");

  // 4. Create Blog Posts
  console.log("Creating blog posts...");
  const posts = [
    {
      title: "Getting Started with Payload CMS",
      slug: "getting-started",
      content: {
        root: {
          type: "root",
          format: "" as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: "paragraph",
              children: [
                {
                  text: "Payload is the best way to build a modern backend. It's headless, open-source, and incredibly flexible.",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr" as const,
              format: "" as const,
              indent: 0,
              version: 1,
            },
          ],
          direction: "ltr" as const,
        },
      },
      featuredImage: media.id,
      author: adminUser.id,
      publishedDate: new Date().toISOString(),
    },
    {
      title: "The Future of Web Development",
      slug: "future-of-web",
      content: {
        root: {
          type: "root",
          format: "" as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: "paragraph",
              children: [
                {
                  text: "With the rise of Server Components and AI-driven development, the landscape is changing faster than ever.",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr" as const,
              format: "" as const,
              indent: 0,
              version: 1,
            },
          ],
          direction: "ltr" as const,
        },
      },
      featuredImage: media.id,
      author: adminUser.id,
      publishedDate: new Date().toISOString(),
    },
  ];

  for (const post of posts) {
    await payload.create({
      collection: "posts",
      data: post,
    });
  }
  console.log("Blog posts created.");

  console.log("--- Seeding Completed ---");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
