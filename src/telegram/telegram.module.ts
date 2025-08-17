// src/telegram-bot/telegram-bot.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import * as TelegramBot from 'node-telegram-bot-api';
import { UsersModule } from 'src/users/users.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { TelegramBotService } from './telegram.service';

@Module({
 imports: [
    ConfigModule,   // 🔥 DRIZZLE_DB ni olish uchun
    UsersModule      // 🔥 UsersService dan foydalanish uchun
  ],
  providers: [TelegramBotService],
  exports:[TelegramBotService]  // ✅ UsersModule ni import qildik
})
export class TelegramBotModule implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async onModuleInit() {
    const botToken = this.configService.get<string>('BOT_TOKEN');
    if (!botToken) throw new Error('TELEGRAM_BOT_TOKEN .env faylida topilmadi!');

    this.bot = new TelegramBot(botToken,);
    console.log('🤖 Bot ishga tushdi');

    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;

      try {
        const user = await this.usersService.findByTelegramId(chatId.toString());
        if (user) {
          return this.bot.sendMessage(chatId, '🔑 Siz allaqachon ro‘yxatdan o‘tgansiz!');
        }
      } catch {
        this.bot.sendMessage(chatId, 'Tilni tanlang / Choose language:', {
          reply_markup: {
            keyboard: [['O‘zbekcha'], ['Русский']],
            one_time_keyboard: true,
            resize_keyboard: true,
          },
        });
      }
    });
  }
}
