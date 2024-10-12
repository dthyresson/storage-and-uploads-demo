/*
  Warnings:

  - You are about to drop the `Demo5Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Demo6Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Demo5Image";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Demo6Image";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "demo" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "size" INTEGER
);
