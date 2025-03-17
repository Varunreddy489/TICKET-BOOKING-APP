/*
  Warnings:

  - You are about to drop the column `isBooked` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `seatNumber` on the `Ticket` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'BOOKED');

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "isBooked",
ADD COLUMN     "status" "SeatStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "seatNumber";

-- CreateIndex
CREATE INDEX "Seat_movieId_status_idx" ON "Seat"("movieId", "status");

-- CreateIndex
CREATE INDEX "Ticket_userId_idx" ON "Ticket"("userId");
