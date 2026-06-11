-- CreateTable
CREATE TABLE "LineGroup" (
    "id" TEXT NOT NULL,
    "lineGroupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LineGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockEntry" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'units',
    "status" TEXT NOT NULL DEFAULT 'OK',
    "notes" TEXT,
    "reportedBy" TEXT NOT NULL,
    "reporterName" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShiftKPI" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "shiftDate" TIMESTAMP(3) NOT NULL,
    "shiftType" TEXT NOT NULL DEFAULT 'GENERAL',
    "staffName" TEXT NOT NULL,
    "totalSales" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "customerCount" INTEGER NOT NULL DEFAULT 0,
    "topProducts" TEXT,
    "notes" TEXT,
    "rawMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShiftKPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupSummary" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "summaryType" TEXT NOT NULL,
    "summaryDate" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "sentToLine" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LineGroup_lineGroupId_key" ON "LineGroup"("lineGroupId");

-- AddForeignKey
ALTER TABLE "StockEntry" ADD CONSTRAINT "StockEntry_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "LineGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftKPI" ADD CONSTRAINT "ShiftKPI_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "LineGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupSummary" ADD CONSTRAINT "GroupSummary_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "LineGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
