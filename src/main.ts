import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3006',
      'https://vietnam-motorbike-tours.vercel.app',
      'https://vnmotor-admin-management.vercel.app',
    ],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api'); // Set the global prefix to 'api'
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
