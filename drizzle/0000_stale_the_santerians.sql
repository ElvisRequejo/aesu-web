CREATE TABLE IF NOT EXISTS "aesu-web_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "aesu-web_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "aesu-web_event" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"title" varchar(255) NOT NULL,
	"subtitle" varchar(255),
	"description" text,
	"date" timestamp with time zone,
	"time" varchar(10),
	"location" varchar(255),
	"images" text[],
	"platform" varchar(100),
	"link" varchar(255),
	"results" text,
	"is_past" boolean DEFAULT false,
	"created_by" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "aesu-web_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "aesu-web_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "aesu-web_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "aesu-web_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "aesu-web_account" ADD CONSTRAINT "aesu-web_account_user_id_aesu-web_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."aesu-web_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "aesu-web_event" ADD CONSTRAINT "aesu-web_event_created_by_aesu-web_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."aesu-web_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "aesu-web_session" ADD CONSTRAINT "aesu-web_session_user_id_aesu-web_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."aesu-web_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "aesu-web_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_created_by_idx" ON "aesu-web_event" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_date_idx" ON "aesu-web_event" USING btree ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_is_past_idx" ON "aesu-web_event" USING btree ("is_past");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "aesu-web_session" USING btree ("user_id");