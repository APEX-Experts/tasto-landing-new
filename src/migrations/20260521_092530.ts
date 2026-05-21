import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_platform_architecture_pillars_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_platform_architecture_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_platform_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'One Unified Platform',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_platform_architecture_pillars_modules" ADD CONSTRAINT "pages_blocks_platform_architecture_pillars_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_platform_architecture_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_platform_architecture_pillars" ADD CONSTRAINT "pages_blocks_platform_architecture_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_platform_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_platform_architecture" ADD CONSTRAINT "pages_blocks_platform_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_platform_architecture_pillars_modules_order_idx" ON "pages_blocks_platform_architecture_pillars_modules" USING btree ("_order");
  CREATE INDEX "pages_blocks_platform_architecture_pillars_modules_parent_id_idx" ON "pages_blocks_platform_architecture_pillars_modules" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_platform_architecture_pillars_order_idx" ON "pages_blocks_platform_architecture_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_platform_architecture_pillars_parent_id_idx" ON "pages_blocks_platform_architecture_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_platform_architecture_order_idx" ON "pages_blocks_platform_architecture" USING btree ("_order");
  CREATE INDEX "pages_blocks_platform_architecture_parent_id_idx" ON "pages_blocks_platform_architecture" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_platform_architecture_path_idx" ON "pages_blocks_platform_architecture" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_platform_architecture_pillars_modules" CASCADE;
  DROP TABLE "pages_blocks_platform_architecture_pillars" CASCADE;
  DROP TABLE "pages_blocks_platform_architecture" CASCADE;`);
}
