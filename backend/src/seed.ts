import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './seed/seeder';
import { SeederModule } from './seed/seeder.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const logger = app.get(Logger);
  const seeder = app.get(Seeder);

  try {
    const seeded = await seeder.seedRoles();
    if (seeded){

      logger.debug(`${seeded.length} roles seeded`);
    }
  } catch (e) {
    logger.error(`error occurred while seeding roles: ${e.message}`);
  }

  try {
    const seeded = await seeder.seedStatuses();
    if (seeded){

      logger.debug(`${seeded.length} statuses seeded`);
    }
  } catch (e) {
    logger.error(`error occurred while seeding statuses: ${e.message}`);
  }
}
bootstrap();
