import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

const PORT = parseInt(process.env.PORT || '3001');

async function bootstrap() {
  console.log("starting app");
  const app = await NestFactory.create(AppModule, {
    cors: true,
    
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(SentryService.SentryServiceInstance());
  await app.listen(PORT);
}
bootstrap();
