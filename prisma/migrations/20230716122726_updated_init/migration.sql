/*
  Warnings:

  - You are about to drop the column `authorId` on the `Flower` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flower" DROP CONSTRAINT "Flower_authorId_fkey";

-- AlterTable
ALTER TABLE "Flower" DROP COLUMN "authorId";

-- CreateTable
CREATE TABLE "_FlowerToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FlowerToUser_AB_unique" ON "_FlowerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FlowerToUser_B_index" ON "_FlowerToUser"("B");

-- AddForeignKey
ALTER TABLE "_FlowerToUser" ADD CONSTRAINT "_FlowerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlowerToUser" ADD CONSTRAINT "_FlowerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
