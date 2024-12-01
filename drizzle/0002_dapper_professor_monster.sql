CREATE TABLE IF NOT EXISTS "aesu-web_session" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "aesu-web_session" ADD CONSTRAINT "aesu-web_session_user_id_aesu-web_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."aesu-web_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
