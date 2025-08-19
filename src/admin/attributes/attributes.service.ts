import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DrizzleType, InjectDrizzle } from "src/drizzle/decarator";
import { attributes } from "src/drizzle/schema";
import { eq } from "drizzle-orm";
import { CreateAttributeDto, UpdateAttributeDto } from "./attributes.dto";
import { uuid } from "uuidv4";

@Injectable()
export class AttributesService {
  constructor(@InjectDrizzle() private db: DrizzleType) {}

  // Create
  async create(dto: CreateAttributeDto) {
    try {
        const existingAttribute = await this.db.query.attributes.findFirst({
      where: eq(attributes.name, dto.name),
    });
    if( existingAttribute ) throw new ConflictException(`"${dto.name}" nomli attribute bazada mavjud`);
        const [created] = await this.db
      .insert(attributes)
      .values({
        id: uuid(),
        groupId: dto.groupId,
        name: dto.name,
        sequence: dto.sequence ?? 0,
      })
      .returning();
    return created;
    } catch (error) {
        throw new InternalServerErrorException("Attribute yaratishda serverda xatolik yuz berdi", error.message);   
    }
  }

  // Find all
  async findAll() {
    try {
        return this.db.select().from(attributes);
    } catch (error) {
        throw new InternalServerErrorException("Attributesni olishda serverda xatolik yuz berdi", error.message);
    }
  }

  // Find one
  async findOne(id: string) {
    try {
        const [attribute] = await this.db
      .select()
      .from(attributes)
      .where(eq(attributes.id, id));

    if (!attribute) {
      throw new NotFoundException("Attribute topilmadi");
    }
    return attribute;
    } catch (error) {
        throw new InternalServerErrorException("Attribute olishda serverda xatolik yuz berdi", error.message);
    }
  }

  // Update
  async update(id: string, dto: UpdateAttributeDto) {
    try {
        const [updated] = await this.db
      .update(attributes)
      .set({
        ...(dto.groupId && { groupId: dto.groupId }),
        ...(dto.name && { name: dto.name }),
        ...(dto.sequence !== undefined && { sequence: dto.sequence }),
      })
      .where(eq(attributes.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException("Attribute topilmadi");
    }
    return updated;
    } catch (error) {
        throw new InternalServerErrorException("Attribute yangilashda serverda xatolik yuz berdi", error.message);
    }
  }

  // Delete
  async remove(id: string) {
   try {
     const [deleted] = await this.db
      .delete(attributes)
      .where(eq(attributes.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException("Attribute topilmadi");
    }
    return { message: "Attribute o`chirildi" };
   } catch (error) {
    throw new InternalServerErrorException("Attribute o'chirishda serverda xatolik yuz berdi", error.message);
   }
  }
}
