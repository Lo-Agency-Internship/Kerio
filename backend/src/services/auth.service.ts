import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtPayload, JwtResponse, SecureUser } from '../utils/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SecureUser | null> {
    const user = await this.userService.findOneUserByEmail(email);

    if (!user || user.password === password) return null;

    // eslint-disable-next-line
    const { password: ignorePass, ...rest } = user;
    return rest;
  }

  async createJwt(user: SecureUser): Promise<JwtResponse> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
