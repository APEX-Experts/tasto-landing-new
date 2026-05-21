import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_about_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Operational Philosophy',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_problem_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_problem" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'The Operational Gap',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_philosophy_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_philosophy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our Perspective',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Strategic Discussion',
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"primary_c_t_a" varchar DEFAULT 'Request a Demo' NOT NULL,
  	"secondary_c_t_a" varchar DEFAULT 'Contact Us',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_about_hero" ADD CONSTRAINT "pages_blocks_about_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_problem_problems" ADD CONSTRAINT "pages_blocks_about_problem_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_problem"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_problem" ADD CONSTRAINT "pages_blocks_about_problem_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_philosophy_principles" ADD CONSTRAINT "pages_blocks_about_philosophy_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_philosophy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_philosophy" ADD CONSTRAINT "pages_blocks_about_philosophy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_cta" ADD CONSTRAINT "pages_blocks_about_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_hero_order_idx" ON "pages_blocks_about_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_parent_id_idx" ON "pages_blocks_about_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_hero_path_idx" ON "pages_blocks_about_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_problem_problems_order_idx" ON "pages_blocks_about_problem_problems" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_problem_problems_parent_id_idx" ON "pages_blocks_about_problem_problems" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_problem_order_idx" ON "pages_blocks_about_problem" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_problem_parent_id_idx" ON "pages_blocks_about_problem" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_problem_path_idx" ON "pages_blocks_about_problem" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_philosophy_principles_order_idx" ON "pages_blocks_about_philosophy_principles" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_philosophy_principles_parent_id_idx" ON "pages_blocks_about_philosophy_principles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_philosophy_order_idx" ON "pages_blocks_about_philosophy" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_philosophy_parent_id_idx" ON "pages_blocks_about_philosophy" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_philosophy_path_idx" ON "pages_blocks_about_philosophy" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_cta_order_idx" ON "pages_blocks_about_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_cta_parent_id_idx" ON "pages_blocks_about_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_cta_path_idx" ON "pages_blocks_about_cta" USING btree ("_path");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_hero" CASCADE;
  DROP TABLE "pages_blocks_about_problem_problems" CASCADE;
  DROP TABLE "pages_blocks_about_problem" CASCADE;
  DROP TABLE "pages_blocks_about_philosophy_principles" CASCADE;
  DROP TABLE "pages_blocks_about_philosophy" CASCADE;
  DROP TABLE "pages_blocks_about_cta" CASCADE;`);
}
