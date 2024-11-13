/*
  Warnings:

  - You are about to drop the column `userId` on the `Worker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_userId_fkey";

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserToWorker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWorker_AB_unique" ON "_UserToWorker"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWorker_B_index" ON "_UserToWorker"("B");

-- AddForeignKey
ALTER TABLE "_UserToWorker" ADD CONSTRAINT "_UserToWorker_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorker" ADD CONSTRAINT "_UserToWorker_B_fkey" FOREIGN KEY ("B") REFERENCES "Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
