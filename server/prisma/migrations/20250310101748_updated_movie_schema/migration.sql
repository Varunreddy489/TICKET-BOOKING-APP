/*
  Warnings:

  - Changed the type of `totalCost` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "totalCost",
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL;
