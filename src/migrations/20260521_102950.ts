import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_operational_governance_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"metric" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_operational_governance" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Executive Visibility',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"side_quote" varchar NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_operational_governance_capabilities" ADD CONSTRAINT "pages_blocks_operational_governance_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_operational_governance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_operational_governance" ADD CONSTRAINT "pages_blocks_operational_governance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_operational_governance_capabilities_order_idx" ON "pages_blocks_operational_governance_capabilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_operational_governance_capabilities_parent_id_idx" ON "pages_blocks_operational_governance_capabilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_operational_governance_order_idx" ON "pages_blocks_operational_governance" USING btree ("_order");
  CREATE INDEX "pages_blocks_operational_governance_parent_id_idx" ON "pages_blocks_operational_governance" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_operational_governance_path_idx" ON "pages_blocks_operational_governance" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_operational_governance_capabilities" CASCADE;
  DROP TABLE "pages_blocks_operational_governance" CASCADE;`);
}
