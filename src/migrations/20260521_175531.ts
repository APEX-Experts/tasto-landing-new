import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_about_cta" ADD COLUMN "primary_c_t_a_label" varchar DEFAULT 'Request a Demo' NOT NULL;
  ALTER TABLE "pages_blocks_about_cta" ADD COLUMN "primary_c_t_a_href" varchar DEFAULT '/contact' NOT NULL;
  ALTER TABLE "pages_blocks_about_cta" ADD COLUMN "secondary_c_t_a_label" varchar DEFAULT 'Contact Us';
  ALTER TABLE "pages_blocks_about_cta" ADD COLUMN "secondary_c_t_a_href" varchar DEFAULT '/contact';
  ALTER TABLE "pages_blocks_about_cta" DROP COLUMN "primary_c_t_a";
  ALTER TABLE "pages_blocks_about_cta" DROP COLUMN "secondary_c_t_a";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_about_cta" ADD COLUMN "primary_c_t_a" varchar DEFAULT 'Request a Demo' NOT NULL;
  ALTER TABLE "pages_blocks_about_cta" ADD COLUMN "secondary_c_t_a" varchar DEFAULT 'Contact Us';
  ALTER TABLE "pages_blocks_about_cta" DROP COLUMN "primary_c_t_a_label";
  ALTER TABLE "pages_blocks_about_cta" DROP COLUMN "primary_c_t_a_href";
  ALTER TABLE "pages_blocks_about_cta" DROP COLUMN "secondary_c_t_a_label";
  ALTER TABLE "pages_blocks_about_cta" DROP COLUMN "secondary_c_t_a_href";`);
}
