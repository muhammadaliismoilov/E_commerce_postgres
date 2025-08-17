import { Injectable, UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { TokenService } from '../jwt/jwt.service';
import { LoginDto, VerifyDto } from './dto/login.dto';
import { TelegramBotService } from 'src/telegram/telegram.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly telegramBot: TelegramBotService,
     private readonly userService: UsersService,
  ) {}

  // vaqtinchalik kodlarni saqlash (DB kerak emas, faqat memory)
  private codes = new Map<
    string, // phone number
    { code: string; expiresAt: number }
  >();

  // 4 xonali kod yaratish
  generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  // Step 1: Kod yaratib botga yuborish
  async login(loginDto: LoginDto) {
    try {
      const {phone}=loginDto
    const user = await this.userService.findByPhone(phone)
    if(!user) throw new NotFoundException("Foydalanuvchi topilmadi!")
    const code = this.generateCode();
    const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minut

    this.codes.set(phone, { code, expiresAt });
  const chatId = Number(user.telegramId)
     await this.telegramBot.sendCode(chatId, code);

    // 🔹 Siz shu yerda telegram bot orqali kod yuborasiz
    console.log(`Bot orqali yuboriladigan kod: ${code}`);

    return { message: 'Kod yuborildi (2 minut amal qiladi)' };
    } catch (error) {
      throw new InternalServerErrorException("Login qilishda serverda xatolik yuz berdi",error.message)
    }
  }

  // Step 2: Kodni tekshirish
  async verify(verifydto:VerifyDto ,res: Response) {
    const{phone,inputCode} = verifydto
    const record = this.codes.get(phone);
    const user = await this.userService.findByPhone(phone)
    if (!record) {
      throw new BadRequestException('Kod topilmadi. Avval login kodini oling.');
    }

    if (Date.now() > record.expiresAt) {
      this.codes.delete(phone);
      throw new UnauthorizedException('Kod eskirgan. Yangi kod oling.');
    }

    if (record.code !== inputCode) {
      throw new UnauthorizedException('Kod noto‘g‘ri.');
    }

    // Kod to‘g‘ri → tokenlar yaratamiz
    this.codes.delete(phone);

    const payload = { userId: user.id, role: 'user' }; // DB ishlatilmagani uchun phone userId sifatida
    const tokens = await this.tokenService.generateTokensAndSetCookies(payload, res);
    return res.json({
      message: 'Login muvaffaqiyatli',
      ...tokens,
    });
  }
}
