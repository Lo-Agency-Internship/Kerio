import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresDatabaseProviderModule } from './provider.module';
import { Seeder } from './seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Status } from '../entities/contact/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Status]),
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresDatabaseProviderModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
