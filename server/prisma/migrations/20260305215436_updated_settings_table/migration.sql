-- AlterTable
ALTER TABLE "user_settings" ADD COLUMN     "emailUpdates" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "emailMarketing" SET DEFAULT true;
