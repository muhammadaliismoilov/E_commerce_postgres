import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class VerifyDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  inputCode: string;
}
