import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SecureUser } from '../utils/types';
import { JwtGuard } from '../utils/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  index(): Promise<SecureUser[]> {
    return this.userService.findAll();
  }
}
