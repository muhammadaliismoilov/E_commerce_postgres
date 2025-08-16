import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin", "superadmin"]);

export type Role = "user" | "admin" | "superadmin";
