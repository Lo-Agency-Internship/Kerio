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
import { SecureUser } from '../utils/types';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
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
    @Body() { password, name, email }: UserRegisterDto,
  ): Promise<SecureUser> {
    const exists = await this.userService.exists(email);

    if (exists)
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

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      updatedAt: createdUser.updatedAt,
      deletedAt: createdUser.deletedAt,
      createdAt: createdUser.createdAt,
    };
  }
}
