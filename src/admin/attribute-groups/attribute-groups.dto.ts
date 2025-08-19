import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAttributeGroupDto {
  @ApiProperty({
    example: { uz: "Rang", en: "Color", ru: "Цвет" },
    description: "Attribute group name (multi-language JSON object)",
  })
  @IsNotEmpty()
  @IsObject()
  name: Record<string, string>;

  @ApiPropertyOptional({
    example: 1,
    description: "Sorting order of the attribute group",
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  sequence?: number;
}

export class UpdateAttributeGroupDto {
  @ApiPropertyOptional({
    example: { uz: "O'lcham", en: "Size", ru: "Размер" },
    description: "Attribute group name (multi-language JSON object)",
  })
  @IsOptional()
  @IsObject()
  name?: Record<string, string>;

  @ApiPropertyOptional({
    example: 2,
    description: "Sorting order of the attribute group",
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sequence?: number;
}
