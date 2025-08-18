// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';
// import { JwtModule } from '@nestjs/jwt';
// import { TokenService } from 'src/jwt/jwt.service';
// import { TelegramBotModule } from 'src/telegram/telegram.module';

// @Module({
//   imports:[UsersModule,JwtModule.register({}),TelegramBotModule],
//   controllers: [AuthController,],
//   providers: [AuthService,TokenService],
//     exports: [TokenService],
// })
// export class AuthModule {}


// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { TokenService } from 'src/jwt/jwt.service';
import { TelegramBotModule } from 'src/telegram/telegram.module';

@Module({
  imports: [
    UsersModule,
    TelegramBotModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_AT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],
  exports: [TokenService, PassportModule, JwtModule],
})
export class AuthModule {}
