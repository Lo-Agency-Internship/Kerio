import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto, UserRegisterDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { ERole, JwtResponse, SecureUserWithOrganization } from '../utils/types';

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
  async login(@Body() { password, email }: UserLoginDto): Promise<JwtResponse> {
    try {
      const jwt = await this.authService.findUserToCheckForLogin({
        email,
        password,
      });
      return jwt;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(
          `user with  email ${email} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      } else if (err instanceof UnauthorizedException) {
        throw new HttpException(
          `user with  email ${email} is not activated`,
          HttpStatus.BAD_REQUEST,
        );
      } else if (err instanceof NotAcceptableException) {
        throw new HttpException(
          `either user or password is incorrect`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
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

    const role = ERole.Owner;
    const resultUser = await this.authService.registerUser({
      email,
      name,
      organizationSlug: newOrg.slug,
      password,
      role,
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
    return this.authService.activeAccount(email);
  }
}
