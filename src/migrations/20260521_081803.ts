import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_background_image_idx";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "subtext" SET NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "eyebrow" varchar DEFAULT 'Business Operating & Governance Platform';
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "background_image_id";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ALTER COLUMN "subtext" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "eyebrow";`);
}
