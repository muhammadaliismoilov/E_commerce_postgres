import { Injectable, NotFoundException } from "@nestjs/common";
import { DrizzleType, InjectDrizzle } from "src/drizzle/decarator";
import { attributeGroups } from "src/drizzle/schema";
import { eq } from "drizzle-orm";
import { CreateAttributeGroupDto, UpdateAttributeGroupDto } from "./attribute-groups.dto";

@Injectable()
export class AttributeGroupsService {
  constructor(@InjectDrizzle() private db: DrizzleType) {}

  // Create
  async create(dto: CreateAttributeGroupDto) {
    const [created] = await this.db
      .insert(attributeGroups)
      .values({
        id: crypto.randomUUID(),
        name: dto.name,
        sequence: dto.sequence ?? 0,
      })
      .returning();
    return created;
  }

  // Find all
  async findAll() {
    return await this.db.select().from(attributeGroups);
  }

  // Find one
  async findOne(id: string) {
    const [group] = await this.db
      .select()
      .from(attributeGroups)
      .where(eq(attributeGroups.id, id));

    if (!group) throw new NotFoundException("Attribute group not found");
    return group;
  }

  // Update
  async update(id: string, dto: UpdateAttributeGroupDto) {
    const [updated] = await this.db
      .update(attributeGroups)
      .set({
        ...(dto.name && { name: dto.name }),
        ...(dto.sequence !== undefined && { sequence: dto.sequence }),
      })
      .where(eq(attributeGroups.id, id))
      .returning();

    if (!updated) throw new NotFoundException("Attribute group not found");
    return updated;
  }

  // Delete
  async remove(id: string) {
    const [deleted] = await this.db
      .delete(attributeGroups)
      .where(eq(attributeGroups.id, id))
      .returning();

    if (!deleted) throw new NotFoundException("Attribute group not found");
    return { message: "Deleted successfully" };
  }
}
