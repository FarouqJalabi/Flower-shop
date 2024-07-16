/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Flower` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Flower` table. All the data in the column will be lost.
  - Made the column `alt` on table `Flower` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Flower" DROP COLUMN "imgUrl",
DROP COLUMN "userId",
ALTER COLUMN "alt" SET NOT NULL;
