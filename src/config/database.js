import path from "path";
import dotenv from "dotenv";
import pg from "pg";

const envPath = process.env?.NODE_ENV === "test" ? ".env.test.local" : ".env";

dotenv.config({ path: path.resolve(".", envPath) });
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

const { Pool } = pg;

export const connectionDB = new Pool(
  process.env?.NODE_ENV === "development" || process.env?.NODE_ENV === "test"
    ? {
        user: DB_USERNAME,
        host: DB_HOST,
        port: DB_PORT,
        database: DB_DATABASE,
        password: DB_PASSWORD,
      }
    : {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
);

