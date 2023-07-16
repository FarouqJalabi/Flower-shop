/*
  Warnings:

  - The primary key for the `Flower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FlowerPreviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_FlowerToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flower" DROP CONSTRAINT "Flower_flowerPreviewId_fkey";

-- DropForeignKey
ALTER TABLE "_FlowerToUser" DROP CONSTRAINT "_FlowerToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FlowerToUser" DROP CONSTRAINT "_FlowerToUser_B_fkey";

-- AlterTable
ALTER TABLE "Flower" DROP CONSTRAINT "Flower_pkey",
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "flowerPreviewId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Flower_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Flower_id_seq";

-- AlterTable
ALTER TABLE "FlowerPreviews" DROP CONSTRAINT "FlowerPreviews_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FlowerPreviews_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FlowerPreviews_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "_FlowerToUser";

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_flowerPreviewId_fkey" FOREIGN KEY ("flowerPreviewId") REFERENCES "FlowerPreviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
