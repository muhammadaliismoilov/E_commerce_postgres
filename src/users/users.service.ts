// src/users/users.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { users } from "../drizzle/schema";
import { DrizzleType, InjectDrizzle } from "../drizzle/decarator";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private db: DrizzleType) {}

  // Foydalanuvchini yaratish
  async create(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      telegramId: createUserDto.telegram_id,
      fullName: createUserDto.fullName ?? "",
      phone: createUserDto.phone ?? "",
      role: createUserDto.role ?? "user",
    } as const;

    const result = await this.db.insert(users).values(newUser).returning();
    return result[0];
  }

  // Barcha foydalanuvchilarni olish
  async findAll() {
    return this.db.select().from(users);
  }

  // Telegram ID bo‘yicha foydalanuvchini topish
  async findByTelegramId(telegramId: string) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.telegramId, telegramId));
    if (!user.length) throw new NotFoundException("User not found");
    return user[0];
  }
  async findByPhone(phone: string) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.phone, phone));
    if (!user.length) throw new NotFoundException("User not found");
    return user[0];
  }

  // Agar user mavjud bo‘lmasa, yaratadi
  async createOrFindUser(telegramId: string) {
    try {
      return await this.findByTelegramId(telegramId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return this.create({
          telegram_id: telegramId,
          fullName: "",
          phone: "",
          role: "user",
        });
      }
      throw error;
    }
  }
}
