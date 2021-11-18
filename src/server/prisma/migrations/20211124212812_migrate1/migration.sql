-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "contentTitle" TEXT NOT NULL,
    "contentText" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
