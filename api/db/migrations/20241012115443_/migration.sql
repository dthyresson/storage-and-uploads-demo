-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "demo" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "size" INTEGER
);
