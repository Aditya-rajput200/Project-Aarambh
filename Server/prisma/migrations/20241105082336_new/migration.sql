/*
  Warnings:

  - You are about to drop the `_ServiceBooking` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ServiceBooking" DROP CONSTRAINT "_ServiceBooking_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceBooking" DROP CONSTRAINT "_ServiceBooking_B_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ServiceBooking";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_id_key" ON "Booking"("id");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
