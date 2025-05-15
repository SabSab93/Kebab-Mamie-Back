-- CreateTable
CREATE TABLE "Kebab" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Kebab_pkey" PRIMARY KEY ("id")
);
