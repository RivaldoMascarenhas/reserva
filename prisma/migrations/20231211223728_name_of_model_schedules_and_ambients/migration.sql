/*
  Warnings:

  - You are about to drop the `Ambients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ambients";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Schedules";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "equipment" TEXT,
    "description" TEXT,
    "dateEvent" DATETIME NOT NULL,
    "dateMinutesStart" DATETIME NOT NULL,
    "dateMinutesEnd" DATETIME NOT NULL,
    "ambientsId" TEXT NOT NULL,
    CONSTRAINT "schedules_ambientsId_fkey" FOREIGN KEY ("ambientsId") REFERENCES "ambients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ambients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ambients_title_key" ON "ambients"("title");
