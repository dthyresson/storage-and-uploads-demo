/*
  Warnings:

  - Added the required column `updatedAt` to the `Demo5Image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Demo5Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Demo5Image" ("id", "name", "size", "type", "url") SELECT "id", "name", "size", "type", "url" FROM "Demo5Image";
DROP TABLE "Demo5Image";
ALTER TABLE "new_Demo5Image" RENAME TO "Demo5Image";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
