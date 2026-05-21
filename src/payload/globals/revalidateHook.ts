import { GlobalAfterChangeHook } from "payload";

/**
 * Returns a Payload global afterChange hook that revalidates the Next.js cache.
 *
 * @param globalSlug - The slug of the global being revalidated.
 * @returns A Payload GlobalAfterChangeHook function.
 */
export const revalidateHook = (globalSlug: string): GlobalAfterChangeHook => {
  return async ({ doc, req }) => {
    if (process.env.SEEDING === "true") {
      return doc;
    }

    try {
      const { revalidateTag } = await import("next/cache");
      revalidateTag("content", { expire: 60 * 60 * 24 * 7 });
      req.payload.logger.info(`Successfully revalidated tag "content" for ${globalSlug}`);
    } catch (err) {
      req.payload.logger.error(`Error revalidating ${globalSlug}: ${err}`);
    }
    return doc;
  };
};
