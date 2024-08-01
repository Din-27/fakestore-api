-- AlterTable
ALTER TABLE "Key" ADD COLUMN     "for" TEXT;

-- CreateTable
CREATE TABLE "UserAdmin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "UserAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'free',
    "description" TEXT,
    "userAdminId" INTEGER,
    "userProductId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdmin_email_key" ON "UserAdmin"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userAdminId_fkey" FOREIGN KEY ("userAdminId") REFERENCES "UserAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userProductId_fkey" FOREIGN KEY ("userProductId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
