-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('BUG', 'VULNERABILITY');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'TRIAGED', 'FIXED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "issue_reports" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reproduction_steps" TEXT,
    "type" "ReportType" NOT NULL,
    "severity" "Severity" NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
    "attachments" JSONB DEFAULT '[]',
    "admin_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reporter_id" TEXT NOT NULL,
    "resolved_by_id" TEXT,

    CONSTRAINT "issue_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "issue_reports_reporter_id_idx" ON "issue_reports"("reporter_id");

-- CreateIndex
CREATE INDEX "issue_reports_status_idx" ON "issue_reports"("status");

-- CreateIndex
CREATE INDEX "issue_reports_type_idx" ON "issue_reports"("type");

-- AddForeignKey
ALTER TABLE "issue_reports" ADD CONSTRAINT "issue_reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_reports" ADD CONSTRAINT "issue_reports_resolved_by_id_fkey" FOREIGN KEY ("resolved_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
