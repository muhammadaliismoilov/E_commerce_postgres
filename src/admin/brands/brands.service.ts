
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DrizzleType, InjectDrizzle } from "src/drizzle/decarator";
import { brands } from "src/drizzle/schema";
import { eq } from "drizzle-orm";
import { CreateBrandDto, UpdateBrandDto } from "./brands.dro";
import { v4 as uuid } from "uuid";

@Injectable()
export class BrandsService {
  constructor(@InjectDrizzle() private db: DrizzleType) {}

  async findAll() {
    try {
      return this.db.select().from(brands);
    } catch (error) {
      throw new InternalServerErrorException("Brandalarni olishda serverda xatolik yuz berdi",error.message);
    }
  }

  async findOne(id: string) {
    try {
      const [brand] = await this.db.select().from(brands).where(eq(brands.id, id));
    if (!brand) throw new NotFoundException("Brand topilmadi");
    return brand;
    } catch (error) {
      throw new InternalServerErrorException("Brendni olishda serverda xatolik yuz berdi", error.message);
    }
  }

  async create(dto: CreateBrandDto) {
    try {
       const existingBrand = await this.db.query.brands.findFirst({
        where: eq(brands.name, dto.name),
      });

      if (existingBrand) {
        throw new ConflictException(`"${dto.name}" nomli brand bazada mavjud`);
      }
      const [brand] = await this.db
      .insert(brands)
      .values({
        id: uuid(),
        name: dto.name,
        gender: dto.gender,
      })
      .returning();
    return brand;
    } catch (error) {
      throw new InternalServerErrorException("Brand yaratishda serverda xatolik yuz berdi", error.message);
    }
  }

  async update(id: string, dto: UpdateBrandDto) {
    try {
      const existingBrand = await this.db.query.brands.findFirst({
        where: eq(brands.id, id),
      });
      if(!existingBrand) throw new NotFoundException("Brand topilmadi");
      const [brand] = await this.db
      .update(brands)
      .set(dto)
      .where(eq(brands.id, id))
      .returning();

    if (!brand) throw new NotFoundException("Brand not found");
    return brand;
    } catch (error) {
      throw new InternalServerErrorException("Brandni yangilashda serverda xatolik yuz berdi", error.message);
    }
  }

  async remove(id: string) {
    try {
      const [brand] = await this.db.delete(brands).where(eq(brands.id, id)).returning();
    if (!brand) throw new NotFoundException("Brand not found");
    return brand;
    } catch (error) {
      throw new InternalServerErrorException("Brandni o'chirish jarayonida serverda xatolik yuz berdi", error.message);
    }
  }
}
