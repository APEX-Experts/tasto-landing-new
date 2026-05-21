import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_features_features_icon" AS ENUM('zap', 'shield', 'rocket', 'star', 'heart', 'settings', 'check', 'users', 'globe', 'code', 'bar-chart', 'layers', 'layout', 'message-square', 'mouse-pointer', 'phone', 'search', 'send', 'share', 'shopping-cart', 'smile', 'target', 'thumbs-up', 'trending-up', 'video');
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "icon" SET DEFAULT 'zap'::"public"."enum_pages_blocks_features_features_icon";
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_features_features_icon" USING "icon"::"public"."enum_pages_blocks_features_features_icon";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "icon" DROP DEFAULT;
  DROP TYPE "public"."enum_pages_blocks_features_features_icon";`);
}
