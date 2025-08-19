import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { AttributeGroupsService } from "./attribute-groups.service";
import { CreateAttributeGroupDto, UpdateAttributeGroupDto } from "./attribute-groups.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Attribute Groups")
@Controller("attribute-groups")
export class AttributeGroupsController {
  constructor(private readonly service: AttributeGroupsService) {}

  @Post()
  @ApiOperation({ summary: "Create new attribute group" })
  @ApiResponse({ status: 201, description: "Created successfully" })
  create(@Body() dto: CreateAttributeGroupDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all attribute groups" })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get attribute group by ID" })
  @ApiResponse({ status: 404, description: "Not Found" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update attribute group by ID" })
  @ApiResponse({ status: 404, description: "Not Found" })
  update(@Param("id") id: string, @Body() dto: UpdateAttributeGroupDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete attribute group by ID" })
  @ApiResponse({ status: 404, description: "Not Found" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
