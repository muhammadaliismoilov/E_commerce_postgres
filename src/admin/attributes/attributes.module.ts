import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { AttributesController } from "./attributes.controller";
import { AttributesService } from "./attributes.service";


@Module({
    imports: [DrizzleModule],
    controllers: [AttributesController],
    providers: [AttributesService],
    exports: [AttributesService],        
})
export class AttributesModule {}