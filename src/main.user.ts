// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const configService = app.get(ConfigService);
//   const PORT = configService.get<number>('PORT') || 3000;

//   // Swagger sozlamalari
//   const config = new DocumentBuilder()
//     .setTitle('E-commerce API')
//   .setDescription('E-commerce API hujjatlar')
//   .setVersion('1.0')
//   .addBearerAuth()
//   .addCookieAuth('access_token') // cookie orqali token yuborish uchun
//   .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api/docs', app, document, {
//     swaggerOptions: { persistAuthorization: true },
//   });

//   await app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
//     console.log(`📖 Swagger docs: http://localhost:${PORT}/api/docs`);
//   });
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/user');

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('E-commerce User API')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('access_token') // cookie orqali token yuborish uchun
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/user/docs', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 User API: http://localhost:${process.env.PORT || 3000}/api/user/docs`);
}
bootstrap();
