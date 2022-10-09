import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Seeder } from "../seed/seeder";
import { SeederModule } from "./seeder.module";

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
      .then(appContext => {
        const logger = appContext.get(Logger);
        const seeder = appContext.get(Seeder);
        seeder
          .seedRole()
          .then(() => {
            logger.debug('Seeding Role complete!');
          })
          .catch(error => {
            logger.error('Seeding Role failed!');
            throw error;
          })
          
          seeder.seedStatus().then(()=>{logger.debug('Seeding Status compelete!')}).catch(error => {
            logger.error('Seeding status failed!')
            throw error;
          }).finally(() => appContext.close());
      })
      .catch(error => {
        throw error;

      
      });

      

      
  }
  bootstrap();