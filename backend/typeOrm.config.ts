import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Contact } from './src/entities/contact/contact.entity';
import { ContactStatus } from './src/entities/contact/contactStatus.entity';
import { Status } from './src/entities/contact/status.entity';
import { Organization } from './src/entities/organization.entity';
import { OrganizationUser } from './src/entities/organizationUser.entity';
import { User } from './src/entities/user.entity';
import { Invite } from './src/entities/invite.entity';
import { Role } from './src/entities/role.entity';
import { Note } from './src/entities/note.entity';
import { Log } from './src/entities/log.entity';

 
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
 
export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  url: configService.get('DB_URL'),
  entities: entitiesToAdd,
  migrations: ['./src/migrations/*.ts'],
});