/*
  Warnings:

  - A unique constraint covering the columns `[codeVerification]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_codeVerification_key" ON "User"("codeVerification");
