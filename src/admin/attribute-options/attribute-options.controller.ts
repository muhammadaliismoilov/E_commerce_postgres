import { Controller, Post, Get, Param, Body, Put, Delete } from "@nestjs/common";
import { AttributeOptionsService } from "./attribute-options.service";
import { CreateAttributeOptionDto, UpdateAttributeOptionDto } from "./attribute-options.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Attribute Options")
@Controller("attribute-options")
export class AttributeOptionsController {
  constructor(private readonly optionsService: AttributeOptionsService) {}

  @Post()
  @ApiOperation({ summary: "Create attribute option" })
  @ApiResponse({ status: 201, description: "Option created" })
  async create(@Body() dto: CreateAttributeOptionDto) {
    return this.optionsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all attribute options" })
  async findAll() {
    return this.optionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get single option by ID" })
  async findOne(@Param("id") id: string) {
    return this.optionsService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update option by ID" })
  async update(@Param("id") id: string, @Body() dto: UpdateAttributeOptionDto) {
    return this.optionsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete option by ID" })
  async remove(@Param("id") id: string) {
    return this.optionsService.remove(id);
  }
}
