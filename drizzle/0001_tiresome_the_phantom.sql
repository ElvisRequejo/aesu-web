DROP TABLE "aesu-web_account";--> statement-breakpoint
DROP TABLE "aesu-web_session";--> statement-breakpoint
DROP TABLE "aesu-web_verification_token";--> statement-breakpoint
ALTER TABLE "aesu-web_user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "aesu-web_user" ADD COLUMN "username" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "aesu-web_user" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "aesu-web_user" ADD COLUMN "role" varchar(20) DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "aesu-web_user" ADD COLUMN "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "aesu-web_user" ADD COLUMN "updated_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "aesu-web_user" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "aesu-web_user" DROP COLUMN IF EXISTS "email_verified";--> statement-breakpoint
ALTER TABLE "aesu-web_user" ADD CONSTRAINT "aesu-web_user_username_unique" UNIQUE("username");