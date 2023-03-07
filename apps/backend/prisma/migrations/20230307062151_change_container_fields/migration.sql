-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Container" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dockerId" TEXT,
    "image" TEXT,
    "dockerName" TEXT NOT NULL,
    "dockerState" TEXT,
    "doesExist" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Container" ("createdAt", "dockerId", "dockerName", "dockerState", "doesExist", "id", "image", "updatedAt") SELECT "createdAt", "dockerId", "dockerName", "dockerState", "doesExist", "id", "image", "updatedAt" FROM "Container";
DROP TABLE "Container";
ALTER TABLE "new_Container" RENAME TO "Container";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
