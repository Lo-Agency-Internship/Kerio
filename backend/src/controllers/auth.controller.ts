import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { UserLoginDto, UserRegisterDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { hashSync } from 'bcrypt';
import {
  EEntityTypeLog,
  ERole,
  SecureUserWithOrganization,
} from '../utils/types';

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
    const [exists, user] =
      await this.userService.findUserWithOrganizationByUserEmail(email);

    if (!exists)
      throw new HttpException(
        `user with email ${email} does not exist`,
        HttpStatus.BAD_REQUEST,
      );

    // if (!user.enabled) {
    //   throw new HttpException(
    //     `user with email ${email} is not activated`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    const hashedPassword = hashSync(password, user.salt);

    const areEqual = user.password === hashedPassword;

    if (!areEqual)
      throw new HttpException(
        `either user or password is incorrect`,
        HttpStatus.BAD_REQUEST,
      );

    delete user.password;
    delete user.salt;
    const jwt = await this.authService.createJwt(
      user as SecureUserWithOrganization,
    );

    return jwt;
  }

  @Post('register')
  async register(
    @Body() { password, name, email, organizationSlug }: UserRegisterDto,
  ): Promise<SecureUserWithOrganization> {
    const pipedOrgSlug = kebab(organizationSlug);
    const userExists = await this.userService.exists(email);

    if (userExists)
      throw new HttpException(
        `user with email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );

    const [orgExists] = await this.orgService.existsAndFindBySlug(pipedOrgSlug);

    if (orgExists)
      throw new HttpException(
        `organization already exists`,
        HttpStatus.BAD_REQUEST,
      );

    const newOrg = await this.orgService.addOrganization({
      name: `${name}'s Organization`,
      address: '',
      slug: pipedOrgSlug,
    });

    const roleId = ERole.Owner;
    const resultUser = await this.authService.registerUser({
      email,
      name,
      organizationSlug: newOrg.slug,
      password,
      role: roleId,
    });

    return resultUser;
  }
  @Post('duplicateEmail')
  async emailExist(@Body() body) {
    const isExist = await this.userService.exists(body.email);
    if (isExist) {
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    }
    return { message: 'ok', status: HttpStatus.ACCEPTED };
  }

  @Get('enable')
  async activeAccount(@Query() { email }) {
    console.log(email);
    return this.authService.activeAccount(email);
  }
}
