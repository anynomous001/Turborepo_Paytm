/*
  Warnings:

  - The `status` column on the `MoneyRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `OnRampTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MoneyRequest" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Processing';

-- DropEnum
DROP TYPE "OnRampStatus";

-- DropEnum
DROP TYPE "RequestStatus";
