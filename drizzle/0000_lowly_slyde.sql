CREATE TYPE "public"."guarantee_status" AS ENUM('pending', 'held', 'returned', 'partially_returned');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('credit_card', 'debit_card', 'bank transfer', 'cash', 'PayPal', 'MercadoPago', 'other');--> statement-breakpoint
CREATE TYPE "public"."payment_order_status" AS ENUM('pending', 'confirmed', 'refunded', 'failed');--> statement-breakpoint
CREATE TYPE "public"."payment_type" AS ENUM('rental', 'guarantee', 'refund', 'adjustment');--> statement-breakpoint
CREATE TYPE "public"."rental_status" AS ENUM('draft', 'confirmed', 'in_process', 'submitted', 'returned', 'completed', 'overdue', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."reservation_type" AS ENUM('rental', 'maintenance', 'manual_lock', 'cleaning');--> statement-breakpoint
CREATE TYPE "public"."size_type" AS ENUM('child', 'adult');--> statement-breakpoint
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"url" varchar(500) NOT NULL,
	"url_thumbnail" varchar(500),
	"file_name" varchar(255),
	"short_description" varchar(500),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"color" varchar(7) NOT NULL,
	"activo" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_size" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	"precio" numeric(10, 2) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"available_quantity" integer DEFAULT 1 NOT NULL,
	"reserved_quantity" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "size" (
	"id" serial PRIMARY KEY NOT NULL,
	"height" "size_type" NOT NULL,
	"size" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"token" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_size" ADD CONSTRAINT "product_size_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_size" ADD CONSTRAINT "product_size_size_id_size_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."size"("id") ON DELETE cascade ON UPDATE no action;