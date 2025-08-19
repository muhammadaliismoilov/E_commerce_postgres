import {
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsObject,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAttributeDto {
  @ApiProperty({
    description: "Attribute group ID (UUID format)",
    example: "a3c6e0e8-1234-4c89-9d78-0f55f2c12345",
  })
  @IsUUID()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty({
    description: "Attribute nomi object sifatida kiritiladi (multilingual)",
    example: { uz: "Rangi", ru: "Цвет" },
  })
  @IsNotEmpty()
  @IsObject()
  name: Record<string, string>;

  @ApiPropertyOptional({
    description:
      "Attribute tartib raqami ketma-ketma tartibda kiritiladi 1,2,3,4.....",
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sequence?: number;
}

export class UpdateAttributeDto {
  @ApiPropertyOptional({
    description: "Attribute group ID (UUID format) ",
    example: "a3c6e0e8-1234-4c89-9d78-0f55f2c12345",
  })
  @IsOptional()
  @IsUUID()
  groupId?: string;

  @ApiPropertyOptional({
    description: "Attribute nomi object sifatida kiritiladi (multilingual)",
    example: { uz: "Rangi", ru: "Цвет" },
  })
  @IsOptional()
  @IsObject()
  name?: Record<string, string>;

  @ApiPropertyOptional({
    description:
      "Attribute tartib raqami ketma-ketma tartibda kiritiladi 1,2,3,4.....",
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sequence?: number;
}
