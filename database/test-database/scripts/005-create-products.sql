CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "description" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "categoryId" INTEGER NOT NULL
);