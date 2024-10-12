-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "dueOn" DATETIME NOT NULL,
    "invoicedOn" DATETIME NOT NULL,
    "memo" TEXT NOT NULL,
    "pdf" TEXT NOT NULL
);
