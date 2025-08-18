// src/users/users.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guard/jwt_auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
   @ApiOperation({ summary: "Foydalanuvchi telegram bot orqali ro`yxatdan o`tadi" })
  @ApiResponse({status:500,description:"Foydalanuvchi yaratishda serverda xatolik yuz berdi"})
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get("getAllUsers")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary:"Barcha foydalanuvchilar malumotlarini olish"})
  async findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  @ApiOperation({summary:"Foydalanuvchini Id bo`yicha topish"})
  @ApiResponse({status:404,description:"Foydalanuvchi topilmadi!"})
   @ApiResponse({status:500,description:"Id orqli foydalanuvhini topishda serverda xatolik yuz berdi"})
  async finById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
