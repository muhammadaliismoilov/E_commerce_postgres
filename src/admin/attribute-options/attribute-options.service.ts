import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectDrizzle, DrizzleType } from "src/drizzle/decarator";
import { CreateAttributeOptionDto, UpdateAttributeOptionDto } from "./attribute-options.dto";
import { attributeOptions } from "src/drizzle/schema";
import { eq } from "drizzle-orm";
import { uuid } from "uuidv4";
import { th } from "@faker-js/faker/.";


@Injectable()
export class AttributeOptionsService {
  constructor(@InjectDrizzle() private db: DrizzleType) {}

  async create(dto: CreateAttributeOptionDto) {
   try {
    const atribute_option = await this.db.query.attributeOptions.findFirst({where:eq(attributeOptions.name, dto.name)})
    if(atribute_option) throw new ConflictException() 
    const [option] = await this.db
      .insert(attributeOptions)
      .values({
        id: uuid(),
        attributeId: dto.attributeId,
        groupId: dto.groupId,
        name: dto.name,
        sequance: dto.sequance ?? 0,
      })
      .returning();

    return option;
   } catch (error) {
      throw new InternalServerErrorException("Atributeoptions yaratishda  serverda xatolik yuz berdi", error.message);
    
   }
  }

  async findAll() {
    try {
      return this.db.query.attributeOptions.findMany();
    } catch (error) {
        throw new InternalServerErrorException("Atributeoptionni olishda serverda xatolik yuz berdi", error.message);
   
    }
  }

  async findOne(id: string) {
    try {
      const option = await this.db.query.attributeOptions.findFirst({
      where: (t) => eq(t.id, id),
    });

    if (!option) throw new NotFoundException(`Option with id ${id} not found`);
    return option;
    } catch (error) {
      throw new InternalServerErrorException("Brendni olishda serverda xatolik yuz berdi", error.message);
    }
      
    
  }

  async update(id: string, dto: UpdateAttributeOptionDto) {
    const [updated] = await this.db
      .update(attributeOptions)
      .set(dto)
      .where(eq(attributeOptions.id, id))
      .returning();

    if (!updated) throw new NotFoundException(`Option with id ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const [deleted] = await this.db
      .delete(attributeOptions)
      .where(eq(attributeOptions.id, id))
      .returning();

    if (!deleted) throw new NotFoundException(`Option with id ${id} not found`);
    return { message: "Deleted successfully", deleted };
  }
}
