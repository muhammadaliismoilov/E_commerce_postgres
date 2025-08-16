//src/drizzle/db.ts
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import 'dotenv/config'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL ,
    ssl:true,
});

export const db = drizzle(pool, { schema }) as NodePgDatabase <typeof schema>;
