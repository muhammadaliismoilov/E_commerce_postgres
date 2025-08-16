// src/telegram/telegram-bot.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {
  private readonly bot: TelegramBot;
  private readonly logger = new Logger(TelegramBotService.name);
  private readonly userStates = new Map<number, any>();

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const token = this.configService.get<string>('BOT_TOKEN');
    if (!token) {
      throw new Error('❌ BOT_TOKEN topilmadi!');
    }

    this.bot = new TelegramBot(token, { polling: true });
    this.logger.log('🤖 Telegram bot ishga tushdi, /start kutyapti...');
    this.handleMessages();
  }

  private handleMessages() {
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;

      try {
        const user = await this.usersService.findByTelegramId(chatId.toString());
        if (user) {
          await this.bot.sendMessage(
            chatId,
            '🔑 Siz allaqachon ro‘yxatdan o‘tgansiz! Login qildingiz ✅',
          );
          return;
        }
      } catch {
        // user topilmasa davom etadi
      }

      await this.bot.sendMessage(chatId, 'Tilni tanlang / Choose language:', {
        reply_markup: {
          keyboard: [['O‘zbekcha'], ['Русский']],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });

      this.userStates.set(chatId, { step: 'choose_language' });
    });

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const state = this.userStates.get(chatId);

      if (!state || msg.text?.startsWith('/')) return;

      if (state.step === 'choose_language') {
        await this.bot.sendMessage(chatId, 'Ism va familyangizni kiriting:');
        this.userStates.set(chatId, { step: 'enter_name' });
      } else if (state.step === 'enter_name') {
        state.fullName = msg.text;
        await this.bot.sendMessage(chatId, 'Telefon raqamingizni yuboring:', {
          reply_markup: {
            keyboard: [[{ text: '📱 Raqamni yuboring', request_contact: true }]],
            one_time_keyboard: true,
            resize_keyboard: true,
          },
        });
        this.userStates.set(chatId, { ...state, step: 'enter_phone' });
      } else if (state.step === 'enter_phone') {
        const phone = msg.contact?.phone_number || msg.text;
        if (!phone) {
          await this.bot.sendMessage(
            chatId,
            '❗ Telefon raqam yuborilmadi. Qayta urinib ko‘ring.',
          );
          return;
        }

        await this.usersService.create({
          telegram_id: chatId.toString(),
          fullName: state.fullName,
          phone,
          role: 'user',
        });

        await this.bot.sendMessage(chatId, '✅ Ro‘yxatdan o‘tdingiz!');
        this.userStates.delete(chatId);
      }
    });

    this.bot.on('polling_error', (err) =>
      this.logger.error('Polling error: ' + err.message),
    );
  }
}
