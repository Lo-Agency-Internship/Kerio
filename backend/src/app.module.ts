import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact } from './entities/contact.entity';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([Contact]),
    TypeOrmModule.forRootAsync(
      {
        imports:[ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService)=>(
          {
            type: 'postgres',
            url: configService.get('DB_URL'),
            ssl:{rejectUnauthorized: false},
            synchronize: true,
            logging: true,
            entities:[Contact],
            }
        )
      }
    )
  ],

  controllers: [AppController, ContactController],
  providers: [AppService, ContactService],
})
export class AppModule {}
