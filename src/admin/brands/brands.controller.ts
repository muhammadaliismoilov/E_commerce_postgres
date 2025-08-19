// import { Controller, Get } from "@nestjs/common";
// import { BrandsService } from "./brands.service";

// @Controller('brands')
// export class BrandsController {
//   constructor(private readonly brandsService: BrandsService) {}

//   @Get()
//   async findAll() {
//     return this.brandsService.findAll();
//   }
// }

// src/admin/brands/brands.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto, UpdateBrandDto } from "./brands.dro";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Brands")
@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: "Barcha brendlarni olish" })
  @ApiResponse({ status: 200, description: "Brendlar listi qaytariladi" })
  @ApiResponse({ status: 404, description: "Brendlar topilmadi" })
  @ApiResponse({ status: 500, description: "Brandalarni olishda serverda xatolik yuz berdi" })
  async findAll() {
    return this.brandsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta brendni olish" })
  @ApiResponse({ status: 200, description: "Bitta brand qaytariladi" })
  @ApiResponse({ status: 404, description: "Brend topilmadi" })
  @ApiResponse({ status: 500, description: "Brendni olishda serverda xatolik yuz berdi" })
  async findOne(@Param("id") id: string) {
    return this.brandsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Yangi brand qo‘shish" })
  @ApiResponse({ status: 201, description: "Brand yaratildi" })
  @ApiResponse({ status: 400, description: "Yaratishda xatolik" })
  @ApiResponse({ status: 409, description: "Bu nomli brand allaqachon mavjud" })
  @ApiResponse({ status: 500, description: "Brand yaratishda serverda xatolik yuz berdi" })
  async create(@Body() dto: CreateBrandDto) {
    return this.brandsService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Brandni yangilash" })
  @ApiResponse({ status: 200, description: "Brand yangilandi" })
  @ApiResponse({ status: 404, description: "Brand topilmadi" })
  @ApiResponse({ status: 400, description: "Yangilashda xatolik" })
  @ApiResponse({ status: 500, description: "Brandni yangilashda serverda xatolik yuz berdi" })
  async update(@Param("id") id: string, @Body() dto: UpdateBrandDto) {
    return this.brandsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Brandni o‘chirish" })
  @ApiResponse({ status: 200, description: "Brand o‘chirildi" })
  @ApiResponse({ status: 404, description: "Brand topilmadi" })
  @ApiResponse({ status: 500, description: "Brandni o‘chirish jarayonida serverda xatolik yuz berdi" })
  async remove(@Param("id") id: string) {
    return this.brandsService.remove(id);
  }
}
