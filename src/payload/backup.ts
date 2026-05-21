import "dotenv/config";
import fs from "fs";
import https from "https";
import http from "http";
import path from "path";
import { getPayload } from "payload";
import { fileURLToPath } from "url";
import config from "../payload.config.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BACKUP_DIR = path.resolve(__dirname, "../../backup");
const MEDIA_DIR = path.join(BACKUP_DIR, "media");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`  ✔ Written: ${path.relative(process.cwd(), filePath)}`);
}

/**
 * Downloads a file from a URL (http or https) and saves it to `dest`.
 * Returns true on success, false on failure.
 */
async function downloadFile(url: string, dest: string): Promise<boolean> {
  return new Promise((resolve) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);

    protocol
      .get(url, (res) => {
        // Follow redirects (up to 5 hops)
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          file.close();
          fs.unlinkSync(dest);
          downloadFile(res.headers.location, dest).then(resolve);
          return;
        }

        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          console.warn(`    ⚠ HTTP ${res.statusCode} for ${url}`);
          resolve(false);
          return;
        }

        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        console.warn(`    ⚠ Download error for ${url}: ${err.message}`);
        resolve(false);
      });
  });
}

/**
 * Fetches ALL documents in a collection using Payload's local API (bypasses HTTP).
 */
async function fetchAllDocs(payload: Awaited<ReturnType<typeof getPayload>>, collection: string) {
  const limit = 100;
  let page = 1;
  const allDocs: unknown[] = [];

  while (true) {
    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: collection as any,
      limit,
      page,
      depth: 10, // expand all relationships
      overrideAccess: true,
    });

    allDocs.push(...result.docs);

    if (!result.hasNextPage) break;
    page++;
  }

  return allDocs;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function backup() {
  console.log("=".repeat(60));
  console.log("  Payload CMS — Full Backup");
  console.log("=".repeat(60));

  ensureDir(BACKUP_DIR);
  ensureDir(MEDIA_DIR);

  const payload = await getPayload({ config });

  // ── 1. Collections ────────────────────────────────────────────────────────
  const collections = ["users", "media", "pages", "posts"] as const;

  for (const col of collections) {
    console.log(`\n[Collection] ${col}`);
    const docs = await fetchAllDocs(payload, col);
    console.log(`  Found ${docs.length} document(s).`);
    writeJson(path.join(BACKUP_DIR, `${col}.json`), docs);
  }

  // ── 2. Globals ────────────────────────────────────────────────────────────
  const globals = ["header", "footer", "site-settings"] as const;

  console.log("\n[Globals]");
  const globalsData: Record<string, unknown> = {};

  for (const slug of globals) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await payload.findGlobal({ slug: slug as any, depth: 10, overrideAccess: true });
    globalsData[slug] = data;
    console.log(`  ✔ Fetched global: ${slug}`);
  }

  writeJson(path.join(BACKUP_DIR, "globals.json"), globalsData);

  // ── 3. Download media files ───────────────────────────────────────────────
  console.log("\n[Media Downloads]");

  const mediaDocsRaw = fs.readFileSync(path.join(BACKUP_DIR, "media.json"), "utf-8");
  const mediaDocs = JSON.parse(mediaDocsRaw) as Array<{
    id: string | number;
    filename?: string;
    url?: string;
    sizes?: Record<string, { url?: string; filename?: string }>;
  }>;

  // Derive the server base URL from the DATABASE_URI hostname or fall back to localhost
  const serverBase = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  for (const doc of mediaDocs) {
    if (!doc.filename) continue;

    // Original file
    const originalUrl = doc.url || `${serverBase}/media/${doc.filename}`;
    const originalDest = path.join(MEDIA_DIR, doc.filename);

    if (!fs.existsSync(originalDest)) {
      process.stdout.write(`  Downloading ${doc.filename} ... `);
      const ok = await downloadFile(originalUrl, originalDest);
      console.log(ok ? "✔" : "✘");
    } else {
      console.log(`  Skipping ${doc.filename} (already exists).`);
    }

    // Size variants
    if (doc.sizes) {
      for (const [sizeName, sizeData] of Object.entries(doc.sizes)) {
        if (!sizeData?.filename) continue;
        const sizeUrl = sizeData.url || `${serverBase}/media/${sizeData.filename}`;
        const sizeDest = path.join(MEDIA_DIR, sizeData.filename);

        if (!fs.existsSync(sizeDest)) {
          process.stdout.write(`  Downloading ${sizeName}/${sizeData.filename} ... `);
          const ok = await downloadFile(sizeUrl, sizeDest);
          console.log(ok ? "✔" : "✘");
        }
      }
    }
  }

  // ── 4. Write manifest ─────────────────────────────────────────────────────
  const manifest = {
    createdAt: new Date().toISOString(),
    collections: Object.fromEntries(
      collections.map((c) => [
        c,
        JSON.parse(fs.readFileSync(path.join(BACKUP_DIR, `${c}.json`), "utf-8")).length,
      ]),
    ),
    globals: globals.reduce(
      (acc, slug) => ({ ...acc, [slug]: true }),
      {} as Record<string, boolean>,
    ),
    mediaFiles: fs.readdirSync(MEDIA_DIR).length,
  };

  writeJson(path.join(BACKUP_DIR, "manifest.json"), manifest);

  console.log("\n" + "=".repeat(60));
  console.log("  Backup complete →", BACKUP_DIR);
  console.log("=".repeat(60));

  process.exit(0);
}

backup().catch((err) => {
  console.error("\nBackup failed:", err);
  process.exit(1);
});
