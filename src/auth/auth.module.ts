import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/jwt/jwt.service';
import { TelegramBotModule } from 'src/telegram/telegram.module';

@Module({
  imports:[UsersModule,JwtModule.register({}),TelegramBotModule],
  controllers: [AuthController,],
  providers: [AuthService,TokenService],
    exports: [TokenService],
})
export class AuthModule {}
