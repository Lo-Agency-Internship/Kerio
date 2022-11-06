import {
  BadRequestException,
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
import { JwtResponse, SecureUserWithOrganization } from '../utils/types';

import { AuthService } from '../services/auth.service';
import { InviteService } from 'src/services/invite.service';
import {
  AuthEmailAlreadyExistsException,
  AuthOrganizationAlreadyExistsException,
  NotExistException,
} from 'src/utils/exceptions';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
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

  @Post('register')
  async register(
    @Body() { email, name, password, organizationSlug }: UserRegisterDto,
  ): Promise<SecureUserWithOrganization> {
    try {
      const resultUser = await this.authService.registerUser({
        email,
        name,
        password,
        organizationSlug,
      });
      this.inviteService.sendEmailToActiveAccount({ email: resultUser.email });

      return resultUser;
    } catch (error) {
      if (error instanceof AuthEmailAlreadyExistsException) {
        throw new BadRequestException('Email already exists');
      } else if (error instanceof AuthOrganizationAlreadyExistsException) {
        throw new BadRequestException('Organization already exists');
      } else if (error instanceof NotExistException) {
        throw new BadRequestException("Organization doesn't exists");
      } else {
        throw new BadRequestException('Something went wrong');
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
