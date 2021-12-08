/*
  Warnings:

  - You are about to drop the column `contentTitle` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "contentTitle",
ADD COLUMN     "clientsegmentId" INTEGER,
ADD COLUMN     "offerId" INTEGER,
ADD COLUMN     "seed" TEXT;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_clientsegmentId_fkey" FOREIGN KEY ("clientsegmentId") REFERENCES "ClientSegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
