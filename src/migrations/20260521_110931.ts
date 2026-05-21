import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_strategic_trust_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_strategic_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Built for Scale',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_features_features" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "eyebrow" varchar DEFAULT 'Transform Operations';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "primary_button_label" varchar DEFAULT 'Request a Demo' NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "primary_button_link" varchar DEFAULT '/contact' NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "secondary_button_label" varchar DEFAULT 'Explore the Platform';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "secondary_button_link" varchar DEFAULT '/platform';
  ALTER TABLE "pages_blocks_strategic_trust_metrics" ADD CONSTRAINT "pages_blocks_strategic_trust_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strategic_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_strategic_trust" ADD CONSTRAINT "pages_blocks_strategic_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_strategic_trust_metrics_order_idx" ON "pages_blocks_strategic_trust_metrics" USING btree ("_order");
  CREATE INDEX "pages_blocks_strategic_trust_metrics_parent_id_idx" ON "pages_blocks_strategic_trust_metrics" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_strategic_trust_order_idx" ON "pages_blocks_strategic_trust" USING btree ("_order");
  CREATE INDEX "pages_blocks_strategic_trust_parent_id_idx" ON "pages_blocks_strategic_trust" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_strategic_trust_path_idx" ON "pages_blocks_strategic_trust" USING btree ("_path");
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "button_label";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "button_link";
  DROP TYPE "public"."enum_pages_blocks_features_features_icon";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_features_features_icon" AS ENUM('zap', 'shield', 'rocket', 'star', 'heart', 'settings', 'check', 'users', 'globe', 'code', 'bar-chart', 'layers', 'layout', 'message-square', 'mouse-pointer', 'phone', 'search', 'send', 'share', 'shopping-cart', 'smile', 'target', 'thumbs-up', 'trending-up', 'video');
  CREATE TABLE "pages_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_features_features_icon" DEFAULT 'zap',
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_strategic_trust_metrics" CASCADE;
  DROP TABLE "pages_blocks_strategic_trust" CASCADE;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "text" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "button_label" varchar NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "button_link" varchar NOT NULL;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_features_features_order_idx" ON "pages_blocks_features_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_features_parent_id_idx" ON "pages_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "primary_button_label";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "primary_button_link";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "secondary_button_label";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "secondary_button_link";`);
}
