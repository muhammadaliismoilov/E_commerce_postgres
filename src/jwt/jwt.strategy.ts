// // src/auth/strategies/jwt.strategy.ts (Access)
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(config: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: config.get<string>('JWT_AT_SECRET'),
//     });
//   }

//   async validate(payload: { userId: string; role: string }) {
//     // payload ni req.user ga qo'yadi
//     return payload;
//   }
// }

// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // HEADER dan oladi
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'access-secret',
    });
  }

  async validate(payload: { sub: string; role: string }) {
  return { userId: payload.sub, role: payload.role };
}

}
