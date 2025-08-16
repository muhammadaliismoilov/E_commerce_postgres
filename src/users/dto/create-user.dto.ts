export class CreateUserDto {
    telegram_id: string;
    fullName?: string;
    phone?: string;
    role?: 'user' | 'admin' | 'superadmin';
}
