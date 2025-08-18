import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Masalan, foydalanuvchi ma'lumotlari request.user da bo‘ladi
    // (Passport JWT yoki middleware orqali qo‘yilgan bo‘ladi)
    const user = request.user;
    console.log("aaaaaaaaaaa",user);
    

    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi ro‘yxatdan o‘tmagan');
    }

    return true;
  }
}
