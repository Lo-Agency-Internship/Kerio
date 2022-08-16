import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
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
            entities:[],
            }
        )
      }
    )
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
