/*
  Warnings:

  - You are about to drop the column `flowerPreviewsId` on the `Flower` table. All the data in the column will be lost.
  - You are about to drop the `flowerPreviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flower" DROP CONSTRAINT "Flower_flowerPreviewsId_fkey";

-- AlterTable
ALTER TABLE "Flower" DROP COLUMN "flowerPreviewsId",
ADD COLUMN     "flowerPreviewId" INTEGER;

-- DropTable
DROP TABLE "flowerPreviews";

-- CreateTable
CREATE TABLE "FlowerPreviews" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "underTitle" TEXT,

    CONSTRAINT "FlowerPreviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_flowerPreviewId_fkey" FOREIGN KEY ("flowerPreviewId") REFERENCES "FlowerPreviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
