/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Ambients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ambients_title_key" ON "Ambients"("title");
