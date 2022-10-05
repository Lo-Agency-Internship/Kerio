import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          type: 'postgres' ,
          url: configService.get('DB_URL'),
          ssl: { rejectUnauthorized: false },
        //   host: mysqlConfigService.host,
        //   port: mysqlConfigService.port,
        //   username: mysqlConfigService.username,
        //   password: mysqlConfigService.password,
        //   database: mysqlConfigService.database,
          entities: [Role],
          synchronize: true,
        }),
        inject: [ConfigService],
      } as TypeOrmModuleAsyncOptions),
    ],
  })
  export class PostgresDatabaseProviderModule {}