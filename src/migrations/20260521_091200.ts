import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_problem_section_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_problem_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'The Problem',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_problem_section_problems" ADD CONSTRAINT "pages_blocks_problem_section_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_problem_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_problem_section" ADD CONSTRAINT "pages_blocks_problem_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_problem_section_problems_order_idx" ON "pages_blocks_problem_section_problems" USING btree ("_order");
  CREATE INDEX "pages_blocks_problem_section_problems_parent_id_idx" ON "pages_blocks_problem_section_problems" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_problem_section_order_idx" ON "pages_blocks_problem_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_problem_section_parent_id_idx" ON "pages_blocks_problem_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_problem_section_path_idx" ON "pages_blocks_problem_section" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_problem_section_problems" CASCADE;
  DROP TABLE "pages_blocks_problem_section" CASCADE;`);
}
