-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PortForward" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hostPort" TEXT NOT NULL,
    "containerPort" TEXT NOT NULL,
    "dbContainerId" INTEGER NOT NULL,
    CONSTRAINT "PortForward_dbContainerId_fkey" FOREIGN KEY ("dbContainerId") REFERENCES "Container" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PortForward" ("containerPort", "createdAt", "hostPort", "id", "updatedAt", "dbContainerId") SELECT "containerPort", "createdAt", "hostPort", "id", "updatedAt", "containerId" FROM "PortForward";
DROP TABLE "PortForward";
ALTER TABLE "new_PortForward" RENAME TO "PortForward";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
