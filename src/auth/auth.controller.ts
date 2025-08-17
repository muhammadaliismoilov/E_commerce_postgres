import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto, VerifyDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("verify")
  async verifyCode(@Body()
    verifyDto:VerifyDto,

  ) {
    return this.authService.verify(verifyDto);
  }
}
