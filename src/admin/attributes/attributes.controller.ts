import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { AttributesService } from "./attributes.service";
import { CreateAttributeDto, UpdateAttributeDto } from "./attributes.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Attributes")
@Controller("attributes")
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi atribut yaratish" })
  @ApiResponse({ status: 201, description: "Attribute muvvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 409, description: "Bu nomli atribyte allaqachon mavjud" })
  @ApiResponse({ status: 500, description: "Atribute yaratishda serverda xatolik yuz berdi" })
  create(@Body() dto: CreateAttributeDto) {
    return this.attributesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha atributelarni olish" })
  @ApiResponse({ status: 200, description: "Barcha atributlar ro'yxati " })
   @ApiResponse({ status: 404, description: "Atributlar topilmadi" })
  @ApiResponse({ status: 500, description: "Atributlarnilarni olishda serverda xatolik yuz berdi" })

  findAll() {
    return this.attributesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get attribute by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "Attribute found" })
   @ApiResponse({ status: 404, description: "Attribute topilmadi" })
  @ApiResponse({ status: 500, description: "Attributelarni olishda serverda xatolik yuz berdi" })

  findOne(@Param("id") id: string) {
    return this.attributesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update attribute by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "Attribute updated" })
  @ApiResponse({ status: 404, description: "Attribute not found" })
  @ApiResponse({ status: 400, description: "Yangilashda xatolik" })
  @ApiResponse({ status: 500, description: "Attributeni yangilashda serverda xatolik yuz berdi" })
  
  update(@Param("id") id: string, @Body() dto: UpdateAttributeDto) {
    return this.attributesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete attribute by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "Attribute o`chirildi" })
  @ApiResponse({ status: 404, description: "Attribute topilmadi" })
  @ApiResponse({ status: 500, description: "Attributeni o‘chirish jarayonida serverda xatolik yuz berdi" })
  
  remove(@Param("id") id: string) {
    return this.attributesService.remove(id);
  }
}
