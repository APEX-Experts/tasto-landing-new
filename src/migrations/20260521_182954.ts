import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_company_expertise_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_company_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Implementation Expertise',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"logo_svg" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_company_expertise_capabilities" ADD CONSTRAINT "pages_blocks_company_expertise_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_company_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_company_expertise" ADD CONSTRAINT "pages_blocks_company_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_company_expertise_capabilities_order_idx" ON "pages_blocks_company_expertise_capabilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_company_expertise_capabilities_parent_id_idx" ON "pages_blocks_company_expertise_capabilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_company_expertise_order_idx" ON "pages_blocks_company_expertise" USING btree ("_order");
  CREATE INDEX "pages_blocks_company_expertise_parent_id_idx" ON "pages_blocks_company_expertise" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_company_expertise_path_idx" ON "pages_blocks_company_expertise" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_company_expertise_capabilities" CASCADE;
  DROP TABLE "pages_blocks_company_expertise" CASCADE;`);
}
