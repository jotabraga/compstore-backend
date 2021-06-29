CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "token" TEXT NOT NULL
);
