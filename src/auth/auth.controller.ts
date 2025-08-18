import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, VerifyDto } from "./dto/login.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { Response } from "express";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Telefon raqam orqali login qilish" })
  @ApiResponse({
    status: 201,
    description: "Kod telegram botga jonatildi",
  })
  @ApiResponse({ status: 400, description: "Notogri sorov jonatildi" })
  @ApiResponse({status:404, description:"Foydalanuvchi topilamdi!"})
  @ApiResponse({
    status: 500,
    description: "Login qilishda serverda xatolik yuz berdi",
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("verify")
  @ApiOperation({ summary: "Kodni tekshirish va token qaytarish" })
  @ApiResponse({
    status: 201,
    description: "Login muvaffaqiyatli. Tokenlar qaytarildi (cookie ichida).",
  })
  @ApiResponse({ status: 400, description: "Kod topilmadi yoki noto‘g‘ri." })
  @ApiResponse({ status: 401, description: "Kod eskirgan yoki noto‘g‘ri." })
  @ApiResponse({
    status: 500,
    description: "Verify qilishda serverda xatolim yuz berdi",
  })
  async verifyCode(
    @Body()
    verifyDto: VerifyDto,
    @Res() res: Response
  ) {
    return this.authService.verify(verifyDto, res);
  }
}
