/*
  Warnings:

  - Added the required column `segment` to the `ClientSegment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientSegment" ADD COLUMN     "segment" TEXT NOT NULL;
