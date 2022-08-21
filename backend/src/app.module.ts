import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Contact, Organization, OrganizationUser, User]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        ssl: { rejectUnauthorized: false },
        synchronize: true,
        logging: true,
        entities: [Contact, Organization, OrganizationUser, User],
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
  ],
  exports: [AuthService],
})
export class AppModule {}
