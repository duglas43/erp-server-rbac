import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('ERP RBAC API')
    .addBearerAuth({
      description: `
        Admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE3MDE5NTg2ODYsImV4cCI6MTczMzQ5NDY4Nn0.lM3nU7pjnCo9_FRt1--QxkY-RRUMN1vGQ5DXMAUtLww
        `,
      type: 'http',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
