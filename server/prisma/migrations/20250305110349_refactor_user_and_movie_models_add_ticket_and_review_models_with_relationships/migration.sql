/*
  Warnings:

  - You are about to drop the column `image` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `isShowing` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Movie` table. All the data in the column will be lost.
  - The `genres` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `reservations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `showtimes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_showtimeId_fkey";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_userId_fkey";

-- DropForeignKey
ALTER TABLE "showtimes" DROP CONSTRAINT "showtimes_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "image",
DROP COLUMN "isShowing",
DROP COLUMN "title",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isMovieAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "movieSeatCapacity" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ticketCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "timings" TEXT[],
ALTER COLUMN "rating" SET DEFAULT 0.0,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "genres",
ADD COLUMN     "genres" TEXT[];

-- DropTable
DROP TABLE "reservations";

-- DropTable
DROP TABLE "showtimes";

-- DropEnum
DROP TYPE "Genre";

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "timing" TEXT NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "movieId" INTEGER NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "movieId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Movie_isMovieAvailable_idx" ON "Movie"("isMovieAvailable");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
