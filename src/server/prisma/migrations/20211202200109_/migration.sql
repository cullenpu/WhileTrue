/*
  Warnings:

  - You are about to drop the column `contentText` on the `Content` table. All the data in the column will be lost.
  - Added the required column `contentBody` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "contentText",
ADD COLUMN     "contentBody" TEXT NOT NULL,
ALTER COLUMN "contentTitle" DROP NOT NULL;
