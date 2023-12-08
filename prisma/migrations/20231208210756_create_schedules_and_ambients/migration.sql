-- CreateTable
CREATE TABLE "Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "equipment" TEXT,
    "description" TEXT,
    "dateEvent" DATETIME NOT NULL,
    "dateMinutesInitial" DATETIME NOT NULL,
    "dateMinutesEnd" DATETIME NOT NULL,
    "ambientsId" TEXT NOT NULL,
    CONSTRAINT "Schedules_ambientsId_fkey" FOREIGN KEY ("ambientsId") REFERENCES "Ambients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ambients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);
