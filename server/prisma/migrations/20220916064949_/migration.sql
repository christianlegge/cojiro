-- CreateTable
CREATE TABLE "CheckPosition" (
    "location" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "top" DOUBLE PRECISION NOT NULL,
    "left" DOUBLE PRECISION NOT NULL,
    "child" BOOLEAN NOT NULL DEFAULT true,
    "adult" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CheckPosition_pkey" PRIMARY KEY ("location")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passhash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seed" (
    "id" TEXT NOT NULL,
    "locations" JSONB NOT NULL,
    "gossip_stones" JSONB NOT NULL,

    CONSTRAINT "Seed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playthrough" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seedId" TEXT NOT NULL,
    "checked" TEXT[],
    "items" TEXT[],
    "known_hints" TEXT[],
    "userId" TEXT,

    CONSTRAINT "Playthrough_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Playthrough_seedId_key" ON "Playthrough"("seedId");

-- AddForeignKey
ALTER TABLE "Playthrough" ADD CONSTRAINT "Playthrough_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playthrough" ADD CONSTRAINT "Playthrough_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
