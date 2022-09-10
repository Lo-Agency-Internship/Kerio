import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './controllers/health.controller';
import { AppService } from './services/app.service';
import { Contact } from './entities/contact.entity';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { Organization } from './entities/organization.entity';
import { User } from './entities/user.entity';
import { OrganizationUser } from './entities/organizationUser.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/local.strategy';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';
import { OrganizationService } from './services/organization.service';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationUserService } from './services/organizationUser.service';
import { Invite } from './entities/invite.entity';
import { InviteController } from './controllers/invite.controller';
import { InviteService } from './services/invite.service';

import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './services/mail.service';
import { TemplateEngineService } from './services/templateEngine.service';

import { Role } from './entities/role.entity';
import { RoleService } from './services/role.service';
import { RequestContextService } from './services/requestContext.service';
import { RequestContextModule } from 'nestjs-request-context';
import { Status } from './entities/status.entity';
import { Note } from './entities/note.entity';
import { Log } from './entities/log.entity';
import { ContactStatus } from './entities/contactStatus';
import { StatusService } from './services/status.service';
import { LogService } from './services/log.service';
import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';

const entitiesToAdd = [
  Contact,
  Organization,
  OrganizationUser,
  User,
  Invite,
  Role,
  Status,
  Note,
  Log,
  ContactStatus,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RequestContextModule,
    TypeOrmModule.forFeature(entitiesToAdd),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        ssl: { rejectUnauthorized: false },
        synchronize: true,
        logging: true,
        entities: entitiesToAdd,
      }),
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAILER_HOST,
          port: parseInt(process.env.MAILER_PORT || '587'),
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
            credentials: {
              user: process.env.MAILER_USER,
              pass: process.env.MAILER_PASS,
            },
          },
          ignoreTLS: true,
          secure: false,
          requireTLS: false,
        },
      }),
    }),
    PassportModule,
    TerminusModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [
    HealthController,
    ContactController,
    AuthController,
    UserController,
    OrganizationController,
    InviteController,
    NoteController,
  ],
  providers: [
    AppService,
    ContactService,
    OrganizationUserService,
    OrganizationService,
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    InviteService,

    MailerService,
    TemplateEngineService,

    RoleService,
    RequestContextService,
    StatusService,
    LogService,
    NoteService,
  ],
  exports: [AuthService, RoleService, StatusService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // FOR LATER
  }
}
