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
import { InviteService } from 'src/services/invite.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly authService: AuthService,
    private readonly inviteService: InviteService,
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
  //owner register
  @Post('register')
  async register(
    @Body() { password, name, email, organizationSlug }: UserRegisterDto,
  ): Promise<SecureUserWithOrganization> {
    try {
      const role = ERole.Owner;
      const resultUser = await this.authService.registerUser({
        email,
        name,
        // organizationSlug: newOrg.slug,  just to remind organizationslug is cpome from the body but organization
        // organizationslug for registering employee come from dataBase so it is kebab shode
        organizationSlug, // not kebab
        password,
        role,
      });
      this.inviteService.sendEmailToActiveAccount(email);

      return resultUser;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw new HttpException(
          `user with email ${email} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      } else if (err instanceof NotFoundException) {
        throw new HttpException(
          'organization does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
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
    try {
      return await this.authService.activeAccount(email);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(
          `user with email ${email} does not exist`,
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
