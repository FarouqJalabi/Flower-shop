/*
  Warnings:

  - You are about to drop the `_FlowerToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "PreviewColors" AS ENUM ('ORANGE', 'RED', 'GREEN', 'BLUE', 'PURPLE', 'PINK');

-- DropForeignKey
ALTER TABLE "_FlowerToUser" DROP CONSTRAINT "_FlowerToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FlowerToUser" DROP CONSTRAINT "_FlowerToUser_B_fkey";

-- AlterTable
ALTER TABLE "Flower" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FlowerPreviews" ADD COLUMN     "color" "PreviewColors";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "AuthProvider" "AuthProvider" NOT NULL DEFAULT 'EMAIL';

-- DropTable
DROP TABLE "_FlowerToUser";

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_flowersLiked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_shoppingList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FlowerToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_flowersLiked_AB_unique" ON "_flowersLiked"("A", "B");

-- CreateIndex
CREATE INDEX "_flowersLiked_B_index" ON "_flowersLiked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_shoppingList_AB_unique" ON "_shoppingList"("A", "B");

-- CreateIndex
CREATE INDEX "_shoppingList_B_index" ON "_shoppingList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FlowerToTags_AB_unique" ON "_FlowerToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_FlowerToTags_B_index" ON "_FlowerToTags"("B");

-- AddForeignKey
ALTER TABLE "_flowersLiked" ADD CONSTRAINT "_flowersLiked_A_fkey" FOREIGN KEY ("A") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_flowersLiked" ADD CONSTRAINT "_flowersLiked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_shoppingList" ADD CONSTRAINT "_shoppingList_A_fkey" FOREIGN KEY ("A") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_shoppingList" ADD CONSTRAINT "_shoppingList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlowerToTags" ADD CONSTRAINT "_FlowerToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlowerToTags" ADD CONSTRAINT "_FlowerToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
