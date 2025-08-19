import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { AttributeGroupsController } from "../attribute-groups/attribute-groups.controller";
import { AttributeOptionsService } from "./attribute-options.service";
import { AttributeOptionsController } from "./attribute-options.controller";

@Module({
    imports: [DrizzleModule],
    controllers: [AttributeOptionsController], 
    providers: [AttributeOptionsService],
    exports: [AttributeOptionsService],    
})
export class AttributeOptionsModule {}