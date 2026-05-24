# Payload CMS + Next.js: Cache Revalidation Guide

> How on-demand revalidation works in this project, why stale content can appear on Vercel, and how to extend the pattern for new collections.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [The Problem We Solved](#the-problem-we-solved)
- [How Revalidation Works Now](#how-revalidation-works-now)
- [Key Files](#key-files)
- [Adding Revalidation to a New Collection](#adding-revalidation-to-a-new-collection)
- [Adding Revalidation to a New Global](#adding-revalidation-to-a-new-global)
- [Common Pitfalls](#common-pitfalls)
- [Debugging Revalidation on Vercel](#debugging-revalidation-on-vercel)

---

## Architecture Overview

This project uses **Payload CMS** as a headless CMS with **Next.js 16** (App Router) for the frontend. Both run in the same process — Payload operates as a local API, meaning data fetching uses `payload.find()` / `payload.findGlobal()` instead of HTTP `fetch()`.

Pages are statically generated at build time via `generateStaticParams()` and served from Vercel's edge CDN. When content changes in Payload, we need to tell Next.js to regenerate the affected pages.

```
┌─────────────┐     afterChange hook     ┌──────────────────┐
│  Payload CMS │ ──────────────────────► │  revalidatePath() │
│  (edit page) │                         │  (Next.js cache)  │
└─────────────┘                         └────────┬─────────┘
                                                  │
                                                  ▼
                                        ┌──────────────────┐
                                        │  Next request to  │
                                        │  that path gets   │
                                        │  fresh SSR render │
                                        └──────────────────┘
```

---

## The Problem We Solved

After deploying to Vercel, editing content in Payload CMS did not reflect on the live site. Three compounding issues caused this:

### 1. Fully Static Pages (No ISR)

Exporting `generateStaticParams()` without a `revalidate` config makes pages **fully static** — they're generated once at build time and never refreshed. Even if revalidation was triggered server-side, the CDN-cached static HTML was never purged.

```tsx
// ❌ Before: pages were pure SSG, never refreshed
export async function generateStaticParams() {
  /* ... */
}

// ✅ After: pages use ISR with a 60s fallback + on-demand revalidation
export const revalidate = 60;
export async function generateStaticParams() {
  /* ... */
}
```

### 2. `revalidateTag()` With No Matching Consumers

The old hook called `revalidateTag("content")`, but **no data fetch was tagged with `"content"`**. Since we use Payload's local API (`payload.find()`) rather than the HTTP `fetch()` API, there's no way to attach `next: { tags: ["content"] }`. The tag invalidation succeeded technically but invalidated nothing.

```ts
// ❌ Before: tag "content" existed nowhere in any fetch call
revalidateTag("content", { expire: 60 * 60 * 24 * 7 });

// ✅ After: use revalidatePath which purges the route's entire cache
revalidatePath("/about");
```

> **Note:** `revalidateTag` also only accepts a single string argument. The second `{ expire }` object was silently ignored.

### 3. No Hook on the `pages` Collection

The `afterChange` hook only existed on **globals** (header, footer, site-settings). The `pages` collection — where all block content lives — had no hook at all. Editing a page's blocks never triggered any cache invalidation.

---

## How Revalidation Works Now

### For Pages (Collections)

When a page document is created or updated in Payload:

1. The `revalidatePageHook` fires via `afterChange`
2. It derives the URL path from the page's `slug` field (`"home"` → `"/"`, `"about"` → `"/about"`)
3. It calls `revalidatePath(pagePath)` to purge that specific route from the ISR cache
4. The next visitor to that URL gets a freshly server-rendered page

### For Globals (Header, Footer, Site Settings)

When a global is updated:

1. The `revalidateGlobalHook` fires via `afterChange`
2. It calls `revalidatePath("/", "layout")` which purges the **layout cache for the entire site**
3. Since globals are fetched in the shared layout component, all pages re-render with the updated global data

### Fallback Revalidation

Even without a CMS edit, `export const revalidate = 60` ensures pages are refreshed at most every 60 seconds. This acts as a safety net.

---

## Key Files

| File                                                                                                  | Purpose                                                                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`src/payload/globals/revalidateHook.ts`](../src/payload/globals/revalidateHook.ts)                   | Contains both `revalidateGlobalHook` and `revalidatePageHook`             |
| [`src/payload/collections/Pages.ts`](../src/payload/collections/Pages.ts)                             | Pages collection with `afterChange: [revalidatePageHook]`                 |
| [`src/payload/globals/Header.ts`](../src/payload/globals/Header.ts)                                   | Header global with `afterChange: [revalidateGlobalHook("header")]`        |
| [`src/payload/globals/Footer.ts`](../src/payload/globals/Footer.ts)                                   | Footer global with `afterChange: [revalidateGlobalHook("footer")]`        |
| [`src/payload/globals/SiteSettings.ts`](../src/payload/globals/SiteSettings.ts)                       | Site settings with `afterChange: [revalidateGlobalHook("site-settings")]` |
| [`src/app/(main)/(landing)/[[...slug]]/page.tsx`](<../src/app/(main)/(landing)/[[...slug]]/page.tsx>) | Dynamic page route with `export const revalidate = 60`                    |

---

## Adding Revalidation to a New Collection

When you add a new Payload collection that powers frontend pages:

### Step 1: Import the hook

```ts
import { revalidatePageHook } from "../globals/revalidateHook";
```

### Step 2: Attach it to your collection

```ts
export const Posts: CollectionConfig = {
  slug: "posts",
  hooks: {
    afterChange: [revalidatePageHook],
  },
  // ... fields
};
```

### Step 3: Ensure your route has ISR enabled

In the corresponding `page.tsx`:

```tsx
export const revalidate = 60; // or another interval
```

> **Important:** The `revalidatePageHook` derives the path from `doc.slug`. If your collection uses a different URL pattern (e.g., `/blog/[slug]`), create a custom hook:

```ts
import { CollectionAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidatePostHook: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (process.env.SEEDING === "true") return doc;

  try {
    revalidatePath(`/blog/${doc.slug}`);
    req.payload.logger.info(`Revalidated /blog/${doc.slug}`);
  } catch (err) {
    req.payload.logger.error(`Error revalidating post: ${err}`);
  }
  return doc;
};
```

---

## Adding Revalidation to a New Global

```ts
import { revalidateGlobalHook } from "@/payload/globals/revalidateHook";

export const MyGlobal: GlobalConfig = {
  slug: "my-global",
  hooks: {
    afterChange: [revalidateGlobalHook("my-global")],
  },
  // ... fields
};
```

This will revalidate the entire site layout when the global is updated, since globals typically affect all pages.

---

## Common Pitfalls

### ❌ Using `revalidateTag()` with Payload's local API

`revalidateTag()` only works when your data fetching uses either:

- `fetch()` with `next: { tags: ["my-tag"] }`
- `unstable_cache()` with `tags: ["my-tag"]`
- `'use cache'` + `cacheTag("my-tag")` (Cache Components model)

Since Payload's local API (`payload.find()`) doesn't go through `fetch()`, **tags are never set** and `revalidateTag()` has nothing to invalidate. Use `revalidatePath()` instead.

### ❌ Forgetting `export const revalidate` on SSG routes

If a route exports `generateStaticParams()` but no `revalidate`, the pages are fully static. `revalidatePath()` will have no effect because the pages aren't using ISR.

### ❌ Calling `revalidateTag()` with extra arguments

```ts
// ❌ Wrong — second argument is silently ignored (previous caching model)
revalidateTag("content", { expire: 60 * 60 * 24 * 7 });

// ✅ Correct (previous caching model)
revalidateTag("content");

// ✅ Correct (Cache Components model, Next.js 16+)
revalidateTag("content", "max");
```

### ❌ Not handling the `SEEDING` flag

During database seeding, revalidation calls should be skipped to avoid unnecessary cache purges. Always check:

```ts
if (process.env.SEEDING === "true") return doc;
```

---

## Debugging Revalidation on Vercel

### 1. Check Vercel Function Logs

After editing content in Payload, look for log messages like:

```
Successfully revalidated path "/about" for page "About"
Successfully revalidated layout for global "header"
```

If you see these, the hook fired correctly.

### 2. Verify ISR is active

In the Vercel dashboard → Deployments → Build output, check that your routes show as **ISR** (not Static). They should display the revalidation interval.

### 3. Check for errors

Look for `Error revalidating...` messages in the logs. Common causes:

- The page path doesn't match an actual route
- The hook threw before reaching `revalidatePath()`

### 4. Hard refresh vs soft navigation

After revalidation, the CDN serves fresh content on the **next request**. If you're testing:

- Use an incognito window or hard refresh (`Ctrl+Shift+R`)
- Client-side navigation (Next.js `<Link>`) may use a cached RSC payload — do a full page load to verify

### 5. Force a full revalidation

If needed, you can trigger a revalidation manually via a Route Handler:

```ts
// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { path, secret } = await request.json();

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidatePath(path);
  return Response.json({ revalidated: true, path });
}
```
