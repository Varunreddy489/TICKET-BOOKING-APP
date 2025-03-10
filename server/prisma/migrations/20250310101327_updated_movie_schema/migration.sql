/*
  Warnings:

  - The `seatNumber` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `totalCost` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "totalCost" TEXT NOT NULL,
DROP COLUMN "seatNumber",
ADD COLUMN     "seatNumber" TEXT[];
