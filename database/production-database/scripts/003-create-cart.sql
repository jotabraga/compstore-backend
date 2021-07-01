CREATE TABLE "cart" (
  "id" SERIAL PRIMARY KEY,
  "productId" INTEGER NOT NULL,
  "description" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "categoryId" INTEGER NOT NULL,
  "amount" INTEGER NOT NULL,
  "token" TEXT NOT NULL
);