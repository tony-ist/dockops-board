-- CreateTable
CREATE TABLE "Container" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dockerId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dockerName" TEXT NOT NULL,
    "dockerState" TEXT NOT NULL DEFAULT 'created',
    "doesExist" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "PortForward" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hostPort" TEXT NOT NULL,
    "containerPort" TEXT NOT NULL,
    "containerId" INTEGER NOT NULL,
    CONSTRAINT "PortForward_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
