/*
  Warnings:

  - You are about to drop the column `dateMinutesInitial` on the `Schedules` table. All the data in the column will be lost.
  - Added the required column `dateMinutesStart` to the `Schedules` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "equipment" TEXT,
    "description" TEXT,
    "dateEvent" DATETIME NOT NULL,
    "dateMinutesStart" DATETIME NOT NULL,
    "dateMinutesEnd" DATETIME NOT NULL,
    "ambientsId" TEXT NOT NULL,
    CONSTRAINT "Schedules_ambientsId_fkey" FOREIGN KEY ("ambientsId") REFERENCES "Ambients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedules" ("ambientsId", "dateEvent", "dateMinutesEnd", "description", "equipment", "id", "title") SELECT "ambientsId", "dateEvent", "dateMinutesEnd", "description", "equipment", "id", "title" FROM "Schedules";
DROP TABLE "Schedules";
ALTER TABLE "new_Schedules" RENAME TO "Schedules";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
