CREATE TABLE "attribute_groups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" jsonb NOT NULL,
	"sequence" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attribute_options" (
	"id" uuid PRIMARY KEY NOT NULL,
	"attribute_id" uuid NOT NULL,
	"group_id" uuid NOT NULL,
	"name" jsonb NOT NULL,
	"sequance" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attributes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"group_id" uuid NOT NULL,
	"name" jsonb NOT NULL,
	"sequence" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"gender" "gender" DEFAULT 'uniseks' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prices" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_variation_id" uuid NOT NULL,
	"price_uzs" numeric(10, 3) NOT NULL,
	"price_usd" numeric(10, 3) NOT NULL,
	"discount_percentage" integer,
	"final_price_uzs" numeric(10, 3),
	"final_price_usd" numeric(10, 3),
	"created_at" timestamp (0) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"images_path" "bytea" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_variatino_attribute_options" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_variation_id" uuid NOT NULL,
	"attribute_option_id" uuid NOT NULL,
	"product_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_variations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"count" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"brand_id" uuid NOT NULL,
	"name" jsonb NOT NULL,
	"description" jsonb NOT NULL,
	"gender" "gender" DEFAULT 'uniseks' NOT NULL,
	"poizon_url" varchar(255),
	"video_path" varchar(255),
	"slug" varchar(255) NOT NULL,
	"top_until" date NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"telegram_id" varchar(255) NOT NULL,
	"phone" integer NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attribute_options" ADD CONSTRAINT "attribute_options_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attribute_options" ADD CONSTRAINT "attribute_options_group_id_attribute_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."attribute_groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_group_id_attribute_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."attribute_groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prices" ADD CONSTRAINT "prices_product_variation_id_product_variations_id_fk" FOREIGN KEY ("product_variation_id") REFERENCES "public"."product_variations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variatino_attribute_options" ADD CONSTRAINT "product_variatino_attribute_options_product_variation_id_product_variations_id_fk" FOREIGN KEY ("product_variation_id") REFERENCES "public"."product_variations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variatino_attribute_options" ADD CONSTRAINT "product_variatino_attribute_options_attribute_option_id_attribute_options_id_fk" FOREIGN KEY ("attribute_option_id") REFERENCES "public"."attribute_options"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variatino_attribute_options" ADD CONSTRAINT "product_variatino_attribute_options_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variations" ADD CONSTRAINT "product_variations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;