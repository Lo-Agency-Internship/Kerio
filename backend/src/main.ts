import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { StatusService } from './services/status.service';
import { SentryService } from '@ntegral/nestjs-sentry';

const PORT = parseInt(process.env.PORT || '3001');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });
  

  const statusService = app.get(StatusService);
  await statusService.seedStatus();

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(SentryService.SentryServiceInstance());
  await app.listen(PORT);
}
bootstrap();
