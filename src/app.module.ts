import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { TelegramBotModule } from "./telegram/telegram.module";



@Module({
  imports: [ConfigModule.forRoot({  isGlobal:true}),DrizzleModule, AuthModule, UsersModule,TelegramBotModule],
  controllers: [],
})
export class AppModule {}
