/*
  Warnings:

  - You are about to drop the column `content` on the `Flower` table. All the data in the column will be lost.
  - Added the required column `price` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flower" DROP COLUMN "content",
ADD COLUMN     "alt" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "salePrice" DOUBLE PRECISION;
