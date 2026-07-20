/*
  Warnings:

  - You are about to alter the column `phoneNumber` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "phoneNumber" SET DATA TYPE INTEGER;
