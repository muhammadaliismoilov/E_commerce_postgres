
// import { Module } from '@nestjs/common';
// import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { ConfigService } from '@nestjs/config';
// import { Pool } from 'pg';
// import * as schema from './schema';

// export const DRIZZLE_DB = 'DRIZZLE_DB'; // STRING bo'lishi kerak

// @Module({
//   providers: [
//     {
//       provide: DRIZZLE_DB, // STRING
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         const databaseUrl = configService.get<string>('DATABASE_URL');
//         const pool = new Pool({ connectionString: databaseUrl,ssl:{rejectUnauthorized: false}, });
//         return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
//       },
//     },
//   ],
//   exports: [DRIZZLE_DB], // STRING
// })
// export class DrizzleModule {}


import { Module } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import * as schema from './schema';

export const DRIZZLE_DB = 'DRIZZLE_DB';

@Module({
  providers: [
    {
      provide: DRIZZLE_DB,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error('DATABASE_URL .env faylida topilmadi!');
        }
        try {
          const pool = new Pool({
            connectionString: databaseUrl,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
          });
          await pool.connect(); // Ulanishni sinab ko‘rish
          console.log('Ma\'lumotlar bazasiga ulanish muvaffaqiyatli');
          return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
        } catch (error) {
          console.error('Ma\'lumotlar bazasiga ulanishda xato:', error);
          throw error;
        }
      },
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DrizzleModule {}