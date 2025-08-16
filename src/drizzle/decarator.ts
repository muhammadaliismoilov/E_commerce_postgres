// src/common/decorators/inject-drizzle.decorator.ts
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { DRIZZLE_DB } from '../drizzle/drizzle.module';

// Tip bilan ishlash uchun (optional)
export type DrizzleType = NodePgDatabase<typeof schema>;

// Dekorator
export const InjectDrizzle = () => Inject(DRIZZLE_DB);
