import { pgEnum } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["erkak", "ayol", "uniseks"]);

export type Gender = "erkak" | "ayol" | "uniseks";
