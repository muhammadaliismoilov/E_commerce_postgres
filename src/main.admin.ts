import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  app.setGlobalPrefix('api/admin');

  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('E-commerce Admin API')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('access_token') // cookie orqali token yuborish uchun
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/admin/docs', app, document);

  await app.listen(process.env.ADMIN_PORT || 4000);
  console.log(`🚀 Admin API: http://localhost:${process.env.ADMIN_PORT || 4000}/api/admin/docs`);
}
bootstrap();
