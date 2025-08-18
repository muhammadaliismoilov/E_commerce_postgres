// src/users/users.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { users } from "../drizzle/schema";
import { DrizzleType, InjectDrizzle } from "../drizzle/decarator";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 as uuidv4 } from "uuid";
import { eq, ne } from "drizzle-orm";
import { th } from "@faker-js/faker/.";
import { RoleEnum } from "src/drizzle/enums/role.enum";

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private db: DrizzleType) {}

  // Foydalanuvchini yaratish
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
      id: uuidv4(),
      telegramId: createUserDto.telegram_id,
      fullName: createUserDto.fullName ?? "",
      phone: createUserDto.phone ?? "",
      role: RoleEnum.User
    } as const;

    const result = await this.db.insert(users).values(newUser).returning();
    return result[0];
    } catch (error) {
      throw new InternalServerErrorException("Foydalanuvchi yaratishda serverda xatolik yuz berdi  " , error.message )
    }
  }
  async findByTelegramId(telegramId: string) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.telegramId, telegramId));
    if (!user.length) throw new NotFoundException("Foydalanuvchi topilamdi!");
    return user[0];
  }
  async findByPhone(phone: string) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.phone, phone));
    if (!user.length) throw new NotFoundException("Foydalanuvchi topilamdi!");
    return user[0];
  }

  // Barcha foydalanuvchilarni olish
  async findAll() {
    try {
    return this.db.select().from(users)
    } catch (error) {
      throw new InternalServerErrorException("Barcha foydalanuvchilaarni olishda serverda xatolik yuz berdi " , error.message)
    };
  }

  async findById(id:string){
    try {
      const user = await this.db.select().from(users).where(eq(users.id,id))
      if(!user.length) throw new NotFoundException("foydalanuvchi topilmadi!")
        return user[0]
    } catch (error) {
      throw new InternalServerErrorException("Foydalanuvchini is bo`yicha topishda xatoli yuz berdi" , error.message)
    }
  }


 
}
