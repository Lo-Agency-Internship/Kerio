import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserLoginDto, UserRegisterDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { genSaltSync, hashSync } from 'bcrypt';
import { User } from '../entities/user.entity';
import { SecureUser, SecureUserWithOrganization } from '../utils/types';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from '../services/organization.service';
import { OrganizationUserService } from '../services/organizationUser.service';
import { kebab } from 'case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly orgUserService: OrganizationUserService,
    private readonly authService: AuthService,
  ) {}

  //@UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() { password, email }: UserLoginDto) {
    const [exists, user] = await this.userService.existsAndFindByEmail(email);

    if (!exists)
      throw new HttpException(
        `user with email ${email} does not exist`,
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = hashSync(password, user.salt);

    const areEqual = user.password === hashedPassword;

    if (!areEqual)
      throw new HttpException(
        `either user or password is incorrect`,
        HttpStatus.BAD_REQUEST,
      );

    const jwt = await this.authService.createJwt(user as SecureUser);

    return jwt;
  }

  @Post('register')
  async register(
    @Body() { password, name, email, organizationSlug }: UserRegisterDto,
  ): Promise<SecureUserWithOrganization> {
    const userExists = await this.userService.exists(email);

    if (userExists)
      throw new HttpException(
        `user with email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );

    const salt = genSaltSync(10);

    const hashedPass = hashSync(password, salt);

    const createdUser: User = await this.userService.addUser({
      salt,
      password: hashedPass,
      email,
      name,
    });

    const [orgExists, organization] = await this.orgService.existsAndFindBySlug(
      organizationSlug,
    );

    let orgIdToAssign = null;

    if (orgExists) {
      orgIdToAssign = organization.id;
    } else {
      const newOrg = await this.orgService.addOrganization({
        name: `${name}'s Organization`,
        address: '',
        slug: kebab(`${name}'s Organization`),
      });

      orgIdToAssign = newOrg.id;
    }

    await this.orgUserService.assignUserToOrganization(
      createdUser.id,
      orgIdToAssign,
    );

    const resultUser =
      await this.orgUserService.findUserWithOrganizationByUserEmail(email);

    return {
      id: resultUser.id,
      name: resultUser.name,
      email: resultUser.email,
      updatedAt: resultUser.updatedAt,
      deletedAt: resultUser.deletedAt,
      createdAt: resultUser.createdAt,
      organization: resultUser.organization,
    };
  }
}
