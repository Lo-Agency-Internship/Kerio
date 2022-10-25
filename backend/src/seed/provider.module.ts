import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact/contact.entity';
import { ContactStatus } from 'src/entities/contact/contactStatus.entity';
import { Invite } from 'src/entities/invite.entity';
import { Log } from 'src/entities/log.entity';
import { Note } from 'src/entities/note.entity';
import { Organization } from 'src/entities/organization.entity';
import { OrganizationUser } from 'src/entities/organizationUser.entity';
import { User } from 'src/entities/user.entity';
import { Status } from '../entities/contact/status.entity';
import { Role } from '../entities/role.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        ssl: { rejectUnauthorized: false },
        entities: [
          Role,
          Status,
          ContactStatus,
          Contact,
          Organization,
          Note,
          OrganizationUser,
          User,
          Invite,
          Log,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresDatabaseProviderModule {}
