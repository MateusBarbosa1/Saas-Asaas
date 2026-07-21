-- CreateTable
CREATE TABLE "Sites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "type" TEXT NOT NULL DEFAULT 'site',
    "status" TEXT NOT NULL DEFAULT 'em-desenvolvimento',
    "currentStage" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitePages" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SitePages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteUpdates" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteUpdates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteFiles" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "SiteFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitePlan" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "nextPayment" TEXT,
    "includes" TEXT[],

    CONSTRAINT "SitePlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SitePlan_siteId_key" ON "SitePlan"("siteId");

-- AddForeignKey
ALTER TABLE "Sites" ADD CONSTRAINT "Sites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitePages" ADD CONSTRAINT "SitePages_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteUpdates" ADD CONSTRAINT "SiteUpdates_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteFiles" ADD CONSTRAINT "SiteFiles_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitePlan" ADD CONSTRAINT "SitePlan_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
