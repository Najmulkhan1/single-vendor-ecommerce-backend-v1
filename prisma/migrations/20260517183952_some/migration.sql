/*
  Warnings:

  - You are about to drop the column `codeExpiredAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "codeExpiredAt",
DROP COLUMN "verificationCode";

-- CreateTable
CREATE TABLE "verificationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "verificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verificationCode_userId_key" ON "verificationCode"("userId");

-- AddForeignKey
ALTER TABLE "verificationCode" ADD CONSTRAINT "verificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
