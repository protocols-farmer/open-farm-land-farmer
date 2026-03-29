-- CreateEnum
CREATE TYPE "SanctionType" AS ENUM ('SUSPENSION', 'BAN');

-- CreateEnum
CREATE TYPE "SanctionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'APPEALED');

-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'SUSPENDED';

-- CreateTable
CREATE TABLE "user_sanctions" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "type" "SanctionType" NOT NULL,
    "status" "SanctionStatus" NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "adminId" TEXT,

    CONSTRAINT "user_sanctions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_sanctions_userId_idx" ON "user_sanctions"("userId");

-- CreateIndex
CREATE INDEX "user_sanctions_status_expiresAt_idx" ON "user_sanctions"("status", "expiresAt");

-- AddForeignKey
ALTER TABLE "user_sanctions" ADD CONSTRAINT "user_sanctions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sanctions" ADD CONSTRAINT "user_sanctions_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
