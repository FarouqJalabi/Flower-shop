/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Flower` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `FlowerPreviews` will be added. If there are existing duplicate values, this will fail.
  - Made the column `underTitle` on table `FlowerPreviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FlowerPreviews" ADD COLUMN     "order" SERIAL NOT NULL,
ALTER COLUMN "underTitle" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Flower_title_key" ON "Flower"("title");

-- CreateIndex
CREATE UNIQUE INDEX "FlowerPreviews_title_key" ON "FlowerPreviews"("title");
