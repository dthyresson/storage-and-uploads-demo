-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "demo" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "variant" TEXT NOT NULL DEFAULT 'original',
    "name" TEXT,
    "type" TEXT,
    "size" INTEGER
);
INSERT INTO "new_Attachment" ("createdAt", "demo", "id", "name", "reference", "size", "type", "updatedAt", "variant") SELECT "createdAt", "demo", "id", "name", "reference", "size", "type", "updatedAt", "variant" FROM "Attachment";
DROP TABLE "Attachment";
ALTER TABLE "new_Attachment" RENAME TO "Attachment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
