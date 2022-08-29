import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RoleService } from './services/role.service';

const PORT = parseInt(process.env.PORT || '3001');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const roleService = app.get(RoleService);
  await roleService.seed();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
