/*
  Warnings:

  - You are about to drop the column `professor` on the `ClassDetails` table. All the data in the column will be lost.
  - You are about to drop the column `syllabus` on the `ClassDetails` table. All the data in the column will be lost.
  - You are about to drop the column `tooltip` on the `ClassDetails` table. All the data in the column will be lost.
  - Added the required column `description` to the `ClassDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `syllabusPath` to the `ClassDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ClassDetails` DROP COLUMN `professor`,
    DROP COLUMN `syllabus`,
    DROP COLUMN `tooltip`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `syllabusPath` VARCHAR(191) NOT NULL;
