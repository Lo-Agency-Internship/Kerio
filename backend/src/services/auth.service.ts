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
import { MailerService } from './mail.service';
import { NotExistException } from '../utils/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly orgUserService: OrganizationUserService,
    private readonly jwtService: JwtService,
    private readonly mailgunService: MailerService,
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

  async registerUser({
    email,
    name,
    password,
    organizationSlug,
    roleId,
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
      createdUser.id,
      organization.id,
      roleId,
    );

    return await this.orgUserService.findUserWithOrganizationByUserEmail(email);
  }

  async activeAccount(email) {
    const getUser = await this.userService.findOneUserByEmail(email);
    getUser.enabled = true;
    await this.userService.updateUserById(getUser.id, getUser);
  }
}
