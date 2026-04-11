/*
  Warnings:

  - You are about to drop the column `deactivatedAt` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_sanctions_userId_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deactivatedAt";

-- CreateIndex
CREATE INDEX "user_sanctions_userId_status_idx" ON "user_sanctions"("userId", "status");
