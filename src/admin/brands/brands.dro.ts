// src/admin/brands/dto/brand.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GenderEnum } from "../../drizzle/enums/gender.enum";

export class CreateBrandDto {
  @ApiProperty({
    example: "Nike",
    description: "Brend nomi",
  })
  @IsNotEmpty({message:"Brend nomi bo'sh bo'lmasligi kerak"})
  @IsString({message:"Brend nomi matn bo'lishi kerak"})
  name: string;

  @ApiProperty({
    example: GenderEnum.unisex,
    description: "Brend uchun gender (male, female, unisex)",
    enum: GenderEnum,
    default: GenderEnum.unisex,
  })
  @IsNotEmpty({message:"Gender bo'sh bo'lmasligi kerak"})
  @IsEnum(GenderEnum)
  gender: GenderEnum;
}

export class UpdateBrandDto {
  @ApiPropertyOptional({
    example: "Adidas",
    description: "Yangi brend nomi",
  })
  @IsOptional({message:"Brend nomi ixtiyoriy"})
  @IsString({message:"Brend nomi matn bo'lishi kerak"})
  name?: string;

  @ApiPropertyOptional({
    example: GenderEnum.male,
    description: "Yangi gender",
    enum: GenderEnum,
  })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}
