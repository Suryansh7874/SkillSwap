/*
  Warnings:

  - The `proficiency` column on the `UserSkill` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Proficiency" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "UserSkill" DROP COLUMN "proficiency",
ADD COLUMN     "proficiency" "Proficiency";
