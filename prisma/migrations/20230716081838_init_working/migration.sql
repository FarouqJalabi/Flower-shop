-- AlterTable
ALTER TABLE "Flower" ADD COLUMN     "flowerPreviewsId" INTEGER,
ADD COLUMN     "imgUrl" TEXT;

-- CreateTable
CREATE TABLE "flowerPreviews" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "underTitle" TEXT,

    CONSTRAINT "flowerPreviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_flowerPreviewsId_fkey" FOREIGN KEY ("flowerPreviewsId") REFERENCES "flowerPreviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
