import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_dashboard_metrics_icon" AS ENUM('Shield', 'Activity', 'Fingerprint', 'LockKeyhole', 'Lock', 'Key', 'Database', 'Server', 'Cpu', 'Zap', 'Globe', 'Settings', 'TrendingUp', 'Users', 'DollarSign', 'CheckCircle', 'AlertCircle', 'Info', 'Menu', 'Eye', 'Award', 'Briefcase', 'Cloud', 'Clock', 'Heart', 'Layers', 'Sparkles', 'Terminal');
  CREATE TYPE "public"."enum_pages_blocks_hero_dashboard_activity_icon" AS ENUM('Shield', 'Activity', 'Fingerprint', 'LockKeyhole', 'Lock', 'Key', 'Database', 'Server', 'Cpu', 'Zap', 'Globe', 'Settings', 'TrendingUp', 'Users', 'DollarSign', 'CheckCircle', 'AlertCircle', 'Info', 'Menu', 'Eye', 'Award', 'Briefcase', 'Cloud', 'Clock', 'Heart', 'Layers', 'Sparkles', 'Terminal');
  CREATE TYPE "public"."enum_pages_blocks_operational_governance_metrics_icon" AS ENUM('Shield', 'Activity', 'Fingerprint', 'LockKeyhole', 'Lock', 'Key', 'Database', 'Server', 'Cpu', 'Zap', 'Globe', 'Settings', 'TrendingUp', 'Users', 'DollarSign', 'CheckCircle', 'AlertCircle', 'Info', 'Menu', 'Eye', 'Award', 'Briefcase', 'Cloud', 'Clock', 'Heart', 'Layers', 'Sparkles', 'Terminal');
  CREATE TYPE "public"."enum_pages_blocks_operational_governance_network_status_icon" AS ENUM('Shield', 'Activity', 'Fingerprint', 'LockKeyhole', 'Lock', 'Key', 'Database', 'Server', 'Cpu', 'Zap', 'Globe', 'Settings', 'TrendingUp', 'Users', 'DollarSign', 'CheckCircle', 'AlertCircle', 'Info', 'Menu', 'Eye', 'Award', 'Briefcase', 'Cloud', 'Clock', 'Heart', 'Layers', 'Sparkles', 'Terminal');
  CREATE TABLE "pages_blocks_hero_dashboard_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"change" varchar NOT NULL,
  	"icon" "enum_pages_blocks_hero_dashboard_metrics_icon" DEFAULT 'Activity'
  );
  
  CREATE TABLE "pages_blocks_hero_dashboard_flow_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_operational_governance_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"icon" "enum_pages_blocks_operational_governance_metrics_icon" DEFAULT 'Activity'
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "dashboard_activity_icon" "enum_pages_blocks_hero_dashboard_activity_icon" DEFAULT 'Activity';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "dashboard_eyebrow" varchar DEFAULT 'Governance Overview';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "dashboard_title" varchar DEFAULT 'Operational Control Center';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "dashboard_status_text" varchar DEFAULT 'System Healthy';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "dashboard_flow_title" varchar DEFAULT 'Connected Business Flow';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "dashboard_flow_status_text" varchar DEFAULT 'Live Sync';
  ALTER TABLE "pages_blocks_operational_governance" ADD COLUMN "network_status_icon" "enum_pages_blocks_operational_governance_network_status_icon" DEFAULT 'Shield';
  ALTER TABLE "pages_blocks_operational_governance" ADD COLUMN "network_status_label" varchar DEFAULT 'Network Status';
  ALTER TABLE "pages_blocks_operational_governance" ADD COLUMN "network_status_text" varchar DEFAULT 'Centralized & Encrypted';
  ALTER TABLE "pages_blocks_operational_governance" ADD COLUMN "live_badge_text" varchar DEFAULT 'Live';
  ALTER TABLE "pages_blocks_hero_dashboard_metrics" ADD CONSTRAINT "pages_blocks_hero_dashboard_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_dashboard_flow_items" ADD CONSTRAINT "pages_blocks_hero_dashboard_flow_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_operational_governance_metrics" ADD CONSTRAINT "pages_blocks_operational_governance_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_operational_governance"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_dashboard_metrics_order_idx" ON "pages_blocks_hero_dashboard_metrics" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_dashboard_metrics_parent_id_idx" ON "pages_blocks_hero_dashboard_metrics" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_dashboard_flow_items_order_idx" ON "pages_blocks_hero_dashboard_flow_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_dashboard_flow_items_parent_id_idx" ON "pages_blocks_hero_dashboard_flow_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_operational_governance_metrics_order_idx" ON "pages_blocks_operational_governance_metrics" USING btree ("_order");
  CREATE INDEX "pages_blocks_operational_governance_metrics_parent_id_idx" ON "pages_blocks_operational_governance_metrics" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_hero_image_idx" ON "pages_blocks_hero" USING btree ("hero_image_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_dashboard_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_dashboard_flow_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_operational_governance_metrics" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_dashboard_metrics" CASCADE;
  DROP TABLE "pages_blocks_hero_dashboard_flow_items" CASCADE;
  DROP TABLE "pages_blocks_operational_governance_metrics" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_hero_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_hero_image_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "hero_image_id";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "dashboard_activity_icon";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "dashboard_eyebrow";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "dashboard_title";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "dashboard_status_text";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "dashboard_flow_title";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "dashboard_flow_status_text";
  ALTER TABLE "pages_blocks_operational_governance" DROP COLUMN "network_status_icon";
  ALTER TABLE "pages_blocks_operational_governance" DROP COLUMN "network_status_label";
  ALTER TABLE "pages_blocks_operational_governance" DROP COLUMN "network_status_text";
  ALTER TABLE "pages_blocks_operational_governance" DROP COLUMN "live_badge_text";
  DROP TYPE "public"."enum_pages_blocks_hero_dashboard_metrics_icon";
  DROP TYPE "public"."enum_pages_blocks_hero_dashboard_activity_icon";
  DROP TYPE "public"."enum_pages_blocks_operational_governance_metrics_icon";
  DROP TYPE "public"."enum_pages_blocks_operational_governance_network_status_icon";`);
}
