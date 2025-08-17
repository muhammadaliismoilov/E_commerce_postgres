import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
  private readonly refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

  // access token yaratish (15 daqiqa)
  async generateAccessToken(payload: { userId: string; role: string }) {
    return this.jwtService.signAsync(payload, {
      secret: this.accessTokenSecret,
      expiresIn: '15m',
    });
  }

  // refresh token yaratish (7 kun)
  async generateRefreshToken(payload: { userId: string; role: string }) {
    return this.jwtService.signAsync(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: '7d',
    });
  }

  // tokenlarni qaytarish va cookie ga yozish
  async generateTokensAndSetCookies(
    payload: { userId: string; role: string },

  ) {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    // res.cookie('access_token', accessToken, {
    //   httpOnly: true,
    //   secure: false, // productionda true qiling (https bo'lsa)
    //   maxAge: 15 * 60 * 1000, // 15 min
    // });

    // res.cookie('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    return { accessToken, refreshToken };
  }

  // Access tokenni verify qilish
  async verifyAccessToken(req: Request) {
    try {
      const token =
        req.cookies['access_token'] ||
        req.headers['authorization']?.split(' ')[1];
      if (!token) throw new UnauthorizedException('Access token topilmadi');

      return this.jwtService.verifyAsync(token, {
        secret: this.accessTokenSecret,
      });
    } catch (e) {
      throw new UnauthorizedException('Access token xato yoki eskirgan');
    }
  }

  // Refresh tokenni verify qilish
  async verifyRefreshToken(req: Request) {
    try {
      const token = req.cookies['refresh_token'];
      if (!token) throw new UnauthorizedException('Refresh token topilmadi');

      return this.jwtService.verifyAsync(token, {
        secret: this.refreshTokenSecret,
      });
    } catch (e) {
      throw new UnauthorizedException('Refresh token xato yoki eskirgan');
    }
  }
}
