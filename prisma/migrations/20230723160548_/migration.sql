/*
  Warnings:

  - The primary key for the `Tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tag]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_FlowerToTags" DROP CONSTRAINT "_FlowerToTags_B_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tags_pkey" PRIMARY KEY ("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tag_key" ON "Tags"("tag");

-- AddForeignKey
ALTER TABLE "_FlowerToTags" ADD CONSTRAINT "_FlowerToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("tag") ON DELETE CASCADE ON UPDATE CASCADE;
