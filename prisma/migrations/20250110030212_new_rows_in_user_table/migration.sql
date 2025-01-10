-- AlterTable
ALTER TABLE "User" ADD COLUMN     "codeVerification" INTEGER,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
