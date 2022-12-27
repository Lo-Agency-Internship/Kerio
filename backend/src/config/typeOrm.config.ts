import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Contact } from '../entities/contact/contact.entity';
import { ContactStatus } from '../entities/contact/contactStatus.entity';
import { Status } from '../entities/contact/status.entity';
import { Organization } from '../entities/organization.entity';
import { OrganizationUser } from '../entities/organizationUser.entity';
import { User } from '../entities/user.entity';
import { Invite } from '../entities/invite.entity';
import { Role } from '../entities/role.entity';
import { Note } from '../entities/note.entity';
import { Log } from '../entities/log.entity';

config();

const configService = new ConfigService();
const entitiesToAdd = [
  Contact,
  ContactStatus,
  Status,
  Organization,
  OrganizationUser,
  User,
  Invite,
  Role,
  Note,
  Log,
];

export const myDataSource = new DataSource({
  type: 'postgres',
  //host: configService.get('POSTGRES_HOST'),
  host: 'localhost',
  //url: configService.get('DB_URL'),
  url: configService.get('DATABASE_URL'),
  //url: 'postgresql://mahsa:pass123@localhost:5432/kerio_db?sslmode=disable',
  entities: entitiesToAdd,
  migrations: ['./dist/migrations/*.js'],
});
