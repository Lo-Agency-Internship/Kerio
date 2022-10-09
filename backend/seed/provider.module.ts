import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Role } from '../src/entities/role.entity';
@Module({
    imports: [
      TypeOrmModule.forRootAsync({

        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          
          type: 'postgres' ,
          url: configService.get('DB_URL'),
          ssl: { rejectUnauthorized: false },
          entities: [Role],
          synchronize: true,
        }),
        inject: [ConfigService],
      } as TypeOrmModuleAsyncOptions),
    ],
  })
  
  export class PostgresDatabaseProviderModule {}