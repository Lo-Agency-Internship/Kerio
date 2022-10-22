import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import {
  JwtPayload,
  JwtResponse,
  SecureUser,
  SecureUserWithOrganization,
} from '../utils/types';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from 'src/dtos/user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { OrganizationUserService } from './organizationUser.service';
import { OrganizationService } from './organization.service';
import { NotExistException } from '../utils/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly orgUserService: OrganizationUserService,
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

  async createJwt(user: SecureUserWithOrganization): Promise<JwtResponse> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser({
    email,
    name,
    password,
    organizationSlug,
    role,
  }: UserRegisterDto): Promise<SecureUserWithOrganization> {
    const [orgExists, organization] = await this.orgService.existsAndFindBySlug(
      organizationSlug,
    );

    if (!orgExists) throw new NotExistException(`organization doesn't exist`);

    const salt = genSaltSync(10);

    const hashedPass = hashSync(password, salt);

    const createdUser: User = await this.userService.addUser({
      salt,
      password: hashedPass,
      email,
      name,
    });

    await this.orgUserService.assignUserToOrganization(
      createdUser,
      organization,
      role,
    );

    return await this.orgUserService.findUserWithOrganizationByUserEmail(email);
  }

  async activeAccount(email) {
    const getUser = await this.userService.findOneUserByEmail(email);
    getUser.enabled = true;
    await this.userService.updateUserById(getUser.id, getUser);
  }
}
