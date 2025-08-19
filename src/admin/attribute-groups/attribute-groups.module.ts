import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { AttributeGroupsController } from "./attribute-groups.controller";
import { AttributeGroupsService } from "./attribute-groups.service";

@Module({
    imports: [DrizzleModule],
    controllers: [AttributeGroupsController],
    providers: [AttributeGroupsService],
    exports: [AttributeGroupsService],        
})
export class AttributeGroupsModule {}