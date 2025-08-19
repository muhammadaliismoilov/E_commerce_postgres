// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { BrandsController } from './brands/brands.controller';
import { BrandsService } from './brands/brands.service';
import { AttributesModule } from './attributes/attributes.module';
import { AttributeGroupsModule } from './attribute-groups/attribute-groups.module';
import { AttributeOptionsModule } from './attribute-options/attribute-options.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AuthModule,
    UsersModule, 
    BrandsModule,
    AttributesModule,
    AttributeGroupsModule,
    AttributeOptionsModule

    
  ]
})
export class AdminModule {}
