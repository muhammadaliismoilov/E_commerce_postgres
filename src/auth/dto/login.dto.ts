import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchi telefon raqami",
  })
  @IsNotEmpty({message:"Telefon raqam kiritish shart!"})
  @IsString({message:"Telefon raqam matn ko`rinishda bolishi shart!"})
  phone: string;
}

export class VerifyDto {
  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchi telefon raqami",
  })
  @IsNotEmpty({message:"Telefon raqam kiritish shart!"})
  @IsString({message:"Telefon raqam matn ko`rinishda bolishi shart!"})
  phone: string;

  @ApiProperty({
    example: "1234",
    description: "Telegram orqali yuborilgan 4 xonali kod",
  })
  @IsNotEmpty({message:"Kod  kiritish shart!"})
  @IsString({message:"Kod raqam matn ko`rinishda bolishi shart!"})
  inputCode: string;
}
