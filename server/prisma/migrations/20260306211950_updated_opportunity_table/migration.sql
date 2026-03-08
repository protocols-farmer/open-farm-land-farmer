/*
  Warnings:

  - You are about to drop the column `imagePublicId` on the `opportunities` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `opportunities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "opportunities" DROP COLUMN "imagePublicId",
DROP COLUMN "imageUrl",
ADD COLUMN     "companyLogoPublicId" TEXT;
