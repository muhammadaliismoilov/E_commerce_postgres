import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { BrandsService } from "./brands.service";
import { BrandsController } from "./brands.controller";

@Module({
    imports: [DrizzleModule],
    controllers: [BrandsController],
    providers: [BrandsService],
    exports: [BrandsService],
})

export class BrandsModule {}