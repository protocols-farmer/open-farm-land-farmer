-- CreateTable
CREATE TABLE "SystemConfig" (
    "id" TEXT NOT NULL,
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "maintenanceMessage" TEXT DEFAULT 'Open farm land is currently undergoing a structural update. We''re making the soil richer for your projects and posts.',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);
