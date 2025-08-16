import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig ({
  schema: "./src/drizzle/schema.ts", // Schema fayl manzili
  out: "./drizzle",             // SQL migrationlar chiqadigan joy
  dialect: "postgresql",        // DB turi
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "" // .env dagi ulanish URL
  },
} );
