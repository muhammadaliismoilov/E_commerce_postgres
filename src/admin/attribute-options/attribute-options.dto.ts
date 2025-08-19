import { IsUUID, IsNotEmpty, IsOptional, IsInt, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAttributeOptionDto {
  @ApiProperty({
    description: "Attribute ID (UUID format)",
    example: "e8a4d9f0-9a32-45d3-9d11-5a41c5f89123",
  })
  @IsUUID()
  @IsNotEmpty()
  attributeId: string;

  @ApiProperty({
    description: "Attribute group ID (UUID format)",
    example: "c1a5d8e7-4c12-49e2-b1a1-2d9e23b51234",
  })
  @IsUUID()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty({
    description: "Option name object (multilingual)",
    example: { uz: "Qizil", ru: "Красный" },
  })
  @IsNotEmpty()
  @IsObject()
  name: Record<string, string>;

  @ApiPropertyOptional({
    description: "Option sequence number (sorting order)",
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sequance?: number;
}

export class UpdateAttributeOptionDto {
  @ApiPropertyOptional({
    description: "Attribute ID (UUID format)",
    example: "e8a4d9f0-9a32-45d3-9d11-5a41c5f89123",
  })
  @IsOptional()
  @IsUUID()
  attributeId?: string;

  @ApiPropertyOptional({
    description: "Attribute group ID (UUID format)",
    example: "c1a5d8e7-4c12-49e2-b1a1-2d9e23b51234",
  })
  @IsOptional()
  @IsUUID()
  groupId?: string;

  @ApiPropertyOptional({
    description: "Option name object (multilingual)",
    example: { uz: "Yashil", ru: "Зелёный"},
  })
  @IsOptional()
  @IsObject()
  name?: Record<string, string>;

  @ApiPropertyOptional({
    description: "Option sequence number (sorting order)",
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sequance?: number;
}
